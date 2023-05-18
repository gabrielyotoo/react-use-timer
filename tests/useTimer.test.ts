import { renderHook, act } from '@testing-library/react-hooks';
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
  // to be done
});

test('should decrease current time at time specified', () => {
  // to be done
});

test('should pause the timer when pause is requested', () => {
  // to be done
});

test('should stop the timer when times up', () => {
  // to be done
});

test('should call onFinish function if it exists', () => {
  // to be done
});
