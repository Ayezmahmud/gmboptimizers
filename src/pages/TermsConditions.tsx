import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroBackground from "@/components/HeroBackground";
import ScrollRevealSection from "@/components/ScrollRevealSection";

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
        <HeroBackground />
        <div className="relative z-10 text-center px-6 py-20">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-gradient-google mb-4">
            Terms & Conditions
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
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Agreement to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing or using GB Optimizers' website and services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Services</h2>
                <p className="text-muted-foreground leading-relaxed">
                  GB Optimizers provides Google Business Profile optimization, local SEO, Google Maps ranking, citation building, review management, and related digital marketing services. The specific services provided will be outlined in your service agreement or package selection.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Payment Terms</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>All fees are due as specified in your service agreement</li>
                  <li>Payments are non-refundable unless otherwise stated in your package terms</li>
                  <li>We reserve the right to modify pricing with 30 days' written notice</li>
                  <li>Late payments may result in suspension of services</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Client Responsibilities</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You agree to provide accurate and complete information necessary for us to perform our services. You are responsible for maintaining the security of any account credentials shared with us and for ensuring you have the authority to grant us access to your Google Business Profile.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Results Disclaimer</h2>
                <p className="text-muted-foreground leading-relaxed">
                  While we strive to deliver measurable improvements in your Google Maps rankings and local visibility, we cannot guarantee specific ranking positions or results. Search engine algorithms are controlled by Google and are subject to change without notice. Past results do not guarantee future performance.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All content, designs, strategies, and materials created by GB Optimizers remain our intellectual property unless explicitly transferred in writing. You retain ownership of your business information, logos, and pre-existing content provided to us.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  GB Optimizers shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from or related to your use of our services. Our total liability shall not exceed the amount paid by you for the services in the 12 months preceding the claim.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">8. Termination</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Either party may terminate services with 30 days' written notice. Upon termination, you remain responsible for any outstanding fees. We will provide reasonable transition assistance to ensure continuity of your Google Business Profile.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">9. Confidentiality</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Both parties agree to keep confidential any proprietary information shared during the course of the business relationship. This includes business strategies, analytics data, login credentials, and financial information.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">10. Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms and Conditions shall be governed by and construed in accordance with applicable laws. Any disputes arising from these terms shall be resolved through good-faith negotiation before pursuing legal remedies.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">11. Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting to this page. Continued use of our services constitutes acceptance of the modified terms.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">12. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about these Terms and Conditions, please contact us at{" "}
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

export default TermsConditions;
