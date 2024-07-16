import { createClient } from "@supabase/supabase-js";
import { createContext, useState } from "react";

export const Context = createContext()
export const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_KEY);

function GameContext({ children }) {

    const [score, setScore] = useState(0)
    const [index, setIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [showAnimation, setShowAnimation] = useState(false);
    const [up, setUp] = useState(3) 

    return (
        <Context.Provider value={{score, setScore, index, setIndex, up, setUp, timeLeft, setTimeLeft, showAnimation, setShowAnimation}}>
            {children}
        </Context.Provider>
    )

}

export default GameContext;