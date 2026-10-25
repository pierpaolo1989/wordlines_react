import { createContext, useCallback, useRef, useState } from "react";

export const Context = createContext()

const configuredMaxIterations = Number(process.env.REACT_APP_MAX_GAME_ITERATIONS);
const maxGameIterations = Number.isInteger(configuredMaxIterations) && configuredMaxIterations > 0
    ? configuredMaxIterations
    : 3;

function GameContext({ children }) {

    const [score, setScore] = useState(0)
    const [index, setIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [showAnimation, setShowAnimation] = useState(false);
    const [mute, setMute] = useState(false);
    const [up, setUp] = useState(3) 
    const [numberHelp1, setNumberHelp1] = useState(Number(process.env.REACT_APP_HELP_1)) 
    const [numberHelp2, setNumberHelp2] = useState(Number(process.env.REACT_APP_HELP_2)) 
    const [completedIterations, setCompletedIterations] = useState(0)
    const [showInterstitial, setShowInterstitial] = useState(false)
    const [gameFinished, setGameFinished] = useState(false)
    const [gameResult, setGameResult] = useState(null)
    const iterationTransitionStarted = useRef(false)

    const finishGame = useCallback((result) => {
        iterationTransitionStarted.current = true
        setShowInterstitial(false)
        setGameResult(result)
        setGameFinished(true)
    }, [])

    const completeIteration = useCallback((remainingLives = up) => {
        if (iterationTransitionStarted.current) {
            return
        }

        iterationTransitionStarted.current = true
        const nextIteration = completedIterations + 1
        setCompletedIterations(nextIteration)

        if (nextIteration < maxGameIterations) {
            setShowInterstitial(true)
        } else {
            finishGame(remainingLives > 0 ? "victory" : "defeat")
        }
    }, [completedIterations, finishGame, up])

    const continueAfterInterstitial = useCallback(() => {
        iterationTransitionStarted.current = false
        setShowInterstitial(false)
        setIndex(0)
        setTimeLeft(30)
    }, [])

    const resetGame = useCallback(() => {
        iterationTransitionStarted.current = false
        setScore(0)
        setIndex(0)
        setTimeLeft(30)
        setUp(3)
        setNumberHelp1(Number(process.env.REACT_APP_HELP_1))
        setNumberHelp2(Number(process.env.REACT_APP_HELP_2))
        setCompletedIterations(0)
        setShowInterstitial(false)
        setGameFinished(false)
        setGameResult(null)
    }, [])

    return (
        <Context.Provider value={{
            score, setScore, index, setIndex, up, setUp, timeLeft, setTimeLeft,
            showAnimation, setShowAnimation, mute, setMute, numberHelp1, setNumberHelp1,
            numberHelp2, setNumberHelp2, completedIterations, showInterstitial,
            setShowInterstitial, gameFinished, gameResult, finishGame, completeIteration,
            continueAfterInterstitial, resetGame
        }}>
            {children}
        </Context.Provider>
    )

}

export default GameContext;