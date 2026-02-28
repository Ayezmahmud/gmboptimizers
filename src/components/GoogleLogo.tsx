import { useState, useRef, useCallback } from "react";

const COLORS = [
  "#4285F4", "#EA4335", "#FBBC04",
  "#4285F4", "#34A853", "#EA4335",
  "#4285F4", "#FBBC04", "#34A853",
  "#EA4335", "#4285F4", "#34A853", "#EA4335",
];

const LETTERS = "GB Optimizers";

const GoogleLogo = ({ className = "" }: { className?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [style, setStyle] = useState({ transform: "perspective(600px) rotateX(0deg) rotateY(0deg)", transition: "transform 0.15s ease-out" });

  const handleMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({
      transform: `perspective(600px) rotateY(${x * 20}deg) rotateX(${-y * 20}deg) scale3d(1.05,1.05,1.05)`,
      transition: "transform 0.08s ease-out",
    });
  }, []);

  const handleLeave = useCallback(() => {
    setStyle({ transform: "perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)", transition: "transform 0.4s ease-out" });
  }, []);

  return (
    <span
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`tracking-normal inline-block cursor-pointer select-none ${className}`}
      style={{
        fontFamily: "'Product Sans', 'Google Sans', sans-serif",
        fontWeight: 500,
        ...style,
        transformStyle: "preserve-3d",
        textShadow: "0 2px 8px rgba(0,0,0,0.15)",
      }}
      aria-label="GB Optimizers"
    >
      {LETTERS.split("").map((char, i) =>
        char === " " ? (
          <span key={i}>&nbsp;</span>
        ) : (
          <span key={i} style={{ color: COLORS[i], display: "inline-block" }}>
            {char}
          </span>
        )
      )}
    </span>
  );
};

export default GoogleLogo;
