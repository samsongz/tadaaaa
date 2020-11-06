import React, { useState, useRef, useCallback,  } from 'react';
import './App.css';
import confetti from 'canvas-confetti';
import useSound from 'use-sound';
import { crowd, fireworks, pop, horn, ticktock } from './sounds';

import { useEffect } from 'react';

function Party({ isParty }) {
  const [playHorn] = useSound(horn, { volume: 0.05 });
  const [playCrowd] = useSound(crowd, { volume: 0.25 });
  const [playFireworks] = useSound(fireworks, { volume: 0.25 });

  useEffect(() => {
    if (isParty) {
      playCrowd();
      playHorn();
      playFireworks();
    }
  }, [isParty, playCrowd, playFireworks, playHorn]);

  return (isParty && <h1>yay!</h1>);
}
function App() {
  const [seconds, setSeconds] = useState(5);
  const [ready, setReady] = useState(false);
  const [playTick] = useSound(ticktock, { volume: 0.25 });
  const [playPop] = useSound(pop, { volume: 0.25});

  function celebrate() {
    var duration = 15 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);

  }

  const intervalRef = useRef();

  const startCountdown = useCallback(() => {
    playPop()
    confetti({
      particleCount: 50,
      spread: 30,
      startVelocity: 20,
      origin: { y: 0.6 }
    });

    intervalRef.current = setInterval(() => {
      setSeconds(seconds => seconds - 1);
      playTick();
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [playPop, playTick]);

  const timesUp = seconds === 0;

  if (timesUp) {
    clearInterval(intervalRef.current);
    celebrate()
  }

  const isParty = timesUp && ready;

  return (
    <div className="app">
      <div className="item">
        {!isParty && <h1 className={ready && !timesUp ? 'counting' : ''}>{ ready ? seconds : 'Ready?' }</h1>}
        <Party isParty={isParty} />
        { !ready && <button className='go-button' onClick={() => {  startCountdown() && setReady(true)}}>Start!</button>}
      </div>
    </div>
  );
}

export default App;
