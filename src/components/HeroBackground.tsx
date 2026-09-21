import { motion } from "framer-motion";
import mapPinAsset from "@/assets/map-pin-4k-transparent.png.asset.json";

const HeroBackground = () => {
  return (
    <>
      {/* Animated floating orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-google-blue/[0.07] blur-[100px]"
          animate={{ x: [0, 80, -40, 0], y: [0, -60, 40, 0], scale: [1, 1.2, 0.9, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: "10%", right: "5%" }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-google-green/[0.06] blur-[90px]"
          animate={{ x: [0, -60, 50, 0], y: [0, 50, -30, 0], scale: [1, 0.85, 1.15, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ top: "30%", right: "15%" }}
        />
        <motion.div
          className="absolute w-[350px] h-[350px] rounded-full bg-google-red/[0.05] blur-[80px]"
          animate={{ x: [0, 40, -70, 0], y: [0, -40, 60, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          style={{ bottom: "10%", right: "25%" }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full bg-google-yellow/[0.05] blur-[70px]"
          animate={{ x: [0, -50, 30, 0], y: [0, 30, -50, 0], scale: [1, 1.15, 0.9, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 6 }}
          style={{ top: "50%", right: "35%" }}
        />

        {/* Google Maps pin */}
        <motion.div
          className="absolute left-1/2 top-[2%] h-[760px] w-[560px] -translate-x-1/2 -translate-y-0 pointer-events-none"
          animate={{ y: [0, -20, 0], opacity: [0.18, 0.3, 0.18] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <img
            src={mapPinAsset.url}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-contain"
          />
        </motion.div>

        {/* Floating dots */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/[0.08]"
            animate={{ opacity: [0.03, 0.12, 0.03], scale: [1, 1.5, 1] }}
            transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.5 }}
            style={{ top: `${15 + (i * 4) % 70}%`, right: `${5 + (i * 7) % 50}%` }}
          />
        ))}
      </div>

      {/* Radial gradient spotlight */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, hsla(217, 91%, 60%, 0.12) 0%, hsla(217, 91%, 60%, 0.04) 40%, transparent 70%)" }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </>
  );
};

export default HeroBackground;
