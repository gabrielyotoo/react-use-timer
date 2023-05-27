import { renderHook } from '@testing-library/react-hooks';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import useTimer from '../src/useTimer';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

test('should start the timer automatically if autoStart is set', () => {
  const { result } = renderHook(() => useTimer(5, { autoStart: true }));

  expect(result.current.currentTime).toBe(5);

  vi.advanceTimersByTime(1000);

  expect(result.current.currentTime).toBe(4);
});

test('should call onStart function if it exists', () => {
  let called = false;
  const { result } = renderHook(() =>
    useTimer(5, {
      onStart: () => {
        called = true;
      },
    })
  );

  expect(called).toBeFalsy();
  result.current.startTimer();
  expect(called).toBeTruthy();
});

test('should decrease current time at time specified', () => {
  const { result } = renderHook(() => useTimer(5, { runEvery: 200 }));

  result.current.startTimer();

  expect(result.current.currentTime).toBe(5);
  vi.advanceTimersByTime(100);
  expect(result.current.currentTime).toBe(5);
  vi.advanceTimersByTime(100);
  expect(result.current.currentTime).toBe(4);
});

test('should pause the timer when pause is requested', () => {
  const { result } = renderHook(() => useTimer(5, { runEvery: 200 }));
  const pauseSpy = vi.spyOn(result.current, 'pauseTimer');

  result.current.startTimer();
  expect(pauseSpy).not.toHaveBeenCalled();
  expect(result.current.running).toBeTruthy();

  result.current.pauseTimer();
  setImmediate(() => {
    expect(pauseSpy).toHaveBeenCalled();
    expect(result.current.running).toBeFalsy();
  });
});

test('should stop the timer when times up', () => {
  const { result } = renderHook(() => useTimer(2, { runEvery: 100 }));

  result.current.startTimer();

  expect(result.current.currentTime).toBe(2);
  expect(result.current.running).toBeTruthy();
  vi.advanceTimersByTime(200);

  setImmediate(() => {
    expect(result.current.running).toBeFalsy();
    expect(result.current.currentTime).toBe(0);
  });
});

test('should call onFinish function if it exists', () => {
  let called = false;
  const { result } = renderHook(() =>
    useTimer(2, {
      runEvery: 100,
      onFinish: () => {
        called = true;
      },
    })
  );

  result.current.startTimer();

  expect(result.current.currentTime).toBe(2);
  expect(called).toBeFalsy();
  vi.advanceTimersByTime(200);

  setImmediate(() => {
    expect(called).toBeTruthy();
  });
});
