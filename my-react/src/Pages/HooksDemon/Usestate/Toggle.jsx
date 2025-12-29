import { useState } from "react";

function Toggle() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Tutup" : "Buka"}
      </button>

      {isOpen && <p>Bakekok</p>}
    </div>
  );
}

export default Toggle;
