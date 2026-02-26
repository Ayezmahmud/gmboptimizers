import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, TrendingUp, Search, Star, Building2, BarChart3, FileText } from "lucide-react";

const services = [
  { icon: MapPin, title: "Google Business Profile Setup", desc: "Complete setup and verification of your Google Business Profile for maximum local visibility.", color: "google-blue" },
  { icon: TrendingUp, title: "Google Maps Ranking Optimization", desc: "Strategic optimization to push your business to the top of Google Maps results.", color: "google-green" },
  { icon: Search, title: "Local SEO Strategy", desc: "Comprehensive local SEO strategies tailored to dominate your market area.", color: "google-red" },
  { icon: Star, title: "Review Growth & Management", desc: "Build and manage your online reputation with strategic review generation.", color: "google-yellow" },
  { icon: Building2, title: "Citation Building", desc: "High-authority citation building across top directories for trust signals.", color: "google-blue" },
  { icon: BarChart3, title: "Competitor Analysis", desc: "Deep competitor analysis to identify gaps and outperform the competition.", color: "google-green" },
  { icon: FileText, title: "Monthly Performance Reporting", desc: "Detailed monthly reports tracking rankings, traffic, and conversion metrics.", color: "google-red" },
];

const colorMap: Record<string, string> = {
  "google-blue": "border-glow-blue hover:glow-blue",
  "google-green": "border-glow-green hover:glow-green",
  "google-red": "border-glow-red hover:glow-red",
  "google-yellow": "border-glow-yellow hover:glow-yellow",
};

const iconColorMap: Record<string, string> = {
  "google-blue": "text-google-blue",
  "google-green": "text-google-green",
  "google-red": "text-google-red",
  "google-yellow": "text-google-yellow",
};

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-32 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            Our <span className="text-gradient-red-yellow">Services</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Comprehensive Google Maps optimization solutions for businesses of every size.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className={`group p-8 rounded-2xl bg-card border border-border ${colorMap[service.color]} transition-all duration-500 hover:scale-[1.03]`}
            >
              <service.icon className={`w-10 h-10 mb-5 ${iconColorMap[service.color]}`} />
              <h3 className="text-xl font-semibold mb-3 text-foreground">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
