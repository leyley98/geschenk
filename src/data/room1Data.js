// ============================================================
// FALL: DAS SCHWEIGEN VON EIBENBACH – Alle Spielinhalte
// ============================================================

export const CASE_INTRO = [
  "> KRIMINALAKTE WIRD GELADEN...",
  "> FALL: DAS SCHWEIGEN VON EIBENBACH",
  "> OPFER: CLARA VOSS, 28",
  "> TODESDATUM: 14. OKTOBER 1991",
  "> OFFIZIELL: UNFALL",
  "> DU BIST VERA VOSS. CLARA WAR DEINE MUTTER.",
  "> DU HAST 90 MINUTEN, BEVOR DER NOTAR DAS HAUS VERSIEGELT.",
];

export const CASE_INTRO_BUTTON = "AKTE OEFFNEN";

export const characters = [
  {
    id: "clara",
    name: "Clara Voss",
    role: "Opfer",
    age: "28 (1991)",
    color: "#c8a97e",
    icon: "\u25C8",
    status: "tot",
    summary:
      "Grundschullehrerin aus Eibenbach. Lebte allein. Galt als zurueckgezogen und nachdenklich. Laut Aktenlage: Unfalltod durch Ertrinken am 14. Oktober 1991. Der Fall wurde nie offiziell neu aufgerollt.",
    secret:
      "Besass Beweise fur Geldwasche und Medikamentenschmuggel. Hatte eine kurze Affäre mit Steuer, die sie abbrach, als sie seine wahre Natur erkannte. Der Brief in der Blechdose war an eine Freundin adressiert - aber nie abgeschickt.",
    verdict: "OPFER",
    danger: 0,
  },
  {
    id: "hedwig",
    name: "Hedwig Noll",
    role: "Gemeindeschwester",
    age: "61 (1991) - † 2019",
    color: "#8b3a3a",
    icon: "\u25C6",
    status: "tot",
    summary:
      "Langjährige Gemeindeschwester, im Dorf sehr beliebt. Organisierte Kirchenfeste, kannte jeden Haushalt. Ist 2019 eines naturlichen Todes gestorben und in Eibenbach begraben.",
    secret:
      "Betaubte Clara am 13. Oktober mit Chloralhydrat und ertrankte sie im Dorfteich. Betrieb seit 1979 einen illegalen Medikamentenschmuggel uber die Dorfapotheke. Ermordete auch Heinrich Steuer 1993. Starb geehrt und ungestraft. Ihr Grabstein: 'Sie gab, ohne zu nehmen.'",
    verdict: "TÄTERIN",
    danger: 5,
  },
  {
    id: "albert",
    name: "Dr. Albert Noll",
    role: "Dorfarzt",
    age: "31 (1991) - heute 64",
    color: "#3a4e8b",
    icon: "\u25C9",
    status: "lebt",
    summary:
      "Sohn von Hedwig Noll. Praktiziert noch heute als Allgemeinarzt in Eibenbach. Hat Vera Voss bereits am ersten Tag nach ihrer Ankunft begrusst und eine Visitenkarte im Haus hinterlassen.",
    secret:
      "Beurkundete Claras Tod als Unfall und verhinderte aktiv die Obduktion. War 1991 bereits in das kriminelle Netzwerk eingebunden. Er weiss, dass Vera sucht - und er wird nicht warten.",
    verdict: "KOMPLIZE",
    danger: 5,
  },
  {
    id: "steuer",
    name: "Heinrich Steuer",
    role: "Bürgermeister",
    age: "52 (1991) - † 1993",
    color: "#5a7a3a",
    icon: "\u25C7",
    status: "tot",
    summary:
      "Bürgermeister von Eibenbach von 1982 bis zu seinem Tod 1993. Kirchenmitglied, drei Kinder. Starb offiziell an Herzversagen. War eng mit der Familie Noll befreundet.",
    secret:
      "Profitierte von illegalen Holzverkaufen uber Nolls Netzwerk. 1993 wurde er ermordet, als er mit dem Schweigen zu hadern begann. Kein Obduktionsbericht wurde je angefordert.",
    verdict: "ZWEITES OPFER",
    danger: 0,
  },
  {
    id: "thomas",
    name: "Thomas Brandt",
    role: "Nachbar / Tagelöhner",
    age: "34 (1991) - heute 67",
    color: "#7a6a3a",
    icon: "\u25CC",
    status: "lebt",
    summary:
      "Lebt seit Jahrzehnten als Tagelohner am Rand von Eibenbach. Gilt als Trinker und Aussenseiter. Stand 1991 unter Verdacht - wurde jedoch nie formal befragt. Meidet Kontakt zum Dorfzentrum.",
    secret:
      "Fand Claras Leiche als Erster, noch vor den anderen Dorfbewohnern. Hat ihren Brief 33 Jahre lang versteckt gehalten. Weiss die ganze Wahrheit. Hat Angst. Ist der einzige Mensch in Eibenbach, der Vera wirklich helfen kann.",
    verdict: "ZEUGE",
    danger: 0,
  },
];

export const evidence = [
  {
    id: 1,
    name: "Die Blechdose",
    icon: "\uD83D\uDCE6",
    location: "Hinter dem losen Dielenbrett",
    content:
      "Ein unabgeschickter Brief von Clara an eine Freundin in Freiburg. Eine Liste mit drei Namen: 'H.S. - Holzrechnung Aug 91 / H.N. - Rezept Nr. 4471 / Teich - nicht allein'. Ein ausgerissenes Kalenderblatt.",
    clue: "Kalenderblatt: 13. Oktober - 'Hedwig - 20 Uhr'",
    code: null,
    twist: "Startpunkt. Drei Strange, die aufgedroselt werden mussen.",
  },
  {
    id: 2,
    name: "Das Schultagebuch",
    icon: "\uD83D\uDCDA",
    location: "Im Lehrerschrank",
    content:
      "Claras Klassenbuch 1990/91. Einige Eintrage mit Bleistift unterstrichen: 'Jonas B. - dritten Tag schlafrig, kaum ansprechbar' - 'Lea N. - Mutter gibt an, sie nehme ein Mittel vom Arzt fur Schlafprobleme. Welches Mittel fur ein 7-jahriges Kind?' Auf der letzten Seite, verkehrt herum:",
    clue: "Rezeptnummer 4471 - verbindet sich mit der Liste aus der Blechdose.",
    code: "4471",
    twist: null,
  },
  {
    id: 3,
    name: "Die Apothekenrechnung",
    icon: "\uD83D\uDDC2\uFE0F",
    location: "Hinter dem Bilderrahmen",
    content:
      "Vergilbtes Dokument. Rechnung der 'Dorf-Apotheke Noll' an die Gemeinde Eibenbach, August 1991. Fur: 'Beruhigungspraparate, Grosslieferung, Spende fur Altenheim'. Das Altenheim in Eibenbach hat es nie gegeben.",
    clue: "Unterschrieben von: Dr. A. Noll - nicht Hedwig, sondern Albert. Er war bereits 1991 aktiv involviert.",
    code: null,
    twist: "Albert Noll ist nicht nur ein Zeuge - er ist ein aktiver Tater.",
  },
  {
    id: 4,
    name: "Das Foto",
    icon: "\uD83D\uDCF7",
    location: "In der Schublade",
    content:
      "Schwarzweisses Foto vom Dorffest September 1991. Clara lacht, neben einer alteren Frau. Ruckseite, in Claras Handschrift: 'Mit H. - sie ist netter als ich dachte. Oder tut sie nur so?'",
    clue: "H. = Hedwig. Nicht Heinrich Steuer. Die Spielerin wird es zunachst falsch deuten.",
    code: null,
    twist: "Gezielte Falle: H. wirkt wie Heinrich (der Burgermeister), ist aber Hedwig.",
  },
  {
    id: 5,
    name: "Der Zeitungsartikel",
    icon: "\uD83D\uDCF0",
    location: "Im alten Koffer",
    content:
      "Ausschnitt aus dem 'Eibenbacher Boten', November 1993. Titel: 'Burgermeister Steuer nach kurzem Leiden verstorben.' Letzter Satz, fast abgerissen:",
    clue: "'...hinterlasst ein unlosliches Ratsel: Wo ist das Gemeindeprotokoll von 1991?'",
    code: "1310",
    twist: "Steuer ist nicht der Tater - er ist das zweite Opfer.",
  },
  {
    id: 6,
    name: "Das Duplikat-Protokoll",
    icon: "\uD83D\uDD11",
    location: "Im Hohlraum hinter dem Kachelofen",
    content:
      "Claras handgeschriebene Kopie von Teilen des Gemeindeprotokolls. Steuers Unterschrift unter fiktivem Holzverkauf. Apothekengenehmigung fur Noll ohne Ausschreibung. Letzter Eintrag von Clara:",
    clue: "'Falls mir etwas passiert: Thomas weiss, wo der Brief ist. Geht zu Thomas.' + Visitenkarte von Dr. Albert Noll - frische Tinte auf der Ruckseite: 'Lass es ruhen, Vera. Fur dein eigenes Bestes.'",
    code: null,
    twist: "FINALE ENTHULLUNG. Albert war vor Vera in diesem Haus.",
  },
];

export const timeline = [
  { year: "1979", event: "Hedwig Noll beginnt illegalen Medikamentenhandel in der Dorfapotheke", type: "crime" },
  { year: "1985", event: "Steuer wird Burgermeister. Kooperation mit Hedwig beginnt.", type: "crime" },
  { year: "1988", event: "Clara Voss kommt als neue Lehrerin nach Eibenbach", type: "neutral" },
  { year: "1989", event: "Clara beginnt Affare mit Steuer - bricht sie nach 4 Monaten ab", type: "neutral" },
  { year: "1990", event: "Clara bemerkt sedierte Kinder im Unterricht. Beginnt zu recherchieren.", type: "key" },
  { year: "Marz 1991", event: "Clara findet Beweise fur Geldwasche im Gemeindeprotokoll", type: "key" },
  { year: "Sep. 1991", event: "Clara schreibt den Brief. Gibt ihn Thomas zur Aufbewahrung.", type: "key" },
  { year: "13. Okt. 1991", event: "Hedwig ladt Clara zum 'Versohnungsgesprach'. Betaubt sie mit Chloralhydrat.", type: "crime" },
  { year: "14. Okt. 1991", event: "Clara tot im Dorfteich. Offiziell: Unfall. Albert beurkundet den Tod ohne Obduktion.", type: "crime" },
  { year: "1993", event: "Steuer stirbt an 'Herzinfarkt'. Keine Obduktion. Das Protokollbuch verschwindet.", type: "crime" },
  { year: "2019", event: "Hedwig Noll stirbt. Geehrt und betrauert vom ganzen Dorf. Grabstein: 'Sie gab, ohne zu nehmen.'", type: "irony" },
  { year: "2024", event: "Vera Voss betritt das Haus ihrer Mutter. Dr. Albert Noll beobachtet sie bereits.", type: "now" },
];

// ── RATSEL 1: Alibi-Prufung ────────────────────────────────────
export const PUZZLE_ALIBI = {
  id: "alibi",
  letter: "G",
  title: "Ratsel 1 - Das Alibi-Protokoll",
  instruction:
    "Vergleiche die Aussagen der drei Verdachtigen mit dem Gendarmerieprotokoll. Wer hat kein bestatigtes Alibi fur die Mordnacht?",
  clue: "BEWEIS A: Gendarmerieprotokoll - 13./14. Oktober 1991",
  accessLog: {
    header: "GENDARMERIEPROTOKOLL",
    name: "HEDWIG NOLL",
    entry: "Alibi-Angabe: zu Hause, krank",
    exit: "KEINE ZEUGEN BEFRAGT",
    date: "Nacht 13./14. Oktober 1991",
    highlight: "G",
    highlightWord: "Gendarmerieprotokoll",
  },
  statements: [
    {
      id: "thomas_alibi",
      suspect: "Thomas Brandt",
      text: "Ich war den ganzen Abend im Gasthof Zum Hirsch. Der Wirt und mindestens drei Stammgaste konnen das bestatigen.",
      correct: false,
    },
    {
      id: "hedwig_alibi",
      suspect: "Hedwig Noll",
      text: "Ich war zu Hause. Ich war krank - Erkaltung. Das kann niemand bestatigen, ich war allein. Aber das war ich eben.",
      correct: true,
    },
    {
      id: "steuer_alibi",
      suspect: "Heinrich Steuer",
      text: "Ich war beim Stammtisch der Burgerinitiative. Funf Manner sassen mit mir am Tisch, das ganze Dorf weiss das.",
      correct: false,
    },
  ],
  revealText:
    "Hedwig Nolls Alibi wurde von niemandem bestatigt - keine Zeugen, kein Arztbesuch, keine Spuren. Das 'G' in 'Gendarmerieprotokoll' leuchtet auf.",
};

// ── RATSEL 2: Tatnacht-Zeitlinie ───────────────────────────────
export const PUZZLE_TIMELINE = {
  id: "timeline",
  letter: "I",
  title: "Ratsel 2 - Die Tatnacht",
  instruction:
    "Bringe die Ereignisse der Mordnacht (13./14. Oktober 1991) in die richtige chronologische Reihenfolge.",
  clue: "BEWEIS B: Zeugenbefragungen & Schulunterlagen",
  events: [
    {
      id: "evt_school",
      time: "13. Okt., 14:30",
      text: "Clara verlasst die Schule. Kollegin: Sie wirkte besorgt, aber sprach mit niemandem.",
      detail: "Aussage von Kollegin Frau Mayer: 'Clara hatte heute ihren roten Schal an. Sie verabschiedete sich kurz, dann war sie weg.'",
      highlightLetter: false,
      highlightWord: null,
      correctIndex: 0,
    },
    {
      id: "evt_invite",
      time: "13. Okt., 16:00",
      text: "Hedwig schickt Nachricht an Clara: 'Komm heute Abend. Wir reden. 20 Uhr.'",
      detail: "Auf dem Kalenderblatt in der Blechdose vermerkt. Hedwig bestreitet, diese Einladung je ausgesprochen zu haben.",
      highlightLetter: false,
      highlightWord: null,
      correctIndex: 1,
      suspicious: true,
    },
    {
      id: "evt_drink",
      time: "13. Okt., 20:00",
      text: "Clara besucht Hedwig. Das Getrank - ein entscheidendes Indiz.",
      detail: "Chloralhydrat ist farblos, geruchlos und lost sich in Flussigkeiten auf. Die Wirkung tritt nach 30-60 Minuten ein. Im Blut kaum nachweisbar, wenn keine Obduktion erfolgt.",
      highlightLetter: true,
      highlightWord: "Indiz",
      correctIndex: 2,
      suspicious: true,
    },
    {
      id: "evt_lights",
      time: "14. Okt., 00:30",
      text: "Nachbar Karl Stein sieht eine Person Claras Haus verlassen.",
      detail: "Aussage von Karl Stein: 'Ich konnte nicht schlafen. Ich sah jemanden - klein, mit dunklem Mantel. Ich dachte, es sei Clara selbst.' Er hat nie eine Aussage bei der Polizei gemacht.",
      highlightLetter: false,
      highlightWord: null,
      correctIndex: 3,
    },
    {
      id: "evt_thomas",
      time: "14. Okt., 05:15",
      text: "Thomas Brandt findet Claras Leiche am Teichufer.",
      detail: "Thomas: 'Ich konnte nicht schlafen. Ich ging raus. Und dann... sie lag da. Barfuss. Ihr Gesicht im Wasser.' Er rannte weg, statt die Polizei zu rufen. Er hat 33 Jahre damit gelebt.",
      highlightLetter: false,
      highlightWord: null,
      correctIndex: 4,
    },
    {
      id: "evt_cert",
      time: "14. Okt., 07:45",
      text: "Dr. Albert Noll beurkundet den Tod als Unfall. Keine Obduktion wird angeordnet.",
      detail: "Auf dem Totenschein steht: 'Ertrinkungsunfall, keine Hinweise auf Fremdeinwirkung.' Albert Noll hat nie erklart, warum er keine Obduktion anordnete. Er praktiziert noch heute.",
      highlightLetter: false,
      highlightWord: null,
      correctIndex: 5,
    },
  ],
  revealText:
    "Das Getrank war das entscheidende Indiz. Hedwig hatte das Mittel - und kein Alibi. Das 'I' in 'Indiz' leuchtet auf.",
};

// ── RATSEL 3: Aussagenvergleich ────────────────────────────────
export const PUZZLE_STATEMENTS = {
  id: "statements",
  letter: "F",
  title: "Ratsel 3 - Das Insiderwissen",
  instruction:
    "Eine Person weiss etwas, das sie nicht wissen kann. Lies den Fundortbericht und klicke auf die verdachtige Aussage.",
  clue: "BEWEIS C: Fundortbericht - intern, nicht veroffentlicht",
  policeNote: `FUNDORTBERICHT - INTERN
Datum: 14. Oktober 1991
Die Leiche von Clara Voss wurde gegen 07:00 Uhr im Dorfteich aufgefunden.
Besonderheit: Die Verstorbene trug KEINE SCHUHE.
Dies deutet auf eine mogliche Bewusstlosigkeit vor dem Wasserkontakt hin.
DIESES DETAIL WURDE NICHT AN DIE PRESSE ODER OFFENTLICHKEIT WEITERGEGEBEN.`,
  statements: [
    {
      id: "thomas_stmt",
      suspect: "Thomas Brandt",
      text: "Ich fand sie im Wasser. Es war noch dunkel. Ich... ich konnte nichts mehr machen. Ich hatte sie warnen sollen.",
      correct: false,
    },
    {
      id: "steuer_stmt",
      suspect: "Heinrich Steuer",
      text: "Das ist eine Tragodie. Clara war eine gute Lehrerin. Ich habe von ihrem Tod erst am Morgen erfahren, wie alle anderen auch.",
      correct: false,
    },
    {
      id: "hedwig_stmt",
      suspect: "Hedwig Noll",
      text: "Die arme Clara. Sie muss in der Nacht einfach rausgegangen sein. Barfuss, wie sie war. Das arme, arme Kind.",
      correct: true,
    },
  ],
  revealText:
    "Nur die Taterln wussten, dass Clara keine Schuhe trug - weil sie sie selbst getragen hatte. Das 'F' in 'Fundortbericht' leuchtet auf.",
};

// ── RATSEL 4: Apothekenbuch ────────────────────────────────────
export const PUZZLE_RECEIPT = {
  id: "receipt",
  letter: "T",
  title: "Ratsel 4 - Das Apothekenbuch",
  instruction:
    "Durchsuche die Ausgabebelege der Dorf-Apotheke Noll. Klicke auf den Eintrag, der als Tatmittel gedient haben konnte.",
  clue: "BEWEIS D: Tagebuch der Dorf-Apotheke Noll (Ausgaben 1991)",
  transactions: [
    {
      id: "stein_nitrazepam",
      suspect: "Karl Stein",
      time: "05. Okt. 1991",
      location: "Dorf-Apotheke Noll",
      amount: "Nitrazepam 5mg",
      note: "Regulares Schlafmittel, verschrieben von Dr. Albert Noll. Normaler Vorgang, Rezept hinterlegt.",
      suspicious: false,
      correct: false,
    },
    {
      id: "nommensen_diazepam",
      suspect: "Familie Nommensen",
      time: "21. Sept. 1991",
      location: "Dorf-Apotheke Noll",
      amount: "Diazepam 5mg",
      note: "Beruhigungsmittel fur Kind (7 Jahre). Kein Rezept hinterlegt. Entspricht Claras Schulnotizen uber sedierte Kinder - 'Lea N. kaum ansprechbar'.",
      suspicious: true,
      correct: false,
    },
    {
      id: "chloral_intern",
      suspect: "Eigenbedarf (intern)",
      time: "12. Okt. 1991",
      location: "Dorf-Apotheke Noll",
      amount: "Chloralhydrat 2g",
      note: "Kein Patient verzeichnet. Kein Rezept. Kein Verwendungszweck. Chloralhydrat ist farblos, geruchlos und in Flussigkeiten losbar. Clara Voss wurde zwei Tage spater tot aufgefunden.",
      suspicious: true,
      correct: true,
    },
    {
      id: "gemeinde_lieferung",
      suspect: "Gemeinde Eibenbach",
      time: "10. Aug. 1991",
      location: "Dorf-Apotheke Noll",
      amount: "Grosslieferung Beruhigungsmittel",
      note: "Rechnung fur 'Altenheim-Spende'. Das Altenheim in Eibenbach existierte nie. Geldwasche - aber nicht das Tatmittel.",
      suspicious: true,
      correct: false,
    },
  ],
  revealText:
    "Chloralhydrat - ohne Rezept, ohne Patient, zwei Tage vor dem Mord. Das ist das Tatmittel. Das 'T' in 'Tagebuch der Dorf-Apotheke' leuchtet auf.",
};

// ── Finale Losung ──────────────────────────────────────────────
export const SOLUTION = {
  code: "GIFT",
  guilty: "Hedwig Noll",
  explanation:
    "Hedwig Noll ermordete Clara Voss - und zwei Jahre spater auch Heinrich Steuer.\n\nG - Hedwig hatte kein bestatigtes Alibi fur die Mordnacht\nI - Das Getrank beim 'Versohnungsgesprach' war das entscheidende Indiz\nF - Hedwig wusste, dass Clara barfuss war - weil sie sie selbst getragen hatte\nT - Chloralhydrat aus der Apotheke, ohne Rezept, zwei Tage vor dem Mord",
};

export const SOLUTION_TEXT =
  "Clara entdeckte 1991 ein Netzwerk aus Medikamentenschmuggel, Geldwasche und politischer Korruption.\n\n" +
  "Hedwig Noll - die eigentliche Drahtzieherin - betaubte Clara beim 'Versohnungsgesprach' am 13. Oktober mit Chloralhydrat und ertrankte sie im Dorfteich. Ihr Sohn Albert beurkundete den Tod als Unfall.\n\n" +
  "Heinrich Steuer schwieg aus Eigeninteresse - und wurde 1993 selbst ermordet, als er zu hadern begann.\n\n" +
  "Thomas Brandt fand Claras Leiche als Erster. Aus Angst hat er 33 Jahre geschwiegen.\n\n" +
  "Hedwig Noll starb 2019, geehrt und ungestraft. Ihr Sohn Albert Noll praktiziert noch heute. Er war vor Vera in diesem Haus. Die Visitenkarte beweist es.";

export const EPILOG =
  "Du horst ein Auto, das langsam die Dorfstrasse hochfahrt.\nEs halt vor dem Haus.\nEine Wagentür öffnet sich.";

export const NEXT_ROOM_HINT =
  "Thomas Brandt lebt noch. Er ist 67 und wohnt immer noch in Eibenbach. Er weiss alles. Und er wartet.";
