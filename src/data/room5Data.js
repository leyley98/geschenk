// ── Room 5 · Scuderia Ferrari · Autodromo Nazionale di Monza · Data ────────────────────────

export const ROOM5_INTRO = [
  "SCUDERIA FERRARI - AUTODROMO NAZIONALE DI MONZA",
  "",
  "Monza. GP von Italien.",
  "Du sitzt an der Pit Wall - dem Kommandostand der Scuderia.",
  "Sechs Bildschirme leuchten vor dir. Jeder zeigt eine andere Aufgabe.",
  "",
  "Dein Fahrer führt das Rennen an.",
  "Aber das Team hat ein Problem:",
  "Das Codewort für den verschlüsselten Strategiefunk ist verloren gegangen.",
  "",
  "Löse alle sechs Pit-Wall-Challenges.",
  "Jede liefert dir einen Buchstaben.",
  "Setze sie zusammen - und gib das Codewort durch.",
  "",
  "Forza Ferrari.",
];

// slot 1=P, 2=I, 3=L, 4=O, 5=T, 6=A  →  PILOTA
export const CHALLENGES = [
  {
    id: "boxenstopp",
    slot: 1,
    letter: "P",
    type: "timing",
    title: "Boxenstopp-Fenster",
    subtitle: "Pit Stop Release",
    emoji: "⏱️",
    sectionLabel: "MODUL 01 - PIT STOP TIMING",
    question:
      "Charles rollt in die Box. Alle vier Reifen werden gewechselt. Klicke RELEASE sobald der letzte Mechaniker weg ist - optimales Fenster: 2.1s – 2.5s.",
    timing: { min: 2.1, max: 2.5 },
    successText:
      "Weltklasse-Boxenstopp! Charles gibt Gas. Erster Buchstabe gesichert.",
  },
  {
    id: "reifengroesse",
    slot: 2,
    letter: "I",
    type: "choice",
    title: "Technische Vorschriften",
    subtitle: "2022-Reglement-Update",
    emoji: "📋",
    sectionLabel: "MODUL 02 - REGLEMENT-CHECK",
    question:
      "2022 führte die FIA ein komplett neues technisches Reglement ein - Groundeffect-Autos, neue Aerodynamik, neue Reifen. Auf welche Reifengröße wurden alle Fahrzeuge ab 2022 verpflichtend umgestellt?",
    options: [
      "13 Zoll - klassische Spezifikation seit 1998",
      "18 Zoll - neue Low-Profile-Spezifikation",
      "20 Zoll - Konzept für die Zukunft",
    ],
    correctIndex: 1,
    successText:
      "18 Zoll - Pirelli liefert die neuen Low-Profile-Reifen seit 2022. Zweiter Buchstabe gesichert.",
  },
  {
    id: "rundenzeit",
    slot: 3,
    letter: "L",
    type: "input",
    title: "Telemetrie-Kalkulation",
    subtitle: "Zeitdifferenz berechnen",
    emoji: "📡",
    sectionLabel: "MODUL 03 - TIMING-ANALYSE",
    question:
      "Analysiere die Qualifying-Daten. Berechne die exakte Differenz zwischen Charles' Q3-Runde und dem Streckenrekord - Antwort in Millisekunden.",
    context:
      "╔══════════════════════════════════════╗\n║  Q3 QUALIFYING - IMOLA 2024          ║\n║                                      ║\n║  Charles Leclerc    1:15.841         ║\n║  Streckenrekord     1:13.983         ║\n║                                      ║\n║  Differenz:         ??? ms           ║\n╚══════════════════════════════════════╝",
    answer: "1858",
    placeholder: "Antwort in ms",
    successText:
      "1858ms - präzise kalkuliert. Dritter Buchstabe gesichert.",
  },
  {
    id: "drs_monza",
    slot: 4,
    letter: "O",
    type: "choice",
    showCircuit: true,
    title: "Streckenanalyse Monza",
    subtitle: "Tempel der Geschwindigkeit",
    emoji: "🗺️",
    sectionLabel: "MODUL 04 - STRECKENANALYSE",
    question:
      "Vor dir liegt der Grundriss des Autodromo Nazionale di Monza. Auf der Hauptgeraden mit offenem DRS - welche Topgeschwindigkeit erreicht ein modernes F1-Auto realistischerweise?",
    options: [
      "280 – 300 km/h",
      "310 – 330 km/h",
      "340 – 360 km/h",
    ],
    correctIndex: 2,
    successText:
      "340–360 km/h - der Tempel der Geschwindigkeit lebt. Vierter Buchstabe gesichert.",
  },
  {
    id: "strategie",
    slot: 5,
    letter: "T",
    type: "choice",
    title: "Pit Wall Entscheidung",
    subtitle: "Safety Car · Runde 45/63",
    emoji: "🚨",
    sectionLabel: "MODUL 05 - STRATEGIE-BRIEFING",
    question:
      "Runde 45/63. Charles ist P1 auf 19 Runden alten Mediums. Safety Car. P2 ist 3.2s hinter dir und hat sofort geboxxt - frische Hards, 18 Runden zu fahren. Du hast ein freies Pit-Stop-Fenster. Was tust du?",
    options: [
      "Draußen bleiben - Track Position halten, P1 nicht riskieren",
      "Sofort boxen - Free Stop, frische Hards, Undercut-Risiko eliminiert",
      "Warten bis SC-Ende - dann boxen für weichere Mischung",
    ],
    correctIndex: 1,
    successText:
      "Free Stop genommen - P1 mit frischen Reifen gesichert. Fünfter Buchstabe gesichert.",
  },
  {
    id: "geschichte",
    slot: 6,
    letter: "A",
    type: "choice",
    title: "Archiv Maranello",
    subtitle: "Geschichte der Scuderia",
    emoji: "🏆",
    sectionLabel: "MODUL 06 - FERRARI-ARCHIV",
    question:
      "Scuderia Ferrari ist der erfolgreichste Konstrukteur der Formel-1-Geschichte. In welchem Jahr gewann ein Ferrari-Pilot zuletzt die Fahrer-Weltmeisterschaft?",
    options: [
      "2004 - Michael Schumacher, Ferrari F2004",
      "2007 - Kimi Räikkönen, Ferrari F2007",
      "2012 - Fernando Alonso, Ferrari F2012",
    ],
    correctIndex: 1,
    successText:
      "2007 - Räikkönen, ein Punkt vor Hamilton. Il colpo di scena! Letzter Buchstabe gesichert.",
  },
];

export const SOLUTION_WORD = "PILOTA";

export const ROOM5_SOLUTION = {
  message: "PILOTA - Italienisch für Pilot, Fahrer. Das Codewort ist bestätigt.",
  subMessage:
    "Das Team jubelt. Charles Leclerc überquert die Ziellinie - Sieg für die Scuderia Ferrari in Monza.",
  nextRoomHint: "Die nächste Etappe wartet. Weiter geht die Reise...",
};
