"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useTimer = (time, { autoStart = false, runEvery = 1000, onFinish, onStart } = {}) => {
    const timeoutRef = (0, react_1.useRef)(null);
    const [currentTime, setCurrentTime] = (0, react_1.useState)(time);
    const [running, setRunning] = (0, react_1.useState)(autoStart);
    const [paused, setPaused] = (0, react_1.useState)(false);
    const startTimer = (0, react_1.useCallback)(() => {
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
    const pauseTimer = (0, react_1.useCallback)(() => {
        if (timeoutRef.current && currentTime !== time) {
            clearTimeout(timeoutRef.current);
        }
        setRunning(false);
        setPaused(true);
    }, [currentTime, time]);
    (0, react_1.useEffect)(() => {
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
exports.default = useTimer;
