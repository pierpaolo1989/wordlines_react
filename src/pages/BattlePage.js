import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Context } from "../components/GameContext";
import GameNavbar from "../components/GameNavbar";
import InterstitialAnnouncement from "../components/InterstitialAnnouncement";
import LineCard from "../components/LineCard";
import Timer from "../components/Timer";
import mockedDataIt from "../mock_it.json";
import mockedDataEng from "../mock_eng.json";
import { supabase } from "../utils/SupabaseClient";
import { getPlayer, scoreLanguage } from "../utils/player";

function BattlePage() {
  const { index, score, gameFinished, showInterstitial, continueAfterInterstitial, resetGame } = useContext(Context);
  const [player, setPlayer] = useState(undefined);
  const [name, setName] = useState("");
  const [battle, setBattle] = useState(null);
  const [token, setToken] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [identityAttempt, setIdentityAttempt] = useState(0);
  const submitting = useRef(false);
  const joiningToken = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    resetGame();
    let active = true;
    getPlayer().then((value) => {
      if (active) setPlayer(value);
    }).catch((err) => {
      if (active) setError(`Impossibile identificare il giocatore: ${err.message}`);
    });
    return () => { active = false; };
  }, [resetGame, identityAttempt]);

  const refresh = useCallback(async () => {
    const { data, error: rpcError } = await supabase.rpc("battle_status", {
      p_battle_id: battle.id, p_token: token,
    });
    if (rpcError) throw rpcError;
    if (!data) throw new Error("Battle non trovata.");
    setBattle(data);
    setError((current) => current.startsWith("Impossibile aggiornare la battle:") ? "" : current);
  }, [battle?.id, token]);

  useEffect(() => {
    if (!battle || !token || battle.cancelled || (battle.score1 !== null && battle.score2 !== null)) return undefined;
    let active = true;
    const poll = () => refresh().catch((err) => {
      if (active) setError(`Impossibile aggiornare la battle: ${err.message}`);
    });
    const interval = setInterval(poll, 3000);
    return () => { active = false; clearInterval(interval); };
  }, [battle, token, refresh]);

  const start = async (event) => {
    event.preventDefault();
    const playerName = player?.name || name.trim();
    if (!playerName || busy) return;
    setBusy(true);
    setError("");
    try {
      const language = scoreLanguage();
      let lines;
      if (process.env.REACT_APP_MOCKED === "true") {
        lines = language === "IT" ? mockedDataIt : mockedDataEng;
      } else {
        const { data, error: linesError } = await supabase.rpc(
          language === "IT" ? "get_random_lines" : "get_random_lines_eng"
        );
        if (linesError) throw linesError;
        lines = data;
      }
      const minimumLines = Number(process.env.REACT_APP_MIN_LINES_PER_GAMES) || 0;
      if (!Array.isArray(lines) || lines.length <= minimumLines ||
          lines.some((line) => !line || typeof line.p1 !== "string" ||
            typeof line.p2 !== "string" || typeof line.p3 !== "string")) {
        throw new Error("La sequenza di parole non è valida o è troppo breve.");
      }
      const newToken = joiningToken.current || crypto.randomUUID();
      joiningToken.current = newToken;
      const { data, error: rpcError } = await supabase.rpc("battle_join_or_create", {
        p_token: newToken, p_name: playerName, p_language: language, p_lines: lines,
      });
      if (rpcError) throw rpcError;
      if (!data) throw new Error("Battle non disponibile.");
      if (!Array.isArray(data.lines) || data.lines.length <= minimumLines ||
          data.lines.some((line) => !line || typeof line.p1 !== "string" ||
            typeof line.p2 !== "string" || typeof line.p3 !== "string")) {
        throw new Error("La sequenza condivisa non è valida.");
      }
      setToken(newToken);
      setBattle(data);
    } catch (err) {
      setError(`Impossibile avviare la battle: ${err.message}`);
    } finally {
      setBusy(false);
    }
  };

  const submitScore = useCallback(async () => {
    if (!battle || !token || submitting.current || submitted) return;
    submitting.current = true;
    setError("");
    try {
      const { data, error: rpcError } = await supabase.rpc("battle_finish", {
        p_battle_id: battle.id, p_token: token, p_score: score,
      });
      if (rpcError) throw rpcError;
      if (!data) throw new Error("Risultato non restituito.");
      setBattle(data);
      setSubmitted(true);
    } catch (err) {
      setError(`Impossibile inviare il risultato: ${err.message}`);
    } finally {
      submitting.current = false;
    }
  }, [battle, token, score, submitted]);

  useEffect(() => {
    if (gameFinished && battle && !battle.cancelled && !submitted && !error) submitScore();
  }, [gameFinished, battle, submitted, error, submitScore]);

  const leave = async (event) => {
    if (busy) {
      event.preventDefault();
      return;
    }
    if (!battle || !token || (battle.score1 !== null && battle.score2 !== null)) {
      resetGame();
      return;
    }
    event.preventDefault();
    setBusy(true);
    try {
      const { error: rpcError } = await supabase.rpc("battle_cancel", {
        p_battle_id: battle.id, p_token: token,
      });
      if (rpcError) throw rpcError;
      resetGame();
      navigate("/");
    } catch (err) {
      setError(`Impossibile abbandonare la battle: ${err.message}`);
    } finally {
      setBusy(false);
    }
  };

  const complete = battle && battle.score1 !== null && battle.score2 !== null;
  const winner = complete && (battle.score1 === battle.score2 ? null :
    battle.score1 > battle.score2 ? battle.player1 : battle.player2);

  return (
    <>
      {battle?.player2 && !gameFinished && !battle.cancelled && <GameNavbar onHome={leave} />}
      <div className="App-header relative">
        {(!battle?.player2 || gameFinished || battle.cancelled) && (
          <Link to="/" onClick={leave} aria-label="Torna alla home" aria-disabled={busy}
            className="absolute top-4 left-4 bg-gray-700 hover:bg-gray-600 p-3 rounded-full text-base text-white shadow-lg transition-colors duration-200">
            <FontAwesomeIcon icon={faArrowLeft} size="lg" />
          </Link>
        )}
        {!battle && (
          <form onSubmit={start} className="flex flex-col items-center gap-3">
            {player === undefined ? <p>Identificazione giocatore...</p> : (
              <>
                {player ? <p>Giocatore: {player.name}</p> : (
                  <>
                    <label htmlFor="battle-name">Il tuo nome</label>
                    <input id="battle-name" value={name} onChange={(event) => setName(event.target.value)}
                      maxLength={50} required className="rounded px-2 text-gray-900" />
                  </>
                )}
                <button disabled={busy || (!player && !name.trim())} className="rounded border bg-blue-500 px-4 py-2 text-base disabled:opacity-50">
                  {busy ? "Attendi..." : "Cerca o avvia una battle"}
                </button>
              </>
            )}
          </form>
        )}
        {battle && !battle.player2 && !battle.cancelled && <p>In attesa di un altro giocatore...</p>}
        {battle?.cancelled && <p>La battle è stata abbandonata.</p>}
        {battle?.player2 && !gameFinished && !battle.cancelled && (
          <div>
            <p>{battle.player1} vs {battle.player2}</p>
            <Timer navigateOnFinish={false} />
            <LineCard key={`${index}-${battle.id}`} {...battle.lines[index]} />
          </div>
        )}
        {gameFinished && !battle?.cancelled && !complete && (
          <p>{submitted ? "Risultato inviato. In attesa dell'avversario..." : "Invio del risultato..."}</p>
        )}
        {complete && !battle.cancelled && (
          <div className="text-center">
            <h1>{winner ? `Vince ${winner}!` : "Pareggio!"}</h1>
            <p>{battle.player1}: {battle.score1} punti</p>
            <p>{battle.player2}: {battle.score2} punti</p>
          </div>
        )}
        {error && <p role="alert" className="theme-error mt-4 text-red-400">{error}</p>}
        {error && player === undefined && <button onClick={() => {
          setError("");
          setIdentityAttempt((attempt) => attempt + 1);
        }}>Riprova identificazione</button>}
        {error && gameFinished && !submitted && <button onClick={submitScore}>Riprova invio</button>}
        {showInterstitial && !gameFinished && !battle?.cancelled &&
          <InterstitialAnnouncement onContinue={continueAfterInterstitial} />}
      </div>
    </>
  );
}

export default BattlePage;
