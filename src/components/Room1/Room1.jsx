import { useState, useRef } from "react";
import IntroTypewriter from "./IntroTypewriter";
import AlibiPuzzle from "./puzzles/AlibiPuzzle";
import TimelinePuzzle from "./puzzles/TimelinePuzzle";
import StatementPuzzle from "./puzzles/StatementPuzzle";
import ReceiptPuzzle from "./puzzles/ReceiptPuzzle";
import LetterBoard from "./LetterBoard";
import LockBox from "./LockBox";
import {
  CASE_INTRO,
  CASE_INTRO_BUTTON,
  characters,
  evidence,
  timeline,
  SOLUTION_TEXT,
  EPILOG,
  NEXT_ROOM_HINT,
} from "../../data/room1Data";

// ─── Injected CSS ─────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;600;700&family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap');

  * { box-sizing: border-box; }

  @keyframes r1FadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes r1FadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes r1SlideDown {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes r1GlowBorder {
    0%,100% { box-shadow: 0 0 0 0 rgba(200,169,126,0); }
    50%     { box-shadow: 0 0 18px 2px rgba(200,169,126,0.18); }
  }
  @keyframes r1ScanLine {
    0%   { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }
  @keyframes r1Breathe {
    0%,100% { opacity: 0.6; }
    50%     { opacity: 1; }
  }

  .r1-root { font-family: 'Courier Prime', 'Courier New', monospace; }

  /* Tab buttons */
  .r1-tab { transition: color 0.2s, background 0.2s; }
  .r1-tab:hover { color: #c8a97e !important; background: rgba(200,169,126,0.04) !important; }

  /* Character cards */
  .r1-char { transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s; cursor: pointer; }
  .r1-char:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,0,0,0.5); }

  /* Evidence items */
  .r1-ev { transition: transform 0.2s, border-color 0.2s; cursor: pointer; }
  .r1-ev:hover { transform: translateY(-1px); border-color: rgba(200,169,126,0.3) !important; }

  /* Puzzle accordions */
  .r1-pacc-hdr { transition: background 0.2s; cursor: pointer; }
  .r1-pacc-hdr:hover { background: #1a160f !important; }

  /* Primary CTA */
  .r1-cta { transition: background 0.2s, color 0.2s, border-color 0.2s; }
  .r1-cta:hover:not(:disabled) { background: #c8a97e !important; color: #090807 !important; border-color: #c8a97e !important; }

  /* Outline btn */
  .r1-outline { transition: border-color 0.2s, color 0.2s; }
  .r1-outline:hover:not(:disabled) { border-color: #c8a97e !important; color: #c8a97e !important; }

  /* Animate-in utility */
  .r1-in  { animation: r1FadeUp 0.45s ease both; }
  .r1-in2 { animation: r1FadeUp 0.45s 0.08s ease both; }
  .r1-in3 { animation: r1FadeUp 0.45s 0.16s ease both; }
  .r1-in4 { animation: r1FadeUp 0.45s 0.24s ease both; }
  .r1-in5 { animation: r1FadeUp 0.45s 0.32s ease both; }
  .r1-in6 { animation: r1FadeUp 0.45s 0.40s ease both; }

  /* Staggered list */
  .r1-list > *:nth-child(1) { animation: r1FadeUp 0.4s 0.00s ease both; }
  .r1-list > *:nth-child(2) { animation: r1FadeUp 0.4s 0.07s ease both; }
  .r1-list > *:nth-child(3) { animation: r1FadeUp 0.4s 0.14s ease both; }
  .r1-list > *:nth-child(4) { animation: r1FadeUp 0.4s 0.21s ease both; }
  .r1-list > *:nth-child(5) { animation: r1FadeUp 0.4s 0.28s ease both; }
  .r1-list > *:nth-child(6) { animation: r1FadeUp 0.4s 0.35s ease both; }
  .r1-list > *:nth-child(7) { animation: r1FadeUp 0.4s 0.42s ease both; }
  .r1-list > *:nth-child(8) { animation: r1FadeUp 0.4s 0.49s ease both; }
  .r1-list > *:nth-child(9) { animation: r1FadeUp 0.4s 0.56s ease both; }
  .r1-list > *:nth-child(10){ animation: r1FadeUp 0.4s 0.63s ease both; }
  .r1-list > *:nth-child(11){ animation: r1FadeUp 0.4s 0.70s ease both; }
  .r1-list > *:nth-child(12){ animation: r1FadeUp 0.4s 0.77s ease both; }

  /* Secret reveal */
  .r1-secret { animation: r1SlideDown 0.3s ease both; }

  /* Glow on active letter slot */
  .r1-letter-glow { animation: r1GlowBorder 2.5s ease infinite; }

  /* Scanline overlay */
  .r1-scanline::after {
    content: '';
    position: fixed;
    inset: 0;
    background: repeating-linear-gradient(
      to bottom,
      transparent 0px,
      transparent 3px,
      rgba(0,0,0,0.06) 3px,
      rgba(0,0,0,0.06) 4px
    );
    pointer-events: none;
    z-index: 0;
  }

  /* Danger pip */
  .r1-pip { display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: #8b3a3a; margin-right: 3px; }

  /* Timeline dot glow */
  .r1-dot-crime  { animation: r1Breathe 3s ease infinite; }
  .r1-dot-key    { animation: r1Breathe 2.5s 0.5s ease infinite; }
  .r1-dot-now    { animation: r1GlowBorder 2s ease infinite; }

  /* Solved puzzle header */
  .r1-pacc-solved { border-color: #2a3a2a !important; background: #0d110d !important; }

  /* Scrollbar */
  .r1-root ::-webkit-scrollbar { width: 6px; height: 6px; }
  .r1-root ::-webkit-scrollbar-track { background: #0a0807; }
  .r1-root ::-webkit-scrollbar-thumb { background: #2a2218; border-radius: 3px; }
  .r1-root ::-webkit-scrollbar-thumb:hover { background: #3a3228; }
`;

// ─── Timeline colours ─────────────────────────────────────────
const TL_COLORS = {
  crime:   { dot: "#8b3a3a", text: "#9a6a5a", cls: "r1-dot-crime"   },
  key:     { dot: "#c8a97e", text: "#b8a878", cls: "r1-dot-key"     },
  neutral: { dot: "#3a3028", text: "#7a6a52", cls: ""                },
  irony:   { dot: "#6a5a8a", text: "#8a7aaa", cls: ""                },
  now:     { dot: "#3a6a8a", text: "#6a9aaa", cls: "r1-dot-now"     },
};

const PUZZLES = [
  { id: "alibi",      label: "Alibi-Prufung",    letter: "G" },
  { id: "timeline",   label: "Die Tatnacht",      letter: "I" },
  { id: "statements", label: "Das Insiderwissen", letter: "F" },
  { id: "receipt",    label: "Das Apothekenbuch", letter: "T" },
];

// ─────────────────────────────────────────────────────────────
export default function Room1({ onComplete }) {
  const [phase, setPhase]                 = useState("intro");
  const [activeTab, setActiveTab]         = useState("akte");
  const [selectedChar, setSelectedChar]   = useState(null);
  const [selectedEv, setSelectedEv]       = useState(null);
  const [solved, setSolved]               = useState({ alibi: false, timeline: false, statements: false, receipt: false });
  const [collectedLetters, setCollectedLetters] = useState([]);
  const solvedRef = useRef({ alibi: false, timeline: false, statements: false, receipt: false });

  function handleSolvePuzzle(id, letter) {
    if (solvedRef.current[id]) return;
    solvedRef.current = { ...solvedRef.current, [id]: true };
    setSolved(s => ({ ...s, [id]: true }));
    setCollectedLetters(l => [...l, letter]);
  }

  const TABS = [
    { id: "akte",     label: "Akte"         },
    { id: "chars",    label: "Verdachtige"  },
    { id: "beweise",  label: "Beweise"      },
    { id: "zeitstr",  label: "Zeitstrahl"   },
    { id: "ratsel",   label: "Ratsel",      badge: `${Object.values(solved).filter(Boolean).length}/4` },
    { id: "box",      label: "Beweisbox"    },
  ];

  // ── Intro ────────────────────────────────────────────────────
  if (phase === "intro") {
    return <IntroTypewriter lines={CASE_INTRO} buttonLabel={CASE_INTRO_BUTTON} onDone={() => setPhase("game")} />;
  }

  // ── Solved screen ────────────────────────────────────────────
  if (phase === "solved") {
    return (
      <>
        <style>{STYLES}</style>
        <div className="r1-root r1-scanline" style={{ minHeight:"100vh", background:"#090807", display:"flex", alignItems:"center", justifyContent:"center", padding:"40px 24px" }}>
          <div style={{ maxWidth:"640px", width:"100%", animation:"r1FadeUp 0.6s ease both" }}>
            {/* Stamp */}
            <div style={{ textAlign:"center", marginBottom:"32px" }}>
              <span style={{ fontFamily:"Oswald", fontSize:"10px", letterSpacing:"6px", color:"#3a6a3a", border:"1px solid #2a4a2a", padding:"4px 16px", textTransform:"uppercase" }}>
                Fall geloest
              </span>
            </div>
            {/* Solution */}
            <div style={{ background:"#111009", border:"1px solid #2a2218", borderLeft:"3px solid #c8a97e", padding:"28px 32px", marginBottom:"20px" }}>
              <div style={{ fontFamily:"Oswald", fontSize:"9px", letterSpacing:"4px", color:"#6b5e4a", marginBottom:"20px", textTransform:"uppercase" }}>
                Vollstandige Auflosung
              </div>
              {SOLUTION_TEXT.split("\n\n").map((p, i) => (
                <p key={i} style={{ fontFamily:"'Courier Prime', monospace", fontSize:"13px", lineHeight:"1.9", color:"#b8a888", margin:"0 0 16px 0" }}>{p}</p>
              ))}
            </div>
            {/* Epilog */}
            <div style={{ background:"#0d0908", border:"1px solid #2a1810", padding:"24px 32px", marginBottom:"28px", borderLeft:"3px solid #8b3a3a" }}>
              <div style={{ fontFamily:"Oswald", fontSize:"9px", letterSpacing:"4px", color:"#5a3a3a", marginBottom:"16px", textTransform:"uppercase" }}>Epilog</div>
              {EPILOG.split("\n").map((line, i) => (
                <p key={i} style={{ fontFamily:"'Courier Prime', monospace", fontStyle:"italic", fontSize:"14px", color:"#8a5a5a", margin:"0 0 6px 0", lineHeight:"1.8" }}>{line}</p>
              ))}
            </div>
            <p style={{ fontFamily:"'Courier Prime', monospace", fontSize:"12px", color:"#3a3028", textAlign:"center", marginBottom:"28px", letterSpacing:"1px" }}>
              {NEXT_ROOM_HINT}
            </p>
            <div style={{ textAlign:"center" }}>
              <button className="r1-cta" onClick={onComplete} style={{
                fontFamily:"Oswald", fontSize:"12px", letterSpacing:"4px", textTransform:"uppercase",
                background:"transparent", border:"1px solid #c8a97e", color:"#c8a97e",
                padding:"14px 48px", cursor:"pointer",
              }}>
                Weiter &rarr;
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── Game ─────────────────────────────────────────────────────
  return (
    <>
      <style>{STYLES}</style>
      <div className="r1-root r1-scanline" style={{ minHeight:"100vh", background:"#090807", color:"#d4c9b0", position:"relative" }}>

        {/* ════ HEADER ════════════════════════════════════════ */}
        <header style={{ borderBottom:"1px solid #1e1912", background:"#0c0a08", position:"relative", overflow:"hidden" }}>
          {/* Subtle gradient accent line at top */}
          <div style={{ position:"absolute", top:0, left:0, right:0, height:"2px", background:"linear-gradient(90deg, transparent, #c8a97e44, #8b3a3a66, transparent)" }} />

          <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"20px 32px 0", display:"flex", alignItems:"flex-start", gap:"24px", flexWrap:"wrap" }}>
            {/* Left: case info */}
            <div style={{ flex:1, minWidth:"260px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"8px" }}>
                <span style={{ fontFamily:"Oswald", fontSize:"9px", letterSpacing:"5px", color:"#3a3028", textTransform:"uppercase" }}>
                  Kriminalakte
                </span>
                <span style={{ fontFamily:"Oswald", fontSize:"9px", letterSpacing:"3px", color:"#8b3a3a44", border:"1px solid #8b3a3a33", padding:"2px 6px", textTransform:"uppercase" }}>
                  Ungeloest
                </span>
              </div>
              <h1 style={{ fontFamily:"Oswald", fontWeight:700, fontSize:"clamp(20px, 3vw, 30px)", color:"#c8a97e", letterSpacing:"2px", margin:"0 0 4px 0", textTransform:"uppercase" }}>
                Das Schweigen von Eibenbach
              </h1>
              <div style={{ fontFamily:"'Courier Prime', monospace", fontSize:"11px", color:"#3a3028", letterSpacing:"2px" }}>
                Cold Case &middot; Oktober 1991 &middot; Schwarzwald
              </div>
            </div>

            {/* Right: letter board */}
            <div style={{ paddingTop:"4px" }}>
              <LetterBoard collected={collectedLetters} letters={["G","I","F","T"]} />
            </div>
          </div>

          {/* Tab bar */}
          <nav style={{ maxWidth:"1100px", margin:"0 auto", padding:"0 32px", display:"flex", gap:"0", overflowX:"auto" }}>
            {TABS.map(tab => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  className="r1-tab"
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    fontFamily:"Oswald", fontSize:"11px", letterSpacing:"2.5px", textTransform:"uppercase",
                    background:"none", border:"none", cursor:"pointer", padding:"14px 18px 12px",
                    color: active ? "#c8a97e" : "#3a3028",
                    borderBottom: active ? "2px solid #c8a97e" : "2px solid transparent",
                    position:"relative", whiteSpace:"nowrap", display:"flex", alignItems:"center", gap:"8px",
                  }}
                >
                  {tab.label}
                  {tab.badge && (
                    <span style={{
                      fontFamily:"'Courier Prime', monospace", fontSize:"9px",
                      color: active ? "#c8a97e99" : "#3a3028",
                      letterSpacing:"0",
                    }}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </header>

        {/* ════ CONTENT ═══════════════════════════════════════ */}
        <main style={{ maxWidth:"1100px", margin:"0 auto", padding:"36px 32px 64px" }}>

          {/* ── AKTE ──────────────────────────────────────── */}
          {activeTab === "akte" && (
            <div>
              {/* Section heading */}
              <SectionHeading>Fallubersicht &amp; Auftrag</SectionHeading>

              <div style={{ display:"grid", gridTemplateColumns:"1fr minmax(220px, 320px)", gap:"20px", alignItems:"start" }}>
                {/* Mission brief */}
                <div className="r1-in" style={{ background:"#111009", border:"1px solid #1e1912", borderLeft:"3px solid #c8a97e" }}>
                  <div style={{ padding:"14px 20px 10px", borderBottom:"1px solid #1a1810", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <span style={{ fontFamily:"Oswald", fontSize:"9px", letterSpacing:"4px", color:"#6b5e4a", textTransform:"uppercase" }}>Aufgabe</span>
                    <span style={{ fontFamily:"Oswald", fontSize:"8px", letterSpacing:"2px", color:"#8b3a3a", border:"1px solid #8b3a3a44", padding:"2px 6px", transform:"rotate(1deg)", display:"inline-block" }}>
                      Vertraulich
                    </span>
                  </div>
                  <div style={{ padding:"20px 24px", fontFamily:"'Courier Prime', monospace", fontSize:"13.5px", lineHeight:"2", color:"#b8a888", fontStyle:"italic" }}>
                    Du bist <strong style={{ color:"#c8a97e", fontStyle:"normal" }}>Vera Voss</strong>, 38 Jahre alt. Letzte Woche hast du das alte Haus deiner Mutter geerbt - ein Haus, das du nie kanntest.
                    <br /><br />
                    Deine Mutter <strong style={{ color:"#c8a97e", fontStyle:"normal" }}>Clara Voss</strong> starb, als du funf Jahre alt warst. Offiziell: Unfall. Sie soll im Dorfteich von Eibenbach ertrunken sein, am fruhen Morgen des{" "}
                    <strong style={{ color:"#8b3a3a", fontStyle:"normal" }}>14. Oktober 1991</strong>. Du kamst ins Waisenhaus. Niemand hat je mit dir uber sie gesprochen.
                    <br /><br />
                    Als du das Haus betrittst, findest du hinter einem losen Dielenbrett eine alte Blechdose.
                    <br /><br />
                    Du hast <strong style={{ color:"#c8a97e", fontStyle:"normal" }}>90 Minuten</strong>, bevor der Notar das Haus versiegelt. Finde heraus, was mit Clara Voss wirklich passiert ist.
                  </div>
                </div>

                {/* Case stats */}
                <div className="r1-in2" style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
                  {[
                    { label:"Schauplatz",   value:"Eibenbach, Schwarzwald" },
                    { label:"Zeitraum",     value:"1991 - 2024" },
                    { label:"Verdachtige",  value:"5 Personen" },
                    { label:"Beweise",      value:"6 Fundstuecke" },
                    { label:"Schwierigkeit",value:"Hoch - 3 Ebenen" },
                    { label:"Losungswort",  value:"4 Buchstaben" },
                  ].map(item => (
                    <div key={item.label} style={{ background:"#111009", border:"1px solid #1a1812", padding:"12px 16px", display:"flex", justifyContent:"space-between", alignItems:"baseline", gap:"12px" }}>
                      <span style={{ fontFamily:"Oswald", fontSize:"9px", letterSpacing:"2px", color:"#3a3028", textTransform:"uppercase", flexShrink:0 }}>{item.label}</span>
                      <span style={{ fontFamily:"'Courier Prime', monospace", fontSize:"13px", color:"#8a7a5a", textAlign:"right" }}>{item.value}</span>
                    </div>
                  ))}

                  {/* Instructions box */}
                  <div style={{ marginTop:"8px", background:"#0d0b09", border:"1px solid #1a1812", borderLeft:"2px solid #3a3028", padding:"14px 16px" }}>
                    <div style={{ fontFamily:"Oswald", fontSize:"9px", letterSpacing:"3px", color:"#3a3028", marginBottom:"10px", textTransform:"uppercase" }}>Vorgehensweise</div>
                    {[
                      "Studiere die Akte und Verdachtigen",
                      "Sichte alle 6 Beweise",
                      "Lose alle 4 Ratsel",
                      "Gib das Losungswort ein",
                    ].map((step, i) => (
                      <div key={i} style={{ display:"flex", gap:"10px", marginBottom:"6px", alignItems:"flex-start" }}>
                        <span style={{ fontFamily:"Oswald", fontSize:"10px", color:"#c8a97e44", minWidth:"16px" }}>{i + 1}.</span>
                        <span style={{ fontFamily:"'Courier Prime', monospace", fontSize:"12px", color:"#6a5a42", lineHeight:"1.5" }}>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── VERDACHTIGE ───────────────────────────────── */}
          {activeTab === "chars" && (
            <div>
              <SectionHeading>Verdachtige &amp; Beteiligte</SectionHeading>
              <div className="r1-list" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(340px, 1fr))", gap:"12px" }}>
                {characters.map(char => (
                  <CharCard
                    key={char.id}
                    char={char}
                    open={selectedChar?.id === char.id}
                    onToggle={() => setSelectedChar(selectedChar?.id === char.id ? null : char)}
                    allSolved={Object.values(solved).every(Boolean)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── BEWEISE ───────────────────────────────────── */}
          {activeTab === "beweise" && (
            <div>
              <SectionHeading>Gesicherte Beweise</SectionHeading>
              <div className="r1-list" style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
                {evidence.map(ev => (
                  <EvidenceItem
                    key={ev.id}
                    ev={ev}
                    open={selectedEv?.id === ev.id}
                    onToggle={() => setSelectedEv(selectedEv?.id === ev.id ? null : ev)}
                    allSolved={Object.values(solved).every(Boolean)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── ZEITSTRAHL ────────────────────────────────── */}
          {activeTab === "zeitstr" && (
            <div>
              <SectionHeading>Chronologie</SectionHeading>
              <div style={{ position:"relative", paddingLeft:"148px" }}>
                {/* Vertical line */}
                <div style={{ position:"absolute", left:"130px", top:"8px", bottom:"8px", width:"1px", background:"linear-gradient(to bottom, transparent, #2a2218 8%, #2a2218 92%, transparent)" }} />

                <div className="r1-list">
                  {timeline.map((item, i) => {
                    const allSolved = Object.values(solved).every(Boolean);
                    const isHidden = !allSolved && (item.type === "crime" || item.type === "irony");
                    const c = isHidden
                      ? { dot: "#2a2218", text: "#2a2218", cls: "" }
                      : TL_COLORS[item.type] || TL_COLORS.neutral;
                    return (
                      <div key={i} style={{ display:"flex", gap:"0", marginBottom:"18px", position:"relative", alignItems:"flex-start" }}>
                        {/* Year */}
                        <div style={{ position:"absolute", left:"-148px", width:"130px", textAlign:"right", paddingRight:"24px", paddingTop:"1px" }}>
                          <span style={{ fontFamily:"Oswald", fontSize:"11px", color: isHidden ? "#2a2218" : "#3a3028", letterSpacing:"1px" }}>
                            {isHidden ? "???" : item.year}
                          </span>
                        </div>
                        {/* Dot */}
                        <div className={c.cls} style={{
                          position:"absolute", left:"-18px",
                          width: item.type === "now" ? "11px" : "9px",
                          height: item.type === "now" ? "11px" : "9px",
                          borderRadius:"50%",
                          background: c.dot,
                          marginTop:"4px",
                          flexShrink:0, zIndex:1,
                          boxShadow: isHidden ? "none" : `0 0 10px ${c.dot}88`,
                          border: item.type === "now" ? `2px solid ${c.dot}` : "none",
                          outline: item.type === "now" ? `3px solid ${c.dot}33` : "none",
                        }} />
                        {/* Event */}
                        <div style={{
                          fontFamily:"'Courier Prime', monospace", fontSize:"13px", lineHeight:"1.75",
                          color: c.text,
                          paddingLeft: item.type === "now" ? "14px" : "0",
                          borderLeft: item.type === "now" ? `1px solid #3a6a8a44` : "none",
                          paddingBottom: item.type === "now" ? "8px" : "0",
                          letterSpacing: isHidden ? "0.15em" : "normal",
                          userSelect: isHidden ? "none" : "auto",
                        }}>
                          {isHidden ? "█ █████ █████████ - [ AKTE GESPERRT ]" : item.event}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Legend */}
                <div style={{ marginTop:"32px", paddingTop:"20px", borderTop:"1px solid #1a1812", display:"flex", flexWrap:"wrap", gap:"16px" }}>
                  {[
                    { type:"crime",   label:"Verbrechen"       },
                    { type:"key",     label:"Schlusselereignis" },
                    { type:"neutral", label:"Hintergrund"       },
                    { type:"irony",   label:"Bittere Ironie"    },
                    { type:"now",     label:"Gegenwart"         },
                  ].map(l => (
                    <div key={l.type} style={{ display:"flex", alignItems:"center", gap:"7px" }}>
                      <div style={{ width:"7px", height:"7px", borderRadius:"50%", background: TL_COLORS[l.type].dot, flexShrink:0 }} />
                      <span style={{ fontFamily:"Oswald", fontSize:"9px", letterSpacing:"2px", color:"#3a3028", textTransform:"uppercase" }}>{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── RATSEL ────────────────────────────────────── */}
          {activeTab === "ratsel" && (
            <div>
              <SectionHeading>Ratsel</SectionHeading>

              {/* Progress bar */}
              <div style={{ marginBottom:"28px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"6px" }}>
                  <span style={{ fontFamily:"Oswald", fontSize:"9px", letterSpacing:"3px", color:"#3a3028", textTransform:"uppercase" }}>Fortschritt</span>
                  <span style={{ fontFamily:"'Courier Prime', monospace", fontSize:"11px", color:"#6b5e4a" }}>
                    {Object.values(solved).filter(Boolean).length} von 4 geloest
                  </span>
                </div>
                <div style={{ height:"2px", background:"#1a1812", borderRadius:"1px" }}>
                  <div style={{
                    height:"100%", borderRadius:"1px",
                    background:"linear-gradient(90deg, #8b3a3a, #c8a97e)",
                    width:`${Object.values(solved).filter(Boolean).length * 25}%`,
                    transition:"width 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow:"0 0 8px #c8a97e66",
                  }} />
                </div>
              </div>

              <div className="r1-list" style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
                {PUZZLES.map(p => (
                  <PuzzleAccordion
                    key={p.id}
                    puzzle={p}
                    isSolved={solved[p.id]}
                    collected={collectedLetters.includes(p.letter)}
                  >
                    {p.id === "alibi"      && <AlibiPuzzle      onSolve={l => handleSolvePuzzle("alibi",      l)} solved={solved.alibi}      />}
                    {p.id === "timeline"   && <TimelinePuzzle   onSolve={l => handleSolvePuzzle("timeline",   l)} solved={solved.timeline}   />}
                    {p.id === "statements" && <StatementPuzzle  onSolve={l => handleSolvePuzzle("statements", l)} solved={solved.statements} />}
                    {p.id === "receipt"    && <ReceiptPuzzle    onSolve={l => handleSolvePuzzle("receipt",    l)} solved={solved.receipt}    />}
                  </PuzzleAccordion>
                ))}
              </div>
            </div>
          )}

          {/* ── BEWEISBOX ─────────────────────────────────── */}
          {activeTab === "box" && (
            <div>
              <SectionHeading>Beweisbox</SectionHeading>
              <div className="r1-in" style={{ maxWidth:"480px", margin:"0 auto" }}>
                {/* Instruction */}
                <div style={{ background:"#111009", border:"1px solid #1a1812", borderLeft:"3px solid #2a2218", padding:"16px 20px", marginBottom:"20px" }}>
                  <p style={{ fontFamily:"'Courier Prime', monospace", fontSize:"12.5px", color:"#5a4a38", margin:0, lineHeight:"1.7", fontStyle:"italic" }}>
                    Jedes geloeste Ratsel enthullt einen Buchstaben. Sammle alle vier und gib das Losungswort ein.
                    Das Wort beschreibt die Tatwaffe.
                  </p>
                </div>
                <LockBox collectedLetters={collectedLetters} onUnlock={() => setPhase("solved")} />
              </div>
            </div>
          )}

        </main>
      </div>
    </>
  );
}

// ═══ Sub-components ══════════════════════════════════════════

function SectionHeading({ children }) {
  return (
    <div className="r1-in" style={{ display:"flex", alignItems:"center", gap:"16px", marginBottom:"24px" }}>
      <h2 style={{ fontFamily:"Oswald", fontSize:"11px", letterSpacing:"4px", color:"#3a3028", textTransform:"uppercase", margin:0 }}>
        {children}
      </h2>
      <div style={{ flex:1, height:"1px", background:"linear-gradient(90deg, #1e1812, transparent)" }} />
    </div>
  );
}

function CharCard({ char, open, onToggle, allSolved }) {
  return (
    <div className="r1-char" onClick={onToggle} style={{
      background:"#0f0d0b",
      border:`1px solid ${open ? char.color + "66" : "#1a1812"}`,
      position:"relative", overflow:"hidden",
    }}>
      {/* Top colour accent */}
      <div style={{ height:"2px", background:`linear-gradient(90deg, ${char.color}88, transparent)`, width:"100%" }} />

      <div style={{ padding:"18px 20px" }}>
        {/* Header row */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"12px" }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"4px" }}>
              <span style={{ color: char.color, fontSize:"14px" }}>{char.icon}</span>
              <span style={{ fontFamily:"Oswald", fontSize:"16px", fontWeight:600, color: char.color, letterSpacing:"1px" }}>
                {char.name}
              </span>
              {allSolved && char.verdict && (
                <span style={{
                  fontFamily:"Oswald", fontSize:"8px", letterSpacing:"2px", padding:"2px 7px",
                  background: char.verdict === "TÄTERIN" || char.verdict === "KOMPLIZE" ? "#2a0a0a" : "#0a130a",
                  color: char.verdict === "TÄTERIN" || char.verdict === "KOMPLIZE" ? "#c84040" : "#4a8a4a",
                  border: `1px solid ${char.verdict === "TÄTERIN" || char.verdict === "KOMPLIZE" ? "#5a1a1a" : "#1a3a1a"}`,
                  textTransform:"uppercase",
                }}>
                  {char.verdict}
                </span>
              )}
            </div>
            <div style={{ fontFamily:"Oswald", fontSize:"9px", letterSpacing:"3px", color:"#3a3028", textTransform:"uppercase" }}>
              {char.role} &nbsp;&middot;&nbsp; {char.age}
            </div>
          </div>

          <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:"6px" }}>
            <span style={{
              fontFamily:"Oswald", fontSize:"9px", letterSpacing:"2px", padding:"3px 8px",
              background: char.status === "lebt" ? "#0d1a0d" : "#130808",
              color: char.status === "lebt" ? "#4a8a4a" : "#6a3a3a",
              border:`1px solid ${char.status === "lebt" ? "#1a3a1a" : "#2a1010"}`,
            }}>
              {char.status === "lebt" ? "LEBT" : "TOT"}
            </span>
            {open && <span style={{ fontFamily:"Oswald", fontSize:"8px", letterSpacing:"2px", color:"#3a3028" }}>▲ schliessen</span>}
            {!open && <span style={{ fontFamily:"Oswald", fontSize:"8px", letterSpacing:"2px", color:"#3a3028" }}>▼ details</span>}
          </div>
        </div>

        {/* Summary */}
        <p style={{ fontFamily:"'Courier Prime', monospace", fontSize:"13px", lineHeight:"1.7", color:"#6a5a42", margin:"0" }}>
          {char.summary}
        </p>

        {/* Secret panel */}
        {open && (
          <div className="r1-secret" style={{ marginTop:"16px" }}>
            <div style={{ height:"1px", background:`linear-gradient(90deg, ${char.color}44, transparent)`, marginBottom:"14px" }} />
            <div style={{ background:"#0a0908", borderLeft:`2px solid ${allSolved ? char.color : "#2a2218"}`, padding:"14px 16px" }}>
              <div style={{ fontFamily:"Oswald", fontSize:"8px", letterSpacing:"4px", color:"#3a3028", marginBottom:"10px", textTransform:"uppercase" }}>
                {allSolved ? "Ermittlungsergebnis" : "Akte gesperrt"}
              </div>
              {allSolved ? (
                <>
                  <p style={{ fontFamily:"'Courier Prime', monospace", fontSize:"13px", lineHeight:"1.8", color: char.color, margin:"0" }}>
                    {char.secret}
                  </p>
                  {char.danger > 0 && (
                    <div style={{ marginTop:"12px", display:"flex", alignItems:"center", gap:"6px" }}>
                      <div style={{ display:"flex", gap:"3px" }}>
                        {Array.from({ length: char.danger }).map((_, i) => (
                          <span key={i} className="r1-pip" />
                        ))}
                      </div>
                      <span style={{ fontFamily:"Oswald", fontSize:"9px", letterSpacing:"3px", color:"#8b3a3a", textTransform:"uppercase" }}>Gefährlich</span>
                    </div>
                  )}
                </>
              ) : (
                <p style={{ fontFamily:"'Courier Prime', monospace", fontSize:"12px", lineHeight:"1.7", color:"#3a3028", margin:"0", fontStyle:"italic" }}>
                  [ ZUGANG VERWEIGERT - Löse alle vier Rätsel, um die vollständige Akte freizuschalten ]
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function EvidenceItem({ ev, open, onToggle, allSolved }) {
  return (
    <div className="r1-ev" onClick={onToggle} style={{
      background:"#0f0d0b",
      border:`1px solid ${open ? "#c8a97e44" : "#1a1812"}`,
      display:"flex", gap:"0", overflow:"hidden",
    }}>
      {/* Number tag */}
      <div style={{
        width:"52px", flexShrink:0,
        background: open ? "#1a1510" : "#0d0b09",
        borderRight:`1px solid ${open ? "#2a2218" : "#1a1812"}`,
        display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
        padding:"16px 0", gap:"8px",
        transition:"background 0.2s",
      }}>
        <span style={{ fontSize:"18px" }}>{ev.icon}</span>
        <span style={{ fontFamily:"Oswald", fontWeight:700, fontSize:"16px", color:"#c8a97e44" }}>
          {String(ev.id).padStart(2, "0")}
        </span>
      </div>

      {/* Content */}
      <div style={{ flex:1, padding:"16px 20px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:"8px" }}>
          <div>
            <div style={{ fontFamily:"Oswald", fontSize:"14px", color:"#c8a97e", letterSpacing:"1px", marginBottom:"3px" }}>
              {ev.name}
            </div>
            <div style={{ fontFamily:"Oswald", fontSize:"9px", letterSpacing:"2px", color:"#3a3028", textTransform:"uppercase" }}>
              Gefunden: {ev.location}
            </div>
          </div>
          <span style={{ fontFamily:"Oswald", fontSize:"9px", letterSpacing:"2px", color:"#2a2218", textTransform:"uppercase" }}>
            {open ? "▲" : "▼"}
          </span>
        </div>

        {open && (
          <div className="r1-secret" style={{ marginTop:"14px", paddingTop:"14px", borderTop:"1px solid #1a1812" }}>
            <p style={{ fontFamily:"'Courier Prime', monospace", fontSize:"13px", lineHeight:"1.8", color:"#6a5a42", margin:"0 0 12px 0" }}>
              {ev.content}
            </p>

            {/* Clue + Twist - nur nach Lösung aller Rätsel */}
            {allSolved ? (
              <>
                <div style={{ background:"#0a0908", borderLeft:"2px solid #6b5e4a", padding:"12px 14px", marginBottom: ev.twist ? "10px" : "0" }}>
                  <span style={{ fontFamily:"Oswald", fontSize:"9px", letterSpacing:"3px", color:"#4a3a28", textTransform:"uppercase", display:"block", marginBottom:"6px" }}>Ermittlungshinweis</span>
                  <p style={{ fontFamily:"'Courier Prime', monospace", fontSize:"13px", color:"#c8a97e", lineHeight:"1.7", margin:0 }}>
                    {ev.clue}
                  </p>
                </div>
                {ev.twist && (
                  <div style={{ background:"#0d0808", borderLeft:"2px solid #8b3a3a", padding:"12px 14px", marginTop:"8px" }}>
                    <span style={{ fontFamily:"Oswald", fontSize:"9px", letterSpacing:"3px", color:"#5a2a2a", textTransform:"uppercase", display:"block", marginBottom:"6px" }}>Enthüllung</span>
                    <p style={{ fontFamily:"'Courier Prime', monospace", fontSize:"12px", color:"#8b5a5a", lineHeight:"1.7", margin:0 }}>
                      {ev.twist}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div style={{ background:"#0a0908", borderLeft:"2px solid #2a2218", padding:"12px 14px" }}>
                <span style={{ fontFamily:"Oswald", fontSize:"9px", letterSpacing:"3px", color:"#2a2218", textTransform:"uppercase", display:"block", marginBottom:"6px" }}>Analyse gesperrt</span>
                <p style={{ fontFamily:"'Courier Prime', monospace", fontSize:"12px", color:"#2a2218", lineHeight:"1.7", margin:0, fontStyle:"italic" }}>
                  [ Löse alle vier Rätsel, um die Ermittlungsanalyse freizuschalten ]
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function PuzzleAccordion({ puzzle, isSolved, collected, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={isSolved ? "r1-pacc-solved" : ""} style={{
      border:`1px solid ${isSolved ? "#1a3a1a" : "#1a1812"}`,
      background: isSolved ? "#0a0f0a" : "#0f0d0b",
      overflow:"hidden",
    }}>
      <button
        className="r1-pacc-hdr"
        onClick={() => setOpen(v => !v)}
        style={{
          width:"100%", background:"none", border:"none", cursor:"pointer",
          padding:"16px 20px", display:"flex", alignItems:"center", gap:"16px",
          fontFamily:"inherit",
        }}
      >
        {/* Letter slot */}
        <div style={{
          width:"32px", height:"32px", flexShrink:0,
          display:"flex", alignItems:"center", justifyContent:"center",
          border:`1px solid ${collected ? "#c8a97e66" : "#1e1812"}`,
          background: collected ? "#1a1510" : "transparent",
          fontFamily:"Oswald", fontSize:"16px", fontWeight:700,
          color: collected ? "#c8a97e" : "#2a2218",
          transition:"all 0.3s",
        }}>
          {collected ? puzzle.letter : "?"}
        </div>

        {/* Label */}
        <div style={{ flex:1, textAlign:"left" }}>
          <div style={{ fontFamily:"Oswald", fontSize:"12px", letterSpacing:"2px", color: isSolved ? "#4a8a4a" : "#7a6a52", textTransform:"uppercase" }}>
            {puzzle.label}
          </div>
        </div>

        {/* Solved badge */}
        {isSolved && (
          <span style={{ fontFamily:"Oswald", fontSize:"9px", letterSpacing:"3px", color:"#3a6a3a", border:"1px solid #1a3a1a", padding:"3px 8px", textTransform:"uppercase" }}>
            Geloest
          </span>
        )}

        <span style={{ fontFamily:"Oswald", fontSize:"10px", color:"#2a2218" }}>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div style={{ borderTop:"1px solid #1a1812" }}>
          {children}
        </div>
      )}
    </div>
  );
}
