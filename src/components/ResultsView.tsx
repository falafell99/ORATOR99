import { motion } from "framer-motion";

interface ResultsViewProps {
  onReset: () => void;
}

const ResultsView = ({ onReset }: ResultsViewProps) => {
  const metrics = [
    { label: "Pace", value: "125 WPM", color: "text-success" },
    { label: "Filler Words", value: "4 detected", color: "text-warning" },
    { label: "Confidence Score", value: "88%", color: "text-accent" },
  ];

  const positives = [
    "Great use of pauses for emphasis — kept the audience engaged.",
    "Strong opening that immediately established your point of view.",
  ];

  const improvements = [
    "Try reducing filler words like 'um' and 'like' — pause silently instead.",
    "Your closing could be stronger — end with a memorable statement or call to action.",
  ];

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-10 sm:py-16">
      <h1 className="font-serif text-3xl sm:text-5xl font-bold text-foreground mb-10">
        Your Speech Analysis
      </h1>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-3xl mb-12">
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

      {/* Feedback */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="font-serif text-lg font-semibold text-foreground mb-3">🟢 What went well</h3>
          <ul className="space-y-2">
            {positives.map((p, i) => (
              <li key={i} className="text-sm font-sans text-muted-foreground leading-relaxed">• {p}</li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="font-serif text-lg font-semibold text-foreground mb-3">🎯 Areas to improve</h3>
          <ul className="space-y-2">
            {improvements.map((p, i) => (
              <li key={i} className="text-sm font-sans text-muted-foreground leading-relaxed">• {p}</li>
            ))}
          </ul>
        </motion.div>
      </div>

      <button
        onClick={onReset}
        className="bg-primary text-primary-foreground font-sans font-semibold px-10 py-3.5 rounded-full text-lg hover:opacity-90 transition-opacity"
      >
        Practice Another Topic
      </button>
    </div>
  );
};

export default ResultsView;
