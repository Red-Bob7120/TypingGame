import {useNavigate} from "react-router-dom";



function HistoryPage (){
    const navigate = useNavigate();

    const handleStart = () => {
        navigate("/practice");
    }
    return(
        <div style ={{padding:"20px"}}>
            <h1>HistoryPage</h1>
            <p>연습기록 저장 및 표시</p>

            <button
                onClick={handleStart}연습 시작하기></button>
        </div>
    )
}
export default HistoryPage;