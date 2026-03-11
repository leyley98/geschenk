import styles from "./StadiumMap.module.css";

// ── Era seating sections ──────────────────────────────────────────────────────
// Center: (450, 310), outer rx=310 ry=195, inner rx=205 ry=125
// Stage at TOP: gap 240°–300° (centered at 270° = top of SVG)

const ERA_SECTIONS = [
  { startDeg: 300, endDeg: 343, fill: "#0369a1", label: "1989",      emoji: "📷", midDeg: 321 },
  { startDeg: 343, endDeg: 26,  fill: "#6d28d9", label: "SPEAK NOW", emoji: "🔮", midDeg: 4   },
  { startDeg: 26,  endDeg: 69,  fill: "#991b1b", label: "RED",       emoji: "🍂", midDeg: 47  },
  { startDeg: 69,  endDeg: 112, fill: "#1d4ed8", label: "MIDNIGHTS", emoji: "🌙", midDeg: 90  },
  { startDeg: 112, endDeg: 155, fill: "#92400e", label: "FEARLESS",  emoji: "⭐", midDeg: 133 },
  { startDeg: 155, endDeg: 198, fill: "#1f2937", label: "REP",       emoji: "🐍", midDeg: 176 },
  { startDeg: 198, endDeg: 240, fill: "#292524", label: "FOLKLORE",  emoji: "🌲", midDeg: 219 },
];

function donutSector(cx, cy, oRx, oRy, iRx, iRy, startDeg, endDeg) {
  const rad = (d) => (d * Math.PI) / 180;
  const s = rad(startDeg), e = rad(endDeg);
  const ox1 = cx + oRx * Math.cos(s), oy1 = cy + oRy * Math.sin(s);
  const ox2 = cx + oRx * Math.cos(e), oy2 = cy + oRy * Math.sin(e);
  const ix1 = cx + iRx * Math.cos(s), iy1 = cy + iRy * Math.sin(s);
  const ix2 = cx + iRx * Math.cos(e), iy2 = cy + iRy * Math.sin(e);
  const f = (n) => n.toFixed(1);
  return [
    `M ${f(ox1)} ${f(oy1)}`,
    `A ${oRx} ${oRy} 0 0 1 ${f(ox2)} ${f(oy2)}`,
    `L ${f(ix2)} ${f(iy2)}`,
    `A ${iRx} ${iRy} 0 0 0 ${f(ix1)} ${f(iy1)}`,
    "Z",
  ].join(" ");
}

const MID_RX = 257, MID_RY = 160;
function labelPos(midDeg) {
  const rad = (midDeg * Math.PI) / 180;
  return { x: 450 + MID_RX * Math.cos(rad), y: 310 + MID_RY * Math.sin(rad) };
}

export default function StadiumMap({ hotspots, visitedHotspots, onHotspotClick }) {
  return (
    <div className={styles.mapWrapper}>
      <svg
        viewBox="0 0 900 580"
        width="100%"
        className={styles.svg}
        aria-label="Interaktive Karte des Olympiastadions München"
      >
        <defs>
          {/* Cool blue spotlight from stage at top */}
          <radialGradient id="stageSpot" cx="50%" cy="0%" r="70%" fx="50%" fy="0%">
            <stop offset="0%"   stopColor="#bfdbfe" stopOpacity="0.28" />
            <stop offset="60%"  stopColor="#93c5fd" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#93c5fd" stopOpacity="0"    />
          </radialGradient>
          {/* Floor light pool */}
          <radialGradient id="floorGlow" cx="50%" cy="40%" r="60%">
            <stop offset="0%"   stopColor="#dbeafe" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#dbeafe" stopOpacity="0"    />
          </radialGradient>
          {/* Outer stadium halo */}
          <radialGradient id="stadiumHalo" cx="50%" cy="50%" r="50%">
            <stop offset="60%"  stopColor="transparent" />
            <stop offset="100%" stopColor="#1e40af" stopOpacity="0.12" />
          </radialGradient>
          {/* Stage cyan glow filter */}
          <filter id="cyanGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          {/* Soft glow for hotspots */}
          <filter id="hotGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          {/* Floor clip */}
          <clipPath id="floorClip">
            <ellipse cx="450" cy="295" rx="198" ry="115" />
          </clipPath>
          {/* Subtle inner shadow on seating */}
          <filter id="sectionDepth" x="0%" y="0%" width="100%" height="100%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* ── Background ───────────────────────────────────────────────── */}
        <rect width="900" height="580" fill="#060f1e" />

        {/* Subtle blueprint grid */}
        {Array.from({ length: 18 }, (_, i) => (
          <line key={`v${i}`} x1={50 * i} y1="0" x2={50 * i} y2="580"
            stroke="#1e3a5a" strokeWidth="0.3" opacity="0.25" />
        ))}
        {Array.from({ length: 12 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={50 * i} x2="900" y2={50 * i}
            stroke="#1e3a5a" strokeWidth="0.3" opacity="0.25" />
        ))}

        {/* Stage spotlight wash from top */}
        <rect width="900" height="580" fill="url(#stageSpot)" />

        {/* ── Outer stadium boundary + halo ───────────────────────────── */}
        <ellipse cx="450" cy="310" rx="395" ry="244"
          fill="none" stroke="#1e40af" strokeWidth="6" opacity="0.15"
          filter="url(#cyanGlow)" />
        <ellipse cx="450" cy="310" rx="390" ry="240"
          fill="#0d1f35" stroke="#1e4a8a" strokeWidth="1.5" />
        <ellipse cx="450" cy="310" rx="390" ry="240"
          fill="url(#stadiumHalo)" />

        {/* ── Era seating sections ─────────────────────────────────────── */}
        {ERA_SECTIONS.map((sec) => (
          <path
            key={sec.label}
            d={donutSector(450, 310, 310, 195, 205, 125, sec.startDeg, sec.endDeg)}
            fill={sec.fill}
            opacity="0.82"
          />
        ))}

        {/* ── Seating tier outlines ─────────────────────────────────────── */}
        {/* Outer edge */}
        <ellipse cx="450" cy="310" rx="310" ry="195"
          fill="none" stroke="#2563a0" strokeWidth="1.5" opacity="0.6" />
        {/* Mid tier (between sections) */}
        <ellipse cx="450" cy="310" rx="257" ry="160"
          fill="none" stroke="#1d4278" strokeWidth="0.8"
          strokeDasharray="6 4" opacity="0.5" />
        {/* Inner edge */}
        <ellipse cx="450" cy="310" rx="205" ry="125"
          fill="none" stroke="#1a3a6a" strokeWidth="1.2" opacity="0.6" />

        {/* Radial dividers between sections */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 300, 330].map((deg) => {
          const r = (deg * Math.PI) / 180;
          return (
            <line key={deg}
              x1={450 + 205 * Math.cos(r)} y1={310 + 125 * Math.sin(r)}
              x2={450 + 310 * Math.cos(r)} y2={310 + 195 * Math.sin(r)}
              stroke="#1e4a8a" strokeWidth="0.5" opacity="0.35"
            />
          );
        })}

        {/* ── Era section labels ────────────────────────────────────────── */}
        {ERA_SECTIONS.map((sec) => {
          const pos = labelPos(sec.midDeg);
          const spanDeg = ((sec.endDeg - sec.startDeg) + 360) % 360;
          const isSmall = spanDeg < 50;
          return (
            <g key={`lbl-${sec.label}`} style={{ pointerEvents: "none" }}>
              <text x={pos.x} y={pos.y - (isSmall ? 4 : 8)}
                textAnchor="middle" fontSize={isSmall ? "9" : "8"}
                fill="#e0f2fe" fontFamily="'Barlow Condensed', sans-serif"
                letterSpacing="1" opacity="0.65">
                {isSmall ? sec.emoji : sec.label}
              </text>
              {!isSmall && (
                <text x={pos.x} y={pos.y + 7}
                  textAnchor="middle" fontSize="12" opacity="0.5">
                  {sec.emoji}
                </text>
              )}
            </g>
          );
        })}

        {/* ── Floor / GA area (sandy – beach vibes = 1989) ─────────────── */}
        <ellipse cx="450" cy="295" rx="198" ry="115" fill="#c9a87e" opacity="0.9" />
        <ellipse cx="450" cy="295" rx="198" ry="115" fill="url(#floorGlow)" />

        {/* Subtle polaroid-style concentric rings on floor */}
        {[60, 100, 145, 188].map((rx, i) => (
          <ellipse key={i} cx="450" cy="295"
            rx={rx} ry={Math.round(rx * 0.58)}
            fill="none" stroke="#a88860" strokeWidth="0.6" opacity={0.18 - i * 0.03} />
        ))}

        {/* Yellow GA standing areas (either side of catwalk) */}
        <rect x="262" y="180" width="177" height="68" rx="3"
          fill="#fbbf24" opacity="0.78" clipPath="url(#floorClip)" />
        <rect x="461" y="180" width="177" height="68" rx="3"
          fill="#fbbf24" opacity="0.78" clipPath="url(#floorClip)" />

        {/* Floor label */}
        <text x="450" y="338" textAnchor="middle"
          fill="#5c3a14" fontSize="7.5" letterSpacing="1.5"
          fontFamily="'Barlow Condensed', sans-serif" opacity="0.65"
          style={{ pointerEvents: "none" }}>
          INNENRAUM · STEHPLATZ
        </text>

        {/* ── Catwalk - cyan blue theme ─────────────────────────────────── */}
        {/* Catwalk glow */}
        <rect x="326" y="111" width="248" height="26"
          fill="#38bdf8" opacity="0.06" filter="url(#cyanGlow)" />
        {/* T crossbar */}
        <rect x="330" y="115" width="240" height="17" rx="3"
          fill="#0a1828" stroke="#7dd3fc" strokeWidth="1.2" opacity="0.95" />
        {/* Main vertical arm */}
        <rect x="441" y="115" width="18" height="133" rx="2"
          fill="#0a1828" stroke="#7dd3fc" strokeWidth="1.2" opacity="0.95" />
        {/* Diamond */}
        <polygon points="450,237 465,252 450,267 435,252"
          fill="#0a1828" stroke="#7dd3fc" strokeWidth="1.2" opacity="0.95" />
        {/* Catwalk glow line */}
        <line x1="450" y1="132" x2="450" y2="237"
          stroke="#7dd3fc" strokeWidth="1" opacity="0.2" />

        {/* ── Stage platform - 1989 concert blue ───────────────────────── */}
        {/* Stage outer glow ring */}
        <ellipse cx="450" cy="87" rx="150" ry="48"
          fill="#38bdf8" opacity="0.06" filter="url(#cyanGlow)" />
        {/* Stage body */}
        <rect x="368" y="58" width="164" height="57" rx="6"
          fill="#0a1828" stroke="#38bdf8" strokeWidth="2"
          filter="url(#cyanGlow)" />
        {/* Inner stage panel lines */}
        <line x1="368" y1="80" x2="532" y2="80"
          stroke="#1e4a8a" strokeWidth="0.5" opacity="0.6" />
        <line x1="368" y1="93" x2="532" y2="93"
          stroke="#1e4a8a" strokeWidth="0.5" opacity="0.4" />

        {/* Stage front lip - bright cyan */}
        <rect x="368" y="106" width="164" height="9" rx="3"
          fill="#38bdf8" opacity="0.9" />
        {/* LED strips - 1989 blues + whites */}
        {[0, 25, 50, 75, 100, 125, 145].map((x, i) => (
          <rect key={i} x={374 + x} y="106" width="18" height="9" rx="2"
            fill={["#7dd3fc","#bfdbfe","#38bdf8","#ffffff","#93c5fd","#dbeafe","#60a5fa"][i]}
            opacity="0.95"
          />
        ))}

        {/* Stage label */}
        <text x="450" y="89" textAnchor="middle"
          fill="#e0f2fe" fontSize="11" fontWeight="700" letterSpacing="3"
          fontFamily="'Barlow Condensed', sans-serif"
          style={{ pointerEvents: "none" }}>
          BÜHNE
        </text>
        <text x="450" y="102" textAnchor="middle"
          fill="#7dd3fc" fontSize="7.5" letterSpacing="1.5"
          fontFamily="'Barlow Condensed', sans-serif" opacity="0.8"
          style={{ pointerEvents: "none" }}>
          ✦ THE ERAS TOUR ✦
        </text>

        {/* Speaker stacks - clean navy/blue */}
        {[[-92, 0], [92, 0]].map(([dx], i) => (
          <g key={i} style={{ pointerEvents: "none" }}>
            <rect x={450 + dx - 10} y={65} width="20" height="42" rx="3"
              fill="#0a1828" stroke="#1e4a8a" strokeWidth="1" />
            {[0, 10, 20, 30].map((oy) => (
              <ellipse key={oy} cx={450 + dx} cy={70 + oy} rx="7" ry="3"
                fill="none" stroke="#2563a0" strokeWidth="0.8" opacity="0.7" />
            ))}
          </g>
        ))}

        {/* ── Small 📷 Polaroid decoration (1989 signature) ─────────────── */}
        {/* Upper right corner near gap - subtle decoration */}
        <g transform="translate(635, 148) rotate(12)" opacity="0.18" style={{ pointerEvents: "none" }}>
          <rect x="0" y="0" width="28" height="32" rx="2"
            fill="#f0e8d8" stroke="#c8b89a" strokeWidth="0.8" />
          <rect x="3" y="3" width="22" height="18" rx="1" fill="#b8d4f0" />
          <rect x="3" y="24" width="22" height="5" rx="1" fill="#f0e8d8" />
        </g>
        <g transform="translate(238, 150) rotate(-15)" opacity="0.15" style={{ pointerEvents: "none" }}>
          <rect x="0" y="0" width="24" height="28" rx="2"
            fill="#f0e8d8" stroke="#c8b89a" strokeWidth="0.8" />
          <rect x="2.5" y="2.5" width="19" height="15" rx="1" fill="#93c5fd" />
          <rect x="2.5" y="21" width="19" height="5" rx="1" fill="#f0e8d8" />
        </g>

        {/* ── Hotspots ──────────────────────────────────────────────────── */}
        {hotspots.map((h) => (
          <HotspotMarker
            key={h.id}
            hotspot={h}
            visited={visitedHotspots.has(h.id)}
            onClick={() => onHotspotClick(h)}
          />
        ))}
      </svg>
    </div>
  );
}

// ── Era accent colors for hotspot rings ────────────────────────────────────
const ERA_RING_COLOR = {
  "The Eras Tour": "#c084fc",
  "Lover":         "#f9a8d4",
  "Fearless":      "#fbbf24",
  "Speak Now":     "#a78bfa",
  "Red":           "#f87171",
  "1989":          "#7dd3fc",
  "reputation":    "#cbd5e1",
  "folklore":      "#a8a29e",
  "evermore":      "#fcd34d",
  "Midnights":     "#818cf8",
};

function HotspotMarker({ hotspot, visited, onClick }) {
  const hasLetter = !!hotspot.slot;
  const eraColor  = ERA_RING_COLOR[hotspot.era] ?? "#7dd3fc";
  const ringColor = hasLetter ? eraColor : "#7dd3fc";

  return (
    <g
      className={styles.hotspot}
      onClick={onClick}
      role="button"
      aria-label={hotspot.label}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      {/* Pulse ring */}
      {hasLetter && !visited && (
        <circle cx={hotspot.cx} cy={hotspot.cy} r="20"
          fill="none" stroke={eraColor} strokeWidth="1.5"
          opacity="0.5" className={styles.pulseRing}
        />
      )}

      {/* Glow disc */}
      <circle cx={hotspot.cx} cy={hotspot.cy} r="16"
        fill={eraColor} opacity={visited ? 0.1 : 0.16}
        className={styles.glowDisc}
      />

      {/* Main circle */}
      <circle cx={hotspot.cx} cy={hotspot.cy} r="12"
        fill={visited ? "#0d1f35" : "#0a1828"}
        stroke={ringColor}
        strokeWidth={hasLetter ? "2" : "1.5"}
        opacity={visited ? 0.85 : 1}
      />

      {/* Letter */}
      {hasLetter && (
        <text x={hotspot.cx} y={hotspot.cy + 1}
          textAnchor="middle" dominantBaseline="middle"
          fontSize="9" fontWeight="bold"
          fill={visited ? eraColor : ringColor}
          fontFamily="'Barlow Condensed', sans-serif">
          {visited ? hotspot.letter : "?"}
        </text>
      )}

      {/* Dot for non-letter */}
      {!hasLetter && (
        <circle cx={hotspot.cx} cy={hotspot.cy} r="3.5"
          fill={visited ? eraColor : "#7dd3fc"} opacity={visited ? 0.7 : 1} />
      )}

      {/* Tooltip */}
      <rect x={hotspot.cx - 56} y={hotspot.cy - 34}
        width="112" height="18" rx="4"
        fill="#060f1e" stroke={eraColor} strokeWidth="1"
        opacity="0.96" className={styles.tooltipBg}
      />
      <text x={hotspot.cx} y={hotspot.cy - 21}
        textAnchor="middle" fontSize="8.5"
        fill={eraColor}
        fontFamily="'Barlow Condensed', sans-serif"
        letterSpacing="0.8" className={styles.tooltipText}>
        {hotspot.label}
      </text>
    </g>
  );
}
