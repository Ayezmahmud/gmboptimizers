export interface CountryConfig {
  code: string;
  name: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  // Pricing multiplier relative to AUD base prices
  priceMultiplier: number;
  // Phone format hint
  phonePrefix: string;
}

export const countries: CountryConfig[] = [
  {
    code: "au",
    name: "Australia",
    flag: "🇦🇺",
    currency: "AUD",
    currencySymbol: "$",
    priceMultiplier: 1,
    phonePrefix: "+61",
  },
  {
    code: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    currency: "GBP",
    currencySymbol: "£",
    priceMultiplier: 0.52,
    phonePrefix: "+44",
  },
  {
    code: "us",
    name: "United States",
    flag: "🇺🇸",
    currency: "USD",
    currencySymbol: "$",
    priceMultiplier: 0.65,
    phonePrefix: "+1",
  },
  {
    code: "ca",
    name: "Canada",
    flag: "🇨🇦",
    currency: "CAD",
    currencySymbol: "$",
    priceMultiplier: 0.89,
    phonePrefix: "+1",
  },
  {
    code: "ae",
    name: "UAE (Dubai)",
    flag: "🇦🇪",
    currency: "AED",
    currencySymbol: "د.إ",
    priceMultiplier: 2.39,
    phonePrefix: "+971",
  },
  {
    code: "qa",
    name: "Qatar",
    flag: "🇶🇦",
    currency: "QAR",
    currencySymbol: "ر.ق",
    priceMultiplier: 2.37,
    phonePrefix: "+974",
  },
  {
    code: "om",
    name: "Oman",
    flag: "🇴🇲",
    currency: "OMR",
    currencySymbol: "ر.ع.",
    priceMultiplier: 0.25,
    phonePrefix: "+968",
  },
];

export const DEFAULT_COUNTRY = "au";

export const getCountryByCode = (code: string): CountryConfig => {
  return countries.find((c) => c.code === code) || countries[0];
};

export const isValidCountry = (code: string): boolean => {
  return countries.some((c) => c.code === code);
};

/**
 * Convert an AUD price to the target country's currency.
 * Rounds to 2 decimals ending in .99 for clean pricing.
 */
export const localizePrice = (audPrice: number, country: CountryConfig): number => {
  const raw = audPrice * country.priceMultiplier;
  return Math.floor(raw) + 0.99;
};

export const formatPrice = (price: number, country: CountryConfig): string => {
  return `${country.currencySymbol}${price.toFixed(2)}`;
};
