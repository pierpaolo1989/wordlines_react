-- Run in the Supabase SQL editor. Battle tokens are capabilities: do not expose
-- the table directly or return them from the RPCs.
create table if not exists public.wordlines_battles (
  id uuid primary key default gen_random_uuid(),
  language text not null check (language in ('IT', 'EN')),
  lines jsonb not null,
  player1 text not null,
  player2 text,
  token1 uuid not null,
  token2 uuid,
  score1 integer check (score1 >= 0),
  score2 integer check (score2 >= 0),
  cancelled boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.wordlines_battles enable row level security;
revoke all on public.wordlines_battles from anon, authenticated;

create or replace function public.battle_view(b public.wordlines_battles)
returns jsonb language sql immutable set search_path = public, pg_temp as $$
  select jsonb_build_object('id', b.id, 'language', b.language, 'lines', b.lines,
    'player1', b.player1, 'player2', b.player2, 'score1', b.score1,
    'score2', b.score2, 'cancelled', b.cancelled);
$$;
revoke all on function public.battle_view(public.wordlines_battles) from public;

create or replace function public.battle_join_or_create(
  p_token uuid, p_name text, p_language text, p_lines jsonb
) returns jsonb language plpgsql security definer set search_path = public, pg_temp as $$
declare b public.wordlines_battles;
begin
  if p_token is null or p_name is null or length(trim(p_name)) not between 1 and 50
     or p_language not in ('IT', 'EN') or p_language is null
     or p_lines is null or jsonb_typeof(p_lines) <> 'array' or jsonb_array_length(p_lines) = 0 then
    raise exception 'Dati della battle non validi';
  end if;
  perform pg_advisory_xact_lock(hashtext('wordlines-battle-' || p_language));
  select * into b from public.wordlines_battles
    where token1 = p_token or token2 = p_token;
  if found then
    if b.cancelled or b.language <> p_language or
      (case when b.token1 = p_token then b.player1 else b.player2 end) <> trim(p_name) then
      raise exception 'Identificativo della battle già utilizzato';
    end if;
    return public.battle_view(b);
  end if;
  select * into b from public.wordlines_battles
    where language = p_language and player2 is null and not cancelled
      and created_at > now() - interval '10 minutes'
    order by created_at for update skip locked limit 1;
  if found then
    update public.wordlines_battles set player2 = trim(p_name), token2 = p_token
      where id = b.id returning * into b;
  else
    insert into public.wordlines_battles (language, lines, player1, token1)
      values (p_language, p_lines, trim(p_name), p_token) returning * into b;
  end if;
  return public.battle_view(b);
end;
$$;

create or replace function public.battle_status(p_battle_id uuid, p_token uuid)
returns jsonb language plpgsql security definer set search_path = public, pg_temp as $$
declare b public.wordlines_battles;
begin
  update public.wordlines_battles set cancelled = true
    where id = p_battle_id and token1 = p_token and player2 is null
      and created_at <= now() - interval '10 minutes';
  select * into b from public.wordlines_battles
    where id = p_battle_id and (token1 = p_token or token2 = p_token);
  if not found then raise exception 'Battle non trovata'; end if;
  return public.battle_view(b);
end;
$$;

create or replace function public.battle_finish(p_battle_id uuid, p_token uuid, p_score integer)
returns jsonb language plpgsql security definer set search_path = public, pg_temp as $$
declare b public.wordlines_battles;
begin
  if p_score is null or p_score < 0 then raise exception 'Punteggio non valido'; end if;
  select * into b from public.wordlines_battles
    where id = p_battle_id and (token1 = p_token or token2 = p_token) for update;
  if not found or b.cancelled or b.player2 is null then raise exception 'Battle non disponibile'; end if;
  if b.token1 = p_token then
    if b.score1 is not null and b.score1 <> p_score then raise exception 'Risultato già registrato'; end if;
    update public.wordlines_battles set score1 = p_score where id = b.id returning * into b;
  else
    if b.score2 is not null and b.score2 <> p_score then raise exception 'Risultato già registrato'; end if;
    update public.wordlines_battles set score2 = p_score where id = b.id returning * into b;
  end if;
  return public.battle_view(b);
end;
$$;

create or replace function public.battle_cancel(p_battle_id uuid, p_token uuid)
returns void language plpgsql security definer set search_path = public, pg_temp as $$
begin
  update public.wordlines_battles set cancelled = true
    where id = p_battle_id and (token1 = p_token or token2 = p_token)
      and not (score1 is not null and score2 is not null);
  if not found then raise exception 'Battle non disponibile'; end if;
end;
$$;

revoke all on function public.battle_join_or_create(uuid, text, text, jsonb) from public;
revoke all on function public.battle_status(uuid, uuid) from public;
revoke all on function public.battle_finish(uuid, uuid, integer) from public;
revoke all on function public.battle_cancel(uuid, uuid) from public;
grant execute on function public.battle_join_or_create(uuid, text, text, jsonb) to anon, authenticated;
grant execute on function public.battle_status(uuid, uuid) to anon, authenticated;
grant execute on function public.battle_finish(uuid, uuid, integer) to anon, authenticated;
grant execute on function public.battle_cancel(uuid, uuid) to anon, authenticated;

-- Existing "score" rows remain visible. submission_id makes retries idempotent,
-- while user_id records the authenticated owner without exposing their email.
alter table public.score add column if not exists submission_id uuid;
alter table public.score add column if not exists user_id uuid;
create unique index if not exists score_submission_id_key on public.score (submission_id);

create or replace function public.save_classic_score(
  p_submission_id uuid, p_username text, p_score integer, p_language text
) returns jsonb language plpgsql security definer set search_path = public, pg_temp as $$
declare saved public.score; position bigint;
begin
  if p_submission_id is null or p_username is null
    or length(trim(p_username)) not between 1 and 50
    or p_score is null or p_score < 0
    or p_language is null or p_language not in ('IT', 'EN') then
    raise exception 'Punteggio non valido';
  end if;
  insert into public.score (submission_id, user_id, username, score, language)
    values (p_submission_id, auth.uid(), trim(p_username), p_score, p_language)
    on conflict (submission_id) do nothing;
  select * into saved from public.score where submission_id = p_submission_id;
  if saved.user_id is distinct from auth.uid() or saved.username <> trim(p_username)
    or saved.score <> p_score or saved.language <> p_language then
    raise exception 'Identificativo del risultato già utilizzato';
  end if;
  select count(*) + 1 into position from public.score s
    where s.language = saved.language
      and (s.score > saved.score or (s.score = saved.score and s.id < saved.id));
  return jsonb_build_object('id', saved.id, 'position', position);
end;
$$;
revoke all on function public.save_classic_score(uuid, text, integer, text) from public;
grant execute on function public.save_classic_score(uuid, text, integer, text) to anon, authenticated;
