import { useEffect, useState, useCallback, useRef } from 'react';
const useTimer = (time, { autoStart = false, runEvery = 1000, onFinish, onStart } = {}) => {
    const timeoutRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(time);
    const [running, setRunning] = useState(autoStart);
    const [paused, setPaused] = useState(false);
    const startTimer = useCallback(() => {
        if (onStart) {
            onStart();
        }
        if (timeoutRef.current && currentTime !== time) {
            clearTimeout(timeoutRef.current);
        }
        if (!paused) {
            setCurrentTime(time);
        }
        setRunning(true);
        setPaused(false);
    }, [currentTime, onStart, paused, time]);
    const pauseTimer = useCallback(() => {
        if (timeoutRef.current && currentTime !== time) {
            clearTimeout(timeoutRef.current);
        }
        setRunning(false);
        setPaused(true);
    }, [currentTime, time]);
    useEffect(() => {
        if (!running) {
            return;
        }
        if (currentTime > 0) {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                if (currentTime > 0) {
                    setCurrentTime((time) => time - 1);
                }
            }, runEvery);
        }
        else {
            setRunning(false);
            if (onFinish) {
                onFinish();
            }
        }
    }, [currentTime, running, runEvery, time, onFinish]);
    return { currentTime, startTimer, running, pauseTimer };
};
export default useTimer;
