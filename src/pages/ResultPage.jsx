import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ResultPage.css";

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { correct, worng, accuracy, snippet, input } = location.state || {
    correct: 0,
    wrong: 0,
    accuracy: "",
    input: "",
  };

  return (
    <div className="result-container">
      <h1 className="result-title">결과 페이지</h1>
      <div className="result-stats">
        <p>
          정답 수 : <strong>{correct}</strong>
        </p>
        <p>
          오타 수 : <strong>{worng}</strong>
        </p>
        <p>
          정확도 : <strong>{accuracy}%</strong>
        </p>
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
