import { useNavigate } from "react-router-dom";

function Footer() {
    
    const navigate = useNavigate();    
    
    const goToPrivacy = () => {
        navigate("/privacy");
    }

    const openGithub = () => {
        window.open('https://github.com/pierpaolo1989/wordlines_react', '_blank');
    }

    return (
        <div className=" bg-gray-900" style={{ "backgroundColor": "#282c34" }}>
            <div className="mt-minus-20 max-w-2xl mx-auto text-white">
                <div className="flex flex-col md:flex-row md:justify-center items-center text-sm text-gray-400">
                    <div className="order-1 md:order-2" style={{'margin-top': '-45px'}}>
                        <span className="px-2 border-l pointer">About us</span>
                        <span className="px-2 border-l pointer" onClick={goToPrivacy}>Privacy Policy</span>
                        <span className="px-2 border-l border-r pointer" onClick={openGithub}>Github</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;