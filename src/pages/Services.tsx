import { motion } from "framer-motion";
import { MapPin, TrendingUp, Search, Star, Building2, BarChart3, FileText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const services = [
  { icon: MapPin, title: "Google Business Profile Setup", desc: "Complete setup and verification of your Google Business Profile for maximum local visibility. We optimize every field, category, and attribute to ensure your profile stands out.", color: "text-google-blue" },
  { icon: TrendingUp, title: "Google Maps Ranking Optimization", desc: "Strategic optimization to push your business to the top of Google Maps results. Our proven methodology targets the key ranking factors that matter most.", color: "text-google-green" },
  { icon: Search, title: "Local SEO Strategy", desc: "Comprehensive local SEO strategies tailored to dominate your market area. We analyze your competition and build a roadmap to outrank them.", color: "text-google-red" },
  { icon: Star, title: "Review Growth & Management", desc: "Build and manage your online reputation with strategic review generation. We help you earn more 5-star reviews and respond professionally to all feedback.", color: "text-google-yellow" },
  { icon: Building2, title: "Citation Building", desc: "High-authority citation building across top directories for trust signals. Consistent NAP data across 100+ platforms strengthens your local presence.", color: "text-google-blue" },
  { icon: BarChart3, title: "Competitor Analysis", desc: "Deep competitor analysis to identify gaps and outperform the competition. We reverse-engineer top-ranking competitors to build your winning strategy.", color: "text-google-red" },
  { icon: FileText, title: "Monthly Performance Reporting", desc: "Detailed monthly reports tracking rankings, traffic, and conversion metrics. Clear, actionable insights so you always know your ROI.", color: "text-google-green" },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-google-blue mb-4">What We Offer</p>
            <h1 className="text-5xl md:text-7xl font-black uppercase text-foreground leading-[0.95]">
              Our
              <br />
              Services
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Color bar */}
      <div className="h-1 flex">
        <div className="flex-1 bg-google-blue" />
        <div className="flex-1 bg-google-red" />
        <div className="flex-1 bg-google-yellow" />
        <div className="flex-1 bg-google-green" />
      </div>

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
                alt="Local SEO analytics dashboard showing growth metrics"
                className="w-full shadow-lg border border-border"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-background p-10 md:p-12 border border-border group hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  <s.icon className={`w-8 h-8 ${s.color} shrink-0 mt-1`} strokeWidth={1.5} />
                  <div>
                    <h3 className="text-lg font-bold uppercase text-foreground mb-3">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
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
