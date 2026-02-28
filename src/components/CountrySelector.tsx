import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { countries } from "@/data/countries";
import { useCountry } from "@/contexts/CountryContext";

const CountrySelector = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { country, countryCode } = useCountry();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const switchCountry = (newCode: string) => {
    // Replace current country prefix in path
    const pathWithoutCountry = location.pathname.replace(/^\/[a-z]{2}/, "") || "/";
    navigate(`/${newCode}${pathWithoutCountry}`);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-wider border border-border text-foreground hover:bg-foreground/5 transition-colors duration-200 rounded-sm"
      >
        <span className="text-base leading-none">{country.flag}</span>
        <span className="hidden sm:inline">{country.currency}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 bg-background border border-border shadow-xl z-50 min-w-[180px] py-1">
          {countries.map((c) => (
            <button
              key={c.code}
              onClick={() => switchCountry(c.code)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-foreground/5 ${
                c.code === countryCode ? "bg-foreground/5 font-bold" : "text-muted-foreground"
              }`}
            >
              <span className="text-lg leading-none">{c.flag}</span>
              <span className="flex-1">{c.name}</span>
              <span className="text-xs text-muted-foreground">{c.currency}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountrySelector;
