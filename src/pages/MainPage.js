import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GB, IT } from 'country-flag-icons/react/3x2';
import { useNavigate } from "react-router-dom";
import MainPageNavbar from './MainPageNavbar';

function MainPage() {

    const navigate = useNavigate()

    const play = () => {
        let language = localStorage.getItem('language');
        navigate("/lines/" + language);
    }

    const selectLanguage = (id) => {
        let element = document.getElementById(id);
        element.classList.add("borderFlagSelected");
        let otherElement = document.getElementById(id === "IT" ? "GB" : "IT");
        otherElement.classList.remove("borderFlagSelected");
        localStorage.setItem('language', id);

    }
        return (
            <div>
                <MainPageNavbar />
                <div className="App-header mt-minus-20">
                    <span className="mb-5 grid">
                        <GB title="Great Britain" width={60} className="mb-2 borderFlag" onClick={() => selectLanguage("GB")} id="GB" />
                        <IT title="Italy" width={60} className=" borderFlag borderFlagSelected" onClick={() => selectLanguage("IT")} id="IT" />
                    </span>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded border"
                        onClick={() => play()}>
                        <FontAwesomeIcon icon={faPlay} className="text-white-500 m-1" /> Play
                    </button>
                </div>
            </div>
        )
    }

export default MainPage;