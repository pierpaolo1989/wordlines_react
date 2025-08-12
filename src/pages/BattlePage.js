import React, { useContext, useEffect, useState } from 'react';
import { supabase } from "../utils/SupabaseClient";
import mockedData from '../mock_it.json';
import Timer from '../components/Timer';
import { Context } from '../components/GameContext';
import LineCard from '../components/LineCard';


function BattlePage() {
  const [player, setPlayer] = useState('');
  const [gameSession, setGameSession] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [turn, setTurn] = useState('');
  const [winner, setWinner] = useState(null);
  const [lines, setLines] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
  const { index } = useContext(Context)

  // Inizia una nuova sessione di gioco
  const startGame = async () => {
    getProfile().then(() => {
      const { data: session, error } = supabase
        .from('game_sessions')
        .insert([{ player1: player, current_turn: player }])
        .select()
        .single();

      if (!error) {
        setGameSession(session);
        getLines();
      }
    });
  };

  // Unisciti a una sessione di gioco esistente
  const joinGame = async () => {
    const { data: session, error } = await supabase
      .from('game_sessions')
      .select('*')
      .eq('is_complete', false)
      .not('player2', 'is', null)
      .single();

    debugger;
    if (!error) {
      const updatedSession = await supabase
        .from('game_sessions')
        .update({ player2: player })
        .eq('id', session.id)
        .select()
        .single();

      setGameSession(updatedSession.data);
      getLines();
    } else {
      manageJoinError(error);
    }
  };

  const manageJoinError = (error) => {
    if (error.code = "PGRST116") {
      setErrorMessage("Siamo spiacenti, ma non vi sono attualmente utenti disponibili. Riprova più tardi");
    }
  }

  const getProfile = async () => {
    const profile = await supabase.auth.getUser();
    if (profile.data.user) {
      setPlayer(profile.data.user.email);
    }
  };

  async function getLines() {
    if (process.env.REACT_APP_MOCKED === "true") {
      setLines(mockedData)
    } else {
      let language = localStorage.getItem("language")
      const { data } = await supabase.rpc(language === "IT" ? "get_random_lines" : "get_random_lines_eng");
      setLines(data);
    }
  }

  // Gestisce la risposta
  const handleAnswer = async (isTrue) => {
    const correct = questions[currentQuestion].answer === isTrue;
    if (correct) setScore(score + 1);

    if (currentQuestion < 2) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Aggiorna il punteggio del giocatore
      const field = player === gameSession.player1 ? 'player1_score' : 'player2_score';
      const updatedSession = await supabase
        .from('game_sessions')
        .update({ [field]: score + (correct ? 1 : 0), current_turn: gameSession.player1 === player ? gameSession.player2 : gameSession.player1 })
        .eq('id', gameSession.id)
        .select()
        .single();

      setGameSession(updatedSession.data);

      if (updatedSession.data.player1_score && updatedSession.data.player2_score) {
        determineWinner(updatedSession.data);
      }
    }
  };

  // Determina il vincitore
  const determineWinner = (session) => {
    if (session.player1_score > session.player2_score) {
      setWinner(session.player1);
    } else if (session.player2_score > session.player1_score) {
      setWinner(session.player2);
    } else {
      setWinner('Pareggio');
    }
  };

  // Monitoraggio del turno
  useEffect(() => {
    if (gameSession) {
      setTurn(gameSession.current_turn);
    }
  }, [gameSession]);

  return (
    <div className="App-header">
      {/* Inizio Partita */}
      {!gameSession && (
        <div>
          <button onClick={startGame} className="bg-blue-500 mt-2 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded border w-64 p-2 mr-2">
            Start
          </button>
          <button onClick={joinGame} className="bg-blue-500 mt-2 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded border w-64 pl-5">
            Join
          </button>
        </div>
      )}

      {/* Fine Partita */}
      {errorMessage && (
        <div>
          <h2 class="text-red-500 mt-20">{errorMessage}</h2>
        </div>
      )}

      {/* Domande */}
      {lines.length > 0 && player && (
        <div>
          <Timer />
          <br />
          <LineCard key={lines[index].id} p1={lines[index].p1} p2={lines[index].p2} p3={lines[index].p3} />
        </div>
      )}

      {/* Fine Partita */}
      {winner && (
        <div>
          <h2>Il vincitore è: {winner}</h2>
        </div>
      )}
    </div>
  );
}

export default BattlePage;
