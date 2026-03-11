import { useState } from "react";
import { PUZZLE_STATEMENTS } from "../../../data/room1Data";
import styles from "./Puzzle.module.css";

export default function StatementPuzzle({ onSolve, solved }) {
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [showReport, setShowReport] = useState(false);

  function handleSelect(stmt) {
    if (solved) return;
    setSelected(stmt.id);
    if (stmt.correct) {
      setFeedback("correct");
      setTimeout(() => onSolve(PUZZLE_STATEMENTS.letter), 1200);
    } else {
      setFeedback("wrong");
      setTimeout(() => setFeedback(null), 1500);
    }
  }

  return (
    <div className={styles.puzzle}>
      <h3 className={styles.puzzleTitle}>{PUZZLE_STATEMENTS.title}</h3>
      <p className={styles.instruction}>{PUZZLE_STATEMENTS.instruction}</p>

      <button
        className={styles.evidenceBtn}
        onClick={() => setShowReport((v) => !v)}
      >
        📋 {PUZZLE_STATEMENTS.clue}
      </button>

      {showReport && (
        <div className={`${styles.document} ${styles.classified}`}>
          <p className={styles.docHeader}>
            TATORTBERICHT – <span className={styles.redStamp}>INTERN</span>
          </p>
          <pre className={styles.reportText}>{PUZZLE_STATEMENTS.policeNote}</pre>
        </div>
      )}

      <p className={styles.subLabel}>
        Welche Aussage enthält etwas, das die Person nicht wissen kann?
      </p>
      <div className={styles.statementList}>
        {PUZZLE_STATEMENTS.statements.map((stmt) => (
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
          Diese Aussage enthält nichts Verdächtiges. Lies den Tatortbericht
          nochmal genau.
        </p>
      )}

      {solved && (
        <div className={styles.revealBox}>
          <span className={styles.revealLetter}>{PUZZLE_STATEMENTS.letter}</span>
          <p>{PUZZLE_STATEMENTS.revealText}</p>
        </div>
      )}
    </div>
  );
}
