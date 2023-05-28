export interface UseTimerOptions {
    autoStart?: boolean;
    runEvery?: number;
    onFinish?: () => void;
    onStart?: () => void;
}
export interface UseTimerReturn {
    currentTime: number;
    startTimer: () => void;
    running: boolean;
    pauseTimer: () => void;
}
declare const useTimer: (time: number, options?: UseTimerOptions) => UseTimerReturn;
export default useTimer;
//# sourceMappingURL=useTimer.d.ts.map