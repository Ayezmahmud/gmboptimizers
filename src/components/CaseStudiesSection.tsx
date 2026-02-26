import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUp, Phone, Globe } from "lucide-react";

const cases = [
  {
    business: "Melbourne Dental Clinic",
    industry: "Healthcare",
    stats: [
      { icon: ArrowUp, label: "Ranking Improvement", value: "#14 → #1", color: "text-google-blue" },
      { icon: Phone, label: "Monthly Calls Increase", value: "+340%", color: "text-google-green" },
      { icon: Globe, label: "Website Visits Increase", value: "+520%", color: "text-google-red" },
    ],
  },
  {
    business: "Sydney Auto Repair",
    industry: "Automotive",
    stats: [
      { icon: ArrowUp, label: "Ranking Improvement", value: "#22 → #2", color: "text-google-yellow" },
      { icon: Phone, label: "Monthly Calls Increase", value: "+280%", color: "text-google-blue" },
      { icon: Globe, label: "Website Visits Increase", value: "+410%", color: "text-google-green" },
    ],
  },
  {
    business: "Brisbane Law Firm",
    industry: "Legal",
    stats: [
      { icon: ArrowUp, label: "Ranking Improvement", value: "#18 → #1", color: "text-google-red" },
      { icon: Phone, label: "Monthly Calls Increase", value: "+190%", color: "text-google-yellow" },
      { icon: Globe, label: "Website Visits Increase", value: "+350%", color: "text-google-blue" },
    ],
  },
];

const CaseStudiesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="case-studies" className="py-32 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            Case <span className="text-gradient-blue-green">Studies</span>
          </h2>
          <p className="text-muted-foreground text-lg">Real results from real businesses.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {cases.map((c, i) => (
            <motion.div
              key={c.business}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="p-8 rounded-2xl bg-card border border-border hover:border-google-blue/30 transition-all duration-500"
            >
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{c.industry}</p>
              <h3 className="text-xl font-semibold mb-6 text-foreground">{c.business}</h3>
              <div className="space-y-5">
                {c.stats.map((s) => (
                  <div key={s.label} className="flex items-center gap-3">
                    <s.icon className={`w-5 h-5 ${s.color}`} />
                    <div>
                      <p className={`text-2xl font-bold font-display ${s.color}`}>{s.value}</p>
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
