import "./TextDisplay.css";
import { useEffect, useState } from "react";

const texts = ["Welcome, Ray", "How are you going today?"];

const TextDisplay = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];

    let timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Cek dulu apakah sudah sampai akhir
          if (charIndex === currentText.length) {
            setIsDeleting(true);
            return;
          }

          // Baru ngetik
          setDisplayText(currentText.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          // Cek dulu apakah sudah sampai awal
          if (charIndex === 0) {
            setIsDeleting(false);
            setTextIndex((textIndex + 1) % texts.length);
            return;
          }

          // Baru hapus
          setDisplayText(currentText.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }
      },
      isDeleting ? 50 : 150
    );

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex]);

  return (
    <div className="text-display container">
      <div className="main-header">
        <h1>{displayText}| </h1>
      </div>
    </div>
  );
};

export default TextDisplay;
