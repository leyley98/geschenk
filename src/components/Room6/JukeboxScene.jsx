import { useState, useRef, useEffect } from "react";
import styles from "./JukeboxScene.module.css";

function formatTime(s) {
  if (!s || isNaN(s)) return "0:00";
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

// Animated equaliser bars
function EQBars({ active }) {
  return (
    <div className={`${styles.eq} ${active ? styles.eqActive : ""}`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} className={styles.eqBar} style={{ "--i": i }} />
      ))}
    </div>
  );
}

const TUBE_COLORS = ["#e879f9", "#fbbf24", "#38bdf8", "#f472b6", "#a78bfa", "#34d399"];

export default function JukeboxScene({ challenges, collectedLetters, onSongClick }) {
  const [currentId, setCurrentId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playedIds, setPlayedIds] = useState(new Set());
  const audioRef = useRef(null);

  const currentSong = challenges.find((c) => c.id === currentId) ?? null;
  const progress = duration > 0 ? currentTime / duration : 0;
  const unlockedCount = Object.keys(collectedLetters).length + 1;

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;
    audio.addEventListener("timeupdate",     () => setCurrentTime(audio.currentTime));
    audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));
    audio.addEventListener("ended",  () => setIsPlaying(false));
    audio.addEventListener("play",   () => setIsPlaying(true));
    audio.addEventListener("pause",  () => setIsPlaying(false));
    return () => { audio.pause(); audio.src = ""; };
  }, []);

  function handleSelect(song) {
    const audio = audioRef.current;
    if (!audio) return;
    if (currentId === song.id) {
      isPlaying ? audio.pause() : audio.play().catch(() => {});
      return;
    }
    audio.pause();
    audio.src = song.audioSrc;
    audio.currentTime = 0;
    setCurrentId(song.id);
    setCurrentTime(0);
    setDuration(0);
    audio.play().catch(() => {});
    setPlayedIds((prev) => new Set([...prev, song.id]));
    if (!collectedLetters[song.slot]) onSongClick(song);
  }

  function handleSeek(e) {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    audio.currentTime = ((e.clientX - r.left) / r.width) * duration;
  }

  return (
    <div className={styles.sceneWrap}>
      <div className={styles.jukebox}>

        {/* ═══ DOME / ARCH ══════════════════════════════════════════ */}
        <div className={styles.arch}>
          {/* Stained-glass colour bands */}
          <div className={styles.archGlass} />
          {/* Dark radial overlay to give depth */}
          <div className={styles.archOverlay} />
          {/* Text content */}
          <div className={styles.archContent}>
            <span className={styles.archTag}>✦ THE POP ROOM ✦</span>
            <h2 className={styles.archTitle}>JUKEBOX</h2>
            <span className={styles.archSub}>8 Songs · 8 Secrets</span>
          </div>
          {/* Decorative chrome arch ring */}
          <div className={styles.archRing} />
        </div>

        {/* ═══ CHROME TRIM ══════════════════════════════════════════ */}
        <div className={styles.chromeTrim} />

        {/* ═══ BODY ═════════════════════════════════════════════════ */}
        <div className={styles.body}>

          {/* Left tube column */}
          <div className={styles.tubeCol}>
            {TUBE_COLORS.map((c, i) => (
              <div key={i} className={styles.tube}
                style={{ "--tc": c, "--td": `${i * 0.18}s` }} />
            ))}
          </div>

          {/* ── Center panel ── */}
          <div className={styles.centerPanel}>

            {/* NOW PLAYING screen */}
            <div className={styles.screen}>
              <div className={styles.screenScanline} />
              {currentSong ? (
                <>
                  <div className={styles.screenTop}>
                    <EQBars active={isPlaying} />
                    <div className={styles.screenMeta}>
                      <span className={styles.screenEmoji}>{currentSong.emoji}</span>
                      <div>
                        <p className={styles.screenTitle}>{currentSong.title}</p>
                        <p className={styles.screenArtist}>{currentSong.artist}</p>
                      </div>
                    </div>
                    <EQBars active={isPlaying} />
                  </div>
                  <div className={styles.progressWrap} onClick={handleSeek}>
                    <div className={styles.progressFill}
                      style={{ width: `${progress * 100}%` }} />
                    <div className={styles.progressKnob}
                      style={{ left: `${progress * 100}%` }} />
                  </div>
                  <div className={styles.screenTime}>
                    <span>{formatTime(currentTime)}</span>
                    <span className={styles.screenStatus}>
                      {isPlaying ? "♪ NOW PLAYING" : "⏸ PAUSED"}
                    </span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </>
              ) : (
                <p className={styles.screenIdle}>✦ SELECT A SONG ✦</p>
              )}
            </div>

            {/* Decorative chrome bar between screen and list */}
            <div className={styles.innerTrim} />

            {/* SONG LIST */}
            <div className={styles.songList}>
              {challenges.map((song, idx) => {
                const solved    = !!collectedLetters[song.slot];
                const isActive  = currentId === song.id;
                const unlocked  = idx < unlockedCount;
                const revealed  = playedIds.has(song.id);

                // ── Locked / future songs ──────────────────────────────
                if (!unlocked) {
                  return (
                    <div key={song.id} className={styles.songRowLocked}>
                      <span className={styles.trackNum}>
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className={styles.lockedIcon}>🔒</span>
                      <span className={styles.lockedLabel}>- - -</span>
                    </div>
                  );
                }

                // ── Unlocked songs ─────────────────────────────────────
                return (
                  <button
                    key={song.id}
                    className={[
                      styles.songRow,
                      solved   ? styles.songSolved : "",
                      isActive ? styles.songActive : "",
                    ].filter(Boolean).join(" ")}
                    onClick={() => handleSelect(song)}
                  >
                    {isActive && <div className={styles.activeBar} />}
                    <span className={styles.trackNum}>
                      {isActive && isPlaying
                        ? <span className={styles.playingDot} />
                        : String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.songEmoji}>{revealed ? song.emoji : "🎵"}</span>
                    <div className={styles.songInfo}>
                      <span className={styles.songTitle}>{revealed ? song.title : "????"}</span>
                      <span className={styles.songArtist}>{revealed ? song.artist : "????"}</span>
                    </div>
                    <span className={styles.songAlbum}>{revealed ? song.subtitle : "???? · ????"}</span>
                    <span className={styles.songBadge}>
                      {solved
                        ? <span className={styles.letterBadge}>{collectedLetters[song.slot]}</span>
                        : <span className={styles.lockDot}>·</span>}
                    </span>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Right tube column */}
          <div className={styles.tubeCol}>
            {[...TUBE_COLORS].reverse().map((c, i) => (
              <div key={i} className={styles.tube}
                style={{ "--tc": c, "--td": `${i * 0.22}s` }} />
            ))}
          </div>

        </div>

        {/* ═══ CHROME TRIM ══════════════════════════════════════════ */}
        <div className={styles.chromeTrim} />

        {/* ═══ SPEAKER GRILLE ═══════════════════════════════════════ */}
        <div className={styles.grille}>
          <div className={styles.grilleInner}>
            {Array.from({ length: 11 }).map((_, i) => (
              <div key={i} className={styles.grilleBar} />
            ))}
          </div>
          {/* Speaker cone circles */}
          <div className={styles.speakerL}>
            <div className={styles.speakerCone} />
          </div>
          <div className={styles.speakerR}>
            <div className={styles.speakerCone} />
          </div>
        </div>

        {/* ═══ BASE ═════════════════════════════════════════════════ */}
        <div className={styles.base}>
          <div className={styles.basePanel} />
          <div className={styles.feet}>
            <div className={styles.foot} />
            <div className={styles.foot} />
          </div>
        </div>

      </div>
    </div>
  );
}
