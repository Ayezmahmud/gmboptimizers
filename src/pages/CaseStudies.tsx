import { motion } from "framer-motion";
import { ArrowUp, Phone, Globe, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroBackground from "@/components/HeroBackground";
import ParallaxImage from "@/components/ParallaxImage";
import { caseStudies } from "@/data/caseStudies";

const CaseStudies = () => {
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

      {/* Case Studies */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          {caseStudies.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="mb-20 last:mb-0"
            >
              <div className={`grid md:grid-cols-2 gap-12 items-center`}>
                <div className={i % 2 === 1 ? "md:order-2" : ""}>
                  <ParallaxImage
                    src={c.image}
                    alt={c.imageAlt}
                    className="w-full shadow-lg border border-border"
                    intensity={30}
                  />
                </div>

                <div className={i % 2 === 1 ? "md:order-1" : ""}>
                  <div className="flex items-center gap-3 mb-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-google-blue">{c.industry}</p>
                    <span className="text-muted-foreground/30">•</span>
                    <p className="text-xs text-muted-foreground">{c.location}</p>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black uppercase text-foreground mb-4">{c.business}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{c.summary}</p>

                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {c.stats.slice(0, 3).map((s) => (
                      <div key={s.label} className="bg-secondary p-4 border border-border">
                        <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
                        <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 mb-6">
                    <img src={c.ownerImage} alt={c.testimonialAuthor} className="w-10 h-10 rounded-full object-cover border-2 border-border" />
                    <div>
                      <p className="text-sm font-bold text-foreground">{c.testimonialAuthor}</p>
                      <p className="text-xs text-muted-foreground">{c.testimonialRole}</p>
                    </div>
                  </div>

                  <Link
                    to={`/case-studies/${c.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-google-blue hover:opacity-80 transition-opacity"
                  >
                    Read Full Case Study <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {i < caseStudies.length - 1 && <div className="border-b border-border mt-20" />}
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
