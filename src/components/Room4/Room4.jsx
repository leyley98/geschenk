import { useState } from "react";
import {
  BOOKS, STORY_NODES, STORY_START_NODE, SOLUTION_WORD, ROOM4_INTRO,
} from "../../data/room4Data";
import IntroTypewriter from "../Room1/IntroTypewriter";
import BookshelfGrid from "./BookshelfGrid";
import BookCard from "./BookCard";
import StoryReader from "./StoryReader";
import Room4SolutionScreen from "./Room4SolutionScreen";
import MagicAtmosphere from "./MagicAtmosphere";
import styles from "./Room4.module.css";

// Rune slot → source hint (shown in inventory tooltip)
const RUNE_SOURCE = {
  1: "Buch: Das Dunkelkompendium",
  2: "Buch: Runen der Uralten",
  3: "Buch: Annalen von Valdrath",
  4: "Buch: Chronik der Wanderer",
  5: "Story: Kapitel III",
  6: "Story: Kapitel IV",
  7: "Story: Epilog",
};

export default function Room4({ onComplete }) {
  const [phase, setPhase] = useState("intro"); // intro | game | solved

  // "shelf" view vs "story" view
  const [view, setView] = useState("shelf");

  // Book modal
  const [openedBookId, setOpenedBookId] = useState(null);
  const [freshBookId, setFreshBookId]   = useState(null); // first-open animation

  // Story state
  const [currentNodeId, setCurrentNodeId] = useState(STORY_START_NODE);
  const [visitedNodes, setVisitedNodes]   = useState(new Set());
  const [freshRuneLetter, setFreshRuneLetter] = useState(null);

  // Exploration
  const [visitedBooks, setVisitedBooks] = useState(new Set());
  const [storyOpened, setStoryOpened] = useState(false);

  // Rune inventory: { [slot]: letter }
  const [collectedRunes, setCollectedRunes] = useState({});

  // Code input
  const [codeInput, setCodeInput]   = useState("");
  const [codeError, setCodeError]   = useState(false);
  const [codeShake, setCodeShake]   = useState(false);

  const totalRunes = 7;
  const collectedCount = Object.keys(collectedRunes).length;
  const allRunesCollected = collectedCount === totalRunes;

  // ── Helpers ────────────────────────────────────────────────────────────────
  function collectRune(slot, letter) {
    if (!collectedRunes[slot]) {
      setCollectedRunes((prev) => ({ ...prev, [slot]: letter }));
    }
  }

  // ── Book click ─────────────────────────────────────────────────────────────
  function handleBookClick(book) {
    // Lock all non-prophecy books until the story book has been opened once
    if (!storyOpened && book.id !== "prophecy") return;

    const isFirst = !visitedBooks.has(book.id);
    if (isFirst) {
      setVisitedBooks((prev) => new Set([...prev, book.id]));
      if (book.runeSlot) collectRune(book.runeSlot, book.runeLetter);
    }

    if (book.type === "story") {
      setStoryOpened(true);
      // Open story reader
      setCurrentNodeId(STORY_START_NODE);
      setFreshRuneLetter(null);
      setView("story");
    } else {
      setOpenedBookId(book.id);
      setFreshBookId(isFirst && book.runeSlot ? book.id : null);
    }
  }

  // ── Story choice ───────────────────────────────────────────────────────────
  function handleStoryChoice(nextNodeId) {
    const nextNode = STORY_NODES[nextNodeId];
    setVisitedNodes((prev) => new Set([...prev, nextNodeId]));

    // Collect rune if present
    if (nextNode.runeSlot) {
      collectRune(nextNode.runeSlot, nextNode.runeLetter);
      setFreshRuneLetter(nextNode.runeLetter);
    } else {
      setFreshRuneLetter(null);
    }

    setCurrentNodeId(nextNodeId);
  }

  // ── Code submit ────────────────────────────────────────────────────────────
  function handleCodeSubmit() {
    if (codeInput.trim().toUpperCase() === SOLUTION_WORD) {
      setPhase("solved");
    } else {
      setCodeShake(true);
      setCodeError(true);
      setTimeout(() => { setCodeShake(false); setCodeError(false); }, 600);
    }
  }

  const openedBook = BOOKS.find((b) => b.id === openedBookId) ?? null;

  // ── Phases ────────────────────────────────────────────────────────────────
  if (phase === "intro") {
    return (
      <IntroTypewriter
        lines={ROOM4_INTRO}
        buttonLabel="✦ Die Bibliothek betreten ✦"
        onDone={() => setPhase("game")}
      />
    );
  }

  if (phase === "solved") {
    return <Room4SolutionScreen onComplete={onComplete} />;
  }

  // ── Story view ─────────────────────────────────────────────────────────────
  if (view === "story") {
    return (
      <>
        <MagicAtmosphere />
        {/* Rune bar always visible */}
        <RuneBar collectedRunes={collectedRunes} />
        <StoryReader
          currentNodeId={currentNodeId}
          visitedNodes={visitedNodes}
          onChoice={handleStoryChoice}
          onBackToShelf={() => setView("shelf")}
          freshRuneLetter={freshRuneLetter}
        />
      </>
    );
  }

  // ── Shelf view ─────────────────────────────────────────────────────────────
  return (
    <div className={styles.room}>
      <MagicAtmosphere />

      {/* Header */}
      <header className={styles.header}>
        <img src={`${import.meta.env.BASE_URL}logo_fantasy.svg`} className={styles.fantasyLogo} alt="" aria-hidden="true" />
        <div className={styles.headerLeft}>
          <span className={styles.roomTag}>✦ RAUM 4 - DIE BIBLIOTHEK ✦</span>
          <h1 className={styles.roomTitle}>Valdrath</h1>
          <span className={styles.subtitle}>
            {visitedBooks.size}/{BOOKS.length} Bücher gelesen ·{" "}
            {collectedCount}/{totalRunes} Runen gesammelt
          </span>
        </div>
      </header>

      {/* Rune inventory bar */}
      <RuneBar collectedRunes={collectedRunes} />

      {/* Hint */}
      {!allRunesCollected && (
        <p className={styles.hint}>
          {!storyOpened
            ? "⚔ Lies zuerst die Prophezeihung des Ersten Archivars – alle anderen Bücher sind versiegelt."
            : collectedCount < 4
            ? `${4 - collectedCount} weitere Rune${4 - collectedCount > 1 ? "n" : ""} in den Büchern versteckt. Lies weiter...`
            : collectedCount < 7
            ? "Kehre zur Prophezeihung ⚔ zurück und folge der Geschichte, um die letzten Runen zu finden."
            : ""}
        </p>
      )}

      {/* Bookshelf */}
      <main className={styles.main}>
        <BookshelfGrid
          books={BOOKS}
          visitedBooks={visitedBooks}
          onBookClick={handleBookClick}
          storyOpened={storyOpened}
        />
      </main>

      {/* Code input */}
      {allRunesCollected && (
        <div className={`${styles.codeSection} ${codeShake ? styles.shake : ""}`}>
          <p className={styles.codeLabel}>
            ✦ Alle sieben Runen gesammelt. Bilde das Codewort und gib es ein ✦
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
            <p className={styles.codeErrorMsg}>
              Das ist nicht das Wort. Ordne die sieben Runen neu...
            </p>
          )}
        </div>
      )}

      {/* Book card modal */}
      {openedBook && (
        <BookCard
          book={openedBook}
          isFirstOpen={freshBookId === openedBook.id}
          onClose={() => { setOpenedBookId(null); setFreshBookId(null); }}
        />
      )}
    </div>
  );
}

// ── Rune Inventory Bar ────────────────────────────────────────────────────────
function RuneBar({ collectedRunes }) {
  return (
    <div className={styles.runeBar}>
      <span className={styles.runeBarLabel}>Runen:</span>
      <div className={styles.runeSlots}>
        {Array.from({ length: 7 }, (_, i) => i + 1).map((slot) => {
          const letter = collectedRunes[slot];
          return (
            <div
              key={slot}
              className={`${styles.runeSlot} ${letter ? styles.runeSlotFilled : styles.runeSlotEmpty}`}
              title={letter ? `Rune ${slot}: ${letter} (${RUNE_SOURCE[slot]})` : `Rune ${slot}: noch nicht gefunden`}
            >
              {letter ?? "?"}
            </div>
          );
        })}
      </div>
    </div>
  );
}
