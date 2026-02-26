import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const testimonials = [
  {
    name: "Sarah Mitchell",
    business: "Mitchell's Bakery, Melbourne",
    text: "GB Optimizers took our bakery from page 3 to the #1 spot on Google Maps in just 8 weeks. Our foot traffic has doubled!",
    initials: "SM",
    color: "bg-google-blue",
  },
  {
    name: "James Chen",
    business: "Chen Auto Repairs, Sydney",
    text: "Professional, data-driven, and results-focused. Our calls increased by 300% within the first month of optimization.",
    initials: "JC",
    color: "bg-google-red",
  },
  {
    name: "Lisa Rodriguez",
    business: "Rodriguez Legal, Brisbane",
    text: "The team at GB Optimizers truly understands local SEO. Their strategy transformed our online presence entirely.",
    initials: "LR",
    color: "bg-google-yellow",
  },
  {
    name: "David Park",
    business: "Park Dental Clinic, Perth",
    text: "Outstanding results and communication. We've seen a massive increase in new patient bookings from Google Maps.",
    initials: "DP",
    color: "bg-google-green",
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
              Don't just take our word for it — hear from the businesses we've helped reach the top.
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
                alt="Happy business owners showing 5-star Google reviews"
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
                Our clients consistently achieve top rankings on Google Maps. Don't just take our word for it — hear directly from the business owners we've helped succeed.
              </p>
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-google-yellow text-google-yellow" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">Average client rating: <span className="font-bold text-foreground">4.9/5</span></p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Testimonial Carousel */}
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
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-google-yellow text-google-yellow" />
                  ))}
                </div>
                <p className="text-xl md:text-2xl font-medium leading-relaxed text-foreground mb-8">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${t.color} text-primary-foreground flex items-center justify-center text-sm font-bold`}>
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

      {/* All Testimonials Grid */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-google-green mb-3">More Reviews</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-foreground">All Client Reviews</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background p-8 border border-border hover:shadow-lg transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-google-yellow text-google-yellow" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
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
              Join hundreds of businesses that trust GB Optimizers for their Google Maps rankings.
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
