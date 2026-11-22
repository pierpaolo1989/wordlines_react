import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Context } from "./GameContext";
import GameNavbar from "./GameNavbar";

jest.mock("./animations/ScoreAnimation", () => ({ score }) => <span>{score}</span>);

function renderNavbar(onHome, resetGame) {
    render(
        <MemoryRouter>
            <Context.Provider value={{ score: 10, up: 3, showAnimation: false, resetGame }}>
                <GameNavbar onHome={onHome} />
            </Context.Provider>
        </MemoryRouter>
    );
}

test("back arrow resets the classic game", () => {
    const resetGame = jest.fn();
    renderNavbar(undefined, resetGame);
    const link = screen.getByRole("link", { name: "Torna alla home" });
    expect(link.querySelector("svg")).toHaveAttribute("data-icon", "arrow-left");
    fireEvent.click(link);
    expect(resetGame).toHaveBeenCalledTimes(1);
});

test("back arrow uses the battle exit handler", () => {
    const onHome = jest.fn((event) => event.preventDefault());
    const resetGame = jest.fn();
    renderNavbar(onHome, resetGame);
    fireEvent.click(screen.getByRole("link", { name: "Torna alla home" }));
    expect(onHome).toHaveBeenCalledTimes(1);
    expect(resetGame).not.toHaveBeenCalled();
});
