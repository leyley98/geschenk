import styles from "./DancefloorScene.module.css";

// ─── Letter challenge tile ────────────────────────────────────────────────────
function LetterTile({ challenge, letter, onClick }) {
  const solved = !!letter;
  return (
    <button
      className={`${styles.tile} ${solved ? styles.tileSolved : styles.tileActive}`}
      onClick={() => !solved && onClick(challenge)}
      disabled={solved}
    >
      <span className={styles.tileSlot}>0{challenge.slot}</span>
      <span className={styles.tileStatus}>{solved ? "✓" : "✦"}</span>
      <div className={styles.tileEmoji}>{challenge.emoji}</div>
      <div className={styles.tileTitle}>{challenge.title}</div>
      <div className={styles.tileSubtitle}>{challenge.subtitle}</div>
      {solved && <div className={styles.tileLetter}>{letter}</div>}
      <div className={styles.tileGlow} />
    </button>
  );
}

// ─── Bonus card tile (easter egg) ────────────────────────────────────────────
function BonusTile({ challenge, isVisited, onClick }) {
  return (
    <button
      className={`${styles.bonusTile} ${isVisited ? styles.bonusTileVisited : ""}`}
      onClick={() => onClick(challenge)}
    >
      <span className={styles.bonusEmoji}>{challenge.emoji}</span>
      <span className={styles.bonusTitle}>{challenge.title}</span>
      {isVisited && <span className={styles.bonusCheck}>✓</span>}
    </button>
  );
}

// ─── Main scene ───────────────────────────────────────────────────────────────
export default function DancefloorScene({
  challenges, collectedLetters, visitedBonusTiles, onHotspotClick,
}) {
  const letterChallenges = challenges.filter((c) => c.type === "quiz");
  const bonusChallenges  = challenges.filter((c) => c.type === "card");

  return (
    <div className={styles.scene}>
      {/* ── Hint ── */}
      <p className={styles.hint}>
        {Object.keys(collectedLetters).length === 0
          ? "Klicke auf ein Modul - beantworte die Challenge - sichere den Buchstaben. ✦"
          : Object.keys(collectedLetters).length < letterChallenges.length
          ? `Noch ${letterChallenges.length - Object.keys(collectedLetters).length} Modul${letterChallenges.length - Object.keys(collectedLetters).length > 1 ? "e" : ""} offen. Du schaffst das. ✦`
          : "Alle Buchstaben gesammelt! Gib das Codewort ein. ✦"}
      </p>

      {/* ── Letter challenge grid ── */}
      <div className={styles.grid}>
        {letterChallenges.map((ch) => (
          <LetterTile
            key={ch.id}
            challenge={ch}
            letter={collectedLetters[ch.slot]}
            onClick={onHotspotClick}
          />
        ))}
      </div>

      {/* ── Easter egg row ── */}
      <div className={styles.eggSection}>
        <p className={styles.eggLabel}>✦ Easter Eggs ✦</p>
        <div className={styles.eggRow}>
          {bonusChallenges.map((ch) => (
            <BonusTile
              key={ch.id}
              challenge={ch}
              isVisited={visitedBonusTiles.has(ch.id)}
              onClick={onHotspotClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
