import { useCallback, useContext, useEffect, useState } from 'react';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { supabase } from "../utils/SupabaseClient";
import mockedData from '../mock_it.json';
import Timer from '../components/Timer';
import { Context } from '../components/GameContext';
import LineCard from '../components/LineCard';


function BattlePage() {
  const [player, setPlayer] = useState('');
  const [gameSession, setGameSession] = useState(null);
  const [availableSession, setAvailableSession] = useState(null);
  const [loadingLobby, setLoadingLobby] = useState(true);
  const [lobbyError, setLobbyError] = useState(false);
  const [actionInProgress, setActionInProgress] = useState(false);
  const [lines, setLines] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
  const { index } = useContext(Context)

  const findWaitingSession = useCallback(async (currentPlayer) => {
    const { data, error } = await supabase
      .from('game_sessions')
      .select('*')
      .eq('is_complete', false)
      .eq('player1', currentPlayer)
      .is('player2', null)
      .limit(1)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (data) {
      return data;
    }

    const { data: waitingSession, error: waitingError } = await supabase
      .from('game_sessions')
      .select('*')
      .eq('is_complete', false)
      .is('player2', null)
      .neq('player1', currentPlayer)
      .limit(1)
      .maybeSingle();

    if (waitingError) {
      throw waitingError;
    }

    setAvailableSession(waitingSession);
    return waitingSession;
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadPlayer() {
      const { data, error } = await supabase.auth.getUser();
      if (ignore) return;

      if (error) {
        setErrorMessage(error.message);
        setLoadingLobby(false);
      } else if (data.user) {
        setPlayer(data.user.email || data.user.id);
      } else {
        setErrorMessage('Accedi per partecipare a una battle.');
        setLoadingLobby(false);
      }
    }

    loadPlayer().catch((error) => {
      if (!ignore) {
        setErrorMessage(error.message);
        setLoadingLobby(false);
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!player || gameSession) return undefined;

    let ignore = false;
    const refreshLobby = async () => {
      try {
        const session = await findWaitingSession(player);
        if (ignore) return;

        setLobbyError(false);
        setErrorMessage(null);
        if (session?.player1 === player) {
          setGameSession(session);
          setAvailableSession(null);
        }
      } catch (error) {
        if (!ignore) {
          setLobbyError(true);
          setErrorMessage(error.message);
        }
      } finally {
        if (!ignore) setLoadingLobby(false);
      }
    };

    refreshLobby();
    const intervalId = setInterval(refreshLobby, 5000);
    return () => {
      ignore = true;
      clearInterval(intervalId);
    };
  }, [player, gameSession, findWaitingSession]);

  useEffect(() => {
    if (!gameSession || gameSession.player2) return undefined;

    let ignore = false;
    const refreshGameSession = async () => {
      const { data, error } = await supabase
        .from('game_sessions')
        .select('*')
        .eq('id', gameSession.id)
        .single();

      if (ignore) return;
      if (error) {
        setErrorMessage(error.message);
      } else if (data) {
        if (data.player2) {
          setGameSession(data);
        }
      }
    };

    const intervalId = setInterval(refreshGameSession, 3000);
    return () => {
      ignore = true;
      clearInterval(intervalId);
    };
  }, [gameSession]);

  const joinSession = async (session) => {
    const { data, error } = await supabase
      .from('game_sessions')
      .update({ player2: player })
      .eq('id', session.id)
      .eq('is_complete', false)
      .is('player2', null)
      .select()
      .maybeSingle();

    if (error) {
      setErrorMessage(error.message);
    } else if (!data) {
      setErrorMessage('Un altro giocatore si è appena unito. Cerco una nuova battle...');
      setAvailableSession(null);
      setLoadingLobby(true);
    } else {
      setGameSession(data);
      setAvailableSession(null);
      setErrorMessage(null);
      await getLines();
    }
  };

  const startGame = async () => {
    if (!player || actionInProgress) return;

    setActionInProgress(true);
    setErrorMessage(null);
    try {
      const session = await findWaitingSession(player);
      if (session && session.player1 !== player) {
        await joinSession(session);
        return;
      }
      if (session) {
        setGameSession(session);
        return;
      }

      const { data, error } = await supabase
        .from('game_sessions')
        .insert([{ player1: player, current_turn: player }])
        .select()
        .single();

      if (error) {
        setErrorMessage(error.message);
      } else {
        setGameSession(data);
        setAvailableSession(null);
        await getLines();
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setActionInProgress(false);
    }
  };

  const joinGame = async () => {
    if (!player || actionInProgress) return;

    setActionInProgress(true);
    setErrorMessage(null);
    try {
      const session = availableSession || await findWaitingSession(player);
      if (!session || session.player1 === player) {
        setErrorMessage('Al momento non ci sono battle disponibili. Puoi avviarne una.');
        setAvailableSession(null);
        return;
      }
      await joinSession(session);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setActionInProgress(false);
    }
  }

  async function getLines() {
    if (process.env.REACT_APP_MOCKED === "true") {
      setLines(mockedData)
    } else {
      const language = localStorage.getItem("language")
      const { data, error } = await supabase.rpc(language === "IT" ? "get_random_lines" : "get_random_lines_eng");
      if (error) {
        setErrorMessage(error.message);
        return;
      }
      setLines(data);
    }
  }

  return (
    <div className="App-header relative">
      <Link
        to="/"
        aria-label="Torna alla home"
        className="absolute left-4 top-4 z-10 flex-shrink-0 rounded-full bg-gray-700 p-3 text-base text-white shadow-lg transition-colors duration-200 hover:bg-gray-600 sm:left-6 sm:top-6"
      >
        <FontAwesomeIcon icon={faArrowLeft} size="lg" />
      </Link>

      {/* Inizio Partita */}
      {!gameSession && (
        <div className="flex flex-col items-center">
          {loadingLobby ? (
            <p>Controllo le battle disponibili...</p>
          ) : lobbyError ? (
            <p>Non riesco a controllare le battle. Ricarica la pagina per riprovare.</p>
          ) : availableSession ? (
            <>
              <p className="mb-3">C&apos;è una battle in attesa.</p>
              <button onClick={joinGame} disabled={actionInProgress} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded border w-64 disabled:opacity-50">
                {actionInProgress ? 'Joining...' : 'Join'}
              </button>
            </>
          ) : (
            <>
              <p className="mb-3">Non ci sono battle in attesa.</p>
              <button onClick={startGame} disabled={actionInProgress} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded border w-64 disabled:opacity-50">
                {actionInProgress ? 'Starting...' : 'Start'}
              </button>
            </>
          )}
        </div>
      )}

      {gameSession && !gameSession.player2 && (
        <p className="mt-6">Battle avviata. In attesa che si unisca un altro giocatore...</p>
      )}

      {/* Fine Partita */}
      {errorMessage && (
        <div>
          <h2 className="text-red-500 mt-20">{errorMessage}</h2>
        </div>
      )}

      {/* Domande */}
      {lines.length > 0 && player && gameSession?.player2 && (
        <div>
          <Timer />
          <br />
          <LineCard key={lines[index].id} p1={lines[index].p1} p2={lines[index].p2} p3={lines[index].p3} />
        </div>
      )}

    </div>
  );
}

export default BattlePage;
