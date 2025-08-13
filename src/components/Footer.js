import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Footer() {

    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);


    const goToPrivacy = () => {
        navigate("/privacy");
    }

    const openGithub = () => {
        window.open('https://github.com/pierpaolo1989/wordlines_react', '_blank');
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const openAboutModal = () => {
        setIsModalOpen(true);
    }

    return (
        <>
            <div className=" bg-gray-900" style={{ "backgroundColor": "#282c34" }}>
                <div className="mt-minus-20 max-w-2xl mx-auto text-white">
                    <div className="flex flex-col md:flex-row md:justify-center items-center text-sm text-gray-400">
                        <div className="order-1 md:order-2" style={{ 'margin-top': '-45px' }}>
                            <span className="px-2 border-l pointer" onClick={openAboutModal}>About us</span>
                            <span className="px-2 border-l pointer" onClick={goToPrivacy}>Privacy Policy</span>
                            <span className="px-2 border-l border-r pointer" onClick={openGithub}>Github</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modale Full Screen */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="w-full h-full relative overflow-y-auto" style={{ "backgroundColor": "#282c34" }}>
                        {/* Pulsante X per chiudere */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-3xl font-bold z-10 w-10 h-10 flex items-center justify-center"
                        >
                            ×
                        </button>

                        {/* Contenuto della modale */}
                        <div className="p-8 pt-16 max-w-4xl mx-auto">
                            <h1 className="text-4xl font-bold text-blue-500 mb-8">About Us</h1>

                            <div className="text-gray-700 leading-relaxed space-y-6">
                                <p className="text-white">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                </p>
                                <p className="text-white">
                                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                                </p>
                                <p className="text-white">
                                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                                </p>
                                <p className="text-white">
                                    Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                                </p>
                                <p className="text-white">
                                    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Footer;