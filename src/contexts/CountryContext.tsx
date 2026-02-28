import { createContext, useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import { CountryConfig, getCountryByCode, DEFAULT_COUNTRY, localizePrice, formatPrice } from "@/data/countries";

interface CountryContextValue {
  country: CountryConfig;
  countryCode: string;
  /** Prefix a path with the current country code, e.g. "/pricing" → "/au/pricing" */
  localePath: (path: string) => string;
  /** Convert an AUD price to local currency */
  toLocalPrice: (audPrice: number) => number;
  /** Format a localized price with currency symbol */
  formatLocalPrice: (audPrice: number) => string;
  /** Currency label like "AUD/mo" */
  currencyLabel: string;
}

const CountryContext = createContext<CountryContextValue | null>(null);

export const CountryProvider = ({ children }: { children: React.ReactNode }) => {
  const { country: countryParam } = useParams<{ country: string }>();
  const countryCode = countryParam || DEFAULT_COUNTRY;
  const country = useMemo(() => getCountryByCode(countryCode), [countryCode]);

  const value = useMemo<CountryContextValue>(() => ({
    country,
    countryCode,
    localePath: (path: string) => `/${countryCode}${path}`,
    toLocalPrice: (audPrice: number) => localizePrice(audPrice, country),
    formatLocalPrice: (audPrice: number) => formatPrice(localizePrice(audPrice, country), country),
    currencyLabel: `${country.currency}/mo`,
  }), [country, countryCode]);

  return (
    <CountryContext.Provider value={value}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = (): CountryContextValue => {
  const ctx = useContext(CountryContext);
  if (!ctx) {
    // Fallback for routes without country param (e.g. /sign-in)
    const country = getCountryByCode(DEFAULT_COUNTRY);
    return {
      country,
      countryCode: DEFAULT_COUNTRY,
      localePath: (path: string) => `/${DEFAULT_COUNTRY}${path}`,
      toLocalPrice: (audPrice: number) => localizePrice(audPrice, country),
      formatLocalPrice: (audPrice: number) => formatPrice(localizePrice(audPrice, country), country),
      currencyLabel: `${country.currency}/mo`,
    };
  }
  return ctx;
};
