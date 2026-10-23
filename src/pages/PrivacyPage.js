import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function Privacy() {
    return (
        <div style={{ "backgroundColor": "#282c34", "width": "auto" }} className="p-10">
            <div className="mb-4 flex items-center gap-4">
                <Link
                    to="/"
                    aria-label="Torna alla home"
                    className="flex-shrink-0 rounded-full bg-gray-700 p-3 text-white shadow-lg transition-colors duration-200 hover:bg-gray-600"
                >
                    <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                </Link>
                <h5 className="text-2xl text-white">
                    Privacy Policy di WordLines
                </h5>
            </div>
            <p className="text-white">
                Ultimo aggiornamento: 01/12/2024
            </p>

            <p class="text-white text-lg mt-2">
                Benvenuto su WordLines! La tua privacy è importante per noi. Questa Privacy Policy descrive come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali.
            </p>
            <hr class="text-white mt-3 mb-3"></hr>
            <h5 className="text-white text-2xl">
                1. Dati Raccolti
            </h5>
            <p class="text-white text-base">
                WordLines raccoglie esclusivamente i dati necessari per consentirti di registrare e salvare i punteggi del gioco.
                Le informazioni raccolte includono:</p>
            <ul className="text-white text-base list-disc mt-3">
                <li>
                    Nome utente: per identificarti nel gioco.
                </li>
                <li>
                    Punteggio: per registrare le tue prestazioni.
                </li>
                <li>
                    ID utente univoco: generato automaticamente per associare i dati al tuo profilo.
                </li>
            </ul>
            <p class="text-white text-base mt-3">
                Non raccogliamo altre informazioni personali, né monitoriamo o utilizziamo i tuoi dati per scopi diversi da quelli descritti in questa informativa.
            </p>
            <hr class="text-white mt-3 mb-3"></hr>
            <h5 className="text-white text-2xl">
                2. Modalità di Raccolta
            </h5>
            <p className="text-white text-base">
                I dati vengono acquisiti tramite Supabase, una piattaforma sicura e affidabile per la gestione e l'archiviazione delle informazioni. Supabase aderisce ai più alti standard di sicurezza per garantire la protezione dei dati.
            </p>
            <hr class="text-white mt-3 mb-3"></hr>
            <h5 className="text-white text-2xl">
                3. Utilizzo dei Dati
            </h5>
            <p className="text-white text-base mt-1">
                I dati raccolti vengono utilizzati esclusivamente per:</p>
            <ul className="text-white text-base list-disc mt-2">
                <li>
                    Registrare e mostrare i punteggi nel gioco.
                </li>
                <li>
                    Garantire la funzionalità e l'esperienza personalizzata del gioco.
                </li>
            </ul>
            <p class="text-white text-base mt-3">
                Non utilizzeremo i tuoi dati per finalità di marketing, pubblicità o analisi.
            </p>
            <hr class="text-white mt-3 mb-3"></hr>
            <h5 className="text-white text-2xl">
                4. Conservazione dei Dati
            </h5>
            <p class="text-white text-base mt-1">
                I dati saranno conservati su Supabase per il tempo necessario al mantenimento della tua esperienza di gioco. Se decidi di eliminare il tuo account, i dati saranno cancellati definitivamente dai nostri archivi.
            </p>
            <hr class="text-white mt-3 mb-3"></hr>
            <h5 className="text-white text-2xl">
                5. Condivisione dei Dati
            </h5>
            <p class="text-white text-base mt-1">
                Non condivideremo i tuoi dati personali con terze parti, salvo nei seguenti casi:
            </p>
            <ul className="text-white text-base list-disc mt-2">
                <li>
                    Obblighi di legge o richieste da parte delle autorità competenti.
                </li>
                <li>
                    Necessità tecniche relative al funzionamento della piattaforma (ad esempio, Supabase come provider).
                </li>
            </ul>
            <hr class="text-white mt-3 mb-3"></hr>
            <h5 className="text-white text-2xl">
                6. Sicurezza
            </h5>
            <p class="text-white text-base mt-1">
                Adottiamo misure tecniche e organizzative adeguate per proteggere i tuoi dati da accessi non autorizzati, perdita o divulgazione. Supabase utilizza protocolli di crittografia e altre tecnologie avanzate per garantire la sicurezza delle informazioni.
            </p>
            <hr class="text-white mt-3 mb-3"></hr>

            <h5 className="text-white text-2xl">
                7. Diritti degli Utenti
            </h5>
            <p class="text-white text-base mt-3">
                Hai il diritto di:</p>
            <ul className="text-white text-base list-disc mt-3">
                <li>
                    Accedere ai tuoi dati.
                </li>
                <li>
                    Richiedere la correzione o l'eliminazione dei tuoi dati.
                </li>
                <li>
                    Revocare il consenso al trattamento dei dati in qualsiasi momento (ciò potrebbe limitare alcune funzionalità del gioco).
                </li>
            </ul>
            <p class="text-white text-base mt-3">
                Per esercitare questi diritti, puoi contattarci all'indirizzo email: [inserire email di supporto].
            </p>

            <h5 className="text-white text-2xl">
                8. Modifiche alla Privacy Policy
            </h5>
            Potremmo aggiornare questa Privacy Policy per riflettere eventuali modifiche nei servizi o nella normativa applicabile. Ti informeremo di eventuali cambiamenti significativi tramite il sito.


            <h5 className="text-white text-2xl">
                9. Contatti
            </h5>
            Per domande o dubbi sulla nostra Privacy Policy, puoi contattarci all'indirizzo:
            [inserire email di supporto].

            Grazie per aver scelto WordLines! 😊


        </div>
    )
}

export default Privacy;