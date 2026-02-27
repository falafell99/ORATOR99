import type { Lang } from "@/data/i18n";
import { t } from "@/data/i18n";

export interface WordAnalysis {
  word: string;
  accuracyScore: number;
  errorType: string;
}

export interface AnalysisResult {
  fluencyScore: number;
  pronunciationScore: number;
  prosodyScore: number;
  words: WordAnalysis[];
  positives: string[];
  improvements: string[];
}

function getMockResult(lang: Lang, textTranscript: string): AnalysisResult {
  const tr = t(lang);

  const baseWords: WordAnalysis[] = textTranscript.trim()
    ? textTranscript.trim().split(/\s+/).map((word) => {
        const score = Math.floor(Math.random() * 30) + 70;
        return { word, accuracyScore: score, errorType: score < 75 ? "Mispronunciation" : "None" };
      })
    : [];

  return {
    fluencyScore: 92,
    pronunciationScore: 88,
    prosodyScore: 85,
    words: baseWords,
    positives: tr.mockPositives as unknown as string[],
    improvements: tr.mockImprovements as unknown as string[],
  };
}

export async function analyzeAudio(
  audioBlob: Blob,
  textTranscript: string,
  lang: Lang
): Promise<AnalysisResult> {
  try {
    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.webm");
    formData.append("transcript", textTranscript);
    formData.append("lang", lang);

    const response = await fetch("http://localhost:8000/api/analyze-speech", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    return (await response.json()) as AnalysisResult;
  } catch (error) {
    console.warn("Backend unavailable, using mock data:", error);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return getMockResult(lang, textTranscript);
  }
}
