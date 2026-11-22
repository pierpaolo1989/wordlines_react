import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "./ThemeContext";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const nextTheme = theme === "dark" ? "light" : "dark";
  const label = nextTheme === "light" ? "Attiva tema chiaro" : "Attiva tema scuro";

  return (
    <button
      type="button"
      className="nav-action"
      aria-label={label}
      title={label}
      onClick={() => setTheme(nextTheme)}
    >
      <FontAwesomeIcon icon={theme === "dark" ? faMoon : faSun} aria-hidden="true" />
    </button>
  );
}

export default ThemeToggle;
