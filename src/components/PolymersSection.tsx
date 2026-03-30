import { ArrowRight, FlaskConical } from "lucide-react";
import { Link } from "react-router-dom";

const polymers = [
  { name: "Polypropylene (PP) — Repol®", to: "/products/pp" },
  { name: "Polyethylene HDPE — Relene®", to: "/products/pe" },
  { name: "Polyethylene LLDPE / LDPE — Relene®", to: "/products/pe" },
  { name: "PVC — Reon®", to: "/products/pvc" },
  { name: "PET Bottle Grade — Relpet®", to: "/products/pet" },
];

const PolymersSection = () => (
  <section id="polymers" className="max-w-[1200px] mx-auto py-16 px-6">
    <div className="flex items-center gap-3 mb-2">
      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
        <FlaskConical className="w-5 h-5 text-primary" />
      </div>
      <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive">Reliance Polymers Division</span>
    </div>
    <h2 className="text-3xl font-extrabold text-primary mb-6">Polymer Products</h2>
    <div className="space-y-3 mb-8">
      {polymers.map((p) => (
        <Link
          key={p.name}
          to={p.to}
          className="flex items-center justify-between bg-card border border-brand-gray-200 rounded-xl px-6 py-4 hover:border-primary hover:shadow-md hover:-translate-y-0.5 transition-all group"
        >
          <span className="text-base font-bold text-foreground group-hover:text-primary transition-colors">{p.name}</span>
          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </Link>
      ))}
    </div>
    <Link
      to="/products?cat=polymers"
      className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-3 rounded-lg hover:bg-brand-blue-dark transition-colors"
    >
      Explore All Polymers <ArrowRight className="w-4 h-4" />
    </Link>
  </section>
);

export default PolymersSection;
