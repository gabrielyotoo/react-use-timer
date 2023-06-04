import { useEffect, useState, useCallback, useRef } from 'react';
const useTimer = (time, { autoStart = false, interval = 1000, onFinish, onStart } = {}) => {
    const timeoutRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(time);
    const [isRunning, setIsRunning] = useState(autoStart);
    const [paused, setPaused] = useState(false);
    const start = useCallback(() => {
        if (onStart) {
            onStart();
        }
        if (timeoutRef.current && currentTime !== time) {
            clearTimeout(timeoutRef.current);
        }
        if (!paused) {
            setCurrentTime(time);
        }
        setIsRunning(true);
        setPaused(false);
    }, [currentTime, onStart, paused, time]);
    const pause = useCallback(() => {
        if (timeoutRef.current && currentTime !== time) {
            clearTimeout(timeoutRef.current);
        }
        setIsRunning(false);
        setPaused(true);
    }, [currentTime, time]);
    useEffect(() => {
        if (!isRunning) {
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
            }, interval);
        }
        else {
            setIsRunning(false);
            if (onFinish) {
                onFinish();
            }
        }
    }, [currentTime, isRunning, interval, time, onFinish]);
    return { currentTime, start, isRunning, pause };
};
export default useTimer;
