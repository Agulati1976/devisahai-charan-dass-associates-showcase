import { ArrowRight, FlaskConical, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import GradeSheetModal from "@/components/GradeSheetModal";
import ppImg from "@/assets/pp.jpeg";
import peImg from "@/assets/pe.jpeg";
import pvcImg from "@/assets/pvc.jpeg";
import petImg from "@/assets/pet.jpg";

const polymers = [
  {
    title: "Polypropylene (PP)", subtitle: "Repol® — Homopolymer, Copolymer, Impact Copolymer",
    description: "Manufactured using Spheripol & Adipol (Basell) and Unipol (Dow) technologies. Exported to 30+ countries.",
    image: ppImg, brand: "Repol®", category: "Polymers",
    specs: [{ label: "Capacity", value: "2.9 MMT" }, { label: "Technology", value: "Spheripol / Unipol" }, { label: "Min. Order", value: "1 MT" }],
    gradient: "linear-gradient(135deg, hsl(224 60% 95%), hsl(224 50% 82%))",
    detailLink: "/products/pp",
  },
  {
    title: "Polyethylene (HDPE)", subtitle: "Relene® — High-Density Polyethylene",
    description: "High-rigidity grades for blow moulding, injection, and pipe applications with Ziegler-Natta catalysts.",
    image: peImg, brand: "Relene®", category: "Polymers",
    specs: [{ label: "Density", value: "0.941 – 0.965 g/cc" }, { label: "Applications", value: "Pipe, Film, Blow Moulding" }, { label: "Min. Order", value: "1 MT" }],
    gradient: "linear-gradient(135deg, hsl(200 80% 95%), hsl(200 70% 85%))",
    detailLink: "/products/pe",
  },
  {
    title: "Polyethylene (LLDPE / LDPE)", subtitle: "Relene® — Linear Low-Density & LDPE",
    description: "Excellent puncture resistance, clarity, and sealing performance for flexible packaging and agricultural films.",
    image: peImg, brand: "Relene®", category: "Polymers",
    specs: [{ label: "Grade Types", value: "LLDPE, LDPE" }, { label: "Applications", value: "Packaging, Agri Films" }, { label: "Min. Order", value: "1 MT" }],
    gradient: "linear-gradient(135deg, hsl(45 90% 90%), hsl(45 80% 78%))",
    detailLink: "/products/pe",
  },
  {
    title: "PVC — Polyvinyl Chloride", subtitle: "Reon® — Suspension Grade PVC Resin",
    description: "India's largest manufacturer of suspension grade PVC for pipes, cables, medical devices, and more.",
    image: pvcImg, brand: "Reon®", category: "Polymers",
    specs: [{ label: "Capacity", value: "750 KT" }, { label: "K-Value", value: "57 – 70" }, { label: "Min. Order", value: "1 MT" }],
    gradient: "linear-gradient(135deg, hsl(142 50% 95%), hsl(142 40% 82%))",
    detailLink: "/products/pvc",
  },
  {
    title: "PET Resin — Bottle Grade", subtitle: "Relpet® G5801 — Copolymer PET Resin",
    description: "DuPont technology-based PET resin with excellent clarity for beverages, FMCG, and pharma applications.",
    image: petImg, brand: "Relpet®", category: "Polymers",
    specs: [{ label: "IV", value: "0.80 ± 0.02 dl/g" }, { label: "Technology", value: "DuPont Process" }, { label: "Min. Order", value: "1 MT" }],
    gradient: "linear-gradient(135deg, hsl(280 50% 97%), hsl(280 40% 88%))",
    detailLink: "/products/pet",
  },
];

const PolymersSection = () => {
  const [gradeSheetProduct, setGradeSheetProduct] = useState<string | null>(null);

  return (
    <section id="polymers" className="max-w-[1200px] mx-auto py-16 px-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
          <FlaskConical className="w-5 h-5 text-primary" />
        </div>
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent">Reliance Polymers Division</span>
      </div>
      <h2 className="text-3xl font-extrabold text-primary mb-8">Polymer Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {polymers.map((product) => (
          <div
            key={product.title}
            className="bg-card border border-brand-gray-200 rounded-xl overflow-hidden flex flex-col group hover:border-primary hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <Link to={product.detailLink} className="relative h-48 overflow-hidden block" style={{ background: product.gradient }}>
              <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              <span className="absolute top-3 left-3 bg-primary/90 text-primary-foreground text-[0.68rem] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">{product.category}</span>
              <span className="absolute top-3 right-3 bg-background/92 text-primary text-[0.68rem] font-bold px-2.5 py-1 rounded-full">{product.brand}</span>
            </Link>
            <div className="p-5 flex-1 flex flex-col">
              <Link to={product.detailLink} className="hover:text-primary transition-colors">
                <h3 className="text-lg font-bold text-foreground mb-1">{product.title}</h3>
              </Link>
              <p className="text-sm font-semibold text-primary mb-2">{product.subtitle}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{product.description}</p>
              <div className="space-y-1.5 mb-4">
                {product.specs.map((s) => (
                  <div key={s.label} className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{s.label}</span>
                    <span className="font-semibold text-foreground">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-brand-gray-100 px-5 py-3.5 flex gap-2.5 items-center">
              <button
                onClick={() => setGradeSheetProduct(product.title)}
                className="flex-1 bg-destructive text-destructive-foreground text-sm font-bold py-2.5 rounded-md hover:bg-brand-gold-dark transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-3.5 h-3.5" /> Download Grade Sheet
              </button>
              <Link
                to={product.detailLink}
                className="w-9 h-9 border border-brand-gray-200 bg-background rounded-md flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary hover:bg-secondary transition-colors"
                title="View Details"
              >
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Link
        to="/products?cat=polymers"
        className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-3 rounded-lg hover:bg-brand-blue-dark transition-colors"
      >
        Explore All Polymers <ArrowRight className="w-4 h-4" />
      </Link>

      <GradeSheetModal open={!!gradeSheetProduct} onClose={() => setGradeSheetProduct(null)} productName={gradeSheetProduct || ""} />
    </section>
  );
};

export default PolymersSection;
