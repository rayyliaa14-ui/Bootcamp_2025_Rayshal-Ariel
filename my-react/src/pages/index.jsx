import React from "react";

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
        <a href="/comment">
          <button>Comment Here</button>
        </a>
      </div>
    </>
  );
};

export default Playground;
