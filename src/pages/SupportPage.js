import { useNavigate } from "react-router-dom";

function Support() {

    const navigate = useNavigate()

    const home = () => {
        navigate("/");
    }


    return (
        <div className="App-header">
            Contact us: <a href="mailto:pierpaolo.pdd@gmail.com">pierpaolo.pdd@gmail.com</a>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 rounded border mt-4"
                onClick={() => home()}>
                Home
            </button>
        </div>
    )
}

export default Support;