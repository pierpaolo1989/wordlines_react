import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Context } from "../components/GameContext";
import BattlePage from "./BattlePage";
import Result from "./ResultPage";
import { supabase } from "../utils/SupabaseClient";
import { getPlayer } from "../utils/player";

jest.mock("../utils/SupabaseClient", () => ({ supabase: { rpc: jest.fn() } }));
jest.mock("../utils/player", () => ({
  getPlayer: jest.fn(),
  scoreLanguage: () => "IT",
}));
jest.mock("../components/animations/GameOverAnimation", () => () => null);
jest.mock("../components/animations/VictoryAnimation", () => () => null);
jest.mock("../components/GameNavbar", () => () => null);
jest.mock("../components/Timer", () => () => <div>Timer</div>);
jest.mock("../components/LineCard", () => ({ p2 }) => <div>Parola: {p2}</div>);

const context = {
  score: 20, gameResult: "victory", gameFinished: true, index: 0,
  resetGame: jest.fn(), continueAfterInterstitial: jest.fn(), showInterstitial: false,
};

function renderPage(page, value = context) {
  return render(<MemoryRouter><Context.Provider value={value}>{page}</Context.Provider></MemoryRouter>);
}

beforeEach(() => {
  jest.clearAllMocks();
  Object.defineProperty(global, "crypto", {
    configurable: true, value: { randomUUID: () => "9ac95ec4-e09d-45ad-a86a-450fe8452236" },
  });
  localStorage.setItem("language", "IT");
});

test("saves the signed-in player's score automatically and shows its rank", async () => {
  getPlayer.mockResolvedValue({ id: "user", name: "Mario" });
  supabase.rpc.mockResolvedValue({ data: { id: 8, position: 3 }, error: null });
  renderPage(<Result />);
  expect(await screen.findByText(/posizione 3 in classifica/)).toBeInTheDocument();
  expect(screen.queryByLabelText(/nome per la classifica/i)).not.toBeInTheDocument();
  expect(supabase.rpc).toHaveBeenCalledWith("save_classic_score", expect.objectContaining({
    p_username: "Mario", p_score: 20, p_language: "IT",
  }));
});

test("guest enters a name and a failed save can be retried with the same submission id", async () => {
  getPlayer.mockResolvedValue(null);
  supabase.rpc.mockResolvedValueOnce({ error: { message: "offline" } })
    .mockResolvedValueOnce({ data: { id: 9, position: 4 }, error: null });
  renderPage(<Result />);
  fireEvent.change(await screen.findByLabelText(/nome per la classifica/i), { target: { value: "  Anna  " } });
  fireEvent.click(screen.getByText("Salva punteggio"));
  expect(await screen.findByRole("alert")).toHaveTextContent("offline");
  fireEvent.click(screen.getByText("Salva punteggio"));
  expect(await screen.findByText("Punteggio salvato.")).toBeInTheDocument();
  expect(supabase.rpc.mock.calls[0][1].p_submission_id).toBe(supabase.rpc.mock.calls[1][1].p_submission_id);
  expect(supabase.rpc.mock.calls[1][1].p_username).toBe("Anna");
});

test("battle uses shared words and shows the winner after both scores arrive", async () => {
  jest.useFakeTimers();
  process.env.REACT_APP_MOCKED = "true";
  const previousMinLines = process.env.REACT_APP_MIN_LINES_PER_GAMES;
  process.env.REACT_APP_MIN_LINES_PER_GAMES = "0";
  getPlayer.mockResolvedValue(null);
  const battle = {
    id: "battle", player1: "Anna", player2: "Mario",
    score1: null, score2: null, cancelled: false,
    lines: [{ id: 1, p1: "A", p2: "TEST", p3: "B" }],
  };
  supabase.rpc.mockImplementation(async (name) => {
    if (name === "battle_join_or_create") return { data: battle };
    if (name === "battle_finish") return { data: { ...battle, score1: 20 } };
    if (name === "battle_status") return { data: { ...battle, score1: 20, score2: 10 } };
    throw new Error(name);
  });
  const value = { ...context, gameFinished: false };
  const view = renderPage(<BattlePage />, value);
  fireEvent.change(await screen.findByLabelText("Il tuo nome"), { target: { value: "Anna" } });
  fireEvent.click(screen.getByText("Cerca o avvia una battle"));
  await waitFor(() => expect(screen.getByText("Parola: TEST")).toBeInTheDocument());
  view.rerender(<MemoryRouter><Context.Provider value={{ ...value, gameFinished: true }}>
    <BattlePage />
  </Context.Provider></MemoryRouter>);
  await waitFor(() => expect(screen.getByText(/Risultato inviato/)).toBeInTheDocument());
  await act(async () => { jest.advanceTimersByTime(3000); });
  expect(await screen.findByText("Vince Anna!")).toBeInTheDocument();
  expect(screen.getByText("Mario: 10 punti")).toBeInTheDocument();
  view.unmount();
  jest.useRealTimers();
  delete process.env.REACT_APP_MOCKED;
  process.env.REACT_APP_MIN_LINES_PER_GAMES = previousMinLines;
});
