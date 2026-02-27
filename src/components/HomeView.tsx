import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AzureBadge from "./AzureBadge";
import type { Lang, Translations } from "@/data/i18n";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HomeViewProps {
  topics: string[];
  currentTopicIndex: number;
  isSpinning: boolean;
  onSpin: () => void;
  onStartTimer: () => void;
  lang: Lang;
  onLangChange: (lang: Lang) => void;
  t: Translations;
}

const HomeView = ({ topics, currentTopicIndex, isSpinning, onSpin, onStartTimer, lang, onLangChange, t: tr }: HomeViewProps) => {
  const prevIndex = (currentTopicIndex - 1 + topics.length) % topics.length;
  const nextIndex = (currentTopicIndex + 1) % topics.length;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between px-6 pt-4 sm:px-10 sm:pt-6">
        <div />
        <Select value={lang} onValueChange={(v) => onLangChange(v as Lang)}>
          <SelectTrigger className="w-auto gap-1.5 border border-border rounded-full px-3 py-1.5 text-sm font-sans h-auto bg-transparent">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">🇺🇸 EN</SelectItem>
            <SelectItem value="hu">🇭🇺 HU</SelectItem>
          </SelectContent>
        </Select>
        <p className="font-handwriting text-foreground text-lg sm:text-xl -rotate-3 flex items-center gap-1">
          {tr.tagline}
          <span className="text-xs text-muted-foreground">©</span>
        </p>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 px-6 py-8">
        {/* Left - Instructions */}
        <div className="text-left max-w-xs">
          <h1 className="font-handwriting text-4xl sm:text-5xl font-bold text-foreground leading-tight tracking-tight text-gradient-handwriting">
            {tr.title}
          </h1>
          <div className="mt-6 font-handwriting text-xl sm:text-2xl text-foreground space-y-1">
            <p>{tr.step1}</p>
            <p>{tr.step2}</p>
            <p>{tr.step3}</p>
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
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-center gap-4 pb-6 sm:pb-10">
        <button
          onClick={onSpin}
          disabled={isSpinning}
          className="bg-primary text-primary-foreground font-sans font-semibold px-8 py-3 rounded-full text-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {tr.spin}
        </button>
        <button
          onClick={onStartTimer}
          className="border-2 border-foreground text-foreground font-sans font-semibold px-8 py-3 rounded-full text-lg hover:bg-foreground hover:text-primary-foreground transition-colors flex items-center gap-2"
        >
          {tr.startTimer} <ArrowRight size={18} />
        </button>
      </div>
      <div className="pb-4 sm:pb-6">
        <AzureBadge />
      </div>
    </div>
  );
};

export default HomeView;
