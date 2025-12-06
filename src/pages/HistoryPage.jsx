import { loadHistory } from "../utils/history";
import "../styles/HistoryPage.css";
import { useEffect, useState } from "react";

function HistoryPage() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    setRecords(loadHistory());
  }, []);

  return (
    <div className="history-container">
      <h1 className="history-title">History</h1>

      <ul className="history-list">
        {records.map((item, idx) => (
          <li key={idx} className="history-item">
            <p>정확도: {item.accuracy}%</p>
            <p>
              정답/오타: {item.correct}/{item.wrong}
            </p>
            <p>{new Date(item.timestamp).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HistoryPage;
