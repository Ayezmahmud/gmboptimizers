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
    seoTitle: "GB Optimizers Australia – #1 Google Maps SEO Agency",
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
    seoTitle: "GB Optimizers UK – #1 Google Maps SEO Agency",
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
    seoTitle: "GB Optimizers USA – #1 Google Maps SEO Agency",
    seoDescription: "Dominate Google Maps in the United States. Proven local SEO strategies trusted by 500+ businesses. Get your free consultation today.",
  },
  {
    code: "ca",
    name: "Canada",
    flag: "🇨🇦",
    currency: "CAD",
    currencySymbol: "$",
    priceMultiplier: 0.89,
    phonePrefix: "+1",
    phone: "+1 (416) 555-0147",
    email: "hello@gboptimizers.ca",
    address: "100 King Street West, Suite 5700",
    city: "Toronto, ON M5X 1C7, Canada",
    businessHours: "Mon–Fri: 9:00 AM – 6:00 PM EST",
    timezone: "EST",
    timezones: ["America/Toronto", "America/Vancouver", "America/Edmonton", "America/Winnipeg", "America/Halifax"],
    locales: ["en-CA"],
    seoTitle: "GB Optimizers Canada – #1 Google Maps SEO Agency",
    seoDescription: "Dominate Google Maps in Canada. Proven local SEO strategies trusted by 500+ businesses. Get your free consultation today.",
  },
  {
    code: "ae",
    name: "UAE (Dubai)",
    flag: "🇦🇪",
    currency: "AED",
    currencySymbol: "د.إ",
    priceMultiplier: 2.39,
    phonePrefix: "+971",
    phone: "+971 4 123 4567",
    email: "hello@gboptimizers.ae",
    address: "Dubai Marina, Marina Plaza, Level 25",
    city: "Dubai, United Arab Emirates",
    businessHours: "Sun–Thu: 9:00 AM – 6:00 PM GST",
    timezone: "GST",
    timezones: ["Asia/Dubai"],
    locales: ["en-AE", "ar-AE"],
    seoTitle: "GB Optimizers Dubai – #1 Google Maps SEO Agency",
    seoDescription: "Dominate Google Maps in the UAE. Proven local SEO strategies trusted by 500+ businesses. Get your free consultation today.",
  },
  {
    code: "qa",
    name: "Qatar",
    flag: "🇶🇦",
    currency: "QAR",
    currencySymbol: "ر.ق",
    priceMultiplier: 2.37,
    phonePrefix: "+974",
    phone: "+974 4412 3456",
    email: "hello@gboptimizers.qa",
    address: "West Bay, Al Dafna Tower, Floor 18",
    city: "Doha, Qatar",
    businessHours: "Sun–Thu: 8:00 AM – 5:00 PM AST",
    timezone: "AST",
    timezones: ["Asia/Qatar"],
    locales: ["en-QA", "ar-QA"],
    seoTitle: "GB Optimizers Qatar – #1 Google Maps SEO Agency",
    seoDescription: "Dominate Google Maps in Qatar. Proven local SEO strategies trusted by 500+ businesses. Get your free consultation today.",
  },
  {
    code: "om",
    name: "Oman",
    flag: "🇴🇲",
    currency: "OMR",
    currencySymbol: "ر.ع.",
    priceMultiplier: 0.25,
    phonePrefix: "+968",
    phone: "+968 2456 7890",
    email: "hello@gboptimizers.om",
    address: "CBD Area, Muscat Grand Mall Tower, Level 10",
    city: "Muscat, Oman",
    businessHours: "Sun–Thu: 8:00 AM – 5:00 PM GST",
    timezone: "GST",
    timezones: ["Asia/Muscat"],
    locales: ["en-OM", "ar-OM"],
    seoTitle: "GB Optimizers Oman – #1 Google Maps SEO Agency",
    seoDescription: "Dominate Google Maps in Oman. Proven local SEO strategies trusted by 500+ businesses. Get your free consultation today.",
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
