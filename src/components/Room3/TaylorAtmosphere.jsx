import styles from "./TaylorAtmosphere.module.css";

// Clouds: { top, width, speed, delay, dir (1=ltr, -1=rtl), opacity }
const CLOUDS = [
  { top: "6%",  width: 230, speed: "48s", delay: "0s",   dir:  1, opacity: 0.92 },
  { top: "13%", width: 155, speed: "65s", delay: "14s",  dir:  1, opacity: 0.82 },
  { top: "4%",  width: 190, speed: "40s", delay: "24s",  dir: -1, opacity: 0.88 },
  { top: "20%", width: 270, speed: "55s", delay: "8s",   dir:  1, opacity: 0.75 },
  { top: "9%",  width: 125, speed: "34s", delay: "32s",  dir: -1, opacity: 0.72 },
  { top: "2%",  width: 200, speed: "44s", delay: "18s",  dir:  1, opacity: 0.85 },
];

// Seagulls: { top, scale, speed, delay, dir }
const SEAGULLS = [
  { top: "22%", scale: 0.70, speed: "24s", delay: "0s",   dir:  1 },
  { top: "30%", scale: 0.95, speed: "32s", delay: "8s",   dir:  1 },
  { top: "16%", scale: 0.50, speed: "19s", delay: "15s",  dir: -1 },
  { top: "36%", scale: 0.80, speed: "28s", delay: "4s",   dir:  1 },
  { top: "12%", scale: 0.55, speed: "21s", delay: "22s",  dir: -1 },
  { top: "26%", scale: 1.15, speed: "38s", delay: "11s",  dir:  1 },
  { top: "8%",  scale: 0.40, speed: "17s", delay: "28s",  dir:  1 },
  { top: "40%", scale: 0.75, speed: "30s", delay: "6s",   dir: -1 },
];

function Cloud({ top, width, speed, delay, dir, opacity }) {
  const h = Math.round(width * 0.36);
  return (
    <div
      className={`${styles.cloud} ${dir === 1 ? styles.cloudLTR : styles.cloudRTL}`}
      style={{ top, width, height: h, opacity, animationDuration: speed, animationDelay: delay }}
    >
      <div className={styles.cp1} style={{ width: width * 0.55, height: h * 0.75 }} />
      <div className={styles.cp2} style={{ width: width * 0.38, height: h * 1.05 }} />
      <div className={styles.cp3} style={{ width: width * 0.27, height: h * 0.85 }} />
      <div className={styles.cp4} style={{ width: width * 0.20, height: h * 0.65 }} />
    </div>
  );
}

function Seagull({ top, scale, speed, delay, dir }) {
  const w = Math.round(64 * scale);
  const h = Math.round(26 * scale);
  return (
    <div
      className={`${styles.seagull} ${dir === 1 ? styles.seagullLTR : styles.seagullRTL}`}
      style={{ top, animationDuration: speed, animationDelay: delay }}
    >
      <svg width={w} height={h} viewBox="0 0 64 26" fill="none">
        {/* Left wing */}
        <path d="M32 13 C24 3 13 4 0 9" stroke="#1a3a5c" strokeWidth="2.8"
          strokeLinecap="round" opacity="0.75" />
        {/* Right wing */}
        <path d="M32 13 C40 3 51 4 64 9" stroke="#1a3a5c" strokeWidth="2.8"
          strokeLinecap="round" opacity="0.75" />
        {/* Small body hint */}
        <ellipse cx="32" cy="13" rx="3" ry="2" fill="#1a3a5c" opacity="0.6" />
      </svg>
    </div>
  );
}

export default function TaylorAtmosphere() {
  return (
    <div className={styles.atmosphere} aria-hidden="true">

      {/* ── Sun glow (upper right) ───────────────────────────── */}
      <div className={styles.sun} />
      <div className={styles.sunHaze} />

      {/* ── Light rays ──────────────────────────────────────── */}
      {["-28deg","−14deg","0deg","14deg","28deg","42deg"].map((angle, i) => (
        <div key={i} className={styles.ray} style={{ "--angle": angle, "--ray-delay": `${i * 0.8}s` }} />
      ))}

      {/* ── Clouds ───────────────────────────────────────────── */}
      {CLOUDS.map((c, i) => <Cloud key={i} {...c} />)}

      {/* ── Seagulls ─────────────────────────────────────────── */}
      {SEAGULLS.map((s, i) => <Seagull key={i} {...s} />)}

      {/* ── Ocean / waves at bottom ──────────────────────────── */}
      <div className={styles.ocean}>
        {/* Wave 1 - back, slower */}
        <svg className={styles.wave} style={{ "--wave-speed": "12s", "--wave-opacity": "0.35", "--wave-color": "#5ba8cc", "--wave-offset": "0px" }}
          viewBox="0 0 2880 80" preserveAspectRatio="none">
          <path d="M0,40 C240,10 480,70 720,40 C960,10 1200,70 1440,40 C1680,10 1920,70 2160,40 C2400,10 2640,70 2880,40 L2880,80 L0,80 Z" fill="var(--wave-color)" />
        </svg>
        {/* Wave 2 - mid */}
        <svg className={styles.wave} style={{ "--wave-speed": "9s", "--wave-opacity": "0.45", "--wave-color": "#4191b8", "--wave-offset": "0px" }}
          viewBox="0 0 2880 80" preserveAspectRatio="none">
          <path d="M0,50 C200,20 400,65 720,45 C960,28 1200,62 1440,45 C1680,28 2000,68 2160,45 C2400,22 2640,65 2880,50 L2880,80 L0,80 Z" fill="var(--wave-color)" />
        </svg>
        {/* Wave 3 - front, fastest */}
        <svg className={styles.wave} style={{ "--wave-speed": "6s", "--wave-opacity": "0.6", "--wave-color": "#2e7aaa", "--wave-offset": "180px" }}
          viewBox="0 0 2880 80" preserveAspectRatio="none">
          <path d="M0,45 C160,65 320,25 480,45 C640,65 800,25 960,45 C1120,65 1280,25 1440,45 C1600,65 1760,25 1920,45 C2080,65 2240,25 2400,45 C2560,65 2720,25 2880,45 L2880,80 L0,80 Z" fill="var(--wave-color)" />
        </svg>
        {/* Ocean base */}
        <div className={styles.oceanBase} />
      </div>

      {/* ── Bokeh / light flecks ─────────────────────────────── */}
      {[
        ["12%","15%","60px","5s","0s"],["80%","8%","40px","7s","2s"],["35%","18%","50px","6s","4s"],
        ["60%","12%","35px","8s","1s"],["20%","25%","45px","5s","3s"],["72%","22%","55px","9s","0.5s"],
        ["48%","10%","30px","4s","6s"],["5%","30%","40px","7s","2.5s"],["90%","18%","48px","6s","3.5s"],
      ].map(([left, top, size, dur, delay], i) => (
        <div key={i} className={styles.bokeh}
          style={{ left, top, width: size, height: size, animationDuration: dur, animationDelay: delay }} />
      ))}

    </div>
  );
}
