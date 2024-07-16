import { useContext } from "react";
import { Context } from "./GameContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import ScoreAnimation from "./ScoreAnimation";
import './LifeAnimation.css'

function MainPageNavbar() {
    
    const style = {
        "backgroundColor": "#282c34",
    }

    return (
        <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6 h-2" style={style}>
                <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                    <div className="text-sm lg:flex-grow">
                    </div>
                    <div>
                    <button className="flex items-center px-3 py-2 rounded bg-transparent text-white font-bold hover:text-white hover:border-white">
                        Login
                    </button>
                    </div>
                </div>
            </nav>
    )
}

export default MainPageNavbar;