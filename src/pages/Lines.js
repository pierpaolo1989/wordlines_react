import { CSSProperties, useContext, useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import mockedData from '../mock.json';
import { Context } from "./GameContext";
import GameNavbar from "./GameNavbar";
import LineCard from "./LineCard";
import Timer from "./Timer";
import { supabase } from "../utils/SupabaseClient";

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
            setLines(mockedData)
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