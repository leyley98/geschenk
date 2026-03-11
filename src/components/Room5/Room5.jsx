import { useState } from "react";
import YoutubePlayer from "./YoutubePlayer";
import { CHALLENGES, ROOM5_INTRO, SOLUTION_WORD } from "../../data/room5Data";
import IntroTypewriter from "../Room1/IntroTypewriter";
import LightsOut from "./LightsOut";
import GarageAtmosphere from "./GarageAtmosphere";
import ChallengeModal from "./ChallengeModal";
import Room5SolutionScreen from "./Room5SolutionScreen";
import styles from "./Room5.module.css";

export default function Room5({ onComplete }) {
  const [phase, setPhase] = useState("intro");
  const [activeId, setActiveId] = useState(null);
  const [collectedLetters, setCollectedLetters] = useState({});
  const [codeInput, setCodeInput] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [codeShake, setCodeShake] = useState(false);

  const collectedCount = Object.keys(collectedLetters).length;
  const totalChallenges = CHALLENGES.length;
  const allCollected = collectedCount === totalChallenges;
  const activeChallenge = CHALLENGES.find((c) => c.id === activeId) ?? null;

  function handleChallengeComplete(challenge) {
    setCollectedLetters((prev) => ({ ...prev, [challenge.slot]: challenge.letter }));
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
        lines={ROOM5_INTRO}
        buttonLabel="BOXENGASSE BETRETEN"
        onDone={() => setPhase("lights")}
      />
    );
  }

  if (phase === "lights") {
    return <LightsOut onDone={() => setPhase("game")} />;
  }

  if (phase === "solved") {
    return <Room5SolutionScreen onComplete={onComplete} />;
  }

  return (
    <div className={styles.room}>
      <GarageAtmosphere />

      {/* Monza circuit watermark */}
      <img src={`${import.meta.env.BASE_URL}Monza.svg`} className={styles.monzaWatermark} alt="" aria-hidden="true" />

      {/* Atmospheric driver silhouette */}
      <img src={`${import.meta.env.BASE_URL}Ferrari%20Fahrer.png`} className={styles.driverImg} alt="" aria-hidden="true" />

      {/* Driver signature - lower left */}
      <img src={`${import.meta.env.BASE_URL}unterschrift.svg`} className={styles.signatureCorner} alt="" aria-hidden="true" />

      {/* Ferrari red LED strip */}
      <div className={styles.ledStrip} />

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          {/* Scuderia Ferrari crest */}
          <div className={styles.horseWrap}>
            <img src={`${import.meta.env.BASE_URL}Ferrari%20Logo.svg`} alt="Scuderia Ferrari" className={styles.ferrariLogo} />
          </div>
          {/* Text branding */}
          <div className={styles.headerBranding}>
            <span className={styles.roomTag}>RAUM 1 - SCUDERIA FERRARI</span>
            <h1 className={styles.roomTitle}>PIT WALL</h1>
            <span className={styles.location}>Autodromo Nazionale di Monza</span>
          </div>
        </div>
        {/* F1 logo */}
        <img src={`${import.meta.env.BASE_URL}F1%20Logo.svg`} alt="Formula 1" className={styles.f1Logo} aria-hidden="true" />

        <div className={styles.headerStats}>
          <div className={styles.statBlock}>
            <span className={styles.statNum}>{collectedCount}</span>
            <span className={styles.statLabel}>Gelöst</span>
          </div>
          <div className={styles.statBlock}>
            <span className={styles.statNum}>{totalChallenges - collectedCount}</span>
            <span className={styles.statLabel}>Offen</span>
          </div>
          <div className={styles.statBlock}>
            <span className={styles.statNum}>{totalChallenges}</span>
            <span className={styles.statLabel}>Total</span>
          </div>
        </div>
      </header>

      {/* Letter inventory */}
      <div className={styles.inventory}>
        <span className={styles.inventoryLabel}>Codewort:</span>
        <div className={styles.slots}>
          {CHALLENGES.map((c) => {
            const letter = collectedLetters[c.slot];
            return letter ? (
              <div key={c.slot} className={`${styles.slot} ${styles.slotFilled}`} title={`Modul ${c.slot}: ${letter}`}>
                {letter}
              </div>
            ) : (
              <div key={c.slot} className={`${styles.slot} ${styles.slotEmpty}`} title={`Modul ${c.slot}: noch gesperrt`}>
                ?
              </div>
            );
          })}
        </div>
      </div>

      {/* Pit Wall challenge grid */}
      <main className={styles.pitWall}>
        {!allCollected && (
          <p className={styles.hint}>
            {collectedCount === 0
              ? "Wähle ein Modul - löse die Challenge - sichere den Buchstaben."
              : `Noch ${totalChallenges - collectedCount} Modul${totalChallenges - collectedCount > 1 ? "e" : ""} offen. Du schaffst das.`}
          </p>
        )}

        <div className={styles.grid}>
          {CHALLENGES.map((challenge) => {
            const solved = !!collectedLetters[challenge.slot];
            return (
              <button
                key={challenge.id}
                className={`${styles.tile} ${solved ? styles.tileSolved : styles.tileActive}`}
                onClick={() => !solved && setActiveId(challenge.id)}
                disabled={solved}
              >
                {/* Corner label */}
                <span className={styles.tileIndex}>0{challenge.slot}</span>

                {/* Solved checkmark or lock */}
                <span className={styles.tileStatus}>
                  {solved ? "✓" : "▶"}
                </span>

                <div className={styles.tileEmoji}>{challenge.emoji}</div>
                <div className={styles.tileTitle}>{challenge.title}</div>
                <div className={styles.tileSubtitle}>{challenge.subtitle}</div>

                {solved && (
                  <div className={styles.tileLetter}>{collectedLetters[challenge.slot]}</div>
                )}

                {/* Glow line at bottom */}
                <div className={styles.tileGlow} />
              </button>
            );
          })}
        </div>
      </main>

      {/* Code input - appears when all 6 collected */}
      {allCollected && (
        <div className={`${styles.codeSection} ${codeShake ? styles.shake : ""}`}>
          <p className={styles.codeLabel}>
            Alle 6 Buchstaben gesichert - gib das Codewort durch.
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
              Senden
            </button>
          </div>
          {codeError && (
            <p className={styles.codeErrorMsg}>Falsches Codewort - nochmal prüfen.</p>
          )}
        </div>
      )}

      {/* Floating YouTube player */}
      <YoutubePlayer src={`${import.meta.env.BASE_URL}audio/ferrari.mp4`} />

      {/* Challenge modal */}
      {activeChallenge && (
        <ChallengeModal
          challenge={activeChallenge}
          onComplete={() => handleChallengeComplete(activeChallenge)}
          onClose={() => setActiveId(null)}
        />
      )}
    </div>
  );
}
