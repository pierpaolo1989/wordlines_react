import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../components/GameContext";
import GameOver from "../components/animations/GameOverAnimation";
import VictoryAnimation from "../components/animations/VictoryAnimation";
import { supabase } from "../utils/SupabaseClient";

function Result() {

    const { score, setScore } = useContext(Context)
    const [ scoreFromStats, setScoreFromStats ] = useState(null);
    const { setIndex } = useContext(Context)
    const { setUp } = useContext(Context)
    const { setNumberHelp1 } = useContext(Context)
    const { setNumberHelp2 } = useContext(Context)
    const [user, setUser] = useState(null)
    const navigate = useNavigate();

    const getProfile = async () => {
        const profile = await supabase.auth.getUser();
        if (profile.data.user) {
            setUser(profile.data.user);
            getScoreFromStats(profile.data.user.email);
        }
    };

    async function getScoreFromStats(email) {
        const { data } = await supabase.from("user_stats").select().eq('email', email);
        setScoreFromStats(data[0].score);
    }

    useEffect(() => {
        getProfile();
    }, []);

    const play = () => {
        setIndex(0)
        setScore(0)
        setUp(3)
        setNumberHelp1(Number(process.env.REACT_APP_HELP_1))
        setNumberHelp2(Number(process.env.REACT_APP_HELP_2))
        let language = localStorage.getItem('language');
        storeScore();
        navigate("/lines/" + language);
    }

    const storeScore = async () => {
        let result = score +  scoreFromStats;
        await supabase
            .from('user_stats')
            .update({ score: result, email: user.email }).eq('email', user.email);
    }

    return (
        <div className="App-header">
            {score === 100 ?
                <VictoryAnimation /> :
                <GameOver />}
            <span>Il tuo risultato è: {score}</span>
            <span id="confettiReward" />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-10 border"
                onClick={play}>
                Play
            </button>
        </div>
    )
}

export default Result;