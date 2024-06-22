import { useContext } from "react";
import { Context } from "./GameContext";

function LineCard({ p1, p2, p3 }) {
    const firstLetter = p2.substring(0, 1);
    const lastLetter = p2.substring(p2.length - 1);
    const p2Array = [];

    const { setIndex } = useContext(Context)
    const { setScore } = useContext(Context)

    for (let i = 1; i < p2.length - 1; i++) {
        p2Array.push(p2.charAt(i));
    }

    const style = {
        "text-transform": "uppercase",
        "textAlign": "center"
    }

    const checkWord = () => {
        setIndex((index) => index+1)
        setScore((score) => score + 10)
    }

    const handleChange = (event) => {
        console.log(event)
        const form = event.target.form;
        const _index = [...form].indexOf(event.target);
        console.log(_index)
        if(_index < p2Array.length-1){
            form[_index + 1].focus();
            event.preventDefault();
        } else {
            form[_index].blur();
        }
    }

    return (
        <div className="text-center">
            <p className="text-5xl">{p1}</p>
            <div className="second_word mt-5">
                <form>
                    <span className="mr-2">{firstLetter}</span>
                    {p2Array.map((x) =>
                        <input type="text" style={style} onChange={(event) => handleChange(event)}
                            className="w-10 mx-2 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            smaxLength="1"></input>
                    )}
                    <span className="ml-2">{lastLetter}</span>
                </form>
            </div>
            <p className="text-5xl mt-5">{p3}</p>
            <div className="pulsantiera">
                <button className="bg-blue-500 mt-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={checkWord}>
                    Check
                </button>
            </div>
        </div>
    )
}

export default LineCard;