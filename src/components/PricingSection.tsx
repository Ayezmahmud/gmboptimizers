import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const packages = [
  {
    name: "Basic",
    price: "$99.99",
    color: "google-green",
    popular: false,
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
    price: "$149.99",
    color: "google-blue",
    popular: false,
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
    price: "$199.99",
    color: "google-red",
    popular: true,
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
    price: "$299.99",
    color: "google-yellow",
    popular: false,
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

const borderColors: Record<string, string> = {
  "google-green": "border-google-green/30 hover:border-google-green/60",
  "google-blue": "border-google-blue/30 hover:border-google-blue/60",
  "google-red": "border-google-red/30 hover:border-google-red/60",
  "google-yellow": "border-google-yellow/30 hover:border-google-yellow/60",
};

const glowColors: Record<string, string> = {
  "google-green": "hover:glow-green",
  "google-blue": "hover:glow-blue",
  "google-red": "hover:glow-red",
  "google-yellow": "hover:glow-yellow",
};

const btnColors: Record<string, string> = {
  "google-green": "bg-google-green",
  "google-blue": "bg-google-blue",
  "google-red": "bg-google-red",
  "google-yellow": "bg-google-yellow text-background",
};

const PricingSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="py-32 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gradient-google">Pricing</span> Packages
          </h2>
          <p className="text-muted-foreground text-lg">Choose the plan that fits your business goals.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.12 }}
              className={`relative p-8 rounded-2xl bg-card border ${borderColors[pkg.color]} ${glowColors[pkg.color]} transition-all duration-500 hover:scale-[1.03] flex flex-col`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-google-red text-xs font-bold uppercase tracking-wider text-foreground">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-semibold mb-2 text-foreground">{pkg.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold font-display text-foreground">{pkg.price}</span>
                <span className="text-muted-foreground text-sm ml-1">AUD/mo</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-google-green mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`block text-center py-3 rounded-full font-semibold text-foreground ${btnColors[pkg.color]} transition-all duration-300 hover:opacity-90`}
              >
                Get Started
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
