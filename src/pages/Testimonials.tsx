import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote, Filter, TrendingUp, Phone, MapPin, Users, Award, BarChart3 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { testimonials } from "@/data/testimonials";

const industries = ["All", ...Array.from(new Set(testimonials.map(t => t.industry)))];

const aggregateStats = [
  { icon: Users, value: 500, suffix: "+", label: "Businesses Ranked", color: "text-google-blue", dotColor: "bg-google-blue" },
  { icon: TrendingUp, value: 94, suffix: "%", label: "Achieved Top 3 Ranking", color: "text-google-green", dotColor: "bg-google-green" },
  { icon: Phone, value: 245, suffix: "%", label: "Avg. Call Increase", color: "text-google-red", dotColor: "bg-google-red" },
  { icon: Star, value: 4.9, suffix: "/5", label: "Average Client Rating", color: "text-google-yellow", dotColor: "bg-google-yellow" },
  { icon: Award, value: 30, suffix: "+", label: "Industries Served", color: "text-google-blue", dotColor: "bg-google-blue" },
  { icon: BarChart3, value: 12, suffix: "x", label: "Average ROI", color: "text-google-green", dotColor: "bg-google-green" },
];

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const isDecimal = target % 1 !== 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(isDecimal ? Math.round(start * 10) / 10 : Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const Testimonials = () => {
  const [idx, setIdx] = useState(0);
  const [filter, setFilter] = useState("All");
  const prev = () => setIdx((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setIdx((i) => (i === testimonials.length - 1 ? 0 : i + 1));
  const t = testimonials[idx];

  const filtered = filter === "All" ? testimonials : testimonials.filter(t => t.industry === filter);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="relative overflow-hidden py-28 md:py-36 bg-[#060918]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060918] via-[#0a1628] to-[#060918]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-google-yellow rounded-full blur-[120px]" />
          <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-google-blue rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-google-blue" />
              <div className="w-2 h-2 rounded-full bg-google-red" />
              <div className="w-2 h-2 rounded-full bg-google-yellow" />
              <div className="w-2 h-2 rounded-full bg-google-green" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 ml-2">What Clients Say</p>
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase text-white leading-[0.95] mb-6">
              Testimonials
            </h1>
            <p className="text-base md:text-lg text-white/60 max-w-lg leading-relaxed">
              30 real stories from businesses we've helped dominate Google Maps. Read their journeys.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 flex z-10">
          <div className="flex-1 bg-google-blue" />
          <div className="flex-1 bg-google-red" />
          <div className="flex-1 bg-google-yellow" />
          <div className="flex-1 bg-google-green" />
        </div>
      </section>

      {/* Hero Image */}
      <section className="border-b border-border">
        <div className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="/images/testimonials-hero.png"
                alt="Happy business owners showing 5-star Google Maps reviews on their phones"
                className="w-full shadow-lg border border-border"
                loading="lazy"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-black uppercase text-foreground mb-4">Trusted by 500+ Businesses</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our clients consistently achieve top rankings on Google Maps across 30+ industries. These aren't just reviews — they're detailed success stories from real business owners who share their complete journey with GB Optimizers.
              </p>
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-google-yellow text-google-yellow" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">Average client rating: <span className="font-bold text-foreground">4.9/5</span> across {testimonials.length} reviews</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results at a Glance */}
      <section className="border-b border-border">
        <div className="container mx-auto px-6">
          <div className="py-6 mb-2 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-google-blue mb-2">Results at a Glance</p>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-foreground">Aggregate Client Metrics</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {aggregateStats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`py-10 text-center ${i < aggregateStats.length - 1 ? "lg:border-r border-border" : ""} ${i < 4 ? "border-b lg:border-b-0 border-border" : ""}`}
              >
                <s.icon className={`w-6 h-6 ${s.color} mx-auto mb-3`} strokeWidth={1.5} />
                <p className={`text-3xl md:text-4xl font-black text-foreground`}>
                  <Counter target={s.value} suffix={s.suffix} />
                </p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mt-2 px-2">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
                className="border-l-4 border-google-blue pl-8 md:pl-12"
              >
                <Quote className="w-8 h-8 text-google-blue/30 mb-4" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-google-yellow text-google-yellow" />
                    ))}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-google-green">{t.result}</span>
                </div>
                <p className="text-lg md:text-xl font-medium leading-relaxed text-foreground mb-6">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${t.color} text-primary-foreground flex items-center justify-center text-sm font-bold`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-bold text-foreground uppercase text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.business}</p>
                    <p className="text-xs text-google-blue mt-0.5">{t.industry}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-3 mt-12">
              <button
                onClick={prev}
                className="w-12 h-12 border border-border flex items-center justify-center text-foreground hover:bg-google-blue hover:text-primary-foreground hover:border-google-blue transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="w-12 h-12 border border-border flex items-center justify-center text-foreground hover:bg-google-blue hover:text-primary-foreground hover:border-google-blue transition-colors"
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

      {/* Industry Filter */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-google-green mb-3">Browse by Industry</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-foreground mb-8">All {testimonials.length} Client Stories</h2>
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setFilter(ind)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border transition-colors ${
                  filter === ind
                    ? "bg-google-blue text-primary-foreground border-google-blue"
                    : "border-border text-muted-foreground hover:border-google-blue hover:text-foreground"
                }`}
              >
                {ind}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
                className="bg-background p-8 border border-border hover:shadow-lg transition-shadow flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-google-yellow text-google-yellow" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-google-green">{t.result}</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-google-blue mb-3">{t.industry}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className={`w-10 h-10 ${t.color} text-primary-foreground flex items-center justify-center text-xs font-bold`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.business}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-blue-green text-primary-foreground py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-4">Ready to Be Our Next Success Story?</h2>
            <p className="text-primary-foreground/60 mb-8 max-w-lg mx-auto">
              Join {testimonials.length * 16}+ businesses that trust GB Optimizers for their Google Maps rankings.
            </p>
            <Link to="/contact" className="inline-flex px-8 py-4 text-xs font-bold uppercase tracking-wider bg-background text-foreground hover:bg-background/90 transition-colors">
              Get Started
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Testimonials;
