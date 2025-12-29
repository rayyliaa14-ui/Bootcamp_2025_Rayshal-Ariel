import { useState } from "react";

function FormInput() {
  const [name, setName] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Masukkan nama"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <p>Halo, {name}</p>
    </div>
  );
}

export default FormInput;
