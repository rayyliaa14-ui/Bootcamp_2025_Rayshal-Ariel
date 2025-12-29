import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Counting from "../../components/ui/Counting";
import CountState from "../../components/ui/CountState";
import Clock from "../../components/ui/Clock";

const Playground = () => {
  const BacaTopik = () => {
    const topics = ["React + Vite", "JSX", "Variable JSX"];
    return topics.map((now_topic) => <li>{now_topic}</li>);
  };
  return (
    <>
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
        <br />
        <Link to="/comment">
          <button>Comment Here</button>
        </Link>
        <Counting />
        <CountState />
        <Clock />
      </div>
    </>
  );
};

export default Playground;
