import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCountry } from "@/contexts/CountryContext";
import { countries, stripCountryPrefix } from "@/data/countries";

interface SEOHeadProps {
  /** Override the page-specific part of the title, e.g. "Pricing" */
  pageTitle?: string;
  /** Override the page-specific description */
  pageDescription?: string;
}

const SEOHead = ({ pageTitle, pageDescription }: SEOHeadProps) => {
  const { country, countryCode } = useCountry();
  const location = useLocation();

  useEffect(() => {
    // Title
    const title = pageTitle
      ? `${pageTitle} | GB Optimizers ${country.name}`
      : country.seoTitle;
    document.title = title;

    // Meta description
    const desc = pageDescription || country.seoDescription;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", desc);

    // Remove old hreflang tags
    document.querySelectorAll('link[hreflang]').forEach((el) => el.remove());

    // Add hreflang tags for all countries
    const pathWithoutCountry = stripCountryPrefix(location.pathname);
    const baseUrl = window.location.origin;

    countries.forEach((c) => {
      const link = document.createElement("link");
      link.setAttribute("rel", "alternate");
      link.setAttribute("hreflang", c.locales[0] || `en-${c.code.toUpperCase()}`);
      link.setAttribute("href", `${baseUrl}/${c.code}${pathWithoutCountry}`);
      document.head.appendChild(link);
    });

    // x-default
    const xDefault = document.createElement("link");
    xDefault.setAttribute("rel", "alternate");
    xDefault.setAttribute("hreflang", "x-default");
    xDefault.setAttribute("href", `${baseUrl}/au${pathWithoutCountry}`);
    document.head.appendChild(xDefault);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${baseUrl}/${countryCode}${pathWithoutCountry}`);

    return () => {
      document.querySelectorAll('link[hreflang]').forEach((el) => el.remove());
    };
  }, [country, countryCode, location.pathname, pageTitle, pageDescription]);

  return null;
};

export default SEOHead;
