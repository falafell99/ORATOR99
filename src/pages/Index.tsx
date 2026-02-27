import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import { TOPICS } from "@/data/topics";
import HomeView from "@/components/HomeView";
import TimerView from "@/components/TimerView";
import AnalyzingView from "@/components/AnalyzingView";
import ResultsView from "@/components/ResultsView";
import { analyzeAudio, type AnalysisResult } from "@/services/analyzeAudio";

type AppState = "HOME" | "TIMER" | "ANALYZING" | "RESULTS";

const Index = () => {
  const [state, setState] = useState<AppState>("HOME");
  const [currentTopicIndex, setCurrentTopicIndex] = useState(2);
  const [isSpinning, setIsSpinning] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult | null>(null);

  const audioBlobRef = useRef<Blob | null>(null);
  const transcriptRef = useRef<string>("");

  const selectedTopic = TOPICS[currentTopicIndex];

  const handleSpin = useCallback(() => {
    if (isSpinning) return;
    setIsSpinning(true);

    let count = 0;
    const totalTicks = 20;
    const interval = setInterval(() => {
      setCurrentTopicIndex((prev) => (prev + 1) % TOPICS.length);
      count++;
      if (count >= totalTicks) {
        clearInterval(interval);
        const finalIndex = Math.floor(Math.random() * TOPICS.length);
        setCurrentTopicIndex(finalIndex);
        setIsSpinning(false);
      }
    }, 75);
  }, [isSpinning]);

  const handleStartTimer = () => setState("TIMER");
  const handleBack = () => setState("HOME");

  const handleTimerEnd = (audioBlob: Blob | null, transcript: string) => {
    audioBlobRef.current = audioBlob;
    transcriptRef.current = transcript;
    setState("ANALYZING");
  };

  const handleReset = () => {
    setAnalysisResults(null);
    setState("HOME");
  };

  // Analyzing: call backend
  useEffect(() => {
    if (state === "ANALYZING") {
      const blob = audioBlobRef.current || new Blob();
      const text = transcriptRef.current;

      analyzeAudio(blob, text).then((results) => {
        setAnalysisResults(results);
        setState("RESULTS");
      });
    }
  }, [state]);

  const defaultResults: AnalysisResult = {
    fluencyScore: 0,
    pronunciationScore: 0,
    prosodyScore: 0,
    words: [],
    positives: [],
    improvements: [],
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <AnimatePresence mode="wait">
        {state === "HOME" && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <HomeView
              topics={TOPICS}
              currentTopicIndex={currentTopicIndex}
              isSpinning={isSpinning}
              onSpin={handleSpin}
              onStartTimer={handleStartTimer}
            />
          </motion.div>
        )}
        {state === "TIMER" && (
          <motion.div
            key="timer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <TimerView
              topic={selectedTopic}
              onBack={handleBack}
              onTimerEnd={handleTimerEnd}
            />
          </motion.div>
        )}
        {state === "ANALYZING" && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <AnalyzingView />
          </motion.div>
        )}
        {state === "RESULTS" && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ResultsView
              onReset={handleReset}
              results={analysisResults || defaultResults}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
