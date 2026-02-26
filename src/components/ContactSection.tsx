import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-32 relative">
      {/* Accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-google-blue via-google-red to-google-green" />

      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            Start <span className="text-gradient-blue-green">Ranking</span> Today
          </h2>
          <p className="text-muted-foreground text-lg">Get in touch and let us grow your local presence.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          {submitted ? (
            <div className="text-center p-12 rounded-2xl bg-card border border-google-green/30">
              <p className="text-2xl font-display font-bold text-google-green mb-2">Thank You!</p>
              <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <input
                  required
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-5 py-4 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-google-blue/50 transition-colors duration-300"
                />
                <input
                  required
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-5 py-4 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-google-blue/50 transition-colors duration-300"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="Business Name"
                  className="w-full px-5 py-4 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-google-blue/50 transition-colors duration-300"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-5 py-4 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-google-blue/50 transition-colors duration-300"
                />
              </div>
              <select
                className="w-full px-5 py-4 rounded-xl bg-card border border-border text-muted-foreground focus:outline-none focus:border-google-blue/50 transition-colors duration-300 appearance-none"
              >
                <option value="">Select Package</option>
                <option>Basic – $99.99 AUD</option>
                <option>Premium – $149.99 AUD</option>
                <option>Advance – $199.99 AUD</option>
                <option>Enterprise – $299.99 AUD</option>
              </select>
              <textarea
                rows={4}
                placeholder="Your Message"
                className="w-full px-5 py-4 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-google-blue/50 transition-colors duration-300 resize-none"
              />
              <button
                type="submit"
                className="w-full py-4 rounded-full font-semibold bg-primary text-primary-foreground glow-blue hover:opacity-90 transition-all duration-300 text-lg"
              >
                Start Ranking Today
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
