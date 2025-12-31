import { increment, decrement, reset, sayHi, sayGoodbye } from "./counter";
import { useSelector, useDispatch } from "react-redux";
import EmployeeForm from "./EmployeeForm";
import Modal from "./modal";

import "./App.css";
import { useState } from "react";

const BUTTON_WRAPPER_STYLES = {
  position: "relative",
  zIndex: 1,
};

const OTHER_CONTENT_STYLE = {
  position: "relative",
  zIndex: 2,
  backgroundColor: "red",
  padding: "10px",
};

function App() {
  const count = useSelector((state) => state.counter.value);
  const name = useSelector((state) => state.counter.name);
  const mode = useSelector((state) => state.counter.mode);
  const dispatch = useDispatch();

  const [isOpen, setIsOPen] = useState(false);

  const Greetings = mode === "Hello" ? `Hello ${name}` : `Goodbye ${name}`;

  return (
    <>
      {/* <h1>Redux Counter</h1>
      <p>{count}</p>

      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(reset())}>reset</button>

      <hr />

      <h1>Greeting</h1>
      <p>{`${mode}  ${name}`}</p>
      <button onClick={() => dispatch(sayHi())}>Say Hi</button>
      <button onClick={() => dispatch(sayGoodbye())}>Say Goodbye</button>

      <hr />

      <EmployeeForm /> */}

      <div
        style={BUTTON_WRAPPER_STYLES}
        onClick={() => console.log("Dipencet")}
      >
        <button onClick={() => setIsOPen(true)}>Open Modal</button>
        <Modal open={isOpen} onClose={() => setIsOPen(false)}>
          <br />
          <br />
          <h1>Congrats</h1>
        </Modal>
      </div>
      <div style={OTHER_CONTENT_STYLE}>
        <EmployeeForm />
      </div>
    </>
  );
}

export default App;
