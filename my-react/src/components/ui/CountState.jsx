import { useState } from "react";

const CountState = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>You Click me {count} times</h1>
      <button onClick={() => setCount(count + 1)}>Click Me</button>
      <button onClick={() => setCount(count - 1)}>Decrease Me</button>
      <button onClick={() => setCount(0)}>Reset Me</button>
    </>
  );
};
export default CountState;
