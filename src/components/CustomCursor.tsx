import { useEffect, useState, useCallback } from "react";
import { motion, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [visible, setVisible] = useState(false);

  const springConfig = { damping: 22, stiffness: 280, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    x.set(e.clientX);
    y.set(e.clientY);
    if (!visible) setVisible(true);
  }, [x, y, visible]);

  const handleMouseDown = useCallback(() => setIsClicking(true), []);
  const handleMouseUp = useCallback(() => setIsClicking(false), []);
  const handleMouseLeave = useCallback(() => setVisible(false), []);
  const handleMouseEnter = useCallback(() => setVisible(true), []);

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

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", onOverIn);
    document.addEventListener("mouseout", onOverOut);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", onOverIn);
      document.removeEventListener("mouseout", onOverOut);
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp, handleMouseLeave, handleMouseEnter]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{ x, y, translateX: "-50%", translateY: "-100%" }}
    >
      <motion.svg
        width="40"
        height="56"
        viewBox="0 0 40 56"
        fill="none"
        animate={{
          opacity: visible ? 1 : 0,
          scale: isClicking ? 0.75 : isHovering ? 1.25 : 1,
          rotate: isHovering ? [0, -8, 8, -4, 0] : 0,
        }}
        transition={isHovering ? {
          rotate: { duration: 0.5, ease: "easeInOut" },
          scale: { type: "spring", damping: 18, stiffness: 300 },
        } : {
          type: "spring", damping: 20, stiffness: 300, mass: 0.4,
        }}
      >
        {/* Drop shadow */}
        <defs>
          <filter id="pin-shadow" x="-20%" y="-10%" width="140%" height="130%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.3" />
          </filter>
          <linearGradient id="pin-gradient" x1="0" y1="0" x2="40" y2="56" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4285F4" />
            <stop offset="35%" stopColor="#EA4335" />
            <stop offset="65%" stopColor="#FBBC04" />
            <stop offset="100%" stopColor="#34A853" />
          </linearGradient>
          <radialGradient id="pin-shine" cx="35%" cy="30%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.4" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Pin shape - Google Maps style teardrop */}
        <g filter="url(#pin-shadow)">
          <path
            d="M20 2C10.06 2 2 10.06 2 20c0 12.5 18 32 18 32s18-19.5 18-32C38 10.06 29.94 2 20 2z"
            fill="url(#pin-gradient)"
          />
          {/* Glossy shine overlay */}
          <path
            d="M20 2C10.06 2 2 10.06 2 20c0 12.5 18 32 18 32s18-19.5 18-32C38 10.06 29.94 2 20 2z"
            fill="url(#pin-shine)"
          />
          {/* Inner white circle */}
          <motion.circle
            cx="20"
            cy="19"
            fill="white"
            animate={{ r: isHovering ? 9 : 7 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          />
          {/* Inner colored dot */}
          <motion.circle
            cx="20"
            cy="19"
            animate={{
              r: isHovering ? 4 : 3,
              fill: isHovering ? "#EA4335" : "#4285F4",
            }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          />
        </g>
      </motion.svg>

      {/* Ripple effect on hover */}
      {isHovering && (
        <motion.div
          className="absolute bottom-0 left-1/2"
          style={{ translateX: "-50%" }}
          initial={{ width: 6, height: 3, opacity: 0.4 }}
          animate={{ width: 24, height: 8, opacity: 0 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeOut" }}
        >
          <div className="w-full h-full rounded-full" style={{ background: "linear-gradient(90deg, #4285F4, #EA4335, #FBBC04, #34A853)" }} />
        </motion.div>
      )}
    </motion.div>
  );
};

export default CustomCursor;
