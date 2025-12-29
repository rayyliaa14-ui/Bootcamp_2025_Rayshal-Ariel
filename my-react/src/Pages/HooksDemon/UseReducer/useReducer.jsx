import { useReducer, useState } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return { count: state.count + 1 };
    case "min":
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const Counter = () => {
  const [state, setState] = useState(reducer, { count: 0 });
  return;
  <>
    <p>{state.count}</p>
    <button onClick={() => dispatchEvent({ type: "add" })}>+</button>
    <button onClick={() => dispatchEvent({ type: "add" })}>+</button>
  </>;
};
export default Counter;
