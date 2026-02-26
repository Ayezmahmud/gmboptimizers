import { motion } from "framer-motion";
import { ArrowUp, Phone, Globe, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const cases = [
  {
    business: "Melbourne Dental Clinic",
    industry: "Healthcare",
    image: "/images/case-study-1.png",
    imageAlt: "Business owner viewing top Google Maps ranking on tablet",
    description: "A leading dental practice in Melbourne's CBD was struggling with online visibility despite excellent patient reviews. We implemented a comprehensive Google Maps strategy that transformed their digital presence.",
    stats: [
      { icon: ArrowUp, label: "Ranking Improvement", value: "#14 → #1", color: "text-google-green" },
      { icon: Phone, label: "Monthly Calls Increase", value: "+340%", color: "text-google-blue" },
      { icon: Globe, label: "Website Visits Increase", value: "+520%", color: "text-google-red" },
    ],
  },
  {
    business: "Sydney Auto Repair",
    industry: "Automotive",
    image: "/images/case-study-2.png",
    imageAlt: "Modern auto repair shop with Google Maps pin overlay",
    description: "A family-owned auto repair shop in Sydney faced stiff competition from larger chains. Our targeted local SEO and citation strategy helped them dominate their suburb on Google Maps.",
    stats: [
      { icon: ArrowUp, label: "Ranking Improvement", value: "#22 → #2", color: "text-google-green" },
      { icon: Phone, label: "Monthly Calls Increase", value: "+280%", color: "text-google-blue" },
      { icon: Globe, label: "Website Visits Increase", value: "+410%", color: "text-google-red" },
    ],
  },
  {
    business: "Brisbane Law Firm",
    industry: "Legal",
    image: "/images/case-study-3.png",
    imageAlt: "Modern law firm office interior",
    description: "A mid-size law firm in Brisbane needed to attract more local clients. We optimized their Google Business Profile and built a review strategy that established them as the go-to firm in their area.",
    stats: [
      { icon: ArrowUp, label: "Ranking Improvement", value: "#18 → #1", color: "text-google-green" },
      { icon: Phone, label: "Monthly Calls Increase", value: "+190%", color: "text-google-blue" },
      { icon: Globe, label: "Website Visits Increase", value: "+350%", color: "text-google-red" },
    ],
  },
];

const CaseStudies = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="relative overflow-hidden py-28 md:py-36 bg-[#060918]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060918] via-[#0a1628] to-[#060918]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-google-green rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-google-red rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-google-blue" />
              <div className="w-2 h-2 rounded-full bg-google-red" />
              <div className="w-2 h-2 rounded-full bg-google-yellow" />
              <div className="w-2 h-2 rounded-full bg-google-green" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 ml-2">Results</p>
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase text-white leading-[0.95] mb-6">
              Case
              <br />
              Studies
            </h1>
            <p className="text-base md:text-lg text-white/60 max-w-lg leading-relaxed">
              Real businesses. Real results. See how we've helped clients dominate Google Maps in their markets.
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

      <section className="py-24">
        <div className="container mx-auto px-6">
          {cases.map((c, i) => (
            <motion.div
              key={c.business}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="mb-20 last:mb-0"
            >
              <div className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "md:direction-rtl" : ""}`}>
                {/* Image - alternates sides */}
                <div className={i % 2 === 1 ? "md:order-2" : ""}>
                  <img
                    src={c.image}
                    alt={c.imageAlt}
                    className="w-full shadow-lg border border-border"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className={i % 2 === 1 ? "md:order-1" : ""}>
                  <p className="text-xs font-bold uppercase tracking-wider text-google-blue mb-2">{c.industry}</p>
                  <h3 className="text-3xl md:text-4xl font-black uppercase text-foreground mb-4">{c.business}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-8">{c.description}</p>

                  <div className="grid grid-cols-3 gap-4">
                    {c.stats.map((s) => (
                      <div key={s.label} className="bg-secondary p-4 border border-border">
                        <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
                        <p className="text-2xl font-black text-foreground">{s.value}</p>
                        <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {i < cases.length - 1 && <div className="border-b border-border mt-20" />}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-4">Want Results Like These?</h2>
            <p className="text-primary-foreground/60 mb-8 max-w-lg mx-auto">
              Join 500+ businesses that have achieved #1 rankings with GB Optimizers.
            </p>
            <Link
              to="/contact"
              className="inline-flex px-8 py-4 text-xs font-bold uppercase tracking-wider bg-background text-foreground hover:bg-background/90 transition-colors"
            >
              Get Started Today
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudies;
