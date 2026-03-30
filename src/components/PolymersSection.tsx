import { ArrowRight, FlaskConical } from "lucide-react";
import { Link } from "react-router-dom";
import ppImg from "@/assets/pp.jpeg";
import peImg from "@/assets/pe.jpeg";
import pvcImg from "@/assets/pvc.jpeg";
import petImg from "@/assets/pet.jpg";

const polymers = [
  { name: "Polypropylene (PP)", brand: "Repol®", image: ppImg, to: "/products/pp", desc: "Homopolymer, Copolymer & Impact Copolymer" },
  { name: "Polyethylene (HDPE)", brand: "Relene®", image: peImg, to: "/products/pe", desc: "High-Density Polyethylene" },
  { name: "Polyethylene (LLDPE/LDPE)", brand: "Relene®", image: peImg, to: "/products/pe", desc: "Linear Low & Low-Density PE" },
  { name: "PVC Resin", brand: "Reon®", image: pvcImg, to: "/products/pvc", desc: "Suspension Grade PVC Resin" },
  { name: "PET Bottle Grade", brand: "Relpet®", image: petImg, to: "/products/pet", desc: "Bottle & Packaging Grade PET" },
];

const PolymersSection = () => (
  <section id="polymers" className="max-w-[1200px] mx-auto py-16 px-6">
    <div className="flex items-center gap-3 mb-2">
      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
        <FlaskConical className="w-5 h-5 text-primary" />
      </div>
      <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent">Reliance Polymers Division</span>
    </div>
    <h2 className="text-3xl font-extrabold text-primary mb-8">Polymer Products</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {polymers.map((p) => (
        <Link
          key={p.name}
          to={p.to}
          className="group bg-card border border-brand-gray-200 rounded-xl overflow-hidden hover:border-primary hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
          <div className="h-44 overflow-hidden bg-secondary">
            <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
          </div>
          <div className="p-4">
            <span className="text-[0.65rem] font-bold uppercase tracking-wider text-accent">{p.brand}</span>
            <h3 className="text-base font-bold text-foreground mt-1 group-hover:text-primary transition-colors">{p.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary mt-3">
              View Details <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
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
