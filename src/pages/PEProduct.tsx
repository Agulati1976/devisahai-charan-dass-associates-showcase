import { useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import {
  Download, CheckCircle2, ChevronRight, Package, Award, Users, Cog,
  Factory, Truck, ArrowRight
} from "lucide-react";
import GradeSheetModal from "@/components/GradeSheetModal";
import peImage from "@/assets/pe.jpeg";

interface ContextType {
  openRFQ: (product: string, grade: string, cat: string) => void;
}

const grades = [
  { title: "Relene HDPE", subtitle: "High-Density Polyethylene", desc: "Exceptional strength, durability, and chemical resistance across a wide range of densities.", apps: ["High-pressure pipes", "Telecom ducts", "Carrier bags", "Woven sacks", "Caps & closures", "Injection moulded products", "Blow moulded products"], note: "Designed for structural strength and long-term performance in demanding environments." },
  { title: "Relene LLDPE", subtitle: "Linear Low-Density Polyethylene", desc: "Superior flexibility, impact strength, and excellent processability.", apps: ["Milk & edible oil packaging", "Extrusion coating", "Lamination films", "Cast films", "Stretch films", "Specialty films", "Rotational moulding", "Injection moulding"], note: "Ideal for applications requiring toughness and enhanced sealing properties." },
  { title: "Relene LDPE", subtitle: "Low-Density Polyethylene", desc: "Excellent flexibility and clarity while maintaining durability across industrial uses.", apps: ["Heavy-duty films", "Lamination films", "Extrusion coating", "Moulding applications"], note: "A preferred choice for applications demanding resilience and smooth processing." },
];

const strengths = [
  { icon: Award, label: "High-quality, reliable polymer solutions" },
  { icon: Cog, label: "Application-focused product guidance" },
  { icon: Factory, label: "Strong technical expertise" },
  { icon: Truck, label: "Consistent supply & dependable distribution" },
  { icon: Users, label: "Customer-centric service approach" },
];

const PEProduct = () => {
  const { openRFQ } = useOutletContext<ContextType>();
  const [gradeSheetOpen, setGradeSheetOpen] = useState(false);

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={peImage} alt="Polyethylene granules" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/60" />
        </div>
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-24">
          <nav className="flex items-center gap-2 text-xs text-primary-foreground/60 mb-6">
            <Link to="/" className="hover:text-primary-foreground">Home</Link><ChevronRight className="w-3 h-3" />
            <Link to="/products" className="hover:text-primary-foreground">Products</Link><ChevronRight className="w-3 h-3" />
            <span className="text-primary-foreground">Polyethylene (PE)</span>
          </nav>
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-3">Polymers Division</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-4 text-balance">Polyethylene (PE) Solutions</h1>
          <p className="text-xl font-semibold text-primary-foreground/90 mb-2">Strength. Flexibility. Performance You Can Trust.</p>
          <p className="text-base max-w-2xl leading-relaxed mb-8" style={{ color: "hsl(0 0% 100% / 0.75)" }}>
            A comprehensive portfolio of premium Polyethylene (PE) solutions engineered to serve diverse industrial applications with reliability, efficiency, and consistent performance.
          </p>
          <button onClick={() => setGradeSheetOpen(true)} className="inline-flex items-center gap-2 bg-destructive text-destructive-foreground font-bold px-7 py-3.5 rounded-lg shadow-lg shadow-destructive/35 hover:bg-brand-gold-dark hover:-translate-y-0.5 transition-all">
            <Download className="w-4 h-4" /> Download Grade Sheet
          </button>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto py-16 px-6">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-2">Product Range</span>
        <h2 className="text-3xl font-extrabold text-primary mb-8">Relene® Grades</h2>
        <div className="grid lg:grid-cols-3 gap-6">
          {grades.map((g) => (
            <div key={g.title} className="bg-card border border-brand-gray-200 rounded-xl p-6 flex flex-col hover:border-primary hover:shadow-lg transition-all">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-4"><Package className="w-5 h-5 text-primary" /></div>
              <h3 className="text-lg font-bold text-foreground mb-0.5">{g.title}</h3>
              <p className="text-xs font-semibold text-primary mb-3">{g.subtitle}</p>
              <p className="text-sm text-muted-foreground mb-4">{g.desc}</p>
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Key Applications</h4>
              <ul className="space-y-1.5 mb-4 flex-1">
                {g.apps.map((a) => (<li key={a} className="flex items-start gap-2 text-sm text-foreground"><CheckCircle2 className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />{a}</li>))}
              </ul>
              <p className="text-xs text-primary font-semibold bg-secondary rounded-lg p-3">{g.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand-gray-50 py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-2">Our Edge</span>
          <h2 className="text-3xl font-extrabold text-primary mb-6">Our Strength</h2>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mb-8">Serving industries such as packaging, infrastructure, agriculture, and construction, we remain a trusted distribution partner.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {strengths.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 bg-background border border-brand-gray-200 rounded-lg p-4">
                <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm font-semibold text-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-primary-foreground mb-4">Need Polyethylene for Your Project?</h2>
          <p className="text-sm mb-8" style={{ color: "hsl(0 0% 100% / 0.7)" }}>Get priority pricing and reliable supply for all Relene® PE grades.</p>
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

      <GradeSheetModal open={gradeSheetOpen} onClose={() => setGradeSheetOpen(false)} productName="Polyethylene (PE) — Relene®" productKey="PE" />
    </div>
  );
};

export default PEProduct;
