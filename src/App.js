import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import GameContext from './pages/GameContext';
import Lines from './pages/Lines';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import NoPage from './pages/NoPage';
import Result from './pages/Result';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Support from './pages/Support';
import Account from './pages/Account';

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
