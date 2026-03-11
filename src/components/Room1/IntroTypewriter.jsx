import { useState, useEffect } from "react";
import styles from "./IntroTypewriter.module.css";

export default function IntroTypewriter({ lines, buttonLabel = "AKTE ÖFFNEN", onDone }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayed, setDisplayed] = useState([]);

  useEffect(() => {
    if (lineIndex >= lines.length) return;

    const line = lines[lineIndex];

    if (charIndex < line.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), 35);
      return () => clearTimeout(t);
    }

    // Line complete – pause then move to next
    const t = setTimeout(() => {
      setDisplayed((d) => [...d, line]);
      setLineIndex((l) => l + 1);
      setCharIndex(0);
    }, 400);
    return () => clearTimeout(t);
  }, [lineIndex, charIndex, lines]);

  const allDone = lineIndex >= lines.length;

  return (
    <div className={styles.overlay}>
      <div className={styles.terminal}>
        {displayed.map((line, i) => (
          <p key={i} className={styles.line}>
            {line}
          </p>
        ))}
        {!allDone && (
          <p className={styles.line}>
            {lines[lineIndex].slice(0, charIndex)}
            <span className={styles.cursor}>█</span>
          </p>
        )}
        {allDone && (
          <button className={styles.startBtn} onClick={onDone}>
            {buttonLabel}
          </button>
        )}
      </div>
    </div>
  );
}
