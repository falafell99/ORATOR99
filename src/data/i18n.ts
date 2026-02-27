export type Lang = "en" | "hu";

export const TOPICS_EN = [
  "Multitasking",
  "Health",
  "Loneliness",
  "Rumors",
  "The golden hour",
  "The narrow focus",
  "Tradition vs innovation",
  "The easy choice vs the right choice",
  "Wake-up call",
  "Baby steps",
  "The comfort zone",
  "First impressions",
  "Social media",
  "Silence",
  "Forgiveness",
];

export const TOPICS_HU = [
  "Multitasking",
  "Egészség",
  "Magány",
  "Pletykák",
  "A tökéletes pillanat",
  "A szűk fókusz",
  "Hagyomány vs innováció",
  "A könnyű választás vs a helyes választás",
  "Ébresztő",
  "Kis lépések",
  "A komfortzóna",
  "Első benyomás",
  "Közösségi média",
  "Csend",
  "Megbocsátás",
];

const translations = {
  en: {
    tagline: "Baby steps to the Mic",
    title: "ORATOR",
    step1: "1) Get random topic",
    step2: "2) Set 1 min timer",
    step3: "3) Record & speak !! :)",
    spin: "Spin!",
    startTimer: "Start Timer",
    back: "Back",
    topicLabel: "Topic:",
    startSpeaking: "Start speaking...",
    analyzing: "AI is analyzing your speech patterns...",
    resultsTitle: "Your Speech Analysis",
    fluency: "Fluency Score",
    pronunciation: "Pronunciation Score",
    prosody: "Prosody Score",
    wordAnalysis: "📝 Word-Level Analysis",
    wordHint: "Hover over words to see individual scores.",
    wordRedHint: "Red words",
    needImprovement: "need improvement.",
    whatWentWell: "🟢 What went well",
    areasToImprove: "🎯 Areas to improve",
    practiceAnother: "Practice Another Topic",
    mockPositives: [
      "Good overall fluency — your speech flowed naturally with minimal pauses.",
      "Strong prosody with varied intonation, keeping listeners engaged.",
    ],
    mockImprovements: [
      "Work on pronouncing multi-syllable words like 'impromptu' and 'valuable' more clearly.",
      "Try slowing down slightly on complex words to improve your accuracy score.",
    ],
  },
  hu: {
    tagline: "Kis lépések a mikrofon felé",
    title: "ORATOR",
    step1: "1) Kapj egy témát",
    step2: "2) Állíts be 1 percet",
    step3: "3) Vedd fel és beszélj!!",
    spin: "Pörgetés!",
    startTimer: "Időzítő Indítása",
    back: "Vissza",
    topicLabel: "Téma:",
    startSpeaking: "Kezdj el beszélni...",
    analyzing: "Az AI elemzi a beszédmintáidat...",
    resultsTitle: "Beszédelemzésed",
    fluency: "Folyékonyság",
    pronunciation: "Kiejtés",
    prosody: "Hangsúlyozás",
    wordAnalysis: "📝 Szószintű elemzés",
    wordHint: "Vidd az egeret a szavak fölé az egyéni pontszámokért.",
    wordRedHint: "Piros szavak",
    needImprovement: "javításra szorulnak.",
    whatWentWell: "🟢 Mi sikerült jól",
    areasToImprove: "🎯 Fejlesztendő területek",
    practiceAnother: "Másik Téma Gyakorlása",
    mockPositives: [
      "Jó általános folyékonyság — a beszéded természetesen folyt, minimális szünetekkel.",
      "Erős hangsúlyozás változatos intonációval, ami lekötötte a hallgatókat.",
    ],
    mockImprovements: [
      "Dolgozz a többszótagú szavak tisztább kiejtésén.",
      "Próbálj meg kicsit lassítani az összetett szavaknál a pontosság javításához.",
    ],
  },
} as const;

export type Translations = typeof translations.en | typeof translations.hu;

export function t(lang: Lang) {
  return translations[lang];
}
