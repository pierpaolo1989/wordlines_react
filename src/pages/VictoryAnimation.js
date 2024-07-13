import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './VictoryAnimation.css';

const VictoryAnimation = () => {
  const show = true
  return (
    <div className="victory-container">
      <CSSTransition
        in={show}
        timeout={500}
        classNames="confetti"
        unmountOnExit
      >
        <div className="confetti"></div>
      </CSSTransition>
    </div>
  );
};

export default VictoryAnimation;