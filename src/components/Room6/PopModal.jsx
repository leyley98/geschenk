import { useState, useEffect } from "react";
import styles from "./PopModal.module.css";

// Handles both quiz challenges (type:"quiz") and fun bonus cards (type:"card")
export default function PopModal({ challenge, onComplete, onClose }) {
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null); // null | "correct" | "wrong"
  const [wrongShake, setWrongShake] = useState(false);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape" && result !== "correct") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, result]);

  function handleOption(index) {
    if (result === "correct") return;
    setSelected(index);
    if (index === challenge.correctIndex) {
      setResult("correct");
    } else {
      setResult("wrong");
      setWrongShake(true);
      setTimeout(() => {
        setWrongShake(false);
        setResult(null);
        setSelected(null);
      }, 700);
    }
  }

  const isCard = challenge.type === "card";

  return (
    <div
      className={styles.overlay}
      onClick={(e) => e.target === e.currentTarget && result !== "correct" && onClose()}
    >
      <div className={`${styles.card} ${wrongShake ? styles.shake : ""}`}>

        {/* Top glitter bar */}
        <div className={styles.topBar} />

        {/* Section label */}
        <p className={styles.sectionLabel}>{challenge.sectionLabel}</p>

        {/* Emoji + Title */}
        <div className={styles.titleRow}>
          <span className={styles.bigEmoji}>{challenge.emoji}</span>
          <div>
            <h2 className={styles.title}>{challenge.title}</h2>
            <p className={styles.subtitle}>{challenge.subtitle}</p>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* ── CARD TYPE (bonus tile) ── */}
        {isCard && (
          <div className={styles.cardContent}>
            <p className={styles.funText}>{challenge.funText}</p>
            <button className={styles.closeCardBtn} onClick={onClose}>
              Too cute ✦
            </button>
          </div>
        )}

        {/* ── QUIZ TYPE (letter challenge) ── */}
        {!isCard && result !== "correct" && (
          <>
            <p className={styles.question}>{challenge.question}</p>
            <div className={styles.options}>
              {challenge.options.map((opt, i) => (
                <button
                  key={i}
                  className={`${styles.optionBtn} ${
                    selected === i && result === "wrong" ? styles.optionWrong : ""
                  }`}
                  onClick={() => handleOption(i)}
                >
                  <span className={styles.optionIndex}>
                    {["A", "B", "C"][i]}
                  </span>
                  {opt}
                </button>
              ))}
            </div>
            {result === "wrong" && (
              <p className={styles.wrongMsg}>Hmm, not quite – try again! ✦</p>
            )}
          </>
        )}

        {/* ── QUIZ SUCCESS STATE ── */}
        {!isCard && result === "correct" && (
          <div className={styles.successPane}>
            <div className={styles.sparkleRow}>
              <span>✦</span><span>✦</span><span>✦</span>
            </div>
            <p className={styles.letterFoundLabel}>Glitter-Buchstabe entdeckt!</p>
            <div className={styles.letterReveal}>
              {challenge.letter}
            </div>
            <p className={styles.successText}>{challenge.successText}</p>
            <button className={styles.confirmBtn} onClick={onComplete}>
              Buchstabe einsammeln ✦
            </button>
          </div>
        )}

        {/* Close button – only when not just solved a quiz */}
        {result !== "correct" && (
          <button className={styles.closeBtnX} onClick={onClose} aria-label="Schließen">
            ✕
          </button>
        )}

      </div>
    </div>
  );
}
