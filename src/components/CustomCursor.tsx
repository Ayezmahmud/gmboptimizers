import { useEffect, useState, useCallback } from "react";
import { motion, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [visible, setVisible] = useState(false);

  const springConfig = { damping: 28, stiffness: 400, mass: 0.3 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    x.set(e.clientX);
    y.set(e.clientY);
    if (!visible) setVisible(true);
  }, [x, y, visible]);

  useEffect(() => {
    const onOverIn = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select, .hover-reveal-card, .hover-zoom-img")) {
        setIsHovering(true);
      }
    };
    const onOverOut = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select, .hover-reveal-card, .hover-zoom-img")) {
        setIsHovering(false);
      }
    };

    const down = () => setIsClicking(true);
    const up = () => setIsClicking(false);
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", down);
    document.addEventListener("mouseup", up);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    document.addEventListener("mouseover", onOverIn);
    document.addEventListener("mouseout", onOverOut);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", down);
      document.removeEventListener("mouseup", up);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      document.removeEventListener("mouseover", onOverIn);
      document.removeEventListener("mouseout", onOverOut);
    };
  }, [handleMouseMove]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  const pinScale = isClicking ? 0.7 : isHovering ? 1.15 : 0.85;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{ x, y, translateX: "-50%", translateY: "-100%" }}
    >
      <motion.svg
        width="22"
        height="30"
        viewBox="0 0 40 56"
        fill="none"
        animate={{
          opacity: visible ? 1 : 0,
          scale: pinScale,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 350, mass: 0.3 }}
      >
        <defs>
          <filter id="ps" x="-20%" y="-10%" width="140%" height="130%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#000" floodOpacity="0.25" />
          </filter>
          <linearGradient id="pg" x1="0" y1="0" x2="40" y2="56" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4285F4" />
            <stop offset="35%" stopColor="#EA4335" />
            <stop offset="65%" stopColor="#FBBC04" />
            <stop offset="100%" stopColor="#34A853" />
          </linearGradient>
        </defs>
        <g filter="url(#ps)">
          <path
            d="M20 2C10.06 2 2 10.06 2 20c0 12.5 18 32 18 32s18-19.5 18-32C38 10.06 29.94 2 20 2z"
            fill="url(#pg)"
          />
          <motion.circle
            cx="20" cy="19" fill="white"
            animate={{ r: isHovering ? 8.5 : 7 }}
            transition={{ type: "spring", damping: 22, stiffness: 350 }}
          />
          <motion.circle
            cx="20" cy="19"
            animate={{
              r: isHovering ? 3.5 : 2.5,
              fill: isHovering ? "#EA4335" : "#4285F4",
            }}
            transition={{ type: "spring", damping: 22, stiffness: 350 }}
          />
        </g>
      </motion.svg>
    </motion.div>
  );
};

export default CustomCursor;
