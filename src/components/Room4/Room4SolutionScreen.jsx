import { useState } from "react";
import { ROOM4_SOLUTION } from "../../data/room4Data";
import styles from "./Room4SolutionScreen.module.css";

const LETTER_COLORS = ["#d4a017","#c8a060","#d4a017","#a07828","#d4a017","#c8a060","#d4a017"];

export default function Room4SolutionScreen({ onComplete }) {
  const [step, setStep] = useState(0);

  return (
    <div className={styles.overlay}>
      {/* Floating embers */}
      <div className={styles.embers} aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className={styles.ember}
            style={{ left: `${(i * 5.5 + 3) % 100}%`, animationDelay: `${i * 0.35}s` }} />
        ))}
      </div>

      <div className={styles.card}>
        <div className={styles.cardTop}>✦ · ✦ · ✦</div>

        <p className={styles.status}>Codewort entschlüsselt</p>

        <div className={styles.wordReveal}>
          {"DRACHEN".split("").map((char, i) => (
            <span key={i} className={styles.letter}
              style={{ animationDelay: `${i * 0.1}s`, color: LETTER_COLORS[i], borderColor: LETTER_COLORS[i] + "88" }}>
              {char}
            </span>
          ))}
        </div>

        <p className={styles.message}>{ROOM4_SOLUTION.message}</p>

        {step >= 1 && (
          <p className={styles.subMessage}>{ROOM4_SOLUTION.subMessage}</p>
        )}

        {step === 0 && (
          <button className={styles.btn} onClick={() => setStep(1)}>
            Weiter ✦
          </button>
        )}

        {step === 1 && (
          <div className={styles.nextBox}>
            <div className={styles.nextOrnament}>- ✦ -</div>
            <p className={styles.nextLabel}>Nächste Etappe</p>
            <p className={styles.nextText}>{ROOM4_SOLUTION.nextRoomHint}</p>
            <button className={styles.btn} onClick={onComplete}>
              Weiter →
            </button>
          </div>
        )}

        <div className={styles.cardBottom}>✦ · · · · Die Bibliothek von Valdrath · · · · ✦</div>
      </div>
    </div>
  );
}
