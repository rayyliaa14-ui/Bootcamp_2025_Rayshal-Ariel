import { useRef } from "react";

const SimpleRef = () => {
  const angka = useRef(0);
  console.log(angka);

  return (
    <div>
      <p>{angka.current}</p>
      <button onClick={() => (angka.current += 1)}>Tambah</button>
      {console.log(angka)}
    </div>
  );
};

export default SimpleRef;
