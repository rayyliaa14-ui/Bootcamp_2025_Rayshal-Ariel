import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./component/navbar";
import Playground from "./pages/index";
import Comment from "./pages/comment";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Playground />} />
        <Route path="/comment" element={<Comment />} />
      </Routes>
    </Router>
  );
}

export default App;
