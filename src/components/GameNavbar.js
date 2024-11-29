import { useContext } from "react";
import { Context } from "./GameContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import ScoreAnimation from "./animations/ScoreAnimation";
import '../components/animations/LifeAnimation.css'
import { useNavigate } from "react-router-dom";

function GameNavbar() {

    const { score } = useContext(Context)
    const { up } = useContext(Context)
    const { showAnimation } = useContext(Context)
    const navigate = useNavigate()

    const for_loop = []
    for (let i = 0; i < up; i++) {
        for_loop.push(
            <FontAwesomeIcon icon={faHeart} className="text-red-500 m-1" key={i} />
        );
    };

    const style = {
        "backgroundColor": "#282c34",
    }

    const goToHome = () => {
        navigate("/");
    }

    return (

        <nav style={style}>
            <div className="mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <span className="font-semibold text-xl text-white tracking-tight mr-5" style={{'cursor': 'pointer'}} onClick={goToHome}> 
                                <FontAwesomeIcon icon={faHome} className="text-white-500 m-1" />    
                            </span>
                        </div>
                        <div className="flex flex-shrink-0 items-center">
                            <span className="font-semibold text-xl text-white tracking-tight">  <ScoreAnimation score={score} /></span>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="flex space-x-4">
                            <div>
                                <div className="relative inline-block text-left">
                                    <div>
                                        {for_loop}
                                        {showAnimation && <div className="life-animation">{"-1 Life"}</div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default GameNavbar;