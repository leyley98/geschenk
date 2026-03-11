import { useState, useRef, useEffect } from "react";
import { HOTSPOTS, ROOM3_INTRO, SOLUTION_WORD } from "../../data/room3Data";
import IntroTypewriter from "../Room1/IntroTypewriter";
import StadiumMap from "./StadiumMap";
import HotspotCard from "./HotspotCard";
import Room3SolutionScreen from "./Room3SolutionScreen";
import TaylorAtmosphere from "./TaylorAtmosphere";
import styles from "./Room3.module.css";

const LETTER_SLOTS = HOTSPOTS.filter((h) => h.slot).sort((a, b) => a.slot - b.slot);

// Era-derived slot colors for the inventory display
const SLOT_STYLES = {
  1: { bg: "linear-gradient(135deg, #5b21b6, #7c3aed)", border: "#c084fc", shadow: "rgba(192,132,252,0.4)" },
  2: { bg: "linear-gradient(135deg, #9d174d, #be185d)", border: "#f9a8d4", shadow: "rgba(249,168,212,0.4)" },
  3: { bg: "linear-gradient(135deg, #6d28d9, #8b5cf6)", border: "#c4b5fd", shadow: "rgba(196,181,253,0.4)" },
  4: { bg: "linear-gradient(135deg, #1f2937, #374151)", border: "#9ca3af", shadow: "rgba(156,163,175,0.35)" },
  5: { bg: "linear-gradient(135deg, #292524, #44403c)", border: "#a8a29e", shadow: "rgba(168,162,158,0.35)" },
  6: { bg: "linear-gradient(135deg, #7f1d1d, #991b1b)", border: "#f87171", shadow: "rgba(248,113,113,0.4)" },
  7: { bg: "linear-gradient(135deg, #78350f, #92400e)", border: "#fbbf24", shadow: "rgba(251,191,36,0.4)" },
};

export default function Room3({ onComplete }) {
  const [phase, setPhase] = useState("intro");
  const [activeHotspotId, setActiveHotspotId] = useState(null);
  const [visitedIds, setVisitedIds] = useState(new Set());
  const [collectedSlots, setCollectedSlots] = useState({});
  const [freshlyRevealedId, setFreshlyRevealedId] = useState(null);
  const [codeInput, setCodeInput] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [codeShake, setCodeShake] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Auto-play when game phase starts
  useEffect(() => {
    if (phase === "game" && audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
    // Pause music when leaving game phase
    if (phase !== "game" && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [phase]);

  function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }

  const activeHotspot = HOTSPOTS.find((h) => h.id === activeHotspotId) ?? null;
  const collectedCount = Object.keys(collectedSlots).length;
  const totalLetters = LETTER_SLOTS.length;
  const allSlotsCollected = collectedCount === totalLetters;

  function handleHotspotClick(hotspot) {
    const isFirstVisit = !visitedIds.has(hotspot.id);
    if (isFirstVisit) {
      setVisitedIds((prev) => new Set([...prev, hotspot.id]));
      if (hotspot.slot && !collectedSlots[hotspot.slot]) {
        setCollectedSlots((prev) => ({ ...prev, [hotspot.slot]: hotspot.letter }));
        setFreshlyRevealedId(hotspot.id);
      }
    }
    setActiveHotspotId(hotspot.id);
  }

  function handleCardClose() {
    setActiveHotspotId(null);
    setFreshlyRevealedId(null);
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

  // ── Intro ─────────────────────────────────────────────────────────────────
  if (phase === "intro") {
    return (
      <IntroTypewriter
        lines={ROOM3_INTRO}
        buttonLabel="✦ KARTE ÖFFNEN ✦"
        onDone={() => setPhase("game")}
      />
    );
  }

  // ── Solved ────────────────────────────────────────────────────────────────
  if (phase === "solved") {
    return <Room3SolutionScreen onComplete={onComplete} />;
  }

  // ── Game ──────────────────────────────────────────────────────────────────
  return (
    <div className={styles.room}>
      {/* Hidden audio element */}
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}music/eras-tour.m4a`} loop preload="auto" />

      {/* Floating music button */}
      <button
        className={`${styles.musicBtn} ${isPlaying ? styles.musicBtnPlaying : ""}`}
        onClick={toggleMusic}
        title={isPlaying ? "Musik pausieren" : "Musik abspielen"}
        aria-label={isPlaying ? "Musik pausieren" : "Musik abspielen"}
      >
        {isPlaying ? "⏸" : "▶"}
      </button>

      <TaylorAtmosphere />

      {/* Era rainbow strip */}
      <div className={styles.eraStrip} />

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.roomTag}>✦ RAUM 3 ✦</span>
          <h1 className={styles.roomTitle}>THE ERAS TOUR</h1>
          <span className={styles.location}>Olympiastadion München · 27. Juli 2024</span>
        </div>
        <div className={styles.headerStats}>
          <span className={styles.stat}>
            <span className={styles.statNum}>{visitedIds.size}</span>
            <span className={styles.statLabel}>/{HOTSPOTS.length} Orte</span>
          </span>
          <span className={styles.statDivider}>·</span>
          <span className={styles.stat}>
            <span className={styles.statNum}>{collectedCount}</span>
            <span className={styles.statLabel}>/{totalLetters} Buchstaben</span>
          </span>
        </div>
      </header>

      {/* Letter inventory */}
      <div className={styles.inventory}>
        <span className={styles.inventoryLabel}>Codewort:</span>
        <div className={styles.slots}>
          {LETTER_SLOTS.map((h) => {
            const letter = collectedSlots[h.slot];
            const era = SLOT_STYLES[h.slot];
            return letter ? (
              <div
                key={h.slot}
                className={`${styles.slot} ${styles.slotFilled}`}
                style={{
                  background: era.bg,
                  borderColor: era.border,
                  boxShadow: `0 0 12px ${era.shadow}`,
                  border: `1.5px solid ${era.border}`,
                }}
                title={`Slot ${h.slot}: ${letter}`}
              >
                {letter}
              </div>
            ) : (
              <div
                key={h.slot}
                className={`${styles.slot} ${styles.slotEmpty}`}
                title={`Slot ${h.slot}: noch nicht gefunden`}
              >
                ✦
              </div>
            );
          })}
        </div>
      </div>

      {/* Hint */}
      {!allSlotsCollected && (
        <p className={styles.hint}>
          {collectedCount === 0
            ? "Klicke auf die Hotspots auf der Karte – manche verraten dir einen Buchstaben ✦"
            : `Noch ${totalLetters - collectedCount} Buchstabe${totalLetters - collectedCount > 1 ? "n" : ""} zu finden! Du schaffst das ✦`}
        </p>
      )}

      {/* Map */}
      <main className={styles.mapSection}>
        <StadiumMap
          hotspots={HOTSPOTS}
          visitedHotspots={visitedIds}
          onHotspotClick={handleHotspotClick}
        />
      </main>

      {/* Code input */}
      {allSlotsCollected && (
        <div className={`${styles.codeSection} ${codeShake ? styles.shake : ""}`}>
          <p className={styles.codeLabel}>
            ✦ Alle 7 Buchstaben gesammelt! Bilde das Codewort und gib es ein ✦
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
              Bestätigen
            </button>
          </div>
          {codeError && (
            <p className={styles.codeErrorMsg}>Nicht ganz – schau nochmal auf die Buchstaben! ✦</p>
          )}
        </div>
      )}

      {/* Hotspot card modal */}
      {activeHotspot && (
        <HotspotCard
          hotspot={activeHotspot}
          isFirstReveal={freshlyRevealedId === activeHotspot.id}
          onClose={handleCardClose}
        />
      )}
    </div>
  );
}
