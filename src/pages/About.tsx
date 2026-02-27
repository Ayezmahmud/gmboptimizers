import AnimatedDots from "@/components/AnimatedDots";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroBackground from "@/components/HeroBackground";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Target, Shield, Zap, Award, Users, Globe, Heart } from "lucide-react";
import ScrollRevealSection, { ScrollParallaxImage, ScrollTextReveal, ScrollStaggerItem } from "@/components/ScrollRevealSection";
import MagneticCard from "@/components/MagneticCard";

const stats = [
  { value: 500, suffix: "+", label: "Businesses Ranked", color: "bg-google-blue" },
  { value: 98, suffix: "%", label: "Client Retention", color: "bg-google-red" },
  { value: 30, suffix: "+", label: "Industries Served", color: "bg-google-yellow" },
  { value: 12, suffix: "+", label: "Countries", color: "bg-google-green" },
];

const values = [
  { icon: Target, title: "Results-Driven", desc: "Every strategy we implement is measured against clear KPIs and business outcomes.", color: "text-google-blue" },
  { icon: Shield, title: "Ethical Practices", desc: "We only use white-hat, Google-compliant optimization techniques.", color: "text-google-red" },
  { icon: Heart, title: "Client-First", desc: "Your success is our success. We treat every business like our own.", color: "text-google-yellow" },
  { icon: Award, title: "Excellence", desc: "We continuously refine our methods to stay ahead of algorithm changes.", color: "text-google-green" },
];

const team = [
  { name: "Alex Thompson", role: "Founder & CEO", initials: "AT", color: "bg-google-blue" },
  { name: "Maria Santos", role: "Head of SEO", initials: "MS", color: "bg-google-red" },
  { name: "David Kim", role: "Lead Strategist", initials: "DK", color: "bg-google-green" },
  { name: "Rachel Chen", role: "Client Success Manager", initials: "RC", color: "bg-google-yellow" },
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
              Optimizers?
            </h1>
            <p className="text-base md:text-lg text-white/60 max-w-lg mx-auto leading-relaxed">
              We're the team behind 500+ businesses ranking #1 on Google Maps. Data-driven, ethical, and relentlessly focused on results.
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
              <h2 className="text-3xl font-black uppercase mb-6 text-foreground">High-Performance Google Business Optimization</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We specialize in high-performance Google Business Profile optimization that increases visibility, traffic, and local revenue. Our data-driven approach ensures every business we work with sees measurable results.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                With a team of experienced local SEO specialists, we've helped businesses across 30+ industries and 12+ countries achieve top rankings on Google Maps.
              </p>
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
            <h2 className="text-4xl md:text-5xl font-black uppercase text-foreground">Our Core Values</h2>
          </ScrollTextReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <MagneticCard key={v.title}>
                <ScrollStaggerItem index={i} className="hover-reveal-card hover-shine bg-background p-8 border border-border h-full">
                  <v.icon className={`w-8 h-8 ${v.color} mb-5 hover-icon`} strokeWidth={1.5} />
                  <h3 className="text-sm font-bold uppercase text-foreground mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
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
            <h2 className="text-4xl md:text-5xl font-black uppercase text-foreground">Meet the Experts</h2>
          </ScrollTextReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((t, i) => (
              <MagneticCard key={t.name} intensity={6}>
                <ScrollStaggerItem index={i} className="text-center hover-reveal-card hover-glow p-6 border border-transparent">
                  <div className={`w-20 h-20 ${t.color} text-primary-foreground flex items-center justify-center text-lg font-black mx-auto mb-4 hover-icon`}>
                    {t.initials}
                  </div>
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
            {stats.map((s, i) => (
              <ScrollStaggerItem key={s.label} index={i} className="bg-background py-12 text-center">
                <div className={`w-2 h-2 ${s.color} rounded-full mx-auto mb-3`} />
                <p className="text-4xl md:text-5xl font-black text-foreground">
                  <Counter target={s.value} suffix={s.suffix} />
                </p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mt-3">{s.label}</p>
              </ScrollStaggerItem>
            ))}
          </div>
        </div>
      </ScrollRevealSection>

      <Footer />
    </div>
  );
};

export default About;
