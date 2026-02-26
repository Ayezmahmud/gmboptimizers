import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const stats = [
  { value: "500+", label: "Businesses Ranked" },
  { value: "98%", label: "Client Retention" },
  { value: "30+", label: "Industries Served" },
  { value: "12+", label: "Countries" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="py-24 md:py-40">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-6">
              Google Maps Optimization
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.95] mb-8 text-foreground">
              Dominate
              <br />
              Google Maps.
              <br />
              <span className="text-gradient-google">Own Your Market.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mb-10">
              We turn businesses into #1 ranked local brands on Google Maps.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-xs font-bold uppercase tracking-wider bg-primary text-primary-foreground hover:bg-foreground/90 transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center px-8 py-4 text-xs font-bold uppercase tracking-wider border-2 border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors"
              >
                View Packages
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`py-10 text-center ${i < stats.length - 1 ? "md:border-r border-border" : ""}`}
              >
                <p className="text-3xl md:text-4xl font-black text-foreground">{s.value}</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mt-2">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brief services */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3">What We Do</p>
              <h2 className="text-4xl md:text-5xl font-black uppercase text-foreground">Our Services</h2>
            </div>
            <Link to="/services" className="text-xs font-bold uppercase tracking-wider text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors">
              View All Services →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-border">
            {[
              { title: "Profile Setup", desc: "Complete Google Business Profile setup and verification." },
              { title: "Maps Ranking", desc: "Strategic optimization for top Google Maps placement." },
              { title: "Local SEO", desc: "Comprehensive local SEO to dominate your area." },
            ].map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background p-10"
              >
                <p className="text-xs font-bold text-muted-foreground mb-4 uppercase tracking-wider">0{i + 1}</p>
                <h3 className="text-xl font-bold uppercase text-foreground mb-3">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground py-24">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-6">Ready to Rank #1?</h2>
            <p className="text-primary-foreground/60 mb-10 max-w-lg mx-auto">
              Join 500+ businesses that trust GB Optimizers to dominate their local market.
            </p>
            <Link
              to="/contact"
              className="inline-flex px-8 py-4 text-xs font-bold uppercase tracking-wider bg-background text-foreground hover:bg-background/90 transition-colors"
            >
              Start Today
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
