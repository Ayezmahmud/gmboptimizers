import { motion } from "framer-motion";
import { MapPin, TrendingUp, Search, Star, Building2, BarChart3, FileText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const services = [
  { icon: MapPin, title: "Google Business Profile Setup", desc: "Complete setup and verification of your Google Business Profile for maximum local visibility.", color: "text-google-blue" },
  { icon: TrendingUp, title: "Google Maps Ranking Optimization", desc: "Strategic optimization to push your business to the top of Google Maps results.", color: "text-google-green" },
  { icon: Search, title: "Local SEO Strategy", desc: "Comprehensive local SEO strategies tailored to dominate your market area.", color: "text-google-red" },
  { icon: Star, title: "Review Growth & Management", desc: "Build and manage your online reputation with strategic review generation.", color: "text-google-yellow" },
  { icon: Building2, title: "Citation Building", desc: "High-authority citation building across top directories for trust signals.", color: "text-google-blue" },
  { icon: BarChart3, title: "Competitor Analysis", desc: "Deep competitor analysis to identify gaps and outperform the competition.", color: "text-google-red" },
  { icon: FileText, title: "Monthly Performance Reporting", desc: "Detailed monthly reports tracking rankings, traffic, and conversion metrics.", color: "text-google-green" },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

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

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-px bg-border">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-background p-10 md:p-12 group hover:bg-secondary transition-colors duration-300"
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

      <Footer />
    </div>
  );
};

export default Services;
