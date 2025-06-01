import { useState, useEffect, useRef } from 'react';
import './index.css';

const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

export default function App() {
  const [seconds, setSeconds] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    let timer = null;
    if (isRunning) {
      timer = setInterval(() => {
        setSeconds((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            audioRef.current.play();
            const nextPhase = !isWorkTime;
            setIsWorkTime(nextPhase);
            setSeconds(nextPhase ? BREAK_TIME : WORK_TIME);
            return nextPhase ? BREAK_TIME : WORK_TIME;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, isWorkTime]);

  const manualSwitch = () => {
    setIsRunning(false);
    const nextPhase = !isWorkTime;
    setIsWorkTime(nextPhase);
    const newTime = nextPhase ? BREAK_TIME : WORK_TIME;
    setSeconds(newTime);
    audioRef.current.play();
  };

  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const isCurrentlyWorkTime = seconds === WORK_TIME || (isWorkTime && seconds > BREAK_TIME);

  return (
    <div style={styles.wrapper}>
      <audio ref={audioRef} src="/alarm.mp3" preload="auto" />
      <div style={styles.card}>
        <h1 style={{ ...styles.title, color: isCurrentlyWorkTime ? 'var(--highlight)' : '#ff8080' }}>
          {isCurrentlyWorkTime ? 'Tiempo de trabajo' : 'Tiempo de descanso'}
        </h1>
        <div style={styles.timer}>{formatTime(seconds)}</div>
        <div style={styles.buttons}>
          <button style={styles.btn} onClick={() => setIsRunning(true)}>Iniciar</button>
          <button style={styles.btn} onClick={() => setIsRunning(false)}>Pausar</button>
          <button
            style={styles.btn}
            onClick={() => {
              setIsRunning(false);
              setSeconds(isWorkTime ? WORK_TIME : BREAK_TIME);
            }}
          >
            Reiniciar
          </button>
        </div>
        <button style={{ ...styles.btn, marginTop: '20px', width: '100%' }} onClick={manualSwitch}>
          Cambiar fase manualmente
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh'
  },
  card: {
    backgroundColor: 'var(--secondary)',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: `0 10px 30px var(--shadow)`,
    textAlign: 'center',
    width: '350px',
    transition: 'all 0.3s ease-in-out',
    border: '1px solid var(--accent)'
  },
  title: {
    fontSize: '1.5rem',
    marginBottom: '20px',
    letterSpacing: '1px'
  },
  timer: {
    fontSize: '3rem',
    fontWeight: '600',
    marginBottom: '30px',
    color: 'var(--fg)',
    textShadow: '0 0 8px var(--accent)'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px'
  },
  btn: {
    flex: 1,
    padding: '12px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: 'var(--accent)',
    color: 'white',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 10px var(--shadow)',
    transition: 'transform 0.2s ease',
  }
};
