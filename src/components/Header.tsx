import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

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
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 border-b border-border shadow-lg shadow-black/5 backdrop-blur-xl`} style={{ background: 'linear-gradient(90deg, hsl(217 90% 61% / 0.3), hsl(9 81% 56% / 0.25), hsl(43 96% 50% / 0.25), hsl(142 53% 43% / 0.3)), hsl(0 0% 100% / 0.6)' }}>
      <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg, #4285F4, #EA4335, #FBBC04, #34A853)' }} />
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

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold uppercase tracking-wider border border-border text-foreground hover:bg-foreground/5 transition-colors duration-200"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                Dashboard
              </Link>
              <button
                onClick={signOut}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <>
              <Link
                to="/sign-in"
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider border border-border text-foreground hover:bg-foreground/5 transition-colors duration-200"
              >
                Sign In
              </Link>
              <Link
                to="/sign-up"
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-google-blue text-white hover:opacity-90 transition-opacity"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

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
            {user ? (
              <button
                onClick={() => { signOut(); setOpen(false); }}
                className="mt-2 px-6 py-3 text-center text-xs font-bold uppercase tracking-wider border border-border text-foreground"
              >
                Sign Out
              </button>
            ) : (
              <div className="flex flex-col gap-2 mt-2">
                <Link
                  to="/sign-in"
                  onClick={() => setOpen(false)}
                  className="px-6 py-3 text-center text-xs font-bold uppercase tracking-wider border border-border text-foreground"
                >
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  onClick={() => setOpen(false)}
                  className="px-6 py-3 text-center text-xs font-bold uppercase tracking-wider bg-google-blue text-white"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
