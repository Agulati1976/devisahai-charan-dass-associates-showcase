import { ArrowRight, Shirt } from "lucide-react";
import { Link } from "react-router-dom";

const textiles = [
  { name: "Vimal Gifting — Premium Corporate Gifting", to: "/textiles/vimal-gifting" },
  { name: "Vimal Suitings — Only Vimal®", to: "/textiles/vimal-suitings" },
  { name: "Uniforms — Corporate & Institutional", to: "/textiles/uniforms" },
  { name: "100% Polyester Suiting", to: "/textiles/polyester-suiting" },
  { name: "Georgia Gullini — Premium Worsted", to: "/textiles/georgia-gullini" },
];

const TextilesSection = () => (
  <section id="textiles" className="bg-brand-gray-50 py-16">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
          <Shirt className="w-5 h-5 text-primary" />
        </div>
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive">Reliance Textiles Division</span>
      </div>
      <h2 className="text-3xl font-extrabold text-primary mb-6">Textile Products</h2>
      <div className="space-y-3 mb-8">
        {textiles.map((t) => (
          <Link
            key={t.name}
            to={t.to}
            className="flex items-center justify-between bg-background border border-brand-gray-200 rounded-xl px-6 py-4 hover:border-primary hover:shadow-md hover:-translate-y-0.5 transition-all group"
          >
            <span className="text-base font-bold text-foreground group-hover:text-primary transition-colors">{t.name}</span>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
        ))}
      </div>
      <Link
        to="/products?cat=textiles"
        className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-3 rounded-lg hover:bg-brand-blue-dark transition-colors"
      >
        Explore All Textiles <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  </section>
);

export default TextilesSection;
