import { useOutletContext, Link } from "react-router-dom";
import {
  FileText, CheckCircle2, ChevronRight, ArrowRight
} from "lucide-react";

interface ContextType {
  openRFQ: (product: string, grade: string, cat: string) => void;
}

const features = [
  "Superior wrinkle resistance for a crisp look",
  "Excellent colour fastness and long-term appearance",
  "High durability and tear resistance",
  "Lightweight and easy maintenance",
  "Consistent texture and smooth finish",
];

const PolyesterSuiting = () => {
  const { openRFQ } = useOutletContext<ContextType>();

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-brand-blue-dark">
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-24">
          <nav className="flex items-center gap-2 text-xs text-primary-foreground/60 mb-6">
            <Link to="/" className="hover:text-primary-foreground">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/products" className="hover:text-primary-foreground">Products</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary-foreground">100% Polyester Suiting</span>
          </nav>
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-3">Textiles Division</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-4 text-balance">100% Polyester Suiting</h1>
          <p className="text-xl font-semibold text-primary-foreground/90 mb-2">Durability. Refined Aesthetics. Long-Lasting Performance.</p>
          <p className="text-base max-w-2xl leading-relaxed mb-8 text-primary-foreground/75">
            Engineered for structured tailoring and everyday wear — a sharp finish with excellent shape retention.
          </p>
          <button onClick={() => openRFQ("100% Polyester Suiting", "Polyester Fabric", "Textiles")} className="inline-flex items-center gap-2 bg-destructive text-destructive-foreground font-bold px-7 py-3.5 rounded-lg shadow-lg shadow-destructive/35 hover:bg-brand-red-dark hover:-translate-y-0.5 transition-all">
            <FileText className="w-4 h-4" /> Request for Quotation
          </button>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto py-16 px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-2">Features</span>
            <h2 className="text-3xl font-extrabold text-primary mb-6">Key Features</h2>
            <div className="space-y-3">
              {features.map((f) => (
                <div key={f} className="flex items-center gap-3 bg-brand-gray-50 border border-brand-gray-200 rounded-lg p-4">
                  <CheckCircle2 className="w-5 h-5 text-destructive flex-shrink-0" />
                  <span className="text-sm font-semibold text-foreground">{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-secondary rounded-xl p-8">
            <h3 className="text-xl font-bold text-foreground mb-4">Ideal Applications</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Ideal for corporate uniforms, institutional wear, and formal suiting — our 100% Polyester Suiting ensures a professional appearance combined with comfort and reliability.
            </p>
            <p className="text-sm font-semibold text-primary">
              Structured tailoring • Everyday wear • Corporate uniforms • Institutional wear
            </p>
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-primary-foreground mb-4">Need 100% Polyester Suiting?</h2>
          <p className="text-sm mb-8 text-primary-foreground/70">Contact us for competitive pricing and bulk supply.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button onClick={() => openRFQ("100% Polyester Suiting", "Polyester Fabric", "Textiles")} className="inline-flex items-center gap-2 bg-destructive text-destructive-foreground font-bold px-7 py-3.5 rounded-lg hover:bg-brand-red-dark transition-colors">
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

export default PolyesterSuiting;
