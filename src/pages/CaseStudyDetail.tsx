import { useParams, Link } from "react-router-dom";
import { useCountry } from "@/contexts/CountryContext";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, MapPin, TrendingUp } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCaseStudyBySlug, getCaseStudiesForCountry } from "@/data/caseStudies";

const parseRank = (rank: string): number => parseInt(rank.replace("#", ""), 10);

const generateRankingData = (startRank: string, endRank: string, timeline: { week: string }[]) => {
  const start = parseRank(startRank);
  const end = parseRank(endRank);
  const data = [{ week: "Start", rank: start }];
  for (let i = 0; i < timeline.length; i++) {
    const progress = (i + 1) / timeline.length;
    const eased = 1 - Math.pow(1 - progress, 2.5);
    data.push({ week: timeline[i].week, rank: Math.round(start - (start - end) * eased) });
  }
  return data;
};

const generateTrafficData = (timeline: { week: string }[]) => {
  const baselineCalls = 100;
  const baselineVisits = 200;
  const data = [{ week: "Start", calls: baselineCalls, visits: baselineVisits }];
  for (let i = 0; i < timeline.length; i++) {
    const progress = (i + 1) / timeline.length;
    const eased = 1 - Math.pow(1 - progress, 3);
    data.push({
      week: timeline[i].week,
      calls: Math.round(baselineCalls * (1 + eased * 2.5)),
      visits: Math.round(baselineVisits * (1 + eased * 4)),
    });
  }
  return data;
};

const CaseStudyDetail = () => {
  const { localePath, countryCode, country } = useCountry();
  const { slug } = useParams<{ slug: string }>();
  const study = getCaseStudyBySlug(slug || "");

  if (!study) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <div className="container mx-auto px-6 py-40 text-center">
          <h1 className="text-4xl font-black uppercase mb-4">Case Study Not Found</h1>
          <Link to={localePath("/case-studies")} className="text-google-blue text-sm font-bold uppercase tracking-wider hover:opacity-80">
            ← Back to Case Studies
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const countryCaseStudies = getCaseStudiesForCountry(countryCode);
  const currentIndex = countryCaseStudies.findIndex(c => c.slug === slug);
  const prevStudy = currentIndex > 0 ? countryCaseStudies[currentIndex - 1] : null;
  const nextStudy = currentIndex < countryCaseStudies.length - 1 ? countryCaseStudies[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden py-28 md:py-36 bg-[#060918]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060918] via-[#0a1628] to-[#060918]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-google-green rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-google-blue rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Link to={localePath("/case-studies")} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/50 hover:text-white/80 transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" /> Back to Case Studies
            </Link>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-google-blue">{study.industry}</span>
              <span className="text-white/20">•</span>
              <span className="text-xs text-white/40">{study.location}</span>
              <span className="text-white/20">•</span>
              <span className="text-xs text-white/40">{study.duration}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase text-white leading-[0.95] mb-6">
              {study.business}
            </h1>
            <p className="text-base md:text-lg text-white/60 max-w-2xl leading-relaxed">
              {study.summary}
            </p>
            {/* Quick stats bar */}
            <div className="flex flex-wrap gap-6 mt-8">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-google-green" />
                <span className="text-sm font-bold text-white">{study.startRank} → {study.endRank}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-google-yellow" />
                <span className="text-sm text-white/60">{study.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-google-red" />
                <span className="text-sm text-white/60">{study.location}</span>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 flex z-10">
          <div className="flex-1 bg-google-blue" />
          <div className="flex-1 bg-google-red" />
          <div className="flex-1 bg-google-yellow" />
          <div className="flex-1 bg-google-green" />
        </div>
      </section>

      {/* Hero Image + Results Summary */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={study.image}
                alt={study.imageAlt}
                className="w-full shadow-lg border border-border"
                loading="lazy"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-google-green mb-3">Results at a Glance</p>
              <div className="grid grid-cols-2 gap-4">
                {study.stats.map((s) => (
                  <div key={s.label} className="bg-secondary p-5 border border-border">
                    <p className={`text-2xl md:text-3xl font-black ${s.color}`}>{s.value}</p>
                    <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-google-red" />
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-google-red">The Challenge</p>
              </div>
              <h2 className="text-3xl md:text-4xl font-black uppercase text-foreground mb-6">What They Were Facing</h2>
              <p className="text-muted-foreground leading-relaxed text-base">{study.challenge}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Solution */}
      <section className="py-24 border-b border-border bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-google-blue" />
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-google-blue">Our Solution</p>
              </div>
              <h2 className="text-3xl md:text-4xl font-black uppercase text-foreground mb-6">How We Solved It</h2>
              <p className="text-muted-foreground leading-relaxed text-base">{study.solution}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Strategy Breakdown */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-google-green mb-3">Strategy Breakdown</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-foreground">Key Tactics Deployed</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {study.strategies.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-background p-8 border border-border hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-google-green shrink-0 mt-0.5" />
                  <h3 className="text-sm font-bold uppercase text-foreground">{s.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pl-8">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 border-b border-border bg-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-google-yellow mb-3">Project Timeline</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-foreground">Week by Week</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            {study.timeline.map((t, i) => (
              <motion.div
                key={t.week}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex gap-6 pb-12 last:pb-0"
              >
                {/* Timeline line */}
                <div className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full ${t.color} shrink-0 mt-1`} />
                  {i < study.timeline.length - 1 && (
                    <div className="w-px flex-1 bg-border mt-2" />
                  )}
                </div>
                {/* Content */}
                <div className="bg-background p-6 border border-border flex-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-google-blue mb-1">{t.week}</p>
                  <h3 className="text-sm font-bold uppercase text-foreground mb-2">{t.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Deep Dive */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-google-green" />
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-google-green">The Results</p>
              </div>
              <h2 className="text-3xl md:text-4xl font-black uppercase text-foreground mb-6">What We Achieved</h2>
              <p className="text-muted-foreground leading-relaxed text-base">{study.results}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ranking Progression Chart */}
      <section className="py-24 border-b border-border bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-google-blue" />
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-google-blue">Ranking Progression</p>
              </div>
              <h2 className="text-3xl md:text-4xl font-black uppercase text-foreground mb-2">Before & After</h2>
              <p className="text-muted-foreground text-sm mb-10">Google Maps ranking position over the optimization period. Lower is better.</p>
              
              <div className="bg-background border border-border p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-google-red" />
                      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Start: {study.startRank}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-google-green" />
                      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Final: {study.endRank}</span>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{study.duration}</span>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={generateRankingData(study.startRank, study.endRank, study.timeline)} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="rankGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="week" 
                      tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} 
                      axisLine={{ stroke: 'hsl(var(--border))' }}
                      tickLine={false}
                    />
                    <YAxis 
                      reversed 
                      domain={[1, 'dataMax']}
                      tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                      axisLine={{ stroke: 'hsl(var(--border))' }}
                      tickLine={false}
                      tickFormatter={(v) => `#${v}`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        background: 'hsl(var(--background))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: 0,
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                      formatter={(value: number) => [`#${value}`, 'Ranking']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="rank" 
                      stroke="hsl(142, 71%, 45%)" 
                      strokeWidth={3}
                      fill="url(#rankGradient)" 
                      dot={{ r: 5, fill: 'hsl(142, 71%, 45%)', stroke: 'hsl(var(--background))', strokeWidth: 2 }}
                      activeDot={{ r: 7 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Calls & Traffic Growth Chart */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-google-red" />
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-google-red">Traffic Growth</p>
              </div>
              <h2 className="text-3xl md:text-4xl font-black uppercase text-foreground mb-2">Calls & Website Visits</h2>
              <p className="text-muted-foreground text-sm mb-10">Monthly calls and website visits growth throughout the optimization campaign.</p>

              <div className="bg-secondary border border-border p-6 md:p-8">
                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-google-blue" />
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Calls</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-google-yellow" />
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Website Visits</span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={generateTrafficData(study.timeline)} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="week"
                      tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                      axisLine={{ stroke: 'hsl(var(--border))' }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                      axisLine={{ stroke: 'hsl(var(--border))' }}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        background: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: 0,
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    />
                    <Bar dataKey="calls" name="Calls" fill="hsl(217, 91%, 60%)" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="visits" name="Website Visits" fill="hsl(48, 96%, 53%)" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Client Quote */}
      <section className="py-24 border-b border-border bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border-l-4 border-google-blue pl-8 md:pl-12"
            >
              <p className="text-xl md:text-2xl font-medium leading-relaxed text-foreground mb-6">
                "{study.testimonialQuote}"
              </p>
              <div className="flex items-center gap-4">
                <img src={study.ownerImage} alt={study.testimonialAuthor} className="w-14 h-14 rounded-full object-cover border-2 border-border" />
                <div>
                  <p className="font-bold text-foreground uppercase text-sm">{study.testimonialAuthor}</p>
                  <p className="text-xs text-muted-foreground">{study.testimonialRole}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            {prevStudy ? (
              <Link
                to={localePath(`/case-studies/${prevStudy.slug}`)}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-google-blue transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> {prevStudy.business}
              </Link>
            ) : <div />}
            {nextStudy ? (
              <Link
                to={localePath(`/case-studies/${nextStudy.slug}`)}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-google-blue transition-colors"
              >
                {nextStudy.business} <ArrowRight className="w-4 h-4" />
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-blue-green text-primary-foreground py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-4">Want Results Like These in {country.name}?</h2>
            <p className="text-primary-foreground/60 mb-8 max-w-lg mx-auto">
              Get a free consultation and see how we can transform your Google Maps presence in {country.name}.
            </p>
            <Link
              to={localePath("/pricing")}
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

export default CaseStudyDetail;
