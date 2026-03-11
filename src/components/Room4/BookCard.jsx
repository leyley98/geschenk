import { useEffect } from "react";
import styles from "./BookCard.module.css";

export default function BookCard({ book, isFirstOpen, onClose }) {
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Schließen">✕</button>

        {/* Book header */}
        <div className={styles.bookStrip} style={{ background: book.color }} />
        <div className={styles.header}>
          <h2 className={styles.title}>{book.title}</h2>
          <p className={styles.meta}>{book.author} · {book.year}</p>
        </div>

        {/* Ornamental divider */}
        <div className={styles.ornament}>❧</div>

        {/* Lore text */}
        <p className={styles.blurb}>{book.blurb}</p>

        {/* Rune reveal */}
        {book.runeSlot && (
          <div className={`${styles.runeSection} ${isFirstOpen ? styles.runeNew : styles.runeOld}`}>
            {isFirstOpen ? (
              <>
                <p className={styles.runeFoundLabel}>✦ Rune entdeckt ✦</p>
                <div className={styles.runeBadge}>{book.runeLetter}</div>
                <p className={styles.runeHint}>Rune {book.runeSlot} von 7</p>
              </>
            ) : (
              <>
                <div className={styles.runeBadgeSmall}>{book.runeLetter}</div>
                <p className={styles.runeAlready}>Bereits gesammelt · Rune {book.runeSlot}</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
