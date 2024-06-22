import { useContext } from "react";
import GameContext, { Context } from "./GameContext";
import LineCard from "./LineCard";
import Timer from "./Timer";

function Lines() {

    const { index } = useContext(Context)

    const lines = [
        {
            "id": 1,
            "p1": "VERDE",
            "p2": "INSALATA",
            "p3": "RUSSA"
        },
        {
            "id": 2,
            "p1": "NUDO",
            "p2": "INTEGRALE",
            "p3": "FARINA"
        },
        {
            "id": 3,
            "p1": "CAPOLAVORO",
            "p2": "MUSEO",
            "p3": "NOTTE"
        },
    ]

    return (
            <div className="App-header">
                <Timer />
                <br />
                <LineCard key={lines[index].id} p1={lines[index].p1} p2={lines[index].p2} p3={lines[index].p3} />
            </div>
    )
}

export default Lines;