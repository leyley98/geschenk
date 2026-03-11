import { useState, useRef, useMemo } from "react";
import styles from "./EndScreen.module.css";

const SECRET_CODE = "EWANMITCHELL";
const CODE_LENGTH = SECRET_CODE.length;

// Deterministic confetti pieces
const CONFETTI = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  left: ((i * 137.508) % 100).toFixed(2),
  dur: (3 + (i % 5) * 0.7).toFixed(1),
  delay: ((i % 17) * 0.3).toFixed(1),
  color: ["#ffd700","#ff6b9d","#a855f7","#00d68f","#4a90cc","#ff8c42","#fff"][i % 7],
  size: 6 + (i % 4) * 3,
  shape: i % 3 === 0 ? "circle" : i % 3 === 1 ? "rect" : "star",
}));

// Deterministic stars
const STARS = Array.from({ length: 140 }, (_, i) => ({
  id: i,
  x: ((i * 137.508) % 100).toFixed(2),
  y: ((i * 97.311) % 100).toFixed(2),
  r: (0.6 + (i % 5) * 0.28).toFixed(2),
  opacity: (0.2 + (i % 7) * 0.08).toFixed(2),
  delay: ((i % 13) * 0.4).toFixed(1),
}));

export default function EndScreen() {
  const [code, setCode] = useState(Array(CODE_LENGTH).fill(""));
  const [status, setStatus] = useState("idle"); // idle | wrong | unlocked
  const [revealed, setRevealed] = useState(false);
  const inputRefs = useRef([]);

  function handleKey(i, e) {
    const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (!val) {
      // Backspace - clear and move back
      const next = [...code];
      next[i] = "";
      setCode(next);
      setStatus("idle");
      if (i > 0) inputRefs.current[i - 1]?.focus();
      return;
    }
    const next = [...code];
    next[i] = val[val.length - 1];
    setCode(next);
    setStatus("idle");
    if (i < CODE_LENGTH - 1) inputRefs.current[i + 1]?.focus();
  }

  function handleKeyDown(i, e) {
    if (e.key === "Backspace" && !code[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
    if (e.key === "Enter") handleSubmit();
  }

  function handlePaste(e) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, CODE_LENGTH);
    const next = Array(CODE_LENGTH).fill("");
    pasted.split("").forEach((ch, i) => { next[i] = ch; });
    setCode(next);
    setStatus("idle");
    inputRefs.current[Math.min(pasted.length, CODE_LENGTH - 1)]?.focus();
  }

  function handleSubmit() {
    if (code.join("") === SECRET_CODE) {
      setStatus("unlocked");
      setTimeout(() => setRevealed(true), 800);
    } else {
      setStatus("wrong");
      setTimeout(() => setStatus("idle"), 900);
    }
  }

  const allFilled = code.every(c => c !== "");

  return (
    <div className={styles.page}>

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

      {/* Confetti */}
      <div className={styles.confettiWrap} aria-hidden="true">
        {CONFETTI.map(c => (
          <div key={c.id} className={`${styles.confetto} ${styles[c.shape]}`} style={{
            left: `${c.left}%`,
            width: `${c.size}px`,
            height: c.shape === "rect" ? `${c.size * 1.6}px` : `${c.size}px`,
            background: c.color,
            animationDuration: `${c.dur}s`,
            animationDelay: `${c.delay}s`,
          }} />
        ))}
      </div>

      {/* Ambient glows */}
      <div className={styles.glow1} aria-hidden="true" />
      <div className={styles.glow2} aria-hidden="true" />

      <div className={styles.content}>

        {/* Trophy */}
        <div className={styles.trophyWrap}>
          <div className={styles.trophyGlow} aria-hidden="true" />
          <span className={styles.trophy}>🏆</span>
        </div>

        {/* Headline */}
        <div className={styles.headlineWrap}>
          <span className={styles.rune}>✦</span>
          <h1 className={styles.headline}>DU BIST ENTKOMMEN</h1>
          <span className={styles.rune}>✦</span>
        </div>

        <p className={styles.sub}>
          Alle fünf Räume. Alle Rätsel gelöst. Alle Geheimnisse gelüftet.
        </p>

        {/* Room badges */}
        <div className={styles.badges}>
          {[
            { icon: "🏎️", label: "Pit Wall" },
            { icon: "✨", label: "1989" },
            { icon: "🔍", label: "Eibenbach" },
            { icon: "🐉", label: "Valdrath" },
            { icon: "⭐", label: "Pop Room" },
          ].map((b, i) => (
            <div key={i} className={styles.badge} style={{ animationDelay: `${i * 0.12}s` }}>
              <span className={styles.badgeIcon}>{b.icon}</span>
              <span className={styles.badgeLabel}>{b.label}</span>
            </div>
          ))}
        </div>
        <div>
          <p className={styles.sub}>
          Mausi 2, auch hier nochmal. Alles alles gute nachträglich zum Start deiner neuen Era. Ich bin mir sicher, dass sie toll wird und ganz viele spannende und schöne Erlebnisse mit sich bringen wird. I lovvveeee uuuuu </p></div>

        {/* Divider */}
        <div className={styles.divider}>
          <div className={styles.dividerLine} />
          <span className={styles.dividerText}>✦ ein letztes geheimnis ✦</span>
          <div className={styles.dividerLine} />
        </div>

        {/* Secret section */}
        {!revealed ? (
          <div className={styles.secretSection}>
            <div className={styles.lockIconWrap}>
              <span className={`${styles.lockIcon} ${status === "unlocked" ? styles.unlocking : ""}`}>
                {status === "unlocked" ? "🔓" : "🔒"}
              </span>
            </div>

            <p className={styles.secretHint}>
              Irgendwo in diesem Abenteuer liegt ein letzter Schlüssel verborgen.<br />
              <span className={styles.secretHintSub}>12 Zeichen. Du weißt, wo du suchen musst.</span>
            </p>

            {/* Code inputs */}
            <div className={`${styles.codeInputs} ${status === "wrong" ? styles.shake : ""}`}>
              {code.map((ch, i) => (
                <input
                  key={i}
                  ref={el => inputRefs.current[i] = el}
                  className={`${styles.codeBox} ${
                    status === "wrong" ? styles.codeBoxWrong :
                    status === "unlocked" ? styles.codeBoxUnlocked :
                    ch ? styles.codeBoxFilled : ""
                  }`}
                  type="text"
                  value={ch}
                  maxLength={2}
                  onChange={e => handleKey(i, e)}
                  onKeyDown={e => handleKeyDown(i, e)}
                  onPaste={i === 0 ? handlePaste : undefined}
                  autoComplete="off"
                  spellCheck={false}
                />
              ))}
            </div>

            {status === "wrong" && (
              <p className={styles.wrongMsg}>Das ist nicht der Schlüssel. Überleg nochmal genauer...oder...brittischer hehe</p>
            )}

            <button
              className={styles.unlockBtn}
              onClick={handleSubmit}
              disabled={!allFilled || status === "unlocked"}
            >
              {status === "unlocked" ? "✓ Entriegelt..." : "Entsperren"}
            </button>
          </div>
        ) : (
          /* ── Gift Reveal ── */
          <div className={styles.giftReveal}>
            <div className={styles.giftGlow} aria-hidden="true" />
            <span className={styles.giftEmoji}>🎁</span>
            <h2 className={styles.giftTitle}>Dein Geschenk wartet</h2>
            <p className={styles.giftText}>

              plssss dont hate me, it`s not much, but.. for you :)
              <br /><br />
              hop hop auf zu unserem buchladen des Vertrauens und einen kleinen rabatti abziehen
              Nr. 63940249973849817
              Pin 6359
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
