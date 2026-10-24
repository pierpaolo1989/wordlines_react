import React from 'react';
import './GameOver.css';

const GameOver = () => {

  return (
    <div className="gameover-screen">
      <div className="gameover-panel">
        <span className="gameover-label">PLAYER 1 · END OF GAME</span>
        <div className="gameover-title" data-text="GAME OVER">GAME OVER</div>
        <span className="gameover-status">MISSION FAILED</span>
      </div>
    </div>
  );
};

export default GameOver;