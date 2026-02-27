import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroBackground from "@/components/HeroBackground";
import ScrollRevealSection from "@/components/ScrollRevealSection";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
        <HeroBackground />
        <div className="relative z-10 text-center px-6 py-20">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-gradient-google mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Last updated: February 27, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <ScrollRevealSection>
            <div className="prose prose-invert max-w-none space-y-10">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We collect information you provide directly to us, such as when you fill out a contact form, request a quote, or communicate with us. This may include your name, email address, phone number, business name, website URL, and any other information you choose to provide.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  We also automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, and information about how you interact with our website.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. How We Use Your Information</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>To provide, maintain, and improve our Google Business Profile optimization services</li>
                  <li>To respond to your inquiries and fulfill your requests</li>
                  <li>To send you marketing communications (with your consent)</li>
                  <li>To monitor and analyze trends, usage, and activities on our website</li>
                  <li>To detect, investigate, and prevent fraudulent or unauthorized activities</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Information Sharing</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business, so long as those parties agree to keep this information confidential.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors are coming from. You can control cookies through your browser settings.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Third-Party Links</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our website may contain links to third-party websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You have the right to access, correct, or delete your personal data. You may also object to or restrict certain processing of your data. To exercise these rights, please contact us using the information provided below.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">8. Changes to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">9. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at{" "}
                  <a href="mailto:info@gboptimizers.com" className="text-[hsl(var(--google-blue))] hover:underline">
                    info@gboptimizers.com
                  </a>
                </p>
              </div>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
