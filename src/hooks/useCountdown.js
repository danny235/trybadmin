import { useEffect, useState } from "react";

const useCountdown = (targetDate) => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(targetDate);

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      let newTargetDate = targetDate === 0 ? 0 : targetDate--;
      // console.log("left", newTargetDate);
      setCountDown(newTargetDate);
    }, 1000);
    // console.log(interval);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
  // calculate time left

  let minutes = Math.floor(countDown / 60);
  let seconds = Math.floor(countDown % 60);
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  return [minutes, seconds];
};

export { useCountdown };
