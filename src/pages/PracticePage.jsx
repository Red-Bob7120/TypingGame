import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PracticePage.css";
import snippets from "../data/snippets.json";
import { compareText } from "../utils/compare";
import { getHighlightedSnippet } from "../utils/highlight";
import { calculateAccuracy } from "../utils/accuracy";
import { saveHistory } from "../utils/history";

function PracticePage() {
  const navigate = useNavigate();

  const [snippet, setSnippet] = useState("");
  const [input, setInput] = useState("");
  const [highlighted, setHighlighted] = useState([]);

  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  useEffect(() => {
    const random = snippets[Math.floor(Math.random() * snippets.length)];
    setSnippet(random.content);
  }, []);

  useEffect(() => {
    if (snippet.length > 0) {
      const result = compareText(snippet, input);
      setCorrect(result.correct);
      setWrong(result.wrong);

      const acc = calculateAccuracy(result.correct, result.wrong);
      setAccuracy(acc);

      const h = getHighlightedSnippet(snippet, input);
      setHighlighted(h);

      if (input.length === snippet.length) {
        saveHistory({
          correct: result.correct,
          wrong: result.wrong,
          accuracy: acc,
          snippet: snippet,
          input: input,
          timestamp: Date.now(),
        });

        setTimeout(() => {
          navigate("/result", {
            state: {
              correct: result.correct,
              wrong: result.wrong,
              accuracy: acc,
              snippet: snippet,
              input: input,
            },
          });
        }, 800);
      }
    }
  }, [input, snippet]);

  return (
    <div className="practice-container">
      <h1 className="practice-title">Practice Page</h1>

      <p className="practice-desc">실시간 비교 예문:</p>

      <div className="snippet-box">
        {highlighted.map((item, idx) => (
          <span
            key={idx}
            style={
              item.status === "correct"
                ? { color: "lime" }
                : item.status === "wrong"
                ? { color: "red" }
                : { color: "gray" }
            }
          >
            {item.char}
          </span>
        ))}
      </div>

      <div className="stats-box">
        <p>정답 수: {correct}</p>
        <p>오타 수: {wrong}</p>
        <p>정확도: {accuracy}%</p>
      </div>

      <textarea
        className="input-area"
        placeholder="여기에 입력해보세요..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
    </div>
  );
}

export default PracticePage;
