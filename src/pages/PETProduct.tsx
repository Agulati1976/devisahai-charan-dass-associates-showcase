import { useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { Download, CheckCircle2, ChevronRight, Package, Award, Truck, Users, Cog, Shield, ArrowRight, Droplets, FlaskConical, Recycle, Heart, Film, Factory } from "lucide-react";
import GradeSheetModal from "@/components/GradeSheetModal";
import petImage from "@/assets/pet.jpg";

interface ContextType { openRFQ: (product: string, grade: string, cat: string) => void; }

const relpetGrades = ["Relpet® G5761", "Relpet® G5801", "Relpet® G5841", "Relpet® H7761", "Relpet® QH5821"];

const keyFeatures = [
  { category: "Mechanical & Physical Properties", items: ["High strength and excellent transparency", "Lightweight yet durable material"] },
  { category: "Chemical & Thermal Resistance", items: ["Excellent resistance to chemicals and moisture", "Suitable for various packaging environments"] },
  { category: "Safety & Sustainability", items: ["Food-grade safe for beverage and food contact", "100% recyclable and environmentally friendly"] },
];

const applicationGroups = [
  { icon: Droplets, title: "Beverage Packaging", items: ["Packaged drinking water bottles", "Carbonated soft drink bottles", "Juice, dairy drink, and sports drink bottles"] },
  { icon: Package, title: "Food Packaging", items: ["Edible oil bottles", "Food containers, jars, and trays", "Ready-to-eat and takeaway food packaging"] },
  { icon: Heart, title: "Pharmaceutical & Healthcare", items: ["Pharmaceutical bottles and containers", "Medical and healthcare packaging", "Blister packs and protective packaging"] },
  { icon: FlaskConical, title: "Cosmetic & Personal Care", items: ["Shampoo, lotion, and cosmetic bottles", "Personal care and hygiene product packaging"] },
  { icon: Film, title: "Films, Sheets & Thermoforming", items: ["PET films and sheets", "Thermoformed trays, lids, and clamshell packaging"] },
  { icon: Factory, title: "Textile & Industrial", items: ["Polyester fibers and yarns", "Non-woven fabrics and industrial textiles"] },
];

const whyUs = [
  { icon: Award, label: "Authorized DCA (Direct Channel Associate) of Reliance Industries Limited" },
  { icon: Package, label: "Assured supply of premium-quality PET grades" },
  { icon: Shield, label: "Consistent quality aligned with industry standards" },
  { icon: Cog, label: "Strong technical expertise and market knowledge" },
  { icon: Truck, label: "Customer-focused service with timely delivery" },
];

const PETProduct = () => {
  const { openRFQ } = useOutletContext<ContextType>();
  const [gradeSheetOpen, setGradeSheetOpen] = useState(false);

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
            <Link to="/" className="hover:text-primary-foreground">Home</Link><ChevronRight className="w-3 h-3" />
            <Link to="/products" className="hover:text-primary-foreground">Products</Link><ChevronRight className="w-3 h-3" />
            <span className="text-primary-foreground">PET Resin</span>
          </nav>
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-3">Polymers Division</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-4 text-balance">Polyethylene Terephthalate (PET)</h1>
          <p className="text-base max-w-2xl leading-relaxed mb-8" style={{ color: "hsl(0 0% 100% / 0.75)" }}>
            A high-performance thermoplastic polymer widely used in packaging and industrial applications. Valued for its excellent strength, clarity, chemical resistance, and recyclability — the preferred material for food-grade and sustainable packaging solutions.
          </p>
          <button onClick={() => setGradeSheetOpen(true)} className="inline-flex items-center gap-2 bg-destructive text-destructive-foreground font-bold px-7 py-3.5 rounded-lg shadow-lg shadow-destructive/35 hover:bg-brand-gold-dark hover:-translate-y-0.5 transition-all">
            <Download className="w-4 h-4" /> Download Grade Sheet
          </button>
        </div>
      </section>

      {/* Grades + Key Features */}
      <section className="max-w-[1200px] mx-auto py-16 px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-2">Available Grades</span>
            <h2 className="text-3xl font-extrabold text-primary mb-4">RELPET® Bottle Grade PET</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">We supply the following RELPET® Bottle Grade materials for high-performance bottle manufacturing.</p>
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
            <div className="space-y-4">
              {keyFeatures.map((group) => (
                <div key={group.category}>
                  <h3 className="text-sm font-bold text-foreground mb-2">{group.category}</h3>
                  <div className="space-y-2">
                    {group.items.map((f) => (
                      <div key={f} className="flex items-start gap-3 bg-card border border-brand-gray-200 rounded-lg p-3.5">
                        <CheckCircle2 className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-foreground">{f}</span>
                      </div>
                    ))}
                  </div>
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
          <h2 className="text-3xl font-extrabold text-primary mb-8">Applications of PET</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {applicationGroups.map(({ icon: Icon, title, items }) => (
              <div key={title} className="bg-background border border-brand-gray-200 rounded-xl p-5 hover:border-primary transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="text-sm font-bold text-foreground">{title}</h3>
                </div>
                <ul className="space-y-1.5">
                  {items.map((a) => (
                    <li key={a} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-destructive flex-shrink-0 mt-0.5" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="max-w-[1200px] mx-auto py-16 px-6">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-2">Why Choose Us</span>
        <h2 className="text-3xl font-extrabold text-primary mb-4">Why Devi Sahai Charan Dass Associates?</h2>
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
          <p className="text-sm mb-8" style={{ color: "hsl(0 0% 100% / 0.7)" }}>Get assured supply of premium-quality PET grades with priority allocations.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button onClick={() => setGradeSheetOpen(true)} className="inline-flex items-center gap-2 bg-destructive text-destructive-foreground font-bold px-7 py-3.5 rounded-lg hover:bg-brand-gold-dark transition-colors">
              <Download className="w-4 h-4" /> Download Grade Sheet
            </button>
            <Link to="/contact" className="inline-flex items-center gap-2 border-2 border-primary-foreground/30 text-primary-foreground font-semibold px-6 py-3 rounded-lg hover:bg-primary-foreground/10 transition-colors">
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <GradeSheetModal open={gradeSheetOpen} onClose={() => setGradeSheetOpen(false)} productName="PET Resin — Relpet®" productKey="PET" />
    </div>
  );
};

export default PETProduct;
