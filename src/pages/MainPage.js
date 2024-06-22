import { useNavigate } from "react-router-dom";

function MainPage() {

    const navigate = useNavigate()
    
    const play = () => {
        navigate("/lines");
    }

    return (
        <div className="App-header">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={play}>
                Play
            </button>
        </div>
    )
}

export default MainPage;