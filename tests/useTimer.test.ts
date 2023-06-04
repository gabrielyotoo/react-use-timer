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
  result.current.start();
  expect(called).toBeTruthy();
});

test('should decrease current time at specified interval', () => {
  const { result } = renderHook(() => useTimer(5, { interval: 200 }));

  result.current.start();

  expect(result.current.currentTime).toBe(5);
  vi.advanceTimersByTime(100);
  expect(result.current.currentTime).toBe(5);
  vi.advanceTimersByTime(100);
  expect(result.current.currentTime).toBe(4);
});

test('should pause the timer when pause is requested', () => {
  const { result } = renderHook(() => useTimer(5, { interval: 200 }));
  const pauseSpy = vi.spyOn(result.current, 'pause');

  result.current.start();
  expect(pauseSpy).not.toHaveBeenCalled();
  expect(result.current.isRunning).toBeTruthy();

  result.current.pause();
  setImmediate(() => {
    expect(pauseSpy).toHaveBeenCalled();
    expect(result.current.isRunning).toBeFalsy();
  });
});

test('should stop the timer when times up', () => {
  const { result } = renderHook(() => useTimer(2, { interval: 100 }));

  result.current.start();

  expect(result.current.currentTime).toBe(2);
  expect(result.current.isRunning).toBeTruthy();
  vi.advanceTimersByTime(200);

  setImmediate(() => {
    expect(result.current.isRunning).toBeFalsy();
    expect(result.current.currentTime).toBe(0);
  });
});

test('should call onFinish function if it exists', () => {
  let called = false;
  const { result } = renderHook(() =>
    useTimer(2, {
      interval: 100,
      onFinish: () => {
        called = true;
      },
    })
  );

  result.current.start();

  expect(result.current.currentTime).toBe(2);
  expect(called).toBeFalsy();
  vi.advanceTimersByTime(200);

  setImmediate(() => {
    expect(called).toBeTruthy();
  });
});
