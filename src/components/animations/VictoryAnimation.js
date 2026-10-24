import React, { useEffect } from 'react';
import './VictoryAnimation.css';
import { useReward } from 'react-rewards';

const VictoryAnimation = () => {

  const { reward: confettiReward } = useReward('confettiReward', 'confetti');
  useEffect(() => {
    confettiReward();
  }, [confettiReward]);

    return (
      <div className="victory-screen" role="status" aria-live="polite">
        <div className="victory-panel">
          <span className="victory-label">PLAYER 1 · END OF GAME</span>
          <div className="victory-title" data-text="GOOD JOB">GOOD JOB</div>
          <span className="victory-status">LEVEL CLEARED</span>
        </div>
      </div>
    );
};

export default VictoryAnimation;