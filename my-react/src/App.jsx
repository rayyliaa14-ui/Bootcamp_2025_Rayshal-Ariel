import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/navbar";
import UseState from "./Pages/HooksDemon/Usestate/index";
import UseRef from "./Pages/HooksDemon/UseRef/index";
import Counting from "./components/ui/Counting";
import Main from "./Pages/Home/main";
import Comment from "./components/comments/comment";
import Form from "./components/ui/Form";
import NotInterest from "./Pages/Pinterest";
import PhotoDetail from "./Pages/Pinterest/components/PhotoDetail";
import Youtube from "./Pages/Youtube";
import VideoPlayer from "./Pages/Youtube/Player";

import "./App.css";
import Playground from "./Pages/Home/indexAlt";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/comment" element={<Comment />} />
        <Route path="/Form" element={<Form />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/usestate" element={<UseState />} />
        <Route path="/useref" element={<UseRef />} />
        <Route path="/notinterest" element={<NotInterest />} />
        <Route path="/photo/:id" element={<PhotoDetail />} />
        <Route path="/metube" element={<Youtube />} />
        <Route path="/metube/video/:videoId" element={<VideoPlayer />} />
      </Routes>
    </Router>
  );
}

export default App;
