import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../components/GameContext";
import GameOver from "../components/animations/GameOverAnimation";
import VictoryAnimation from "../components/animations/VictoryAnimation";

function Result() {

    const { score, gameResult, resetGame } = useContext(Context)
    const navigate = useNavigate()

    const play = () => {
        resetGame()
        let language = localStorage.getItem('language');
        navigate("/lines/" + language);
    }

    return (
        <div className="App-header">
            {gameResult === "victory" ?
            <VictoryAnimation /> :
            <GameOver /> }
            <span>Il tuo risultato è: {score}</span>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-10 border"
                onClick={play}>
                Play
            </button>
        </div>
    )
}

export default Result;