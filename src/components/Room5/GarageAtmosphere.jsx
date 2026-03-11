import styles from "./GarageAtmosphere.module.css";

// Sparks rising from the pit lane floor
const SPARKS = [
  { left: "8%",  delay: "0s",   dur: "3.2s", drift: "18px",  size: 3 },
  { left: "15%", delay: "0.7s", dur: "2.8s", drift: "-12px", size: 2 },
  { left: "23%", delay: "1.4s", dur: "3.8s", drift: "22px",  size: 4 },
  { left: "32%", delay: "0.3s", dur: "2.5s", drift: "-20px", size: 2 },
  { left: "41%", delay: "2.1s", dur: "3.1s", drift: "14px",  size: 3 },
  { left: "50%", delay: "0.9s", dur: "4.0s", drift: "-8px",  size: 2 },
  { left: "58%", delay: "1.8s", dur: "2.9s", drift: "26px",  size: 3 },
  { left: "67%", delay: "0.5s", dur: "3.5s", drift: "-16px", size: 2 },
  { left: "75%", delay: "2.6s", dur: "3.0s", drift: "20px",  size: 4 },
  { left: "83%", delay: "1.1s", dur: "2.6s", drift: "-22px", size: 2 },
  { left: "91%", delay: "0.2s", dur: "3.7s", drift: "10px",  size: 3 },
  { left: "4%",  delay: "3.0s", dur: "2.4s", drift: "-14px", size: 2 },
  { left: "47%", delay: "1.6s", dur: "3.3s", drift: "18px",  size: 2 },
  { left: "62%", delay: "2.9s", dur: "2.7s", drift: "-10px", size: 3 },
];

// Horizontal scan lines (subtle HUD effect)
const SCAN_LINES = [12, 28, 44, 60, 76, 92];

export default function GarageAtmosphere() {
  return (
    <div className={styles.atmosphere} aria-hidden="true">

      {/* Carbon fiber texture overlay */}
      <div className={styles.carbon} />

      {/* Red side glow - left */}
      <div className={styles.sideGlowLeft} />
      {/* Red side glow - right */}
      <div className={styles.sideGlowRight} />

      {/* HUD scan lines */}
      {SCAN_LINES.map((top, i) => (
        <div key={i} className={styles.scanLine} style={{ top: `${top}%`, animationDelay: `${i * 0.3}s` }} />
      ))}

      {/* Sparks */}
      {SPARKS.map((s, i) => (
        <div
          key={i}
          className={styles.spark}
          style={{
            left: s.left,
            width: s.size,
            height: s.size,
            animationDuration: s.dur,
            animationDelay: s.delay,
            "--drift": s.drift,
          }}
        />
      ))}

      {/* Floor reflective strip */}
      <div className={styles.floorGlow} />

    </div>
  );
}
