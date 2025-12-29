import { useState } from "react";

function LoadingExample() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("Selesai!");
    }, 2000);
  };

  return (
    <div>
      <button onClick={handleClick} disabled={loading}>
        {loading ? "Loading..." : "Submit"}
      </button>
    </div>
  );
}

export default LoadingExample;
