import { useEffect, useState } from "react";

const MIN_DISPLAY_MILLISECONDS = 5000;

function InterstitialAnnouncement({ onContinue }) {
    const [canContinue, setCanContinue] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => setCanContinue(true), MIN_DISPLAY_MILLISECONDS);
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950 px-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="interstitial-title"
        >
            <div className="w-full max-w-xl rounded-lg border border-gray-600 bg-[#282c34] p-8 text-center text-white shadow-xl">
                <p className="mb-3 text-sm uppercase tracking-widest text-gray-400">
                    Spazio annuncio
                </p>
                <h2 id="interstitial-title" className="mb-4 text-3xl font-bold">
                    Pausa tra le catene
                </h2>
                <p className="mb-8 text-gray-300">
                    Questa schermata è un segnaposto: non viene mostrata una pubblicità reale.
                </p>
                <button
                    type="button"
                    className="rounded bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={onContinue}
                    disabled={!canContinue}
                >
                    {canContinue ? "Continua" : "Attendi..."}
                </button>
            </div>
        </div>
    );
}

export default InterstitialAnnouncement;
