import { useOutletContext, Link } from "react-router-dom";
import {
  FileText, CheckCircle2, ChevronRight, Package, Award, Truck,
  Users, Cog, Shield, ArrowRight
} from "lucide-react";
import petImage from "@/assets/pet.jpg";

interface ContextType {
  openRFQ: (product: string, grade: string, cat: string) => void;
}

const relpetGrades = [
  "Relpet® G5761",
  "Relpet® G5801",
  "Relpet® G5841",
  "Relpet® H7761",
  "Relpet® QH5821",
];

const features = [
  "High strength with excellent clarity",
  "Consistent intrinsic viscosity (IV) for reliable processing",
  "Excellent processability in ISBM (Injection Stretch Blow Moulding)",
  "Strong chemical and moisture resistance",
  "Food-contact compliant",
  "Lightweight and fully recyclable",
];

const applications = [
  "Packaged drinking water bottles",
  "Carbonated soft drink (CSD) bottles",
  "Juice and dairy beverage bottles",
  "Sports and energy drink bottles",
  "Edible oil bottles",
  "Food-grade liquid packaging",
];

const whyUs = [
  { icon: Award, label: "Authorised DCA of Reliance Industries Limited" },
  { icon: Package, label: "Assured supply of genuine RELPET® grades" },
  { icon: Shield, label: "Strong coordination with Reliance for priority allocations" },
  { icon: Cog, label: "Market intelligence and technical understanding" },
  { icon: Truck, label: "Timely delivery and dependable service" },
  { icon: Users, label: "Long-term partnership approach" },
];

const PETProduct = () => {
  const { openRFQ } = useOutletContext<ContextType>();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={petImage} alt="PET resin granules" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/60" />
        </div>
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-24">
          <nav className="flex items-center gap-2 text-xs text-primary-foreground/60 mb-6">
            <Link to="/" className="hover:text-primary-foreground">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/products" className="hover:text-primary-foreground">Products</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary-foreground">PET Resin</span>
          </nav>
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-3">Polymers Division</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-4 text-balance">
            PET – Bottle Grade Solutions
          </h1>
          <p className="text-base max-w-2xl leading-relaxed mb-8" style={{ color: "hsl(0 0% 100% / 0.75)" }}>
            High-performance thermoplastic for rigid packaging. Known for strength, clarity, chemical resistance, and recyclability — the preferred material for safe, lightweight, and sustainable bottle packaging.
          </p>
          <button
            onClick={() => openRFQ("PET Resin", "RELPET® Bottle Grade", "Polymers")}
            className="inline-flex items-center gap-2 bg-destructive text-destructive-foreground font-bold px-7 py-3.5 rounded-lg shadow-lg shadow-destructive/35 hover:bg-brand-gold-dark hover:-translate-y-0.5 transition-all"
          >
            <FileText className="w-4 h-4" /> Request for Quotation
          </button>
        </div>
      </section>

      {/* Available Grades */}
      <section className="max-w-[1200px] mx-auto py-16 px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-2">Available Grades</span>
            <h2 className="text-3xl font-extrabold text-primary mb-4">RELPET® Bottle Grade PET</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We supply the following RELPET® Bottle Grade materials, engineered for high-performance bottle manufacturing and widely used across beverage and food packaging industries.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {relpetGrades.map((g) => (
                <div key={g} className="bg-secondary border border-brand-gray-200 rounded-lg p-4 flex items-center gap-3">
                  <Package className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm font-bold text-foreground">{g}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-2">Key Features</span>
            <h2 className="text-3xl font-extrabold text-primary mb-4">Product Highlights</h2>
            <div className="space-y-2.5">
              {features.map((f) => (
                <div key={f} className="flex items-start gap-3 bg-card border border-brand-gray-200 rounded-lg p-3.5">
                  <CheckCircle2 className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-foreground">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="bg-brand-gray-50 py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-2">Use Cases</span>
          <h2 className="text-3xl font-extrabold text-primary mb-8">Applications</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {applications.map((a) => (
              <div key={a} className="flex items-center gap-3 bg-background border border-brand-gray-200 rounded-lg p-4 hover:border-primary transition-colors">
                <CheckCircle2 className="w-5 h-5 text-destructive flex-shrink-0" />
                <span className="text-sm font-semibold text-foreground">{a}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="max-w-[1200px] mx-auto py-16 px-6">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-2">Why Choose Us</span>
        <h2 className="text-3xl font-extrabold text-primary mb-4">Why Devi Sahai Charan Dass Associates?</h2>
        <p className="text-muted-foreground leading-relaxed max-w-3xl mb-8">
          Committed to delivering premium RELPET® Bottle Grade solutions with quality, consistency, and reliability for the beverage and packaging industry.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {whyUs.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-start gap-3 bg-card border border-brand-gray-200 rounded-xl p-5 hover:border-primary transition-colors">
              <Icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm font-semibold text-foreground">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-primary-foreground mb-4">Need RELPET® Bottle Grade PET?</h2>
          <p className="text-sm mb-8" style={{ color: "hsl(0 0% 100% / 0.7)" }}>Get assured supply of genuine RELPET® grades with priority allocations.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button onClick={() => openRFQ("PET Resin", "RELPET® Bottle Grade", "Polymers")} className="inline-flex items-center gap-2 bg-destructive text-destructive-foreground font-bold px-7 py-3.5 rounded-lg hover:bg-brand-gold-dark transition-colors">
              <FileText className="w-4 h-4" /> Get a Quote
            </button>
            <Link to="/products" className="inline-flex items-center gap-2 border-2 border-primary-foreground/30 text-primary-foreground font-semibold px-6 py-3 rounded-lg hover:bg-primary-foreground/10 transition-colors">
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PETProduct;
