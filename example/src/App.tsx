import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import useTimer from '@gabrielyotoo/react-use-timer';

function App() {
  const [finished, setFinished] = useState(false);

  const { currentTime, running, startTimer, pauseTimer } = useTimer(10, {
    runEvery: 500,
    onFinish: () => {
      setFinished(true);
    },
    onStart: () => {
      setFinished(false);
    },
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {finished ? <p>Finished!</p> : null}
        <div style={{ flexDirection: 'row' }}>
          {!running ? (
            <p>Not running! Timer at {currentTime}</p>
          ) : (
            <p>Timer at {currentTime}</p>
          )}
          <button onClick={startTimer}>{!running ? 'Start!' : 'Reset'}</button>
          {running ? <button onClick={pauseTimer}>Pause</button> : null}
        </div>
      </header>
    </div>
  );
}

export default App;
