export interface CaseStudyTimeline {
  week: string;
  title: string;
  description: string;
  color: string;
}

export interface CaseStudyStrategy {
  title: string;
  description: string;
}

export interface CaseStudyStat {
  label: string;
  value: string;
  color: string;
}

export interface CaseStudy {
  slug: string;
  business: string;
  industry: string;
  location: string;
  image: string;
  imageAlt: string;
  ownerImage: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string;
  stats: CaseStudyStat[];
  timeline: CaseStudyTimeline[];
  strategies: CaseStudyStrategy[];
  testimonialQuote: string;
  testimonialAuthor: string;
  testimonialRole: string;
  duration: string;
  startRank: string;
  endRank: string;
  /** Country code(s) this case study is relevant to */
  countries?: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "melbourne-dental-clinic",
    business: "Melbourne Dental Clinic",
    industry: "Healthcare",
    location: "Melbourne CBD, VIC",
    image: "/images/case-study-1.png",
    imageAlt: "Dental clinic ranking #1 on Google Maps on a tablet screen",
    ownerImage: "/images/owner-sarah-chen.png",
    summary: "A leading dental practice in Melbourne's CBD was struggling with online visibility despite excellent patient reviews. We implemented a comprehensive Google Maps strategy that transformed their digital presence.",
    challenge: "Despite having 15 years of experience and a loyal patient base, Melbourne Dental Clinic was virtually invisible on Google Maps. They ranked #14 for 'dentist near me' in their area, losing hundreds of potential patients monthly to competitors with stronger online profiles. Their Google Business Profile was incomplete, they had inconsistent NAP data across directories, and their review count was low compared to top-ranking competitors. The clinic was spending $4,000/month on Google Ads just to stay visible, with diminishing returns.",
    solution: "We conducted a full audit of their Google Business Profile, local citations, and competitor landscape. Our team identified 23 citation inconsistencies, an incomplete profile with missing categories, and opportunities to leverage their excellent patient satisfaction into review growth. We implemented a 12-week optimization program targeting all three core Google Maps ranking factors.",
    results: "Within 12 weeks, Melbourne Dental Clinic moved from position #14 to the #1 spot on Google Maps for their primary keywords. Monthly calls from Google increased by 340%, website visits grew by 520%, and they were able to reduce their Google Ads spend by 70% while seeing even more patients. The clinic added 2 new dentists to handle the increased demand.",
    stats: [
      { label: "Ranking Improvement", value: "#14 → #1", color: "text-google-green" },
      { label: "Monthly Calls Increase", value: "+340%", color: "text-google-blue" },
      { label: "Website Visits Increase", value: "+520%", color: "text-google-red" },
      { label: "Ad Spend Reduction", value: "-70%", color: "text-google-yellow" },
      { label: "New Reviews Generated", value: "85+", color: "text-google-green" },
      { label: "ROI in First Year", value: "12x", color: "text-google-blue" },
    ],
    timeline: [
      { week: "Week 1-2", title: "Discovery & Audit", description: "Complete audit of existing Google Business Profile, citation analysis across 150+ directories, competitor benchmarking of top 10 dental clinics, and keyword research for local dental search terms.", color: "bg-google-blue" },
      { week: "Week 3-4", title: "Profile Optimization", description: "Complete GBP overhaul including category updates, attribute optimization, service descriptions, business hours refinement, and professional photo upload with geo-tagging.", color: "bg-google-red" },
      { week: "Week 5-6", title: "Citation Cleanup & Building", description: "Fixed 23 NAP inconsistencies across major directories, submitted to 80+ high-authority citation sources, and cleaned up 4 duplicate listings that were diluting ranking signals.", color: "bg-google-yellow" },
      { week: "Week 7-8", title: "Review Generation Launch", description: "Implemented automated review request system via SMS and email follow-ups. Trained front desk staff on review solicitation best practices. Set up professional review response templates.", color: "bg-google-green" },
      { week: "Week 9-10", title: "Content & Post Strategy", description: "Launched weekly Google Posts highlighting services, special offers, and patient education content. Optimized local landing pages with schema markup and embedded maps.", color: "bg-google-blue" },
      { week: "Week 11-12", title: "Monitoring & Scaling", description: "Fine-tuned strategy based on ranking data, expanded keyword targeting to include specialty services (implants, cosmetic dentistry), and documented the #1 ranking achievement.", color: "bg-google-red" },
    ],
    strategies: [
      { title: "Category & Attribute Optimization", description: "Added 5 additional relevant categories and 15+ attributes including wheelchair accessibility, appointment links, and payment methods to maximize profile completeness." },
      { title: "Geo-Tagged Photo Strategy", description: "Uploaded 40+ professionally shot, geo-tagged photos of the clinic interior, team, and equipment, resulting in 300% more photo views on the profile." },
      { title: "Review Velocity Engineering", description: "Designed a review funnel that increased monthly review acquisition from 2 to 15, building the clinic from 30 to 115+ reviews in 3 months." },
      { title: "Competitive Gap Exploitation", description: "Identified that no competitor had optimized for 'emergency dentist Melbourne CBD' — we claimed that keyword and now rank #1 for it, driving 40+ calls monthly." },
      { title: "Local Landing Page Optimization", description: "Built suburb-specific service pages with proper schema markup, driving additional organic traffic that reinforced Google Maps rankings." },
    ],
    testimonialQuote: "GMB Optimizers didn't just improve our ranking — they transformed our entire patient acquisition model. We went from relying on expensive ads to having patients find us organically. The ROI has been extraordinary.",
    testimonialAuthor: "Dr. Sarah Chen",
    testimonialRole: "Practice Owner, Melbourne Dental Clinic",
    duration: "12 weeks",
    startRank: "#14",
    endRank: "#1",
  },
  {
    slug: "sydney-auto-repair",
    business: "Sydney Auto Repair",
    industry: "Automotive",
    location: "Parramatta, Sydney, NSW",
    image: "/images/case-study-2.png",
    imageAlt: "Auto repair shop Google Maps listing on a smartphone",
    ownerImage: "/images/owner-james-chen.png",
    summary: "A family-owned auto repair shop in Sydney faced stiff competition from larger chains. Our targeted local SEO and citation strategy helped them dominate their suburb on Google Maps.",
    challenge: "Sydney Auto Repair, a third-generation family business, was losing customers to franchise chains like Ultra Tune and Midas that dominated Google Maps in the Parramatta area. Ranking at #22, they were completely invisible in the local pack. Their Google Business Profile hadn't been updated in 3 years, they had only 8 reviews (compared to competitors with 200+), and their business information was incorrect on 40+ directories. Monthly leads from Google had dropped 60% over the past year.",
    solution: "We developed an aggressive catch-up strategy to overcome the significant gap between Sydney Auto Repair and the established franchise competitors. Our approach combined rapid citation building, a differentiated positioning strategy (emphasizing personalized family service vs. corporate chains), and an innovative geo-targeting approach that focused on surrounding suburbs where competition was thinner.",
    results: "In just 10 weeks, Sydney Auto Repair climbed from #22 to #2 on Google Maps, entering the coveted local 3-pack. Monthly phone calls from Google increased by 280%, and website visits grew by 410%. The shop went from 2-3 bookings per day to being fully booked, requiring them to add a Saturday service slot. Revenue grew 65% within the first quarter.",
    stats: [
      { label: "Ranking Improvement", value: "#22 → #2", color: "text-google-green" },
      { label: "Monthly Calls Increase", value: "+280%", color: "text-google-blue" },
      { label: "Website Visits Increase", value: "+410%", color: "text-google-red" },
      { label: "Revenue Growth", value: "+65%", color: "text-google-yellow" },
      { label: "Review Count Growth", value: "8 → 95", color: "text-google-green" },
      { label: "Booking Rate", value: "100%", color: "text-google-blue" },
    ],
    timeline: [
      { week: "Week 1-2", title: "Competitive Deep-Dive", description: "Analyzed top 15 auto repair competitors in the Parramatta area. Mapped their citation networks, review profiles, and keyword strategies. Identified positioning gaps in family-owned, personalized service messaging.", color: "bg-google-blue" },
      { week: "Week 3-4", title: "Profile & Brand Overhaul", description: "Completely rebuilt the Google Business Profile with updated photos showing the family team, detailed service descriptions, accurate hours, and proper categorization including 'auto electrical service' which no competitor had claimed.", color: "bg-google-red" },
      { week: "Week 5-6", title: "Citation Blitz", description: "Corrected NAP data on 40+ directories, submitted to 100+ new citation sources, and specifically targeted automotive industry directories like CarExpert and Drive.com.au for industry authority signals.", color: "bg-google-yellow" },
      { week: "Week 7-8", title: "Review Campaign & Response Strategy", description: "Launched an in-shop review collection system with QR codes on invoices. Implemented same-day review responses highlighting the family service difference. Achieved 15+ new reviews per week.", color: "bg-google-green" },
      { week: "Week 9-10", title: "Geo-Expansion & Optimization", description: "Expanded service area targeting to 5 surrounding suburbs. Created geo-tagged content for each area. Fine-tuned Google Posts with seasonal promotions (pre-summer AC checks, winter battery specials).", color: "bg-google-blue" },
    ],
    strategies: [
      { title: "Family Brand Differentiation", description: "Positioned the business against corporate chains by highlighting 3 generations of expertise, personalized service, and transparent pricing — messaging that resonated strongly with local searchers." },
      { title: "Industry-Specific Citations", description: "Built citations on 25+ automotive-specific directories that competitors had overlooked, creating strong industry relevance signals unique to our client." },
      { title: "QR Code Review System", description: "Designed physical QR code cards placed on dashboards at pickup, linking directly to the Google review page with pre-filled 5-star rating — achieving a 35% conversion rate." },
      { title: "Suburban Geo-Targeting", description: "Rather than competing head-to-head in the crowded Parramatta CBD, we targeted surrounding suburbs where search competition was lower, then leveraged those wins to boost overall authority." },
    ],
    testimonialQuote: "My grandfather started this shop in 1972. For the first time in years, we're not just surviving against the big chains — we're thriving. GMB Optimizers understood our story and made it our competitive advantage.",
    testimonialAuthor: "James Chen",
    testimonialRole: "Owner, Sydney Auto Repair",
    duration: "10 weeks",
    startRank: "#22",
    endRank: "#2",
  },
  {
    slug: "brisbane-law-firm",
    business: "Brisbane Law Firm",
    industry: "Legal",
    location: "Fortitude Valley, Brisbane, QLD",
    image: "/images/case-study-3.png",
    imageAlt: "Law firm office with Google Maps pin overlay on laptop",
    ownerImage: "/images/owner-michael-torres.png",
    summary: "A mid-size law firm in Brisbane needed to attract more local clients. We optimized their Google Business Profile and built a review strategy that established them as the go-to firm in their area.",
    challenge: "Brisbane Law Firm, a 5-partner practice specializing in family law and property conveyancing, was spending $8,000/month on Google Ads and legal lead generation platforms with increasingly poor ROI. Ranking at #18 on Google Maps, they were losing market share to smaller boutique firms that had invested in local SEO early. Their Google Business Profile listed them under a single generic 'lawyer' category, had no photos, only 12 reviews (some from 4 years ago), and their appointment booking link was broken. Competing firms had 150+ reviews and fully optimized profiles.",
    solution: "We implemented a prestige-focused optimization strategy that positioned the firm as Brisbane's most trusted legal team. Our approach combined aggressive profile optimization, a sophisticated review generation system tailored to the legal industry's sensitivity around client confidentiality, and a content strategy built around legal education Google Posts that showcased expertise without soliciting clients directly.",
    results: "Within 14 weeks, Brisbane Law Firm rose from #18 to #1 for 'family lawyer Brisbane' and top 3 for 6 additional practice area keywords. Monthly consultation requests from Google increased by 190%, website visits grew by 350%, and they reduced their Google Ads spend by 85% — saving $6,800/month. The firm hired 2 additional associate lawyers to handle the new caseload and expanded their office space.",
    stats: [
      { label: "Ranking Improvement", value: "#18 → #1", color: "text-google-green" },
      { label: "Consultation Requests", value: "+190%", color: "text-google-blue" },
      { label: "Website Visits Increase", value: "+350%", color: "text-google-red" },
      { label: "Monthly Ad Savings", value: "$6,800", color: "text-google-yellow" },
      { label: "Review Count Growth", value: "12 → 130", color: "text-google-green" },
      { label: "Keywords in Top 3", value: "7", color: "text-google-blue" },
    ],
    timeline: [
      { week: "Week 1-3", title: "Legal Industry Audit", description: "Deep analysis of Brisbane legal market, competitor profiling of top 20 law firms, keyword research across 8 practice areas, and compliance review to ensure all optimization adhered to Queensland Law Society advertising guidelines.", color: "bg-google-blue" },
      { week: "Week 4-6", title: "Profile Transformation", description: "Added 6 relevant practice area categories, uploaded professional team and office photos, fixed appointment booking integration, added all services with detailed descriptions, and set up Q&A section with common legal questions.", color: "bg-google-red" },
      { week: "Week 7-9", title: "Reputation Building", description: "Implemented a confidential, compliance-approved review collection system. Created personalized follow-up sequences for different practice areas. Trained paralegals on ethical review solicitation within Law Society guidelines.", color: "bg-google-yellow" },
      { week: "Week 10-12", title: "Authority Content Strategy", description: "Launched bi-weekly Google Posts covering legal education topics (property settlement guides, family law FAQ), establishing the firm as a thought leader. Created practice area landing pages with local schema markup.", color: "bg-google-green" },
      { week: "Week 13-14", title: "Multi-Keyword Expansion", description: "Expanded targeting from 'family lawyer' to include 'property conveyancing', 'divorce lawyer', 'wills and estates', and other practice areas. Achieved top 3 for 7 total keywords.", color: "bg-google-blue" },
    ],
    strategies: [
      { title: "Compliance-First Review System", description: "Designed a review collection process that respected legal industry confidentiality requirements, using general satisfaction surveys that funneled happy clients to Google reviews without disclosing case details." },
      { title: "Multi-Category Optimization", description: "Expanded from 1 to 7 Google Business categories covering all practice areas, dramatically increasing the firm's visibility across different legal search terms." },
      { title: "Legal Education Content", description: "Created a Google Posts strategy centered on educational content rather than promotional messaging, building trust and authority while staying within Law Society advertising guidelines." },
      { title: "Competitor Review Gap Analysis", description: "Identified that while competitors had more reviews, their average response time was 2+ weeks. We implemented same-day responses, signaling active management to both Google and potential clients." },
      { title: "Practice Area Landing Pages", description: "Built 8 optimized landing pages, one per practice area, with suburb-specific content, embedded Google Maps, and structured data markup that reinforced Maps ranking for each specialty." },
    ],
    testimonialQuote: "We were pouring money into ads with declining results. GMB Optimizers showed us a better way. We now get more qualified leads from Google Maps than we ever did from $8,000/month in advertising. The firm has grown 40% since we started.",
    testimonialAuthor: "Michael Torres",
    testimonialRole: "Managing Partner, Brisbane Law Firm",
    duration: "14 weeks",
    startRank: "#18",
    endRank: "#1",
  },
  {
    slug: "rossis-italian-kitchen",
    business: "Rossi's Italian Kitchen",
    industry: "Restaurant",
    location: "South Yarra, Melbourne, VIC",
    image: "/images/case-study-4.png",
    imageAlt: "Italian restaurant interior with Google Maps listing on tablet",
    ownerImage: "/images/owner-marco-rossi.png",
    summary: "A beloved Italian restaurant in Melbourne's South Yarra struggled to compete with newer trendy eateries on Google Maps. Our food-focused optimization strategy turned them into the #1 Italian restaurant in the area.",
    challenge: "Rossi's Italian Kitchen had been a neighborhood gem for 12 years with a loyal customer base, but they were losing new diners to flashier competitors ranking above them on Google Maps. Sitting at position #19 for 'Italian restaurant near me,' they were invisible to the 85% of diners who discover restaurants through Google. Their profile had outdated photos from 2018, only 45 reviews (competitors averaged 300+), no menu integration, and their reservation link was broken. Monthly Google Maps views had dropped 40% year-over-year, and weekend tables were going unfilled for the first time in a decade.",
    solution: "We crafted a restaurant-specific optimization strategy that leveraged the emotional appeal of authentic Italian dining. Our approach combined mouthwatering food photography, strategic menu optimization within the Google Business Profile, a sophisticated review generation system timed to post-dining satisfaction peaks, and a Google Posts strategy built around seasonal menus, weekly specials, and behind-the-scenes kitchen content that drove engagement and repeat visits.",
    results: "Within 11 weeks, Rossi's climbed from #19 to #1 for 'Italian restaurant' keywords across South Yarra, Prahran, and Toorak. Google Maps views surged from 3,000 to 22,000 per month. Weekend reservations are now fully booked 2 weeks in advance, and weeknight covers increased by 75%. They've hired 3 additional kitchen staff and expanded their dining area. Monthly revenue increased by $45,000.",
    stats: [
      { label: "Ranking Improvement", value: "#19 → #1", color: "text-google-green" },
      { label: "Monthly Maps Views", value: "22K+", color: "text-google-blue" },
      { label: "Weekend Bookings", value: "100%", color: "text-google-red" },
      { label: "Revenue Increase", value: "+$45K/mo", color: "text-google-yellow" },
      { label: "Review Growth", value: "45 → 280", color: "text-google-green" },
      { label: "Weeknight Cover Increase", value: "+75%", color: "text-google-blue" },
    ],
    timeline: [
      { week: "Week 1-2", title: "Restaurant Industry Audit", description: "Analyzed the top 20 competing restaurants in the South Yarra dining precinct. Mapped their review profiles, photo strategies, menu integrations, and posting frequencies. Identified that no competitor was using Google's food ordering integration or menu highlights effectively.", color: "bg-google-blue" },
      { week: "Week 3-4", title: "Visual & Profile Overhaul", description: "Commissioned professional food photography of 30+ signature dishes with perfect lighting and plating. Uploaded geo-tagged interior shots showing the warm ambiance. Rebuilt the entire profile with updated categories (Italian, Pizza, Wine Bar), accurate hours including late-night dining, and reservation integration.", color: "bg-google-red" },
      { week: "Week 5-6", title: "Menu & Ordering Integration", description: "Integrated the full menu into Google Business Profile with pricing, dish descriptions, and dietary labels (vegan, gluten-free). Set up Google's food ordering feature with direct links, eliminating third-party commission fees. Added popular dish highlights that appeared in search results.", color: "bg-google-yellow" },
      { week: "Week 7-8", title: "Review Generation Campaign", description: "Implemented a tableside review collection system using NFC-enabled table cards and QR codes on receipts. Timed SMS review requests to 2 hours post-dining when satisfaction peaks. Trained wait staff on natural review solicitation during dessert service. Achieved 20+ new reviews per week.", color: "bg-google-green" },
      { week: "Week 9-10", title: "Content & Engagement Strategy", description: "Launched a bi-weekly Google Posts strategy featuring Chef Marco's specials, seasonal menu launches, wine pairing events, and cooking class announcements. Created a 'Dish of the Week' series that drove 40% higher profile engagement than industry average.", color: "bg-google-blue" },
      { week: "Week 11", title: "Results & Expansion", description: "Achieved #1 ranking across all primary keywords. Documented a 633% increase in Google Maps views. Expanded targeting to include 'date night restaurant Melbourne' and 'best pasta Melbourne' — both now ranking top 3.", color: "bg-google-red" },
    ],
    strategies: [
      { title: "Food Photography Optimization", description: "Professional photos of 30+ dishes shot specifically for Google's carousel format, with proper lighting and composition that drove a 400% increase in photo views and made the listing irresistible to hungry searchers." },
      { title: "Menu Integration & Rich Results", description: "Full menu integration with structured data enabled rich snippets in search results, showing popular dishes, prices, and dietary options directly in Google — capturing clicks before competitors." },
      { title: "Tableside NFC Review Collection", description: "Custom NFC-enabled table cards allowed diners to tap their phone and leave a review in under 30 seconds, achieving a 28% conversion rate — 4x the industry average for restaurant review collection." },
      { title: "Seasonal Content Calendar", description: "A 12-month content calendar aligned with seasonal ingredients, holidays, and local events ensured consistent posting that kept the profile fresh and engagement high year-round." },
      { title: "Competitor Cuisine Gap Analysis", description: "Identified that while competitors focused on generic 'restaurant' keywords, none had claimed 'authentic Italian Melbourne' or 'homemade pasta South Yarra' — keywords we now own exclusively." },
    ],
    testimonialQuote: "My family has been making pasta for three generations, but we were losing customers to restaurants with better Google presence. GMB Optimizers brought the digital world in line with our food quality. We're now the #1 Italian restaurant in our area, and for the first time ever, we're turning away walk-ins on weeknights. Incredible.",
    testimonialAuthor: "Marco Rossi",
    testimonialRole: "Chef & Owner, Rossi's Italian Kitchen",
    duration: "11 weeks",
    startRank: "#19",
    endRank: "#1",
  },
  {
    slug: "coastal-realty-group",
    business: "Coastal Realty Group",
    industry: "Real Estate",
    location: "Bondi Beach, Sydney, NSW",
    image: "/images/case-study-5.png",
    imageAlt: "Real estate office with Google Maps analytics dashboard on laptop",
    ownerImage: "/images/owner-karen-mitchell.png",
    summary: "A boutique real estate agency on Sydney's Eastern Beaches was being outranked by franchise agencies on Google Maps. Our multi-location strategy made them the dominant agency across 4 coastal suburbs.",
    challenge: "Coastal Realty Group, led by veteran agent Karen Mitchell, had 18 years of local market expertise but was being buried on Google Maps by franchise agencies like Ray White, McGrath, and LJ Hooker. Ranking at #16 for 'real estate agent Bondi,' they were invisible to the 73% of property sellers who search Google when choosing an agent. Their Google Business Profile had a single generic listing, only 18 reviews (franchise competitors had 400+), and no differentiation messaging. They were spending $6,500/month on realestate.com.au featured listings with declining ROI, while franchise competitors dominated the free Google Maps results.",
    solution: "We developed a prestige-focused, multi-suburb optimization strategy that positioned Coastal Realty as the authentic local experts — something franchise agencies couldn't claim. Our approach included creating separate optimized profiles for each office location, a sophisticated review generation system targeting both vendors and buyers, a Google Posts strategy showcasing recent sales with suburb-specific market insights, and a citation network built around premium real estate directories.",
    results: "Within 13 weeks, Coastal Realty achieved #1 rankings in 3 out of 4 target suburbs and #2 in the fourth. Monthly listing inquiries from Google increased by 310%, open home attendance rose by 180%, and vendor appraisal requests doubled. They reduced their realestate.com.au spend by 60%, saving $3,900/month. The agency signed 12 new exclusive listings in the first month at #1 — a record quarter. Karen hired 2 additional agents to handle demand.",
    stats: [
      { label: "Ranking Achievement", value: "#1 in 3 suburbs", color: "text-google-green" },
      { label: "Listing Inquiries", value: "+310%", color: "text-google-blue" },
      { label: "Open Home Attendance", value: "+180%", color: "text-google-red" },
      { label: "Monthly Ad Savings", value: "$3,900", color: "text-google-yellow" },
      { label: "Review Growth", value: "18 → 185", color: "text-google-green" },
      { label: "New Exclusive Listings", value: "12/month", color: "text-google-blue" },
    ],
    timeline: [
      { week: "Week 1-3", title: "Market & Competitor Deep Dive", description: "Comprehensive analysis of 25+ competing agencies across Bondi, Bronte, Clovelly, and Tamarama. Mapped franchise vs. independent agency rankings, identified review profile gaps, and discovered that no competitor had optimized for suburb-specific keywords like 'Bronte real estate agent.'", color: "bg-google-blue" },
      { week: "Week 4-5", title: "Multi-Location Profile Setup", description: "Created and optimized separate Google Business Profiles for the Bondi and Bronte offices with distinct suburb-specific content, team photos, and service descriptions. Added 8 relevant categories including 'property management' and 'buyer's agent' that competitors had missed.", color: "bg-google-red" },
      { week: "Week 6-8", title: "Review & Reputation Engine", description: "Implemented a dual-channel review system: automated post-settlement emails for vendors with personalized messages, and buyer review requests timed to key completion. Created suburb-specific review response templates highlighting local market knowledge. Achieved 15+ new reviews per week.", color: "bg-google-yellow" },
      { week: "Week 9-11", title: "Content & Authority Building", description: "Launched a weekly Google Posts strategy featuring recent sales results ('Just Sold: 3BR Bronte — $280K over reserve'), suburb market reports, and open home announcements. This positioned Karen as the go-to market expert and drove 5x higher engagement than competitor posts.", color: "bg-google-green" },
      { week: "Week 12-13", title: "Suburb Domination & Scaling", description: "Expanded optimization to Clovelly and Tamarama. Achieved #1 in 3 suburbs and #2 in the fourth within 13 weeks. Documented comprehensive results and built a replicable model for future suburb expansion.", color: "bg-google-blue" },
    ],
    strategies: [
      { title: "Multi-Suburb Targeting", description: "Created distinct optimized presences for each coastal suburb, with location-specific content, photos, and reviews that established authentic local expertise — impossible for franchise agencies to replicate at scale." },
      { title: "Recent Sales Social Proof", description: "Weekly Google Posts featuring recent sales results with prices created a powerful social proof loop — potential vendors saw consistent wins, reinforcing the decision to list with Coastal Realty." },
      { title: "Vendor & Buyer Dual Review System", description: "Unlike competitors who only collected vendor reviews, we built a system capturing both buyer and vendor feedback, doubling the review velocity and showing expertise from both sides of the transaction." },
      { title: "Local Market Authority Content", description: "Monthly suburb market reports posted to Google created an authority signal that both Google's algorithm and potential clients valued — positioning Karen as the definitive Eastern Beaches property expert." },
      { title: "Premium Directory Network", description: "Built citations across 40+ real estate-specific directories including RateMyAgent, OpenAgent, and LocalAgentFinder — platforms where vendors actively compare agents, driving additional referral traffic." },
    ],
    testimonialQuote: "For 18 years I built my reputation through handshakes and open homes. But the world moved online, and the franchise agencies were eating our lunch on Google. GMB Optimizers gave us the digital presence to match our real-world expertise. We're now the #1 ranked agency in 3 suburbs, and vendors are coming to us instead of us chasing them. It's transformed how we do business.",
    testimonialAuthor: "Karen Mitchell",
    testimonialRole: "Principal Agent & Owner, Coastal Realty Group",
    duration: "13 weeks",
    startRank: "#16",
    endRank: "#1",
  },
  {
    slug: "ironclad-fitness",
    business: "Ironclad Fitness",
    industry: "Fitness",
    location: "Surfers Paradise, Gold Coast, QLD",
    image: "/images/case-study-6.png",
    imageAlt: "Modern gym interior with Google Maps listing on smartphone",
    ownerImage: "/images/owner-jake-morrison.png",
    summary: "A boutique gym on the Gold Coast was losing members to large chain gyms with aggressive marketing. Our hyper-local optimization strategy helped them become the #1 rated gym in Surfers Paradise.",
    challenge: "Ironclad Fitness, a 200-member boutique gym owned by personal trainer Jake Morrison, was struggling against mega-chains like Anytime Fitness, Fitness First, and Goodlife Health Clubs. Ranking at #25 for 'gym near me,' they were completely invisible on Google Maps. With only 22 reviews against chains averaging 500+, and a bare-bones Google profile with 3 blurry photos, potential members couldn't find them. Monthly sign-ups had dropped from 20 to 8, and member churn was at 15%. Jake was considering closing the gym's doors within 6 months if things didn't turn around.",
    solution: "We designed a David-vs-Goliath optimization strategy that turned Ironclad's boutique size into its greatest advantage. Rather than competing on the same terms as chain gyms, we positioned Ironclad as the premium, results-focused alternative with personalized coaching — something chains couldn't offer. Our strategy combined transformation-focused visual content, a member success story review system, targeted keyword optimization for niche fitness categories, and a community-building Google Posts strategy that showcased the gym's tight-knit culture.",
    results: "In just 9 weeks, Ironclad Fitness rocketed from #25 to #1 for 'gym Surfers Paradise' and top 3 for 8 additional fitness keywords. Monthly sign-ups jumped from 8 to 35 — a 337% increase. Member retention improved from 85% to 96% as the community-focused content attracted members who valued quality over price. Google Maps profile views went from 800 to 12,000 per month. Revenue doubled within the first quarter, and Jake expanded to a larger 400sqm facility just 4 months after the campaign launched.",
    stats: [
      { label: "Ranking Improvement", value: "#25 → #1", color: "text-google-green" },
      { label: "Monthly Sign-ups", value: "8 → 35", color: "text-google-blue" },
      { label: "Profile Views", value: "12K/mo", color: "text-google-red" },
      { label: "Revenue Growth", value: "+100%", color: "text-google-yellow" },
      { label: "Review Growth", value: "22 → 165", color: "text-google-green" },
      { label: "Member Retention", value: "96%", color: "text-google-blue" },
    ],
    timeline: [
      { week: "Week 1-2", title: "Fitness Market Analysis", description: "Mapped all 18 competing gyms within 5km radius, analyzing their Google profiles, review strategies, and keyword rankings. Identified that while chains dominated generic 'gym' keywords, nobody owned niche terms like 'personal training Surfers Paradise,' 'CrossFit Gold Coast,' or 'small group training near me.'", color: "bg-google-blue" },
      { week: "Week 3-4", title: "Visual Transformation", description: "Coordinated a professional photo and video shoot capturing members mid-workout, the coaching atmosphere, before/after transformations (with consent), and the facility's premium equipment. Uploaded 50+ geo-tagged images and 5 short-form videos showing the Ironclad experience — views increased 800% in the first week.", color: "bg-google-red" },
      { week: "Week 5-6", title: "Niche Keyword Domination", description: "Optimized the profile for 12 niche fitness keywords that chains hadn't claimed. Added categories for 'personal trainer,' 'CrossFit gym,' and 'weight loss service.' Created service descriptions for each offering (PT, group classes, nutrition coaching) with keyword-rich content.", color: "bg-google-yellow" },
      { week: "Week 7-8", title: "Member Success Review Engine", description: "Launched a transformation-focused review campaign. Members who hit milestones (first pull-up, 10kg lost, competition prep) were invited to share their stories on Google. Created a 'Wall of Wins' in the gym linking to Google reviews. Achieved 18+ new reviews per week with detailed success stories.", color: "bg-google-green" },
      { week: "Week 9", title: "Community Content & Results", description: "Established a weekly Google Posts rhythm featuring member spotlights, workout tips, challenge announcements, and class schedule updates. This content strategy drove 3x more profile engagement than any competitor. Achieved #1 ranking and documented all results.", color: "bg-google-blue" },
    ],
    strategies: [
      { title: "Boutique Positioning Strategy", description: "Turned the gym's small size into a selling point by emphasizing personalized coaching, community culture, and results-focused training — qualities that resonated with searchers tired of impersonal chain gym experiences." },
      { title: "Transformation Visual Content", description: "Before/after member transformations (with consent) shared as Google photos and posts created the most compelling social proof in the local fitness market — generating 5x more engagement than standard gym photos." },
      { title: "Niche Keyword Ownership", description: "While chain gyms fought over 'gym near me,' we dominated 12 niche fitness terms ('personal training,' 'CrossFit,' 'small group training') that attracted higher-intent, higher-value members willing to pay premium rates." },
      { title: "Milestone Review System", description: "Linking review requests to member achievement milestones meant reviews were naturally emotional, detailed, and compelling — averaging 85 words compared to the industry average of 15 words per review." },
      { title: "Community-First Content Strategy", description: "Weekly member spotlights, challenge announcements, and behind-the-scenes coaching content positioned Ironclad as a community, not just a gym — driving both new sign-ups and dramatically improved member retention." },
    ],
    testimonialQuote: "Six months ago I was ready to shut down my gym. The big chains were crushing us on Google and stealing our potential members. GMB Optimizers didn't just save my business — they transformed it. We went from 8 sign-ups a month to 35, and we've since moved into a facility twice the size. Every member who walks in says they found us on Google Maps. I owe them everything.",
    testimonialAuthor: "Jake Morrison",
    testimonialRole: "Owner & Head Coach, Ironclad Fitness",
    duration: "9 weeks",
    startRank: "#25",
    endRank: "#1",
  },
  {
    slug: "london-dental-practice",
    business: "Harley Street Dental Practice",
    industry: "Healthcare",
    location: "Marylebone, London, UK",
    image: "/images/case-study-uk-dental.jpg",
    imageAlt: "Dental practice ranking #1 on Google Maps in London",
    ownerImage: "/images/owner-emily-whitfield.png",
    summary: "A prestigious dental practice on Harley Street was losing new patients to competitors with stronger Google Maps presence. Our NHS and private dual-optimisation strategy made them the #1 dentist in Marylebone.",
    challenge: "Despite a world-class reputation, Harley Street Dental Practice ranked #11 for 'dentist near me' in the W1 postcode. Competitors with aggressive online strategies were capturing patients who searched Google Maps. Their profile was incomplete, had only 20 reviews, and didn't differentiate between their NHS and private services. Monthly enquiries from Google had dropped 35% year-over-year.",
    solution: "We implemented a UK-specific optimisation strategy that leveraged both NHS and private service categories, Yell and Thomson Local citations, and a review system compliant with GDC advertising guidelines. Our approach targeted high-value cosmetic dentistry keywords alongside general NHS searches.",
    results: "Within 10 weeks, the practice moved from #11 to #1 for key dental terms across W1 and surrounding postcodes. Monthly enquiries from Google increased by 290%, private treatment bookings grew by 400%, and they reduced their Dentistry.co.uk advertising spend by 65%.",
    stats: [
      { label: "Ranking Improvement", value: "#11 → #1", color: "text-google-green" },
      { label: "Monthly Enquiries", value: "+290%", color: "text-google-blue" },
      { label: "Private Bookings", value: "+400%", color: "text-google-red" },
      { label: "Ad Spend Reduction", value: "-65%", color: "text-google-yellow" },
      { label: "New Reviews", value: "95+", color: "text-google-green" },
      { label: "ROI in First Year", value: "14x", color: "text-google-blue" },
    ],
    timeline: [
      { week: "Week 1-2", title: "UK Market Audit", description: "Analysed top 15 dental competitors in Central London. Mapped Yell, NHS Choices, and Checkatrade citation networks. Identified gaps in cosmetic dentistry keywords.", color: "bg-google-blue" },
      { week: "Week 3-4", title: "Profile & Citation Overhaul", description: "Rebuilt Google Business Profile with NHS/private service separation, professional photography, and GDC-compliant descriptions. Submitted to 60+ UK directories.", color: "bg-google-red" },
      { week: "Week 5-7", title: "Review & Reputation Campaign", description: "Implemented GDC-compliant review collection via SMS follow-ups. Trained reception staff. Achieved 12+ new reviews per week.", color: "bg-google-yellow" },
      { week: "Week 8-10", title: "Content Strategy & Results", description: "Launched weekly Google Posts about treatments, dental health tips, and patient stories. Achieved #1 ranking across all target keywords.", color: "bg-google-green" },
    ],
    strategies: [
      { title: "NHS & Private Dual Optimisation", description: "Separated NHS and private services in Google categories, capturing both cost-conscious NHS searchers and high-value cosmetic patients." },
      { title: "UK Citation Network", description: "Built citations across Yell, Thomson Local, NHS Choices, Checkatrade, and 50+ UK-specific directories for maximum local authority." },
      { title: "GDC-Compliant Review System", description: "Designed a review process that adhered to General Dental Council advertising guidelines while maximising patient review submissions." },
    ],
    testimonialQuote: "GMB Optimizers understood the unique challenges of the UK dental market. They navigated GDC regulations beautifully and delivered results beyond our expectations. We're now the most visible practice in Marylebone.",
    testimonialAuthor: "Dr. Emily Whitfield",
    testimonialRole: "Practice Owner, Harley Street Dental Practice",
    duration: "10 weeks",
    startRank: "#11",
    endRank: "#1",
    countries: ["uk"],
  },
  {
    slug: "new-york-auto-repair",
    business: "Brooklyn Auto Works",
    industry: "Automotive",
    location: "Williamsburg, Brooklyn, NY",
    image: "/images/case-study-us-auto.jpg",
    imageAlt: "Auto repair shop Google Maps listing in New York",
    ownerImage: "/images/owner-tony-russo.png",
    summary: "A family-owned auto shop in Brooklyn was losing business to Meineke and Jiffy Lube chains. Our hyper-local strategy made them the #1 mechanic in Williamsburg.",
    challenge: "Brooklyn Auto Works, a third-generation shop, was invisible at #19 on Google Maps. Franchise chains dominated with 500+ reviews and massive marketing budgets. Their Google profile hadn't been updated in 4 years, and they had just 12 reviews. Monthly leads from Google had dropped 55% as chains pushed them further down.",
    solution: "We developed a NYC-specific strategy emphasising the family-owned, honest-mechanic angle that resonates with Brooklyn's community-focused culture. Combined with Yelp integration, Better Business Bureau citations, and a guerrilla review campaign using QR codes on invoices.",
    results: "In 8 weeks, Brooklyn Auto Works climbed from #19 to #1 on Google Maps for Williamsburg auto repair keywords. Monthly calls increased by 320%, and weekend bookings went from 30% to 100% capacity. Revenue grew 70% in the first quarter.",
    stats: [
      { label: "Ranking Improvement", value: "#19 → #1", color: "text-google-green" },
      { label: "Monthly Calls", value: "+320%", color: "text-google-blue" },
      { label: "Weekend Capacity", value: "100%", color: "text-google-red" },
      { label: "Revenue Growth", value: "+70%", color: "text-google-yellow" },
      { label: "Review Growth", value: "12 → 110", color: "text-google-green" },
      { label: "Booking Rate", value: "100%", color: "text-google-blue" },
    ],
    timeline: [
      { week: "Week 1-2", title: "NYC Market Analysis", description: "Analysed top 20 auto repair competitors across Williamsburg, Greenpoint, and Bushwick. Mapped Yelp, BBB, and NYC-specific directories.", color: "bg-google-blue" },
      { week: "Week 3-4", title: "Brand & Profile Overhaul", description: "Rebuilt profile highlighting family heritage, ASE certifications, and borough-specific messaging. Added NYC DOT inspection services.", color: "bg-google-red" },
      { week: "Week 5-6", title: "Citation & Review Blitz", description: "Submitted to Yelp, BBB, Angi, and 80+ US directories. Launched QR code review cards on invoices achieving 30% conversion.", color: "bg-google-yellow" },
      { week: "Week 7-8", title: "Results & Expansion", description: "Achieved #1 ranking. Expanded targeting to Greenpoint and Bushwick. Documented 320% call increase.", color: "bg-google-green" },
    ],
    strategies: [
      { title: "Borough-Specific Messaging", description: "Positioned as Williamsburg's trusted family mechanic vs. impersonal chain shops, resonating with the community-focused Brooklyn market." },
      { title: "Yelp + Google Dual Strategy", description: "In NYC, Yelp is as important as Google Maps. We optimised both platforms simultaneously for maximum local visibility." },
      { title: "NYC DOT & Inspection Keywords", description: "Targeted NYC-specific searches like 'NYS inspection Williamsburg' that chains overlooked, capturing high-intent local traffic." },
    ],
    testimonialQuote: "My grandfather opened this shop in 1968. For the first time, we're not just surviving against the chains — we're the #1 choice in Williamsburg. GMB Optimizers made our story our biggest competitive advantage.",
    testimonialAuthor: "Tony Russo",
    testimonialRole: "Owner, Brooklyn Auto Works",
    duration: "8 weeks",
    startRank: "#19",
    endRank: "#1",
    countries: ["us"],
  },
  {
    slug: "manchester-bakery",
    business: "Charlotte's Artisan Bakery",
    industry: "Food & Beverage",
    location: "Northern Quarter, Manchester, UK",
    image: "/images/case-study-uk-bakery.jpg",
    imageAlt: "Artisan bakery storefront with Google Maps listing",
    ownerImage: "/images/owner-charlotte-baker.png",
    summary: "An independent artisan bakery in Manchester's Northern Quarter was being overshadowed by larger chains. Our local-first optimisation strategy made them the #1 bakery in the area.",
    challenge: "Charlotte's Artisan Bakery had award-winning sourdough but ranked #17 on Google Maps. Foot traffic relied entirely on regulars. With only 28 reviews and an outdated GBP, weekend tourists couldn't find them. Monthly searches for 'bakery near me' Manchester were going to Greggs and Costa.",
    solution: "We rebuilt the profile around speciality categories (sourdough bakery, artisan patisserie, coffee shop), launched a QR-code review programme on receipts, and ran weekly Google Posts featuring daily bakes and seasonal specials.",
    results: "Within 9 weeks, Charlotte's hit #1 for 'artisan bakery Manchester' and top 3 for 6 related keywords. Weekend foot traffic doubled, monthly Google Maps views went from 1,800 to 14,000, and revenue grew 80%.",
    stats: [
      { label: "Ranking Improvement", value: "#17 → #1", color: "text-google-green" },
      { label: "Maps Views", value: "+678%", color: "text-google-blue" },
      { label: "Weekend Traffic", value: "+100%", color: "text-google-red" },
      { label: "Revenue Growth", value: "+80%", color: "text-google-yellow" },
      { label: "Review Growth", value: "28 → 175", color: "text-google-green" },
      { label: "ROI First Year", value: "11x", color: "text-google-blue" },
    ],
    timeline: [
      { week: "Week 1-2", title: "UK Bakery Audit", description: "Benchmarked 12 Manchester bakeries across Yell, TripAdvisor, and Google. Identified speciality keyword gaps.", color: "bg-google-blue" },
      { week: "Week 3-4", title: "Profile Rebuild", description: "Professional food photography, multi-category optimisation, reservation links, and product highlights.", color: "bg-google-red" },
      { week: "Week 5-7", title: "Review Engine", description: "QR-code receipts and SMS follow-ups achieved 18+ reviews per week.", color: "bg-google-yellow" },
      { week: "Week 8-9", title: "Authority Content", description: "Weekly 'Bake of the Week' Posts and seasonal launches drove 4x engagement.", color: "bg-google-green" },
    ],
    strategies: [
      { title: "Speciality Category Stack", description: "Layered sourdough, patisserie, and coffee categories to capture multiple search intents." },
      { title: "Visual-First Strategy", description: "Daily fresh-bake photos posted via Google Posts created an irresistible feed for hungry searchers." },
      { title: "Receipt QR Reviews", description: "Physical QR codes on every receipt converted at 32% — 5x the bakery industry average." },
    ],
    testimonialQuote: "We bake the best sourdough in Manchester but nobody could find us. GMB Optimizers changed everything. We now have queues out the door every Saturday morning.",
    testimonialAuthor: "Charlotte Baker",
    testimonialRole: "Owner & Head Baker, Charlotte's Artisan Bakery",
    duration: "9 weeks",
    startRank: "#17",
    endRank: "#1",
    countries: ["uk"],
  },
  {
    slug: "manchester-accountants",
    business: "Davies & Partners Accountants",
    industry: "Finance",
    location: "Spinningfields, Manchester, UK",
    image: "/images/case-study-uk-accountant.jpg",
    imageAlt: "Modern UK accountancy firm office with Google Maps overlay",
    ownerImage: "/images/owner-nigel-davies.png",
    summary: "A mid-sized chartered accountancy firm in Manchester needed more SME clients. Our compliance-aware optimisation strategy delivered a tax-season boom.",
    challenge: "Davies & Partners ranked #21 for 'accountants Manchester' despite being chartered ICAEW members. Larger firms like KPMG and BDO dominated. Their profile lacked service detail, had only 16 reviews, and ignored Yell, FreeIndex, and Bark — key UK directories for accountancy referrals.",
    solution: "We deployed a UK finance-specific strategy: ICAEW-compliant review collection, service categorisation across self-assessment, VAT, and limited-company services, and a citation network across Yell, FreeIndex, Bark, and Companies House-linked directories.",
    results: "In 12 weeks, Davies & Partners hit #1 for 'chartered accountant Manchester' and top 3 for 9 service keywords. Tax-season enquiries increased 240%, and they signed 38 new SME clients in Q1.",
    stats: [
      { label: "Ranking Improvement", value: "#21 → #1", color: "text-google-green" },
      { label: "Tax Season Enquiries", value: "+240%", color: "text-google-blue" },
      { label: "New SME Clients", value: "38 / Q1", color: "text-google-red" },
      { label: "Ad Savings", value: "£4,200/mo", color: "text-google-yellow" },
      { label: "Review Growth", value: "16 → 140", color: "text-google-green" },
      { label: "Top 3 Keywords", value: "9", color: "text-google-blue" },
    ],
    timeline: [
      { week: "Week 1-3", title: "Finance Industry Audit", description: "Mapped 18 Manchester accountancy firms across Google, Yell, and FreeIndex. Identified compliance constraints under ICAEW guidance.", color: "bg-google-blue" },
      { week: "Week 4-6", title: "Profile & Citations", description: "Added 7 service categories, rebuilt service descriptions, submitted to 50+ UK finance directories.", color: "bg-google-red" },
      { week: "Week 7-9", title: "Review Programme", description: "ICAEW-compliant client satisfaction surveys funnelled happy clients to Google reviews.", color: "bg-google-yellow" },
      { week: "Week 10-12", title: "Authority Content", description: "Bi-weekly Google Posts on Making Tax Digital, IR35, and SME tax tips established thought leadership.", color: "bg-google-green" },
    ],
    strategies: [
      { title: "ICAEW-Compliant Reviews", description: "Designed a review funnel that respected chartered-accountant advertising rules while maximising review velocity." },
      { title: "UK Finance Directory Network", description: "Built citations across Yell, FreeIndex, Bark, and accountancy-specific UK platforms." },
      { title: "Tax Season Content Calendar", description: "Pre-loaded content for self-assessment deadlines drove enquiries 6 weeks before competitors started posting." },
    ],
    testimonialQuote: "GMB Optimizers understood the regulatory landscape and delivered without ever risking our ICAEW standing. Our best tax season in 22 years.",
    testimonialAuthor: "Nigel Davies",
    testimonialRole: "Managing Partner, Davies & Partners",
    duration: "12 weeks",
    startRank: "#21",
    endRank: "#1",
    countries: ["uk"],
  },
  {
    slug: "austin-coffee-roastery",
    business: "Mendez Coffee Roasters",
    industry: "Food & Beverage",
    location: "East Austin, TX",
    image: "/images/case-study-us-coffee.jpg",
    imageAlt: "Austin coffee roastery interior with Google Maps listing",
    ownerImage: "/images/owner-carlos-mendez.png",
    summary: "A specialty coffee roastery in East Austin was buried beneath Starbucks locations. Our specialty-coffee optimization made them Austin's top-ranked roaster.",
    challenge: "Mendez Coffee Roasters had award-winning beans but ranked #24 on Google Maps. Starbucks dominated 8 of the top 10 spots. With 34 reviews vs. competitor averages of 600+, they were invisible to Austin's coffee-obsessed locals.",
    solution: "We positioned Mendez as Austin's authentic specialty roaster, leveraging Yelp + Google dual optimization, Instagram-linked posts, and a barista-led review collection system with NFC tap cards on every table.",
    results: "In 10 weeks, Mendez hit #1 for 'specialty coffee Austin' and 'coffee roaster Austin'. Walk-in traffic tripled, wholesale bean orders to local restaurants grew 220%, and their roastery tour bookings sold out 6 weeks in advance.",
    stats: [
      { label: "Ranking Improvement", value: "#24 → #1", color: "text-google-green" },
      { label: "Walk-in Traffic", value: "+200%", color: "text-google-blue" },
      { label: "Wholesale Orders", value: "+220%", color: "text-google-red" },
      { label: "Tour Bookings", value: "Sold Out", color: "text-google-yellow" },
      { label: "Review Growth", value: "34 → 210", color: "text-google-green" },
      { label: "Revenue Growth", value: "+145%", color: "text-google-blue" },
    ],
    timeline: [
      { week: "Week 1-2", title: "Austin Coffee Audit", description: "Analyzed 22 Austin coffee shops across Google, Yelp, and Instagram. Mapped specialty-coffee keyword gaps.", color: "bg-google-blue" },
      { week: "Week 3-4", title: "Visual & Brand Rebuild", description: "Professional roastery photography, bean origin stories, and barista team highlights uploaded.", color: "bg-google-red" },
      { week: "Week 5-7", title: "NFC Review System", description: "NFC tap cards on every table converted 35% of visitors to reviewers.", color: "bg-google-yellow" },
      { week: "Week 8-10", title: "Content & Tours", description: "Weekly bean-origin Google Posts and roastery tour announcements drove engagement.", color: "bg-google-green" },
    ],
    strategies: [
      { title: "Specialty Positioning", description: "Highlighted single-origin beans and direct-trade relationships to differentiate from chain coffee." },
      { title: "Yelp + Google Dual Stack", description: "Austin coffee searchers use both platforms heavily; we optimized in parallel for full visibility." },
      { title: "NFC Tap Reviews", description: "Tap-to-review cards on tables hit 35% conversion — the highest we've recorded in coffee retail." },
    ],
    testimonialQuote: "We roast better coffee than Starbucks but nobody knew we existed. GMB Optimizers put us on the map — literally. Now we're Austin's #1 roaster.",
    testimonialAuthor: "Carlos Mendez",
    testimonialRole: "Founder & Head Roaster, Mendez Coffee Roasters",
    duration: "10 weeks",
    startRank: "#24",
    endRank: "#1",
    countries: ["us"],
  },
  {
    slug: "chicago-hvac",
    business: "Williams Premier HVAC",
    industry: "Home Services",
    location: "Naperville, IL",
    image: "/images/case-study-us-hvac.jpg",
    imageAlt: "HVAC service van and technicians in Chicago suburb",
    ownerImage: "/images/owner-tasha-williams.png",
    summary: "A woman-owned HVAC service in suburban Chicago was losing emergency calls to national franchises. Our 24/7 emergency optimization strategy made them the #1 HVAC service in Naperville.",
    challenge: "Williams Premier HVAC ranked #16 for 'HVAC near me' in Naperville. National franchises with massive ad budgets dominated emergency searches — when a furnace fails at 2am, people pick the top result. With 41 reviews vs. franchise competitors at 800+, they were losing 70% of emergency calls.",
    solution: "We engineered an emergency-services strategy: 24/7 service flagging on GBP, instant-response Google Posts during weather events, BBB and Angi citation building, and a tablet-based review collection done by technicians at job completion.",
    results: "In 8 weeks, Williams hit #1 for 'emergency HVAC Naperville' and top 3 across 10 service keywords. Emergency call volume increased 380%, and they added 4 new service trucks to keep up with demand.",
    stats: [
      { label: "Ranking Improvement", value: "#16 → #1", color: "text-google-green" },
      { label: "Emergency Calls", value: "+380%", color: "text-google-blue" },
      { label: "Service Trucks", value: "4 added", color: "text-google-red" },
      { label: "Revenue Growth", value: "+165%", color: "text-google-yellow" },
      { label: "Review Growth", value: "41 → 220", color: "text-google-green" },
      { label: "Avg Response Time", value: "42 min", color: "text-google-blue" },
    ],
    timeline: [
      { week: "Week 1-2", title: "HVAC Market Audit", description: "Mapped 24 HVAC competitors across DuPage County. Identified emergency-keyword gaps in franchise strategies.", color: "bg-google-blue" },
      { week: "Week 3-4", title: "Emergency Optimization", description: "24/7 hour flagging, emergency service categorization, and instant-call buttons configured.", color: "bg-google-red" },
      { week: "Week 5-6", title: "Citation & Review Blitz", description: "Submitted to BBB, Angi, HomeAdvisor, and 90+ US home-services directories.", color: "bg-google-yellow" },
      { week: "Week 7-8", title: "Weather-Triggered Posts", description: "Automated Google Posts during cold snaps drove emergency call spikes.", color: "bg-google-green" },
    ],
    strategies: [
      { title: "24/7 Emergency Flagging", description: "Configured Google Business hours and attributes to dominate after-hours emergency searches." },
      { title: "Weather-Triggered Posts", description: "Pre-built Google Posts deployed automatically during weather events captured emergency demand spikes." },
      { title: "Technician Tablet Reviews", description: "Technicians collected reviews on tablets at job completion, achieving 48% conversion." },
    ],
    testimonialQuote: "As a Black woman in HVAC, I never thought we'd outrank the national franchises. GMB Optimizers made it happen. Our phones don't stop ringing.",
    testimonialAuthor: "Tasha Williams",
    testimonialRole: "Founder & CEO, Williams Premier HVAC",
    duration: "8 weeks",
    startRank: "#16",
    endRank: "#1",
    countries: ["us"],
  },
];

// Assign countries to original AU case studies
caseStudies[0].countries = ["au"];       // Melbourne Dental Clinic
caseStudies[1].countries = ["au"];       // Sydney Auto Repair
caseStudies[2].countries = ["au"];       // Brisbane Law Firm
caseStudies[3].countries = ["au"];       // Rossi's Italian Kitchen - Melbourne
caseStudies[4].countries = ["au"];       // Coastal Realty Group - Sydney
caseStudies[5].countries = ["au"];       // Ironclad Fitness - Gold Coast

export const getCaseStudyBySlug = (slug: string) => caseStudies.find(c => c.slug === slug);

/** Get case studies for a specific country. Shows country-specific first, then others. */
export const getCaseStudiesForCountry = (countryCode: string): typeof caseStudies => {
  const local = caseStudies.filter((c) => c.countries?.includes(countryCode));
  const global = caseStudies.filter((c) => !c.countries || !c.countries.includes(countryCode));
  return [...local, ...global];
};
