import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PageTransition = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Branded progress bar overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 z-[9998] pointer-events-none"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Google-colored progress bar */}
            <div className="absolute top-0 left-0 right-0 h-[3px] overflow-hidden">
              <motion.div
                className="h-full"
                style={{
                  background: "linear-gradient(90deg, hsl(217 90% 61%), hsl(9 81% 56%), hsl(43 96% 50%), hsl(142 53% 43%))",
                }}
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        onAnimationComplete={() => setLoading(false)}
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageTransition;
