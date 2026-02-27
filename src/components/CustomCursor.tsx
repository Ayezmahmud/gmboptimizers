import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hoverColor, setHoverColor] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

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
    // Detect interactive elements
    const onOverIn = (e: Event) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], input, textarea, select, .hover-reveal-card, .hover-zoom-img");
      if (interactive) {
        setIsHovering(true);
        // Detect Google color from element
        const classes = interactive.className || "";
        if (classes.includes("google-blue") || classes.includes("text-google-blue")) setHoverColor("hsl(217, 90%, 61%)");
        else if (classes.includes("google-red") || classes.includes("text-google-red")) setHoverColor("hsl(9, 81%, 56%)");
        else if (classes.includes("google-yellow") || classes.includes("text-google-yellow")) setHoverColor("hsl(43, 96%, 50%)");
        else if (classes.includes("google-green") || classes.includes("text-google-green")) setHoverColor("hsl(142, 53%, 43%)");
        else setHoverColor(null);
      }
    };
    const onOverOut = (e: Event) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], input, textarea, select, .hover-reveal-card, .hover-zoom-img");
      if (interactive) {
        setIsHovering(false);
        setHoverColor(null);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", onOverIn);
    document.addEventListener("mouseout", onOverOut);

    // Hide default cursor globally
    document.documentElement.style.cursor = "none";

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", onOverIn);
      document.removeEventListener("mouseout", onOverOut);
      document.documentElement.style.cursor = "";
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp, handleMouseLeave, handleMouseEnter]);

  // Don't render on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  const dotColor = hoverColor || "hsl(var(--foreground))";

  return (
    <>
      {/* Outer ring */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 48 : 32,
            height: isHovering ? 48 : 32,
            opacity: visible ? 1 : 0,
            scale: isClicking ? 0.8 : 1,
            borderColor: isHovering ? (hoverColor || "rgba(255,255,255,0.9)") : "rgba(255,255,255,0.5)",
          }}
          transition={{ type: "spring", damping: 20, stiffness: 300, mass: 0.4 }}
          className="rounded-full border-2"
          style={{ borderColor: "rgba(255,255,255,0.5)" }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 6 : 5,
            height: isHovering ? 6 : 5,
            opacity: visible ? 1 : 0,
            scale: isClicking ? 0.5 : 1,
          }}
          transition={{ type: "spring", damping: 25, stiffness: 400, mass: 0.3 }}
          className="rounded-full bg-white"
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;
