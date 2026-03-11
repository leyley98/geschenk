import { useState, useEffect } from "react";
import styles from "./BirthdayScreen.module.css";

// Deterministic stars
const STARS = Array.from({ length: 160 }, (_, i) => ({
  id: i,
  x: ((i * 137.508) % 100).toFixed(2),
  y: ((i * 97.311) % 100).toFixed(2),
  r: (0.5 + (i % 5) * 0.3).toFixed(2),
  opacity: (0.15 + (i % 7) * 0.09).toFixed(2),
  delay: ((i % 13) * 0.4).toFixed(1),
}));

// Deterministic balloons
const BALLOONS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: ((i * 137.508) % 90 + 5).toFixed(1),
  dur: (8 + (i % 5) * 1.4).toFixed(1),
  delay: ((i % 7) * -1.2).toFixed(1),
  color: ["#ff6b9d","#ffd700","#a855f7","#4a90cc","#00d68f","#ff8c42"][i % 6],
  size: 28 + (i % 4) * 8,
}));

export default function BirthdayScreen({ onEnter }) {
  const [entered, setEntered] = useState(false);

  function handleClick() {
    setEntered(true);
    setTimeout(onEnter, 700);
  }

  return (
    <div className={`${styles.page} ${entered ? styles.fadeOut : ""}`}>
      {/* Stars */}
      <div className={styles.stars} aria-hidden="true">
        {STARS.map(s => (
          <div key={s.id} className={styles.star} style={{
            left: `${s.x}%`, top: `${s.y}%`,
            width: `${s.r * 2}px`, height: `${s.r * 2}px`,
            opacity: s.opacity, animationDelay: `${s.delay}s`,
          }} />
        ))}
      </div>

      {/* Floating balloons */}
      <div className={styles.balloons} aria-hidden="true">
        {BALLOONS.map(b => (
          <div key={b.id} className={styles.balloon} style={{
            left: `${b.x}%`,
            width: `${b.size}px`,
            height: `${b.size * 1.2}px`,
            background: b.color,
            animationDuration: `${b.dur}s`,
            animationDelay: `${b.delay}s`,
          }}>
            <div className={styles.balloonString} style={{ borderColor: b.color }} />
          </div>
        ))}
      </div>

      {/* Ambient glows */}
      <div className={styles.glow1} aria-hidden="true" />
      <div className={styles.glow2} aria-hidden="true" />
      <div className={styles.glow3} aria-hidden="true" />

      <div className={styles.content}>
        {/* Age badge */}
        <div className={styles.ageBadge}>
          <span className={styles.ageNumber}>30</span>
        </div>

        {/* Main headline */}
        <div className={styles.headlineBlock}>
          <span className={styles.preheadline}>✦ &nbsp; H E R Z L I C H E N &nbsp; G L Ü C K W U N S C H &nbsp; ✦</span>
          <h1 className={styles.headline}>Alles Gute* zum<br />30. Geburtstag Mausi 2</h1>
        </div>

        {/* Divider */}
        <div className={styles.divider}>
          <div className={styles.dividerLine} />
          <span className={styles.dividerGem}>🎂</span>
          <div className={styles.dividerLine} />
        </div>

        {/* Message */}
        <p className={styles.message}>
          Du musst alle Level bezwingen und am Ende wartet noch eine kleine Überraschung :)
          <br /><br />
          <span className={styles.messageSub}>
            Aber ich hoffe, die Level ansich sind schon eine gute Überraschung. 🎁
          </span>
          
          <span className={styles.messageSub}>
            *nachträglich
          </span>
        </p>

        {/* CTA button */}
        <button className={styles.btn} onClick={handleClick}>
          <span className={styles.btnIcon}>🗝️</span>
          <span className={styles.btnText}>Abenteuer beginnen</span>
          <span className={styles.btnArrow}>▶</span>
        </button>

        {/* Footer note */}
        <p className={styles.footer}>5 Räume · 5 Rätsel · 1 Geheimnis</p>
      </div>
    </div>
  );
}
