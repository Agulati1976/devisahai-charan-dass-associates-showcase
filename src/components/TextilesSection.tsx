import { ArrowRight, Shirt } from "lucide-react";
import { Link } from "react-router-dom";

const textiles = [
  { name: "Vimal Gifting", brand: "Premium Corporate Gifting", to: "/textiles/vimal-gifting", desc: "Curated corporate gifting solutions" },
  { name: "Vimal Suitings", brand: "Only Vimal®", to: "/textiles/vimal-suitings", desc: "Iconic suiting brand since 1972" },
  { name: "Uniforms", brand: "Corporate & Institutional", to: "/textiles/uniforms", desc: "Custom uniform fabric solutions" },
  { name: "Polyester Suiting", brand: "100% Polyester", to: "/textiles/polyester-suiting", desc: "Durable wrinkle-free suitings" },
  { name: "Georgia Gullini", brand: "Premium Worsted", to: "/textiles/georgia-gullini", desc: "Luxury worsted wool blends" },
];

const TextilesSection = () => (
  <section id="textiles" className="bg-brand-gray-50 py-16">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
          <Shirt className="w-5 h-5 text-primary" />
        </div>
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent">Reliance Textiles Division</span>
      </div>
      <h2 className="text-3xl font-extrabold text-primary mb-8">Textile Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {textiles.map((t) => (
          <Link
            key={t.name}
            to={t.to}
            className="group bg-background border border-brand-gray-200 rounded-xl overflow-hidden hover:border-primary hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="h-44 overflow-hidden bg-gradient-to-br from-secondary to-accent/10 flex items-center justify-center">
              <Shirt className="w-16 h-16 text-primary/20" />
            </div>
            <div className="p-4">
              <span className="text-[0.65rem] font-bold uppercase tracking-wider text-accent">{t.brand}</span>
              <h3 className="text-base font-bold text-foreground mt-1 group-hover:text-primary transition-colors">{t.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{t.desc}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary mt-3">
                View Details <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
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
