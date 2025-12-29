import { useRef, useState } from "react";

const Timer = () => {
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);

  // console.log(intervalRef.current);
  const start = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
  };
  console.log(intervalRef);
  const stop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  return (
    <div>
      <p>Waktu: {time} detik</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
};
export default Timer;
