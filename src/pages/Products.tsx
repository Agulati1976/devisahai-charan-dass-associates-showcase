import { useState } from "react";
import { useOutletContext, useSearchParams, Link } from "react-router-dom";
import { FileText, Info, Search, SlidersHorizontal, ArrowRight } from "lucide-react";
import ppImg from "@/assets/pp.jpeg";
import peImg from "@/assets/pe.jpeg";
import pvcImg from "@/assets/pvc.jpeg";
import petImg from "@/assets/pet.jpg";

interface ContextType {
  openRFQ: (product: string, grade: string, cat: string) => void;
}

interface Product {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category: "Polymers" | "Textiles";
  brand: string;
  type: string;
  specs: { label: string; value: string }[];
  gradient: string;
  detailLink?: string;
}

const allProducts: Product[] = [
  {
    title: "Polypropylene (PP)",
    subtitle: "Repol® — Homopolymer, Copolymer, Impact Copolymer",
    description: "Manufactured using Spheripol & Adipol (Basell) and Unipol (Dow) technologies. Exported to 30+ countries.",
    image: ppImg,
    category: "Polymers", brand: "Repol®", type: "PP",
    specs: [{ label: "Capacity", value: "2.9 MMT" }, { label: "Technology", value: "Spheripol / Unipol" }, { label: "Min. Order", value: "1 MT" }],
    gradient: "linear-gradient(135deg, hsl(224 60% 95%), hsl(224 50% 82%))",
    detailLink: "/products/pp",
  },
  {
    title: "Polyethylene (HDPE)",
    subtitle: "Relene® — High-Density Polyethylene",
    description: "High-rigidity grades for blow moulding, injection, and pipe applications with Ziegler-Natta catalysts.",
    image: peImg,
    category: "Polymers", brand: "Relene®", type: "PE",
    specs: [{ label: "Density", value: "0.941 – 0.965 g/cc" }, { label: "Applications", value: "Pipe, Film, Blow Moulding" }, { label: "Min. Order", value: "1 MT" }],
    gradient: "linear-gradient(135deg, hsl(200 80% 95%), hsl(200 70% 85%))",
    detailLink: "/products/pe",
  },
  {
    title: "Polyethylene (LLDPE / LDPE)",
    subtitle: "Relene® — Linear Low-Density & LDPE",
    description: "Excellent puncture resistance, clarity, and sealing performance for flexible packaging and agricultural films.",
    image: peImg,
    category: "Polymers", brand: "Relene®", type: "PE",
    specs: [{ label: "Grade Types", value: "LLDPE, LDPE" }, { label: "Applications", value: "Packaging, Agri Films" }, { label: "Min. Order", value: "1 MT" }],
    gradient: "linear-gradient(135deg, hsl(45 90% 90%), hsl(45 80% 78%))",
    detailLink: "/products/pe",
  },
  {
    title: "PVC — Polyvinyl Chloride",
    subtitle: "Reon® — Suspension Grade PVC Resin",
    description: "India's largest manufacturer of suspension grade PVC for pipes, cables, medical devices, and more.",
    image: pvcImg,
    category: "Polymers", brand: "Reon®", type: "PVC",
    specs: [{ label: "Capacity", value: "750 KT" }, { label: "K-Value", value: "57 – 70" }, { label: "Min. Order", value: "1 MT" }],
    gradient: "linear-gradient(135deg, hsl(142 50% 95%), hsl(142 40% 82%))",
    detailLink: "/products/pvc",
  },
  {
    title: "PET Resin — Bottle Grade",
    subtitle: "Relpet® G5801 — Copolymer PET Resin",
    description: "DuPont technology-based PET resin with excellent clarity for beverages, FMCG, and pharma applications.",
    image: petImg,
    category: "Polymers", brand: "Relpet®", type: "PET",
    specs: [{ label: "IV", value: "0.80 ± 0.02 dl/g" }, { label: "Technology", value: "DuPont Process" }, { label: "Min. Order", value: "1 MT" }],
    gradient: "linear-gradient(135deg, hsl(280 50% 97%), hsl(280 40% 88%))",
    detailLink: "/products/pet",
  },
  {
    title: "Polyolefin Pipes",
    subtitle: "Relpipe® — ISO 9001 Certified PE Pipes",
    description: "PE 80 & PE 100 pipe resin for agriculture, water supply, telecom ducting, and gas distribution.",
    image: pvcImg,
    category: "Polymers", brand: "Relpipe®", type: "PE",
    specs: [{ label: "Standards", value: "PE 80 & PE 100" }, { label: "Certification", value: "ISO 9001" }, { label: "Min. Order", value: "5 MT" }],
    gradient: "linear-gradient(135deg, hsl(25 80% 95%), hsl(25 70% 85%))",
    detailLink: "/products/pe",
  },
  {
    title: "Vimal Gifting Collection",
    subtitle: "Premium Suiting & Shirting Fabric Sets",
    description: "Curated gifting bundles — Poly-Viscose and Poly-Cotton blends with premium finishes for institutional and bulk gifting.",
    image: "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/77982e55d48a51c5729a6bd9c5e642bda6d0711b.jpg",
    category: "Textiles", brand: "Only Vimal®", type: "Gifting",
    specs: [{ label: "Fabric", value: "Poly Viscose / Poly Cotton" }, { label: "Width", value: '37" & 58"' }, { label: "Min. Order", value: "500 Mtr" }],
    gradient: "linear-gradient(135deg, hsl(50 90% 90%), hsl(50 80% 75%))",
  },
  {
    title: "Georgia Gullini Worsted",
    subtitle: "Premium Italian-Origin Worsted Suiting",
    description: "Luxury worsted suitings crafted at Naroda, blending Indian manufacturing strength with European design language.",
    image: "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/2dfe842e4023b65e62bab4d9afb27580e6086582.jpg",
    category: "Textiles", brand: "Georgia Gullini®", type: "Suiting",
    specs: [{ label: "Fabric", value: "100% Wool / Wool-Blend" }, { label: "Capacity", value: "10 Mn Mtr" }, { label: "Min. Order", value: "200 Mtr" }],
    gradient: "linear-gradient(135deg, hsl(142 50% 95%), hsl(142 40% 82%))",
  },
  {
    title: "Uniform & Performance Fabrics",
    subtitle: "Institutional & Corporate Uniform Solutions",
    description: "Anti-Microbial, Anti-Dust, Quick Stain Release, and Fire-Proof options in Poly-Viscose, Poly-Cotton, and 100% Cotton.",
    image: "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/3b1c27f5d6fc1547bd1b136438775952dc5fa45d.jpg",
    category: "Textiles", brand: "Only Vimal®", type: "Uniform",
    specs: [{ label: "Capacity", value: "16 Mn Mtr" }, { label: "Finishes", value: "Anti-Microbial, FR, Nano" }, { label: "Min. Order", value: "1000 Mtr" }],
    gradient: "linear-gradient(135deg, hsl(260 50% 95%), hsl(260 40% 82%))",
  },
];

const Products = () => {
  const { openRFQ } = useOutletContext<ContextType>();
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get("cat") || "all";
  const [filter, setFilter] = useState(initialCat);
  const [search, setSearch] = useState("");

  const filtered = allProducts.filter((p) => {
    const matchCat = filter === "all" || p.category.toLowerCase() === filter;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()) || p.type.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div>
      {/* Header */}
      <section className="bg-primary py-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-3">Product Catalogue</span>
          <h1 className="text-4xl font-extrabold text-primary-foreground mb-3">All Products</h1>
          <p className="text-lg max-w-2xl" style={{ color: "hsl(0 0% 100% / 0.8)" }}>
            Browse our complete range of Reliance Polymers & Textiles. Click any product to request a quotation.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-background border-b border-brand-gray-200 sticky top-[68px] z-40">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-semibold text-muted-foreground">Filter:</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {[
              { key: "all", label: "All Products" },
              { key: "polymers", label: "Polymers" },
              { key: "textiles", label: "Textiles" },
            ].map((t) => (
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
          <div className="flex-1 min-w-[200px] max-w-sm ml-auto relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products, brands…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-brand-gray-200 rounded-lg text-sm bg-background text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-[1200px] mx-auto px-6 py-10">
        <p className="text-sm text-muted-foreground mb-6">{filtered.length} product{filtered.length !== 1 ? "s" : ""} found</p>
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-bold text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground text-sm">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <div
                key={product.title}
                className="bg-card border border-brand-gray-200 rounded-xl overflow-hidden flex flex-col group hover:border-primary hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <Link to={product.detailLink || "/products"} className="relative h-48 overflow-hidden block" style={{ background: product.gradient }}>
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <span className="absolute top-3 left-3 bg-primary/90 text-primary-foreground text-[0.68rem] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">{product.category}</span>
                  <span className="absolute top-3 right-3 bg-background/92 text-primary text-[0.68rem] font-bold px-2.5 py-1 rounded-full">{product.brand}</span>
                </Link>
                <div className="p-5 flex-1 flex flex-col">
                  <Link to={product.detailLink || "/products"} className="hover:text-primary transition-colors">
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
                    onClick={() => openRFQ(product.title, product.subtitle, product.category)}
                    className="flex-1 bg-destructive text-destructive-foreground text-sm font-bold py-2.5 rounded-md hover:bg-brand-red-dark transition-colors flex items-center justify-center gap-2"
                  >
                    <FileText className="w-3.5 h-3.5" /> Request for Quotation
                  </button>
                  {product.detailLink ? (
                    <Link
                      to={product.detailLink}
                      className="w-9 h-9 border border-brand-gray-200 bg-background rounded-md flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary hover:bg-secondary transition-colors"
                      title="View Details"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <button className="w-9 h-9 border border-brand-gray-200 bg-background rounded-md flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary hover:bg-secondary transition-colors">
                      <Info className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Products;
