import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const packages = [
  {
    name: "Basic",
    price: "$99.99",
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

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">Packages</p>
            <h1 className="text-5xl md:text-7xl font-black uppercase text-foreground leading-[0.95]">
              Pricing
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative border flex flex-col ${
                  pkg.popular
                    ? "border-foreground bg-primary text-primary-foreground"
                    : "border-border bg-background text-foreground"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-px left-0 right-0 h-1 bg-gradient-to-r from-google-blue via-google-red to-google-green" />
                )}
                <div className="p-8 flex-1">
                  {pkg.popular && (
                    <p className="text-xs font-bold uppercase tracking-wider mb-4 text-primary-foreground/60">Most Popular</p>
                  )}
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-2">{pkg.name}</h3>
                  <div className="mb-8">
                    <span className="text-4xl font-black">{pkg.price}</span>
                    <span className={`text-sm ml-1 ${pkg.popular ? "text-primary-foreground/60" : "text-muted-foreground"}`}>AUD/mo</span>
                  </div>
                  <ul className="space-y-3">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm">
                        <Check className={`w-4 h-4 mt-0.5 shrink-0 ${pkg.popular ? "text-primary-foreground/60" : "text-muted-foreground"}`} />
                        <span className={pkg.popular ? "text-primary-foreground/80" : "text-muted-foreground"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-8 pt-0">
                  <Link
                    to="/contact"
                    className={`block text-center py-3 text-xs font-bold uppercase tracking-wider transition-colors ${
                      pkg.popular
                        ? "bg-background text-foreground hover:bg-background/90"
                        : "bg-primary text-primary-foreground hover:bg-foreground/90"
                    }`}
                  >
                    Get Started
                  </Link>
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

export default Pricing;
