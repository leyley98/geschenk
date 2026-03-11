import { useState, useEffect, useRef } from "react";
import styles from "./ChallengeModal.module.css";

export default function ChallengeModal({ challenge, onComplete, onClose }) {
  const [solved, setSolved] = useState(false);
  const [wrongShake, setWrongShake] = useState(false);

  // Choice
  const [selected, setSelected] = useState(null);
  const [choiceWrong, setChoiceWrong] = useState(false);

  // Timing
  const [timingPhase, setTimingPhase] = useState("idle"); // idle | running | tooEarly | tooLate
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef(null);
  const rafRef = useRef(null);

  // Input
  const [inputVal, setInputVal] = useState("");
  const [inputWrong, setInputWrong] = useState(false);

  // Cleanup RAF on unmount
  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  // RAF loop
  useEffect(() => {
    if (timingPhase !== "running") return;
    const tick = () => {
      setElapsed((Date.now() - startRef.current) / 1000);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [timingPhase]);

  const type = challenge.type ?? "choice";

  function shake() {
    setWrongShake(true);
    setTimeout(() => setWrongShake(false), 600);
  }

  // ── Choice ─────────────────────────────────────────────
  function handleOption(i) {
    if (solved) return;
    setSelected(i);
    if (i === challenge.correctIndex) {
      setSolved(true);
    } else {
      setChoiceWrong(true);
      shake();
      setTimeout(() => { setChoiceWrong(false); setSelected(null); }, 700);
    }
  }

  // ── Timing ─────────────────────────────────────────────
  function startTimer() {
    startRef.current = Date.now();
    setElapsed(0);
    setTimingPhase("running");
  }

  function releaseTimer() {
    if (timingPhase !== "running") return;
    cancelAnimationFrame(rafRef.current);
    const t = (Date.now() - startRef.current) / 1000;
    setElapsed(t);
    if (t < challenge.timing.min) {
      setTimingPhase("tooEarly");
      shake();
    } else if (t > challenge.timing.max) {
      setTimingPhase("tooLate");
      shake();
    } else {
      setTimingPhase("idle");
      setSolved(true);
    }
  }

  function resetTimer() {
    setTimingPhase("idle");
    setElapsed(0);
  }

  // ── Input ──────────────────────────────────────────────
  function submitInput() {
    const clean = inputVal.trim().replace(/[^a-z0-9]/gi, "").toLowerCase();
    const expected = challenge.answer.replace(/[^a-z0-9]/gi, "").toLowerCase();
    if (clean === expected) {
      setSolved(true);
    } else {
      setInputWrong(true);
      shake();
      setTimeout(() => setInputWrong(false), 700);
    }
  }

  const totalSecs = 4;
  const fillPct = Math.min(elapsed / totalSecs, 1) * 100;
  const windowLeft = (challenge.timing?.min / totalSecs) * 100;
  const windowWidth = ((challenge.timing?.max - challenge.timing?.min) / totalSecs) * 100;

  return (
    <div
      className={styles.overlay}
      onClick={e => e.target === e.currentTarget && !solved && onClose()}
    >
      <div className={`${styles.card} ${wrongShake ? styles.shake : ""}`}>

        <div className={styles.topBar} />
        <p className={styles.sectionLabel}>{challenge.sectionLabel}</p>

        <div className={styles.titleRow}>
          <span className={styles.emoji}>{challenge.emoji}</span>
          <div>
            <h2 className={styles.title}>{challenge.title}</h2>
            <p className={styles.subtitle}>{challenge.subtitle}</p>
          </div>
        </div>

        <div className={styles.divider} />

        {/* ── SOLVED STATE ── */}
        {solved ? (
          <div className={styles.successPane}>
            <div className={styles.letterReveal}>
              <span className={styles.revealedLetter}>{challenge.letter}</span>
            </div>
            <p className={styles.successText}>{challenge.successText}</p>
            <button className={styles.confirmBtn} onClick={onComplete}>
              Buchstabe sichern →
            </button>
          </div>

        /* ── CHOICE ── */
        ) : type === "choice" ? (
          <>
            {challenge.showCircuit && (
              <div className={styles.circuitPreview}>
                <img src={`${import.meta.env.BASE_URL}Monza.svg`} alt="Monza Circuit" className={styles.circuitImg} />
              </div>
            )}
            <p className={styles.question}>{challenge.question}</p>
            <div className={styles.options}>
              {challenge.options.map((opt, i) => (
                <button
                  key={i}
                  className={`${styles.optionBtn} ${selected === i && choiceWrong ? styles.optionWrong : ""}`}
                  onClick={() => handleOption(i)}
                >
                  <span className={styles.optionIndex}>{String.fromCharCode(65 + i)}</span>
                  {opt}
                </button>
              ))}
            </div>
            {choiceWrong && <p className={styles.wrongMsg}>Nicht korrekt - versuch es nochmal.</p>}
          </>

        /* ── TIMING ── */
        ) : type === "timing" ? (
          <>
            <p className={styles.question}>{challenge.question}</p>
            <div className={styles.timingWrap}>
              <p className={styles.timingTarget}>
                Optimales Fenster:{" "}
                <strong>{challenge.timing.min.toFixed(1)}s – {challenge.timing.max.toFixed(1)}s</strong>
              </p>

              {/* Progress bar */}
              <div className={styles.timerTrack}>
                <div className={styles.timerFill} style={{ width: `${fillPct}%` }} />
                <div
                  className={styles.timerWindow}
                  style={{ left: `${windowLeft}%`, width: `${windowWidth}%` }}
                />
              </div>

              <div className={styles.timerDisplay}>
                {elapsed.toFixed(2)}<span className={styles.timerUnit}>s</span>
              </div>

              {timingPhase === "idle" && (
                <button className={styles.timingBtn} onClick={startTimer}>▶ START</button>
              )}
              {timingPhase === "running" && (
                <button className={`${styles.timingBtn} ${styles.releaseBtn}`} onClick={releaseTimer}>
                  ⬛ RELEASE
                </button>
              )}
              {(timingPhase === "tooEarly" || timingPhase === "tooLate") && (
                <>
                  <p className={styles.timingFail}>
                    {timingPhase === "tooEarly"
                      ? `⚠ ${elapsed.toFixed(3)}s - UNSAFE RELEASE! Mechaniker noch nicht weg.`
                      : `⏱ ${elapsed.toFixed(3)}s - ZU SPÄT! P2 hat untercut.`}
                  </p>
                  <button className={styles.timingBtn} onClick={resetTimer}>↩ NOCHMAL</button>
                </>
              )}
            </div>
          </>

        /* ── INPUT ── */
        ) : type === "input" ? (
          <>
            <p className={styles.question}>{challenge.question}</p>
            {challenge.context && (
              <pre className={styles.inputContext}>{challenge.context}</pre>
            )}
            <div className={styles.inputRow}>
              <input
                className={`${styles.answerInput} ${inputWrong ? styles.answerWrong : ""}`}
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={e => e.key === "Enter" && submitInput()}
                placeholder={challenge.placeholder ?? "Antwort..."}
                autoFocus
                spellCheck={false}
                autoComplete="off"
              />
              <button className={styles.answerBtn} onClick={submitInput}>▶</button>
            </div>
            {inputWrong && <p className={styles.wrongMsg}>✕ Nicht korrekt - versuch es nochmal.</p>}
          </>
        ) : null}

        {!solved && (
          <button className={styles.closeBtn} onClick={onClose} aria-label="Schließen">×</button>
        )}
      </div>
    </div>
  );
}
