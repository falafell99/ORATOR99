import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import { TOPICS } from "@/data/topics";
import HomeView from "@/components/HomeView";
import TimerView from "@/components/TimerView";
import AnalyzingView from "@/components/AnalyzingView";
import ResultsView from "@/components/ResultsView";

type AppState = "HOME" | "TIMER" | "ANALYZING" | "RESULTS";

const Index = () => {
  const [state, setState] = useState<AppState>("HOME");
  const [currentTopicIndex, setCurrentTopicIndex] = useState(2);
  const [isSpinning, setIsSpinning] = useState(false);

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
  const handleTimerEnd = () => setState("ANALYZING");
  const handleReset = () => setState("HOME");

  useEffect(() => {
    if (state === "ANALYZING") {
      const timeout = setTimeout(() => setState("RESULTS"), 3000);
      return () => clearTimeout(timeout);
    }
  }, [state]);

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
            <ResultsView onReset={handleReset} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
