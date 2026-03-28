import { Mail, Phone } from "lucide-react";

const Footer = () => (
  <footer className="bg-brand-gray-900 text-primary-foreground/75 text-sm">
    <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-6 py-12">
      <div>
        <strong className="block text-primary-foreground text-base mb-1">Devisahai Charan Dass Associates</strong>
        <span className="inline-block bg-destructive text-destructive-foreground text-[0.68rem] font-bold px-2 py-0.5 rounded mb-3">
          Authorised DCA – Reliance Industries Ltd.
        </span>
        <p className="leading-relaxed mb-4">
          India's largest Del Credere Agent for Reliance Textiles and a leading distributor for Reliance Polymers — building supply chains since 1972.
        </p>
        <div className="space-y-1.5">
          <a href="mailto:info@devisahaicharandass.com" className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
            <Mail className="w-3.5 h-3.5" /> info@devisahaicharandass.com
          </a>
          <a href="tel:+919810100045" className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
            <Phone className="w-3.5 h-3.5" /> +91 98101 00045
          </a>
        </div>
      </div>
      <div>
        <h5 className="text-primary-foreground font-bold text-sm mb-4">Polymers</h5>
        <ul className="space-y-2">
          {["Repol® PP", "Relene® HDPE", "Relene® LLDPE", "Reon® PVC", "Relpet® PET", "Relpipe® Pipes"].map((item) => (
            <li key={item}><a href="#polymers" className="text-primary-foreground/65 hover:text-primary-foreground transition-colors">{item}</a></li>
          ))}
        </ul>
      </div>
      <div>
        <h5 className="text-primary-foreground font-bold text-sm mb-4">Textiles</h5>
        <ul className="space-y-2">
          {["Only Vimal® Gifting", "Georgia Gullini®", "Uniform Fabrics", "Performance Fabrics", "Worsted Suitings"].map((item) => (
            <li key={item}><a href="#textiles" className="text-primary-foreground/65 hover:text-primary-foreground transition-colors">{item}</a></li>
          ))}
        </ul>
      </div>
      <div>
        <h5 className="text-primary-foreground font-bold text-sm mb-4">Quick Links</h5>
        <ul className="space-y-2">
          {["About Us", "RFQ Portal", "Market Prices", "Download Brochure", "Careers", "Contact Us"].map((item) => (
            <li key={item}><a href="#" className="text-primary-foreground/65 hover:text-primary-foreground transition-colors">{item}</a></li>
          ))}
        </ul>
      </div>
    </div>
    <div className="border-t border-primary-foreground/10 max-w-[1200px] mx-auto px-6 py-4 flex justify-between items-center flex-wrap gap-3 text-xs">
      <span>© 2025 Devisahai Charan Dass Associates. All Rights Reserved.</span>
      <span className="bg-destructive text-destructive-foreground text-[0.72rem] font-bold px-2.5 py-1 rounded">
        Reliance Industries – Authorised DCA since 1972
      </span>
      <span>Privacy Policy · Terms of Use</span>
    </div>
  </footer>
);

export default Footer;
