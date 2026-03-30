import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Download, CheckCircle2, ChevronRight, Package, Layers, Shield,
  Droplets, Feather, Coins, Wind, Factory, Users, Cog, Award, ArrowRight
} from "lucide-react";
import GradeSheetModal from "@/components/GradeSheetModal";
import ppImage from "@/assets/pp.jpeg";

interface ContextType {
  openRFQ: (product: string, grade: string, cat: string) => void;
}

const grades = [
  {
    title: "Repol Homopolymer",
    desc: "Available in a broad range of melt flow indices and molecular weight distributions.",
    apps: ["Flexible packaging (TOPP, BOPP, Cast Films)", "Woven fabrics", "Fibres & filaments", "Extrusion applications", "Blow moulding", "Injection moulding"],
    note: "Excellent stiffness, strength, and processability — ideal for high-performance packaging and industrial uses.",
  },
  {
    title: "Repol Random Copolymers",
    desc: "Engineered for superior clarity and enhanced strength.",
    apps: ["Plumbing pipes", "Transparent sheets", "Blow moulding applications"],
    note: "Excellent optical properties with improved impact performance.",
  },
  {
    title: "Repol Impact Copolymers",
    desc: "Designed for higher impact resistance and toughness, available in varied melt flows and impact strengths.",
    apps: ["Injection moulding", "Thermoforming", "Extrusion coating", "Blow moulding", "Compounding"],
    note: "Perfect for demanding structural and automotive applications.",
  },
];

const whyPP = [
  { icon: Shield, label: "Excellent chemical resistance" },
  { icon: Feather, label: "High strength-to-weight ratio" },
  { icon: Coins, label: "Cost-effectiveness" },
  { icon: Droplets, label: "Moisture resistance" },
  { icon: Wind, label: "Adaptability across industries" },
];

const strengths = [
  { icon: Award, label: "Stringent Quality Assurance" },
  { icon: Cog, label: "Deep Technical Expertise" },
  { icon: Users, label: "Customer-Centric Approach" },
  { icon: Factory, label: "Efficient Systems & Processes" },
  { icon: Layers, label: "Highly Trained Professional Teams" },
];

const PPProduct = () => {
  const { openRFQ } = useOutletContext<ContextType>();
  const [gradeSheetOpen, setGradeSheetOpen] = useState(false);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={ppImage} alt="Polypropylene granules" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/60" />
        </div>
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-24">
          <nav className="flex items-center gap-2 text-xs text-primary-foreground/60 mb-6">
            <Link to="/" className="hover:text-primary-foreground">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/products" className="hover:text-primary-foreground">Products</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary-foreground">Polypropylene (PP)</span>
          </nav>
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-3">Polymers Division</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-4 text-balance">
            Polypropylene (PP) Solutions
          </h1>
          <p className="text-xl font-semibold text-primary-foreground/90 mb-2">Delivering Performance. Powering Industries.</p>
          <p className="text-base max-w-2xl leading-relaxed mb-8" style={{ color: "hsl(0 0% 100% / 0.75)" }}>
            A comprehensive portfolio of high-quality Polypropylene (PP) solutions engineered to meet diverse and demanding industrial applications.
          </p>
          <button
            onClick={() => setGradeSheetOpen(true)}
            className="inline-flex items-center gap-2 bg-destructive text-destructive-foreground font-bold px-7 py-3.5 rounded-lg shadow-lg shadow-destructive/35 hover:bg-brand-gold-dark hover:-translate-y-0.5 transition-all"
          >
            <Download className="w-4 h-4" /> Download Grade Sheet
          </button>
        </div>
      </section>

      {/* Grades */}
      <section className="max-w-[1200px] mx-auto py-16 px-6">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-2">Product Range</span>
        <h2 className="text-3xl font-extrabold text-primary mb-8">Repol® Grades</h2>
        <div className="grid lg:grid-cols-3 gap-6">
          {grades.map((g) => (
            <div key={g.title} className="bg-card border border-brand-gray-200 rounded-xl p-6 flex flex-col hover:border-primary hover:shadow-lg transition-all">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-4">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{g.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{g.desc}</p>
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Applications</h4>
              <ul className="space-y-1.5 mb-4 flex-1">
                {g.apps.map((a) => (
                  <li key={a} className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                    {a}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-primary font-semibold bg-secondary rounded-lg p-3">{g.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why PP */}
      <section className="bg-brand-gray-50 py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-2">Material Benefits</span>
              <h2 className="text-3xl font-extrabold text-primary mb-6">Why Choose Polypropylene?</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Polypropylene is a versatile, lightweight, and durable thermoplastic extensively used across packaging, automotive, textiles, infrastructure, and consumer goods.
              </p>
              <div className="space-y-3">
                {whyPP.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3 bg-background border border-brand-gray-200 rounded-lg p-3.5">
                    <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm font-semibold text-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-2">Our Edge</span>
              <h2 className="text-3xl font-extrabold text-primary mb-6">Our Strength</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our robust operational systems and experienced teams enable us to confidently serve leading corporate clients with consistency and efficiency.
              </p>
              <div className="space-y-3">
                {strengths.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3 bg-background border border-brand-gray-200 rounded-lg p-3.5">
                    <Icon className="w-5 h-5 text-destructive flex-shrink-0" />
                    <span className="text-sm font-semibold text-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-primary-foreground mb-4">Need Polypropylene for Your Project?</h2>
          <p className="text-sm mb-8" style={{ color: "hsl(0 0% 100% / 0.7)" }}>
            With scale, experience, and strong industry relationships, we remain a trusted distribution partner for premium polymer solutions.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => setGradeSheetOpen(true)}
              className="inline-flex items-center gap-2 bg-destructive text-destructive-foreground font-bold px-7 py-3.5 rounded-lg hover:bg-brand-gold-dark transition-colors"
            >
              <Download className="w-4 h-4" /> Download Grade Sheet
            </button>
            <Link to="/contact" className="inline-flex items-center gap-2 border-2 border-primary-foreground/30 text-primary-foreground font-semibold px-6 py-3 rounded-lg hover:bg-primary-foreground/10 transition-colors">
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <GradeSheetModal open={gradeSheetOpen} onClose={() => setGradeSheetOpen(false)} productName="Polypropylene (PP) — Repol®" />
    </div>
  );
};

export default PPProduct;
