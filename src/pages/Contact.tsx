import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@gboptimizers.com", color: "text-google-blue" },
  { icon: Phone, label: "Phone", value: "+61 3 9000 0000", color: "text-google-red" },
  { icon: MapPin, label: "Location", value: "Melbourne, Australia", color: "text-google-green" },
  { icon: Clock, label: "Response Time", value: "Within 24 hours", color: "text-google-yellow" },
];

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="relative overflow-hidden py-28 md:py-36 bg-[#060918]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060918] via-[#0a1628] to-[#060918]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-google-blue rounded-full blur-[120px]" />
          <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-google-yellow rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-google-blue" />
              <div className="w-2 h-2 rounded-full bg-google-red" />
              <div className="w-2 h-2 rounded-full bg-google-yellow" />
              <div className="w-2 h-2 rounded-full bg-google-green" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 ml-2">Get In Touch</p>
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase text-white leading-[0.95] mb-6">
              Start Ranking
              <br />
              Today
            </h1>
            <p className="text-base md:text-lg text-white/60 max-w-lg leading-relaxed">
              Ready to dominate Google Maps? Get your free consultation and see how we can grow your business.
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
          <div className="grid md:grid-cols-2 gap-16">
            {/* Left: Image + Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="/images/contact-hero.png"
                alt="Business partnership handshake"
                className="w-full shadow-lg border border-border mb-10"
                loading="lazy"
              />
              <h2 className="text-2xl font-black uppercase text-foreground mb-6">Let's Talk Growth</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Ready to dominate Google Maps in your area? Fill out the form and our team will get back to you within 24 hours with a custom strategy proposal.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {contactInfo.map((c) => (
                  <div key={c.label} className="bg-secondary p-4 border border-border">
                    <c.icon className={`w-5 h-5 ${c.color} mb-2`} strokeWidth={1.5} />
                    <p className="text-xs font-bold uppercase tracking-wider text-foreground mb-1">{c.label}</p>
                    <p className="text-sm text-muted-foreground">{c.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {submitted ? (
                <div className="stripe-accent pl-8 py-8">
                  <h2 className="text-3xl font-black uppercase mb-3 text-foreground">Thank You</h2>
                  <p className="text-muted-foreground">We'll get back to you within 24 hours with a custom proposal.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">Name *</label>
                      <input
                        required
                        type="text"
                        className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-google-blue transition-colors"
                        placeholder="Your Name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">Email *</label>
                      <input
                        required
                        type="email"
                        className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-google-blue transition-colors"
                        placeholder="Email Address"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">Business Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-google-blue transition-colors"
                        placeholder="Business Name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">Phone</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-google-blue transition-colors"
                        placeholder="Phone Number"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">Package</label>
                    <select className="w-full px-4 py-3 bg-background border border-border text-muted-foreground focus:outline-none focus:border-google-blue transition-colors appearance-none">
                      <option value="">Select Package</option>
                      <option>Basic – $99.99 AUD</option>
                      <option>Premium – $149.99 AUD</option>
                      <option>Advance – $199.99 AUD</option>
                      <option>Enterprise – $299.99 AUD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">Message</label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-google-blue transition-colors resize-none"
                      placeholder="Tell us about your business and goals..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-10 py-4 text-xs font-bold uppercase tracking-wider bg-google-blue text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    Start Ranking Today
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
