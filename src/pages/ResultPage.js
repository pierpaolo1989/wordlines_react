import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../components/GameContext";
import GameOver from "../components/animations/GameOverAnimation";
import VictoryAnimation from "../components/animations/VictoryAnimation";
import { supabase } from "../utils/SupabaseClient";
import { getPlayer, scoreLanguage } from "../utils/player";

function Result() {
    const { score, gameResult, gameFinished, resetGame } = useContext(Context);
    const navigate = useNavigate();
    const [player, setPlayer] = useState(undefined);
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);
    const [entryId, setEntryId] = useState(null);
    const [rank, setRank] = useState(null);
    const savingRef = useRef(false);
    const submissionId = useRef(crypto.randomUUID());
    const language = scoreLanguage();

    const [identityAttempt, setIdentityAttempt] = useState(0);
    useEffect(() => {
        let active = true;
        getPlayer().then((value) => {
            if (active) setPlayer(value);
        }).catch((err) => {
            if (active) setError(`Impossibile identificare il giocatore: ${err.message}`);
        });
        return () => { active = false; };
    }, [identityAttempt]);

    const saveScore = async (playerName) => {
        if (savingRef.current || entryId !== null) return;
        savingRef.current = true;
        setSaving(true);
        setError("");
        try {
            const { data, error: insertError } = await supabase.rpc("save_classic_score", {
                p_submission_id: submissionId.current,
                p_username: playerName,
                p_score: score,
                p_language: language,
            });
            if (insertError) throw insertError;
            if (!data) throw new Error("Il punteggio salvato non è stato restituito.");
            setEntryId(data.id);
            if (player) setRank(data.position);
        } catch (err) {
            setError(`Impossibile completare il salvataggio o leggere la posizione: ${err.message}`);
        } finally {
            savingRef.current = false;
            setSaving(false);
        }
    };

    useEffect(() => {
        if (gameFinished && player && entryId === null && !saving && !error) {
            saveScore(player.name);
        }
        // The guard prevents duplicate inserts while the asynchronous request is running.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameFinished, player, entryId, saving, error]);

    const play = () => {
        resetGame();
        navigate("/lines/" + localStorage.getItem("language"));
    };

    return (
        <div className="App-header">
            {gameResult === "victory" ? <VictoryAnimation /> : <GameOver />}
            <span>Il tuo risultato è: {score}</span>
            {gameFinished && player === null && entryId === null && (
                <form onSubmit={(event) => {
                    event.preventDefault();
                    if (name.trim()) saveScore(name.trim());
                }} className="mt-4 flex flex-col gap-2">
                    <label htmlFor="player-name">Nome per la classifica</label>
                    <input id="player-name" value={name} onChange={(event) => setName(event.target.value)}
                        maxLength={50} required className="rounded px-2 text-gray-900" />
                    <button disabled={saving || !name.trim()} className="rounded border bg-blue-500 px-2 py-1">
                        Salva punteggio
                    </button>
                </form>
            )}
            {saving && <p role="status">Salvataggio punteggio...</p>}
            {entryId !== null && <p>Punteggio salvato{rank !== null ? `: posizione ${rank} in classifica` : ""}.</p>}
            {error && <p role="alert" className="theme-error text-red-400">{error}</p>}
            {error && player === undefined && <button onClick={() => {
                setError("");
                setIdentityAttempt((attempt) => attempt + 1);
            }}>Riprova identificazione</button>}
            {error && player && entryId === null && <button onClick={() => saveScore(player.name)}>Riprova</button>}
            <Link to="/leaderboard" className="mt-4 underline">Classifica</Link>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-10 border"
                onClick={play}>Play</button>
        </div>
    );
}

export default Result;
