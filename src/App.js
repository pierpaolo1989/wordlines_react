import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Lines from './pages/Lines';
import NoPage from './pages/NoPage';
import MainPage from './pages/MainPage';
import GameContext from './pages/GameContext';

function App() {
  return (
    <GameContext>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
        <Route path="/lines" element={<Lines />} />
        <Route path="/*" element={<NoPage />} />
    </Routes>
  </BrowserRouter>
  </GameContext>
  );
}

export default App;
