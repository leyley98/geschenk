import { useState, useRef, useCallback } from "react";
import styles from "./BedroomScene.module.css";

// ─── Fairy Lights ────────────────────────────────────────────────────────────
const LIGHT_COLORS = ["#ff69b4", "#e879f9", "#fbbf24", "#c084fc", "#fb7185"];
const FAIRY_LIGHTS = Array.from({ length: 22 }, (_, i) => ({
  x: 1 + i * 4.5,
  delay: ((i * 0.21) % 1.9).toFixed(2),
  color: LIGHT_COLORS[i % LIGHT_COLORS.length],
}));

function FairyLights({ dx }) {
  return (
    <div
      className={styles.fairyRow}
      style={{ transform: `translateX(${dx * 0.6}px)` }}
      aria-hidden="true"
    >
      {/* Sagging wire SVG */}
      <svg className={styles.fairyWire} viewBox="0 0 220 12" preserveAspectRatio="none">
        <path
          d="M0,4 C20,1 40,9 55,5 C70,1 90,9 110,5 C130,1 150,9 165,5 C180,1 200,9 220,5"
          stroke="rgba(255,180,220,0.25)"
          strokeWidth="0.7"
          fill="none"
        />
      </svg>
      {FAIRY_LIGHTS.map((l, i) => (
        <div
          key={i}
          className={styles.fairyLight}
          style={{
            left: `${l.x}%`,
            animationDelay: `${l.delay}s`,
            "--glow": l.color,
          }}
        />
      ))}
    </div>
  );
}

// ─── CSS Disco Ball ───────────────────────────────────────────────────────────
function DiscoBall({ dx, dy, onClick, isVisited }) {
  return (
    <div
      className={styles.discoBallWrap}
      style={{ transform: `translate(calc(-50% + ${dx * 0.25}px), ${dy * 0.2}px)` }}
      aria-hidden="true"
    >
      <div className={styles.discoBallString} />
      <button
        className={`${styles.discoBallSphere} ${isVisited ? styles.discoBallVisited : ""}`}
        onClick={onClick}
        title="Disco-Kugel"
      >
        {/* Facet grid overlay (SVG) */}
        <svg className={styles.discoBallFacets} viewBox="0 0 70 70">
          {/* Horizontal facet lines */}
          {[10, 20, 30, 40, 50, 60].map((y) => (
            <line key={`h${y}`} x1="0" y1={y} x2="70" y2={y}
              stroke="rgba(0,0,0,0.18)" strokeWidth="0.7" />
          ))}
          {/* Vertical facet lines */}
          {[10, 20, 30, 40, 50, 60].map((x) => (
            <line key={`v${x}`} x1={x} y1="0" x2={x} y2="70"
              stroke="rgba(0,0,0,0.18)" strokeWidth="0.7" />
          ))}
        </svg>
      </button>
      {/* Scattered disco lights on walls */}
      <div className={styles.discoLights} aria-hidden="true">
        {[
          { x: -180, y: -20, d: "0s",   color: "#ff69b4" },
          { x:  160, y: -30, d: "0.6s", color: "#e879f9" },
          { x: -120, y:  40, d: "1.1s", color: "#fbbf24" },
          { x:  100, y:  60, d: "0.3s", color: "#c084fc" },
          { x:  -60, y: -60, d: "1.5s", color: "#fb7185" },
          { x:   80, y: -70, d: "0.9s", color: "#e879f9" },
          { x: -200, y:  80, d: "1.8s", color: "#fbbf24" },
          { x:  200, y:  90, d: "0.5s", color: "#ff69b4" },
        ].map((light, i) => (
          <div
            key={i}
            className={styles.discoLight}
            style={{
              left: light.x,
              top: light.y,
              "--lc": light.color,
              animationDelay: light.d,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Perspective Floor Grid ───────────────────────────────────────────────────
function PerspGrid() {
  const vx = 50; // vanishing point x%
  const vy = 0;  // vanishing point y (top of floor div)
  const hLines = [8, 20, 35, 53, 73, 95]; // y positions (%) - wider apart at bottom
  const vLines = [0, 12, 25, 38, 50, 62, 75, 88, 100]; // x at bottom edge

  return (
    <svg className={styles.perspGrid} viewBox="0 0 100 100" preserveAspectRatio="none">
      {hLines.map((y, i) => (
        <line key={`h${i}`} x1="0" y1={y} x2="100" y2={y}
          stroke="rgba(180,0,255,0.065)" strokeWidth="0.3" />
      ))}
      {vLines.map((bx, i) => (
        <line key={`v${i}`} x1={vx} y1={vy} x2={bx} y2="100"
          stroke="rgba(180,0,255,0.05)" strokeWidth="0.3" />
      ))}
    </svg>
  );
}

// ─── Individual Hotspot Item ──────────────────────────────────────────────────
function HotspotItem({ challenge, letter, isVisited, onClick, dx, dy }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  function onMM(e) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
    setTilt({ x: ny * -16, y: nx * 16 });
  }

  const isSolved  = challenge.type === "quiz" && !!letter;
  const isCard    = challenge.type === "card";
  const showCheck = isCard && isVisited;

  // Combine parallax (wrapper) + tilt (button) cleanly
  const wrapStyle = {
    position: "absolute",
    left: challenge.sceneX,
    top:  challenge.sceneY,
    zIndex: challenge.zIndex ?? 10,
    transform: `translate(
      calc(-50% + ${dx * challenge.zMult}px),
      calc(-50% + ${dy * challenge.zMult * 0.55}px)
    )`,
    pointerEvents: "none",
  };

  const btnStyle = {
    transform: `perspective(380px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
    transition: "transform 0.12s ease-out, box-shadow 0.2s, border-color 0.2s, opacity 0.3s",
    pointerEvents: "auto",
  };

  return (
    <div style={wrapStyle}>
      <button
        ref={ref}
        className={[
          styles.hotspot,
          styles[`zone_${challenge.zone}`],
          isSolved   ? styles.hotspotSolved   : "",
          showCheck  ? styles.hotspotVisited  : "",
        ].join(" ")}
        style={btnStyle}
        onMouseMove={onMM}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        onClick={isSolved ? undefined : onClick}
        disabled={isSolved}
        title={challenge.title}
      >
        <span className={styles.hotspotEmoji}>{challenge.emoji}</span>
        <span className={styles.hotspotLabel}>{challenge.title}</span>
        {isSolved   && <span className={styles.hotspotLetter}>{letter}</span>}
        {showCheck  && <span className={styles.hotspotCheck}>✓</span>}
        {/* Glass shine overlay */}
        <span className={styles.hotspotShine} aria-hidden="true" />
      </button>
    </div>
  );
}

// ─── Bedroom Scene (main export) ─────────────────────────────────────────────
export default function BedroomScene({
  challenges,
  collectedLetters,
  visitedBonusTiles,
  onHotspotClick,
}) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const sceneRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const r = sceneRef.current?.getBoundingClientRect();
    if (!r) return;
    setMouse({
      x: ((e.clientX - r.left) / r.width  - 0.5) * 2,
      y: ((e.clientY - r.top)  / r.height - 0.5) * 2,
    });
  }, []);

  const handleMouseLeave = useCallback(() => setMouse({ x: 0, y: 0 }), []);

  // Base parallax offsets (pixels) – all layers use multiples of these
  const px = mouse.x * 14;
  const py = mouse.y * 9;

  // Find the disco ball challenge
  const discoBallChallenge = challenges.find((c) => c.id === "discokugel");
  const nonDiscoChallenges  = challenges.filter((c) => c.id !== "discokugel");

  return (
    <div
      ref={sceneRef}
      className={styles.scene}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Painted room layers ─────────────────────────────────────────── */}

      {/* Sky-ceiling backdrop */}
      <div className={styles.skyBg} />

      {/* Back wall */}
      <div
        className={styles.backWall}
        style={{ transform: `translate(${-px * 0.45}px, ${-py * 0.35}px)` }}
      />

      {/* Wall neon accent (horizontal gradient band mid-wall) */}
      <div
        className={styles.wallNeonBand}
        style={{ transform: `translateX(${-px * 0.5}px)` }}
      />

      {/* Left wall shadow */}
      <div
        className={styles.leftWall}
        style={{ transform: `translateX(${-px * 0.3}px)` }}
      />

      {/* Right wall shadow */}
      <div
        className={styles.rightWall}
        style={{ transform: `translateX(${px * 0.3}px)` }}
      />

      {/* Floor */}
      <div
        className={styles.floor}
        style={{ transform: `translate(${-px * 0.8}px, ${py * 0.3}px)` }}
      >
        <PerspGrid />
      </div>

      {/* Baseboard / wall-floor junction line */}
      <div
        className={styles.baseboard}
        style={{ transform: `translateX(${-px * 0.65}px)` }}
      />

      {/* Ceiling corner shadows */}
      <div className={styles.ceilingVignette} />

      {/* ── Fairy lights ─────────────────────────────────────────────── */}
      <FairyLights dx={-px} />

      {/* ── CSS Disco Ball ───────────────────────────────────────────── */}
      {discoBallChallenge && (
        <DiscoBall
          dx={-px}
          dy={-py}
          isVisited={visitedBonusTiles.has("discokugel")}
          onClick={() => onHotspotClick(discoBallChallenge)}
        />
      )}

      {/* ── Hotspot items ────────────────────────────────────────────── */}
      {nonDiscoChallenges.map((ch) => (
        <HotspotItem
          key={ch.id}
          challenge={ch}
          letter={collectedLetters[ch.slot]}
          isVisited={visitedBonusTiles.has(ch.id)}
          onClick={() => onHotspotClick(ch)}
          dx={-px}
          dy={-py}
        />
      ))}
    </div>
  );
}
