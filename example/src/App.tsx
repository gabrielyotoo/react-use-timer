import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import useTimer from '@gabrielyotoo/react-use-timer';

function App() {
  const [finished, setFinished] = useState(false);

  const { currentTime, running, startTimer, pauseTimer } = useTimer(10, {
    runEvery: 1000,
    onFinish: () => {
      setFinished(true);
    },
    onStart: () => {
      setFinished(false);
    },
  });

  return (
    <>
      <div>
        <img src={viteLogo} className="logo" alt="Vite logo" />
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>
      {finished ? <p>Finished!</p> : null}
      <div style={{ flexDirection: 'row' }}>
        {!running ? (
          <p>Not running! Timer at {currentTime}</p>
        ) : (
          <p>Timer at {currentTime}</p>
        )}
        <button onClick={startTimer}>{!running ? 'Start!' : 'Reset'}</button>
        {running ? (
          <button style={{ marginLeft: 10 }} onClick={pauseTimer}>
            Pause
          </button>
        ) : null}
      </div>
    </>
  );
}

export default App;
