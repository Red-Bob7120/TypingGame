import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ResultPage.css";
import {compareResult} from "../utils/compareResult"

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

const { correct, wrong, accuracy, snippet, input, elapsedTime, wpm } =
  location.state || {};

const highlighted = compareResult(snippet,input);
  return (
    <div className="result-container">
      <h1 className="result-title">결과 페이지</h1>

      <div className="result-stats">
        <p>정답 수: {correct}</p>
        <p>오타 수: {wrong}</p>
        <p>정확도: {accuracy}%</p>
        <p>총 걸린 시간: {elapsedTime}초</p>
        <p>WPM: {wpm}</p>
      </div>

      <div className="result-highlight-box">
        {highlighted.map((item,idx)=>(
          <span
            key={idx}
              className={
              item.status === "correct"
                ? "correct-char"
                : item.status === "wrong"
                ? "wrong-char"
                : "pending-char"
            }
            >
              {item.char === "\n"?<br/> : item.char}
            </span>
        ))}
      </div>

      <div className="result-box">
        <h3>입력한 내용</h3>
        <pre>{input}</pre>
      </div>

      <div className="result-box">
        <h3>원본 예문</h3>
        <pre>{snippet}</pre>
      </div>

      <div className="result-buttons">
        <button onClick={() => navigate("/practice")}>다시하기</button>
        <button onClick={() => navigate("/")}>홈으로</button>
      </div>
    </div>
  );
}

export default ResultPage;
