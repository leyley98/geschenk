import styles from "./LetterBoard.module.css";

export default function LetterBoard({ collected, letters = ["G", "I", "F", "T"] }) {
  return (
    <div className={styles.board}>
      <p className={styles.label}>LÖSUNGSWORT</p>
      <div className={styles.slots}>
        {letters.map((letter) => {
          const found = collected.includes(letter);
          return (
            <div
              key={letter}
              className={`${styles.slot} ${found ? styles.found : styles.empty}`}
            >
              {found ? letter : "?"}
            </div>
          );
        })}
      </div>
      <p className={styles.count}>
        {collected.length} / {letters.length} Beweise gesichert
      </p>
    </div>
  );
}
