import { useState } from "react";
import { PUZZLE_RECEIPT } from "../../../data/room1Data";
import styles from "./Puzzle.module.css";

export default function ReceiptPuzzle({ onSolve, solved }) {
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  function handleSelect(tx) {
    if (solved || !tx.correct) {
      if (!tx.correct) {
        setSelected(tx.id);
        setFeedback("wrong");
        setTimeout(() => {
          setFeedback(null);
          setSelected(null);
        }, 1500);
      }
      return;
    }
    setSelected(tx.id);
    setFeedback("correct");
    setTimeout(() => onSolve(PUZZLE_RECEIPT.letter), 1200);
  }

  function toggleExpand(id) {
    setExpandedId(expandedId === id ? null : id);
  }

  const suspects = [
    ...new Set(PUZZLE_RECEIPT.transactions.map((t) => t.suspect)),
  ];

  return (
    <div className={styles.puzzle}>
      <h3 className={styles.puzzleTitle}>{PUZZLE_RECEIPT.title}</h3>
      <p className={styles.instruction}>{PUZZLE_RECEIPT.instruction}</p>
      <p className={styles.subLabel}>
        📂 {PUZZLE_RECEIPT.clue} – Klicke auf eine Transaktion für Details,
        dann auf die verdächtigste.
      </p>

      {suspects.map((suspect) => (
        <div key={suspect} className={styles.suspectBlock}>
          <p className={styles.suspectBlockName}>{suspect}</p>
          {PUZZLE_RECEIPT.transactions
            .filter((t) => t.suspect === suspect)
            .map((tx) => (
              <div key={tx.id} className={styles.txWrapper}>
                <button
                  className={`${styles.txRow} ${
                    tx.suspicious ? styles.suspiciousTx : ""
                  } ${selected === tx.id && feedback === "wrong" ? styles.wrong : ""} ${
                    solved && tx.correct ? styles.solvedCorrect : ""
                  }`}
                  onClick={() => toggleExpand(tx.id)}
                  disabled={solved}
                >
                  <span className={styles.txTime}>{tx.time}</span>
                  <span className={styles.txLocation}>{tx.location}</span>
                  <span className={styles.txAmount}>{tx.amount}</span>
                  <span className={styles.txExpand}>
                    {expandedId === tx.id ? "▲" : "▼"}
                  </span>
                </button>

                {expandedId === tx.id && (
                  <div className={styles.txDetail}>
                    <p>{tx.note}</p>
                    {!solved && (
                      <button
                        className={styles.markSuspicious}
                        onClick={() => handleSelect(tx)}
                      >
                        ⚠ Als verdächtig markieren
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
        </div>
      ))}

      {feedback === "wrong" && (
        <p className={styles.feedbackWrong}>
          Diese Transaktion ist nicht der entscheidende Beweis. Schau genauer
          hin.
        </p>
      )}

      {solved && (
        <div className={styles.revealBox}>
          <span className={styles.revealLetter}>{PUZZLE_RECEIPT.letter}</span>
          <p>{PUZZLE_RECEIPT.revealText}</p>
        </div>
      )}
    </div>
  );
}
