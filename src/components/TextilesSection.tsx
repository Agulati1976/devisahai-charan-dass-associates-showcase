import { ArrowRight, Shirt, Info } from "lucide-react";
import { Link } from "react-router-dom";

const textiles = [
  {
    title: "Vimal Gifting Collection", subtitle: "Premium Suiting & Shirting Fabric Sets",
    description: "Curated gifting bundles — Poly-Viscose and Poly-Cotton blends with premium finishes for institutional and bulk gifting.",
    image: "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/77982e55d48a51c5729a6bd9c5e642bda6d0711b.jpg",
    brand: "Only Vimal®", category: "Textiles",
    specs: [{ label: "Fabric", value: "Poly Viscose / Poly Cotton" }, { label: "Width", value: '37" & 58"' }, { label: "Min. Order", value: "500 Mtr" }],
    gradient: "linear-gradient(135deg, hsl(50 90% 90%), hsl(50 80% 75%))",
    detailLink: "/textiles/vimal-gifting",
  },
  {
    title: "Georgia Gullini Worsted", subtitle: "Premium Italian-Origin Worsted Suiting",
    description: "Luxury worsted suitings crafted at Naroda, blending Indian manufacturing strength with European design language.",
    image: "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/2dfe842e4023b65e62bab4d9afb27580e6086582.jpg",
    brand: "Georgia Gullini®", category: "Textiles",
    specs: [{ label: "Fabric", value: "100% Wool / Wool-Blend" }, { label: "Capacity", value: "10 Mn Mtr" }, { label: "Min. Order", value: "200 Mtr" }],
    gradient: "linear-gradient(135deg, hsl(142 50% 95%), hsl(142 40% 82%))",
    detailLink: "/textiles/georgia-gullini",
  },
  {
    title: "Uniform & Performance Fabrics", subtitle: "Institutional & Corporate Uniform Solutions",
    description: "Anti-Microbial, Anti-Dust, Quick Stain Release, and Fire-Proof options in Poly-Viscose, Poly-Cotton, and 100% Cotton.",
    image: "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/3b1c27f5d6fc1547bd1b136438775952dc5fa45d.jpg",
    brand: "Only Vimal®", category: "Textiles",
    specs: [{ label: "Capacity", value: "16 Mn Mtr" }, { label: "Finishes", value: "Anti-Microbial, FR, Nano" }, { label: "Min. Order", value: "1000 Mtr" }],
    gradient: "linear-gradient(135deg, hsl(260 50% 95%), hsl(260 40% 82%))",
    detailLink: "/textiles/uniforms",
  },
  {
    title: "Vimal Suitings", subtitle: "Only Vimal® — Iconic Since 1972",
    description: "Premium poly-viscose and poly-wool blended suitings trusted by generations across India.",
    image: "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/77982e55d48a51c5729a6bd9c5e642bda6d0711b.jpg",
    brand: "Only Vimal®", category: "Textiles",
    specs: [{ label: "Fabric", value: "Poly Viscose / Poly Wool" }, { label: "Width", value: '58"' }, { label: "Min. Order", value: "500 Mtr" }],
    gradient: "linear-gradient(135deg, hsl(224 60% 95%), hsl(224 50% 85%))",
    detailLink: "/textiles/vimal-suitings",
  },
  {
    title: "100% Polyester Suiting", subtitle: "Durable Wrinkle-Free Performance Fabric",
    description: "Crisp shape retention, high-performance wrinkle resistance, and rich long-lasting colour finish.",
    image: "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/3b1c27f5d6fc1547bd1b136438775952dc5fa45d.jpg",
    brand: "Reliance®", category: "Textiles",
    specs: [{ label: "Fabric", value: "100% Polyester" }, { label: "Feature", value: "Wrinkle-Free" }, { label: "Min. Order", value: "500 Mtr" }],
    gradient: "linear-gradient(135deg, hsl(200 60% 95%), hsl(200 50% 85%))",
    detailLink: "/textiles/polyester-suiting",
  },
  {
    title: "Alok Industries", subtitle: "India's Premier Integrated Textile Manufacturer",
    description: "Complete range of wovens, knits, yarns, furnishing fabrics, and embroideries from one of India's premier integrated textile manufacturers.",
    image: "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/3b1c27f5d6fc1547bd1b136438775952dc5fa45d.jpg",
    brand: "Alok Industries®", category: "Textiles",
    specs: [{ label: "Range", value: "Wovens, Knits, Yarns" }, { label: "Specialty", value: "Furnishing & Embroidery" }, { label: "Min. Order", value: "500 Mtr" }],
    gradient: "linear-gradient(135deg, hsl(224 50% 95%), hsl(224 40% 82%))",
    detailLink: "/textiles/alok-industries",
  },
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
        {textiles.map((product) => (
          <div
            key={product.title}
            className="bg-background border border-brand-gray-200 rounded-xl overflow-hidden flex flex-col group hover:border-primary hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
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
              <Link
                to={product.detailLink}
                className="flex-1 bg-destructive text-destructive-foreground text-sm font-bold py-2.5 rounded-md hover:bg-brand-gold-dark transition-colors flex items-center justify-center gap-2"
              >
                <Info className="w-3.5 h-3.5" /> View Details
              </Link>
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
        to="/products?cat=textiles"
        className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-3 rounded-lg hover:bg-brand-blue-dark transition-colors"
      >
        Explore All Textiles <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  </section>
);

export default TextilesSection;
