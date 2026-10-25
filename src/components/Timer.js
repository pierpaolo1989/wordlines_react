import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./GameContext";

const Timer = () => {
  const {
    timeLeft,
    setTimeLeft,
    index,
    setIndex,
    up,
    setUp,
    setShowAnimation,
    showInterstitial,
    gameFinished,
    finishGame,
    completeIteration,
  } = useContext(Context)
  const navigate = useNavigate()

  useEffect(() => {
    if (showInterstitial || gameFinished) {
      return
    }

    if (timeLeft <= 0) {
      setTimeLeft(30)

      const remainingLives = Math.max(0, up - 1)
      setUp(remainingLives)
      setShowAnimation(true)
      setTimeout(() => setShowAnimation(false), 500)
      if (remainingLives === 0) {
        finishGame("defeat")
      } else if (index < Number(process.env.REACT_APP_MIN_LINES_PER_GAMES)) {
        setIndex((index) => index + 1)
      } else {
        completeIteration(remainingLives)
      }
      return
    }

    const intervalId = setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [
    timeLeft,
    index,
    setIndex,
    up,
    setTimeLeft,
    setUp,
    setShowAnimation,
    showInterstitial,
    gameFinished,
    finishGame,
    completeIteration,
  ]);

  useEffect(() => {
    if (gameFinished) {
      navigate("/result")
    }
  }, [gameFinished, navigate])

  return (
    <div>
      <h1
        className={`transition-transform duration-300 ${
          timeLeft <= 5
            ? 'text-red-500 scale-125 animate-pulse'
            : 'text-neutral-50 scale-100'
        }`}
      >
        {timeLeft}
      </h1>
    </div>
  );
};

export default Timer;