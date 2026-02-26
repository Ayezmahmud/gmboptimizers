import { motion } from "framer-motion";
import { MapPin, TrendingUp, Search, Star, Building2, BarChart3, FileText, ArrowRight, Globe, Camera, MessageSquare, Layers, Target, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const services = [
  {
    icon: MapPin,
    title: "Google Business Profile Setup & Verification",
    desc: "Complete setup and verification of your Google Business Profile for maximum local visibility. We optimize every field — from categories, attributes, and service areas to business descriptions, hours, and special features. Our team ensures your profile meets Google's latest guidelines and stands out in the local pack.",
    details: ["Profile creation & verification", "Category & attribute optimization", "Service area configuration", "Business description SEO", "Photo & logo upload strategy", "Q&A section management"],
    color: "text-google-blue",
    bgColor: "bg-google-blue/5",
  },
  {
    icon: TrendingUp,
    title: "Google Maps Ranking Optimization",
    desc: "Strategic optimization to push your business to the top of Google Maps results. Our proven methodology targets the three core ranking factors: relevance, distance, and prominence. We implement geo-targeted strategies, local keyword optimization, and behavioral signal improvements to achieve sustainable top rankings.",
    details: ["Local keyword research & targeting", "Geo-grid ranking analysis", "Proximity optimization strategy", "Behavioral signal improvement", "Google Maps algorithm alignment", "Ranking position tracking"],
    color: "text-google-green",
    bgColor: "bg-google-green/5",
  },
  {
    icon: Search,
    title: "Local SEO Strategy & Implementation",
    desc: "Comprehensive local SEO strategies tailored to dominate your market area. We analyze your competition, identify keyword gaps, and build a complete roadmap to outrank them. Our approach covers on-page optimization, local link building, content strategy, and technical SEO to create a holistic local search presence.",
    details: ["Competitor gap analysis", "Local keyword mapping", "On-page SEO optimization", "Local link building campaigns", "Content strategy for local relevance", "Technical SEO audit & fixes"],
    color: "text-google-red",
    bgColor: "bg-google-red/5",
  },
  {
    icon: Star,
    title: "Review Growth & Reputation Management",
    desc: "Build and manage your online reputation with strategic review generation campaigns. We help you earn more 5-star reviews through automated follow-up systems, respond professionally to all feedback (positive and negative), and monitor your online sentiment across all major platforms.",
    details: ["Review generation campaigns", "Automated follow-up systems", "Professional review responses", "Negative review recovery", "Multi-platform monitoring", "Review analytics & insights"],
    color: "text-google-yellow",
    bgColor: "bg-google-yellow/5",
  },
  {
    icon: Building2,
    title: "Citation Building & NAP Consistency",
    desc: "High-authority citation building across 100+ top directories for powerful trust signals. We ensure your Name, Address, and Phone (NAP) data is perfectly consistent across every platform — from major directories like Yelp, Yellow Pages, and BBB to industry-specific listings that strengthen your local authority.",
    details: ["100+ directory submissions", "NAP consistency audit", "Duplicate listing cleanup", "Industry-specific directories", "Data aggregator submissions", "Ongoing citation monitoring"],
    color: "text-google-blue",
    bgColor: "bg-google-blue/5",
  },
  {
    icon: BarChart3,
    title: "Competitor Analysis & Market Intelligence",
    desc: "Deep competitor analysis to identify gaps and build your winning strategy. We reverse-engineer top-ranking competitors in your area to understand exactly what's working, then build a strategy that outperforms them. Our analysis covers ranking factors, review profiles, citation networks, and content strategies.",
    details: ["Top competitor identification", "Ranking factor comparison", "Review profile analysis", "Citation network mapping", "Content gap identification", "Strategic action plan"],
    color: "text-google-red",
    bgColor: "bg-google-red/5",
  },
  {
    icon: FileText,
    title: "Monthly Performance Reporting & Analytics",
    desc: "Detailed monthly reports tracking rankings, traffic, and conversion metrics. Clear, actionable insights so you always know your ROI. Our reports include ranking position changes, search impression data, customer actions (calls, website visits, direction requests), review metrics, and strategic recommendations for the month ahead.",
    details: ["Ranking position tracking", "Search impression analytics", "Customer action reports", "Review metric summaries", "ROI calculation", "Monthly strategy recommendations"],
    color: "text-google-green",
    bgColor: "bg-google-green/5",
  },
  {
    icon: Camera,
    title: "Google Maps Photo & Visual Optimization",
    desc: "Professional photo optimization strategy to make your Google Business Profile visually compelling. We optimize existing photos, recommend new shots, implement geo-tagging for local relevance, and ensure your visual presence outshines competitors. Businesses with quality photos receive 42% more requests for directions.",
    details: ["Photo audit & optimization", "Geo-tagged image uploads", "Cover & logo optimization", "360° virtual tour integration", "Photo category management", "Visual engagement tracking"],
    color: "text-google-yellow",
    bgColor: "bg-google-yellow/5",
  },
  {
    icon: MessageSquare,
    title: "Google Posts & Content Marketing",
    desc: "Regular Google Post creation to keep your profile active and engaging. We craft compelling posts about offers, events, updates, and products that drive engagement and signal freshness to Google's algorithm. Consistent posting has been shown to improve local pack rankings by up to 15%.",
    details: ["Weekly post creation", "Offer & event promotion", "Product showcase posts", "Call-to-action optimization", "Post performance analytics", "Content calendar management"],
    color: "text-google-blue",
    bgColor: "bg-google-blue/5",
  },
  {
    icon: Smartphone,
    title: "Local Landing Page Optimization",
    desc: "Optimized local landing pages that convert Google Maps visitors into paying customers. We build and optimize location-specific pages with proper schema markup, local keywords, embedded maps, and conversion-focused design that works seamlessly with your Google Business Profile.",
    details: ["Location page creation", "Local schema markup", "Embedded map integration", "Conversion rate optimization", "Mobile-first design", "A/B testing & refinement"],
    color: "text-google-green",
    bgColor: "bg-google-green/5",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden py-28 md:py-36 bg-[#060918]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060918] via-[#0a1628] to-[#060918]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-google-red rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-google-blue rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-google-blue" />
              <div className="w-2 h-2 rounded-full bg-google-red" />
              <div className="w-2 h-2 rounded-full bg-google-yellow" />
              <div className="w-2 h-2 rounded-full bg-google-green" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 ml-2">What We Offer</p>
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase text-white leading-[0.95] mb-6">
              Our
              <br />
              Services
            </h1>
            <p className="text-base md:text-lg text-white/60 max-w-lg leading-relaxed">
              From profile optimization to citation building — every service is engineered to get your business to #1 on Google Maps. 10 specialized services, one goal: your success.
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

      {/* Dashboard Image */}
      <section className="py-16 border-b border-border bg-secondary">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-black uppercase text-foreground mb-4">Data-Driven Optimization</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Every service we offer is backed by real data and proven methodologies. We use advanced analytics tools to track your progress and continuously optimize your Google Maps presence for maximum visibility and conversions.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-google-blue hover:opacity-80 transition-opacity">
                Get a Free Audit <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="/images/services-dashboard.png"
                alt="Local SEO analytics dashboard showing Google Maps growth metrics"
                className="w-full shadow-lg border border-border"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid - Expanded */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-google-blue mb-3">Full Service Suite</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-foreground mb-4">10 Services. One Goal.</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Every service is designed to work together as a comprehensive Google Maps domination strategy.</p>
          </div>
          <div className="space-y-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`bg-background p-8 md:p-10 border border-border group hover:shadow-lg transition-all duration-300 ${s.bgColor}`}
              >
                <div className="grid md:grid-cols-[1fr_1fr] gap-8">
                  <div>
                    <div className="flex items-start gap-4 mb-4">
                      <s.icon className={`w-8 h-8 ${s.color} shrink-0 mt-1`} strokeWidth={1.5} />
                      <h3 className="text-lg font-bold uppercase text-foreground">{s.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">What's Included:</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {s.details.map((d) => (
                        <li key={d} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className={`w-1.5 h-1.5 rounded-full ${s.color.replace('text-', 'bg-')}`} />
                          {d}
                        </li>
                      ))}
                    </ul>
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-4">Need a Custom Solution?</h2>
            <p className="text-primary-foreground/60 mb-8 max-w-lg mx-auto">
              Every business is unique. Contact us for a tailored optimization strategy that fits your goals and budget.
            </p>
            <Link
              to="/contact"
              className="inline-flex px-8 py-4 text-xs font-bold uppercase tracking-wider bg-background text-foreground hover:bg-background/90 transition-colors"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
