import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Pricing", path: "/pricing" },
  { label: "Case Studies", path: "/case-studies" },
  { label: "Testimonials", path: "/testimonials" },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 border-b border-border shadow-lg shadow-black/5 backdrop-blur-xl`} style={{ background: 'linear-gradient(90deg, hsl(217 90% 61% / 0.08), hsl(9 81% 56% / 0.06), hsl(43 96% 50% / 0.06), hsl(142 53% 43% / 0.08), hsl(217 90% 61% / 0.06)), hsl(0 0% 100% / 0.92)' }}>
      <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, #4285F4, #EA4335, #FBBC04, #34A853)', opacity: 0.7 }} />
      <div className="container mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="text-xl font-black uppercase tracking-tight text-gradient-google">
          GB Optimizers
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-200 ${
                location.pathname === l.path
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/contact"
          className="hidden md:inline-flex px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-primary text-primary-foreground hover:bg-foreground/90 transition-colors duration-200"
        >
          Get Started
        </Link>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-foreground"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                onClick={() => setOpen(false)}
                className="text-sm font-bold uppercase tracking-wider text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 px-6 py-3 text-center text-xs font-bold uppercase tracking-wider bg-primary text-primary-foreground"
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
