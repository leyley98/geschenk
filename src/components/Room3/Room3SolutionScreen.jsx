import { useState } from "react";
import { ROOM3_SOLUTION } from "../../data/room3Data";
import styles from "./Room3SolutionScreen.module.css";

const ERAS = [
  { name: "Lover",       color: "#f9a8d4", emoji: "💗" },
  { name: "Fearless",    color: "#fbbf24", emoji: "⭐" },
  { name: "Speak Now",   color: "#a78bfa", emoji: "🔮" },
  { name: "Red",         color: "#f87171", emoji: "🍂" },
  { name: "1989",        color: "#38bdf8", emoji: "📷" },
  { name: "reputation",  color: "#9ca3af", emoji: "🐍" },
  { name: "folklore",    color: "#a8a29e", emoji: "🌲" },
  { name: "evermore",    color: "#d97706", emoji: "🍁" },
  { name: "Midnights",   color: "#818cf8", emoji: "🌙" },
];

// Each letter of SWIFTIE gets an era color
const LETTER_COLORS = ["#f9a8d4", "#38bdf8", "#a78bfa", "#9ca3af", "#a8a29e", "#f87171", "#fbbf24"];

export default function Room3SolutionScreen({ onComplete }) {
  const [step, setStep] = useState(0);

  return (
    <div className={styles.overlay}>
      {/* Floating era emoji in background */}
      <div className={styles.emojiRain} aria-hidden="true">
        {["💗","⭐","🔮","🍂","📷","🐍","🌲","🍁","🌙","✦","★","💜","🎤","✨"].map((e, i) => (
          <span key={i} className={styles.floatingEmoji}
            style={{ animationDelay: `${i * 0.4}s`, left: `${(i * 7.1) % 100}%` }}>
            {e}
          </span>
        ))}
      </div>

      <div className={styles.card}>
        {/* Era strip at top of card */}
        <div className={styles.eraStrip}>
          {ERAS.map((era) => (
            <span key={era.name} className={styles.eraChip}
              style={{ background: era.color + "22", color: era.color, border: `1px solid ${era.color}44` }}>
              {era.emoji} {era.name}
            </span>
          ))}
        </div>

        <p className={styles.status}>✦ CODEWORT BESTÄTIGT ✦</p>

        {/* SWIFTIE letter reveal */}
        <div className={styles.wordReveal}>
          {"SWIFTIE".split("").map((char, i) => (
            <span
              key={i}
              className={styles.revealChar}
              style={{
                animationDelay: `${i * 0.1}s`,
                background: `linear-gradient(135deg, ${LETTER_COLORS[i]}33, ${LETTER_COLORS[i]}11)`,
                borderColor: LETTER_COLORS[i],
                color: LETTER_COLORS[i],
                boxShadow: `0 0 18px ${LETTER_COLORS[i]}50`,
              }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* Main message */}
        <p className={styles.message}>{ROOM3_SOLUTION.message}</p>

        {step >= 1 && (
          <p className={styles.subMessage}>{ROOM3_SOLUTION.subMessage}</p>
        )}

        {step === 0 && (
          <button className={styles.btn} onClick={() => setStep(1)}>
            Weiter ✦
          </button>
        )}

        {step === 1 && (
          <div className={styles.nextBox}>
            <p className={styles.nextLabel}>✦ NÄCHSTE ETAPPE ✦</p>
            <p className={styles.nextText}>{ROOM3_SOLUTION.nextRoomHint}</p>
            <button className={styles.btn} onClick={onComplete}>
              Raum 4 betreten →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
