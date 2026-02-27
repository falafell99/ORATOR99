import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RotateCcw, Play, Square, Mic } from "lucide-react";

interface TimerViewProps {
  topic: string;
  onBack: () => void;
  onTimerEnd: (audioBlob: Blob | null, transcript: string) => void;
}

const TimerView = ({ topic, onBack, onTimerEnd }: TimerViewProps) => {
  const [totalSeconds, setTotalSeconds] = useState(60);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimText, setInterimText] = useState("");
  const [micError, setMicError] = useState<string | null>(null);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopEverything = useCallback(() => {
    // Stop timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Stop media recorder
    let audioBlob: Blob | null = null;
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    if (chunksRef.current.length > 0) {
      audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
    }

    // Stop speech recognition
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }

    // Stop media stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }

    setIsRunning(false);
    return audioBlob;
  }, []);

  // Timer countdown
  useEffect(() => {
    if (isRunning && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            // Timer done — will be handled by the effect below
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  // When timer hits 0
  useEffect(() => {
    if (isRunning && secondsLeft === 0) {
      const blob = stopEverything();
      const finalTranscript = transcript + (interimText ? " " + interimText : "");
      onTimerEnd(blob, finalTranscript.trim());
    }
  }, [secondsLeft, isRunning]);

  const startRecording = async () => {
    setMicError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // MediaRecorder
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.start();
      mediaRecorderRef.current = recorder;

      // SpeechRecognition
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onresult = (event: any) => {
          let interim = "";
          let final = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const t = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              final += t + " ";
            } else {
              interim += t;
            }
          }
          if (final) {
            setTranscript((prev) => (prev + " " + final).trim());
          }
          setInterimText(interim);
        };

        recognition.onerror = (e: any) => {
          console.warn("Speech recognition error:", e.error);
        };

        recognition.start();
        recognitionRef.current = recognition;
      }

      setIsRunning(true);
    } catch (err) {
      console.error("Microphone access denied:", err);
      setMicError("Microphone access denied. Please allow mic permissions.");
    }
  };

  const handlePlayStop = () => {
    if (isRunning) {
      const blob = stopEverything();
      const finalTranscript = transcript + (interimText ? " " + interimText : "");
      onTimerEnd(blob, finalTranscript.trim());
    } else {
      startRecording();
    }
  };

  const handleReset = () => {
    stopEverything();
    setSecondsLeft(totalSeconds);
    setTranscript("");
    setInterimText("");
  };

  const adjustTime = (delta: number) => {
    if (isRunning) return;
    const newTotal = Math.max(30, Math.min(300, totalSeconds + delta));
    setTotalSeconds(newTotal);
    setSecondsLeft(newTotal);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const displayTranscript = (transcript + (interimText ? " " + interimText : "")).trim();

  return (
    <div className="min-h-screen flex flex-col items-center px-6">
      {/* Header */}
      <div className="w-full flex items-center justify-between pt-4 sm:pt-6">
        <button
          onClick={() => { stopEverything(); onBack(); }}
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
      <div className="flex items-center justify-center py-6">
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full border-8 border-accent flex flex-col items-center justify-center">
          {isRunning && (
            <Mic size={18} className="text-destructive animate-pulse mb-2" />
          )}
          <p className="font-serif text-6xl sm:text-7xl font-bold text-foreground tabular-nums">
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

      {/* Live Transcript */}
      <div className="w-full max-w-lg min-h-[80px] text-center px-4 mb-4">
        {micError && (
          <p className="text-sm text-destructive font-sans">{micError}</p>
        )}
        <AnimatePresence mode="popLayout">
          {displayTranscript && (
            <motion.p
              key={displayTranscript.slice(-40)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-handwriting text-xl sm:text-2xl text-muted-foreground leading-relaxed"
            >
              {displayTranscript}
            </motion.p>
          )}
        </AnimatePresence>
        {isRunning && !displayTranscript && (
          <p className="font-handwriting text-lg text-muted-foreground/50 italic">
            Start speaking...
          </p>
        )}
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
