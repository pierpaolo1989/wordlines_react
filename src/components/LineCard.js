import { faArrowRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./GameContext";

function LineCard({ p1, p2, p3 }) {
    var firstLetter = p2.substring(0, 1);
    var lastLetter = p2.substring(p2.length - 1);
    const { setTimeLeft } = useContext(Context)
    const { numberHelp1, setNumberHelp1 } = useContext(Context)
    const { numberHelp2, setNumberHelp2 } = useContext(Context)


    const p2Array = [];
    const navigate = useNavigate()
    const multiplayer = process.env.REACT_APP_SCORE_MULTIPLAYER;

    const { index, setIndex } = useContext(Context)
    const { setScore } = useContext(Context)

    for (let i = 1; i < p2.length - 1; i++) {
        p2Array.push(p2.charAt(i));
    }

    const style = {
        "textTransform": "uppercase",
        "textAlign": "center"
    }

    const styleNotification = {
        "position": "relative",
        "top": "-30px",
        "right": "-20px",
        "padding": "4px 5px",
        "border-radius": "50%",
        "background": "red",
    }

    const getAllFormElements = element => Array.from(element.elements).filter(tag => ["input"].includes(tag.tagName.toLowerCase()));

    const checkWord = () => {
        let formEl = document.forms.Word;
        const pageFormElements = getAllFormElements(formEl);
        let word = firstLetter;
        pageFormElements.forEach((element) => {
            word = word + element.value;
        });
        word = word + lastLetter
        if (word.toLowerCase() === p2.toLowerCase()) {
            setScore((score) => score + parseInt(multiplayer))
            if (index < Number(process.env.REACT_APP_MIN_LINES_PER_GAMES)) {
                setIndex((index) => index + 1)
                setTimeLeft(30)
            } else {
                navigate("/result");
            }
        }
    }

    const addLetter = () => {
        try {
            let formEl = document.forms.Word;
            let isFound = false;
            const pageFormElements = getAllFormElements(formEl);
            if (numberHelp2 >= 1) {
                setNumberHelp2(prev => prev - 1);
                pageFormElements.forEach((element, idx) => {
                    if (element.value === "" || element.value === undefined) {
                        element.value = p2.substring(idx + 1, idx + 2);
                        formEl[idx + 1].focus();
                        isFound = true
                    };
                    if (isFound) {
                        throw new Error('Loop stopped');
                    }
                });
            }
        } catch (error) {
            console.log('Loop was stopped due to an exception.');
        }
    }

    const nextWord = () => {
        if (index < Number(process.env.REACT_APP_MIN_LINES_PER_GAMES)) {
            if (numberHelp1 >= 1) {
                setNumberHelp1(prev => prev - 1)
                setIndex((index) => index + 1)
                setTimeLeft(30)
            }
        } else {
            navigate("/result");
        }
    }

    const handleChange = (event) => {
        const form = event.target.form;
        const _index = [...form].indexOf(event.target);
        if (_index < p2Array.length - 1) {
            form[_index + 1].focus();
            event.preventDefault();
        } else if (_index < p2Array.length) {
            form[_index].focus();
        } else {
            form[_index].blur();
        }
    }

    const handleKeyPress = (event) => {
        if (event.keyCode === 13) {
            checkWord();
        } else if (event.keyCode === 8) {
            let formEl = document.forms.Word;
            const pageFormElements = getAllFormElements(formEl);
            pageFormElements.forEach((element) => {
                element.value = "";
                formEl[0].focus();
            });
        }
    }

    return (
        <div className="text-center">
            <p className="text-5xl">{p1.toUpperCase()}</p>
            <div className="second_word mt-5">
                <form id="Word">
                    <span className="mr-2">{firstLetter.toUpperCase()}</span>
                    {p2Array.map((x, i) =>
                        i === 0 ?
                            <input type="text" style={style} onChange={(event) => handleChange(event)} autoFocus key={i}
                                onKeyUpCapture={(event) => handleKeyPress(event)}
                                className="w-8 mx-2 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                maxLength="1"></input>
                            : <input type="text" style={style} onChange={(event) => handleChange(event)} key={i}
                                onKeyUpCapture={(event) => handleKeyPress(event)}
                                className="w-8 mx-2 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                maxLength="1"></input>
                    )}
                    <span className="ml-2">{lastLetter.toUpperCase()}</span>
                </form>
            </div>
            <p className="text-5xl mt-5">{p3.toUpperCase()}</p>
            <div className="pulsantiera">
                <button className="bg-blue-500 mt-10 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded border"
                    onClick={checkWord}>
                    Check
                </button>
            </div>
            <div className="helpers">
                <button className={numberHelp1 > 0 ? "bg-transparent m-5 hover:bg-blue-700 text-white py-1 px-2 rounded"
                    : "bg-transparent m-5 hover:bg-blue-700 text-white py-1 px-2 rounded opacity-50 cursor-not-allowed"}
                    onClick={nextWord}>
                    <FontAwesomeIcon icon={faArrowRight} className="text-white-500 m-1" />
                    <span className="text-white-500 text-xs" style={styleNotification}>{numberHelp1}</span>
                </button>
                <button className={numberHelp2 > 0 ? "bg-transparent m-5 hover:bg-blue-700 text-white py-1 px-2 rounded"
                    : "bg-transparent m-5 hover:bg-blue-700 text-white py-1 px-2 rounded opacity-50 cursor-not-allowed"}
                    onClick={addLetter}>
                    <FontAwesomeIcon icon={faPlus} className="text-white-500 m-1" />
                    <span className="text-white-500 text-xs" style={styleNotification}>{numberHelp2}</span>
                </button>
            </div>
        </div>
    )
}

export default LineCard;