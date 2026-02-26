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
    testimonialQuote: "GB Optimizers didn't just improve our ranking — they transformed our entire patient acquisition model. We went from relying on expensive ads to having patients find us organically. The ROI has been extraordinary.",
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
    testimonialQuote: "My grandfather started this shop in 1972. For the first time in years, we're not just surviving against the big chains — we're thriving. GB Optimizers understood our story and made it our competitive advantage.",
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
    testimonialQuote: "We were pouring money into ads with declining results. GB Optimizers showed us a better way. We now get more qualified leads from Google Maps than we ever did from $8,000/month in advertising. The firm has grown 40% since we started.",
    testimonialAuthor: "Michael Torres",
    testimonialRole: "Managing Partner, Brisbane Law Firm",
    duration: "14 weeks",
    startRank: "#18",
    endRank: "#1",
  },
];

export const getCaseStudyBySlug = (slug: string) => caseStudies.find(c => c.slug === slug);
