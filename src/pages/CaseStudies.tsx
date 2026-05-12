import AnimatedDots from "@/components/AnimatedDots";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCountry } from "@/contexts/CountryContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroBackground from "@/components/HeroBackground";
import { getCaseStudiesForCountry } from "@/data/caseStudies";
import ScrollRevealSection, { ScrollParallaxImage, ScrollTextReveal, ScrollStaggerItem } from "@/components/ScrollRevealSection";
import MagneticCard from "@/components/MagneticCard";

const CaseStudies = () => {
  const { localePath, countryCode, country } = useCountry();
  const caseStudies = getCaseStudiesForCountry(countryCode);

  // Split into local (tagged for this country) and global (rest)
  const localStudies = caseStudies.filter((c) => c.countries?.includes(countryCode));
  const globalStudies = caseStudies.filter((c) => !c.countries?.includes(countryCode));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden py-28 md:py-44 bg-[#060918]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060918] via-[#0a1628] to-[#060918]" />
        <HeroBackground />
        <div className="relative z-10 container mx-auto px-6 flex items-center justify-center text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <AnimatedDots label={`Results in ${country.name}`} className="justify-center mb-6" />
            <h1 className="text-5xl md:text-7xl font-black uppercase text-white leading-[0.95] mb-6">
              Case
              <br />
              <span className="text-gradient-google">Studies</span>
            </h1>
            <p className="text-base md:text-lg text-white/60 max-w-lg leading-relaxed">
              Real businesses in {country.name}. Real results. See how we've helped clients dominate Google Maps across {country.name}.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-8 flex flex-wrap gap-3 justify-center"
            >
              {["google-blue", "google-red", "google-yellow", "google-green"].map((c, i) => (
                <motion.div
                  key={c}
                  className={`w-3 h-3 rounded-full bg-${c}`}
                  animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 flex z-10">
          <div className="flex-1 bg-google-blue" />
          <div className="flex-1 bg-google-red" />
          <div className="flex-1 bg-google-yellow" />
          <div className="flex-1 bg-google-green" />
        </div>
      </section>

      {/* Local Case Studies */}
      {localStudies.length > 0 && (
        <ScrollRevealSection className="py-24">
          <div className="container mx-auto px-6">
            <ScrollTextReveal className="text-center mb-16">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-google-blue mb-3">
                {country.flag} Featured in {country.name}
              </p>
              <h2 className="text-4xl md:text-5xl font-black uppercase text-foreground">
                {country.name} <span className="text-gradient-google">Success Stories</span>
              </h2>
              <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
                Businesses across {country.name} trust GB Optimizers to dominate their local Google Maps rankings.
              </p>
            </ScrollTextReveal>

            {localStudies.map((c, i) => {
              const colors = ["google-blue", "google-red", "google-yellow", "google-green"];
              const accentColor = colors[i % colors.length];

              return (
                <ScrollStaggerItem key={c.slug} index={0} className="mb-20 last:mb-0">
                  <CaseStudyCard study={c} index={i} accentColor={accentColor} localePath={localePath} />
                  {i < localStudies.length - 1 && <div className="border-b border-border mt-20" />}
                </ScrollStaggerItem>
              );
            })}
          </div>
        </ScrollRevealSection>
      )}

      {/* Global Case Studies */}
      {globalStudies.length > 0 && (
        <ScrollRevealSection className={`py-24 ${localStudies.length > 0 ? "bg-secondary" : ""}`}>
          <div className="container mx-auto px-6">
            <ScrollTextReveal className="text-center mb-16">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-google-green mb-3">
                🌐 Global Portfolio
              </p>
              <h2 className="text-4xl md:text-5xl font-black uppercase text-foreground">
                More <span className="text-gradient-google">Success Stories</span>
              </h2>
              <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
                We deliver results worldwide. Explore our case studies from other markets.
              </p>
            </ScrollTextReveal>

            {globalStudies.map((c, i) => {
              const colors = ["google-blue", "google-red", "google-yellow", "google-green"];
              const accentColor = colors[i % colors.length];

              return (
                <ScrollStaggerItem key={c.slug} index={0} className="mb-20 last:mb-0">
                  <CaseStudyCard study={c} index={i} accentColor={accentColor} localePath={localePath} />
                  {i < globalStudies.length - 1 && <div className="border-b border-border mt-20" />}
                </ScrollStaggerItem>
              );
            })}
          </div>
        </ScrollRevealSection>
      )}

      {/* CTA */}
      <ScrollRevealSection className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-blue-green" />
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/20"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: Math.random() * 3 }}
            />
          ))}
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <ScrollTextReveal>
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-4 text-white">
              Ready to Dominate Google Maps in <span className="text-google-yellow">{country.name}</span>?
            </h2>
            <p className="text-white/60 mb-8 max-w-lg mx-auto">
              Join hundreds of businesses across {country.name} that have achieved #1 rankings with GB Optimizers.
            </p>
            <Link to={localePath("/pricing")} className="inline-flex px-8 py-4 text-xs font-bold uppercase tracking-wider bg-background text-foreground hover:bg-background/90 transition-colors">
              Get Started Today
            </Link>
          </ScrollTextReveal>
        </div>
      </ScrollRevealSection>

      <Footer />
    </div>
  );
};

/* Extracted card component for reuse */
interface CaseStudyCardProps {
  study: ReturnType<typeof getCaseStudiesForCountry>[number];
  index: number;
  accentColor: string;
  localePath: (path: string) => string;
}

const CaseStudyCard = ({ study: c, index: i, accentColor, localePath }: CaseStudyCardProps) => (
  <div className={`grid md:grid-cols-2 gap-12 items-center`}>
    <div className={`${i % 2 === 1 ? "md:order-2" : ""}`}>
      <MagneticCard intensity={4}>
        <div className={`group relative overflow-hidden border border-${accentColor}/20 hover:shadow-[0_0_40px_rgba(66,133,244,0.2)] transition-all duration-700`}>
          <div className={`absolute top-0 left-0 right-0 h-1 bg-${accentColor} transition-all duration-500 group-hover:h-1.5`} />
          <ScrollParallaxImage
            src={c.image}
            alt={c.imageAlt}
            className="w-full aspect-[4/3]"
          />
        </div>
      </MagneticCard>
    </div>

    <ScrollTextReveal className={i % 2 === 1 ? "md:order-1" : ""}>
      <div className="flex items-center gap-3 mb-2">
        <p className={`text-xs font-bold uppercase tracking-wider text-${accentColor}`}>{c.industry}</p>
        <span className="text-muted-foreground/30">•</span>
        <p className="text-xs text-muted-foreground">{c.location}</p>
      </div>
      <h3 className="text-3xl md:text-4xl font-black uppercase text-foreground mb-4">{c.business}</h3>
      <p className="text-muted-foreground leading-relaxed mb-6">{c.summary}</p>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {c.stats.slice(0, 3).map((s) => (
          <MagneticCard key={s.label} intensity={4}>
            <div className={`group relative overflow-hidden bg-secondary p-4 border border-border/50 h-full transition-all duration-700 hover:shadow-[0_0_30px_rgba(66,133,244,0.15)]`}>
              <div className={`absolute top-0 left-0 right-0 h-0.5 bg-${accentColor} transition-all duration-500 group-hover:h-1`} />
              <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{s.label}</p>
            </div>
          </MagneticCard>
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
        to={localePath(`/case-studies/${c.slug}`)}
        className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-${accentColor} hover:opacity-80 transition-opacity group/link`}
      >
        Read Full Case Study <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
      </Link>
    </ScrollTextReveal>
  </div>
);

export default CaseStudies;
