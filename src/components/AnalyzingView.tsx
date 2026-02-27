import { motion } from "framer-motion";

const AnalyzingView = () => (
  <div className="min-h-screen flex flex-col items-center justify-center gap-8">
    <motion.div
      className="w-12 h-12 border-4 border-foreground border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
    />
    <p className="font-serif text-xl sm:text-2xl text-foreground">
      AI is analyzing your speech patterns...
    </p>
  </div>
);

export default AnalyzingView;
