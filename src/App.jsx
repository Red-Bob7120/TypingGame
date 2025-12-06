import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'

import HomePage from './pages/Homepage'
import PracticePage from './pages/PracticePage'

function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
      <Link to="/">Home</Link>
      <Link to="/practice">Practice</Link>
    </nav>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/practice" element={<PracticePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
