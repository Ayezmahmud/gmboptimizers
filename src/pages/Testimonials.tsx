import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const testimonials = [
  {
    name: "Sarah Mitchell",
    business: "Mitchell's Bakery, Melbourne",
    text: "GB Optimizers took our bakery from page 3 to the #1 spot on Google Maps in just 8 weeks. Our foot traffic has doubled!",
    initials: "SM",
  },
  {
    name: "James Chen",
    business: "Chen Auto Repairs, Sydney",
    text: "Professional, data-driven, and results-focused. Our calls increased by 300% within the first month of optimization.",
    initials: "JC",
  },
  {
    name: "Lisa Rodriguez",
    business: "Rodriguez Legal, Brisbane",
    text: "The team at GB Optimizers truly understands local SEO. Their strategy transformed our online presence entirely.",
    initials: "LR",
  },
  {
    name: "David Park",
    business: "Park Dental Clinic, Perth",
    text: "Outstanding results and communication. We've seen a massive increase in new patient bookings from Google Maps.",
    initials: "DP",
  },
];

const Testimonials = () => {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setIdx((i) => (i === testimonials.length - 1 ? 0 : i + 1));
  const t = testimonials[idx];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">What Clients Say</p>
            <h1 className="text-5xl md:text-7xl font-black uppercase text-foreground leading-[0.95]">
              Testimonials
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
                className="border-l-4 border-foreground pl-8 md:pl-12"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-foreground text-foreground" />
                  ))}
                </div>
                <p className="text-xl md:text-2xl font-medium leading-relaxed text-foreground mb-8">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary flex items-center justify-center text-sm font-bold text-foreground">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-bold text-foreground uppercase text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.business}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-3 mt-12">
              <button
                onClick={prev}
                className="w-12 h-12 border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="w-12 h-12 border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <span className="flex items-center ml-4 text-xs text-muted-foreground uppercase tracking-wider">
                {idx + 1} / {testimonials.length}
              </span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Testimonials;
