import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navbar from "./component/navbar";
import "./App.css";

function App() {
  const BacaTopik = () => {
    const topics = ["React + Vite", "JSX", "Variable JSX"];
    return topics.map((now_topic) => <li>{now_topic}</li>);
  };
  return (
    <>
      <Navbar />
      <div className="content">
        <h1>Bootcamp react</h1>
        <p>Batch : 17</p>
        <p>materi : React JS</p>
        <p>mentor : Nisa</p>
        <br />
        <h2>Topik Hari ini</h2>
        <ul>
          <BacaTopik />
        </ul>
      </div>
    </>
  );
}

export default App;
