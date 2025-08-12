import { GB, IT } from 'country-flag-icons/react/3x2';
import { useNavigate } from "react-router-dom";
import MainPageNavbar from '../components/MainPageNavbar';
import Footer from '../components/Footer';

function MainPage() {

    const navigate = useNavigate()

    const play = () => {
        let language = localStorage.getItem('language');
        navigate("/lines/" + language);
    }

    const battle = () => {
        navigate("/battle");
    }


    const selectLanguage = (id) => {
        let element = document.getElementById(id);
        element.classList.add("borderFlagSelected");
        let otherElement = document.getElementById(id === "IT" ? "GB" : "IT");
        otherElement.classList.remove("borderFlagSelected");
        localStorage.setItem('language', id);

    }
        return (
            <>
            <div>
                <MainPageNavbar />
                <div className="App-header mt-minus-20">
                    <div className="mb-5 flex flex-row mb-2">
                        <IT title="Russia" width={60} className="borderFlag borderFlagSelected mr-5" onClick={() => selectLanguage("IT")} id="IT" />
                        <GB title="Great Britain" width={60} className="borderFlag" onClick={() => selectLanguage("GB")} id="GB" />
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded border w-64"
                        onClick={() => play()}>
                        Play
                    </button>
                    <button className="bg-blue-500 mt-2 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded border w-64"
                        onClick={() => battle()}>
                        Battle
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