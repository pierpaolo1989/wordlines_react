import { createContext, useState } from "react";

export const Context = createContext()

function GameContext({ children }) {

    const [score, setScore] = useState(0)
    const [index, setIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [showAnimation, setShowAnimation] = useState(false);
    const [mute, setMute] = useState(false);
    const [up, setUp] = useState(3) 
    const [numberHelp1, setNumberHelp1] = useState(Number(process.env.REACT_APP_HELP_1)) 
    const [numberHelp2, setNumberHelp2] = useState(Number(process.env.REACT_APP_HELP_2)) 

    return (
        <Context.Provider value={{score, setScore, index, setIndex, up, setUp, timeLeft, setTimeLeft, showAnimation, setShowAnimation, 
        mute, setMute, numberHelp1, setNumberHelp1, numberHelp2, setNumberHelp2}}>
            {children}
        </Context.Provider>
    )

}

export default GameContext;