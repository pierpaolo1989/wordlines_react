import { useContext } from "react";
import { Context } from "./GameContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import ScoreAnimation from "./animations/ScoreAnimation";
import '../components/animations/LifeAnimation.css'

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