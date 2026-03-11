import { useState, useEffect } from "react";
import styles from "./LightsOut.module.css";

export default function LightsOut({ onDone }) {
  const [litCount, setLitCount] = useState(0);
  const [phase, setPhase] = useState("preparing"); // preparing | lighting | go

  // Start lighting after brief pause
  useEffect(() => {
    const t = setTimeout(() => setPhase("lighting"), 1200);
    return () => clearTimeout(t);
  }, []);

  // Light up one by one
  useEffect(() => {
    if (phase !== "lighting") return;
    if (litCount < 5) {
      const t = setTimeout(() => setLitCount(c => c + 1), 700);
      return () => clearTimeout(t);
    }
    // All 5 lit - pause then GO
    const t = setTimeout(() => setPhase("go"), 1200);
    return () => clearTimeout(t);
  }, [phase, litCount]);

  // After GO, call onDone
  useEffect(() => {
    if (phase !== "go") return;
    const t = setTimeout(onDone, 2000);
    return () => clearTimeout(t);
  }, [phase, onDone]);

  const lightsOut = phase === "go";

  return (
    <div className={styles.overlay}>
      {/* Subtle grid */}
      <div className={styles.grid} aria-hidden="true" />

      <div className={styles.scene}>
        <p className={styles.venue}>
          AUTODROMO ENZO E DINO FERRARI &nbsp;·&nbsp; IMOLA &nbsp;·&nbsp; GP DELL'EMILIA-ROMAGNA
        </p>

        {/* The 5 lights */}
        <div className={styles.gantry}>
          <div className={styles.arm} />
          {[1, 2, 3, 4, 5].map(n => (
            <div key={n} className={styles.pod}>
              <div
                className={`${styles.light} ${litCount >= n && !lightsOut ? styles.lit : ""} ${lightsOut ? styles.extinguished : ""}`}
              />
            </div>
          ))}
          <div className={styles.arm} />
        </div>

        <p className={styles.status}>
          {phase === "preparing" && "FORMATION LAP COMPLETE - AWAIT SIGNAL"}
          {phase === "lighting" && litCount < 5 && `LIGHTS INITIALISING · ${litCount} / 5`}
          {phase === "lighting" && litCount === 5 && "· · · · ·"}
        </p>

        {lightsOut && (
          <p className={styles.goText}>LIGHTS OUT - AND AWAY WE GO!</p>
        )}
      </div>
    </div>
  );
}
