import { useNavigate } from "react-router-dom";

function NoPage() {

    const navigate = useNavigate()

    const home = () => {
        navigate("/");
    }


    return (
        <div className="App-header">
            No Page
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded border mt-2"
                onClick={() => home()}>
                Home
            </button>
        </div>
    )
}

export default NoPage;