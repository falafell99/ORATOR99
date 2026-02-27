import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, RotateCcw, Play, Square } from "lucide-react";

interface TimerViewProps {
  topic: string;
  onBack: () => void;
  onTimerEnd: () => void;
}

const TimerView = ({ topic, onBack, onTimerEnd }: TimerViewProps) => {
  const [totalSeconds, setTotalSeconds] = useState(60);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            onTimerEnd();
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, secondsLeft, onTimerEnd]);

  const handlePlayStop = () => {
    if (isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsRunning(false);
      onTimerEnd();
    } else {
      setIsRunning(true);
    }
  };

  const handleReset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsRunning(false);
    setSecondsLeft(totalSeconds);
  };

  const adjustTime = (delta: number) => {
    if (isRunning) return;
    const newTotal = Math.max(30, Math.min(300, totalSeconds + delta));
    setTotalSeconds(newTotal);
    setSecondsLeft(newTotal);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="min-h-screen flex flex-col items-center px-6">
      {/* Header */}
      <div className="w-full flex items-center justify-between pt-4 sm:pt-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-foreground font-sans text-sm hover:opacity-70 transition-opacity"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <p className="font-handwriting text-foreground text-lg sm:text-xl -rotate-3 flex items-center gap-1">
          Baby steps to the Mic
          <span className="text-xs text-muted-foreground">©</span>
        </p>
      </div>

      {/* Topic */}
      <div className="mt-6 text-center">
        <p className="text-xs font-sans tracking-[0.2em] text-muted-foreground uppercase">Topic:</p>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-1">{topic}</h2>
      </div>

      {/* Timer Circle */}
      <div className="flex-1 flex items-center justify-center py-8">
        <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full border-8 border-accent flex flex-col items-center justify-center">
          <p className="font-serif text-6xl sm:text-8xl font-bold text-foreground tabular-nums">
            {minutes}:{seconds.toString().padStart(2, "0")}
          </p>
          {!isRunning && (
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => adjustTime(-30)}
                className="border border-foreground rounded-full px-4 py-1.5 text-sm font-sans text-foreground hover:bg-foreground hover:text-primary-foreground transition-colors"
              >
                −0:30
              </button>
              <button
                onClick={() => adjustTime(30)}
                className="border border-foreground rounded-full px-4 py-1.5 text-sm font-sans text-foreground hover:bg-foreground hover:text-primary-foreground transition-colors"
              >
                +0:30
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6 pb-10 sm:pb-16">
        <button
          onClick={handleReset}
          className="w-12 h-12 rounded-full border-2 border-foreground flex items-center justify-center text-foreground hover:bg-foreground hover:text-primary-foreground transition-colors"
        >
          <RotateCcw size={20} />
        </button>
        <motion.button
          onClick={handlePlayStop}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
            isRunning
              ? "bg-destructive text-destructive-foreground animate-pulse-glow"
              : "bg-accent text-accent-foreground"
          }`}
          whileTap={{ scale: 0.9 }}
        >
          {isRunning ? <Square size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
        </motion.button>
      </div>
    </div>
  );
};

export default TimerView;
