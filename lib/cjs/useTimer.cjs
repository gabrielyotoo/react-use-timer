"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useTimer = (time, { autoStart = false, interval = 1000, onFinish, onStart } = {}) => {
    const timeoutRef = (0, react_1.useRef)(null);
    const [currentTime, setCurrentTime] = (0, react_1.useState)(time);
    const [isRunning, setIsRunning] = (0, react_1.useState)(autoStart);
    const [paused, setPaused] = (0, react_1.useState)(false);
    const start = (0, react_1.useCallback)(() => {
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
    const pause = (0, react_1.useCallback)(() => {
        if (timeoutRef.current && currentTime !== time) {
            clearTimeout(timeoutRef.current);
        }
        setIsRunning(false);
        setPaused(true);
    }, [currentTime, time]);
    (0, react_1.useEffect)(() => {
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
exports.default = useTimer;
