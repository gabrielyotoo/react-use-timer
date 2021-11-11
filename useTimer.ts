import { useEffect, useState, useCallback } from 'react';

const useTimer = (time: number, autoStart = false) => {
  const [currentTime, setCurrentTime] = useState(time);
  const [finished, setFinished] = useState(!autoStart);

  const startTimer = () => {
    setCurrentTime(time);
    setFinished(false);
  };

  const count = useCallback(() => {
    if (finished) {
      return;
    }
    if (currentTime > 0) {
      setTimeout(() => {
        setCurrentTime(currentTime - 1);
      }, 1000);
    } else {
      setFinished(true);
    }
  }, [currentTime, finished]);

  useEffect(() => {
    count();
  }, [count]);

  return { currentTime, startTimer, finished };
};

export default useTimer;
