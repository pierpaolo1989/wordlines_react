import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./GameContext";

const Timer = () => {
  const { timeLeft, setTimeLeft } = useContext(Context)
  const { index, setIndex } = useContext(Context)
  const { up, setUp } = useContext(Context)
  const { setShowAnimation } = useContext(Context)
  const navigate = useNavigate()

  useEffect(() => {
    if (!timeLeft) {
      setTimeLeft(30)
      if (index < process.env.REACT_APP_MIN_LINES_PER_GAMES) {
        if (up > 1) {
          setShowAnimation(true);
          setTimeout(() => {
            setUp((up) => up - 1)
            setShowAnimation(false);
          }, 500); 
      } else {
          navigate("/result");
      }
        setIndex((index) => index + 1)
      } else {
        navigate("/result");
      }
    }

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  return (
    <div>
      <h1 className={timeLeft <= 5 ? 'text-red-500' : 'text-neutral-50'}>{timeLeft}</h1>
    </div>
  );
};

export default Timer;