import { useState } from "react";

const characters = [
  {
    id: "clara",
    name: "Clara Voss",
    role: "Opfer",
    age: "28 (†1991)",
    color: "#c8a97e",
    icon: "◈",
    status: "tot",
    summary: "Grundschullehrerin. Intelligent und unbequem. Entdeckte ein kriminelles Netzwerk – und bezahlte dafür mit dem Leben.",
    secret: "Besaß Beweise für Geldwäsche und Medikamentenschmuggel. Hatte eine Affäre mit Steuer, die sie abbrach.",
    danger: 0,
  },
  {
    id: "hedwig",
    name: "Hedwig Noll",
    role: "Gemeindeschwester",
    age: "61 (1991) · †2019",
    color: "#8b3a3a",
    icon: "◆",
    status: "tot",
    summary: "Die gute Seele des Dorfes. Backte für Feste. Kannte jeden. Betrieb seit 1979 einen illegalen Medikamentenschmuggel.",
    secret: "DIE MÖRDERIN. Betäubte Clara mit Chloralhydrat, ertränkte sie im Dorfteich. Ermordete auch Steuer 1993. Starb ungestraft 2019.",
    danger: 5,
  },
  {
    id: "albert",
    name: "Dr. Albert Noll",
    role: "Dorfarzt",
    age: "31 (1991) · heute 64",
    color: "#3a4e8b",
    icon: "◉",
    status: "lebt",
    summary: "Sohn von Hedwig. Praktiziert noch heute in Eibenbach. Hat Vera am ersten Tag bereits begrüßt.",
    secret: "KOMPLIZE. Beurkundete Claras Tod als Unfall, verhinderte die Obduktion. Hat eine Visitenkarte im Haus hinterlassen. Er weiß, dass du suchst.",
    danger: 5,
  },
  {
    id: "steuer",
    name: "Heinrich Steuer",
    role: "Bürgermeister",
    age: "52 (1991) · †1993",
    color: "#5a7a3a",
    icon: "◇",
    status: "tot",
    summary: "Respektierter Dorfpatriarch. Hatte eine Affäre mit Clara. Profitierte von Nolls Netzwerk. Schwieg.",
    secret: "Nicht der Täter – aber selbst ein Opfer. 1993 wurde er ermordet, als er mit dem Schweigen zu hadern begann. Kein Obduktionsbericht.",
    danger: 0,
  },
  {
    id: "thomas",
    name: "Thomas Brandt",
    role: "Nachbar · Tagelöhner",
    age: "34 (1991) · heute 67",
    color: "#7a6a3a",
    icon: "◌",
    status: "lebt",
    summary: "Alkoholiker. Laut. Unbeliebt. Der offensichtliche Verdächtige – und vollkommen unschuldig.",
    secret: "Fand Claras Leiche als Erster. Hat ihren Brief 33 Jahre lang versteckt gehalten. Weiß die Wahrheit. Hat Angst. Kann Vera helfen.",
    danger: 0,
  },
];

const evidence = [
  {
    id: 1,
    name: "Die Blechdose",
    icon: "📦",
    location: "Hinter dem Dielenbrett",
    content: "Ein unabgeschickter Brief + eine Liste mit drei Namen: H.S. – Holzrechnung Aug '91 / H.N. – Rezept Nr. 4471 / Teich – nicht allein",
    clue: "Kalenderblatt: 13. Oktober – ‚Hedwig – 20 Uhr'",
    code: null,
    twist: "Startpunkt. Drei Stränge, die aufgedröselt werden müssen.",
  },
  {
    id: 2,
    name: "Das Schultagebuch",
    icon: "📚",
    location: "Im Lehrerschrank",
    content: "Claras Klassenbuch 1990/91. Unterstrichene Einträge über sedierte Kinder. Auf der letzten Seite, verkehrt herum:",
    clue: "Rezeptnummer 4471 - verbindet sich mit der Liste aus der Dose",
    code: "4471",
    twist: null,
  },
  {
    id: 3,
    name: "Die Apothekenrechnung",
    icon: "🗂️",
    location: "Hinter dem Bilderrahmen",
    content: "Rechnung der ‚Dorf-Apotheke Noll' für ‚medizinische Spende ans Altenheim', August 1991. Das Altenheim existierte nie.",
    clue: "Unterschrieben von: Dr. A. Noll - nicht Hedwig, sondern Albert. Er war bereits 1991 involviert.",
    code: null,
    twist: "Albert Noll ist nicht nur ein Zeuge - er ist ein aktiver Täter.",
  },
  {
    id: 4,
    name: "Das Foto",
    icon: "📷",
    location: "In der Schublade",
    content: "Dorffest September 1991. Clara lacht, neben einer älteren Frau. Rückseite: ‚Mit H. – sie ist netter als ich dachte. Oder tut sie nur so?'",
    clue: "H. = Hedwig. Nicht Heinrich. Die Spielerin wird es zunächst falsch deuten.",
    code: null,
    twist: "Gezielte Falle: H. wirkt wie Heinrich (Steuer), ist aber Hedwig.",
  },
  {
    id: 5,
    name: "Der Zeitungsartikel",
    icon: "📰",
    location: "Im alten Koffer",
    content: "‚Bürgermeister Steuer nach kurzem Leiden verstorben', November 1993. Letzter Satz fast abgerissen:",
    clue: "‚...hinterlässt ein unlösliches Rätsel: Wo ist das Protokollbuch von 1991?'",
    code: "1310",
    twist: "Steuer ist nicht Täter - er ist das zweite Opfer.",
  },
  {
    id: 6,
    name: "Das Duplikat-Protokoll",
    icon: "🔑",
    location: "Hinter dem Kachelofen",
    content: "Claras handgeschriebene Kopie des Gemeindeprotokolls. Steuers Unterschrift unter fiktivem Holzverkauf. Apothekengenehmigung ohne Ausschreibung.",
    clue: "Letzter Eintrag: ‚Falls mir etwas passiert: Thomas weiß, wo der Brief ist. Geht zu Thomas.' + Visitenkarte von Dr. Albert Noll, frische Tinte: ‚Lass es ruhen, Vera.'",
    code: null,
    twist: "FINALE ENTHÜLLUNG. Albert war hier. Vor dir.",
  },
];

const timeline = [
  { year: "1979", event: "Hedwig Noll beginnt illegalen Medikamentenhandel", type: "crime" },
  { year: "1985", event: "Steuer wird Bürgermeister. Kooperation mit Hedwig beginnt.", type: "crime" },
  { year: "1988", event: "Clara Voss kommt als neue Lehrerin nach Eibenbach", type: "neutral" },
  { year: "1989", event: "Clara beginnt Affäre mit Steuer - bricht sie nach 4 Monaten ab", type: "neutral" },
  { year: "1990", event: "Clara bemerkt sedierte Kinder im Unterricht. Beginnt zu recherchieren.", type: "key" },
  { year: "März 1991", event: "Clara findet Beweise für Geldwäsche im Gemeindeprotokoll", type: "key" },
  { year: "Sep. 1991", event: "Clara schreibt den Brief. Gibt ihn Thomas zur Aufbewahrung.", type: "key" },
  { year: "13. Okt. 1991", event: "Hedwig lädt Clara zum ‚Versöhnungsgespräch'. Betäubt sie.", type: "crime" },
  { year: "14. Okt. 1991", event: "Clara tot im Dorfteich. Offiziell: Unfall. Albert beurkundet ohne Obduktion.", type: "crime" },
  { year: "1993", event: "Steuer stirbt an ‚Herzinfarkt'. Keine Obduktion. Protokollbuch verschwunden.", type: "crime" },
  { year: "2019", event: "Hedwig Noll stirbt. Geehrt und betrauert. Grabstein: ‚Sie gab, ohne zu nehmen.'", type: "irony" },
  { year: "2024", event: "Vera Voss betritt das Haus. Albert Noll beobachtet sie bereits.", type: "now" },
];

const twists = [
  {
    level: 1,
    title: "Die offensichtliche Falle",
    suspect: "Thomas Brandt",
    verdict: "FALSCH",
    explanation: "Er war am Tatort. Er hatte Streit mit Clara. Er ist der klassische Dorfaußenseiter. → Er ist unschuldig. Er hat Clara sogar versucht zu schützen.",
    color: "#8b3a3a33",
    border: "#8b3a3a",
  },
  {
    level: 2,
    title: "Die elegante Umleitung",
    suspect: "Heinrich Steuer",
    verdict: "FALSCH",
    explanation: "Affäre. Geldmotive. Politische Macht. 5 Alibi-Zeugen die lügen könnten. → Er hat gedeckt und profitiert - aber auch er wurde ermordet. Von derselben Person.",
    color: "#3a4e8b33",
    border: "#3a4e8b",
  },
  {
    level: 3,
    title: "Die echte Erkenntnis",
    suspect: "Hedwig Noll + Albert Noll",
    verdict: "TÄTER",
    explanation: "Die liebevolle Gemeindeschwester mit dem Schlüssel zur Apotheke. Zwei Morde. Ungestraft gestorben 2019. Ihr Sohn trägt das Schweigen weiter - und steht heute vor deiner Tür.",
    color: "#c8a97e33",
    border: "#c8a97e",
  },
];

export default function EibenbachCaseFile() {
  const [activeTab, setActiveTab] = useState("intro");
  const [selectedChar, setSelectedChar] = useState(null);
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const [revealedTwists, setRevealedTwists] = useState([]);
  const [revealSecret, setRevealSecret] = useState(false);

  const tabs = [
    { id: "intro", label: "Akte" },
    { id: "chars", label: "Verdächtige" },
    { id: "evidence", label: "Beweise" },
    { id: "timeline", label: "Zeitstrahl" },
    { id: "twists", label: "Twists" },
    { id: "solution", label: "Auflösung" },
  ];

  const revealTwist = (level) => {
    if (!revealedTwists.includes(level)) {
      setRevealedTwists([...revealedTwists, level]);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d0d0d",
      color: "#d4c9b0",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Grain overlay */}
      <div style={{
        position: "fixed", inset: 0, opacity: 0.03, pointerEvents: "none",
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat", backgroundSize: "128px",
      }} />

      {/* Header */}
      <div style={{
        borderBottom: "1px solid #2a2520",
        padding: "24px 32px 16px",
        display: "flex", alignItems: "baseline", gap: "16px",
      }}>
        <div style={{ fontSize: "11px", letterSpacing: "4px", color: "#6b5e4a", textTransform: "uppercase" }}>
          Kriminalakte
        </div>
        <div style={{ fontSize: "26px", fontWeight: "700", color: "#c8a97e", letterSpacing: "1px" }}>
          Das Schweigen von Eibenbach
        </div>
        <div style={{ fontSize: "11px", color: "#4a3f30", marginLeft: "auto", letterSpacing: "2px" }}>
          COLD CASE · 1991 · UNGELÖST
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex", gap: "0", borderBottom: "1px solid #1e1a16",
        padding: "0 32px",
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "12px 20px", fontSize: "12px", letterSpacing: "2px",
              textTransform: "uppercase", fontFamily: "inherit",
              color: activeTab === tab.id ? "#c8a97e" : "#4a3f30",
              borderBottom: activeTab === tab.id ? "2px solid #c8a97e" : "2px solid transparent",
              transition: "all 0.2s",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "32px", maxWidth: "960px", margin: "0 auto" }}>

        {/* INTRO */}
        {activeTab === "intro" && (
          <div>
            <div style={{
              background: "#14110e", border: "1px solid #2a2520",
              borderLeft: "3px solid #c8a97e", padding: "24px 28px", marginBottom: "32px",
              fontStyle: "italic", lineHeight: "1.9", fontSize: "15px", color: "#b8a888",
            }}>
              <div style={{ fontSize: "11px", letterSpacing: "3px", color: "#6b5e4a", marginBottom: "12px", fontStyle: "normal" }}>
                AUFGABE
              </div>
              Du bist Vera Voss, 38 Jahre alt. Letzte Woche hast du das alte Haus deiner Mutter geerbt – ein Haus, das du nie kanntest, in einem Dorf, das du nie besucht hast.
              <br /><br />
              Deine Mutter Clara Voss starb, als du fünf Jahre alt warst. Offiziell: Unfall. Sie soll im Dorfteich von Eibenbach ertrunken sein, am frühen Morgen des <strong style={{ color: "#c8a97e", fontStyle: "normal" }}>14. Oktober 1991</strong>. Du kamst ins Waisenhaus. Niemand hat je mit dir über sie gesprochen.
              <br /><br />
              Als du das Haus betrittst, findest du hinter einem losen Dielenbrett eine alte Blechdose.
              <br /><br />
              Du hast <strong style={{ color: "#c8a97e", fontStyle: "normal" }}>90 Minuten</strong>, bevor der Notar das Haus versiegelt.
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
              {[
                { label: "Setting", value: "Kleines Dorf, Schwarzwald" },
                { label: "Zeitraum", value: "1991 → 2024" },
                { label: "Schwierigkeit", value: "Hoch · 3 Ebenen" },
                { label: "Verdächtige", value: "5 Personen" },
                { label: "Beweise", value: "6 Fundstücke" },
                { label: "Codes", value: "4471 · 1310" },
              ].map(item => (
                <div key={item.label} style={{
                  background: "#14110e", border: "1px solid #1e1a16",
                  padding: "16px 20px",
                }}>
                  <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#4a3f30", marginBottom: "6px", textTransform: "uppercase" }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: "14px", color: "#c8a97e" }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CHARACTERS */}
        {activeTab === "chars" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {characters.map(char => (
                <div
                  key={char.id}
                  onClick={() => setSelectedChar(selectedChar?.id === char.id ? null : char)}
                  style={{
                    background: "#14110e",
                    border: `1px solid ${selectedChar?.id === char.id ? char.color : "#1e1a16"}`,
                    padding: "20px", cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                    <div>
                      <div style={{ fontSize: "16px", color: char.color, marginBottom: "2px" }}>
                        {char.icon} {char.name}
                      </div>
                      <div style={{ fontSize: "11px", letterSpacing: "2px", color: "#4a3f30", textTransform: "uppercase" }}>
                        {char.role} · {char.age}
                      </div>
                    </div>
                    <div style={{
                      fontSize: "10px", padding: "3px 8px",
                      background: char.status === "lebt" ? "#1a2a1a" : "#1a1414",
                      color: char.status === "lebt" ? "#6a9a6a" : "#6a3a3a",
                      border: `1px solid ${char.status === "lebt" ? "#2a4a2a" : "#3a1a1a"}`,
                      letterSpacing: "1px",
                    }}>
                      {char.status === "lebt" ? "LEBT" : "TOT"}
                    </div>
                  </div>

                  <div style={{ fontSize: "13px", lineHeight: "1.7", color: "#8a7a5a" }}>
                    {char.summary}
                  </div>

                  {selectedChar?.id === char.id && (
                    <div style={{
                      marginTop: "16px", padding: "14px",
                      background: "#0d0b09", borderLeft: `2px solid ${char.color}`,
                    }}>
                      <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#6b5e4a", marginBottom: "8px" }}>
                        GEHEIMNIS
                      </div>
                      <div style={{ fontSize: "13px", lineHeight: "1.7", color: "#c8a97e" }}>
                        {char.secret}
                      </div>
                      {char.danger > 0 && (
                        <div style={{
                          marginTop: "12px", fontSize: "11px", color: "#8b3a3a",
                          letterSpacing: "2px",
                        }}>
                          {"⚠ ".repeat(char.danger)} GEFÄHRLICH
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EVIDENCE */}
        {activeTab === "evidence" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {evidence.map(ev => (
              <div
                key={ev.id}
                onClick={() => setSelectedEvidence(selectedEvidence?.id === ev.id ? null : ev)}
                style={{
                  background: "#14110e",
                  border: `1px solid ${selectedEvidence?.id === ev.id ? "#c8a97e" : "#1e1a16"}`,
                  padding: "18px 20px", cursor: "pointer",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ fontSize: "22px" }}>{ev.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
                      <span style={{ fontSize: "15px", color: "#c8a97e" }}>
                        Fundstück {ev.id}: {ev.name}
                      </span>
                      {ev.code && (
                        <span style={{
                          fontSize: "11px", padding: "2px 8px",
                          background: "#1a1a0a", color: "#a8a050",
                          border: "1px solid #3a3a1a", letterSpacing: "2px",
                        }}>
                          CODE: {ev.code}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: "11px", color: "#4a3f30", letterSpacing: "1px", marginTop: "2px" }}>
                      📍 {ev.location}
                    </div>
                  </div>
                </div>

                {selectedEvidence?.id === ev.id && (
                  <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid #1e1a16" }}>
                    <div style={{ fontSize: "13px", lineHeight: "1.8", color: "#8a7a5a", marginBottom: "12px" }}>
                      {ev.content}
                    </div>
                    <div style={{
                      padding: "12px 14px", background: "#0d0b09",
                      borderLeft: "2px solid #6b5e4a", fontSize: "13px",
                      color: "#c8a97e", lineHeight: "1.7", marginBottom: ev.twist ? "12px" : "0",
                    }}>
                      🔍 {ev.clue}
                    </div>
                    {ev.twist && (
                      <div style={{
                        padding: "12px 14px", background: "#110d0d",
                        borderLeft: "2px solid #8b3a3a", fontSize: "12px",
                        color: "#8b5a5a", lineHeight: "1.7", marginTop: "8px",
                        letterSpacing: "0.5px",
                      }}>
                        ↯ TWIST: {ev.twist}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* TIMELINE */}
        {activeTab === "timeline" && (
          <div style={{ position: "relative" }}>
            <div style={{
              position: "absolute", left: "112px", top: "0", bottom: "0",
              width: "1px", background: "#1e1a16",
            }} />
            {timeline.map((item, i) => {
              const colors = {
                crime: "#8b3a3a", key: "#c8a97e", neutral: "#4a3f30",
                irony: "#6a5a8a", now: "#3a6a8a",
              };
              return (
                <div key={i} style={{
                  display: "flex", gap: "24px", marginBottom: "20px",
                  position: "relative", alignItems: "flex-start",
                }}>
                  <div style={{
                    width: "100px", textAlign: "right", fontSize: "12px",
                    color: "#6b5e4a", paddingTop: "2px", flexShrink: 0, letterSpacing: "1px",
                  }}>
                    {item.year}
                  </div>
                  <div style={{
                    width: "9px", height: "9px", borderRadius: "50%",
                    background: colors[item.type], flexShrink: 0, marginTop: "5px",
                    position: "relative", zIndex: 1,
                    boxShadow: `0 0 8px ${colors[item.type]}66`,
                  }} />
                  <div style={{
                    fontSize: "13px", lineHeight: "1.7", color: "#8a7a5a",
                    borderLeft: item.type === "now" ? "1px solid #3a6a8a" : "none",
                    paddingLeft: item.type === "now" ? "12px" : "0",
                    color: item.type === "now" ? "#6a9aaa" : item.type === "crime" ? "#9a6a6a" : "#8a7a5a",
                  }}>
                    {item.event}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TWISTS */}
        {activeTab === "twists" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ fontSize: "12px", color: "#4a3f30", letterSpacing: "2px", marginBottom: "8px" }}>
              DREI EBENEN · IN REIHENFOLGE AUFDECKEN
            </div>
            {twists.map(twist => (
              <div key={twist.level} style={{
                border: `1px solid ${twist.border}`,
                background: twist.color,
                padding: "24px",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <div>
                    <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#6b5e4a", marginBottom: "4px" }}>
                      EBENE {twist.level}
                    </div>
                    <div style={{ fontSize: "17px", color: "#c8a97e" }}>{twist.title}</div>
                  </div>
                  <div style={{
                    padding: "4px 12px",
                    background: twist.verdict === "FALSCH" ? "#1a0a0a" : "#0a1a0a",
                    color: twist.verdict === "FALSCH" ? "#8b3a3a" : "#3a8b3a",
                    border: `1px solid ${twist.verdict === "FALSCH" ? "#3a1a1a" : "#1a3a1a"}`,
                    fontSize: "11px", letterSpacing: "3px",
                  }}>
                    {twist.verdict}
                  </div>
                </div>
                <div style={{ fontSize: "13px", color: "#6b5e4a", marginBottom: "12px" }}>
                  Verdacht auf: <strong style={{ color: "#c8a97e" }}>{twist.suspect}</strong>
                </div>

                {revealedTwists.includes(twist.level) ? (
                  <div style={{ fontSize: "13px", lineHeight: "1.8", color: "#8a7a5a" }}>
                    {twist.explanation}
                  </div>
                ) : (
                  <button
                    onClick={() => revealTwist(twist.level)}
                    style={{
                      background: "none", border: "1px solid #2a2520",
                      color: "#4a3f30", cursor: "pointer", padding: "8px 16px",
                      fontSize: "11px", letterSpacing: "2px", fontFamily: "inherit",
                    }}
                  >
                    AUFDECKEN
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* SOLUTION */}
        {activeTab === "solution" && (
          <div>
            {!revealSecret ? (
              <div style={{
                textAlign: "center", padding: "60px 40px",
                border: "1px solid #1e1a16", background: "#0d0b09",
              }}>
                <div style={{ fontSize: "40px", marginBottom: "20px" }}>🔒</div>
                <div style={{ fontSize: "13px", color: "#4a3f30", letterSpacing: "2px", marginBottom: "20px" }}>
                  VOLLSTÄNDIGE AUFLÖSUNG
                </div>
                <div style={{ fontSize: "14px", color: "#6b5e4a", marginBottom: "32px", lineHeight: "1.8" }}>
                  Nur aufrufen, wenn alle Rätsel abgeschlossen sind.
                </div>
                <button
                  onClick={() => setRevealSecret(true)}
                  style={{
                    background: "#14110e", border: "1px solid #c8a97e",
                    color: "#c8a97e", cursor: "pointer", padding: "12px 32px",
                    fontSize: "12px", letterSpacing: "3px", fontFamily: "inherit",
                  }}
                >
                  FALL AUFLÖSEN
                </button>
              </div>
            ) : (
              <div>
                <div style={{
                  background: "#0d0b09", border: "1px solid #2a2520",
                  borderLeft: "3px solid #c8a97e", padding: "24px", marginBottom: "24px",
                  lineHeight: "1.9", fontSize: "14px", color: "#b8a888",
                }}>
                  <div style={{ fontSize: "11px", letterSpacing: "3px", color: "#6b5e4a", marginBottom: "16px" }}>
                    VOLLSTÄNDIGE AUFLÖSUNG
                  </div>
                  <strong style={{ color: "#c8a97e" }}>Clara</strong> entdeckte 1991 ein Netzwerk aus Medikamentenschmuggel, Geldwäsche und Korruption.
                  <br /><br />
                  <strong style={{ color: "#8b3a3a" }}>Hedwig Noll</strong> – die eigentliche Drahtzieher – betäubte Clara am 13. Oktober mit Chloralhydrat beim "Versöhnungsgespräch" und ertränkte sie im Dorfteich. Ihr Sohn <strong style={{ color: "#3a4e8b" }}>Albert</strong> beurkundete den Tod als Unfall.
                  <br /><br />
                  <strong style={{ color: "#5a7a3a" }}>Heinrich Steuer</strong> schwieg aus Eigeninteresse – und wurde 1993 selbst ermordet, als er zu hadern begann.
                  <br /><br />
                  <strong style={{ color: "#7a6a3a" }}>Thomas Brandt</strong> fand Claras Leiche als Erster. Aus Angst hat er 33 Jahre geschwiegen.
                  <br /><br />
                  Hedwig Noll starb 2019, geehrt und ungestraft. Ihr Sohn Albert Noll praktiziert noch heute.
                  <strong style={{ color: "#c8a97e" }}> Er war vor Vera im Haus. Die Visitenkarte beweist es.</strong>
                </div>

                <div style={{
                  background: "#110a0a", border: "1px solid #3a1a1a",
                  padding: "24px", fontStyle: "italic",
                  lineHeight: "1.9", fontSize: "14px", color: "#8a5a5a",
                }}>
                  <div style={{ fontSize: "11px", letterSpacing: "3px", color: "#6b3a3a", marginBottom: "16px", fontStyle: "normal" }}>
                    EPILOG
                  </div>
                  Du hörst ein Auto, das langsam die Dorfstraße hochfährt.<br />
                  Es hält vor dem Haus.<br />
                  Eine Wagentür öffnet sich.<br />
                  <br />
                  <strong style={{ color: "#c8a97e", fontStyle: "normal" }}>ENDE.</strong>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
