import { Link } from "react-router-dom";
import { useCountry } from "@/contexts/CountryContext";
import GoogleLogo from "@/components/GoogleLogo";
import { MapPin, Clock, Phone } from "lucide-react";

const Footer = () => {
  const { localePath } = useCountry();

  return (
    <footer className="bg-background text-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <GoogleLogo className="text-xl mb-4 inline-block" />
            <p className="text-muted-foreground text-sm leading-relaxed">
              Dominating Google Maps for businesses worldwide.
            </p>
          </div>

          <div>
            <h4 className="font-bold uppercase text-xs tracking-[0.15em] mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "About", path: "/about" },
                { label: "Services", path: "/services" },
                { label: "Pricing", path: "/pricing" },
                { label: "Case Studies", path: "/case-studies" },
                { label: "Contact", path: "/contact" },
              ].map((l) => (
                <li key={l.path}>
                  <Link to={localePath(l.path)} className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase text-xs tracking-[0.15em] mb-4">Packages</h4>
            <ul className="space-y-2 text-sm">
              {["Basic", "Premium", "Advance", "Enterprise"].map((p) => (
                <li key={p}>
                  <Link to={localePath("/pricing")} className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase text-xs tracking-[0.15em] mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to={localePath("/privacy-policy")} className="text-muted-foreground hover:text-foreground transition-colors duration-200">Privacy Policy</Link></li>
              <li><Link to={localePath("/terms-and-conditions")} className="text-muted-foreground hover:text-foreground transition-colors duration-200">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-muted-foreground uppercase tracking-wider">
            <p>© 2026 GB Optimizers. All Rights Reserved.</p>
            <p className="mt-1">Designed by Peter Smith · Developed by GB Optimizers</p>
          </div>
          <CountryInfo />
        </div>
      </div>
    </footer>
  );
};

const CountryInfo = () => {
  const { country } = useCountry();

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
      <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
        <img
          src={`https://flagcdn.com/w40/${country.code === "uk" ? "gb" : country.code}.png`}
          alt={country.name}
          className="w-4 h-3 object-cover rounded-[1px]"
        />
        {country.name}
      </span>
      <span className="inline-flex items-center gap-1">
        <MapPin className="w-3 h-3" />
        {country.city}
      </span>
      <span className="inline-flex items-center gap-1">
        <Clock className="w-3 h-3" />
        {country.businessHours}
      </span>
      <a
        href={`tel:${country.phone.replace(/\s/g, "")}`}
        className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
      >
        <Phone className="w-3 h-3" />
        {country.phone}
      </a>
    </div>
  );
};

export default Footer;
