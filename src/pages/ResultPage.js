import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../components/GameContext";
import GameOver from "../components/animations/GameOverAnimation";
import VictoryAnimation from "../components/animations/VictoryAnimation";

function Result() {

    const { score, setScore } = useContext(Context)
    const { setIndex } = useContext(Context)
    const { setUp } = useContext(Context)
    const { setNumberHelp1} = useContext(Context)
    const { setNumberHelp2} = useContext(Context)
    const navigate = useNavigate()

    const play = () => {
        setIndex(0)
        setScore(0)
        setUp(3)
        setNumberHelp1(Number(process.env.REACT_APP_HELP_1))
        setNumberHelp2(Number(process.env.REACT_APP_HELP_2))
        let language = localStorage.getItem('language');
        navigate("/lines/" + language);
    }

    return (
        <div className="App-header">
            {score === 100 ? 
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