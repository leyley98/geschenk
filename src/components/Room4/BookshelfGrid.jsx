import styles from "./BookshelfGrid.module.css";

const SHELF_SIZE = 8; // books per shelf

export default function BookshelfGrid({ books, visitedBooks, onBookClick, storyOpened }) {
  const shelves = [
    books.slice(0, SHELF_SIZE),
    books.slice(SHELF_SIZE, SHELF_SIZE * 2),
    books.slice(SHELF_SIZE * 2),
  ];

  return (
    <div className={styles.shelves}>
      {shelves.map((row, i) => (
        <div key={i} className={styles.shelf}>
          <div className={styles.books}>
            {row.map((book) => {
              const locked = !storyOpened && book.id !== "prophecy";
              return (
                <BookSpine
                  key={book.id}
                  book={book}
                  visited={visitedBooks.has(book.id)}
                  locked={locked}
                  onClick={() => onBookClick(book)}
                />
              );
            })}
          </div>
          <div className={styles.plank} />
        </div>
      ))}
    </div>
  );
}

function BookSpine({ book, visited, locked, onClick }) {
  const isStory = book.type === "story";
  const hasRune = !!book.runeSlot;

  return (
    <button
      className={`
        ${styles.book}
        ${isStory ? styles.storyBook : ""}
        ${visited ? styles.visited : ""}
        ${hasRune && !visited ? styles.runeBook : ""}
        ${locked ? styles.bookLocked : ""}
      `}
      style={{
        background: book.color,
        width: book.w,
        minHeight: book.h,
        "--glow": isStory
          ? "rgba(212,160,23,0.55)"
          : hasRune
          ? "rgba(212,160,23,0.3)"
          : "rgba(255,255,255,0.06)",
      }}
      onClick={locked ? undefined : onClick}
      title={locked ? "Lies zuerst die Prophezeihung ⚔" : book.title}
      aria-label={locked ? "Gesperrt" : book.title}
      aria-disabled={locked}
    >
      <span className={styles.spineTitle}>{book.spineTitle}</span>

      {/* Lock icon on locked books */}
      {locked && (
        <span className={styles.lockIcon} aria-hidden="true">🔒</span>
      )}

      {/* Rune indicator dot on unread rune-books */}
      {hasRune && !visited && !locked && (
        <span className={styles.runeDot} aria-hidden="true">✦</span>
      )}

      {/* Story badge */}
      {isStory && (
        <span className={styles.storyBadge} aria-hidden="true">⚔</span>
      )}

      {/* Visited checkmark */}
      {visited && hasRune && (
        <span className={styles.visitedRune}>{book.runeLetter}</span>
      )}
    </button>
  );
}
