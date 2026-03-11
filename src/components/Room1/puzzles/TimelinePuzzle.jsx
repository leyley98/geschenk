import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { PUZZLE_TIMELINE } from "../../../data/room1Data";
import styles from "./Puzzle.module.css";

const INITIAL_ORDER = [...PUZZLE_TIMELINE.events].sort(
  () => Math.random() - 0.5
);

function reorder(list, startIndex, endIndex) {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

function isCorrect(items) {
  return items.every((item, idx) => item.correctIndex === idx);
}

export default function TimelinePuzzle({ onSolve, solved }) {
  const [items, setItems] = useState(INITIAL_ORDER);
  const [checked, setChecked] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [activeDetail, setActiveDetail] = useState(null);

  function onDragEnd(result) {
    if (!result.destination || solved) return;
    setItems(reorder(items, result.source.index, result.destination.index));
    setChecked(false);
    setWrong(false);
  }

  function handleCheck() {
    if (isCorrect(items)) {
      setChecked(true);
      setTimeout(() => onSolve(PUZZLE_TIMELINE.letter), 1200);
    } else {
      setWrong(true);
      setTimeout(() => setWrong(false), 1500);
    }
  }

  return (
    <div className={styles.puzzle}>
      <h3 className={styles.puzzleTitle}>{PUZZLE_TIMELINE.title}</h3>
      <p className={styles.instruction}>{PUZZLE_TIMELINE.instruction}</p>
      <p className={styles.subLabel}>
        📂 {PUZZLE_TIMELINE.clue} – Klicke auf ein Ereignis für Details.
      </p>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="timeline">
          {(provided) => (
            <div
              className={styles.timelineList}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {items.map((evt, index) => (
                <Draggable
                  key={evt.id}
                  draggableId={evt.id}
                  index={index}
                  isDragDisabled={solved}
                >
                  {(prov, snapshot) => (
                    <div
                      ref={prov.innerRef}
                      {...prov.draggableProps}
                      {...prov.dragHandleProps}
                      className={`${styles.timelineItem} ${
                        snapshot.isDragging ? styles.dragging : ""
                      } ${evt.suspicious ? styles.suspicious : ""} ${
                        solved ? styles.solvedItem : ""
                      }`}
                      onClick={() =>
                        setActiveDetail(
                          activeDetail === evt.id ? null : evt.id
                        )
                      }
                    >
                      <span className={styles.timeTag}>{evt.time}</span>
                      <span className={styles.evtText}>
                        {evt.highlightLetter && evt.highlightWord && solved ? (
                          <>
                            {evt.text.split(evt.highlightWord)[0]}
                            <strong className={styles.highlightLetter}>
                              {evt.highlightWord[0]}
                            </strong>
                            {evt.highlightWord.slice(1)}
                            {evt.text.split(evt.highlightWord)[1]}
                          </>
                        ) : (
                          evt.text
                        )}
                      </span>
                      {!solved && <span className={styles.dragHint}>⠿</span>}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {activeDetail && (
        <div className={styles.detailBox}>
          <p className={styles.detailText}>
            {items.find((e) => e.id === activeDetail)?.detail}
          </p>
          {items.find((e) => e.id === activeDetail)?.suspicious && (
            <p className={styles.suspiciousNote}>
              ⚠ Verdachtiger Eintrag - beachte den Zusammenhang mit den anderen Beweisen.
            </p>
          )}
        </div>
      )}

      {!solved && (
        <button className={styles.checkBtn} onClick={handleCheck}>
          Reihenfolge bestätigen
        </button>
      )}

      {wrong && (
        <p className={styles.feedbackWrong}>
          Die Reihenfolge stimmt noch nicht. Achte auf die Uhrzeiten.
        </p>
      )}

      {solved && (
        <div className={styles.revealBox}>
          <span className={styles.revealLetter}>{PUZZLE_TIMELINE.letter}</span>
          <p>{PUZZLE_TIMELINE.revealText}</p>
        </div>
      )}
    </div>
  );
}
