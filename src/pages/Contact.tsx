import AnimatedDots from "@/components/AnimatedDots";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroBackground from "@/components/HeroBackground";
import ScrollRevealSection, { ScrollParallaxImage, ScrollTextReveal, ScrollStaggerItem } from "@/components/ScrollRevealSection";
import MagneticCard from "@/components/MagneticCard";
import CertificationsMarquee from "@/components/CertificationsMarquee";

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@gboptimizers.com", color: "text-google-blue", border: "border-google-blue/20", glowHover: "hover:shadow-[0_0_40px_rgba(66,133,244,0.2)]", bgHover: "bg-google-blue/5" },
  { icon: Phone, label: "Phone", value: "+61 3 9000 0000", color: "text-google-red", border: "border-google-red/20", glowHover: "hover:shadow-[0_0_40px_rgba(234,67,53,0.2)]", bgHover: "bg-google-red/5" },
  { icon: MapPin, label: "Location", value: "Melbourne, Australia", color: "text-google-green", border: "border-google-green/20", glowHover: "hover:shadow-[0_0_40px_rgba(52,168,83,0.2)]", bgHover: "bg-google-green/5" },
  { icon: Clock, label: "Response Time", value: "Within 24 hours", color: "text-google-yellow", border: "border-google-yellow/20", glowHover: "hover:shadow-[0_0_40px_rgba(251,188,4,0.2)]", bgHover: "bg-google-yellow/5" },
];

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="relative overflow-hidden py-28 md:py-44 bg-[#060918]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060918] via-[#0a1628] to-[#060918]" />
        <HeroBackground />
        <div className="relative z-10 container mx-auto px-6 flex items-center justify-center text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <AnimatedDots label="Get In Touch" className="justify-center mb-6" />
            <h1 className="text-5xl md:text-7xl font-black uppercase text-white leading-[0.95] mb-6">
              Start <span className="text-gradient-google">Ranking</span>
              <br />
              Today
            </h1>
            <p className="text-base md:text-lg text-white/60 max-w-lg leading-relaxed">
              Ready to dominate Google Maps? Get your free consultation and see how we can grow your business.
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

      <ScrollRevealSection className="py-24" clipReveal>
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Left: Image + Contact Info */}
            <ScrollTextReveal>
              <ScrollParallaxImage
                src="/images/contact-hero.png"
                alt="Business partnership handshake"
                className="shadow-lg border border-border mb-10 aspect-[4/3]"
              />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-google-blue mb-3">Reach Out</p>
              <h2 className="text-2xl font-black uppercase text-foreground mb-6">Let's Talk <span className="text-gradient-google">Growth</span></h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Ready to dominate Google Maps in your area? Fill out the form and our team will get back to you within 24 hours with a custom strategy proposal.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {contactInfo.map((c, i) => (
                  <MagneticCard key={c.label} intensity={5}>
                    <ScrollStaggerItem index={i} className={`group relative overflow-hidden ${c.bgHover} p-4 border ${c.border} transition-all duration-700 ${c.glowHover}`}>
                      <div className={`absolute top-0 left-0 right-0 h-1 ${c.color.replace('text-', 'bg-')} transition-all duration-500 group-hover:h-1.5`} />
                      <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                        <c.icon className={`w-5 h-5 ${c.color} mb-2`} strokeWidth={1.5} />
                      </motion.div>
                      <p className="text-xs font-bold uppercase tracking-wider text-foreground mb-1">{c.label}</p>
                      <p className="text-sm text-muted-foreground">{c.value}</p>
                    </ScrollStaggerItem>
                  </MagneticCard>
                ))}
              </div>
            </ScrollTextReveal>

            {/* Right: Form */}
            <ScrollTextReveal>
              {submitted ? (
                <div className="stripe-accent pl-8 py-8">
                  <h2 className="text-3xl font-black uppercase mb-3 text-foreground">Thank You</h2>
                  <p className="text-muted-foreground">We'll get back to you within 24 hours with a custom proposal.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">Name *</label>
                      <input required type="text" className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-google-blue focus:shadow-[0_0_20px_rgba(66,133,244,0.15)] transition-all" placeholder="Your Name" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">Email *</label>
                      <input required type="email" className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-google-blue focus:shadow-[0_0_20px_rgba(66,133,244,0.15)] transition-all" placeholder="Email Address" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">Business Name</label>
                      <input type="text" className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-google-green focus:shadow-[0_0_20px_rgba(52,168,83,0.15)] transition-all" placeholder="Business Name" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">Phone</label>
                      <input type="tel" className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-google-red focus:shadow-[0_0_20px_rgba(234,67,53,0.15)] transition-all" placeholder="Phone Number" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">Package</label>
                    <select className="w-full px-4 py-3 bg-background border border-border text-muted-foreground focus:outline-none focus:border-google-yellow focus:shadow-[0_0_20px_rgba(251,188,4,0.15)] transition-all appearance-none">
                      <option value="">Select Package</option>
                      <option>Basic – $99.99 AUD</option>
                      <option>Premium – $149.99 AUD</option>
                      <option>Advance – $199.99 AUD</option>
                      <option>Enterprise – $299.99 AUD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">Message</label>
                    <textarea rows={5} className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-google-blue focus:shadow-[0_0_20px_rgba(66,133,244,0.15)] transition-all resize-none" placeholder="Tell us about your business and goals..." />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-10 py-4 text-xs font-bold uppercase tracking-wider bg-google-blue text-primary-foreground hover:shadow-[0_0_30px_rgba(66,133,244,0.3)] transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Start Ranking Today <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </form>
              )}
            </ScrollTextReveal>
          </div>
        </div>
      </ScrollRevealSection>

      <CertificationsMarquee className="border-t border-border bg-secondary" />
      <Footer />
    </div>
  );
};

export default Contact;
