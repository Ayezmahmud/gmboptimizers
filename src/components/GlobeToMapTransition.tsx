import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Scroll-driven transition: 3D globe perspective flattens into a 2D world map.
 * As the user scrolls, a circular masked globe preview morphs into a full flat map.
 */
const GlobeToMapTransition = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Map image: starts circular (like globe) → flattens to rectangle
  const borderRadius = useTransform(scrollYProgress, [0, 0.3, 0.6], ["50%", "20%", "4px"]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.5], [0.5, 0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.4], [0, 0.6, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.4, 0.6], [35, 10, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.6], [-80, -20, 0]);

  // Overlay that fades from globe-blue tint to transparent
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [0.7, 0.3, 0]);

  // Label reveal
  const labelOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const labelY = useTransform(scrollYProgress, [0.4, 0.6], [20, 0]);

  return (
    <div ref={ref} className="relative py-20 md:py-32 border-b border-border overflow-hidden bg-background">
      {/* Connection line from above (globe) */}
      <motion.div
        style={{ opacity: useTransform(scrollYProgress, [0, 0.2, 0.5], [0.8, 0.4, 0]) }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-google-blue/60 to-transparent"
      />

      <div className="container mx-auto px-6" style={{ perspective: "1200px" }}>
        {/* Map container with perspective transform */}
        <motion.div
          style={{ scale, opacity, rotateX, y, borderRadius }}
          className="relative mx-auto max-w-4xl overflow-hidden shadow-2xl border border-border"
        >
          <img
            src="/images/world-map-flat.png"
            alt="Global reach - World map showing GB Optimizers' worldwide presence"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
          {/* Blue tint overlay that fades as map flattens */}
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-google-blue/40 mix-blend-overlay pointer-events-none"
          />
          {/* Grid overlay for tech feel */}
          <motion.div
            style={{ opacity: useTransform(scrollYProgress, [0.1, 0.4, 0.6], [0.3, 0.15, 0]) }}
            className="absolute inset-0 pointer-events-none"
            // CSS grid pattern
          >
            <div className="w-full h-full" style={{
              backgroundImage: "linear-gradient(rgba(66,133,244,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(66,133,244,0.15) 1px, transparent 1px)",
              backgroundSize: "40px 40px"
            }} />
          </motion.div>
        </motion.div>

        {/* Label that fades in */}
        <motion.div
          style={{ opacity: labelOpacity, y: labelY }}
          className="text-center mt-8"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Trusted by businesses across <span className="text-google-blue">12+ countries</span> worldwide
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default GlobeToMapTransition;
