import AnimatedDots from "@/components/AnimatedDots";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroBackground from "@/components/HeroBackground";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Target, Shield, Zap, Award, Users, Globe, Heart, ArrowRight } from "lucide-react";
import ScrollRevealSection, { ScrollParallaxImage, ScrollTextReveal, ScrollStaggerItem } from "@/components/ScrollRevealSection";
import MagneticCard from "@/components/MagneticCard";
import CertificationsMarquee from "@/components/CertificationsMarquee";
import { Link } from "react-router-dom";
import { useCountry } from "@/contexts/CountryContext";

const stats = [
  { value: 500, suffix: "+", label: "Businesses Ranked", color: "bg-google-blue", text: "text-google-blue", glow: "shadow-[0_0_30px_rgba(66,133,244,0.15)]", glowHover: "hover:shadow-[0_0_50px_rgba(66,133,244,0.3)]" },
  { value: 98, suffix: "%", label: "Client Retention", color: "bg-google-red", text: "text-google-red", glow: "shadow-[0_0_30px_rgba(234,67,53,0.15)]", glowHover: "hover:shadow-[0_0_50px_rgba(234,67,53,0.3)]" },
  { value: 30, suffix: "+", label: "Industries Served", color: "bg-google-yellow", text: "text-google-yellow", glow: "shadow-[0_0_30px_rgba(251,188,4,0.15)]", glowHover: "hover:shadow-[0_0_50px_rgba(251,188,4,0.3)]" },
  { value: 12, suffix: "+", label: "Countries", color: "bg-google-green", text: "text-google-green", glow: "shadow-[0_0_30px_rgba(52,168,83,0.15)]", glowHover: "hover:shadow-[0_0_50px_rgba(52,168,83,0.3)]" },
];

const values = [
  { icon: Target, title: "Results-Driven", desc: "Every strategy we implement is measured against clear KPIs and business outcomes.", color: "text-google-blue", border: "border-google-blue/20", bg: "bg-google-blue/5", glowHover: "hover:shadow-[0_0_40px_rgba(66,133,244,0.2)]" },
  { icon: Shield, title: "Ethical Practices", desc: "We only use white-hat, Google-compliant optimization techniques.", color: "text-google-red", border: "border-google-red/20", bg: "bg-google-red/5", glowHover: "hover:shadow-[0_0_40px_rgba(234,67,53,0.2)]" },
  { icon: Heart, title: "Client-First", desc: "Your success is our success. We treat every business like our own.", color: "text-google-yellow", border: "border-google-yellow/20", bg: "bg-google-yellow/5", glowHover: "hover:shadow-[0_0_40px_rgba(251,188,4,0.2)]" },
  { icon: Award, title: "Excellence", desc: "We continuously refine our methods to stay ahead of algorithm changes.", color: "text-google-green", border: "border-google-green/20", bg: "bg-google-green/5", glowHover: "hover:shadow-[0_0_40px_rgba(52,168,83,0.2)]" },
];

const team = [
  { name: "Alex Thompson", role: "Founder & CEO", initials: "AT", image: "/images/team-alex.jpg", color: "bg-google-blue", border: "border-google-blue/20", glowHover: "hover:shadow-[0_0_40px_rgba(66,133,244,0.25)]" },
  { name: "Maria Santos", role: "Head of SEO", initials: "MS", image: "/images/team-maria.jpg", color: "bg-google-red", border: "border-google-red/20", glowHover: "hover:shadow-[0_0_40px_rgba(234,67,53,0.25)]" },
  { name: "David Kim", role: "Lead Strategist", initials: "DK", image: "/images/team-david.jpg", color: "bg-google-green", border: "border-google-green/20", glowHover: "hover:shadow-[0_0_40px_rgba(52,168,83,0.25)]" },
  { name: "Rachel Chen", role: "Client Success Manager", initials: "RC", image: "/images/team-rachel.jpg", color: "bg-google-yellow", border: "border-google-yellow/20", glowHover: "hover:shadow-[0_0_40px_rgba(251,188,4,0.25)]" },
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
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const About = () => {
  const { localePath } = useCountry();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden py-28 md:py-44 bg-[#060918]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060918] via-[#0a1628] to-[#060918]" />
        <HeroBackground />
        <div className="relative z-10 container mx-auto px-6 flex items-center justify-center text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <AnimatedDots label="About Us" className="justify-center mb-6" />
            <h1 className="text-5xl md:text-7xl font-black uppercase text-white leading-[0.95] mb-6">
              Why GB
              <br />
              <span className="text-gradient-google">Optimizers?</span>
            </h1>
            <p className="text-base md:text-lg text-white/60 max-w-lg mx-auto leading-relaxed">
              We're the team behind 500+ businesses ranking #1 on Google Maps. Data-driven, ethical, and relentlessly focused on results.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-8 flex flex-wrap gap-3 justify-center"
            >
              {["google-blue", "google-red", "google-yellow", "google-green"].map((c, i) => (
                <motion.div
                  key={c}
                  className={`w-3 h-3 rounded-full bg-${c}`}
                  animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 flex z-10">
          <div className="flex-1 bg-google-blue" />
          <div className="flex-1 bg-google-red" />
          <div className="flex-1 bg-google-yellow" />
          <div className="flex-1 bg-google-green" />
        </div>
      </section>

      {/* About Content with Image */}
      <ScrollRevealSection className="py-24 border-b border-border" clipReveal>
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <ScrollParallaxImage
              src="/images/about-office.png"
              alt="GB Optimizers office with SEO analytics dashboards"
              className="shadow-lg border border-border aspect-[4/3]"
            />
            <ScrollTextReveal>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-google-blue mb-3">Who We Are</p>
              <h2 className="text-3xl font-black uppercase mb-6 text-foreground">High-Performance Google Business <span className="text-gradient-google">Optimization</span></h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We specialize in high-performance Google Business Profile optimization that increases visibility, traffic, and local revenue. Our data-driven approach ensures every business we work with sees measurable results.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                With a team of experienced local SEO specialists, we've helped businesses across 30+ industries and 12+ countries achieve top rankings on Google Maps.
              </p>
              <Link to={localePath("/contact")} className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider bg-google-blue text-white hover:bg-google-blue/90 transition-colors">
                Get a Free Audit <ArrowRight className="w-4 h-4" />
              </Link>
            </ScrollTextReveal>
          </div>

          {/* Mission with Strategy Image */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollTextReveal className="stripe-accent pl-8">
              <h3 className="text-xl font-bold uppercase mb-4 text-foreground">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                To make every local business discoverable. We believe that great businesses deserve great visibility, and we make that happen through strategic, ethical Google Maps optimization.
              </p>
              <h3 className="text-xl font-bold uppercase mb-4 text-foreground">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be the world's most trusted Google Maps optimization agency, empowering local businesses to compete and win in the digital landscape.
              </p>
            </ScrollTextReveal>
            <ScrollParallaxImage
              src="/images/about-strategy.png"
              alt="Team planning local SEO strategy on whiteboard"
              className="shadow-lg border border-border aspect-[4/3]"
            />
          </div>
        </div>
      </ScrollRevealSection>

      {/* Values */}
      <ScrollRevealSection className="py-24 border-b border-border bg-secondary">
        <div className="container mx-auto px-6">
          <ScrollTextReveal className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-google-red mb-3">What Drives Us</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-foreground">Our Core <span className="text-gradient-google">Values</span></h2>
          </ScrollTextReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <MagneticCard key={v.title} intensity={6}>
                <ScrollStaggerItem index={i} className={`group relative overflow-hidden bg-background p-8 border ${v.border} h-full transition-all duration-700 ${v.glowHover}`}>
                  {/* Top accent bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 ${v.color.replace('text-', 'bg-')} transition-all duration-500 group-hover:h-1.5`} />
                  {/* Glow overlay */}
                  <div className={`absolute inset-0 ${v.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                  <div className="relative">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <v.icon className={`w-8 h-8 ${v.color} mb-5`} strokeWidth={1.5} />
                    </motion.div>
                    <h3 className="text-sm font-bold uppercase text-foreground mb-2">{v.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                  </div>
                </ScrollStaggerItem>
              </MagneticCard>
            ))}
          </div>
        </div>
      </ScrollRevealSection>

      {/* Team */}
      <ScrollRevealSection className="py-24 border-b border-border">
        <div className="container mx-auto px-6">
          <ScrollTextReveal className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-google-green mb-3">Our Team</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-foreground">Meet the <span className="text-gradient-google">Experts</span></h2>
          </ScrollTextReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((t, i) => (
              <MagneticCard key={t.name} intensity={6}>
                <ScrollStaggerItem index={i} className={`group relative overflow-hidden text-center p-6 border ${t.border} bg-background transition-all duration-700 ${t.glowHover}`}>
                  {/* Top accent bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 ${t.color} transition-all duration-500 group-hover:h-1.5`} />
                  <motion.div
                    className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border-2 border-border"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  </motion.div>
                  <h3 className="text-sm font-bold uppercase text-foreground">{t.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{t.role}</p>
                </ScrollStaggerItem>
              </MagneticCard>
            ))}
          </div>
        </div>
      </ScrollRevealSection>

      {/* Stats */}
      <ScrollRevealSection className="border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-16">
            {stats.map((s, i) => (
              <MagneticCard key={s.label} intensity={4}>
                <ScrollStaggerItem index={i} className={`group relative overflow-hidden bg-background py-12 text-center border border-border/50 transition-all duration-700 ${s.glow} ${s.glowHover}`}>
                  <div className={`absolute top-0 left-0 right-0 h-1 ${s.color} transition-all duration-500 group-hover:h-1.5`} />
                  <div className={`w-2 h-2 ${s.color} rounded-full mx-auto mb-3`} />
                  <p className={`text-4xl md:text-5xl font-black ${s.text}`}>
                    <Counter target={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mt-3">{s.label}</p>
                </ScrollStaggerItem>
              </MagneticCard>
            ))}
          </div>
        </div>
      </ScrollRevealSection>

      {/* CTA */}
      <ScrollRevealSection className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-blue-green" />
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/20"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: Math.random() * 3 }}
            />
          ))}
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <ScrollTextReveal>
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4 text-white">Ready to <span className="text-google-yellow">Dominate</span>?</h2>
            <p className="text-white/60 mb-8 max-w-lg mx-auto">
              Join 500+ businesses that trust GB Optimizers for their Google Maps success.
            </p>
            <Link to={localePath("/pricing")} className="inline-flex px-8 py-4 text-xs font-bold uppercase tracking-wider bg-background text-foreground hover:bg-background/90 transition-colors">
              Get Started Today
            </Link>
          </ScrollTextReveal>
        </div>
      </ScrollRevealSection>

      <CertificationsMarquee className="border-t border-border bg-secondary" />
      <Footer />
    </div>
  );
};

export default About;
