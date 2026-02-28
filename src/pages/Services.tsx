import { useMemo, useState } from "react";
import AnimatedDots from "@/components/AnimatedDots";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, TrendingUp, Search, Star, Building2, BarChart3, FileText, ArrowRight, Camera, MessageSquare, Smartphone, Globe, Shield, Zap, Award, Users, ShoppingCart, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useCountry } from "@/contexts/CountryContext";
import { useCart } from "@/contexts/CartContext";
import { usePublicServices } from "@/hooks/usePublicData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroBackground from "@/components/HeroBackground";
import ScrollRevealSection, { ScrollParallaxImage, ScrollTextReveal, ScrollStaggerItem } from "@/components/ScrollRevealSection";
import MagneticCard from "@/components/MagneticCard";
import CertificationsMarquee from "@/components/CertificationsMarquee";

const services = [
  {
    icon: MapPin,
    title: "Google Business Profile Setup & Verification",
    desc: "Complete setup and verification of your Google Business Profile for maximum local visibility. We optimize every field — from categories, attributes, and service areas to business descriptions, hours, and special features.",
    details: ["Profile creation & verification", "Category & attribute optimization", "Service area configuration", "Business description SEO", "Photo & logo upload strategy", "Q&A section management"],
    color: "google-blue",
    image: "/images/service-gbp-setup.jpg",
  },
  {
    icon: TrendingUp,
    title: "Google Maps Ranking Optimization",
    desc: "Strategic optimization to push your business to the top of Google Maps results. Our proven methodology targets the three core ranking factors: relevance, distance, and prominence.",
    details: ["Local keyword research & targeting", "Geo-grid ranking analysis", "Proximity optimization strategy", "Behavioral signal improvement", "Google Maps algorithm alignment", "Ranking position tracking"],
    color: "google-green",
    image: "/images/service-maps-ranking.jpg",
  },
  {
    icon: Search,
    title: "Local SEO Strategy & Implementation",
    desc: "Comprehensive local SEO strategies tailored to dominate your market area. We analyze your competition, identify keyword gaps, and build a complete roadmap to outrank them.",
    details: ["Competitor gap analysis", "Local keyword mapping", "On-page SEO optimization", "Local link building campaigns", "Content strategy for local relevance", "Technical SEO audit & fixes"],
    color: "google-red",
    image: "/images/service-local-seo.jpg",
  },
  {
    icon: Star,
    title: "Review Growth & Reputation Management",
    desc: "Build and manage your online reputation with strategic review generation campaigns. We help you earn more 5-star reviews through automated follow-up systems.",
    details: ["Review generation campaigns", "Automated follow-up systems", "Professional review responses", "Negative review recovery", "Multi-platform monitoring", "Review analytics & insights"],
    color: "google-yellow",
    image: "/images/service-reviews.jpg",
  },
  {
    icon: Building2,
    title: "Citation Building & NAP Consistency",
    desc: "High-authority citation building across 100+ top directories for powerful trust signals. We ensure your Name, Address, and Phone (NAP) data is perfectly consistent across every platform.",
    details: ["100+ directory submissions", "NAP consistency audit", "Duplicate listing cleanup", "Industry-specific directories", "Data aggregator submissions", "Ongoing citation monitoring"],
    color: "google-blue",
    image: "/images/service-citations.jpg",
  },
  {
    icon: BarChart3,
    title: "Competitor Analysis & Market Intelligence",
    desc: "Deep competitor analysis to identify gaps and build your winning strategy. We reverse-engineer top-ranking competitors in your area to understand exactly what's working.",
    details: ["Top competitor identification", "Ranking factor comparison", "Review profile analysis", "Citation network mapping", "Content gap identification", "Strategic action plan"],
    color: "google-red",
    image: "/images/service-competitor.jpg",
  },
  {
    icon: FileText,
    title: "Monthly Performance Reporting & Analytics",
    desc: "Detailed monthly reports tracking rankings, traffic, and conversion metrics. Clear, actionable insights so you always know your ROI.",
    details: ["Ranking position tracking", "Search impression analytics", "Customer action reports", "Review metric summaries", "ROI calculation", "Monthly strategy recommendations"],
    color: "google-green",
    image: "/images/service-reporting.jpg",
  },
  {
    icon: Camera,
    title: "Google Maps Photo & Visual Optimization",
    desc: "Professional photo optimization strategy to make your Google Business Profile visually compelling. Businesses with quality photos receive 42% more requests for directions.",
    details: ["Photo audit & optimization", "Geo-tagged image uploads", "Cover & logo optimization", "360° virtual tour integration", "Photo category management", "Visual engagement tracking"],
    color: "google-yellow",
    image: "/images/service-photos.jpg",
  },
  {
    icon: MessageSquare,
    title: "Google Posts & Content Marketing",
    desc: "Regular Google Post creation to keep your profile active and engaging. Consistent posting has been shown to improve local pack rankings by up to 15%.",
    details: ["Weekly post creation", "Offer & event promotion", "Product showcase posts", "Call-to-action optimization", "Post performance analytics", "Content calendar management"],
    color: "google-blue",
    image: "/images/service-posts.jpg",
  },
  {
    icon: Smartphone,
    title: "Local Landing Page Optimization",
    desc: "Optimized local landing pages that convert Google Maps visitors into paying customers. We build location-specific pages with proper schema markup and conversion-focused design.",
    details: ["Location page creation", "Local schema markup", "Embedded map integration", "Conversion rate optimization", "Mobile-first design", "A/B testing & refinement"],
    color: "google-green",
    image: "/images/service-landing.jpg",
  },
];

const colorMap: Record<string, { text: string; bg: string; border: string; glow: string; glowHover: string; gradient: string; shadow: string }> = {
  "google-blue": {
    text: "text-google-blue",
    bg: "bg-google-blue/10",
    border: "border-google-blue/20",
    glow: "shadow-[0_0_20px_rgba(66,133,244,0.08)]",
    glowHover: "hover:shadow-[0_0_40px_rgba(66,133,244,0.25),0_0_80px_rgba(66,133,244,0.1)]",
    gradient: "from-google-blue/20 to-transparent",
    shadow: "rgba(66,133,244,0.3)",
  },
  "google-red": {
    text: "text-google-red",
    bg: "bg-google-red/10",
    border: "border-google-red/20",
    glow: "shadow-[0_0_20px_rgba(234,67,53,0.08)]",
    glowHover: "hover:shadow-[0_0_40px_rgba(234,67,53,0.25),0_0_80px_rgba(234,67,53,0.1)]",
    gradient: "from-google-red/20 to-transparent",
    shadow: "rgba(234,67,53,0.3)",
  },
  "google-yellow": {
    text: "text-google-yellow",
    bg: "bg-google-yellow/10",
    border: "border-google-yellow/20",
    glow: "shadow-[0_0_20px_rgba(251,188,4,0.08)]",
    glowHover: "hover:shadow-[0_0_40px_rgba(251,188,4,0.25),0_0_80px_rgba(251,188,4,0.1)]",
    gradient: "from-google-yellow/20 to-transparent",
    shadow: "rgba(251,188,4,0.3)",
  },
  "google-green": {
    text: "text-google-green",
    bg: "bg-google-green/10",
    border: "border-google-green/20",
    glow: "shadow-[0_0_20px_rgba(52,168,83,0.08)]",
    glowHover: "hover:shadow-[0_0_40px_rgba(52,168,83,0.25),0_0_80px_rgba(52,168,83,0.1)]",
    gradient: "from-google-green/20 to-transparent",
    shadow: "rgba(52,168,83,0.3)",
  },
};

const ICON_MAP: Record<string, any> = { MapPin, TrendingUp, Search, Star, Building2, BarChart3, FileText, Camera, MessageSquare, Smartphone, Globe, Shield, Zap, Award, Users };

const SERVICE_BASE_PRICE_AUD = 99.99;

const Services = () => {
  const { localePath, formatLocalPrice, toLocalPrice } = useCountry();
  const { addItem } = useCart();
  const { dbServices } = usePublicServices();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const allServices = useMemo(() => {
    if (dbServices.length > 0) {
      // Merge: DB services come first, then append hardcoded ones not in DB
      const dbTitles = new Set(dbServices.map((s) => s.title));
      const mapped = dbServices.map((s) => ({
        icon: ICON_MAP[s.icon_name] || MapPin,
        title: s.title,
        desc: s.description,
        details: s.details,
        color: s.color_theme,
        image: s.image_url || "/images/service-gbp-setup.jpg",
      }));
      const remaining = services.filter((s) => !dbTitles.has(s.title));
      return [...mapped, ...remaining];
    }
    return services;
  }, [dbServices]);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden py-28 md:py-44 bg-[#060918]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060918] via-[#0a1628] to-[#060918]" />
        <HeroBackground />
        <div className="relative z-10 container mx-auto px-6 flex items-center justify-center text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <AnimatedDots label="What We Offer" className="justify-center mb-6" />
            <h1 className="text-5xl md:text-7xl font-black uppercase text-white leading-[0.95] mb-6">
              Our
              <br />
              <span className="text-gradient-google">Services</span>
            </h1>
            <p className="text-base md:text-lg text-white/60 max-w-lg mx-auto leading-relaxed">
              From profile optimization to citation building — every service is engineered to get your business to #1 on Google Maps.
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

      {/* Stats Bar */}
      <ScrollRevealSection className="py-12 bg-secondary border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: String(allServices.length), label: "Specialized Services", color: "text-google-blue" },
              { value: "500+", label: "Businesses Optimized", color: "text-google-red" },
              { value: "98%", label: "Client Retention", color: "text-google-yellow" },
              { value: "#1", label: "Rankings Achieved", color: "text-google-green" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <p className={`text-3xl md:text-4xl font-black ${stat.color}`}>{stat.value}</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollRevealSection>

      {/* Dashboard Image Section */}
      <ScrollRevealSection className="py-16 border-b border-border" clipReveal>
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollTextReveal>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-google-blue mb-3">Data-Driven</p>
              <h2 className="text-3xl font-black uppercase text-foreground mb-4">Optimization Backed by <span className="text-gradient-google">Real Data</span></h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Every service we offer is backed by real data and proven methodologies. We use advanced analytics tools to track your progress and continuously optimize your Google Maps presence.
              </p>
              <Link to={localePath("/contact")} className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider bg-google-blue text-white hover:bg-google-blue/90 transition-colors">
                Get a Free Audit <ArrowRight className="w-4 h-4" />
              </Link>
            </ScrollTextReveal>
            <ScrollParallaxImage
              src="/images/services-dashboard.png"
              alt="Local SEO analytics dashboard showing Google Maps growth metrics"
              className="shadow-lg border border-border aspect-[4/3]"
            />
          </div>
        </div>
      </ScrollRevealSection>

      {/* Services Section Header */}
      <ScrollRevealSection className="pt-24 pb-8">
        <div className="container mx-auto px-6">
          <ScrollTextReveal className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-google-blue mb-3">Full Service Suite</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-foreground mb-4">
              <span className="text-gradient-google">{allServices.length} Services.</span> One Goal.
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Every service is designed to work together as a comprehensive Google Maps domination strategy.</p>
          </ScrollTextReveal>
        </div>
      </ScrollRevealSection>

      {/* Services - Alternating Layout */}
      <div className="pb-24">
        <div className="container mx-auto px-6 space-y-16">
          {allServices.map((s, i) => {
            const colors = colorMap[s.color];
            const isEven = i % 2 === 0;

            return (
              <ScrollRevealSection key={s.title}>
                <ScrollStaggerItem index={0}>
                  <MagneticCard intensity={5} className="will-change-transform">
                  <div
                    className={`relative overflow-hidden border ${colors.border} ${colors.glow} ${colors.glowHover} bg-background transition-all duration-700 ease-out group`}
                  >
                    {/* Color accent bar with hover expand */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-${s.color} transition-all duration-500 group-hover:h-1.5`} />

                    {/* Animated background gradient - intensifies on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-${isEven ? 'r' : 'l'} ${colors.gradient} opacity-30 transition-opacity duration-700 group-hover:opacity-70`} />
                    
                    {/* Radial glow overlay on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: `radial-gradient(ellipse at ${isEven ? '30%' : '70%'} 50%, ${colors.shadow}, transparent 70%)` }} />

                    <div className={`relative grid md:grid-cols-2 gap-0 ${isEven ? '' : 'md:[direction:rtl]'}`}>
                      {/* Image */}
                      <div className="relative overflow-hidden aspect-[16/10] md:aspect-auto">
                        <motion.img
                          src={s.image}
                          alt={s.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-${isEven ? 'r' : 'l'} from-transparent to-background/80`} />
                        
                        {/* Floating service number */}
                        <motion.div
                          className={`absolute top-4 ${isEven ? 'left-4' : 'right-4'} w-12 h-12 flex items-center justify-center font-black text-lg bg-${s.color} text-white`}
                          whileHover={{ rotate: 12, scale: 1.1 }}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </motion.div>
                      </div>

                      {/* Content */}
                      <div className="p-8 md:p-10 flex flex-col justify-center md:[direction:ltr]">
                        <div className="flex items-center gap-3 mb-4">
                          <motion.div
                            className={`p-2.5 ${colors.bg} border ${colors.border}`}
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            <s.icon className={`w-6 h-6 ${colors.text}`} strokeWidth={1.5} />
                          </motion.div>
                          <h3 className="text-lg font-bold uppercase text-foreground">{s.title}</h3>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>

                        {/* Price */}
                        <div className="flex items-center gap-3 mb-4">
                          <span className={`text-2xl font-black ${colors.text}`}>{formatLocalPrice(SERVICE_BASE_PRICE_AUD)}</span>
                          <span className="text-xs uppercase tracking-wider text-muted-foreground">One-time payment</span>
                        </div>

                        {/* Learn More toggle */}
                        <button
                          onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                          className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${colors.text} hover:opacity-80 transition-opacity group/link mb-4`}
                        >
                          {expandedIndex === i ? "Show Less" : "Learn More"}
                          <motion.div animate={{ rotate: expandedIndex === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                            <ChevronDown className="w-4 h-4" />
                          </motion.div>
                        </button>

                        {/* Expandable details */}
                        <AnimatePresence>
                          {expandedIndex === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="pb-4">
                                <p className={`text-xs font-bold uppercase tracking-wider ${colors.text} mb-3`}>What's Included:</p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                                  {s.details.map((d, di) => (
                                    <motion.li
                                      key={d}
                                      className="flex items-center gap-2 text-sm text-muted-foreground"
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: di * 0.05, duration: 0.3 }}
                                    >
                                      <div className={`w-1.5 h-1.5 rounded-full bg-${s.color} shrink-0`} />
                                      {d}
                                    </motion.li>
                                  ))}
                                </ul>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Buy Now button */}
                        <motion.button
                          onClick={() => addItem({ name: s.title, price: toLocalPrice(SERVICE_BASE_PRICE_AUD), type: "package" })}
                          className={`inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider bg-${s.color} text-white hover:opacity-90 transition-opacity`}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Buy Now — {formatLocalPrice(SERVICE_BASE_PRICE_AUD)}
                        </motion.button>
                      </div>
                    </div>
                  </div>
                  </MagneticCard>
                </ScrollStaggerItem>
              </ScrollRevealSection>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <ScrollRevealSection className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-blue-green" />
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <ScrollTextReveal>
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4 text-white">Need a Custom <span className="text-google-yellow">Solution</span>?</h2>
            <p className="text-white/60 mb-8 max-w-lg mx-auto">
              Every business is unique. Contact us for a tailored optimization strategy that fits your goals and budget.
            </p>
            <Link
              to={localePath("/contact")}
              className="inline-flex px-8 py-4 text-xs font-bold uppercase tracking-wider bg-background text-foreground hover:bg-background/90 transition-colors"
            >
              Contact Us
            </Link>
          </ScrollTextReveal>
        </div>
      </ScrollRevealSection>

      <CertificationsMarquee className="border-t border-border bg-secondary" />
      <Footer />
    </div>
  );
};

export default Services;
