import React from "react";
import { useState } from "react";
import BoxList from "./apiBoxList";
import "./apiBoxes.css";

const ApiBoxes = () => {
  const [box, setBox] = useState([
    {
      Logo: "/pin.png",
      header: "NotInterest",
      description:
        "Create Pinterest clone using react vite and use unsplash Api integrated",
      link: "/notinterest",
    },
    {
      Logo: "/youtube.png",
      header: "MeTube",
      description: "This is youtube clone using react vite with api integrated",
      link: "/metube",
    },
  ]);
  return (
    <div className="apiBox">
      {box.map((item, index) => (
        <BoxList
          key={index}
          logo={item.Logo}
          header={item.header}
          description={item.description}
          link={item.link}
        />
      ))}
    </div>
  );
};

export default ApiBoxes;
