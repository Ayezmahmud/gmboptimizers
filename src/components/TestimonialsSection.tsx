import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    business: "Mitchell's Bakery, Melbourne",
    text: "GB Optimizers took our bakery from page 3 to the #1 spot on Google Maps in just 8 weeks. Our foot traffic has doubled!",
    avatar: "SM",
  },
  {
    name: "James Chen",
    business: "Chen Auto Repairs, Sydney",
    text: "Professional, data-driven, and results-focused. Our calls increased by 300% within the first month of optimization.",
    avatar: "JC",
  },
  {
    name: "Lisa Rodriguez",
    business: "Rodriguez Legal, Brisbane",
    text: "The team at GB Optimizers truly understands local SEO. Their strategy transformed our online presence entirely.",
    avatar: "LR",
  },
  {
    name: "David Park",
    business: "Park Dental Clinic, Perth",
    text: "Outstanding results and communication. We've seen a massive increase in new patient bookings from Google Maps.",
    avatar: "DP",
  },
];

const TestimonialsSection = () => {
  const [idx, setIdx] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const prev = () => setIdx((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setIdx((i) => (i === testimonials.length - 1 ? 0 : i + 1));
  const t = testimonials[idx];

  return (
    <section id="testimonials" className="py-32 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            Client <span className="text-gradient-red-yellow">Testimonials</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="text-center p-10 rounded-2xl bg-card border border-border"
            >
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-google-yellow text-google-yellow" />
                ))}
              </div>
              <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 italic">"{t.text}"</p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-sm font-bold text-foreground">
                  {t.avatar}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.business}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-google-blue transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-google-blue transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
