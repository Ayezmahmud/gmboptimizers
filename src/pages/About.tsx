import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const stats = [
  { value: 500, suffix: "+", label: "Businesses Ranked" },
  { value: 98, suffix: "%", label: "Client Retention" },
  { value: 30, suffix: "+", label: "Industries Served" },
  { value: 12, suffix: "+", label: "Countries" },
];

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
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

  return <span ref={ref}>{count}{suffix}</span>;
};

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Page hero */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">About Us</p>
            <h1 className="text-5xl md:text-7xl font-black uppercase text-foreground leading-[0.95]">
              Why GB
              <br />
              Optimizers?
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-black uppercase mb-6 text-foreground">High-Performance Google Business Optimization</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We specialize in high-performance Google Business Profile optimization that increases visibility, traffic, and local revenue. Our data-driven approach ensures every business we work with sees measurable results.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                With a team of experienced local SEO specialists, we've helped businesses across 30+ industries and 12+ countries achieve top rankings on Google Maps.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="stripe-accent pl-8"
            >
              <h3 className="text-xl font-bold uppercase mb-4 text-foreground">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To make every local business discoverable. We believe that great businesses deserve great visibility, and we make that happen through strategic, ethical Google Maps optimization.
              </p>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background py-12 text-center"
              >
                <p className="text-4xl md:text-5xl font-black text-foreground">
                  <Counter target={s.value} suffix={s.suffix} />
                </p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mt-3">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
