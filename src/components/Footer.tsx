import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <h3 className="text-lg font-black uppercase tracking-tight mb-4">GB Optimizers</h3>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
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
                  <Link to={l.path} className="text-primary-foreground/60 hover:text-primary-foreground transition-colors duration-200">
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
                  <Link to="/pricing" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors duration-200">
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase text-xs tracking-[0.15em] mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors duration-200">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 text-center">
          <p className="text-xs text-primary-foreground/40 uppercase tracking-wider">© 2026 GB Optimizers. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
