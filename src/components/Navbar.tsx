import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import logoImg from "@/assets/logo-dc.jpeg";
import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const polymerLinks = [
  { label: "Polypropylene (PP)", to: "/products/pp" },
  { label: "Polyethylene (PE)", to: "/products/pe" },
  { label: "PVC", to: "/products/pvc" },
  { label: "PET", to: "/products/pet" },
];

const textileLinks = [
  { label: "Vimal Gifting", to: "/textiles/vimal-gifting" },
  { label: "Vimal Suitings", to: "/textiles/vimal-suitings" },
  { label: "Uniforms", to: "/textiles/uniforms" },
  { label: "100% Polyester Suiting", to: "/textiles/polyester-suiting" },
  { label: "Georgia Gullini", to: "/textiles/georgia-gullini" },
];

const alokLinks = [
  { label: "Wovens", to: "/alok/wovens" },
  { label: "Knits", to: "/alok/knits" },
  { label: "Yarns", to: "/alok/yarns" },
  { label: "Furnishing", to: "/alok/furnishing" },
  { label: "Embroideries", to: "/alok/embroideries" },
];

const simpleLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Reliance", to: "/reliance" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
];

const DropdownMenu = ({ label, links, location }: { label: string; links: { label: string; to: string }[]; location: ReturnType<typeof useLocation> }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isActive = links.some((l) => location.pathname === l.to);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 text-foreground/80 text-sm px-3.5 py-2 rounded-md transition-colors hover:bg-secondary hover:text-primary ${isActive ? "bg-secondary text-primary font-semibold" : ""}`}
      >
        {label} <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-background border border-brand-gray-200 rounded-lg shadow-xl py-2 min-w-[220px] z-50">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`block px-4 py-2.5 text-sm transition-colors hover:bg-secondary ${
                location.pathname === link.to ? "text-primary font-semibold bg-secondary" : "text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-background sticky top-0 z-50 shadow-md border-b border-border">
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 py-4 no-underline">
          <img src={logoImg} alt="Devisahai Charan Dass Associates" className="w-10 h-10 rounded-lg object-cover" />
          <div className="text-foreground">
            <strong className="block text-sm font-bold leading-tight">Devisahai Charan Dass</strong>
            <span className="text-[0.7rem] text-muted-foreground font-normal">Authorised DCA – Reliance Industries Ltd.</span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          <Link
            to="/"
            className={`text-foreground/80 text-sm px-3.5 py-2 rounded-md transition-colors hover:bg-secondary hover:text-primary ${location.pathname === "/" ? "bg-secondary text-primary font-semibold" : ""}`}
          >
            Home
          </Link>
          <DropdownMenu label="Polymers" links={polymerLinks} location={location} />
          <DropdownMenu label="Textiles" links={textileLinks} location={location} />
          <DropdownMenu label="Alok Industries" links={alokLinks} location={location} />
          {simpleLinks.filter(l => l.to !== "/").map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`text-foreground/80 text-sm px-3.5 py-2 rounded-md transition-colors hover:bg-secondary hover:text-primary ${location.pathname === link.to ? "bg-secondary text-primary font-semibold" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center gap-2 bg-destructive text-destructive-foreground text-sm font-semibold px-5 py-2.5 rounded-md hover:bg-brand-gold-dark transition-colors"
          >
            Contact Us <ArrowRight className="w-4 h-4" />
          </Link>
           <button
            className="lg:hidden text-foreground p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-background border-t border-border px-6 pb-4 max-h-[80vh] overflow-y-auto">
          <Link to="/" className="block text-sm py-2.5 text-foreground/80 hover:text-primary" onClick={() => setMobileOpen(false)}>Home</Link>
          
          <div className="py-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Polymers</span>
            {polymerLinks.map((link) => (
              <Link key={link.to} to={link.to} className={`block text-sm py-2 pl-3 transition-colors ${location.pathname === link.to ? "text-primary font-semibold" : "text-foreground/80 hover:text-primary"}`} onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="py-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Textiles</span>
            {textileLinks.map((link) => (
              <Link key={link.to} to={link.to} className={`block text-sm py-2 pl-3 transition-colors ${location.pathname === link.to ? "text-primary font-semibold" : "text-foreground/80 hover:text-primary"}`} onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            ))}
          </div>

          
          {simpleLinks.filter(l => l.to !== "/").map((link) => (
            <Link key={link.label} to={link.to} className={`block text-sm py-2.5 transition-colors ${location.pathname === link.to ? "text-primary font-semibold" : "text-foreground/80 hover:text-primary"}`} onClick={() => setMobileOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link to="/contact" className="mt-2 w-full flex items-center justify-center gap-2 bg-destructive text-destructive-foreground text-sm font-semibold px-5 py-2.5 rounded-md" onClick={() => setMobileOpen(false)}>
            Contact Us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
