import { motion } from "framer-motion";
import type { AnalysisResult } from "@/services/analyzeAudio";
import type { Translations } from "@/data/i18n";
import AzureBadge from "./AzureBadge";

interface ResultsViewProps {
  onReset: () => void;
  results: AnalysisResult;
  t: Translations;
}

const ResultsView = ({ onReset, results, t: tr }: ResultsViewProps) => {
  const metrics = [
    { label: tr.fluency, value: `${results.fluencyScore}/100`, color: "text-success" },
    { label: tr.pronunciation, value: `${results.pronunciationScore}/100`, color: "text-warning" },
    { label: tr.prosody, value: `${results.prosodyScore}/100`, color: "text-accent" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-10 sm:py-16">
      <div className="w-full flex justify-end mb-4">
        <AzureBadge />
      </div>

      <h1 className="font-serif text-3xl sm:text-5xl font-bold text-foreground mb-10">
        {tr.resultsTitle}
      </h1>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-3xl mb-10">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className="bg-card rounded-xl p-6 shadow-sm text-center"
          >
            <p className="text-sm font-sans text-muted-foreground mb-2">{m.label}</p>
            <p className={`text-3xl font-serif font-bold ${m.color}`}>{m.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Word-Level Analysis */}
      {results.words.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-3xl mb-10"
        >
          <h3 className="font-serif text-lg font-semibold text-foreground mb-3">
            {tr.wordAnalysis}
          </h3>
          <div className="bg-card rounded-xl p-6 shadow-sm">
            <div className="flex flex-wrap gap-1.5 leading-relaxed">
              {results.words.map((w, i) => (
                <span
                  key={i}
                  className={`font-sans text-base px-1 rounded ${
                    w.accuracyScore < 75
                      ? "bg-destructive/15 text-destructive font-medium"
                      : "text-foreground"
                  }`}
                  title={`Score: ${w.accuracyScore} | ${w.errorType}`}
                >
                  {w.word}
                </span>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3 font-sans">
              {tr.wordHint} <span className="text-destructive">{tr.wordRedHint}</span> {tr.needImprovement}
            </p>
          </div>
        </motion.div>
      )}

      {/* Feedback */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="font-serif text-lg font-semibold text-foreground mb-3">{tr.whatWentWell}</h3>
          <ul className="space-y-2">
            {results.positives.map((p, i) => (
              <li key={i} className="text-sm font-sans text-muted-foreground leading-relaxed">• {p}</li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="font-serif text-lg font-semibold text-foreground mb-3">{tr.areasToImprove}</h3>
          <ul className="space-y-2">
            {results.improvements.map((p, i) => (
              <li key={i} className="text-sm font-sans text-muted-foreground leading-relaxed">• {p}</li>
            ))}
          </ul>
        </motion.div>
      </div>

      <button
        onClick={onReset}
        className="bg-primary text-primary-foreground font-sans font-semibold px-10 py-3.5 rounded-full text-lg hover:opacity-90 transition-opacity"
      >
        {tr.practiceAnother}
      </button>
    </div>
  );
};

export default ResultsView;
