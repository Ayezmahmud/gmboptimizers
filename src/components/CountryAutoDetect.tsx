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
    // Always default to Australia first. Auto-detection disabled so every
    // visitor sees the AU experience before choosing UK or US manually.
    return;
  }, []);

  return null;
};

export default CountryAutoDetect;
