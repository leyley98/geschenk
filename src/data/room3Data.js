// ── Room 3 · Eras Tour München · Data ────────────────────────────────────────

export const ERA_THEMES = {
  "The Eras Tour": {
    bg: "linear-gradient(135deg, #1a0a3c 0%, #0a1a3c 50%, #1a0a1e 100%)",
    border: "#c084fc", accent: "#c084fc", text: "#e9d5ff",
    badgeBg: "#5b21b6", label: "🌟 The Eras Tour",
  },
  "Lover": {
    bg: "linear-gradient(135deg, #2d0a1e 0%, #1a0a2e 100%)",
    border: "#f9a8d4", accent: "#f472b6", text: "#fce7f3",
    badgeBg: "#9d174d", label: "💗 Lover",
  },
  "Fearless": {
    bg: "linear-gradient(135deg, #1c1000 0%, #2d1f00 100%)",
    border: "#fbbf24", accent: "#f59e0b", text: "#fef3c7",
    badgeBg: "#92400e", label: "⭐ Fearless (Taylor's Version)",
  },
  "Speak Now": {
    bg: "linear-gradient(135deg, #1a0a2d 0%, #0a001a 100%)",
    border: "#a78bfa", accent: "#8b5cf6", text: "#ede9fe",
    badgeBg: "#4c1d95", label: "🔮 Speak Now (Taylor's Version)",
  },
  "Red": {
    bg: "linear-gradient(135deg, #1a0000 0%, #2d0505 100%)",
    border: "#f87171", accent: "#ef4444", text: "#fee2e2",
    badgeBg: "#7f1d1d", label: "🍂 Red (Taylor's Version)",
  },
  "1989": {
    bg: "linear-gradient(135deg, #001a2e 0%, #00102e 100%)",
    border: "#38bdf8", accent: "#0ea5e9", text: "#e0f2fe",
    badgeBg: "#0369a1", label: "📷 1989 (Taylor's Version)",
  },
  "reputation": {
    bg: "linear-gradient(135deg, #060809 0%, #0f1114 100%)",
    border: "#6b7280", accent: "#9ca3af", text: "#e5e7eb",
    badgeBg: "#1f2937", label: "🐍 reputation",
  },
  "folklore": {
    bg: "linear-gradient(135deg, #0f0d0b 0%, #1c1916 100%)",
    border: "#a8a29e", accent: "#78716c", text: "#d6d3d1",
    badgeBg: "#44403c", label: "🌲 folklore",
  },
  "evermore": {
    bg: "linear-gradient(135deg, #120800 0%, #1c1000 100%)",
    border: "#d97706", accent: "#b45309", text: "#fde68a",
    badgeBg: "#451a03", label: "🍁 evermore",
  },
  "Midnights": {
    bg: "linear-gradient(135deg, #00001a 0%, #0a0020 100%)",
    border: "#818cf8", accent: "#6366f1", text: "#e0e7ff",
    badgeBg: "#312e81", label: "🌙 Midnights",
  },
};


export const ROOM3_INTRO = [
  "✦ HERZLICH WILLKOMMEN IM OLYMPIASTADION MÜNCHEN ✦",
  "",
  "Es ist der 27. Juli 2024.",
  "72.000 Swifties haben das Olympiastadion gefüllt.",
  "Taylor Swift ist auf der Bühne – und irgendwo in diesem Stadion",
  "hat sie eine geheime Botschaft für dich versteckt.",
  "",
  "Erkunde die interaktive Karte des Stadions.",
  "Klicke auf die Hotspots, um Swiftie-Facts zu entdecken.",
  "Manche Orte verraten dir einen Buchstaben.",
  "",
  "Sammle alle Buchstaben – und bilde das geheime Codewort.",
  "",
  "✦ The Eras Tour · München · Olympiastadion ✦",
];

// Letters to collect: S · W · I · F · T · I · E  →  SWIFTIE
// slot 1=S, 2=W, 3=I, 4=F, 5=T, 6=I, 7=E

export const HOTSPOTS = [
  // ── Letter hotspots (slot 1–7) ──────────────────────────────────────────
  {
    id: "stage",
    label: "Hauptbühne",
    emoji: "🎤",
    cx: 450, cy: 87,
    slot: 1,
    letter: "S",
    era: "The Eras Tour",
    cardTitle: "Die Hauptbühne",
    factText:
      "Die Eras Tour war die erfolgreichste Tour aller Zeiten. Sie spielte laut den gemeldeten Zahlen rund 2,08 Milliarden US-Dollar ein und war damit die erste Tour überhaupt, die die 1-Milliarde- und sogar 2-Milliarden-Marke geknackt hat.",
  },
  {
    id: "catwalk",
    label: "Catwalk · Mittelsteg",
    emoji: "✨",
    cx: 450, cy: 170,
    slot: 2,
    letter: "W",
    era: "Lover",
    cardTitle: "Der Catwalk",
    factText:
      "Der Hauptcatwalk des Eras-Tour-Sets ist fast 60 Meter lang. Taylor läuft ihn jede Show mehrmals ab. Gesamtlaufleistung auf dem Catwalk pro Abend: geschätzte 3 km.",
  },
  {
    id: "standing",
    label: "Innenraum · Standing",
    emoji: "🫂",
    cx: 450, cy: 295,
    slot: 3,
    letter: "I",
    era: "Lover",
    cardTitle: "Innenraum / Pit",
    factText:
      "Die Tour hatte 149 Shows und lief von 17. März 2023 bis 8. Dezember 2024. Das letzte Konzert fand in Vancouver statt.",
  },
  {
    id: "west",
    label: "Westtribüne",
    emoji: "🎸",
    cx: 192, cy: 310,
    slot: 4,
    letter: "F",
    era: "reputation",
    cardTitle: "Westtribüne",
    factText:
      "Auch der Konzertfilm war rekordverdächtig. Taylor Swift: The Eras Tour wurde zum erfolgreichsten Konzertfilm aller Zeiten und spielte weltweit über 261 Millionen US-Dollar ein.",
  },
  {
    id: "kurve-nw",
    label: "Kurve Nord-West",
    emoji: "🌙",
    cx: 252, cy: 212,
    slot: 5,
    letter: "T",
    era: "folklore",
    cardTitle: "NW-Kurve",
    factText:
      "Taylor Swift schreibt nahezu alle ihre Songs selbst – oft allein oder mit höchstens einer weiteren Person. Das Album 'folklore' (2020) entstand komplett während des Lockdowns in wenigen Wochen.",
  },
  {
    id: "kurve-sw",
    label: "Kurve Süd-West",
    emoji: "💜",
    cx: 275, cy: 427,
    slot: 6,
    letter: "I",
    era: "Red",
    cardTitle: "SW-Kurve · Bühnennähe",
    factText:
      "Die Tour war nicht nur musikalisch, sondern auch kulturell ein Ausnahmeereignis. Sie wurde von vielen Quellen als globales Popkultur-Phänomen beschrieben und setzte neue Maßstäbe für Live-Entertainment.",
  },
  {
    id: "merch-west",
    label: "Merch-Stand West",
    emoji: "🛍️",
    cx: 55, cy: 310,
    slot: 7,
    letter: "E",
    era: "Fearless",
    cardTitle: "Merch-Stand West",
    factText:
      "Das Eras-Tour-Merch ist legendär: Fans campierten teils 8 Stunden vor den Merch-Zelten. München hatte eine exklusive City-Edition-Kollektion – wer zu spät kam, ging leer aus.",
  },

  // ── Fact-only hotspots ──────────────────────────────────────────────────
  {
    id: "foh",
    label: "FOH-Mischpult",
    emoji: "🎛️",
    cx: 450, cy: 352,
    era: "Midnights",
    cardTitle: "FOH-Tower",
    factText:
      "Das Soundsystem der Eras Tour ist so gewaltig, dass Seismographen in der Nähe der Spielstätten Ausschläge registrierten – vergleichbar mit einem kleinen Erdbeben der Stärke 2,3.",
  },
  {
    id: "nord",
    label: "Nordtribüne",
    emoji: "🏟️",
    cx: 620, cy: 195,
    era: "Midnights",
    cardTitle: "Nordtribüne",
    factText:
      "Das Olympiastadion München fasst bei Konzerten rund 72.000 Zuschauer. Beide Münchner Eras-Tour-Abende im Juli 2024 waren restlos ausverkauft – Tickets waren innerhalb von Minuten weg.",
  },
  {
    id: "ost",
    label: "Osttribüne",
    emoji: "🎵",
    cx: 705, cy: 310,
    era: "1989",
    cardTitle: "Osttribüne",
    factText:
      "Taylor Swift hat als erste Solokünstlerin alle Top-5-Plätze der Billboard Hot 100 gleichzeitig belegt – direkt nach dem Release von Midnights (2022). Alle 10 Plätze der Top 10 waren von ihr.",
  },
  {
    id: "kurve-no",
    label: "Kurve Nord-Ost",
    emoji: "⭐",
    cx: 648, cy: 210,
    era: "Speak Now",
    cardTitle: "NO-Kurve",
    factText:
      "Die Eras Tour hat als erste Tournee eines Solokünstlers die 1-Milliarden-Dollar-Umsatzgrenze geknackt und gilt als die wirtschaftlich erfolgreichste Tour aller Zeiten.",
  },
  {
    id: "kurve-so",
    label: "Kurve Süd-Ost",
    emoji: "🌟",
    cx: 623, cy: 427,
    era: "evermore",
    cardTitle: "SO-Kurve · Bühnennähe",
    factText:
      "Taylor hat bislang 4 ihrer Alben als 'Taylor's Version' re-recorded, um die Rechte an ihrer Musik zurückzugewinnen. Swifties streamten die Originals bewusst in den Keller – und wechselten sofort zu TV.",
  },
  {
    id: "merch-nord",
    label: "Merch-Stand Nord",
    emoji: "🎁",
    cx: 450, cy: 42,
    era: "Lover",
    cardTitle: "Merch-Stand Nord",
    factText:
      "Friendship Bracelets auf der Eras Tour sind ein eigenes Kulturgut: Es gibt Tauschbörsen, Discord-Server und Etsy-Shops nur für Concert-Bracelets. Perlen und Buchstabensets waren europaweit ausverkauft.",
  },
  {
    id: "eingang-sued",
    label: "Südeingang",
    emoji: "🚪",
    cx: 450, cy: 548,
    era: "The Eras Tour",
    cardTitle: "Südeingang",
    factText:
      "Swifties kamen beim Münchner Konzert teils 12 Stunden vor Einlass – mit Picknickkörben, kompletten Eras-Tour-Outfits und Freundschaftsband-Tauschboxen. Die Schlange vor dem Stadion war quasi ein zweites Konzert.",
  },
  {
    id: "friendship-corner",
    label: "Bracelet Corner",
    emoji: "📿",
    cx: 595, cy: 180,
    era: "Speak Now",
    cardTitle: "Friendship Bracelet Corner",
    factText:
      "Ein Fan hat Taylor während des Konzerts ein Armband mit einer geheimen Botschaft auf die Bühne gereicht. Taylor trug es den Rest der Show – und postete danach ein Foto davon in ihrer Story.",
  },
];

export const SOLUTION_WORD = "SWIFTIE";

export const ROOM3_SOLUTION = {
  message:
    "Du hast alle Buchstaben gesammelt und das Codewort entschlüsselt!",
  subMessage:
    "Irgendwo im Olympiastadion lächelt Taylor Swift gerade DIR zu Maus, DIR. ",
  nextRoomHint:
    "Die Reise geht weiter. Raum 4 wartet auf dich...",
};
