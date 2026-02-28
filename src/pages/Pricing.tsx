import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedDots from "@/components/AnimatedDots";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, Shield, Zap, Users, RefreshCw, ShoppingCart, Plus, X } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroBackground from "@/components/HeroBackground";
import ScrollRevealSection, { ScrollParallaxImage, ScrollTextReveal, ScrollStaggerItem } from "@/components/ScrollRevealSection";
import MagneticCard from "@/components/MagneticCard";
import CertificationsMarquee from "@/components/CertificationsMarquee";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useCountry } from "@/contexts/CountryContext";
import SEOHead from "@/components/SEOHead";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AVAILABLE_SERVICES = [
  { name: "Google Business Profile Setup & Verification", desc: "Complete profile setup, verification & optimization" },
  { name: "Google Maps Ranking Optimization", desc: "Boost your Maps ranking with proven SEO strategies" },
  { name: "Local SEO Strategy & Implementation", desc: "Full local SEO roadmap with competitor analysis" },
  { name: "Review Growth & Reputation Management", desc: "Automated review campaigns & reputation monitoring" },
  { name: "Citation Building & NAP Consistency", desc: "100+ directory submissions & NAP audit" },
  { name: "Competitor Analysis & Market Intelligence", desc: "Deep competitor research & strategic action plan" },
  { name: "Monthly Performance Reporting & Analytics", desc: "Detailed ranking, traffic & ROI reports" },
  { name: "Google Maps Photo & Visual Optimization", desc: "Geo-tagged photos, 360° tours & visual strategy" },
  { name: "Google Posts & Content Marketing", desc: "Weekly posts, offers & content calendar management" },
  { name: "Local Landing Page Optimization", desc: "Conversion-focused local pages with schema markup" },
];

const packages = [
  {
    name: "Basic",
    price: 99.99,
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
    price: 149.99,
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
    price: 199.99,
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
    price: 299.99,
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

const CUSTOM_SERVICE_PRICE = 59.99;

const Pricing = () => {
  const { addItem, itemCount } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { toLocalPrice, formatLocalPrice, currencyLabel, country, localePath } = useCountry();
  const localCustomPrice = toLocalPrice(CUSTOM_SERVICE_PRICE);
  const [selectedServices, setSelectedServices] = useState<string[]>([""]);
  const [confettiParticles, setConfettiParticles] = useState<{ id: number; x: number; y: number; color: string; rotation: number; scale: number }[]>([]);

  const triggerConfetti = () => {
    const colors = ["#4285F4", "#EA4335", "#FBBC04", "#34A853"];
    const particles = Array.from({ length: 24 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 300,
      y: -(Math.random() * 200 + 80),
      color: colors[i % colors.length],
      rotation: Math.random() * 720 - 360,
      scale: Math.random() * 0.6 + 0.4,
    }));
    setConfettiParticles(particles);
    setTimeout(() => setConfettiParticles([]), 1200);
  };

  const handleBuyNow = (pkg: typeof packages[0]) => {
    const localPrice = toLocalPrice(pkg.price);
    addItem({ name: `${pkg.name} Package`, price: localPrice, type: "package" });
    navigate(localePath("/checkout"));
  };

  const handleAddToCart = (pkg: typeof packages[0]) => {
    const localPrice = toLocalPrice(pkg.price);
    addItem({ name: `${pkg.name} Package`, price: localPrice, type: "package" });
    toast({ title: `${pkg.name} added to cart!`, description: formatLocalPrice(pkg.price) });
  };

  const handleAddCustomService = (serviceName: string) => {
    if (!serviceName) return;
    addItem({ name: serviceName, price: localCustomPrice, type: "custom" });
    toast({ title: "Service added to cart!", description: `${serviceName} — ${country.currencySymbol}${localCustomPrice.toFixed(2)} ${country.currency}` });
  };

  const addServiceSlot = () => setSelectedServices((prev) => [...prev, ""]);
  const removeServiceSlot = (index: number) => setSelectedServices((prev) => prev.filter((_, i) => i !== index));
  const updateServiceSlot = (index: number, value: string) => {
    setSelectedServices((prev) => prev.map((s, i) => (i === index ? value : s)));
  };

  const getAvailableServices = (currentIndex: number) => {
    const otherSelected = selectedServices.filter((_, i) => i !== currentIndex);
    return AVAILABLE_SERVICES.filter((s) => !otherSelected.includes(s.name));
  };

  const handleAddAllCustom = () => {
    const valid = selectedServices.filter((s) => s);
    if (valid.length === 0) {
      toast({ title: "Select at least one service", variant: "destructive" });
      return;
    }
    valid.forEach((s) => addItem({ name: s, price: localCustomPrice, type: "custom" }));
    toast({ title: `${valid.length} service(s) added to cart!` });
    triggerConfetti();
    setSelectedServices([""]);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead pageTitle="Pricing" pageDescription={`Google Maps SEO packages in ${country.name}. Plans from ${country.currencySymbol}${toLocalPrice(99.99).toFixed(2)} ${country.currency}/mo. No contracts, 30-day money-back guarantee.`} />
      <Header />

      {/* Cart floating button */}
      {itemCount > 0 && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => navigate(localePath("/checkout"))}
          className="fixed bottom-6 right-6 z-50 bg-google-blue text-white p-4 rounded-full shadow-2xl hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="text-sm font-bold">{itemCount}</span>
        </motion.button>
      )}

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
                      <span className="text-4xl font-black">{country.currencySymbol}{toLocalPrice(pkg.price).toFixed(2)}</span>
                      <span className={`text-sm ml-1 ${pkg.popular ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{currencyLabel}</span>
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
                  <div className="relative p-8 pt-0 space-y-2">
                    <button
                      onClick={() => handleBuyNow(pkg)}
                      className={`block w-full text-center py-3 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                        pkg.popular
                          ? "bg-background text-foreground hover:bg-background/90 hover:shadow-lg"
                          : "bg-google-blue text-white hover:opacity-90 hover:shadow-lg"
                      }`}
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={() => handleAddToCart(pkg)}
                      className={`block w-full text-center py-3 text-xs font-bold uppercase tracking-wider border transition-all duration-300 ${
                        pkg.popular
                          ? "border-background/30 text-primary-foreground/70 hover:bg-background/10"
                          : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                      }`}
                    >
                      <ShoppingCart className="w-3.5 h-3.5 inline mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </ScrollStaggerItem>
              </MagneticCard>
            ))}
          </div>
        </div>
      </ScrollRevealSection>

      {/* Custom Services Builder */}
      <ScrollRevealSection className="py-24 border-t border-border bg-secondary">
        <div className="container mx-auto px-6 max-w-2xl">
          <ScrollTextReveal className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-google-red mb-3">Customize</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-foreground mb-4">Build Your Own <span className="text-gradient-google">Bundle</span></h2>
            <p className="text-muted-foreground">Add individual services at <span className="text-google-blue font-bold">{country.currencySymbol}{localCustomPrice.toFixed(2)} {country.currency}</span> each. Select the services you need from our catalog.</p>
          </ScrollTextReveal>

          <div className="bg-card border border-border p-8 shadow-lg">
            <div className="space-y-3 mb-6">
              {selectedServices.map((service, i) => (
                <div key={i} className="flex gap-2">
                  <Select value={service} onValueChange={(val) => updateServiceSlot(i, val)}>
                    <SelectTrigger className="flex-1 py-3 bg-background border-border text-sm">
                      <SelectValue placeholder={`Select service ${i + 1}...`} />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableServices(i).map((s) => (
                        <SelectItem key={s.name} value={s.name}>
                          <div className="flex flex-col gap-0.5">
                            <span className="font-medium">{s.name}</span>
                            <span className="text-xs text-muted-foreground">{s.desc} — {country.currencySymbol}{localCustomPrice.toFixed(2)}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <button
                    type="button"
                    onClick={() => handleAddCustomService(service)}
                    disabled={!service}
                    className="px-3 py-3 bg-google-green text-white hover:opacity-90 transition-opacity disabled:opacity-40"
                    title="Add to cart"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                  {selectedServices.length > 1 && (
                    <button type="button" onClick={() => removeServiceSlot(i)} className="px-3 py-3 border border-border text-muted-foreground hover:text-google-red transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Summary Preview */}
            <motion.div
              initial={false}
              animate={selectedServices.some((s) => s) ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="mb-6 border border-border bg-background p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Bundle Summary</p>
                <ul className="space-y-2 mb-4">
                  {selectedServices.filter((s) => s).map((s, i) => (
                    <motion.li
                      key={s}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 12 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-foreground">{s}</span>
                      <span className="text-muted-foreground font-medium">{country.currencySymbol}{localCustomPrice.toFixed(2)}</span>
                    </motion.li>
                  ))}
                </ul>
                <motion.div
                  layout
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between pt-3 border-t border-border"
                >
                  <span className="text-sm font-bold uppercase tracking-wider text-foreground">Total</span>
                  <motion.span
                    key={selectedServices.filter((s) => s).length}
                    initial={{ scale: 1.15, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="text-lg font-black text-google-blue"
                  >
                    {country.currencySymbol}{(selectedServices.filter((s) => s).length * localCustomPrice).toFixed(2)} {country.currency}
                  </motion.span>
                </motion.div>
              </div>
            </motion.div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={addServiceSlot}
                disabled={selectedServices.length >= AVAILABLE_SERVICES.length}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider border border-border text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40"
              >
                <Plus className="w-3.5 h-3.5" /> Add Another
              </button>
              <div className="relative">
                <button type="button" onClick={handleAddAllCustom} className="inline-flex items-center gap-2 px-6 py-2 text-xs font-bold uppercase tracking-wider bg-google-blue text-white hover:opacity-90 transition-opacity">
                  <ShoppingCart className="w-3.5 h-3.5" /> Add All to Cart
                </button>
                <AnimatePresence>
                  {confettiParticles.map((p) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 1, x: 0, y: 0, scale: 0, rotate: 0 }}
                      animate={{ opacity: 0, x: p.x, y: p.y, scale: p.scale, rotate: p.rotation }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="absolute top-1/2 left-1/2 w-2 h-2 rounded-sm pointer-events-none"
                      style={{ backgroundColor: p.color }}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </div>
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

      <CertificationsMarquee className="border-t border-border bg-secondary" />
      <Footer />
    </div>
  );
};

export default Pricing;
