import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Account from './components/Account';
import GameContext from './components/GameContext';
import Lines from './components/Lines';
import Login from './pages/LoginPage';
import MainPage from './pages/MainPage';
import NoPage from './pages/NoPage';
import Register from './pages/RegisterPage';
import Result from './pages/ResultPage';
import Support from './pages/SupportPage';

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
        <Route path="/profile" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Register />} />
        <Route path="/support" element={<Support />} />
        <Route path="/*" element={<NoPage />} />
    </Routes>
  </BrowserRouter>
  </GameContext>
  );
}

export default App;
