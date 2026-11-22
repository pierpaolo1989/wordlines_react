import { GB, IT } from 'country-flag-icons/react/3x2';
import { useNavigate } from "react-router-dom";
import MainPageNavbar from '../components/MainPageNavbar';
import Footer from '../components/Footer';
import { useContext, useState } from 'react';
import { Context } from '../components/GameContext';

function MainPage() {

    const navigate = useNavigate()
    const { resetGame } = useContext(Context)
    const [language, setLanguage] = useState(() => localStorage.getItem('language') === 'GB' ? 'GB' : 'IT')

    const play = () => {
        resetGame();
        let language = localStorage.getItem('language');
        navigate("/lines/" + language);
    }

    const battle = () => {
        resetGame();
        navigate("/battle");
    }

    const leaderboard = () => {
        navigate("/leaderboard");
    }


    const selectLanguage = (id) => {
        setLanguage(id);
        localStorage.setItem('language', id);

    }
        return (
            <>
            <div>
                <MainPageNavbar />
                <div className="App-header mt-minus-20">
                    <div className="mb-5 flex flex-row mb-2">
                        <IT title="Italiano" width={60} className={`borderFlag mr-5 ${language === "IT" ? "borderFlagSelected" : ""}`} onClick={() => selectLanguage("IT")} id="IT" />
                        <GB title="Great Britain" width={60} className={`borderFlag ${language === "GB" ? "borderFlagSelected" : ""}`} onClick={() => selectLanguage("GB")} id="GB" />
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded border w-64"
                        onClick={() => play()}>
                        Play
                    </button>
                    <button className="bg-blue-500 mt-2 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded border w-64"
                        onClick={() => battle()}>
                        Battle
                    </button>
                    <button className="bg-blue-500 mt-2 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded border w-64"
                        onClick={leaderboard}>
                        Classifica
                    </button>
                </div>
                </div>
                <div>
                <Footer></Footer>
            </div>
            </>
        )
    }

export default MainPage;