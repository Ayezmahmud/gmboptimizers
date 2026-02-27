import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ParallaxImage from "@/components/ParallaxImage";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Target, Shield, Zap, Award, Users, Globe, Heart } from "lucide-react";

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
        
        {/* Animated floating orbs background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full bg-google-blue/[0.07] blur-[100px]"
            animate={{ x: [0, 80, -40, 0], y: [0, -60, 40, 0], scale: [1, 1.2, 0.9, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            style={{ top: "10%", right: "5%" }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full bg-google-green/[0.06] blur-[90px]"
            animate={{ x: [0, -60, 50, 0], y: [0, 50, -30, 0], scale: [1, 0.85, 1.15, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            style={{ top: "30%", right: "15%" }}
          />
          <motion.div
            className="absolute w-[350px] h-[350px] rounded-full bg-google-red/[0.05] blur-[80px]"
            animate={{ x: [0, 40, -70, 0], y: [0, -40, 60, 0], scale: [1, 1.1, 0.95, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            style={{ bottom: "10%", right: "25%" }}
          />
          <motion.div
            className="absolute w-[300px] h-[300px] rounded-full bg-google-yellow/[0.05] blur-[70px]"
            animate={{ x: [0, -50, 30, 0], y: [0, 30, -50, 0], scale: [1, 1.15, 0.9, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 6 }}
            style={{ top: "50%", right: "35%" }}
          />
          {/* Floating grid dots */}
          {/* Giant subtle Google Maps pin silhouette */}
          <motion.div
            className="absolute top-[15%] left-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{ y: [0, -20, 0], opacity: [0.18, 0.3, 0.18] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="400" height="520" viewBox="0 0 48 72" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Main pin shape split into 4 color quadrants */}
              <clipPath id="pinClip">
                <path d="M24 0C10.745 0 0 10.745 0 24c0 18 24 48 24 48s24-30 24-48C48 10.745 37.255 0 24 0z" />
              </clipPath>
              <g clipPath="url(#pinClip)">
                {/* Top-left: Blue */}
                <path d="M0 0h24v36H0z" fill="#4285F4" />
                {/* Top-right: Red */}
                <path d="M24 0h24v36H24z" fill="#EA4335" />
                {/* Bottom-left: Green */}
                <path d="M0 36h24v36H0z" fill="#34A853" />
                {/* Bottom-right: Yellow */}
                <path d="M24 36h24v36H24z" fill="#FBBC05" />
              </g>
              {/* Pin outline */}
              <path d="M24 0C10.745 0 0 10.745 0 24c0 18 24 48 24 48s24-30 24-48C48 10.745 37.255 0 24 0z" fill="none" stroke="white" strokeWidth="0.5" opacity="0.15" />
              {/* Inner circle */}
              <circle cx="24" cy="24" r="10" fill="#1a1a2e" opacity="0.7" />
              <circle cx="24" cy="24" r="10" fill="none" stroke="white" strokeWidth="0.5" opacity="0.2" />
            </svg>
          </motion.div>
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/[0.08]"
              animate={{ opacity: [0.03, 0.12, 0.03], scale: [1, 1.5, 1] }}
              transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.5 }}
              style={{ top: `${15 + (i * 4) % 70}%`, right: `${5 + (i * 7) % 50}%` }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-6 flex items-center justify-center text-center">
          {/* Radial gradient spotlight */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              className="w-[600px] h-[600px] rounded-full"
              style={{ background: "radial-gradient(circle, hsla(217, 91%, 60%, 0.12) 0%, hsla(217, 91%, 60%, 0.04) 40%, transparent 70%)" }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-google-blue" />
              <div className="w-2 h-2 rounded-full bg-google-red" />
              <div className="w-2 h-2 rounded-full bg-google-yellow" />
              <div className="w-2 h-2 rounded-full bg-google-green" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 ml-2">About Us</p>
            </div>
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
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <ParallaxImage
                src="/images/about-office.png"
                alt="GB Optimizers office with SEO analytics dashboards"
                className="shadow-lg border border-border"
                intensity={80}
              />
            </motion.div>
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
          </div>

          {/* Mission with Strategy Image */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="stripe-accent pl-8"
            >
              <h3 className="text-xl font-bold uppercase mb-4 text-foreground">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                To make every local business discoverable. We believe that great businesses deserve great visibility, and we make that happen through strategic, ethical Google Maps optimization.
              </p>
              <h3 className="text-xl font-bold uppercase mb-4 text-foreground">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be the world's most trusted Google Maps optimization agency, empowering local businesses to compete and win in the digital landscape.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <ParallaxImage
                src="/images/about-strategy.png"
                alt="Team planning local SEO strategy on whiteboard"
                className="shadow-lg border border-border"
                intensity={50}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 border-b border-border bg-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-google-red mb-3">What Drives Us</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-foreground">Our Core Values</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background p-8 border border-border hover:shadow-lg transition-shadow"
              >
                <v.icon className={`w-8 h-8 ${v.color} mb-5`} strokeWidth={1.5} />
                <h3 className="text-sm font-bold uppercase text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-google-green mb-3">Our Team</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-foreground">Meet the Experts</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className={`w-20 h-20 ${t.color} text-primary-foreground flex items-center justify-center text-lg font-black mx-auto mb-4`}>
                  {t.initials}
                </div>
                <h3 className="text-sm font-bold uppercase text-foreground">{t.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{t.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border">
        <div className="container mx-auto px-6">
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
                <div className={`w-2 h-2 ${s.color} rounded-full mx-auto mb-3`} />
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
