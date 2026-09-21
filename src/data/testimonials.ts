export interface Testimonial {
  name: string;
  business: string;
  text: string;
  initials: string;
  color: string;
  industry: string;
  result: string;
  image: string;
  /** Country code(s) this testimonial is relevant to. Empty = global/all. */
  countries?: string[];
}

const colors = ["bg-google-blue", "bg-google-red", "bg-google-yellow", "bg-google-green"];

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Mitchell",
    business: "Mitchell's Bakery, Melbourne",
    text: "Before GMB Optimizers, we were invisible on Google Maps. We tried everything — DIY SEO, hiring freelancers, even paid ads. Nothing worked. Within 8 weeks of their optimization, we jumped from page 3 to the #1 spot. Our foot traffic doubled, and we had to hire two extra staff to keep up with demand. The ROI has been incredible.",
    initials: "SM",
    color: colors[0],
    industry: "Food & Beverage",
    result: "Page 3 → #1 in 8 weeks",
    image: "/images/testimonial-1.png",
    countries: ["au"],
  },
  {
    name: "Mark Tanaka",
    business: "Tanaka Auto Service, Brisbane",
    text: "As a family-owned auto shop competing against big chains, we felt hopeless. GMB Optimizers changed everything. They optimized our profile, built our citations, and within the first month our phone calls increased by 300%. Now we're booked solid every week. Their monthly reports are detailed and transparent — we always know exactly where we stand.",
    initials: "MT",
    color: colors[1],
    industry: "Automotive",
    result: "+300% calls in 30 days",
    image: "/images/testimonial-2.png",
    countries: ["au"],
  },
  {
    name: "Lisa Rodriguez",
    business: "Rodriguez Legal, Brisbane",
    text: "The legal industry is cutthroat when it comes to local SEO. We were spending $5,000/month on Google Ads with mediocre results. GMB Optimizers shifted our strategy to organic Google Maps ranking. We now get more qualified leads from Maps than we ever did from ads, at a fraction of the cost. Game changer.",
    initials: "LR",
    color: colors[2],
    industry: "Legal",
    result: "Replaced $5K/mo ad spend",
    image: "/images/testimonial-3.png",
  },
  {
    name: "David Park",
    business: "Park Dental Clinic, Perth",
    text: "We opened a new dental clinic and had zero online presence. GMB Optimizers built our Google Business Profile from scratch, set up our review generation system, and within 3 months we were ranking #2 for 'dentist near me' in our area. New patient bookings went through the roof. Can't recommend them enough.",
    initials: "DP",
    color: colors[3],
    industry: "Healthcare",
    result: "#2 ranking in 3 months",
    image: "/images/testimonial-4.png",
  },
  {
    name: "Amanda Foster",
    business: "Foster's Flower Studio, Adelaide",
    text: "I run a small flower shop and never thought SEO mattered for my business. GMB Optimizers showed me how many customers were searching for florists on Google Maps. After optimization, my weekend orders tripled. The review management system they set up helped me go from 12 reviews to over 80 — all 5 stars. My little shop is now the top-rated florist in Adelaide.",
    initials: "AF",
    color: colors[0],
    industry: "Retail",
    result: "12 → 80+ five-star reviews",
    image: "/images/testimonial-5.png",
  },
  {
    name: "Michael Torres",
    business: "Torres Plumbing, Gold Coast",
    text: "Plumbing is an emergency service — people search Google Maps when their pipes burst at 2am. We were buried on page 2 and losing jobs to competitors daily. GMB Optimizers got us to the top 3 within 6 weeks. Our emergency call volume went up 250%. Best investment I've ever made in my business.",
    initials: "MT",
    color: colors[1],
    industry: "Home Services",
    result: "+250% emergency calls",
    image: "/images/testimonial-6.png",
  },
  {
    name: "Priya Sharma",
    business: "Spice Garden Restaurant, Melbourne",
    text: "Our restaurant was struggling despite having amazing food. The problem? Nobody could find us on Google Maps. GMB Optimizers optimized our profile with better photos, accurate categories, and a review strategy. Within 2 months, we went from 30 covers a night to being fully booked every weekend. Our Google Maps views went from 2,000 to 15,000 per month.",
    initials: "PS",
    color: colors[2],
    industry: "Restaurant",
    result: "2K → 15K monthly views",
    image: "/images/testimonial-7.png",
  },
  {
    name: "Tom Henderson",
    business: "Henderson Law Group, London",
    text: "I was skeptical about spending money on Google Maps optimization. My firm had been in Holborn for 15 years — I thought reputation alone would bring in clients. But the market shifted online. GMB Optimizers showed me the data: 87% of people find solicitors through Google. After their optimization, our consultation requests increased by 180%. I wish I'd started sooner.",
    initials: "TH",
    color: colors[3],
    industry: "Legal",
    result: "+180% consultation requests",
    image: "/images/testimonial-8.png",
    countries: ["uk"],
  },
  {
    name: "Rebecca Clarke",
    business: "Glow Beauty Spa, Manchester",
    text: "The beauty industry is incredibly competitive on Google Maps in Manchester. There are literally 50+ spas within 5km of us. GMB Optimizers analysed every competitor and found gaps we could exploit. They optimised our categories, built our citations, and implemented a review strategy. We went from position #34 to #3 in just 10 weeks. Our booking system can barely keep up.",
    initials: "RC",
    color: colors[0],
    industry: "Beauty & Wellness",
    result: "#34 → #3 in 10 weeks",
    image: "/images/testimonial-9.png",
    countries: ["uk"],
  },
  {
    name: "Chris O'Brien",
    business: "O'Brien Electrical, Perth",
    text: "I run a team of 8 electricians and we rely heavily on Google Maps for job leads. When our ranking dropped from #3 to #15 after a Google algorithm update, I panicked. GMB Optimizers diagnosed the issue within 48 hours — duplicate listings and inconsistent citations. They cleaned everything up and we were back to #2 within a month.",
    initials: "CO",
    color: colors[1],
    industry: "Trade Services",
    result: "Recovered #2 after algorithm hit",
    image: "/images/testimonial-10.png",
  },
  {
    name: "Emily Watson",
    business: "Little Learners Nursery, Birmingham",
    text: "Parents search for nurseries on Google Maps religiously. We had a great facility but poor online visibility. GMB Optimizers transformed our Google profile — professional photos, detailed services, proper categories. The result? 40% more parent enquiries within the first month. We now have a waiting list for the first time in our 5-year history.",
    initials: "EW",
    color: colors[2],
    industry: "Education",
    result: "+40% parent enquiries",
    image: "/images/testimonial-11.png",
    countries: ["uk"],
  },
  {
    name: "Hassan Ali",
    business: "Ali's Pharmacy, Sydney",
    text: "Running an independent pharmacy against big chains like Chemist Warehouse seemed impossible. GMB Optimizers helped us compete by highlighting what makes us different — personalized service, compounding, and after-hours availability. We now rank #1 for 'pharmacy near me' in our suburb and our prescription transfers from competitors have doubled.",
    initials: "HA",
    color: colors[3],
    industry: "Healthcare",
    result: "#1 for 'pharmacy near me'",
    image: "/images/testimonial-12.png",
  },
  {
    name: "Jasmine Rivera",
    business: "Rivera's Pet Spa, Los Angeles",
    text: "I started my pet grooming business from a small unit in LA and couldn't afford traditional advertising. GMB Optimizers was my first professional marketing investment. They set up my Google Business Profile, optimized it perfectly, and within 6 weeks I was getting 15+ calls per week from Google Maps alone. I've since moved into a proper storefront and hired two assistants.",
    initials: "JR",
    color: colors[0],
    industry: "Pet Services",
    result: "15+ calls/week from Maps",
    image: "/images/testimonial-13.png",
    countries: ["us"],
  },
  {
    name: "Robert Fitzgerald",
    business: "Fitzgerald Real Estate, Gold Coast",
    text: "Real estate is all about local visibility. We were losing listings to agencies that ranked higher on Google Maps. GMB Optimizers implemented a multi-location strategy across our 3 offices and built our review profile from 25 to 120+ reviews. We're now the top-ranked agency in 2 out of 3 suburbs. Our listing presentations close 30% more often when clients see our Google presence.",
    initials: "RF",
    color: colors[1],
    industry: "Real Estate",
    result: "#1 in 2 suburbs",
    image: "/images/testimonial-14.png",
  },
  {
    name: "Michelle Zhang",
    business: "Zen Yoga Studio, Chicago",
    text: "Opening a yoga studio during tough economic times was risky. GMB Optimizers helped us build an online presence from day one. They optimized our Google Business Profile with class schedules, photos, and a review system. Within 8 weeks we had 45 five-star reviews and were ranking #1 for yoga classes in Lincoln Park. We hit our membership target 2 months early.",
    initials: "MZ",
    color: colors[2],
    industry: "Fitness",
    result: "45 reviews & #1 in 8 weeks",
    image: "/images/testimonial-15.png",
    countries: ["us"],
  },
  {
    name: "Daniel Murphy",
    business: "Murphy's Irish Pub, Melbourne",
    text: "Our pub has been here for 20 years, but we were being outranked by trendy new bars on Google Maps. GMB Optimizers updated our profile, highlighted our live music and food menu, and built up our review count from 60 to 200+. We went from position #12 to #1 for 'pub near me' in our area. Weekend foot traffic is up 60%.",
    initials: "DM",
    color: colors[3],
    industry: "Hospitality",
    result: "60 → 200+ reviews, #1 ranking",
    image: "/images/testimonial-16.png",
  },
  {
    name: "Natasha Volkov",
    business: "Volkov Immigration Law, New York",
    text: "Immigration law is incredibly niche but competitive online in NYC. GMB Optimizers understood our unique challenges — multiple languages, specific service categories, and a client base that relies heavily on Google for finding attorneys. They optimized everything beautifully. Our qualified leads increased by 220% and most clients now mention finding us on Google Maps.",
    initials: "NV",
    color: colors[0],
    industry: "Professional Services",
    result: "+220% qualified leads",
    image: "/images/testimonial-17.png",
    countries: ["us"],
  },
  {
    name: "Ryan Cooper",
    business: "Cooper's Car Wash, Perth",
    text: "Car washes live and die by their Google Maps ranking. People search 'car wash near me' and pick the first result. We were stuck at #7. GMB Optimizers worked their magic — better photos, geo-tagged images, review generation, and citation building. We hit #1 in 5 weeks. Revenue jumped 45% in the first month at the top.",
    initials: "RC",
    color: colors[1],
    industry: "Automotive",
    result: "#7 → #1 in 5 weeks",
    image: "/images/testimonial-18.png",
  },
  {
    name: "Olivia Thompson",
    business: "Thompson Veterinary Clinic, Melbourne",
    text: "Pet owners are incredibly loyal once they find a good vet, so the key is being found first. We were ranked #8 in our area. GMB Optimizers optimized our profile with specific animal categories, emergency services, and built our review count from 20 to 110. We're now #1 and see 15 new patients per week directly from Google Maps searches.",
    initials: "OT",
    color: colors[0],
    industry: "Veterinary",
    result: "15 new patients/week from Maps",
    image: "/images/testimonial-21.png",
  },
  {
    name: "Marcus Brown",
    business: "Brown's Accountancy, Edinburgh",
    text: "Accountants don't usually think about Google Maps, but that's where our competitors were getting clients. GMB Optimizers opened my eyes to local SEO. They optimised our profile for tax season keywords, built our citations across UK directories, and implemented review collection. During our last tax season, new client enquiries were up 200% compared to the previous year.",
    initials: "MB",
    color: colors[1],
    industry: "Finance",
    result: "+200% tax season enquiries",
    image: "/images/testimonial-22.png",
    countries: ["uk"],
  },
  {
    name: "William Scott",
    business: "Scott's Roofing, Perth",
    text: "Roofing is a high-value service and every lead counts. We were spending $3,000/month on leads from lead generation companies. GMB Optimizers got us ranking #1 on Google Maps and now we get better quality leads for free. We've completely eliminated our lead-gen spend. The savings alone paid for their service 10 times over in the first year.",
    initials: "WS",
    color: colors[3],
    industry: "Construction",
    result: "Eliminated $3K/mo lead-gen cost",
    image: "/images/testimonial-24.png",
  },
  {
    name: "Diana Hughes",
    business: "Hughes Photography, Melbourne",
    text: "Wedding photography is a passion, but finding clients was my biggest struggle. My website was great, but I wasn't showing up on Google Maps where couples actually search. GMB Optimizers built my local presence from nothing. Now I rank #2 for 'wedding photographer Melbourne' and my calendar is booked 8 months in advance. Worth every cent.",
    initials: "DH",
    color: colors[2],
    industry: "Photography",
    result: "Booked 8 months in advance",
    image: "/images/testimonial-27.png",
  },
  {
    name: "Liam Anderson",
    business: "Anderson HVAC Solutions, Dallas",
    text: "HVAC is seasonal but Google Maps presence is year-round. GMB Optimizers built a strategy that kept us visible during off-season too in the Dallas market. They optimized for heating keywords in winter and cooling in summer, kept our posts fresh, and grew our reviews to 85+. We're now #1 year-round and our off-season revenue increased by 70%. No more slow months.",
    initials: "LA",
    color: colors[1],
    industry: "HVAC",
    result: "+70% off-season revenue",
    image: "/images/testimonial-30.png",
    countries: ["us"],
  },
];

/**
 * Country assignments for testimonials by index.
 * Testimonials without an entry are global.
 */
const countryAssignments: Record<number, string[]> = {
  0: ["au"], 1: ["au"], 2: ["au"], 3: ["au"], 4: ["au"], 5: ["au"], 6: ["au"],
  7: ["uk"], 8: ["uk"],
  9: ["au"],
  10: ["uk"],
  11: ["au"],
  12: ["us"],
  13: ["au"],
  14: ["us"],
  15: ["au"],
  16: ["us"],
  17: ["au"],
  18: ["au"], // Olivia Thompson
  19: ["uk"], // Marcus Brown
  20: ["au"], // William Scott
  21: ["au"], // Diana Hughes
  22: ["us"], // Liam Anderson
};

// Apply country assignments
testimonials.forEach((t, i) => {
  if (countryAssignments[i]) {
    t.countries = countryAssignments[i];
  }
});

/** Get testimonials for a specific country. Shows country-specific first, then global/other. */
export const getTestimonialsForCountry = (countryCode: string): Testimonial[] => {
  const local = testimonials.filter((t) => t.countries?.includes(countryCode));
  const global = testimonials.filter((t) => !t.countries || !t.countries.includes(countryCode));
  return [...local, ...global];
};
