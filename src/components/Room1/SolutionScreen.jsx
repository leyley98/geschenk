import { SOLUTION, SUSPECTS } from "../../data/room1Data";
import styles from "./SolutionScreen.module.css";

export default function SolutionScreen({ onNext }) {
  const guilty = SUSPECTS.find((s) => s.name === SOLUTION.guilty);

  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        <p className={styles.caseStatus}>FALL GELÖST</p>
        <div className={styles.guiltyCard}>
          <span className={styles.photo}>👤</span>
          <div>
            <p className={styles.guiltyLabel}>TÄTERIN</p>
            <h2 className={styles.guiltyName}>{SOLUTION.guilty}</h2>
            <p className={styles.guiltyRole}>{guilty?.role}</p>
          </div>
        </div>

        <div className={styles.explanation}>
          <pre>{SOLUTION.explanation}</pre>
        </div>

        <div className={styles.nextHint}>
          <p className={styles.nextLabel}>NÄCHSTE SPUR</p>
          <p className={styles.nextText}>{SOLUTION.nextRoomHint}</p>
        </div>

        {onNext && (
          <button className={styles.nextBtn} onClick={onNext}>
            WEITER ZU RAUM 2 →
          </button>
        )}
      </div>
    </div>
  );
}
