import { IT, GB } from 'country-flag-icons/react/3x2';
import { useNavigate } from "react-router-dom";

function MainPage() {

    const navigate = useNavigate()
    
    const play = () => {
        let language = localStorage.getItem('language');
        navigate("/lines/" + language);
    }

    const selectLanguage = (id) => {
        var element = document.getElementById(id);
        element.classList.add("borderFlagSelected");
        var otherElement = document.getElementById(id === "IT" ? "GB" : "IT");
        otherElement.classList.remove("borderFlagSelected");
        localStorage.setItem('language', id);

    }

    return (
        <div className="App-header">
            <span className="mb-5 grid">
            <GB title="Great Britain" width={50} className="mb-2 borderFlag" onClick={() => selectLanguage("GB")} id="GB"/>
            <IT title="Italy" width={50} className=" borderFlag borderFlagSelected" onClick={() => selectLanguage("IT")} id="IT"/>  
            </span>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => play()}>
                Play
            </button>
        </div>
    )
}

export default MainPage;