import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, CheckCircle2, Shield, Zap, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroBackground from "@/components/HeroBackground";
import ParallaxImage from "@/components/ParallaxImage";

const packages = [
  {
    name: "Basic",
    price: "$99.99",
    popular: false,
    color: "border-t-google-green",
    dotColor: "bg-google-green",
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
    color: "border-t-google-blue",
    dotColor: "bg-google-blue",
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
    color: "",
    dotColor: "",
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
    color: "border-t-google-yellow",
    dotColor: "bg-google-yellow",
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

const guarantees = [
  { icon: Shield, title: "No Long-Term Contracts", desc: "Cancel anytime. We earn your business every month.", color: "text-google-blue" },
  { icon: Zap, title: "Results in 4-8 Weeks", desc: "See measurable ranking improvements fast.", color: "text-google-red" },
  { icon: Users, title: "Dedicated Support", desc: "Your own account manager for personalized service.", color: "text-google-green" },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden py-28 md:py-44 bg-[#060918]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060918] via-[#0a1628] to-[#060918]" />
        <HeroBackground />
        <div className="relative z-10 container mx-auto px-6 flex items-center justify-center text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-google-blue" />
              <div className="w-2 h-2 rounded-full bg-google-red" />
              <div className="w-2 h-2 rounded-full bg-google-yellow" />
              <div className="w-2 h-2 rounded-full bg-google-green" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 ml-2">Packages</p>
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase text-white leading-[0.95] mb-6">
              Pricing
            </h1>
            <p className="text-base md:text-lg text-white/60 max-w-lg leading-relaxed">
              Transparent pricing, no hidden fees. Choose the plan that matches your growth ambitions.
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

      {/* Growth Image + Intro */}
      <section className="py-16 border-b border-border bg-secondary">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-black uppercase text-foreground mb-4">Invest in Growth</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Choose the package that fits your business goals. Every plan includes our proven Google Maps optimization methodology, dedicated support, and transparent reporting. No hidden fees, no surprises.
              </p>
              <div className="flex flex-wrap gap-4">
                {guarantees.map((g) => (
                  <div key={g.title} className="flex items-center gap-2">
                    <g.icon className={`w-4 h-4 ${g.color}`} />
                    <span className="text-xs font-bold uppercase tracking-wider text-foreground">{g.title}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <ParallaxImage
                src="/images/pricing-growth.png"
                alt="Business growth chart in Google brand colors"
                intensity={80}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
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
                    : `border-border bg-background text-foreground border-t-4 ${pkg.color}`
                } hover:shadow-lg transition-shadow duration-300`}
              >
                {pkg.popular && (
                  <div className="absolute -top-px left-0 right-0 h-1 bg-gradient-to-r from-google-blue via-google-red to-google-green" />
                )}
                <div className="p-8 flex-1">
                  {pkg.popular && (
                    <p className="text-xs font-bold uppercase tracking-wider mb-4 text-google-yellow">Most Popular</p>
                  )}
                  {!pkg.popular && (
                    <div className={`w-2 h-2 ${pkg.dotColor} rounded-full mb-4`} />
                  )}
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-2">{pkg.name}</h3>
                  <div className="mb-8">
                    <span className="text-4xl font-black">{pkg.price}</span>
                    <span className={`text-sm ml-1 ${pkg.popular ? "text-primary-foreground/60" : "text-muted-foreground"}`}>AUD/mo</span>
                  </div>
                  <ul className="space-y-3">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm">
                        <Check className={`w-4 h-4 mt-0.5 shrink-0 ${pkg.popular ? "text-google-green" : "text-google-green"}`} />
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
                        : "bg-google-blue text-primary-foreground hover:opacity-90"
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

      {/* Guarantees */}
      <section className="py-20 border-t border-border bg-secondary">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {guarantees.map((g, i) => (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background p-8 border border-border text-center"
              >
                <g.icon className={`w-8 h-8 ${g.color} mx-auto mb-4`} strokeWidth={1.5} />
                <h3 className="text-sm font-bold uppercase text-foreground mb-2">{g.title}</h3>
                <p className="text-sm text-muted-foreground">{g.desc}</p>
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
