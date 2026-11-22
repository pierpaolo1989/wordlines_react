import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "./GameContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCoins, faHeart } from "@fortawesome/free-solid-svg-icons";
import ScoreAnimation from "./animations/ScoreAnimation";
import '../components/animations/LifeAnimation.css'

function GameNavbar({ onHome }) {

    const { score, up, showAnimation, resetGame } = useContext(Context)

    const goToHome = (event) => {
        if (onHome) onHome(event)
        else resetGame()
    }

    const for_loop = []
    for (let i = 0; i < up; i++) {
        for_loop.push(
            <FontAwesomeIcon icon={faHeart} className="text-red-500 m-1" key={i} />
        );
    };

    return (

        <nav className="theme-surface">
            <div className="mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="flex min-w-0 flex-1 items-center justify-start">
                        <div className="flex flex-shrink-0 items-center gap-3">
                            <Link
                                to="/"
                                onClick={goToHome}
                                aria-label="Torna alla home"
                                className="flex-shrink-0 rounded-full bg-gray-700 p-3 text-base text-white shadow-lg transition-colors duration-200 hover:bg-gray-600"
                            >
                                <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                            </Link>
                            <span className="theme-text flex items-center gap-2 font-semibold text-xl text-white tracking-tight">
                                <FontAwesomeIcon icon={faCoins} className="text-yellow-400" aria-hidden="true" />
                                <ScoreAnimation score={score} />
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-shrink-0 items-center">
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