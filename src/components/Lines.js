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
                { !mute ? <audio ref={audioRef} src={audio} loop /> : <></> }
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