import { CSSProperties, useContext, useEffect, useState, useRef } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import mockedData from '../mock.json';
import { Context } from "./GameContext";
import GameNavbar from "./GameNavbar";
import LineCard from "./LineCard";
import Timer from "./Timer";
import { supabase } from "../utils/SupabaseClient";
import audio from '../audio.mp3'


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
    const { mute } = useContext(Context)
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);

    const toggleSound = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        getLines();
        if (audioRef.current) {
            audioRef.current.play().catch((error) => {
                console.error("Errore durante l'avvio dell'audio:", error);
            });
        }
    }, []);

    async function getLines() {
        if (process.env.REACT_APP_MOCKED === "true") {
            setLines(mockedData);
            return;
        }

        let language = localStorage.getItem("language");
        const queryName = language === "IT" ? "get_random_lines" : "get_random_lines_eng";

        // Funzione per la chiamata a Supabase
        const supabaseCall = supabase.rpc(queryName);

        // Funzione timeout
        const timeout = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Timeout Supabase")), 5000)
        );

        try {
            const { data, error } = await Promise.race([supabaseCall, timeout]);

            if (error || !data) {
                console.error("Errore Supabase:", error);
                setLines(mockedData);
            } else {
                setLines(data);
            }
        } catch (err) {
            console.error("Errore/Timeout:", err);
            setLines(mockedData);
        }
    }

    return (
        <div>

            <GameNavbar />

            <div className="App-header mt-minus-20">

                <Timer />
                <br />
                {!mute ? <audio ref={audioRef} src={audio} loop /> : <></>}
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