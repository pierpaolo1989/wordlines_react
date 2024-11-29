import React, { useEffect } from 'react';
import './VictoryAnimation.css';
import { useReward } from 'react-rewards';

const VictoryAnimation = () => {

  const {reward: confettiReward, isAnimating: isConfettiAnimating} = useReward('confettiReward', 'confetti');
  useEffect(() => {
    confettiReward();
  });

    return (
      <div className="gameover-container">
        <div className="gameover-text text-green-500">Good job</div>
      </div>
    );
};

export default VictoryAnimation;