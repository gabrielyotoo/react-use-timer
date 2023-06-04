import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import useTimer from '@gabrielyotoo/react-use-timer';

function App() {
  const [finished, setFinished] = useState(false);

  const { currentTime, isRunning, start, pause } = useTimer(10, {
    interval: 1000,
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
        {!isRunning ? (
          <p>Not running! Timer at {currentTime}</p>
        ) : (
          <p>Timer at {currentTime}</p>
        )}
        <button onClick={start}>{!isRunning ? 'Start!' : 'Reset'}</button>
        {isRunning ? (
          <button style={{ marginLeft: 10 }} onClick={pause}>
            Pause
          </button>
        ) : null}
      </div>
    </>
  );
}

export default App;
