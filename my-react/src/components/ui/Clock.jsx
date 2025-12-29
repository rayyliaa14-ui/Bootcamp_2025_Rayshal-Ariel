import React, { useEffect, useState } from "react";

const Clock = () => {
  const [date, setDate] = useState(new Date());

  //Component Did update using UseEffect
  useEffect(() => {
    console.log("First Mounting"); // --- Mounting Component

    const tick = setInterval(() => {
      setDate(new Date()); // --- Updating Component
    }, 1000);

    return () => {
      console.log("Component are unmounted!"); // --- Unmounting Component
      clearInterval(tick);
    };
  }, []);

  return (
    <>
      <h1>{date.toLocaleTimeString()}</h1>
    </>
  );
};
export default Clock;
