import { fireEvent, render, screen } from "@testing-library/react";
import { Context } from "./GameContext";
import LineCard from "./LineCard";

test("keeps letter entry and submission working for a long word", () => {
    const setScore = jest.fn();
    const setIndex = jest.fn();
    const originalMultiplier = process.env.REACT_APP_SCORE_MULTIPLAYER;
    const originalMinLines = process.env.REACT_APP_MIN_LINES_PER_GAMES;
    process.env.REACT_APP_SCORE_MULTIPLAYER = "10";
    process.env.REACT_APP_MIN_LINES_PER_GAMES = "5";

    render(
        <Context.Provider value={{
            index: 0, setIndex, setScore, setTimeLeft: jest.fn(), completeIteration: jest.fn(),
            numberHelp1: 1, setNumberHelp1: jest.fn(), numberHelp2: 1, setNumberHelp2: jest.fn(),
        }}>
            <LineCard p1="PRIMA" p2="STRAORDINARIO" p3="ULTIMA" />
        </Context.Provider>
    );

    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(11);
    expect(inputs[0]).toHaveFocus();
    "TRAORDINARI".split("").forEach((letter, index) => {
        fireEvent.change(inputs[index], { target: { value: letter } });
        if (index < inputs.length - 1) expect(inputs[index + 1]).toHaveFocus();
    });
    fireEvent.click(screen.getByRole("button", { name: "Check" }));
    expect(setScore).toHaveBeenCalledTimes(1);
    expect(setScore.mock.calls[0][0](0)).toBe(10);
    expect(setIndex).toHaveBeenCalledTimes(1);

    process.env.REACT_APP_SCORE_MULTIPLAYER = originalMultiplier;
    process.env.REACT_APP_MIN_LINES_PER_GAMES = originalMinLines;
});
