import { supabase } from "./SupabaseClient";

export async function getPlayer() {
  const { data, error } = await supabase.auth.getUser();
  if (error && error.name !== "AuthSessionMissingError") throw error;
  if (!data?.user) return null;

  const user = data.user;
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .maybeSingle();
  if (profileError) throw profileError;

  return {
    id: user.id,
    name: (profile?.username?.trim() || user.user_metadata?.user_name || "Giocatore").slice(0, 50),
  };
}

export function scoreLanguage() {
  return localStorage.getItem("language") === "IT" ? "IT" : "EN";
}
