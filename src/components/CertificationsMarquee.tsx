const certifications = [
  { name: "Google Certified", color: "#4285F4", logo: "https://cdn.simpleicons.org/google/4285F4" },
  { name: "Meta Certified", color: "#0081FB", logo: "https://cdn.simpleicons.org/meta/0081FB" },
  { name: "Trusted by PayPal", color: "#003087", logo: "https://cdn.simpleicons.org/paypal/003087" },
  { name: "Trusted by Stripe", color: "#635BFF", logo: "https://cdn.simpleicons.org/stripe/635BFF" },
  { name: "SEMrush Certified", color: "#FF622D", logo: "https://cdn.simpleicons.org/semrush/FF622D" },
  { name: "HubSpot Partner", color: "#FF7A59", logo: "https://cdn.simpleicons.org/hubspot/FF7A59" },
  { name: "Shopify Partner", color: "#96BF48", logo: "https://cdn.simpleicons.org/shopify/96BF48" },
  { name: "BrightLocal Partner", color: "#1B98F5", logo: "https://cdn.simpleicons.org/google/1B98F5" },
  { name: "AWS Certified", color: "#FF9900", logo: "https://cdn.simpleicons.org/amazonaws/FF9900" },
];

const MarqueeRow = ({ reverse = false }: { reverse?: boolean }) => {
  const items = reverse ? certifications.slice().reverse() : certifications;
  return (
    <div className={`flex ${reverse ? "animate-marquee-reverse" : "animate-marquee"} whitespace-nowrap`}>
      {[...items, ...items].map((cert, i) => (
        <span key={i} className="mx-8 md:mx-12 inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.12em]">
          <img src={cert.logo} alt={cert.name} className="w-5 h-5 shrink-0" loading="lazy" />
          <span style={{ color: cert.color }}>{cert.name}</span>
        </span>
      ))}
    </div>
  );
};

const CertificationsMarquee = ({ className = "" }: { className?: string }) => (
  <div className={`py-4 overflow-hidden space-y-3 ${className}`}>
    <MarqueeRow />
    <MarqueeRow reverse />
  </div>
);

export default CertificationsMarquee;
