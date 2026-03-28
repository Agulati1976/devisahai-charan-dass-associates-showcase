import { Phone, Mail, MapPin } from "lucide-react";

const Topbar = () => (
  <div className="bg-brand-blue-dark text-primary-foreground/80 text-xs py-1.5 px-6 flex justify-between items-center">
    <div className="flex items-center gap-4 flex-wrap">
      <span className="flex items-center gap-1.5">
        <Phone className="w-3 h-3" /> +91 98101 00045
      </span>
      <span className="flex items-center gap-1.5">
        <Mail className="w-3 h-3" /> info@devisahaicharandass.com
      </span>
      <span className="flex items-center gap-1.5">
        <MapPin className="w-3 h-3" /> New Delhi, India
      </span>
    </div>
    <div className="hidden md:flex gap-4">
      <a href="#" className="hover:text-primary-foreground transition-colors">Client Login</a>
      <a href="#" className="hover:text-primary-foreground transition-colors">Track Order</a>
      <a href="#" className="hover:text-primary-foreground transition-colors">Download Catalogue</a>
    </div>
  </div>
);

export default Topbar;
