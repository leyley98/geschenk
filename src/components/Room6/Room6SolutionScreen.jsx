import { useState } from "react";
import { ROOM6_SOLUTION } from "../../data/room6Data";
import styles from "./Room6SolutionScreen.module.css";

const LETTER_COLORS = [
  "#ff69b4", "#e879f9", "#c084fc", "#f472b6", "#fbbf24", "#7dd3fc", "#86efac", "#fcd34d",
];

export default function Room6SolutionScreen({ onComplete }) {
  const [step, setStep] = useState(0);

  return (
    <div className={styles.overlay}>

      {/* Confetti / sparkle rain */}
      <div className={styles.confettiLayer} aria-hidden="true">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className={styles.confetti}
            style={{
              left: `${(i * 3.4) % 100}%`,
              animationDelay: `${(i * 0.15) % 3}s`,
              animationDuration: `${2.2 + (i % 5) * 0.4}s`,
              background: LETTER_COLORS[i % LETTER_COLORS.length],
              width:  i % 4 === 0 ? 9 : 5,
              height: i % 4 === 0 ? 9 : 15,
              borderRadius: i % 4 === 0 ? "50%" : "3px",
              transform: `rotate(${(i * 37) % 180}deg)`,
            }}
          />
        ))}
      </div>

      <div className={styles.card}>

        {/* Glitter bar */}
        <div className={styles.topBar} />

        <p className={styles.status}>✦ CODEWORT BESTÄTIGT ✦</p>

        {/* POPSTAR letter reveal */}
        <div className={styles.wordReveal}>
          {"MIDNIGHT".split("").map((char, i) => (
            <span
              key={i}
              className={styles.revealChar}
              style={{
                animationDelay: `${i * 0.1}s`,
                borderColor: LETTER_COLORS[i],
                color: LETTER_COLORS[i],
                boxShadow: `0 0 18px ${LETTER_COLORS[i]}66`,
                background: `${LETTER_COLORS[i]}18`,
              }}
            >
              {char}
            </span>
          ))}
        </div>

        <p className={styles.wordMeaning}>
          <em>Popstar</em> – das bist du.
        </p>

        {/* Disco star decoration */}
        <div className={styles.starDeco} aria-hidden="true">
          <span>🌟</span>
          <span className={styles.discoBall}>🪩</span>
          <span>🌟</span>
        </div>

        <p className={styles.message}>{ROOM6_SOLUTION.message}</p>

        {step >= 1 && (
          <p className={styles.subMessage}>{ROOM6_SOLUTION.subMessage}</p>
        )}

        {step === 0 && (
          <button className={styles.btn} onClick={() => setStep(1)}>
            Slay ✦
          </button>
        )}

        {step === 1 && (
          <div className={styles.nextBox}>
            <p className={styles.nextLabel}>NÄCHSTE ETAPPE</p>
            <p className={styles.nextText}>{ROOM6_SOLUTION.nextRoomHint}</p>
            <button className={styles.btn} onClick={onComplete}>
              Weiter &rarr;
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
