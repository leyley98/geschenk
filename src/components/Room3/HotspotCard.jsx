import { useEffect } from "react";
import { ERA_THEMES } from "../../data/room3Data";
import styles from "./HotspotCard.module.css";

export default function HotspotCard({ hotspot, isFirstReveal, onClose }) {
  const theme = ERA_THEMES[hotspot.era] ?? ERA_THEMES["The Eras Tour"];
  const isNewLetter = hotspot.slot && isFirstReveal;

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={`${styles.card} ${isNewLetter ? styles.cardNew : ""}`}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: theme.bg,
          borderColor: theme.border,
          "--era-accent": theme.accent,
          "--era-text": theme.text,
          "--era-border": theme.border,
          "--era-badge": theme.badgeBg,
        }}
      >
        {/* Close button */}
        <button className={styles.closeBtn}
          style={{ color: theme.accent }}
          onClick={onClose}
          aria-label="Schließen">
          ✕
        </button>

        {/* Era badge */}
        <div className={styles.eraBadge} style={{ background: theme.badgeBg, color: theme.accent }}>
          {theme.label}
        </div>

        {/* Header */}
        <div className={styles.header}>
          <span className={styles.emoji}>{hotspot.emoji}</span>
          <div>
            <p className={styles.locationLabel} style={{ color: theme.accent + "99" }}>
              {hotspot.label}
            </p>
            <h2 className={styles.cardTitle} style={{ color: theme.text }}>
              {hotspot.cardTitle}
            </h2>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider} style={{ background: `linear-gradient(90deg, transparent, ${theme.border}60, transparent)` }} />

        {/* Fact */}
        <p className={styles.factText} style={{ color: theme.text + "cc" }}>
          {hotspot.factText}
        </p>

        {/* Letter reveal */}
        {hotspot.slot && (
          <div
            className={`${styles.letterSection} ${isNewLetter ? styles.letterNew : styles.letterOld}`}
            style={isNewLetter
              ? { borderColor: theme.border, background: theme.badgeBg + "55" }
              : { borderColor: theme.border + "40" }
            }
          >
            {isNewLetter ? (
              <>
                <div className={styles.sparkleRow} style={{ color: theme.accent }}>
                  <span>✦</span><span>✦</span><span>✦</span>
                </div>
                <p className={styles.letterFoundLabel} style={{ color: theme.accent }}>
                  Buchstabe entdeckt!
                </p>
                <div className={styles.letterBadge}
                  style={{ background: `linear-gradient(135deg, ${theme.badgeBg}, ${theme.accent}55)`, boxShadow: `0 0 20px ${theme.accent}60`, color: theme.text }}>
                  {hotspot.letter}
                </div>
                <p className={styles.slotHint} style={{ color: theme.accent + "88" }}>
                  Position {hotspot.slot} von 7
                </p>
              </>
            ) : (
              <>
                <div className={styles.letterBadgeSmall}
                  style={{ background: theme.badgeBg, border: `1px solid ${theme.border}60`, color: theme.accent }}>
                  {hotspot.letter}
                </div>
                <p className={styles.alreadyCollected} style={{ color: theme.accent + "66" }}>
                  Bereits gesammelt · Slot {hotspot.slot}
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
