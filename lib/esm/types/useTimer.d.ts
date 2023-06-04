export interface UseTimerOptions {
    autoStart?: boolean;
    interval?: number;
    onFinish?: () => void;
    onStart?: () => void;
}
export interface UseTimerReturn {
    currentTime: number;
    start: () => void;
    isRunning: boolean;
    pause: () => void;
}
declare const useTimer: (time: number, options?: UseTimerOptions) => UseTimerReturn;
export default useTimer;
//# sourceMappingURL=useTimer.d.ts.map