import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import GameContext from './pages/GameContext';
import Lines from './pages/Lines';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import NoPage from './pages/NoPage';
import Result from './pages/Result';
import Profile from './pages/Profile';

function App() {

  localStorage.setItem("language", "IT")
  return (
    <GameContext>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/wordlines_react" element={<MainPage />} />
        <Route path="/lines/:language"element={<Lines />} />
        <Route path="/result" element={<Result />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<NoPage />} />
    </Routes>
  </BrowserRouter>
  </GameContext>
  );
}

export default App;
