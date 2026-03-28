import { FileText, Menu } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  onOpenRFQ: (product: string, grade: string, cat: string) => void;
}

const Navbar = ({ onOpenRFQ }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-primary sticky top-0 z-50 shadow-lg shadow-primary/25">
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 py-4 no-underline">
          <div className="w-10 h-10 rounded-lg bg-primary-foreground flex items-center justify-center font-extrabold text-primary text-sm tracking-tighter">
            DC
          </div>
          <div className="text-primary-foreground">
            <strong className="block text-sm font-bold leading-tight">Devisahai Charan Dass</strong>
            <span className="text-[0.7rem] opacity-75 font-normal">Authorised DCA – Reliance Industries Ltd.</span>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-1">
          {[
            { label: "Home", href: "#", active: true },
            { label: "Polymers", href: "#polymers" },
            { label: "Textiles", href: "#textiles" },
            { label: "About", href: "#why-us" },
            { label: "Market Prices", href: "#" },
            { label: "Contact", href: "#contact" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-primary-foreground/90 text-sm px-3.5 py-2 rounded-md transition-colors hover:bg-primary-foreground/15 hover:text-primary-foreground ${
                link.active ? "bg-primary-foreground/20 text-primary-foreground" : ""
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenRFQ("General Enquiry", "All Products", "General")}
            className="hidden sm:inline-flex items-center gap-2 bg-destructive text-destructive-foreground text-sm font-semibold px-5 py-2.5 rounded-md hover:bg-brand-red-dark transition-colors"
          >
            <FileText className="w-4 h-4" />
            Request for Quotation
          </button>
          <button
            className="lg:hidden text-primary-foreground p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-primary border-t border-primary-foreground/10 px-6 pb-4">
          {["Home", "Polymers", "Textiles", "About", "Market Prices", "Contact"].map((label) => (
            <a
              key={label}
              href="#"
              className="block text-primary-foreground/90 text-sm py-2.5 hover:text-primary-foreground transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </a>
          ))}
          <button
            onClick={() => { onOpenRFQ("General Enquiry", "All Products", "General"); setMobileOpen(false); }}
            className="mt-2 w-full flex items-center justify-center gap-2 bg-destructive text-destructive-foreground text-sm font-semibold px-5 py-2.5 rounded-md"
          >
            <FileText className="w-4 h-4" /> Request for Quotation
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
