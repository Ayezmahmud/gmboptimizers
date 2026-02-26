import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 500, suffix: "+", label: "Businesses Ranked", color: "text-google-blue" },
  { value: 98, suffix: "%", label: "Client Retention", color: "text-google-red" },
  { value: 30, suffix: "+", label: "Industries Served", color: "text-google-yellow" },
  { value: 12, suffix: "+", label: "Countries", color: "text-google-green" },
];

const Counter = ({ target, suffix, color }: { target: number; suffix: string; color: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className={`font-display text-5xl md:text-6xl font-bold ${color}`}>
      {count}{suffix}
    </span>
  );
};

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            Why <span className="text-gradient-blue-green">GB Optimizers</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We specialize in high-performance Google Business Profile optimization that increases visibility, traffic, and local revenue.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="text-center p-8 rounded-2xl bg-card border border-border"
            >
              <Counter target={stat.value} suffix={stat.suffix} color={stat.color} />
              <p className="text-muted-foreground mt-3 text-sm uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
