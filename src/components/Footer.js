import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGlobe, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Footer() {
    const navigate = useNavigate();
    const [aboutOpen, setAboutOpen] = useState(false);

    useEffect(() => {
        if (!aboutOpen) {
            return undefined;
        }

        const closeOnEscape = (event) => {
            if (event.key === "Escape") {
                setAboutOpen(false);
            }
        };

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", closeOnEscape);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", closeOnEscape);
        };
    }, [aboutOpen]);

    const goToPrivacy = () => {
        navigate("/privacy");
    }

    const openGithub = () => {
        window.open('https://github.com/pierpaolo1989/wordlines_react', '_blank');
    }

    return (
        <>
            <div className="bg-gray-900" style={{ "backgroundColor": "#282c34" }}>
                <div className="mt-minus-20 max-w-2xl mx-auto text-white">
                    <div className="flex flex-col md:flex-row md:justify-center items-center text-sm text-gray-400">
                        <div className="order-1 md:order-2" style={{ 'margin-top': '-45px' }}>
                            <button type="button" className="px-2 border-l pointer" onClick={() => setAboutOpen(true)}>
                                About me
                            </button>
                            <span className="px-2 border-l pointer" onClick={goToPrivacy}>Privacy Policy</span>
                            <span className="px-2 border-l border-r pointer" onClick={openGithub}>Github</span>
                        </div>
                    </div>
                </div>
            </div>

            {aboutOpen && (
                <div
                    className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-gray-900 text-white"
                    style={{ backgroundColor: "#282c34" }}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="about-title"
                    onClick={() => setAboutOpen(false)}
                >
                    <button
                        type="button"
                        aria-label="Chiudi"
                        className="fixed right-5 top-5 z-10 rounded-full bg-gray-700 p-3 text-white shadow-lg transition-colors hover:bg-gray-600"
                        onClick={() => setAboutOpen(false)}
                    >
                        <FontAwesomeIcon icon={faXmark} size="lg" />
                    </button>

                    <div
                        className="m-auto flex w-full max-w-3xl flex-col items-center px-6 py-20 text-center"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <img
                            src={`${process.env.PUBLIC_URL}/avatar.png`}
                            alt="Immagine profilo di Pierpaolo Di Dato"
                            className="mb-6 h-40 w-40 rounded-full object-cover"
                        />
                        <h2 id="about-title" className="mb-4 text-3xl font-bold">
                            Pierpaolo Di Dato
                        </h2>
                        <p className="mb-8 max-w-xl text-lg text-gray-300">
                            Creatore di WordLines, un gioco di parole pensato per mettere alla prova
                            le proprie conoscenze e divertirsi. Il progetto unisce la passione per
                            lo sviluppo software alla voglia di creare un’esperienza semplice e
                            accessibile a tutti.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="https://pierpaolo1989.github.io/wordlines_react"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 rounded-md bg-gray-700 px-4 py-3 text-white transition-colors hover:bg-gray-600"
                            >
                                <FontAwesomeIcon icon={faGlobe} />
                                Sito WordLines
                            </a>
                            <a
                                href="https://www.linkedin.com/in/pierpaolo-di-dato/"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 rounded-md bg-gray-700 px-4 py-3 text-white transition-colors hover:bg-gray-600"
                            >
                                <FontAwesomeIcon icon={faLinkedin} />
                                LinkedIn
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Footer;