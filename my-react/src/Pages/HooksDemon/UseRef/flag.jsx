import { useRef } from "react";

const Flag = () => {
  const isFirstClick = useRef(true);

  const click = () => {
    if (isFirstClick.current) {
      console.log("Ini klik PERTAMA");
      isFirstClick.current = false;
    } else {
      console.log("Ini klik selanjutnya");
    }
  };

  return <button onClick={click}>Klik aku</button>;
};

export default Flag;
