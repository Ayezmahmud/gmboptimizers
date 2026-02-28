import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, Cookie } from "lucide-react";
import { useCountry } from "@/contexts/CountryContext";

interface CookieConfig {
  title: string;
  message: string;
  regulation: string;
  showRejectAll: boolean;
  showPreferences: boolean;
}

const getCookieConfig = (countryCode: string): CookieConfig => {
  switch (countryCode) {
    case "uk":
      return {
        title: "Cookie Consent — GDPR",
        message:
          "We use cookies to enhance your experience and analyse website traffic. Under the UK GDPR & PECR, we require your consent before setting non-essential cookies.",
        regulation: "UK GDPR & PECR",
        showRejectAll: true,
        showPreferences: true,
      };
    case "ae":
    case "qa":
    case "om":
      return {
        title: "Cookie Notice",
        message:
          "We use cookies to improve your experience. By continuing to use our site, you agree to our use of cookies in accordance with our Privacy Policy.",
        regulation: "Data Protection",
        showRejectAll: false,
        showPreferences: false,
      };
    case "ca":
      return {
        title: "Cookie Consent — PIPEDA",
        message:
          "We use cookies to enhance your browsing experience and analyse site traffic. Under Canada's PIPEDA, we need your consent for non-essential cookies.",
        regulation: "PIPEDA",
        showRejectAll: true,
        showPreferences: true,
      };
    case "us":
      return {
        title: "Cookie Notice — CCPA",
        message:
          "We use cookies and similar technologies. California residents can opt out of the sale of personal information under the CCPA.",
        regulation: "CCPA",
        showRejectAll: true,
        showPreferences: false,
      };
    case "au":
    default:
      return {
        title: "Cookie Notice",
        message:
          "We use cookies to improve your experience and analyse website traffic in accordance with the Australian Privacy Act. By continuing, you consent to our use of cookies.",
        regulation: "Privacy Act 1988",
        showRejectAll: true,
        showPreferences: false,
      };
  }
};

const CookieConsent = () => {
  const { countryCode } = useCountry();
  const [visible, setVisible] = useState(false);
  const config = getCookieConfig(countryCode);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookie_consent", "rejected");
    setVisible(false);
  };

  const handleClose = () => {
    localStorage.setItem("cookie_consent", "dismissed");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6"
        >
          <div className="container mx-auto max-w-4xl">
            <div className="relative bg-background border border-border shadow-2xl p-6 md:p-8">
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-1 flex">
                <div className="flex-1 bg-google-blue" />
                <div className="flex-1 bg-google-red" />
                <div className="flex-1 bg-google-yellow" />
                <div className="flex-1 bg-google-green" />
              </div>

              <button
                onClick={handleClose}
                className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-start gap-4">
                <div className="hidden sm:flex shrink-0 w-10 h-10 items-center justify-center bg-google-blue/10 rounded-sm">
                  <Cookie className="w-5 h-5 text-google-blue" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                      {config.title}
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-google-green/10 text-google-green border border-google-green/20">
                      <Shield className="w-2.5 h-2.5" />
                      {config.regulation}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {config.message}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={handleAccept}
                      className="px-5 py-2 text-xs font-bold uppercase tracking-wider bg-google-blue text-white hover:opacity-90 transition-opacity"
                    >
                      Accept All
                    </button>

                    {config.showRejectAll && (
                      <button
                        onClick={handleReject}
                        className="px-5 py-2 text-xs font-bold uppercase tracking-wider border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                      >
                        Reject Non-Essential
                      </button>
                    )}

                    {config.showPreferences && (
                      <button
                        onClick={handleAccept}
                        className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Manage Preferences
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
