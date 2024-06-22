import { useContext, useEffect, useState } from "react";
import { Context } from "./GameContext";

const Timer = () => {
    // initialize timeLeft with the seconds prop
    const [timeLeft, setTimeLeft] = useState(30);
    const { setIndex } = useContext(Context)
  
    useEffect(() => {
      // exit early when we reach 0
      if (!timeLeft) {
        setIndex((index) => index+1)
        setTimeLeft(30)
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
        <h1 className={timeLeft<=5 ? 'text-red-500' : 'text-neutral-50'}>{timeLeft}</h1>
      </div>
    );
  };

  export default Timer;