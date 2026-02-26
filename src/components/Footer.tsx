const Footer = () => {
  return (
    <footer className="border-t border-border py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-gradient-google">GB</span> Optimizers
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Dominating Google Maps for businesses worldwide.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground uppercase text-sm tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {["About", "Services", "Pricing", "Case Studies", "Contact"].map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase().replace(" ", "-")}`} className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground uppercase text-sm tracking-wider">Packages</h4>
            <ul className="space-y-2 text-sm">
              {["Basic", "Premium", "Advance", "Enterprise"].map((p) => (
                <li key={p}>
                  <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground uppercase text-sm tracking-wider">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">© 2026 GB Optimizers. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
