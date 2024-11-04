import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

const ScoreAnimation = ({ score }) => {
  const [prevScore, setPrevScore] = useState(score);
  
  // Definire l'animazione
  const props = useSpring({
    from: { number: prevScore },
    to: { number: score },
    config: { duration: 500 },
    onRest: () => setPrevScore(score),
  });

  useEffect(() => {
    setPrevScore(score);
  }, [score]);

  return (
    <animated.div>
      {props.number.interpolate((val) => Math.floor(val))}
    </animated.div>
  );
};

export default ScoreAnimation;