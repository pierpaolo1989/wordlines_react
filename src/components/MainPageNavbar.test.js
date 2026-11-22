import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Context } from "./GameContext";
import MainPageNavbar from "./MainPageNavbar";
import { ThemeProvider } from "./ThemeContext";

jest.mock("../utils/SupabaseClient", () => ({
  supabase: { auth: { getUser: () => Promise.resolve({ data: { user: null } }) } },
}));

test("leaderboard navbar shows the standard back arrow on the left", () => {
  render(
    <MemoryRouter initialEntries={["/leaderboard"]}>
      <Context.Provider value={{ mute: false, setMute: jest.fn() }}>
        <MainPageNavbar />
      </Context.Provider>
    </MemoryRouter>
  );
  const back = screen.getByRole("link", { name: "Torna alla home" });
  expect(back).toHaveAttribute("href", "/");
  expect(back.querySelector("svg")).toHaveAttribute("data-icon", "arrow-left");
  expect(back.querySelector("svg")).toHaveClass("fa-lg");
  expect(screen.queryByRole("button", { name: /Attiva tema/ })).not.toBeInTheDocument();
});

test("home theme control shares the navbar actions and changes the app theme", () => {
  localStorage.removeItem("theme");
  render(
    <MemoryRouter initialEntries={["/"]}>
      <ThemeProvider>
        <Context.Provider value={{ mute: false, setMute: jest.fn() }}>
          <MainPageNavbar />
        </Context.Provider>
      </ThemeProvider>
    </MemoryRouter>
  );
  const theme = screen.getByRole("button", { name: "Attiva tema chiaro" });
  const sound = screen.getByRole("button", { name: "Disattiva audio" });
  const login = screen.getByRole("button", { name: "Accedi" });
  expect(theme.parentElement).toBe(sound.parentElement);
  expect(theme.parentElement).toBe(login.parentElement);
  fireEvent.click(theme);
  expect(document.documentElement.dataset.theme).toBe("light");
  expect(localStorage.getItem("theme")).toBe("light");
});
