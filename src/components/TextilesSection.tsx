import { useState } from "react";
import ProductCard, { type Product } from "./ProductCard";

const textiles: Product[] = [
  {
    title: "Vimal Gifting Collection",
    subtitle: "Premium Suiting & Shirting Fabric Sets",
    description: "Curated gifting bundles from India's most iconic fabric brand. Poly-Viscose and Poly-Cotton blends with premium finishes — ideal for institutional and bulk gifting.",
    image: "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/77982e55d48a51c5729a6bd9c5e642bda6d0711b.jpg",
    category: "Textiles",
    brand: "Only Vimal®",
    cat: "Textiles",
    specs: [
      { label: "Fabric Type", value: "Poly Viscose / Poly Cotton" },
      { label: "Width", value: '37" & 58" available' },
      { label: "Finish", value: "Nano, Teflon, Standard" },
      { label: "Min. Order", value: "500 Mtr" },
    ],
    gradient: "linear-gradient(135deg, hsl(50 90% 90%), hsl(50 80% 75%))",
  },
  {
    title: "Georgia Gullini Worsted",
    subtitle: "Premium Italian-Origin Worsted Suiting",
    description: "Luxury worsted suitings crafted at Naroda, Ahmedabad, under the Georgia Gullini Italy brand — blending Indian manufacturing strength with European design language.",
    image: "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/2dfe842e4023b65e62bab4d9afb27580e6086582.jpg",
    category: "Textiles",
    brand: "Georgia Gullini®",
    cat: "Textiles",
    specs: [
      { label: "Fabric", value: "100% Wool / Wool-Blend" },
      { label: "Capacity", value: "10 Mn Mtr (Worsted)" },
      { label: "Segment", value: "Premium Suiting" },
      { label: "Min. Order", value: "200 Mtr" },
    ],
    gradient: "linear-gradient(135deg, hsl(142 50% 95%), hsl(142 40% 82%))",
  },
  {
    title: "Uniform & Performance Fabrics",
    subtitle: "Institutional & Corporate Uniform Solutions",
    description: "High-performance uniform fabrics — Anti-Microbial, Anti-Dust, Quick Stain Release, and Fire-Proof options. Poly-Viscose, Poly-Cotton, and 100% Cotton blends available.",
    image: "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/3b1c27f5d6fc1547bd1b136438775952dc5fa45d.jpg",
    category: "Textiles",
    brand: "Only Vimal®",
    cat: "Textiles",
    specs: [
      { label: "Capacity", value: "16 Mn Mtr (Synthetic)" },
      { label: "Finishes", value: "Anti-Microbial, FR, Nano" },
      { label: "Plant", value: "Naroda, Ahmedabad" },
      { label: "Min. Order", value: "1000 Mtr" },
    ],
    gradient: "linear-gradient(135deg, hsl(260 50% 95%), hsl(260 40% 82%))",
  },
];

const catMap: Record<string, string[]> = {
  all: [],
  gifting: ["Vimal Gifting Collection"],
  georgia: ["Georgia Gullini Worsted"],
  uniform: ["Uniform & Performance Fabrics"],
};

interface Props {
  onOpenRFQ: (product: string, grade: string, cat: string) => void;
}

const TextilesSection = ({ onOpenRFQ }: Props) => {
  const [filter, setFilter] = useState("all");
  const tabs = [
    { key: "all", label: "All" },
    { key: "gifting", label: "Vimal Gifting" },
    { key: "georgia", label: "Georgia Gullini" },
    { key: "uniform", label: "Uniform" },
  ];

  const filtered = filter === "all" ? textiles : textiles.filter((p) => catMap[filter]?.includes(p.title));

  return (
    <section id="textiles" className="bg-brand-gray-50 py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="mb-10">
          <div className="flex flex-wrap justify-between items-end gap-4">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-2">
                Reliance Textiles Division
              </span>
              <h2 className="text-3xl font-extrabold text-primary mb-2">Textile Products</h2>
              <p className="text-muted-foreground text-sm max-w-xl">
                India's largest DCA for Reliance textiles. Comprehensive range of suiting, shirting, uniform fabrics, and gifting collections under iconic brand names.
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setFilter(t.key)}
                  className={`px-4 py-2 rounded-md border text-sm font-semibold transition-all ${
                    filter === t.key
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-brand-gray-700 border-brand-gray-200 hover:bg-primary hover:text-primary-foreground hover:border-primary"
                  }`}
                >
                  {t.label}
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
      </div>
    </section>
  );
};

export default TextilesSection;
