import styles from "./MagicAtmosphere.module.css";

// Pre-defined particles: [left%, duration(s), delay(s), size(px), char, opacity]
const PARTICLES = [
  ["2%",  "8s",  "0s",   10, "✦", 0.45],
  ["7%",  "6s",  "1.4s", 7,  "★", 0.35],
  ["13%", "9s",  "0.5s", 12, "✧", 0.4 ],
  ["18%", "7s",  "3.1s", 8,  "✦", 0.5 ],
  ["24%", "11s", "0.8s", 6,  "✶", 0.3 ],
  ["29%", "6s",  "2.2s", 14, "★", 0.4 ],
  ["34%", "8s",  "4.5s", 9,  "✦", 0.55],
  ["39%", "10s", "1.1s", 7,  "✧", 0.3 ],
  ["45%", "7s",  "0.3s", 11, "✦", 0.45],
  ["50%", "9s",  "2.8s", 8,  "★", 0.35],
  ["56%", "6s",  "1.6s", 13, "✦", 0.5 ],
  ["61%", "11s", "3.9s", 7,  "✶", 0.3 ],
  ["67%", "8s",  "0.7s", 10, "★", 0.4 ],
  ["72%", "7s",  "2.4s", 8,  "✦", 0.5 ],
  ["78%", "9s",  "5.1s", 12, "✧", 0.35],
  ["83%", "6s",  "1.3s", 7,  "✦", 0.45],
  ["89%", "10s", "3.7s", 9,  "★", 0.3 ],
  ["94%", "8s",  "0.9s", 11, "✦", 0.55],
  ["4%",  "13s", "6.2s", 6,  "✶", 0.25],
  ["10%", "7s",  "4.8s", 8,  "✦", 0.4 ],
  ["16%", "9s",  "7.3s", 10, "★", 0.35],
  ["22%", "6s",  "2.6s", 7,  "✧", 0.45],
  ["28%", "11s", "5.5s", 13, "✦", 0.3 ],
  ["33%", "8s",  "1.8s", 8,  "✶", 0.5 ],
  ["41%", "7s",  "8.1s", 11, "★", 0.35],
  ["47%", "9s",  "3.4s", 7,  "✦", 0.45],
  ["53%", "6s",  "6.7s", 9,  "✧", 0.4 ],
  ["59%", "12s", "2.1s", 14, "✦", 0.3 ],
  ["65%", "7s",  "4.2s", 8,  "★", 0.5 ],
  ["71%", "9s",  "7.8s", 10, "✦", 0.4 ],
  ["76%", "6s",  "3.3s", 7,  "✶", 0.35],
  ["82%", "11s", "1.5s", 12, "✦", 0.45],
  ["87%", "8s",  "5.9s", 8,  "★", 0.3 ],
  ["92%", "7s",  "2.7s", 9,  "✧", 0.5 ],
  ["97%", "9s",  "6.4s", 7,  "✦", 0.4 ],
  ["20%", "14s", "9.2s", 6,  "✵", 0.25],
  ["43%", "12s", "8.5s", 7,  "✵", 0.2 ],
  ["68%", "13s", "7.1s", 6,  "✵", 0.25],
  ["85%", "11s", "9.8s", 7,  "✵", 0.2 ],
  ["36%", "10s", "7.6s", 5,  "✦", 0.3 ],
];

export default function MagicAtmosphere() {
  return (
    <div className={styles.atmosphere} aria-hidden="true">

      {/* ── Stone wall texture layer ─────────────────────── */}
      <div className={styles.stoneWall} />

      {/* ── Ambient glow orbs ───────────────────────────── */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />

      {/* ── Main dragon (right, large) ───────────── */}
      <div className={styles.dragonMain}>🐉</div>

      {/* ── Fire breath from main dragon ─────────── */}
      <div className={styles.fireBreath}>
        <div className={styles.fireBreathCore} />
        <div className={styles.fireBreathGlow} />
      </div>

      {/* ── Second dragon (left, mirrored) ───────── */}
      <div className={styles.dragonSecondary}>🐲</div>

      {/* ── Flying dragon across the top ─────────── */}
      <div className={styles.dragonFly}>🐲</div>

      {/* ── Castle silhouette at bottom ──────────── */}
      <div className={styles.castle} aria-hidden="true">
        <div className={styles.castleBody} />
        <div className={styles.castleTowerL} />
        <div className={styles.castleTowerR} />
        <div className={styles.castleTowerC} />
        <div className={styles.castleMerlon1} />
        <div className={styles.castleMerlon2} />
        <div className={styles.castleMerlon3} />
        <div className={styles.castleGate} />
        <div className={styles.castleMountainL} />
        <div className={styles.castleMountainR} />
      </div>

      {/* ── Rune circle decorations ─────────────────────── */}
      <div className={styles.runeCircle1}>
        <svg viewBox="0 0 200 200" className={styles.runeSvg}>
          <circle cx="100" cy="100" r="90" fill="none" stroke="#d4a017" strokeWidth="1.2" strokeDasharray="8 6" />
          <circle cx="100" cy="100" r="72" fill="none" stroke="#d4a017" strokeWidth="0.6" strokeDasharray="4 8" />
          <circle cx="100" cy="100" r="54" fill="none" stroke="rgba(212,160,23,0.3)" strokeWidth="0.5" />
          {["✦","ᚠ","ᚢ","ᚦ","ᚨ","ᚱ","ᚲ","ᚷ"].map((r, i) => {
            const a = (i / 8) * Math.PI * 2;
            return (
              <text key={i}
                x={100 + 82 * Math.cos(a)} y={100 + 82 * Math.sin(a)}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="14" fill="#d4a017" opacity="0.9">
                {r}
              </text>
            );
          })}
        </svg>
      </div>

      <div className={styles.runeCircle2}>
        <svg viewBox="0 0 140 140" className={styles.runeSvg}>
          <circle cx="70" cy="70" r="62" fill="none" stroke="#8b6914" strokeWidth="0.9" strokeDasharray="6 5" />
          <circle cx="70" cy="70" r="46" fill="none" stroke="rgba(139,105,20,0.35)" strokeWidth="0.5" strokeDasharray="3 7" />
          {["ᚦ","✧","ᚱ","★","ᚲ","✦","ᚷ","✧"].map((r, i) => {
            const a = (i / 8) * Math.PI * 2;
            return (
              <text key={i}
                x={70 + 56 * Math.cos(a)} y={70 + 56 * Math.sin(a)}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="12" fill="#8b6914" opacity="0.85">
                {r}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Third rune circle, center-bottom */}
      <div className={styles.runeCircle3}>
        <svg viewBox="0 0 260 260" className={styles.runeSvg}>
          <circle cx="130" cy="130" r="118" fill="none" stroke="rgba(212,160,23,0.2)" strokeWidth="1" strokeDasharray="12 8" />
          <circle cx="130" cy="130" r="98"  fill="none" stroke="rgba(139,105,20,0.15)" strokeWidth="0.6" strokeDasharray="5 10" />
          {["ᚠ","ᚢ","ᚦ","ᚨ","ᚱ","ᚲ","ᚷ","ᚹ","ᚺ","ᚾ","ᛁ","ᛃ"].map((r, i) => {
            const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
            return (
              <text key={i}
                x={130 + 110 * Math.cos(a)} y={130 + 110 * Math.sin(a)}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="13" fill="#8b6914" opacity="0.6">
                {r}
              </text>
            );
          })}
        </svg>
      </div>

      {/* ── Left torch ──────────────────────────────────── */}
      <div className={styles.torchLeft}>
        <div className={styles.torchGlow} />
        <div className={styles.flame}>
          <div className={styles.flameInner} />
        </div>
        <div className={styles.torchBody}>
          <div className={styles.torchBand} />
        </div>
        <div className={styles.torchHandle} />
      </div>

      {/* ── Right torch ─────────────────────────────────── */}
      <div className={styles.torchRight}>
        <div className={styles.torchGlow} />
        <div className={styles.flame}>
          <div className={styles.flameInner} />
        </div>
        <div className={styles.torchBody}>
          <div className={styles.torchBand} />
        </div>
        <div className={styles.torchHandle} />
      </div>

      {/* ── Floating sparkle particles ───────────────────── */}
      {PARTICLES.map(([left, dur, delay, size, char, opacity], i) => (
        <span
          key={i}
          className={styles.particle}
          style={{
            left,
            fontSize: size,
            animationDuration: dur,
            animationDelay: delay,
            "--start-opacity": opacity,
          }}
        >
          {char}
        </span>
      ))}

      {/* ── Bottom vignette ─────────────────────────────── */}
      <div className={styles.vignette} />
    </div>
  );
}
