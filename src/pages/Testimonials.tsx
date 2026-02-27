import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote, Filter, TrendingUp, Phone, MapPin, Users, Award, BarChart3, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroBackground from "@/components/HeroBackground";
import ParallaxImage from "@/components/ParallaxImage";
import { Link } from "react-router-dom";
import { testimonials, Testimonial } from "@/data/testimonials";
import ScrollRevealSection, { ScrollParallaxImage, ScrollTextReveal, ScrollStaggerItem } from "@/components/ScrollRevealSection";

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
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const prev = () => setIdx((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setIdx((i) => (i === testimonials.length - 1 ? 0 : i + 1));
  const t = testimonials[idx];

  const filtered = filter === "All" ? testimonials : testimonials.filter(t => t.industry === filter);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="relative overflow-hidden py-28 md:py-44 bg-[#060918]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060918] via-[#0a1628] to-[#060918]" />
        <HeroBackground />
        <div className="relative z-10 container mx-auto px-6 flex items-center justify-center text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <div className="flex items-center justify-center gap-2 mb-6">
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
      <ScrollRevealSection className="border-b border-border" clipReveal>
        <div className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollParallaxImage
              src="/images/testimonials-hero.png"
              alt="Happy business owners showing 5-star Google Maps reviews on their phones"
              className="shadow-lg border border-border aspect-[4/3]"
            />
            <ScrollTextReveal>
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
            </ScrollTextReveal>
          </div>
        </div>
      </ScrollRevealSection>

      {/* Results at a Glance */}
      <ScrollRevealSection className="border-b border-border">
        <div className="container mx-auto px-6">
          <ScrollTextReveal className="py-6 mb-2 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-google-blue mb-2">Results at a Glance</p>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-foreground">Aggregate Client Metrics</h2>
          </ScrollTextReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {aggregateStats.map((s, i) => (
              <ScrollStaggerItem
                key={s.label}
                index={i}
                className={`py-10 text-center ${i < aggregateStats.length - 1 ? "lg:border-r border-border" : ""} ${i < 4 ? "border-b lg:border-b-0 border-border" : ""}`}
              >
                <s.icon className={`w-6 h-6 ${s.color} mx-auto mb-3`} strokeWidth={1.5} />
                <p className={`text-3xl md:text-4xl font-black text-foreground`}>
                  <Counter target={s.value} suffix={s.suffix} />
                </p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mt-2 px-2">{s.label}</p>
              </ScrollStaggerItem>
            ))}
          </div>
        </div>
      </ScrollRevealSection>


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
                  <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-border" />
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
                onClick={() => setSelectedTestimonial(t)}
                className="group relative bg-background p-8 border border-border hover:shadow-lg transition-shadow flex flex-col overflow-hidden cursor-pointer"
              >
                {/* Portrait overlay on hover */}
                <div className="absolute inset-0 bg-background/95 flex flex-col items-center justify-center p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                  <img 
                    src={t.image} 
                    alt={t.name} 
                    className="w-24 h-24 rounded-full object-cover border-4 border-google-blue mb-4 shadow-lg"
                  />
                  <p className="text-sm font-bold uppercase text-foreground text-center">{t.name}</p>
                  <p className="text-xs text-muted-foreground text-center mb-2">{t.business}</p>
                  <p className="text-xs font-bold text-google-green">{t.result}</p>
                  <p className="text-xs text-google-blue mt-1 uppercase tracking-wider">{t.industry}</p>
                  <p className="text-xs text-muted-foreground mt-4 uppercase tracking-wider">Click to read full story →</p>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-google-yellow text-google-yellow" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-google-green">{t.result}</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-google-blue mb-3">{t.industry}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1 line-clamp-4">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover border-2 border-border" />
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
      <ScrollRevealSection className="bg-gradient-blue-green text-primary-foreground py-20">
        <div className="container mx-auto px-6 text-center">
          <ScrollTextReveal>
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-4">Ready to Be Our Next Success Story?</h2>
            <p className="text-primary-foreground/60 mb-8 max-w-lg mx-auto">
              Join {testimonials.length * 16}+ businesses that trust GB Optimizers for their Google Maps rankings.
            </p>
            <Link to="/contact" className="inline-flex px-8 py-4 text-xs font-bold uppercase tracking-wider bg-background text-foreground hover:bg-background/90 transition-colors">
              Get Started
            </Link>
          </ScrollTextReveal>
        </div>
      </ScrollRevealSection>

      <Footer />

      {/* Testimonial Modal */}
      <AnimatePresence>
        {selectedTestimonial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-sm"
            onClick={() => setSelectedTestimonial(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative bg-background border border-border max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedTestimonial(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header with large portrait */}
              <div className="bg-secondary border-b border-border p-10 flex flex-col items-center text-center">
                <img
                  src={selectedTestimonial.image}
                  alt={selectedTestimonial.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-google-blue shadow-lg mb-6"
                />
                <h3 className="text-xl font-black uppercase text-foreground mb-1">{selectedTestimonial.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{selectedTestimonial.business}</p>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-google-yellow text-google-yellow" />
                    ))}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-google-blue">{selectedTestimonial.industry}</span>
                </div>
              </div>

              {/* Result badge */}
              <div className="flex justify-center -mt-4">
                <div className="bg-google-green text-primary-foreground px-6 py-2">
                  <p className="text-xs font-bold uppercase tracking-wider">{selectedTestimonial.result}</p>
                </div>
              </div>

              {/* Full testimonial text */}
              <div className="p-10">
                <Quote className="w-8 h-8 text-google-blue/20 mb-4" />
                <p className="text-base text-foreground leading-relaxed">
                  "{selectedTestimonial.text}"
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Testimonials;
