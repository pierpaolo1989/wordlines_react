import { fireEvent, render, screen } from "@testing-library/react";
import ThemeToggle from "./ThemeToggle";
import { ThemeProvider } from "./ThemeContext";

beforeEach(() => {
  localStorage.removeItem("theme");
  delete document.documentElement.dataset.theme;
});

test("defaults to dark and persists both theme choices", () => {
  const view = render(<ThemeProvider><ThemeToggle /></ThemeProvider>);
  expect(document.documentElement.dataset.theme).toBe("dark");
  expect(screen.getByRole("button", { name: "Attiva tema chiaro" }).querySelector("svg"))
    .toHaveAttribute("data-icon", "moon");
  fireEvent.click(screen.getByRole("button", { name: "Attiva tema chiaro" }));
  expect(document.documentElement.dataset.theme).toBe("light");
  expect(localStorage.getItem("theme")).toBe("light");
  expect(screen.getByRole("button", { name: "Attiva tema scuro" }).querySelector("svg"))
    .toHaveAttribute("data-icon", "sun");

  view.unmount();
  render(<ThemeProvider><ThemeToggle /></ThemeProvider>);
  expect(screen.getByRole("button", { name: "Attiva tema scuro" })).toBeInTheDocument();
  expect(document.documentElement.dataset.theme).toBe("light");
  fireEvent.click(screen.getByRole("button", { name: "Attiva tema scuro" }));
  expect(localStorage.getItem("theme")).toBe("dark");
  expect(document.documentElement.dataset.theme).toBe("dark");
});
