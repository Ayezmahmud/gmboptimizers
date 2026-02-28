import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { countries, DEFAULT_COUNTRY, stripCountryPrefix } from "@/data/countries";

/**
 * On first visit to `/au` (default), detect user's timezone/locale
 * and redirect to the matching country version.
 * Only triggers once per session via sessionStorage flag.
 */
const CountryAutoDetect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only auto-detect on default country root
    if (sessionStorage.getItem("country_detected")) return;
    
    const currentCountry = location.pathname.split("/")[1];
    // Only redirect if user landed on the default country
    if (currentCountry && currentCountry !== DEFAULT_COUNTRY) {
      sessionStorage.setItem("country_detected", "1");
      return;
    }

    sessionStorage.setItem("country_detected", "1");

    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const userLocale = navigator.language;

    // Try timezone match first
    for (const c of countries) {
      if (c.code === DEFAULT_COUNTRY) continue;
      if (c.timezones.some((tz) => userTimezone === tz)) {
        const pathWithoutCountry = stripCountryPrefix(location.pathname);
        navigate(`/${c.code}${pathWithoutCountry}`, { replace: true });
        return;
      }
    }

    // Try locale match
    for (const c of countries) {
      if (c.code === DEFAULT_COUNTRY) continue;
      if (c.locales.some((loc) => userLocale.startsWith(loc.split("-")[0]) && userLocale.includes(loc.split("-")[1] || ""))) {
        const pathWithoutCountry = stripCountryPrefix(location.pathname);
        navigate(`/${c.code}${pathWithoutCountry}`, { replace: true });
        return;
      }
    }
  }, []);

  return null;
};

export default CountryAutoDetect;
