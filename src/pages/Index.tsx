import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useRef, useState, Suspense, lazy } from "react";
import { useInView } from "framer-motion";
import {
  MapPin, TrendingUp, Search, Star, Building2, BarChart3, FileText,
  CheckCircle2, Shield, Clock, Users, ArrowRight, Phone, Globe,
  Zap, Target, Award, ChevronDown, ChevronUp
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EarthGlobe = lazy(() => import("@/components/EarthGlobe"));

/* ── Animated Counter ── */
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
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

/* ── Data ── */
const stats = [
  { value: 500, suffix: "+", label: "Businesses Ranked", color: "bg-google-blue" },
  { value: 98, suffix: "%", label: "Client Retention Rate", color: "bg-google-red" },
  { value: 30, suffix: "+", label: "Industries Served", color: "bg-google-yellow" },
  { value: 12, suffix: "+", label: "Countries Worldwide", color: "bg-google-green" },
];

const services = [
  { icon: MapPin, title: "Google Business Profile Setup", desc: "Complete setup, verification, and optimization of your Google Business Profile for maximum local visibility.", color: "text-google-blue" },
  { icon: TrendingUp, title: "Google Maps Ranking", desc: "Strategic optimization techniques to push your business to the top of Google Maps results.", color: "text-google-green" },
  { icon: Search, title: "Local SEO Strategy", desc: "Comprehensive local SEO strategies tailored to dominate your specific market area.", color: "text-google-red" },
  { icon: Star, title: "Review Management", desc: "Build and manage your online reputation with strategic review generation.", color: "text-google-yellow" },
  { icon: Building2, title: "Citation Building", desc: "High-authority citation building across top directories to strengthen trust signals.", color: "text-google-blue" },
  { icon: BarChart3, title: "Performance Reporting", desc: "Detailed monthly reports tracking rankings, traffic, conversions, and ROI.", color: "text-google-green" },
];

const trustLogos = [
  "Google Partner", "Clutch Top Agency", "SEMrush Certified", "BrightLocal Partner", "Yext Partner"
];

const process = [
  { step: "01", title: "Discovery & Audit", desc: "We analyze your current Google presence, competitors, and market opportunity.", color: "bg-google-blue" },
  { step: "02", title: "Strategy & Setup", desc: "We optimize your Google Business Profile and implement our ranking methodology.", color: "bg-google-red" },
  { step: "03", title: "Optimization & Growth", desc: "Ongoing optimization including review management and geo-targeted strategies.", color: "bg-google-yellow" },
  { step: "04", title: "Reporting & Scaling", desc: "Monthly performance reports with clear metrics and scaling strategies.", color: "bg-google-green" },
];

const caseHighlights = [
  { business: "Melbourne Dental Clinic", industry: "Healthcare", rank: "#14 → #1", calls: "+340%", visits: "+520%" },
  { business: "Sydney Auto Repair", industry: "Automotive", rank: "#22 → #2", calls: "+280%", visits: "+410%" },
  { business: "Brisbane Law Firm", industry: "Legal", rank: "#18 → #1", calls: "+190%", visits: "+350%" },
];

import { testimonials as allTestimonials } from "@/data/testimonials";
const testimonials = allTestimonials.slice(0, 3);

const faqs = [
  { q: "How long does it take to see results?", a: "Most clients see measurable improvements within 4-8 weeks. Significant ranking changes typically occur within 2-3 months depending on competition level." },
  { q: "Do you guarantee #1 rankings?", a: "While no ethical SEO provider can guarantee specific rankings, our 98% client retention rate and proven track record speak to our consistent ability to deliver top results." },
  { q: "What industries do you work with?", a: "We've successfully optimized businesses across 30+ industries including healthcare, legal, automotive, hospitality, retail, real estate, and professional services." },
  { q: "How is GB Optimizers different from other agencies?", a: "We specialize exclusively in Google Maps and local SEO optimization. This singular focus means deeper expertise, better strategies, and faster results than generalist agencies." },
  { q: "What's included in the monthly reports?", a: "Our reports cover ranking positions, search impressions, customer actions (calls, website visits, direction requests), review metrics, and strategic recommendations." },
];

const whyUs = [
  { icon: Target, title: "Specialized Focus", desc: "We exclusively focus on Google Maps optimization — no distractions.", color: "text-google-blue" },
  { icon: Shield, title: "Proven Methodology", desc: "Our proprietary framework has been refined across 500+ successful campaigns.", color: "text-google-red" },
  { icon: Zap, title: "Fast Results", desc: "Most clients see measurable improvements within 4-8 weeks.", color: "text-google-yellow" },
  { icon: Award, title: "Industry Recognition", desc: "Recognized as a top local SEO agency by Clutch, SEMrush, and peers.", color: "text-google-green" },
];

/* ── FAQ Accordion ── */
const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left group">
        <span className="text-sm font-bold uppercase tracking-wide text-foreground group-hover:text-google-blue transition-colors">{q}</span>
        {open ? <ChevronUp className="w-4 h-4 text-google-blue shrink-0 ml-4" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0 ml-4" />}
      </button>
      {open && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="pb-5">
          <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
        </motion.div>
      )}
    </div>
  );
};

/* ── Page ── */
const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden min-h-screen lg:min-h-[90vh] flex items-center bg-[#060918]">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#060918] via-[#0a1628] to-[#060918]" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-24 pb-8 md:py-32 flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-google-blue" />
              <div className="w-2 h-2 rounded-full bg-google-red" />
              <div className="w-2 h-2 rounded-full bg-google-yellow" />
              <div className="w-2 h-2 rounded-full bg-google-green" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 ml-2">
                Google Maps Optimization
              </p>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-[0.95] mb-4 md:mb-6 text-white">
              Get Your Business
              <br />
              to <span className="text-google-blue">#1</span> on
              <br />
              Google Maps
            </h1>
            <p className="text-sm md:text-lg text-white/60 max-w-lg mb-6 md:mb-8 leading-relaxed">
              We help local businesses dominate Google Maps rankings with proven, data-driven optimization strategies. Trusted by 500+ businesses across 12+ countries.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-6 md:mb-8">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-xs font-bold uppercase tracking-wider bg-google-blue text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Get Free Consultation
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center px-8 py-4 text-xs font-bold uppercase tracking-wider border border-white/20 text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
              >
                View Packages
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-xs text-white/50">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-google-green" />
                <span>No Contracts</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-google-green" />
                <span>Results in 4–8 Weeks</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-google-green" />
                <span>98% Retention</span>
              </div>
            </div>
          </motion.div>

          {/* 3D Earth Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-full lg:w-1/2 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] -mx-4 sm:mx-0"
          >
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-16 h-16 border-2 border-google-blue/30 border-t-google-blue rounded-full animate-spin" />
              </div>
            }>
              <EarthGlobe />
            </Suspense>
          </motion.div>
        </div>

        {/* Decorative color bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 flex z-10">
          <div className="flex-1 bg-google-blue" />
          <div className="flex-1 bg-google-red" />
          <div className="flex-1 bg-google-yellow" />
          <div className="flex-1 bg-google-green" />
        </div>
      </section>

      {/* ═══ TRUST BAR ═══ */}
      <section className="py-8 border-b border-border bg-secondary">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {trustLogos.map((name) => (
              <span key={name} className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`py-12 text-center ${i < stats.length - 1 ? "md:border-r border-border" : ""}`}
              >
                <div className={`w-2 h-2 ${s.color} rounded-full mx-auto mb-3`} />
                <p className="text-3xl md:text-5xl font-black text-foreground">
                  <Counter target={s.value} suffix={s.suffix} />
                </p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mt-2">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ABOUT COMPANY ═══ */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="/images/team.png"
                alt="GB Optimizers team of digital marketing professionals"
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
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-google-blue mb-3">About GB Optimizers</p>
              <h2 className="text-4xl md:text-5xl font-black uppercase text-foreground mb-6">
                The #1 Google Maps Agency
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Founded with a singular mission — to make every local business discoverable — GB Optimizers has grown into a globally trusted Google Maps optimization agency. We combine deep technical expertise with data-driven strategies to deliver measurable results.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Unlike generalist marketing agencies, we focus exclusively on Google Business Profile and Google Maps optimization. This specialization means deeper knowledge, faster results, and higher ROI for every client.
              </p>
              <Link to="/about" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-google-blue hover:opacity-80 transition-opacity">
                Learn More About Us <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ WHY US ═══ */}
      <section className="py-24 border-b border-border bg-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-google-red mb-3">Why Choose Us</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-foreground">Built for Results</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background p-8 border border-border hover:shadow-lg transition-shadow duration-300"
              >
                <item.icon className={`w-8 h-8 ${item.color} mb-5`} strokeWidth={1.5} />
                <h3 className="text-sm font-bold uppercase text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-google-green mb-3">What We Do</p>
              <h2 className="text-4xl md:text-5xl font-black uppercase text-foreground">Our Services</h2>
            </div>
            <Link to="/services" className="text-xs font-bold uppercase tracking-wider text-google-blue underline underline-offset-4 hover:opacity-80 transition-opacity">
              View All Services →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="bg-background p-8 border border-border group hover:shadow-lg transition-all duration-300"
              >
                <s.icon className={`w-7 h-7 ${s.color} mb-5`} strokeWidth={1.5} />
                <h3 className="text-sm font-bold uppercase text-foreground mb-3">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-google-yellow mb-3">Our Process</p>
              <h2 className="text-4xl md:text-5xl font-black uppercase text-foreground mb-6">How It Works</h2>
              <p className="text-muted-foreground leading-relaxed mb-10">
                Our proven 4-step process ensures consistent, measurable results for every client. From initial audit to ongoing optimization, we handle everything.
              </p>
              <img
                src="/images/phone-maps.png"
                alt="Google Maps business ranking on mobile phone"
                className="w-64 mx-auto md:mx-0 shadow-lg border border-border"
                loading="lazy"
              />
            </div>
            <div className="space-y-6">
              {process.map((p, i) => (
                <motion.div
                  key={p.step}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-start gap-5 p-6 bg-secondary border border-border"
                >
                  <div className={`w-10 h-10 ${p.color} text-primary-foreground flex items-center justify-center text-xs font-black shrink-0`}>
                    {p.step}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase text-foreground mb-1">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CASE STUDY HIGHLIGHTS ═══ */}
      <section className="py-24 border-b border-border bg-primary text-primary-foreground">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/60 mb-3">Proven Results</p>
              <h2 className="text-4xl md:text-5xl font-black uppercase">Case Studies</h2>
            </div>
            <Link to="/case-studies" className="text-xs font-bold uppercase tracking-wider text-primary-foreground/60 underline underline-offset-4 hover:text-primary-foreground transition-colors">
              View All Results →
            </Link>
          </div>
          <div className="space-y-0">
            {caseHighlights.map((c, i) => (
              <motion.div
                key={c.business}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border-b border-primary-foreground/10 py-10 grid md:grid-cols-5 gap-6 items-center"
              >
                <div className="md:col-span-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-primary-foreground/40 mb-1">{c.industry}</p>
                  <h3 className="text-xl font-black uppercase">{c.business}</h3>
                </div>
                <div className="text-center">
                  <TrendingUp className="w-4 h-4 text-google-green mx-auto mb-1" />
                  <p className="text-xl font-black">{c.rank}</p>
                  <p className="text-xs text-primary-foreground/40 uppercase tracking-wider">Ranking</p>
                </div>
                <div className="text-center">
                  <Phone className="w-4 h-4 text-google-blue mx-auto mb-1" />
                  <p className="text-xl font-black">{c.calls}</p>
                  <p className="text-xs text-primary-foreground/40 uppercase tracking-wider">Calls</p>
                </div>
                <div className="text-center">
                  <Globe className="w-4 h-4 text-google-red mx-auto mb-1" />
                  <p className="text-xl font-black">{c.visits}</p>
                  <p className="text-xs text-primary-foreground/40 uppercase tracking-wider">Website Visits</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-google-blue mb-3">Client Feedback</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-foreground">What Our Clients Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background p-8 border border-border hover:shadow-lg transition-shadow duration-300"
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
          <div className="text-center mt-10">
            <Link to="/testimonials" className="text-xs font-bold uppercase tracking-wider text-google-blue underline underline-offset-4 hover:opacity-80 transition-opacity">
              Read More Reviews →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ PRICING PREVIEW ═══ */}
      <section className="py-24 border-b border-border bg-secondary">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-google-green mb-3">Transparent Pricing</p>
          <h2 className="text-4xl md:text-5xl font-black uppercase text-foreground mb-6">Packages Starting at $99.99 AUD</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Choose from four tailored packages designed for businesses at every stage. No hidden fees, no long-term contracts — just results.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-10">
            {[
              { name: "Basic", price: "$99.99", color: "border-google-green", dot: "bg-google-green" },
              { name: "Premium", price: "$149.99", color: "border-google-blue", dot: "bg-google-blue" },
              { name: "Advance", price: "$199.99", color: "border-google-red", dot: "bg-google-red" },
              { name: "Enterprise", price: "$299.99", color: "border-google-yellow", dot: "bg-google-yellow" },
            ].map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`bg-background py-8 px-4 border-t-4 ${pkg.color} border border-border`}
              >
                <div className={`w-2 h-2 ${pkg.dot} rounded-full mx-auto mb-3`} />
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">{pkg.name}</p>
                <p className="text-2xl font-black text-foreground">{pkg.price}</p>
                <p className="text-xs text-muted-foreground mt-1">AUD / month</p>
              </motion.div>
            ))}
          </div>
          <Link
            to="/pricing"
            className="inline-flex items-center justify-center px-8 py-4 text-xs font-bold uppercase tracking-wider bg-google-blue text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Compare All Packages
          </Link>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-google-red mb-3">FAQ</p>
              <h2 className="text-4xl md:text-5xl font-black uppercase text-foreground mb-6">
                Common Questions
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Everything you need to know about our Google Maps optimization services. Can't find what you're looking for? Get in touch with our team.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-google-blue hover:opacity-80 transition-opacity">
                Contact Us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="border-t border-border">
              {faqs.map((faq) => (
                <FAQItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-gradient-blue-green text-primary-foreground py-24">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-6">Ready to Rank #1?</h2>
            <p className="text-primary-foreground/70 mb-4 max-w-lg mx-auto">
              Join 500+ businesses that trust GB Optimizers to dominate their local market on Google Maps.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-primary-foreground/50 text-xs uppercase tracking-wider mb-10">
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> No Contracts</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Results in 4-8 Weeks</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> 98% Retention</span>
            </div>
            <Link
              to="/contact"
              className="inline-flex px-8 py-4 text-xs font-bold uppercase tracking-wider bg-background text-foreground hover:bg-background/90 transition-colors"
            >
              Start Today
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
