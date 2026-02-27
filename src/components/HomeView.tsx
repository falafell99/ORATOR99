import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface HomeViewProps {
  topics: string[];
  currentTopicIndex: number;
  isSpinning: boolean;
  onSpin: () => void;
  onStartTimer: () => void;
}

const HomeView = ({ topics, currentTopicIndex, isSpinning, onSpin, onStartTimer }: HomeViewProps) => {
  const prevIndex = (currentTopicIndex - 1 + topics.length) % topics.length;
  const nextIndex = (currentTopicIndex + 1) % topics.length;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between px-6 pt-4 sm:px-10 sm:pt-6">
        <div />
        <div className="flex items-center gap-1.5 border border-border rounded-full px-3 py-1.5 text-sm font-sans">
          <span>🇺🇸</span>
          <span className="font-medium text-foreground">EN</span>
          <span className="text-muted-foreground">▾</span>
        </div>
        <p className="font-handwriting text-foreground text-lg sm:text-xl -rotate-3 flex items-center gap-1">
          Baby steps to the Mic
          <span className="text-xs text-muted-foreground">©</span>
        </p>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 px-6 py-8">
        {/* Left - Instructions */}
        <div className="text-left max-w-xs">
          <h1 className="font-handwriting text-4xl sm:text-5xl font-bold text-foreground leading-tight tracking-tight text-gradient-handwriting">
            IMPROMPTU<br />SPEAKING
          </h1>
          <div className="mt-6 font-handwriting text-xl sm:text-2xl text-foreground space-y-1">
            <p>1) Get random topic</p>
            <p>2) Set 1 min timer</p>
            <p>3) Record & speak !! :)</p>
          </div>
        </div>

        {/* Center - Topic Roulette */}
        <div className="flex flex-col items-center">
          <div className="relative overflow-hidden h-[220px] w-[320px] sm:w-[400px] flex flex-col items-center justify-center">
            {/* Top topic (faded) */}
            <div className="text-center mb-2 border-b border-border pb-3 w-full">
              <motion.p
                key={`prev-${prevIndex}`}
                className="font-serif text-lg sm:text-xl text-muted-foreground/30"
                animate={isSpinning ? { filter: "blur(2px)" } : { filter: "blur(0px)" }}
              >
                {topics[prevIndex]}
              </motion.p>
            </div>

            {/* Center topic (active) */}
            <div className="text-center my-2 w-full">
              <motion.p
                key={`current-${currentTopicIndex}`}
                className="font-serif text-2xl sm:text-4xl font-bold text-foreground"
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  filter: isSpinning ? "blur(1px)" : "blur(0px)",
                }}
                transition={{ duration: 0.1 }}
              >
                {topics[currentTopicIndex]}
              </motion.p>
            </div>

            {/* Bottom topic (faded) */}
            <div className="text-center mt-2 border-t border-border pt-3 w-full">
              <motion.p
                key={`next-${nextIndex}`}
                className="font-serif text-lg sm:text-xl text-muted-foreground/30"
                animate={isSpinning ? { filter: "blur(2px)" } : { filter: "blur(0px)" }}
              >
                {topics[nextIndex]}
              </motion.p>
            </div>
          </div>
        </div>

        {/* Right - Lever */}
        <div className="flex flex-col items-center gap-2">
          <p className="font-handwriting text-muted-foreground text-lg -rotate-3">pull lever</p>
          <p className="font-handwriting text-muted-foreground text-sm">↓</p>
          <button onClick={onSpin} className="group flex flex-col items-center cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-accent border-2 border-accent shadow-md group-hover:scale-110 transition-transform" />
            <div className="w-2 h-16 bg-foreground rounded-full" />
            <div className="w-5 h-5 rounded-full bg-foreground" />
          </button>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-center gap-4 pb-10 sm:pb-16">
        <button
          onClick={onSpin}
          disabled={isSpinning}
          className="bg-primary text-primary-foreground font-sans font-semibold px-8 py-3 rounded-full text-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          Spin!
        </button>
        <button
          onClick={onStartTimer}
          className="border-2 border-foreground text-foreground font-sans font-semibold px-8 py-3 rounded-full text-lg hover:bg-foreground hover:text-primary-foreground transition-colors flex items-center gap-2"
        >
          Start Timer <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default HomeView;
