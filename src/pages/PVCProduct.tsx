import { useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { Download, CheckCircle2, ChevronRight, Award, Cog, Truck, ArrowRight } from "lucide-react";
import GradeSheetModal from "@/components/GradeSheetModal";
import pvcImage from "@/assets/pvc.jpeg";

interface ContextType { openRFQ: (product: string, grade: string, cat: string) => void; }

const applications = [
  "Rigid pipes and fittings", "Flexible tubes and hoses", "Doors, windows, and partitions",
  "Floor and wall coverings", "Wires, cables, and electrical conduits",
  "Medical products — blood bags, IV fluid bags, and tubing", "Toys, sports goods, and footwear",
];

const PVCProduct = () => {
  const { openRFQ } = useOutletContext<ContextType>();
  const [gradeSheetOpen, setGradeSheetOpen] = useState(false);

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={pvcImage} alt="PVC products" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/60" />
        </div>
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-24">
          <nav className="flex items-center gap-2 text-xs text-primary-foreground/60 mb-6">
            <Link to="/" className="hover:text-primary-foreground">Home</Link><ChevronRight className="w-3 h-3" />
            <Link to="/products" className="hover:text-primary-foreground">Products</Link><ChevronRight className="w-3 h-3" />
            <span className="text-primary-foreground">PVC</span>
          </nav>
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-3">Polymers Division</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-4 text-balance">PVC (Polyvinyl Chloride) Solutions</h1>
          <p className="text-base max-w-2xl leading-relaxed mb-8" style={{ color: "hsl(0 0% 100% / 0.75)" }}>
            High-quality Reon® PVC solutions catering to a wide range of industrial and commercial applications.
          </p>
          <button onClick={() => setGradeSheetOpen(true)} className="inline-flex items-center gap-2 bg-destructive text-destructive-foreground font-bold px-7 py-3.5 rounded-lg shadow-lg shadow-destructive/35 hover:bg-brand-gold-dark hover:-translate-y-0.5 transition-all">
            <Download className="w-4 h-4" /> Download Grade Sheet
          </button>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto py-16 px-6">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-2">Use Cases</span>
        <h2 className="text-3xl font-extrabold text-primary mb-4">Typical Applications</h2>
        <p className="text-muted-foreground leading-relaxed max-w-3xl mb-8">PVC is extensively used in rigid and flexible applications across industries.</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {applications.map((a) => (
            <div key={a} className="flex items-start gap-3 bg-card border border-brand-gray-200 rounded-lg p-4 hover:border-primary transition-colors">
              <CheckCircle2 className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <span className="text-sm font-medium text-foreground">{a}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand-gray-50 py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-2">Our Edge</span>
          <h2 className="text-3xl font-extrabold text-primary mb-6">Our Strength</h2>
          <p className="text-muted-foreground leading-relaxed max-w-3xl mb-8">We provide reliable and performance-driven PVC materials supported by strong technical expertise, consistent quality assurance, and timely delivery.</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[{ icon: Award, label: "Strong Technical Expertise" }, { icon: Cog, label: "Consistent Quality Assurance" }, { icon: Truck, label: "Timely Delivery" }].map(({ icon: Icon, label }) => (
              <div key={label} className="bg-background border border-brand-gray-200 rounded-xl p-6 text-center">
                <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <span className="text-sm font-bold text-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-primary-foreground mb-4">Need PVC for Your Project?</h2>
          <p className="text-sm mb-8" style={{ color: "hsl(0 0% 100% / 0.7)" }}>Get reliable Reon® PVC supply with competitive pricing and priority allocation.</p>
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

      <GradeSheetModal open={gradeSheetOpen} onClose={() => setGradeSheetOpen(false)} productName="PVC — Reon®" productKey="PVC" />
    </div>
  );
};

export default PVCProduct;
