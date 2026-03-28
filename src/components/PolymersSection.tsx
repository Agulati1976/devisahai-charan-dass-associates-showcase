import { useState } from "react";
import ProductCard, { type Product } from "./ProductCard";

const polymers: Product[] = [
  {
    title: "Polypropylene (PP)",
    subtitle: "Repol® — Homopolymer, Copolymer, Impact Copolymer",
    description: "Manufactured using Spheripol & Adipol (Basell) and Unipol (Dow) technologies. Exported to 30+ countries with world-class consistency.",
    image: "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/60f8333dfbcf8ef72bcd8d152523afd3865768ef.jpg",
    category: "Polymers",
    brand: "Repol®",
    cat: "Polymers",
    specs: [
      { label: "Annual Capacity", value: "2.9 MMT" },
      { label: "Technology", value: "Spheripol / Unipol" },
      { label: "Export Markets", value: "30+ Countries" },
      { label: "Min. Order", value: "1 MT" },
    ],
    gradient: "linear-gradient(135deg, hsl(224 60% 95%), hsl(224 50% 82%))",
  },
  {
    title: "Polyethylene (HDPE)",
    subtitle: "Relene® — High-Density Polyethylene",
    description: "High-rigidity grades for blow moulding, injection, and pipe applications. Manufactured with world-class Ziegler-Natta catalysts for superior purity.",
    image: "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/1399d44278d440a7acaeb655a6d6edb3b5a121d9.jpg",
    category: "Polymers",
    brand: "Relene®",
    cat: "Polymers",
    specs: [
      { label: "Density Range", value: "0.941 – 0.965 g/cc" },
      { label: "MFI Range", value: "0.03 – 200 g/10 min" },
      { label: "Applications", value: "Pipe, Film, Blow Moulding" },
      { label: "Min. Order", value: "1 MT" },
    ],
    gradient: "linear-gradient(135deg, hsl(200 80% 95%), hsl(200 70% 85%))",
  },
  {
    title: "Polyethylene (LLDPE / LDPE)",
    subtitle: "Relene® — Linear Low-Density & LDPE",
    description: "Versatile polyethylene grades offering excellent puncture resistance, clarity, and sealing performance for flexible packaging and agricultural films.",
    image: "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/1399d44278d440a7acaeb655a6d6edb3b5a121d9.jpg",
    category: "Polymers",
    brand: "Relene®",
    cat: "Polymers",
    specs: [
      { label: "Grade Types", value: "LLDPE, LDPE" },
      { label: "Film Clarity", value: "Excellent" },
      { label: "Applications", value: "Packaging, Agri Films" },
      { label: "Min. Order", value: "1 MT" },
    ],
    gradient: "linear-gradient(135deg, hsl(45 90% 90%), hsl(45 80% 78%))",
  },
  {
    title: "PVC — Polyvinyl Chloride",
    subtitle: "Reon® — Suspension Grade PVC Resin",
    description: "India's largest manufacturer of suspension grade PVC. Wide viscosity range for rigid pipes, flexible hoses, wires, cables, medical devices, and more.",
    image: "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/025ba96ccaa612b9a7c53eaf96940b0a1d6dcdae.jpg",
    category: "Polymers",
    brand: "Reon®",
    cat: "Polymers",
    specs: [
      { label: "Annual Capacity", value: "750 KT" },
      { label: "K-Value Range", value: "57 – 70" },
      { label: "Applications", value: "Pipes, Cables, Medical" },
      { label: "Min. Order", value: "1 MT" },
    ],
    gradient: "linear-gradient(135deg, hsl(142 50% 95%), hsl(142 40% 82%))",
  },
  {
    title: "PET Resin — Bottle Grade",
    subtitle: "Relpet® G5801 — Copolymer PET Resin",
    description: "DuPont technology-based bottle-grade PET resin. Excellent clarity, processability, and properties for beverages, FMCG, pharma, and APET sheet applications.",
    image: "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/de52ec7dab1184dda30a8823c038ff3441c33498.jpg",
    category: "Polymers",
    brand: "Relpet®",
    cat: "Polymers",
    specs: [
      { label: "IV (Intrinsic Viscosity)", value: "0.80 ± 0.02 dl/g" },
      { label: "Technology", value: "DuPont Process" },
      { label: "Applications", value: "Bottles, Films, Pharma" },
      { label: "Min. Order", value: "1 MT" },
    ],
    gradient: "linear-gradient(135deg, hsl(280 50% 97%), hsl(280 40% 88%))",
  },
  {
    title: "Polyolefin Pipes",
    subtitle: "Relpipe® — ISO 9001 Certified PE Pipes",
    description: "ISO 9001-certified PE 80 & PE 100 pipe resin from Battenfeld extrusion lines. Suited for agriculture, urban water supply, telecom ducting, and gas distribution.",
    image: "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/025ba96ccaa612b9a7c53eaf96940b0a1d6dcdae.jpg",
    category: "Polymers",
    brand: "Relpipe®",
    cat: "Polymers",
    specs: [
      { label: "PE Standards", value: "PE 80 & PE 100" },
      { label: "Certification", value: "ISO 9001" },
      { label: "Applications", value: "Water, Agri, Gas, Telecom" },
      { label: "Min. Order", value: "5 MT" },
    ],
    gradient: "linear-gradient(135deg, hsl(25 80% 95%), hsl(25 70% 85%))",
  },
];

const catMap: Record<string, string[]> = {
  all: [],
  pp: ["Polypropylene (PP)"],
  pe: ["Polyethylene (HDPE)", "Polyethylene (LLDPE / LDPE)", "Polyolefin Pipes"],
  pvc: ["PVC — Polyvinyl Chloride"],
  pet: ["PET Resin — Bottle Grade"],
};

interface Props {
  onOpenRFQ: (product: string, grade: string, cat: string) => void;
}

const PolymersSection = ({ onOpenRFQ }: Props) => {
  const [filter, setFilter] = useState("all");
  const tabs = ["all", "pp", "pe", "pvc", "pet"];

  const filtered = filter === "all" ? polymers : polymers.filter((p) => catMap[filter]?.includes(p.title));

  return (
    <section id="polymers" className="max-w-[1200px] mx-auto py-16 px-6">
      <div className="mb-10">
        <div className="flex flex-wrap justify-between items-end gap-4">
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-2">
              Reliance Polymers Division
            </span>
            <h2 className="text-3xl font-extrabold text-primary mb-2">Polymer Products</h2>
            <p className="text-muted-foreground text-sm max-w-xl">
              Full range of Reliance polymer grades — PP, PE, PVC & PET — sourced directly with priority allocation and best-in-class price discovery.
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-4 py-2 rounded-md border text-sm font-semibold transition-all ${
                  filter === t
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-brand-gray-700 border-brand-gray-200 hover:bg-primary hover:text-primary-foreground hover:border-primary"
                }`}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <ProductCard key={p.title} product={p} onOpenRFQ={onOpenRFQ} />
        ))}
      </div>
    </section>
  );
};

export default PolymersSection;
