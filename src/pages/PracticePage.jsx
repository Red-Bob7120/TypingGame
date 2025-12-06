import { useEffect, useState } from "react";
import "../styles/PracticePage.css";
import snippets from "../data/snippets.json";
import { compareText } from "../utils/compare";
import { getHighlightedSnippet } from "../utils/highlight";

function PracticePage() {
  const [snippet, setSnippet] = useState("");
  const [input, setInput] = useState("");
  const [highlighted, setHighlighted] = useState([]);

  useEffect(() => {
    const random = snippets[Math.floor(Math.random() * snippets.length)];
    setSnippet(random.content);
  }, []);

  useEffect(() => {
    if (snippet.length > 0) {
      const result = compareText(snippet, input);
      console.log("정답:", result.correct, "오타:", result.wrong);

      const h = getHighlightedSnippet(snippet, input);
      setHighlighted(h);
    }
  }, [input, snippet]);

  return (
    <div className="practice-container">
      <h1 className="practice-title">Practice Page</h1>

      <p className="practice-desc">실시간 비교 예문:</p>

      <div className="snippet-box">
        {highlighted.map((item, idx) => {
          let style = {};

          if (item.status === "correct") {
            style = { color: "lime" };          
          } else if (item.status === "wrong") {
            style = { color: "red" };           
          } else {
            style = { color: "gray" };         
          }

          return (
            <span key={idx} style={style}>
              {item.char}
            </span>
          );
        })}
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
