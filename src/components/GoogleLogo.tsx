const COLORS = [
  "#4285F4", // G - blue
  "#EA4335", // B - red
  "#FBBC04", // (space)
  "#4285F4", // O - blue
  "#34A853", // p - green
  "#EA4335", // t - red
  "#4285F4", // i - blue
  "#FBBC04", // m - yellow
  "#34A853", // i - green
  "#EA4335", // z - red
  "#4285F4", // e - blue
  "#34A853", // r - green
  "#EA4335", // s - red
];

const LETTERS = "GB Optimizers";

const GoogleLogo = ({ className = "" }: { className?: string }) => (
  <span
    className={`tracking-normal ${className}`}
    style={{ fontFamily: "'Product Sans', 'Google Sans', sans-serif", fontWeight: 500 }}
    aria-label="GB Optimizers"
  >
    {LETTERS.split("").map((char, i) =>
      char === " " ? (
        <span key={i}>&nbsp;</span>
      ) : (
        <span key={i} style={{ color: COLORS[i] }}>
          {char}
        </span>
      )
    )}
  </span>
);

export default GoogleLogo;
