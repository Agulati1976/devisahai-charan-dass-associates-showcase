import { Phone, Mail, MapPin } from "lucide-react";

const Topbar = () => (
  <div className="bg-brand-blue-dark text-primary-foreground/80 text-xs py-1.5 px-6 flex justify-between items-center">
    <div className="flex items-center gap-4 flex-wrap">
      <a href="tel:+919810100045" className="flex items-center gap-1.5 hover:text-primary-foreground transition-colors">
        <Phone className="w-3 h-3" /> +91 98101 00045
      </a>
      <a href="mailto:info@devisahaicharandass.com" className="flex items-center gap-1.5 hover:text-primary-foreground transition-colors">
        <Mail className="w-3 h-3" /> info@devisahaicharandass.com
      </a>
      <span className="flex items-center gap-1.5">
        <MapPin className="w-3 h-3" /> New Delhi, India
      </span>
    </div>
  </div>
);

export default Topbar;
