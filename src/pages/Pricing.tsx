import AnimatedDots from "@/components/AnimatedDots";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, Shield, Zap, Users, RefreshCw } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroBackground from "@/components/HeroBackground";
import ScrollRevealSection, { ScrollParallaxImage, ScrollTextReveal, ScrollStaggerItem } from "@/components/ScrollRevealSection";
import MagneticCard from "@/components/MagneticCard";

const packages = [
  {
    name: "Basic",
    price: "$99.99",
    popular: false,
    color: "border-t-google-green",
    dotColor: "bg-google-green",
    borderColor: "border-google-green/20",
    glowHover: "hover:shadow-[0_0_40px_rgba(52,168,83,0.25)]",
    bgHover: "bg-google-green/5",
    features: [
      "Google Business Profile Setup",
      "Basic Optimization",
      "5 Keyword Optimization",
      "Business Description SEO",
      "5 Image Optimization",
      "Monthly Report",
    ],
  },
  {
    name: "Premium",
    price: "$149.99",
    popular: false,
    color: "border-t-google-blue",
    dotColor: "bg-google-blue",
    borderColor: "border-google-blue/20",
    glowHover: "hover:shadow-[0_0_40px_rgba(66,133,244,0.25)]",
    bgHover: "bg-google-blue/5",
    features: [
      "Everything in Basic",
      "10 Keyword Optimization",
      "Review Strategy",
      "10 Image Optimization",
      "Competitor Analysis",
      "Google Post Optimization",
    ],
  },
  {
    name: "Advance",
    price: "$199.99",
    popular: true,
    color: "",
    dotColor: "",
    borderColor: "",
    glowHover: "hover:shadow-[0_0_50px_rgba(66,133,244,0.3),0_0_50px_rgba(234,67,53,0.15)]",
    bgHover: "",
    features: [
      "Everything in Premium",
      "20 Keyword Optimization",
      "Citation Building",
      "Advanced Geo-Tagging",
      "Review Response Optimization",
      "Weekly Ranking Tracking",
    ],
  },
  {
    name: "Enterprise",
    price: "$299.99",
    popular: false,
    color: "border-t-google-yellow",
    dotColor: "bg-google-yellow",
    borderColor: "border-google-yellow/20",
    glowHover: "hover:shadow-[0_0_40px_rgba(251,188,4,0.25)]",
    bgHover: "bg-google-yellow/5",
    features: [
      "Everything in Advance",
      "Full Local SEO Strategy",
      "High Authority Citations",
      "Reputation Management",
      "Monthly Strategy Call",
      "Dedicated Account Manager",
    ],
  },
];

const guarantees = [
  { icon: Shield, title: "No Long-Term Contracts", desc: "Cancel anytime. We earn your business every month.", color: "text-google-blue", border: "border-google-blue/20", glowHover: "hover:shadow-[0_0_40px_rgba(66,133,244,0.2)]" },
  { icon: RefreshCw, title: "30-Day Money-Back Guarantee", desc: "Not satisfied? Get a full refund within 30 days — no questions asked.", color: "text-google-yellow", border: "border-google-yellow/20", glowHover: "hover:shadow-[0_0_40px_rgba(251,188,4,0.2)]" },
  { icon: Zap, title: "Results in 4-8 Weeks", desc: "See measurable ranking improvements fast.", color: "text-google-red", border: "border-google-red/20", glowHover: "hover:shadow-[0_0_40px_rgba(234,67,53,0.2)]" },
  { icon: Users, title: "Dedicated Support", desc: "Your own account manager for personalized service.", color: "text-google-green", border: "border-google-green/20", glowHover: "hover:shadow-[0_0_40px_rgba(52,168,83,0.2)]" },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden py-28 md:py-44 bg-[#060918]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060918] via-[#0a1628] to-[#060918]" />
        <HeroBackground />
        <div className="relative z-10 container mx-auto px-6 flex items-center justify-center text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <AnimatedDots label="Packages" className="justify-center mb-6" />
            <h1 className="text-5xl md:text-7xl font-black uppercase text-white leading-[0.95] mb-6">
              <span className="text-gradient-google">Pricing</span>
            </h1>
            <p className="text-base md:text-lg text-white/60 max-w-lg leading-relaxed">
              Transparent pricing, no hidden fees. Choose the plan that matches your growth ambitions.
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

      {/* Growth Image + Intro */}
      <ScrollRevealSection className="py-16 border-b border-border bg-secondary" clipReveal>
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollTextReveal>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-google-blue mb-3">Investment</p>
              <h2 className="text-3xl font-black uppercase text-foreground mb-4">Invest in <span className="text-gradient-google">Growth</span></h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Choose the package that fits your business goals. Every plan includes our proven Google Maps optimization methodology, dedicated support, and transparent reporting. No hidden fees, no surprises.
              </p>
              <div className="flex flex-wrap gap-4">
                {guarantees.map((g) => (
                  <div key={g.title} className="flex items-center gap-2">
                    <g.icon className={`w-4 h-4 ${g.color}`} />
                    <span className="text-xs font-bold uppercase tracking-wider text-foreground">{g.title}</span>
                  </div>
                ))}
              </div>
            </ScrollTextReveal>
            <ScrollParallaxImage
              src="/images/pricing-growth.png"
              alt="Business growth chart in Google brand colors"
              className="aspect-[4/3]"
            />
          </div>
        </div>
      </ScrollRevealSection>

      {/* Pricing Cards */}
      <ScrollRevealSection className="py-24">
        <div className="container mx-auto px-6">
          <ScrollTextReveal className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-google-green mb-3">Plans</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-foreground">Choose Your <span className="text-gradient-google">Package</span></h2>
          </ScrollTextReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg, i) => (
              <MagneticCard key={pkg.name} intensity={6}>
                <ScrollStaggerItem
                  index={i}
                  className={`group relative overflow-hidden border flex flex-col h-full transition-all duration-700 ${
                    pkg.popular
                      ? `border-foreground bg-primary text-primary-foreground ${pkg.glowHover}`
                      : `${pkg.borderColor || 'border-border'} bg-background text-foreground border-t-4 ${pkg.color} ${pkg.glowHover}`
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-px left-0 right-0 h-1.5 bg-gradient-to-r from-google-blue via-google-red to-google-green transition-all duration-500 group-hover:h-2" />
                  )}
                  {!pkg.popular && (
                    <div className={`absolute inset-0 ${pkg.bgHover} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                  )}
                  <div className="relative p-8 flex-1">
                    {pkg.popular && (
                      <p className="text-xs font-bold uppercase tracking-wider mb-4 text-google-yellow">Most Popular</p>
                    )}
                    {!pkg.popular && (
                      <motion.div
                        className={`w-2 h-2 ${pkg.dotColor} rounded-full mb-4`}
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    <h3 className="text-sm font-bold uppercase tracking-wider mb-2">{pkg.name}</h3>
                    <div className="mb-8">
                      <span className="text-4xl font-black">{pkg.price}</span>
                      <span className={`text-sm ml-1 ${pkg.popular ? "text-primary-foreground/60" : "text-muted-foreground"}`}>AUD/mo</span>
                    </div>
                    <ul className="space-y-3">
                      {pkg.features.map((f, fi) => (
                        <motion.li
                          key={f}
                          className="flex items-start gap-3 text-sm"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: fi * 0.05, duration: 0.3 }}
                        >
                          <Check className="w-4 h-4 mt-0.5 shrink-0 text-google-green" />
                          <span className={pkg.popular ? "text-primary-foreground/80" : "text-muted-foreground"}>{f}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative p-8 pt-0">
                    <Link
                      to="/contact"
                      className={`block text-center py-3 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                        pkg.popular
                          ? "bg-background text-foreground hover:bg-background/90 hover:shadow-lg"
                          : "bg-google-blue text-primary-foreground hover:opacity-90 hover:shadow-lg"
                      }`}
                    >
                      Get Started
                    </Link>
                  </div>
                </ScrollStaggerItem>
              </MagneticCard>
            ))}
          </div>
        </div>
      </ScrollRevealSection>

      {/* Guarantees */}
      <ScrollRevealSection className="py-20 border-t border-border bg-secondary">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6">
            {guarantees.map((g, i) => (
              <MagneticCard key={g.title} intensity={6}>
                <ScrollStaggerItem index={i} className={`group relative overflow-hidden bg-background p-8 border ${g.border} text-center h-full transition-all duration-700 ${g.glowHover}`}>
                  <div className={`absolute top-0 left-0 right-0 h-1 ${g.color.replace('text-', 'bg-')} transition-all duration-500 group-hover:h-1.5`} />
                  <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                    <g.icon className={`w-8 h-8 ${g.color} mx-auto mb-4`} strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="text-sm font-bold uppercase text-foreground mb-2">{g.title}</h3>
                  <p className="text-sm text-muted-foreground">{g.desc}</p>
                </ScrollStaggerItem>
              </MagneticCard>
            ))}
          </div>
        </div>
      </ScrollRevealSection>

      <Footer />
    </div>
  );
};

export default Pricing;
