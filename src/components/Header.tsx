import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut, LayoutDashboard, ShoppingCart, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/contexts/CartContext";
import { useCountry } from "@/contexts/CountryContext";
import { supabase } from "@/integrations/supabase/client";
import CountrySelector from "@/components/CountrySelector";
import CountryBanner from "@/components/CountryBanner";
import GoogleLogo from "@/components/GoogleLogo";

const navLinks = [
  { label: "Services", path: "/services" },
  { label: "Pricing", path: "/pricing" },
  { label: "Testimonials", path: "/testimonials" },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { itemCount } = useCart();
  const { localePath } = useCountry();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let mounted = true;

    const loadAdminRole = async () => {
      if (!user) {
        if (mounted) setIsAdmin(false);
        return;
      }

      const { data } = await supabase.rpc("has_role", { _user_id: user.id, _role: "admin" });
      if (mounted) setIsAdmin(Boolean(data));
    };

    loadAdminRole();

    return () => {
      mounted = false;
    };
  }, [user]);

  return (
    <>
      <CountryBanner />
      <header className={`sticky top-0 z-50 transition-all duration-300 border-b border-border shadow-lg shadow-black/5 backdrop-blur-xl`} style={{ background: 'linear-gradient(90deg, hsl(217 90% 61% / 0.3), hsl(9 81% 56% / 0.25), hsl(43 96% 50% / 0.25), hsl(142 53% 43% / 0.3)), hsl(0 0% 100% / 0.6)' }}>
      <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg, #4285F4, #EA4335, #FBBC04, #34A853)' }} />
      <div className="container mx-auto px-6 flex items-center justify-between h-16">
        <Link to={localePath("/")} className="text-xl">
          <GoogleLogo className="text-xl" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((l) => {
            const fullPath = localePath(l.path);
            return (
              <Link
                key={l.path}
                to={fullPath}
                className={`text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-200 ${
                  location.pathname === fullPath
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <CountrySelector />
          <Link
            to={localePath("/checkout")}
            className="relative inline-flex items-center justify-center w-10 h-10 text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <ShoppingCart className="w-4 h-4" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-google-red text-white text-[10px] font-bold leading-none px-1">
                {itemCount}
              </span>
            )}
          </Link>
          {user ? (
            <>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold uppercase tracking-wider border border-border text-foreground hover:bg-foreground/5 transition-colors duration-200"
                >
                  <Shield className="w-3.5 h-3.5" />
                  Admin
                </Link>
              )}
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
        <div className="flex items-center gap-1 lg:hidden">
          <CountrySelector />
          <Link to={localePath("/checkout")} className="relative inline-flex items-center justify-center w-9 h-9 text-muted-foreground hover:text-foreground">
            <ShoppingCart className="w-4 h-4" />
            {itemCount > 0 && (
              <span className="absolute top-0.5 right-0.5 min-w-[16px] h-[16px] flex items-center justify-center rounded-full bg-google-red text-white text-[9px] font-bold leading-none px-0.5">
                {itemCount}
              </span>
            )}
          </Link>
          <button onClick={() => setOpen(!open)} className="inline-flex items-center justify-center w-9 h-9 text-foreground">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((l) => (
              <Link
                key={l.path}
                to={localePath(l.path)}
                onClick={() => setOpen(false)}
                className="text-sm font-bold uppercase tracking-wider text-foreground"
              >
                {l.label}
              </Link>
            ))}
            {user ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setOpen(false)}
                    className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2"
                  >
                    <Shield className="w-4 h-4" />
                    Admin Panel
                  </Link>
                )}
                <Link
                  to="/dashboard"
                  onClick={() => setOpen(false)}
                  className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <button
                  onClick={() => { signOut(); setOpen(false); }}
                  className="mt-2 px-6 py-3 text-center text-xs font-bold uppercase tracking-wider border border-border text-foreground"
                >
                  Sign Out
                </button>
              </>
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
    </>
  );
};

export default Header;
