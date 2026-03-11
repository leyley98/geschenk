// ── Room 6 · The Pop Room · Jukebox · Data ───────────────────────────────────
// Codeword: M·I·D·N·I·G·H·T → MIDNIGHT (8 letters, one per song)

export const ROOM6_INTRO = [
  "✦ WELCOME TO THE POP ROOM ✦",
  "",
  "Du betrittst die legendärste Playlist der Welt.",
  "Jede Melodie trägt ein Geheimnis.",
  "Jeder Song versteckt einen Buchstaben.",
  "",
  "Spiel die Songs. Beweise dein Wissen.",
  "Sammle alle 8 Buchstaben und bilde das Codewort.",
  "",
  "Let's go ✦",
];

export const CHALLENGES = [
  {
    id: "manchild",
    slot: 1, letter: "M",
    audioSrc: "/audio/manchild.m4a",
    emoji: "🎀",
    title: "manchild",
    artist: "Sabrina Carpenter",
    subtitle: "Short n' Sweet · 2024",
    sectionLabel: "SONG 01 - BUCHSTABE",
    question: "\"manchild\" beschreibt auf Sabrina Carpenters Album 'Short n' Sweet' vor allem...",
    options: [
      "Unreife Männer, die sich wie Kinder verhalten",
      "Das Aufwachsen ohne Vater",
      "Eine Kindheitserinnerung in Hollywood",
    ],
    correctIndex: 0,
    successText: "Manchild, infantile, manchild. Sie hat es perfect auf den Punkt gebracht. ✦",
  },
  {
    id: "willow",
    slot: 2, letter: "I",
    audioSrc: "/audio/willow.m4a",
    emoji: "🌿",
    title: "willow",
    artist: "Taylor Swift",
    subtitle: "evermore · 2020",
    sectionLabel: "SONG 02 - BUCHSTABE",
    question: "\"willow\" war die Lead-Single welches surprise-Albums von Taylor Swift?",
    options: [
      "evermore",
      "folklore",
      "Lover",
    ],
    correctIndex: 0,
    successText: "Life was a willow and it bent right to your wind. evermore era. ✦",
  },
  {
    id: "wonderland",
    slot: 3, letter: "D",
    audioSrc: "/audio/wonderland.m4a",
    emoji: "🐇",
    title: "Wonderland",
    artist: "Taylor Swift",
    subtitle: "1989 (Deluxe) · 2014",
    sectionLabel: "SONG 03 - BUCHSTABE",
    question: "\"Wonderland\" spielt auf welches klassische Werk an?",
    options: [
      "Alice im Wunderland",
      "Peter Pan",
      "Der Zauberer von Oz",
    ],
    correctIndex: 0,
    successText: "Didn't you flash your green eyes at me? In a wonderland. ✦",
  },
  {
    id: "which-witch",
    slot: 4, letter: "N",
    audioSrc: "/audio/which-witch.m4a",
    emoji: "🔮",
    title: "Which Witch",
    artist: "Florence + the Machine",
    subtitle: "How Big How Blue · 2015",
    sectionLabel: "SONG 04 - BUCHSTABE",
    question: "Florence Welch, Frontfrau von Florence + the Machine, kommt aus...",
    options: [
      "London",
      "Manchester",
      "Edinburgh",
    ],
    correctIndex: 0,
    successText: "Florence ist pure Magie. London hat sie hervorgebracht. ✦",
  },
  {
    id: "red-wine-supernova",
    slot: 5, letter: "I",
    audioSrc: "/audio/red-wine-supernova.m4a",
    emoji: "🍷",
    title: "Red Wine Supernova",
    artist: "Chappell Roan",
    subtitle: "The Rise and Fall of a Midwest Princess · 2023",
    sectionLabel: "SONG 05 - BUCHSTABE",
    question: "Chappell Roans Debütalbum 'The Rise and Fall of a Midwest Princess' erschien in welchem Jahr?",
    options: [
      "2023",
      "2021",
      "2024",
    ],
    correctIndex: 0,
    successText: "I think you might be the one. Midwest Princess forever. ✦",
  },
  {
    id: "peanut-butter-jelly",
    slot: 6, letter: "G",
    audioSrc: "/audio/peanut-butter-jelly.m4a",
    emoji: "🎉",
    title: "Peanut Butter Jelly",
    artist: "Galantis",
    subtitle: "Pharmacy · 2016",
    sectionLabel: "SONG 06 - BUCHSTABE",
    question: "Das schwedische EDM-Duo Galantis besteht aus Christian Karlsson und...",
    options: [
      "Linus Eklöw",
      "Avicii",
      "Robyn",
    ],
    correctIndex: 0,
    successText: "Galantis aus Schweden - pures Feel-Good-Energy. ✦",
  },
  {
    id: "the-night-we-met",
    slot: 7, letter: "H",
    audioSrc: "/audio/the-night-we-met.m4a",
    emoji: "🌙",
    title: "The Night We Met",
    artist: "Lord Huron",
    subtitle: "Strange Trails · 2015",
    sectionLabel: "SONG 07 - BUCHSTABE",
    question: "\"The Night We Met\" wurde durch welche Serie viral und erreichte Millionen neue Hörer?",
    options: [
      "13 Reasons Why",
      "Stranger Things",
      "Euphoria",
    ],
    correctIndex: 0,
    successText: "I had all and then most of you. Dieser Song trifft immer. ✦",
  },
  {
    id: "the-chain",
    slot: 8, letter: "T",
    audioSrc: "/audio/the-chain.m4a",
    emoji: "⛓️",
    title: "The Chain",
    artist: "Fleetwood Mac",
    subtitle: "Rumours · 1977",
    sectionLabel: "SONG 08 - BUCHSTABE",
    question: "\"The Chain\" erschien auf dem legendären Fleetwood Mac Album...",
    options: [
      "Rumours",
      "Tusk",
      "Mirage",
    ],
    correctIndex: 0,
    successText: "Rumours (1977) - eines der meistverkauften Alben aller Zeiten. Iconic. ✦",
  },
];

export const LETTER_CHALLENGES = [...CHALLENGES].sort((a, b) => a.slot - b.slot);

export const SOLUTION_WORD = "MIDNIGHT";

export const SLOT_STYLES = {
  1: { bg: "linear-gradient(135deg,#9d174d,#be185d)",   border: "#f9a8d4", shadow: "rgba(249,168,212,0.45)" }, // manchild – rose
  2: { bg: "linear-gradient(135deg,#14532d,#16a34a)",   border: "#86efac", shadow: "rgba(134,239,172,0.40)" }, // willow – sage
  3: { bg: "linear-gradient(135deg,#1e3a8a,#2563eb)",   border: "#93c5fd", shadow: "rgba(147,197,253,0.40)" }, // wonderland – blue
  4: { bg: "linear-gradient(135deg,#4a044e,#7e22ce)",   border: "#d8b4fe", shadow: "rgba(216,180,254,0.40)" }, // which witch – deep purple
  5: { bg: "linear-gradient(135deg,#7f1d1d,#b91c1c)",   border: "#fca5a5", shadow: "rgba(252,165,165,0.40)" }, // red wine – burgundy
  6: { bg: "linear-gradient(135deg,#78350f,#d97706)",   border: "#fcd34d", shadow: "rgba(252,211,77,0.45)"  }, // peanut butter – golden
  7: { bg: "linear-gradient(135deg,#0f172a,#1e3a5f)",   border: "#7dd3fc", shadow: "rgba(125,211,252,0.40)" }, // night we met – midnight
  8: { bg: "linear-gradient(135deg,#134e4a,#0d9488)",   border: "#5eead4", shadow: "rgba(94,234,212,0.40)"  }, // the chain – teal
};

export const ROOM6_SOLUTION = {
  message: "MIDNIGHT bestätigt. Du kennst die Playlist auswendig.",
  subMessage:
    "8 Songs. 8 Buchstaben. Von Sabrina bis Fleetwood Mac - dein Musikgeschmack ist legendary.",
  nextRoomHint: "Das Abenteuer geht weiter. Der nächste Raum wartet auf dich... ✦",
};
