import { useEffect, useState, useCallback } from "react";
import { motion, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [visible, setVisible] = useState(false);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
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

  const lineLen = isHovering ? 16 : 10;
  const gap = isHovering ? 6 : 4;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
    >
      <motion.svg
        width="48"
        height="48"
        viewBox="-24 -24 48 48"
        animate={{
          opacity: visible ? 1 : 0,
          scale: isClicking ? 0.75 : 1,
          rotate: isHovering ? 45 : 0,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300, mass: 0.4 }}
      >
        {/* Top line */}
        <motion.line
          x1={0} x2={0}
          animate={{ y1: -gap - lineLen, y2: -gap }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          stroke="white" strokeWidth={isHovering ? 1.5 : 1} strokeLinecap="round"
        />
        {/* Bottom line */}
        <motion.line
          x1={0} x2={0}
          animate={{ y1: gap, y2: gap + lineLen }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          stroke="white" strokeWidth={isHovering ? 1.5 : 1} strokeLinecap="round"
        />
        {/* Left line */}
        <motion.line
          y1={0} y2={0}
          animate={{ x1: -gap - lineLen, x2: -gap }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          stroke="white" strokeWidth={isHovering ? 1.5 : 1} strokeLinecap="round"
        />
        {/* Right line */}
        <motion.line
          y1={0} y2={0}
          animate={{ x1: gap, x2: gap + lineLen }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          stroke="white" strokeWidth={isHovering ? 1.5 : 1} strokeLinecap="round"
        />
        {/* Center dot */}
        <motion.circle
          cx={0} cy={0}
          animate={{ r: isHovering ? 2.5 : 1.5 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          fill="white"
        />
      </motion.svg>
    </motion.div>
  );
};

export default CustomCursor;
