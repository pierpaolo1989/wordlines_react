import { createContext, useState } from "react";

export const Context = createContext()

function GameContext({ children }) {

    const [score, setScore] = useState(0)
    const [index, setIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [showAnimation, setShowAnimation] = useState(false);
    const [mute, setMute] = useState(false);
    const [up, setUp] = useState(3) 

    return (
        <Context.Provider value={{score, setScore, index, setIndex, up, setUp, timeLeft, setTimeLeft, showAnimation, setShowAnimation, mute, setMute}}>
            {children}
        </Context.Provider>
    )

}

export default GameContext;