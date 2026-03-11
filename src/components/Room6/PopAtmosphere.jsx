import styles from "./PopAtmosphere.module.css";

// Floating sparkle/star particles
const SPARKLES = [
  { left: "5%",  top: "10%", size: 14, delay: "0s",    dur: "6s",  shape: "star" },
  { left: "18%", top: "22%", size: 8,  delay: "1.2s",  dur: "5s",  shape: "heart" },
  { left: "32%", top: "8%",  size: 12, delay: "2.4s",  dur: "7s",  shape: "star" },
  { left: "47%", top: "16%", size: 6,  delay: "0.7s",  dur: "5.5s",shape: "diamond" },
  { left: "61%", top: "5%",  size: 10, delay: "3.1s",  dur: "6.5s",shape: "star" },
  { left: "74%", top: "19%", size: 8,  delay: "1.8s",  dur: "4.8s",shape: "heart" },
  { left: "88%", top: "11%", size: 12, delay: "0.3s",  dur: "7.2s",shape: "star" },
  { left: "93%", top: "30%", size: 6,  delay: "2.9s",  dur: "5.3s",shape: "diamond" },
  { left: "11%", top: "42%", size: 8,  delay: "4.0s",  dur: "6.0s",shape: "star" },
  { left: "55%", top: "35%", size: 10, delay: "1.5s",  dur: "5.8s",shape: "heart" },
  { left: "79%", top: "45%", size: 7,  delay: "3.6s",  dur: "4.5s",shape: "star" },
  { left: "26%", top: "55%", size: 9,  delay: "0.9s",  dur: "6.8s",shape: "diamond" },
  { left: "68%", top: "60%", size: 6,  delay: "2.2s",  dur: "5.1s",shape: "star" },
  { left: "42%", top: "70%", size: 11, delay: "4.5s",  dur: "7.0s",shape: "heart" },
  { left: "85%", top: "65%", size: 7,  delay: "1.1s",  dur: "5.4s",shape: "star" },
  { left: "8%",  top: "75%", size: 9,  delay: "3.3s",  dur: "6.2s",shape: "diamond" },
];

// Drifting glitter dots
const GLITTER = [
  { left: "12%", delay: "0s",   dur: "8s",  size: 3 },
  { left: "25%", delay: "1.5s", dur: "6.5s",size: 2 },
  { left: "38%", delay: "3.0s", dur: "9s",  size: 4 },
  { left: "51%", delay: "0.8s", dur: "7s",  size: 2 },
  { left: "64%", delay: "2.2s", dur: "8.5s",size: 3 },
  { left: "77%", delay: "4.1s", dur: "6s",  size: 2 },
  { left: "90%", delay: "1.0s", dur: "7.5s",size: 4 },
  { left: "3%",  delay: "2.8s", dur: "9.5s",size: 2 },
  { left: "44%", delay: "5.0s", dur: "7s",  size: 3 },
  { left: "70%", delay: "0.4s", dur: "8s",  size: 2 },
  { left: "58%", delay: "3.7s", dur: "6.8s",size: 3 },
  { left: "18%", delay: "6.0s", dur: "7.2s",size: 2 },
];

function StarSVG({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2 L13.5 9 L20 9 L14.5 13.5 L16.5 20.5 L12 16.5 L7.5 20.5 L9.5 13.5 L4 9 L10.5 9 Z"
        fill={color}
        opacity="0.85"
      />
    </svg>
  );
}

function HeartSVG({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} opacity="0.75">
      <path d="M12 21C12 21 3 14 3 8.5C3 5.4 5.4 3 8.5 3C10.2 3 11.8 3.9 12 5C12.2 3.9 13.8 3 15.5 3C18.6 3 21 5.4 21 8.5C21 14 12 21 12 21Z" />
    </svg>
  );
}

function DiamondSVG({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} opacity="0.8">
      <path d="M12 3 L20 10 L12 21 L4 10 Z" />
    </svg>
  );
}

const SHAPE_COLORS = {
  star:    ["#ffd6f0", "#f9a8d4", "#fbbf24", "#e879f9"],
  heart:   ["#fb7185", "#f472b6", "#e879f9", "#fda4af"],
  diamond: ["#c084fc", "#a78bfa", "#fbbf24", "#f9a8d4"],
};

function Sparkle({ left, top, size, delay, dur, shape }) {
  const colors = SHAPE_COLORS[shape];
  const color = colors[Math.floor(Math.abs(parseFloat(left) * 7 + parseFloat(top) * 3) % colors.length)];
  return (
    <div
      className={styles.sparkle}
      style={{ left, top, animationDuration: dur, animationDelay: delay }}
    >
      {shape === "star"    && <StarSVG    size={size} color={color} />}
      {shape === "heart"   && <HeartSVG   size={size} color={color} />}
      {shape === "diamond" && <DiamondSVG size={size} color={color} />}
    </div>
  );
}

export default function PopAtmosphere() {
  return (
    <div className={styles.atmosphere} aria-hidden="true">

      {/* Radial glow blobs */}
      <div className={styles.glow1} />
      <div className={styles.glow2} />
      <div className={styles.glow3} />

      {/* Sparkle particles */}
      {SPARKLES.map((s, i) => <Sparkle key={i} {...s} />)}

      {/* Rising glitter dots */}
      {GLITTER.map((g, i) => (
        <div
          key={i}
          className={styles.glitterDot}
          style={{
            left: g.left,
            width: g.size,
            height: g.size,
            animationDuration: g.dur,
            animationDelay: g.delay,
          }}
        />
      ))}

      {/* Bottom floor glow */}
      <div className={styles.floorGlow} />

    </div>
  );
}
