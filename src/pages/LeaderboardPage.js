import { useEffect, useState } from "react";
import MainPageNavbar from "../components/MainPageNavbar";
import { supabase } from "../utils/SupabaseClient";

function LeaderboardPage() {
  const [language, setLanguage] = useState(
    () => (localStorage.getItem("language") === "IT" ? "IT" : "EN")
  );
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function getScores() {
      setLoading(true);
      setError(null);

      const { data, error: queryError } = await supabase
        .from("score")
        .select("id, username, language, score")
        .eq("language", language)
        .order("score", { ascending: false });

      if (ignore) return;

      if (queryError) {
        console.error("Errore nel caricamento della classifica:", queryError);
        setError("Impossibile caricare la classifica. Riprova più tardi.");
      } else if (!data) {
        console.error("Supabase non ha restituito dati per la classifica.");
        setError("Impossibile caricare la classifica. Riprova più tardi.");
      } else {
        setScores(data);
      }
      setLoading(false);
    }

    getScores();

    return () => {
      ignore = true;
    };
  }, [language]);

  const selectLanguage = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    localStorage.setItem(
      "language",
      selectedLanguage === "EN" ? "GB" : selectedLanguage
    );
  };

  return (
    <>
      <MainPageNavbar />
      <main className="min-h-screen bg-[#282c34] px-4 py-10 text-white">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-6 text-center text-3xl font-semibold">
            Classifica
          </h1>

          <div className="mb-6 flex justify-center gap-3">
            {[
              { code: "IT", label: "Italiano" },
              { code: "EN", label: "English" },
            ].map(({ code, label }) => (
              <button
                key={code}
                type="button"
                aria-pressed={language === code}
                className={`rounded border px-4 py-2 font-medium ${
                  language === code
                    ? "border-blue-500 bg-blue-600 text-white"
                    : "border-gray-500 bg-gray-800 text-gray-200"
                }`}
                onClick={() => selectLanguage(code)}
              >
                {label}
              </button>
            ))}
          </div>

          {loading ? (
            <p className="text-center text-gray-300" role="status">
              Caricamento classifica...
            </p>
          ) : error ? (
            <p className="text-center text-red-300" role="alert">
              {error}
            </p>
          ) : scores.length === 0 ? (
            <p className="text-center text-gray-300">
              Non ci sono ancora punteggi per questa lingua.
            </p>
          ) : (
            <ol className="divide-y divide-gray-600 overflow-hidden rounded-lg bg-gray-800">
              {scores.map((entry, index) => (
                <li
                  key={entry.id}
                  className="flex items-center justify-between gap-4 px-4 py-3"
                >
                  <span className="w-10 font-semibold text-gray-300">
                    {index + 1}.
                  </span>
                  <span className="flex-1 truncate">
                    {entry.username || "Giocatore"}
                  </span>
                  <span className="font-bold tabular-nums">{entry.score}</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </main>
    </>
  );
}

export default LeaderboardPage;
