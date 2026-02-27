import { motion } from "framer-motion";
import type { Translations } from "@/data/i18n";

interface AnalyzingViewProps {
  t: Translations;
}

const AnalyzingView = ({ t: tr }: AnalyzingViewProps) => (
  <div className="min-h-screen flex flex-col items-center justify-center gap-8">
    <motion.div
      className="w-12 h-12 border-4 border-foreground border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
    />
    <p className="font-serif text-xl sm:text-2xl text-foreground">
      {tr.analyzing}
    </p>
  </div>
);

export default AnalyzingView;
