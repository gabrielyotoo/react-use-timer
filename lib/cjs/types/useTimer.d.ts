interface UseTimerOptions {
    autoStart?: boolean;
    runEvery?: number;
    onFinish?: () => void;
    onStart?: () => void;
}
declare const useTimer: (time: number, { autoStart, runEvery, onFinish, onStart, }?: UseTimerOptions) => {
    currentTime: number;
    startTimer: () => void;
    running: boolean;
    pauseTimer: () => void;
};
export default useTimer;
//# sourceMappingURL=useTimer.d.ts.map