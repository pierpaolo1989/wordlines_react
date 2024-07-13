import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./GameContext";
import GameOver from "./GameOver";

function Result() {

    const { score, setScore } = useContext(Context)
    const { setIndex } = useContext(Context)
    const { setUp } = useContext(Context)
    const navigate = useNavigate()

    const play = () => {
        setIndex(0)
        setScore(0)
        setUp(3)
        let language = localStorage.getItem('language');
        navigate("/lines/" + language);
    }

    return (
        <div className="App-header">
            <GameOver />
            <span>Il tuo risultato è: {score}</span>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10"
                onClick={play}>
                Play
            </button>
        </div>
    )
}

export default Result;