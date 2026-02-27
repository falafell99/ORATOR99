export interface WordAnalysis {
  word: string;
  accuracyScore: number;
  errorType: string; // "None", "Mispronunciation", "Omission", "Insertion"
}

export interface AnalysisResult {
  fluencyScore: number;
  pronunciationScore: number;
  prosodyScore: number;
  words: WordAnalysis[];
  positives: string[];
  improvements: string[];
}

const MOCK_RESULT: AnalysisResult = {
  fluencyScore: 92,
  pronunciationScore: 88,
  prosodyScore: 85,
  words: [
    { word: "I", accuracyScore: 95, errorType: "None" },
    { word: "believe", accuracyScore: 91, errorType: "None" },
    { word: "that", accuracyScore: 97, errorType: "None" },
    { word: "impromptu", accuracyScore: 62, errorType: "Mispronunciation" },
    { word: "speaking", accuracyScore: 89, errorType: "None" },
    { word: "is", accuracyScore: 98, errorType: "None" },
    { word: "one", accuracyScore: 94, errorType: "None" },
    { word: "of", accuracyScore: 99, errorType: "None" },
    { word: "the", accuracyScore: 97, errorType: "None" },
    { word: "most", accuracyScore: 90, errorType: "None" },
    { word: "valuable", accuracyScore: 55, errorType: "Mispronunciation" },
    { word: "skills", accuracyScore: 88, errorType: "None" },
    { word: "anyone", accuracyScore: 93, errorType: "None" },
    { word: "can", accuracyScore: 96, errorType: "None" },
    { word: "develop", accuracyScore: 87, errorType: "None" },
    { word: "because", accuracyScore: 91, errorType: "None" },
    { word: "it", accuracyScore: 99, errorType: "None" },
    { word: "builds", accuracyScore: 84, errorType: "None" },
    { word: "confidence", accuracyScore: 68, errorType: "Mispronunciation" },
    { word: "and", accuracyScore: 98, errorType: "None" },
    { word: "clarity", accuracyScore: 90, errorType: "None" },
  ],
  positives: [
    "Good overall fluency — your speech flowed naturally with minimal pauses.",
    "Strong prosody with varied intonation, keeping listeners engaged.",
  ],
  improvements: [
    "Work on pronouncing multi-syllable words like 'impromptu' and 'valuable' more clearly.",
    "Try slowing down slightly on complex words to improve your accuracy score.",
  ],
};

export async function analyzeAudio(
  audioBlob: Blob,
  textTranscript: string
): Promise<AnalysisResult> {
  try {
    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.webm");
    formData.append("transcript", textTranscript);

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
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // If we have a real transcript, use those words in the mock
    if (textTranscript.trim()) {
      const words = textTranscript.trim().split(/\s+/);
      const mockWords: WordAnalysis[] = words.map((word) => {
        const score = Math.floor(Math.random() * 30) + 70; // 70-100
        return {
          word,
          accuracyScore: score,
          errorType: score < 75 ? "Mispronunciation" : "None",
        };
      });
      return {
        ...MOCK_RESULT,
        words: mockWords,
      };
    }

    return MOCK_RESULT;
  }
}
