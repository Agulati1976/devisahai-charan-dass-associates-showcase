import { Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-brand-gray-900 text-primary-foreground/75 text-sm">
    <div className="w-full">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.5!2d77.2!3d28.64!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741d057%3A0xcdee88e47393c3f1!2sDevisahai%20Charan%20Dass%20Associates!5e0!3m2!1sen!2sin!4v1700000000000"
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Devisahai Charan Dass Associates Location"
        className="grayscale hover:grayscale-0 transition-all duration-500"
      />
    </div>
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
          <li><Link to="/products/pp" className="text-primary-foreground/65 hover:text-primary-foreground transition-colors">Repol® PP</Link></li>
          <li><Link to="/products/pe" className="text-primary-foreground/65 hover:text-primary-foreground transition-colors">Relene® HDPE</Link></li>
          <li><Link to="/products/pe" className="text-primary-foreground/65 hover:text-primary-foreground transition-colors">Relene® LLDPE</Link></li>
          <li><Link to="/products/pvc" className="text-primary-foreground/65 hover:text-primary-foreground transition-colors">Reon® PVC</Link></li>
          <li><Link to="/products/pet" className="text-primary-foreground/65 hover:text-primary-foreground transition-colors">Relpet® PET</Link></li>
        </ul>
      </div>
      <div>
        <h5 className="text-primary-foreground font-bold text-sm mb-4">Textiles</h5>
        <ul className="space-y-2">
          <li><Link to="/textiles/vimal-gifting" className="text-primary-foreground/65 hover:text-primary-foreground transition-colors">Only Vimal® Gifting</Link></li>
          <li><Link to="/textiles/vimal-suitings" className="text-primary-foreground/65 hover:text-primary-foreground transition-colors">Vimal Suitings</Link></li>
          <li><Link to="/textiles/georgia-gullini" className="text-primary-foreground/65 hover:text-primary-foreground transition-colors">Georgia Gullini®</Link></li>
          <li><Link to="/textiles/uniforms" className="text-primary-foreground/65 hover:text-primary-foreground transition-colors">Uniform Fabrics</Link></li>
          <li><Link to="/textiles/polyester-suiting" className="text-primary-foreground/65 hover:text-primary-foreground transition-colors">Polyester Suiting</Link></li>
        </ul>
      </div>
      <div>
        <h5 className="text-primary-foreground font-bold text-sm mb-4">Quick Links</h5>
        <ul className="space-y-2">
          <li><Link to="/about" className="text-primary-foreground/65 hover:text-primary-foreground transition-colors">About Us</Link></li>
          <li><Link to="/products" className="text-primary-foreground/65 hover:text-primary-foreground transition-colors">All Products</Link></li>
          <li><Link to="/reliance" className="text-primary-foreground/65 hover:text-primary-foreground transition-colors">Reliance</Link></li>
          <li><Link to="/contact" className="text-primary-foreground/65 hover:text-primary-foreground transition-colors">Contact Us</Link></li>
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
