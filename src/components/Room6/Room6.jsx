import { useState } from "react";
import { CHALLENGES, LETTER_CHALLENGES, ROOM6_INTRO, SOLUTION_WORD, SLOT_STYLES } from "../../data/room6Data";
import IntroTypewriter from "../Room1/IntroTypewriter";
import PopAtmosphere from "./PopAtmosphere";
import JukeboxScene from "./JukeboxScene";
import PopModal from "./PopModal";
import Room6SolutionScreen from "./Room6SolutionScreen";
import styles from "./Room6.module.css";

export default function Room6({ onComplete }) {
  const [phase, setPhase]                       = useState("intro");
  const [activeId, setActiveId]                 = useState(null);
  const [collectedLetters, setCollectedLetters] = useState({});
  const [codeInput, setCodeInput]               = useState("");
  const [codeError, setCodeError]               = useState(false);
  const [codeShake, setCodeShake]               = useState(false);

  const collectedCount = Object.keys(collectedLetters).length;
  const totalLetters   = LETTER_CHALLENGES.length;
  const allCollected   = collectedCount === totalLetters;
  const activeChallenge = CHALLENGES.find((c) => c.id === activeId) ?? null;

  function handleQuizComplete() {
    if (!activeChallenge?.slot) return;
    setCollectedLetters((prev) => ({
      ...prev,
      [activeChallenge.slot]: activeChallenge.letter,
    }));
    setActiveId(null);
  }

  function handleCodeSubmit() {
    if (codeInput.trim().toUpperCase() === SOLUTION_WORD) {
      setPhase("solved");
    } else {
      setCodeShake(true);
      setCodeError(true);
      setTimeout(() => { setCodeShake(false); setCodeError(false); }, 600);
    }
  }

  if (phase === "intro") {
    return (
      <IntroTypewriter
        lines={ROOM6_INTRO}
        buttonLabel="✦ JUKEBOX STARTEN ✦"
        onDone={() => setPhase("game")}
      />
    );
  }

  if (phase === "solved") {
    return <Room6SolutionScreen onComplete={onComplete} />;
  }

  return (
    <div className={styles.room}>
      <PopAtmosphere />

      {/* Glitter strip */}
      <div className={styles.glitterStrip} />

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.roomTag}>✦ THE POP ROOM ✦</span>
          <h1 className={styles.roomTitle}>JUKEBOX</h1>
          <span className={styles.location}>
            Pop · Indie · Electronic · Classics
          </span>
        </div>
        <div className={styles.headerStats}>
          <span className={styles.stat}>
            <span className={styles.statNum}>{collectedCount}</span>
            <span className={styles.statLabel}>/{totalLetters} Songs</span>
          </span>
          <span className={styles.statDivider}>·</span>
          <span className={styles.stat}>
            <span className={styles.statNum}>{totalLetters - collectedCount}</span>
            <span className={styles.statLabel}>offen</span>
          </span>
        </div>
      </header>

      {/* Glitter-letter inventory bar */}
      <div className={styles.inventory}>
        <span className={styles.inventoryLabel}>Codewort:</span>
        <div className={styles.slots}>
          {LETTER_CHALLENGES.map((ch) => {
            const letter = collectedLetters[ch.slot];
            const s = SLOT_STYLES[ch.slot];
            return letter ? (
              <div
                key={ch.slot}
                className={`${styles.slot} ${styles.slotFilled}`}
                style={{ background: s.bg, borderColor: s.border, boxShadow: `0 0 12px ${s.shadow}` }}
                title={`Song ${ch.slot}: ${letter}`}
              >
                {letter}
              </div>
            ) : (
              <div
                key={ch.slot}
                className={`${styles.slot} ${styles.slotEmpty}`}
                title={`Song ${ch.slot}: noch nicht gespielt`}
              >
                ✦
              </div>
            );
          })}
        </div>
      </div>

      {/* Jukebox */}
      <JukeboxScene
        challenges={CHALLENGES}
        collectedLetters={collectedLetters}
        onSongClick={(song) => setActiveId(song.id)}
      />


      {/* Code input - appears when all 8 collected */}
      {allCollected && (
        <div className={`${styles.codeSection} ${codeShake ? styles.shake : ""}`}>
          <p className={styles.codeLabel}>
            ✦ Alle 8 Buchstaben gesammelt! Was ist das Codewort? ✦
          </p>
          <div className={styles.codeRow}>
            <input
              className={`${styles.codeInput} ${codeError ? styles.codeInputError : ""}`}
              type="text"
              maxLength={10}
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && handleCodeSubmit()}
              placeholder="CODEWORT"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
            <button className={styles.codeBtn} onClick={handleCodeSubmit}>
              Bestätigen ✦
            </button>
          </div>
          {codeError && (
            <p className={styles.codeErrorMsg}>
              Hmm, nicht ganz - schau nochmal auf die Buchstaben! ✦
            </p>
          )}
        </div>
      )}

      {/* Quiz modal */}
      {activeChallenge && (
        <PopModal
          challenge={activeChallenge}
          onComplete={handleQuizComplete}
          onClose={() => setActiveId(null)}
        />
      )}
    </div>
  );
}
