import { useState, useRef, useEffect } from "react";

const PreviousCount = () => {
  const [count, setCount] = useState(0);
  const prevCount = useRef(0);
  console.log(prevCount.current);

  useEffect(() => {
    prevCount.current = count;
  }, [count]);

  return (
    <>
      <h1>Sekarang: {count}</h1>
      <h2>Sebelumnya: {prevCount.current}</h2>
      <button onClick={() => setCount(count + 1)}>+</button>
    </>
  );
};

export default PreviousCount;
