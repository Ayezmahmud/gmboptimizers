const dotColors = ["bg-google-blue", "bg-google-red", "bg-google-yellow", "bg-google-green"];

const AnimatedDots = ({ label, className = "" }: { label: string; className?: string }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    {dotColors.map((color, i) => (
      <div
        key={color}
        className={`w-2 h-2 rounded-full ${color}`}
        style={{ animation: `pulse 1.5s ease-in-out ${i * 0.2}s infinite` }}
      />
    ))}
    <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 ml-2">{label}</p>
  </div>
);

export default AnimatedDots;
