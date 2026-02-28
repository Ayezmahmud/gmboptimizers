import { useCountry } from "@/contexts/CountryContext";
import { MapPin, Clock, Phone } from "lucide-react";

const CountryBanner = () => {
  const { country } = useCountry();

  return (
    <div className="bg-foreground/[0.03] border-b border-border">
      <div className="container mx-auto px-6 py-1.5 flex items-center justify-between text-[11px] text-muted-foreground overflow-x-auto gap-4">
        <div className="flex items-center gap-4 shrink-0">
          <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
            <span className="text-sm leading-none">{country.flag}</span>
            {country.name}
          </span>
          <span className="hidden sm:inline-flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {country.city}
          </span>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <span className="hidden md:inline-flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {country.businessHours}
          </span>
          <a href={`tel:${country.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-1 hover:text-foreground transition-colors">
            <Phone className="w-3 h-3" />
            {country.phone}
          </a>
        </div>
      </div>
    </div>
  );
};

export default CountryBanner;
