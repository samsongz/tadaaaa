import React, { useState, useCallback, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import confetti from 'canvas-confetti';

function App() {
  const [seconds, setSeconds] = useState(10);
  const [ready, setReady] = useState(false);

  function time0(interval) {
    clearInterval(interval)
    confetti()
  };

  const startCountdown = useCallback(() => {
    let interval = null;
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
     if (seconds === 0) {
      time0(interval);
    }
    return () => clearInterval(interval);
  }, [seconds]);
  console.log('ready?', ready)
  return (
    <div className="app">
      <div className="item">
        <h1>{ ready ? seconds : 'Ready?' }</h1>
        { !ready && (

<div class="buttons">
  <button class="blob-btn">
    Let's Go!
    <span class="blob-btn__inner">
      <span class="blob-btn__blobs">
        <span class="blob-btn__blob"></span>
        <span class="blob-btn__blob"></span>
        <span class="blob-btn__blob"></span>
        <span class="blob-btn__blob"></span>
      </span>
    </span>
  </button>
  <br/>

<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <filter id="goo">
      <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7" result="goo"></feColorMatrix>
      <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
    </filter>
  </defs>
</svg>)}

      </div>
    </div>
  );
}

export default App;
