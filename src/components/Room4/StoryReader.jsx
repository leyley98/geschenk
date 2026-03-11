import styles from "./StoryReader.module.css";
import { STORY_NODES } from "../../data/room4Data";

// All node IDs in narrative order (for progress bar)
const NODE_ORDER = ["start", "read", "ghost", "raven", "seal", "threshold", "oath", "silence", "end"];

export default function StoryReader({
  currentNodeId,
  visitedNodes,
  onChoice,
  onBackToShelf,
  freshRuneLetter,
}) {
  const node = STORY_NODES[currentNodeId];
  if (!node) return null;

  const isEnd = node.choices.length === 0;
  const visitedCount = NODE_ORDER.filter((id) => visitedNodes.has(id)).length;
  const progress = Math.round((visitedCount / NODE_ORDER.length) * 100);

  return (
    <div className={styles.reader}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onBackToShelf}>
          ← Zurück zur Bibliothek
        </button>
        <span className={styles.chapterLabel}>{node.chapter}</span>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Page */}
      <div className={styles.page}>
        {/* Ornamental top border */}
        <div className={styles.pageOrnamentTop}>
          ✦ · · · · · · · · · · · · · · · · · · · · · · ✦
        </div>

        <h2 className={styles.nodeTitle}>{node.title}</h2>
        <div className={styles.divider}>- ✦ -</div>

        <p className={styles.nodeText}>{node.text}</p>

        {/* Rune found! */}
        {node.runeSlot && freshRuneLetter === node.runeLetter && (
          <div className={styles.runeFound}>
            <span className={styles.runeFoundGlyph}>{node.runeLetter}</span>
            <span className={styles.runeFoundMsg}>Rune {node.runeSlot} entdeckt!</span>
          </div>
        )}

        {/* Choices */}
        {!isEnd && (
          <div className={styles.choices}>
            {node.choices.map((choice, i) => (
              <button
                key={i}
                className={styles.choiceBtn}
                onClick={() => onChoice(choice.nextNodeId)}
              >
                <span className={styles.choiceArrow}>❧</span>
                {choice.label}
              </button>
            ))}
          </div>
        )}

        {/* End state */}
        {isEnd && (
          <div className={styles.endSection}>
            <div className={styles.endOrnament}>✦ · ✦ · ✦</div>
            <p className={styles.endMsg}>Die Geschichte ist erzählt.</p>
            <button className={styles.endBtn} onClick={onBackToShelf}>
              Zurück zur Bibliothek
            </button>
            <p className={styles.replayHint}>
              Du kannst die Geschichte erneut lesen, um andere Pfade zu erkunden.
            </p>
          </div>
        )}

        {/* Ornamental bottom border */}
        <div className={styles.pageOrnamentBottom}>
          ✦ · · · · · · · · · · · · · · · · · · · · · · ✦
        </div>
      </div>
    </div>
  );
}
