import { useState } from "react";
import { ROOM5_SOLUTION } from "../../data/room5Data";
import styles from "./Room5SolutionScreen.module.css";

const LETTER_COLORS = ["#dc0000", "#ff4d4d", "#ff8800", "#ffd700", "#ff4d4d", "#dc0000"];

export default function Room5SolutionScreen({ onComplete }) {
  const [step, setStep] = useState(0);

  return (
    <div className={styles.overlay}>

      {/* Checkered flag pattern overlay */}
      <div className={styles.checkers} aria-hidden="true" />

      {/* Confetti particles */}
      <div className={styles.confettiLayer} aria-hidden="true">
        {Array.from({ length: 22 }).map((_, i) => (
          <div
            key={i}
            className={styles.confetti}
            style={{
              left: `${(i * 4.5) % 100}%`,
              animationDelay: `${(i * 0.18) % 3}s`,
              animationDuration: `${2.4 + (i % 4) * 0.5}s`,
              background: LETTER_COLORS[i % LETTER_COLORS.length],
              width: i % 3 === 0 ? 8 : 5,
              height: i % 3 === 0 ? 8 : 14,
              borderRadius: i % 3 === 0 ? "50%" : "2px",
            }}
          />
        ))}
      </div>

      <div className={styles.card}>

        {/* Top bar */}
        <div className={styles.topBar} />

        <p className={styles.status}>CODEWORT BESTATIGT</p>

        {/* PILOTA letter reveal */}
        <div className={styles.wordReveal}>
          {"PILOTA".split("").map((char, i) => (
            <span
              key={i}
              className={styles.revealChar}
              style={{
                animationDelay: `${i * 0.12}s`,
                borderColor: LETTER_COLORS[i],
                color: LETTER_COLORS[i],
                boxShadow: `0 0 20px ${LETTER_COLORS[i]}55`,
                background: `${LETTER_COLORS[i]}18`,
              }}
            >
              {char}
            </span>
          ))}
        </div>

        <p className={styles.wordMeaning}>
          <em>Pilota</em> - Italienisch fur Pilot / Fahrer
        </p>

        {/* Scuderia Ferrari crest */}
        <div className={styles.horse} aria-hidden="true">
          <img src={`${import.meta.env.BASE_URL}Ferrari%20Logo.svg`} alt="Scuderia Ferrari" className={styles.ferrariCrest} />
        </div>

        <p className={styles.message}>{ROOM5_SOLUTION.message}</p>

        {/* Driver signature */}
        <div className={styles.signatureWrap} aria-hidden="true">
          <img src={`${import.meta.env.BASE_URL}unterschrift.png`} alt="" className={styles.signature} />
        </div>

        {step >= 1 && (
          <p className={styles.subMessage}>{ROOM5_SOLUTION.subMessage}</p>
        )}

        {step === 0 && (
          <button className={styles.btn} onClick={() => setStep(1)}>
            Forza Ferrari &rarr;
          </button>
        )}

        {step === 1 && (
          <div className={styles.nextBox}>
            <p className={styles.nextLabel}>NACHSTE ETAPPE</p>
            <p className={styles.nextText}>{ROOM5_SOLUTION.nextRoomHint}</p>
            <button className={styles.btn} onClick={onComplete}>
              Weiter &rarr;
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
