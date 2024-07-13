import { useContext } from "react";
import { Context } from "./GameContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import ScoreAnimation from "./ScoreAnimation";
import './LifeAnimation.css'

function GameNavbar() {
    
    const {score} = useContext(Context)
    const {up} = useContext(Context)
    const {showAnimation} = useContext(Context)

    const for_loop = []
    for (let i = 0; i < up; i++) {
        for_loop.push(
            <FontAwesomeIcon icon={faHeart} className="text-red-500 m-1" key={i} />
        );
    };
    
    const style = {
        "backgroundColor": "#282c34",
    }

    return (
        <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6 h-2" style={style}>
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <span className="font-semibold text-xl tracking-tight">  <ScoreAnimation score={score} /></span>
                </div>
                <div className="block lg:hidden">
                    <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                        <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                    </button>
                </div>
                <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                    <div className="text-sm lg:flex-grow">
                    </div>
                    <div>
                        {for_loop}
                        {showAnimation && <div className="life-animation">{"-1 Life" }</div>}
                    </div>
                </div>
            </nav>
    )
}

export default GameNavbar;