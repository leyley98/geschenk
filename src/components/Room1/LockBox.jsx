import { useState, useRef } from "react";
import { SOLUTION } from "../../data/room1Data";
import styles from "./LockBox.module.css";

export default function LockBox({ collectedLetters, onUnlock }) {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("idle"); // idle | wrong | unlocked
  const inputRef = useRef(null);

  const allCollected = collectedLetters.length === 4;

  function handleChange(e) {
    const val = e.target.value.toUpperCase().slice(0, 4);
    setInput(val);
    setStatus("idle");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (input === SOLUTION.code) {
      setStatus("unlocked");
      setTimeout(onUnlock, 1500);
    } else {
      setStatus("wrong");
      setTimeout(() => setStatus("idle"), 1200);
    }
  }

  return (
    <div className={`${styles.lockBox} ${status === "unlocked" ? styles.unlocked : ""}`}>
      <div className={styles.lockIcon}>🔒</div>
      <h3 className={styles.title}>BEWEISBOX</h3>
      <p className={styles.hint}>
        {allCollected
          ? "Alle 4 Buchstaben gesammelt. Gib das Lösungswort ein."
          : `Noch ${4 - collectedLetters.length} Beweis${
              4 - collectedLetters.length === 1 ? "" : "e"
            } fehlen.`}
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className={`${styles.codeInput} ${
            status === "wrong" ? styles.inputWrong : ""
          } ${status === "unlocked" ? styles.inputUnlocked : ""}`}
          type="text"
          value={input}
          onChange={handleChange}
          maxLength={4}
          placeholder="_ _ _ _"
          disabled={!allCollected || status === "unlocked"}
          autoComplete="off"
          spellCheck={false}
        />
        <button
          className={styles.submitBtn}
          type="submit"
          disabled={!allCollected || input.length !== 4 || status === "unlocked"}
        >
          ÖFFNEN
        </button>
      </form>

      {status === "wrong" && (
        <p className={styles.feedbackWrong}>Falsches Lösungswort.</p>
      )}
      {status === "unlocked" && (
        <p className={styles.feedbackOk}>
          ✓ Die Box öffnet sich...
        </p>
      )}
    </div>
  );
}
