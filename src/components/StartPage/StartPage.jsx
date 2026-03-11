import { useMemo } from "react";
import styles from "./StartPage.module.css";

const LEVELS = [
  {
    roomId: 5,
    num: 1,
    title: "Pit Wall",
    world: "Scuderia Ferrari · Monza",
    icon: "🏎️",
    color: "#DC0000",
    dark: "#8a0000",
    glow: "rgba(220,0,0,0.6)",
  },
  {
    roomId: 3,
    num: 2,
    title: "1989",
    world: "Taylor's Version · Eras Tour",
    icon: "✨",
    color: "#4a90cc",
    dark: "#1a4a7a",
    glow: "rgba(74,144,204,0.6)",
  },
  {
    roomId: 1,
    num: 3,
    title: "Eibenbach",
    world: "Das Schweigen · Österreich 1987",
    icon: "🔍",
    color: "#c8a97e",
    dark: "#6a4a20",
    glow: "rgba(200,169,126,0.6)",
  },
  {
    roomId: 4,
    num: 4,
    title: "Valdrath",
    world: "Die Bibliothek · Runen & Drachen",
    icon: "🐉",
    color: "#a855f7",
    dark: "#5a1a9a",
    glow: "rgba(168,85,247,0.6)",
  },
  {
    roomId: 6,
    num: 5,
    title: "Pop Room",
    world: "POPSTAR · Glitter & Vibes",
    icon: "⭐",
    color: "#f472b6",
    dark: "#8a1a5a",
    glow: "rgba(244,114,182,0.6)",
  },
];

// Node positions in viewBox 0 0 900 500
const NODE_POS = [
  { cx: 130, cy: 120 },  // L1 - left, row 1
  { cx: 770, cy: 110 },  // L2 - right, row 1
  { cx: 760, cy: 270 },  // L3 - right, row 2
  { cx: 140, cy: 260 },  // L4 - left, row 2
  { cx: 450, cy: 420 },  // L5 - center, row 3
];

// Curved Mario-style path
const ROAD_PATH =
  "M 130,120 C 320,80 560,155 770,110 C 820,170 820,210 760,270 C 580,310 320,225 140,260 C 90,320 220,390 450,420";

// Decorative cloud blobs
const CLOUDS = [
  { x: 60,  y: 30,  r1: 28, r2: 22, r3: 20 },
  { x: 580, y: 20,  r1: 32, r2: 26, r3: 23 },
  { x: 820, y: 380, r1: 24, r2: 18, r3: 16 },
  { x: 240, y: 380, r1: 20, r2: 15, r3: 14 },
];

function Stars() {
  const stars = useMemo(() => Array.from({ length: 120 }, (_, i) => ({
    id: i,
    x: ((i * 137.508) % 100).toFixed(2),
    y: ((i * 97.311) % 100).toFixed(2),
    r: (0.6 + (i % 5) * 0.28).toFixed(2),
    opacity: (0.25 + (i % 7) * 0.08).toFixed(2),
    delay: ((i % 13) * 0.4).toFixed(1),
  })), []);

  return (
    <div className={styles.stars} aria-hidden="true">
      {stars.map(s => (
        <div key={s.id} className={styles.star} style={{
          left: `${s.x}%`, top: `${s.y}%`,
          width: `${s.r * 2}px`, height: `${s.r * 2}px`,
          opacity: s.opacity, animationDelay: `${s.delay}s`,
        }} />
      ))}
    </div>
  );
}

export default function StartPage({ completedRooms, onStart }) {
  const firstUnlockedIdx = LEVELS.findIndex(l => !completedRooms.has(l.roomId));
  const allDone = firstUnlockedIdx === -1;

  function getState(idx) {
    const level = LEVELS[idx];
    if (completedRooms.has(level.roomId)) return "complete";
    if (idx === firstUnlockedIdx) return "unlocked";
    return "locked";
  }

  return (
    <div className={styles.page}>
      <Stars />
      <div className={styles.moon} aria-hidden="true" />

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.titleBlock}>
          <span className={styles.pretitle}>✦ ESCAPE ROOM ✦</span>
          <h1 className={styles.title}>LEVEL SELECT</h1>
        </div>
        <p className={styles.progress}>
          {completedRooms.size} / {LEVELS.length} LEVELS CLEARED
        </p>
      </header>

      {/* Map */}
      <div className={styles.mapWrap}>
        <svg viewBox="0 0 900 500" className={styles.mapSvg} xmlns="http://www.w3.org/2000/svg">

          {/* ── Decorative clouds ── */}
          {CLOUDS.map((c, i) => (
            <g key={i} className={styles.cloud} opacity="0.12">
              <ellipse cx={c.x} cy={c.y + 6} rx={c.r1} ry={c.r1 * 0.6} fill="#fff" />
              <ellipse cx={c.x - c.r2 * 0.7} cy={c.y} rx={c.r2} ry={c.r2 * 0.75} fill="#fff" />
              <ellipse cx={c.x + c.r3 * 0.6} cy={c.y + 2} rx={c.r3} ry={c.r3 * 0.7} fill="#fff" />
            </g>
          ))}

          {/* ── Ground strip ── */}
          <path
            d="M 0,480 Q 225,460 450,470 Q 675,480 900,465 L 900,500 L 0,500 Z"
            fill="rgba(30,60,20,0.25)"
          />
          <path
            d="M 0,480 Q 225,460 450,470 Q 675,480 900,465"
            fill="none"
            stroke="rgba(60,140,40,0.3)"
            strokeWidth="2"
          />

          {/* ── Path shadow (depth) ── */}
          <path
            d={ROAD_PATH}
            fill="none"
            stroke="rgba(0,0,0,0.45)"
            strokeWidth="30"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* ── Path base (stone) ── */}
          <path
            d={ROAD_PATH}
            fill="none"
            stroke="rgba(80,70,100,0.55)"
            strokeWidth="22"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* ── Path center dashes ── */}
          <path
            d={ROAD_PATH}
            fill="none"
            stroke="rgba(255,255,255,0.10)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="12 22"
          />

          {/* ── Completed road glow segments ── */}
          {LEVELS.map((level, idx) => {
            if (idx === 0) return null;
            if (getState(idx - 1) !== "complete") return null;
            const from = NODE_POS[idx - 1];
            const to = NODE_POS[idx];
            return (
              <line
                key={`seg-${idx}`}
                x1={from.cx} y1={from.cy}
                x2={to.cx}   y2={to.cy}
                stroke={LEVELS[idx - 1].color}
                strokeWidth="5"
                strokeLinecap="round"
                opacity="0.55"
              />
            );
          })}

          {/* ── Level nodes ── */}
          {LEVELS.map((level, idx) => {
            const state = getState(idx);
            const pos = NODE_POS[idx];
            const isUnlocked = state === "unlocked";
            const isComplete = state === "complete";
            const isLocked   = state === "locked";

            return (
              <g
                key={level.roomId}
                className={
                  isUnlocked ? styles.nodeUnlocked :
                  isComplete  ? styles.nodeComplete  :
                  styles.nodeLocked
                }
                onClick={() => isUnlocked && onStart(level.roomId)}
                style={{ cursor: isUnlocked ? "pointer" : "default" }}
              >
                {/* Drop shadow */}
                <circle
                  cx={pos.cx + 3} cy={pos.cy + 5}
                  r="42"
                  fill="rgba(0,0,0,0.5)"
                />

                {/* Outer glow ring (unlocked / complete) */}
                {(isUnlocked || isComplete) && (
                  <circle
                    cx={pos.cx} cy={pos.cy}
                    r="46"
                    fill="none"
                    stroke={level.color}
                    strokeWidth={isUnlocked ? "3" : "2"}
                    opacity={isUnlocked ? "0.55" : "0.3"}
                  />
                )}

                {/* Pulse ring for current level */}
                {isUnlocked && (
                  <circle
                    cx={pos.cx} cy={pos.cy}
                    r="50"
                    fill="none"
                    stroke={level.color}
                    strokeWidth="2.5"
                    opacity="0"
                    className={styles.pulseRing}
                  />
                )}

                {/* Main circle - black border (Mario style) */}
                <circle
                  cx={pos.cx} cy={pos.cy}
                  r="41"
                  fill={isLocked ? "#111120" : "#000"}
                  stroke={isLocked ? "#222235" : "#000"}
                  strokeWidth="4"
                />

                {/* Colored fill */}
                <circle
                  cx={pos.cx} cy={pos.cy}
                  r="37"
                  fill={
                    isLocked   ? "#1a1a2e" :
                    isComplete ? level.color :
                    `radial-gradient(circle at 38% 32%, ${level.color}cc, ${level.dark})`
                  }
                  stroke={isLocked ? "#2a2a42" : level.color}
                  strokeWidth={isUnlocked ? "3" : "2"}
                />

                {/* Shine highlight */}
                {!isLocked && (
                  <ellipse
                    cx={pos.cx - 10} cy={pos.cy - 12}
                    rx="12" ry="7"
                    fill="rgba(255,255,255,0.18)"
                    style={{ pointerEvents: "none" }}
                  />
                )}

                {/* Icon / lock */}
                <text
                  x={pos.cx} y={pos.cy + 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={isLocked ? "22" : "26"}
                  opacity={isLocked ? "0.25" : "1"}
                >
                  {isLocked ? "🔒" : level.icon}
                </text>

                {/* Level number badge - Mario style */}
                <circle
                  cx={pos.cx + 28} cy={pos.cy - 30}
                  r="14"
                  fill={isLocked ? "#1a1a2e" : "#000"}
                  stroke={isLocked ? "#333" : level.color}
                  strokeWidth="2"
                />
                <text
                  x={pos.cx + 28} y={pos.cy - 30}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="11"
                  fontWeight="900"
                  fill={isLocked ? "#444" : level.color}
                  fontFamily="'Oswald', 'Barlow Condensed', sans-serif"
                >
                  {level.num}
                </text>

                {/* Gold star above completed node */}
                {isComplete && (
                  <text
                    x={pos.cx} y={pos.cy - 60}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="20"
                    className={styles.completeStar}
                    style={{ animationDelay: `${idx * 0.15}s` }}
                  >
                    ⭐
                  </text>
                )}

                {/* Bouncing indicator above unlocked node */}
                {isUnlocked && (
                  <text
                    x={pos.cx} y={pos.cy - 66}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="22"
                    className={styles.marioIndicator}
                  >
                    👆
                  </text>
                )}

                {/* Label */}
                <text
                  x={pos.cx} y={pos.cy + 58}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="12"
                  fontWeight="700"
                  fontFamily="'Oswald', 'Barlow Condensed', sans-serif"
                  fill={isLocked ? "#333345" : "#fff"}
                  letterSpacing="2"
                >
                  {level.title.toUpperCase()}
                </text>
                <text
                  x={pos.cx} y={pos.cy + 74}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="8"
                  fontFamily="'Courier Prime', monospace"
                  fill={isLocked ? "#222232" : level.color}
                  opacity="0.75"
                  letterSpacing="1"
                >
                  {level.world}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* CTA */}
      {!allDone && firstUnlockedIdx !== -1 && (() => {
        const level = LEVELS[firstUnlockedIdx];
        return (
          <div className={styles.ctaWrap}>
            <button
              className={styles.ctaBtn}
              style={{ "--level-color": level.color, "--level-glow": level.glow }}
              onClick={() => onStart(level.roomId)}
            >
              <span className={styles.ctaIcon}>{level.icon}</span>
              <span className={styles.ctaText}>
                <span className={styles.ctaLevel}>LEVEL {level.num}</span>
                <span className={styles.ctaTitle}>{level.title}</span>
              </span>
              <span className={styles.ctaArrow}>▶</span>
            </button>
          </div>
        );
      })()}

      {allDone && (
        <div className={styles.allDoneWrap}>
          <p className={styles.allDoneText}>🏆 ALL LEVELS CLEARED - ESCAPE COMPLETE! 🏆</p>
        </div>
      )}
    </div>
  );
}
