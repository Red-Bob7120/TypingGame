import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PracticePage.css";
import snippets from "../data/snippets.json";
import { compareText } from "../utils/compare";
import { getHighlightedSnippet } from "../utils/highlight";
import { calculateAccuracy } from "../utils/accuracy";
import { calculateWPM } from "../utils/wpm";
import { saveHistory } from "../utils/history";

function PracticePage() {
  const navigate = useNavigate();

  const [snippet, setSnippet] = useState("");
  const [input, setInput] = useState("");
  const [highlighted, setHighlighted] = useState([]);

  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  const [elapsedTime, setElapsedTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [wpm, setWPM] = useState(0);

  useEffect(() => {
    const random = snippets[Math.floor(Math.random() * snippets.length)];
    setSnippet(random.content);

    const id = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    setIntervalId(id);

    return () => clearInterval(id);
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

      const typedCharacters = input.length;
      const newWPM = calculateWPM(typedCharacters, elapsedTime);
      setWPM(newWPM);

      if (input.length === snippet.length) {
        clearInterval(intervalId);

        saveHistory({
          correct: result.correct,
          wrong: result.wrong,
          accuracy: acc,
          snippet: snippet,
          input: input,
          elapsedTime: elapsedTime,
          wpm: newWPM,
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
              elapsedTime: elapsedTime,
              wpm: newWPM,
            },
          });
        }, 700);
      }
    }
  }, [input, snippet, elapsedTime]);

  return (
    <div className="practice-container">
      <h1 className="practice-title">Practice Page</h1>
      <p className="practice-desc">VSCode 스타일 타자 연습</p>

      <div className="snippet-box">
        <div className="line-numbers">
          {snippet.split("\n").map((_, index) => (
            <div key={index}>{index + 1}</div>
          ))}
        </div>

        <div className="code-content">
          {highlighted.map((item, idx) =>
            item.char === "\n" ? (
              <br key={idx} />
            ) : (
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
                {item.char}
              </span>
            )
          )}
        </div>
      </div>

      <div className="stats-box">
        <p>정답: {correct}</p>
        <p>오타: {wrong}</p>
        <p>정확도: {accuracy}%</p>
        <p>경과 시간: {elapsedTime}초</p>
        <p>WPM: {wpm}</p>
      </div>

      <textarea
        className="input-area"
        placeholder="여기에 입력하세요..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Tab") {
            e.preventDefault();

            const start = e.target.selectionStart;
            const end = e.target.selectionEnd;
            const value = e.target.value;

            if (e.shiftKey) {
              const lineStart = value.lastIndexOf("\n", start - 1) + 1;
              const line = value.substring(lineStart, start);

              if (line.startsWith("    ")) {
                const newValue =
                  value.substring(0, lineStart) +
                  value.substring(lineStart + 4);

                setInput(newValue);

                setTimeout(() => {
                  e.target.selectionStart = start - 4;
                  e.target.selectionEnd = end - 4;
                }, 0);
              }
              return;
            }

            const newValue =
              value.substring(0, start) + "    " + value.substring(end);

            setInput(newValue);

            setTimeout(() => {
              e.target.selectionStart = e.target.selectionEnd = start + 4;
            }, 0);
          }
        }}
      ></textarea>
    </div>
  );
}

export default PracticePage;
