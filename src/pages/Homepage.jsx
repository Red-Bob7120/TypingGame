import {useNavigate} from "react-router-dom";
import "../styles/Homepage.css";

function HomePage(){

    const navigate = useNavigate();

    return (
        <div className="home-container">
            <h1 className="home-title">Homepage</h1>
            <p className="home-desc">타자 연습 웹</p>

            <button 
            className="start-button" 
            onClick={()=>navigate("/practice")}>
                연습 시작하기
            </button>
        </div>
    );
}

export default HomePage;