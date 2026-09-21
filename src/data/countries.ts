export interface CountryConfig {
  code: string;
  name: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  priceMultiplier: number;
  phonePrefix: string;
  /** Country-specific contact details */
  phone: string;
  email: string;
  address: string;
  city: string;
  businessHours: string;
  timezone: string;
  /** Timezones used for auto-detection */
  timezones: string[];
  /** Locale codes for auto-detection */
  locales: string[];
  /** SEO */
  seoTitle: string;
  seoDescription: string;
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
    phone: "+61 3 9000 0000",
    email: "hello@gboptimizers.com.au",
    address: "Level 12, 180 Flinders St",
    city: "Melbourne, VIC 3000, Australia",
    businessHours: "Mon–Fri: 9:00 AM – 6:00 PM AEST",
    timezone: "AEST",
    timezones: ["Australia/Sydney", "Australia/Melbourne", "Australia/Brisbane", "Australia/Perth", "Australia/Adelaide", "Australia/Hobart", "Australia/Darwin"],
    locales: ["en-AU"],
    seoTitle: "GMB Optimizers Australia – #1 Google Maps SEO Agency",
    seoDescription: "Dominate Google Maps in Australia. Proven local SEO strategies trusted by 500+ businesses. Get your free consultation today.",
  },
  {
    code: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    currency: "GBP",
    currencySymbol: "£",
    priceMultiplier: 0.52,
    phonePrefix: "+44",
    phone: "+44 20 7946 0958",
    email: "hello@gboptimizers.co.uk",
    address: "71–75 Shelton St, Covent Garden",
    city: "London, WC2H 9JQ, United Kingdom",
    businessHours: "Mon–Fri: 9:00 AM – 6:00 PM GMT",
    timezone: "GMT",
    timezones: ["Europe/London"],
    locales: ["en-GB"],
    seoTitle: "GMB Optimizers UK – #1 Google Maps SEO Agency",
    seoDescription: "Dominate Google Maps in the UK. Proven local SEO strategies trusted by 500+ businesses. Get your free consultation today.",
  },
  {
    code: "us",
    name: "United States",
    flag: "🇺🇸",
    currency: "USD",
    currencySymbol: "$",
    priceMultiplier: 0.65,
    phonePrefix: "+1",
    phone: "+1 (212) 555-0189",
    email: "hello@gboptimizers.com",
    address: "350 Fifth Avenue, Suite 4810",
    city: "New York, NY 10118, United States",
    businessHours: "Mon–Fri: 9:00 AM – 6:00 PM EST",
    timezone: "EST",
    timezones: ["America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles", "America/Phoenix", "America/Anchorage", "Pacific/Honolulu"],
    locales: ["en-US"],
    seoTitle: "GMB Optimizers USA – #1 Google Maps SEO Agency",
    seoDescription: "Dominate Google Maps in the United States. Proven local SEO strategies trusted by 500+ businesses. Get your free consultation today.",
  },
];

export const DEFAULT_COUNTRY = "au";

export const getCountryByCode = (code: string): CountryConfig => {
  return countries.find((c) => c.code === code) || countries[0];
};

export const isValidCountry = (code: string): boolean => {
  return countries.some((c) => c.code === code);
};

export const stripCountryPrefix = (pathname: string): string => {
  const [, maybeCountry, ...rest] = pathname.split("/");

  if (maybeCountry && isValidCountry(maybeCountry.toLowerCase())) {
    const remainingPath = rest.join("/");
    return remainingPath ? `/${remainingPath}` : "/";
  }

  return pathname || "/";
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
