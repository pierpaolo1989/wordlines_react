import { createClient } from "@supabase/supabase-js";
import { CSSProperties, useContext, useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Context } from "./GameContext";
import GameNavbar from "./GameNavbar";
import LineCard from "./LineCard";
import Timer from "./Timer";

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_KEY);

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "blue",
};

function Lines() {

    const [lines, setLines] = useState()
    const [loading] = useState(true)
    const [color] = useState("#ffffff");
    const { index } = useContext(Context)

    useEffect(() => {
        getLines();
    }, []);

    async function getLines() {
        if (process.env.REACT_APP_MOCKED === "true") {
            setLines([
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
                {
                    "id": 4,
                    "p1": "CAMINO",
                    "p2": "CALZA",
                    "p3": "PENNELLO"
                },
                {
                    "id": 5,
                    "p1": "PALO",
                    "p2": "COMPLICE",
                    "p3": "SGUARDO"
                },
                {
                    "id": 6,
                    "p1": "PENNELLO",
                    "p2": "BARBA",
                    "p3": "PALO"
                },
                {
                    "id": 7,
                    "p1": "DECANTARE",
                    "p2": "VINO",
                    "p3": "BOTTIGLIA"
                },
                {
                    "id": 8,
                    "p1": "TAGLIO",
                    "p2": "NETTO",
                    "p3": "CONTENUTO"
                },
                {
                    "id": 9,
                    "p1": "CAVALUCCIO",
                    "p2": "MARINO",
                    "p3": "SALE"
                },
                {
                    "id": 10,
                    "p1": "LIBERO",
                    "p2": "POSTO",
                    "p3": "COPERTO"
                }
            ])
        } else {
            let language = localStorage.getItem("language")
            const { data } = await supabase.rpc(language === "IT" ? "get_random_lines" : "get_random_lines_eng");
            setLines(data);
        }
    }

    return (
        <div>
            
            <GameNavbar />
            
            <div className="App-header mt-minus-20">

                <Timer />
                <br />
                {lines ?
                    <LineCard key={lines[index].id} p1={lines[index].p1} p2={lines[index].p2} p3={lines[index].p3} />

                    : <ClipLoader
                        color={color}
                        loading={loading}
                        cssOverride={override}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />

                }

            </div>
        </div>
    )
}

export default Lines;