import { useState } from "react";
import styles from "./YoutubePlayer.module.css";

export default function YoutubePlayer({ src }) {
  const [minimized, setMinimized] = useState(false);

  return (
    <div className={`${styles.wrap} ${minimized ? styles.minimized : ""}`}>
      <div className={styles.titleBar}>
        <span className={styles.title}>🎵 Pit Radio</span>
        <button
          className={styles.toggleBtn}
          onClick={() => setMinimized(m => !m)}
          title={minimized ? "Aufklappen" : "Minimieren"}
        >
          {minimized ? "▲" : "▼"}
        </button>
      </div>
      {!minimized && (
        <video
          className={styles.frame}
          src={src}
          autoPlay
          loop
          controls
          playsInline
        />
      )}
    </div>
  );
}
