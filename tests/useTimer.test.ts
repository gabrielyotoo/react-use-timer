import { renderHook } from '@testing-library/react-hooks';
import { expect, test } from 'vitest';
import useTimer from '../src/useTimer';

const sleep = (ms: number) => {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
};

test('should start the timer automatically if autoStart is set', async () => {
  const { result } = renderHook(() => useTimer(5, { autoStart: true }));

  expect(result.current.currentTime).toBe(5);

  await sleep(1000);

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

  result.current.startTimer();

  expect(called).toBeTruthy();
});

test('should decrease current time at time specified', async () => {
  const { result } = renderHook(() => useTimer(5, { runEvery: 200 }));

  result.current.startTimer();

  expect(result.current.currentTime).toBe(5);
  await sleep(100);
  expect(result.current.currentTime).toBe(5);
  await sleep(100);
  expect(result.current.currentTime).toBe(4);
});

test('should pause the timer when pause is requested', async () => {
  const { result } = renderHook(() => useTimer(5, { runEvery: 100 }));

  result.current.startTimer();

  expect(result.current.currentTime).toBe(5);
  await sleep(200);
  expect(result.current.currentTime).toBe(4);

  result.current.pauseTimer();
  await sleep(200);
  expect(result.current.currentTime).toBe(4);
});

test('should stop the timer when times up', async () => {
  const { result } = renderHook(() => useTimer(2, { runEvery: 100 }));

  result.current.startTimer();

  expect(result.current.currentTime).toBe(2);
  await sleep(300);

  expect(result.current.currentTime).toBe(0);
  await sleep(100);

  expect(result.current.currentTime).toBe(0);
});

test('should call onFinish function if it exists', async () => {
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
  await sleep(300);

  expect(called).toBeTruthy();
});
