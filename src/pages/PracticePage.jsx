import {useEffect,useState} from "react";
import "../styles/Practicepage.css";
import snippets from "../data/snippets.json";

function PracticePage(){
    const[snippet,setSnippet] = useState("");

    useEffect(()=> {
        const random = snippets[Math.floor(Math.random()*snippets.length)];
        setSnippet(random.content);
    },[])
    return(
        <div className="practice-container">

            <h1 className ="practice-title">Practice Page</h1>

            <p className="practice-desc">연습용 예문 및 입력창 추가</p>
            <div className="snippet-box">
                <pre>{snippet}</pre>
            </div>

            <textarea
                className="input-area"
                placeholder="여기에 입력해보세요..."
            ></textarea>
        </div>
    )
}

export default PracticePage;