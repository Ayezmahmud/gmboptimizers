import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollRevealSectionProps {
  children: ReactNode;
  className?: string;
  /** Scale animation: section grows from this value to 1 */
  scaleFrom?: number;
  /** Whether to apply the cinematic clip-path reveal from bottom */
  clipReveal?: boolean;
  /** Whether to apply parallax zoom to images inside */
  parallaxZoom?: boolean;
  /** Delay the reveal slightly for stagger effect */
  delay?: number;
}

/**
 * Rolex-style scroll-driven section reveal.
 * Uses scroll progress to smoothly animate:
 * - Scale (0.92 → 1)
 * - Opacity (0 → 1)
 * - Y translation (60px → 0)
 * - Optional clip-path reveal (bottom to top)
 */
const ScrollRevealSection = ({
  children,
  className = "",
  scaleFrom = 0.96,
  clipReveal = false,
}: ScrollRevealSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Smooth rolling: gentler ranges for a fluid feel
  const opacity = useTransform(scrollYProgress, [0.05, 0.3], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.05, 0.35], [scaleFrom, 1]);
  const y = useTransform(scrollYProgress, [0.05, 0.3], [30, 0]);
  
  // Clip-path for cinematic reveal
  const clipProgress = useTransform(scrollYProgress, [0.05, 0.35], [0, 100]);
  const clipPath = useTransform(clipProgress, (v) =>
    clipReveal ? `inset(0 0 ${100 - v}% 0)` : "none"
  );

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, y, clipPath, willChange: "transform, opacity" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * Rolex-style parallax image zoom tied to scroll.
 * The image scales from 1.15 to 1 as it scrolls through viewport.
 */
export const ScrollParallaxImage = ({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ scale: imgScale, y: imgY }}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
};

/**
 * Rolex-style text reveal - each line fades up with scroll
 */
export const ScrollTextReveal = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.35"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.8], [24, 0]);

  return (
    <motion.div ref={ref} style={{ opacity, y, willChange: "transform, opacity" }} className={className}>
      {children}
    </motion.div>
  );
};

/**
 * Horizontal scroll-driven stagger for cards/grid items
 */
export const ScrollStaggerItem = ({
  children,
  index = 0,
  className = "",
}: {
  children: ReactNode;
  index?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.98", "start 0.45"],
  });

  const delay = index * 0.06;
  const adjustedStart = Math.min(delay, 0.35);
  const opacity = useTransform(
    scrollYProgress,
    [adjustedStart, adjustedStart + 0.5],
    [0, 1]
  );
  const y = useTransform(
    scrollYProgress,
    [adjustedStart, adjustedStart + 0.5],
    [30, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [adjustedStart, adjustedStart + 0.5],
    [0.97, 1]
  );

  return (
    <motion.div ref={ref} style={{ opacity, y, scale, willChange: "transform, opacity" }} className={className}>
      {children}
    </motion.div>
  );
};

export default ScrollRevealSection;
