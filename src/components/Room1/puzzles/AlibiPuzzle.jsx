import { useState } from "react";
import { PUZZLE_ALIBI } from "../../../data/room1Data";
import styles from "./Puzzle.module.css";

export default function AlibiPuzzle({ onSolve, solved }) {
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [showLog, setShowLog] = useState(false);

  function handleSelect(stmt) {
    if (solved) return;
    setSelected(stmt.id);
    if (stmt.correct) {
      setFeedback("correct");
      setTimeout(() => onSolve(PUZZLE_ALIBI.letter), 1200);
    } else {
      setFeedback("wrong");
      setTimeout(() => setFeedback(null), 1500);
    }
  }

  const { accessLog } = PUZZLE_ALIBI;

  return (
    <div className={styles.puzzle}>
      <h3 className={styles.puzzleTitle}>{PUZZLE_ALIBI.title}</h3>
      <p className={styles.instruction}>{PUZZLE_ALIBI.instruction}</p>

      <button
        className={styles.evidenceBtn}
        onClick={() => setShowLog((v) => !v)}
      >
        📂 {PUZZLE_ALIBI.clue}
      </button>

      {showLog && (
        <div className={styles.document}>
          <p className={styles.docHeader}>
            <span
              className={styles.highlightLetter}
              title="Erster Buchstabe des Lösungsworts"
            >
              {accessLog.highlight}
            </span>
            {accessLog.highlightWord.slice(1)}
          </p>
          <table className={styles.logTable}>
            <tbody>
              <tr>
                <td>Nutzer</td>
                <td>
                  <strong>{accessLog.name}</strong>
                </td>
              </tr>
              <tr>
                <td>Eingang</td>
                <td>{accessLog.entry}</td>
              </tr>
              <tr className={styles.exitRow}>
                <td>Ausgang</td>
                <td>
                  <strong>{accessLog.exit}</strong> ⚠
                </td>
              </tr>
              <tr>
                <td>Datum</td>
                <td>{accessLog.date}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <p className={styles.subLabel}>Verdächtigenaussagen:</p>
      <div className={styles.statementList}>
        {PUZZLE_ALIBI.statements.map((stmt) => (
          <button
            key={stmt.id}
            className={`${styles.statement} ${
              selected === stmt.id && feedback === "wrong" ? styles.wrong : ""
            } ${solved && stmt.correct ? styles.solvedCorrect : ""}`}
            onClick={() => handleSelect(stmt)}
            disabled={solved}
          >
            <span className={styles.suspectName}>{stmt.suspect}</span>
            <span className={styles.stmtText}>{stmt.text}</span>
          </button>
        ))}
      </div>

      {feedback === "wrong" && (
        <p className={styles.feedbackWrong}>
          Diese Aussage enthält keinen Widerspruch zu den Beweisen.
        </p>
      )}

      {solved && (
        <div className={styles.revealBox}>
          <span className={styles.revealLetter}>{PUZZLE_ALIBI.letter}</span>
          <p>{PUZZLE_ALIBI.revealText}</p>
        </div>
      )}
    </div>
  );
}
