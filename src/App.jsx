import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/HomePage";
import PracticePage from "./pages/PracticePage";
import ResultPage from "./pages/ResultPage";
import HistoryPage from "./pages/HistoryPage";

function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
      <Link to="/">Home</Link>
      <Link to="/practice">Practice</Link>
      <Link to="/history">History</Link>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
