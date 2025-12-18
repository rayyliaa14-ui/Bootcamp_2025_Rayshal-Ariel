import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navbar from "./component/navbar";
import "./App.css";

function App() {
  const message = {
    say: "halo ",
    name: "ray",
  };
  const date = new Date();
  const time = date.toLocaleTimeString();
  return (
    <>
      <h1>{message.say + message.name}</h1>
      <h1>Today is {time}</h1>
    </>
  );
}

export default App;
