import { motion } from "framer-motion";
import { ArrowUp, Phone, Globe } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const cases = [
  {
    business: "Melbourne Dental Clinic",
    industry: "Healthcare",
    stats: [
      { icon: ArrowUp, label: "Ranking Improvement", value: "#14 → #1" },
      { icon: Phone, label: "Monthly Calls Increase", value: "+340%" },
      { icon: Globe, label: "Website Visits Increase", value: "+520%" },
    ],
  },
  {
    business: "Sydney Auto Repair",
    industry: "Automotive",
    stats: [
      { icon: ArrowUp, label: "Ranking Improvement", value: "#22 → #2" },
      { icon: Phone, label: "Monthly Calls Increase", value: "+280%" },
      { icon: Globe, label: "Website Visits Increase", value: "+410%" },
    ],
  },
  {
    business: "Brisbane Law Firm",
    industry: "Legal",
    stats: [
      { icon: ArrowUp, label: "Ranking Improvement", value: "#18 → #1" },
      { icon: Phone, label: "Monthly Calls Increase", value: "+190%" },
      { icon: Globe, label: "Website Visits Increase", value: "+350%" },
    ],
  },
];

const CaseStudies = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">Results</p>
            <h1 className="text-5xl md:text-7xl font-black uppercase text-foreground leading-[0.95]">
              Case
              <br />
              Studies
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 space-y-0">
          {cases.map((c, i) => (
            <motion.div
              key={c.business}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border-b border-border py-12 md:py-16"
            >
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">{c.industry}</p>
                  <h3 className="text-2xl md:text-3xl font-black uppercase text-foreground">{c.business}</h3>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  {c.stats.map((s) => (
                    <div key={s.label}>
                      <s.icon className="w-5 h-5 text-muted-foreground mb-2" />
                      <p className="text-2xl md:text-3xl font-black text-foreground">{s.value}</p>
                      <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudies;
