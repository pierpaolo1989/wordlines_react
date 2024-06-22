import { createContext, useState } from "react";

export const Context = createContext()

function GameContext({ children }) {

    const [score, setScore] = useState(0)
    const [index, setIndex] = useState(0);

    return (
        <Context.Provider value={{score, setScore, index, setIndex}}>
            {children}
        </Context.Provider>
    )

}

export default GameContext;