import { ArrowRight, Shirt, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  description: string | null;
  subcategory: string | null;
  brand: string | null;
  image_url: string | null;
  detail_link: string | null;
  specs: any;
}

const gradients = [
  "linear-gradient(135deg, hsl(50 90% 90%), hsl(50 80% 75%))",
  "linear-gradient(135deg, hsl(142 50% 95%), hsl(142 40% 82%))",
  "linear-gradient(135deg, hsl(260 50% 95%), hsl(260 40% 82%))",
  "linear-gradient(135deg, hsl(224 60% 95%), hsl(224 50% 85%))",
  "linear-gradient(135deg, hsl(200 60% 95%), hsl(200 50% 85%))",
  "linear-gradient(135deg, hsl(224 50% 95%), hsl(224 40% 82%))",
];

const TextilesSection = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("products")
        .select("id, name, description, subcategory, brand, image_url, detail_link, specs")
        .eq("category", "textiles")
        .eq("is_active", true)
        .order("sort_order");
      if (data) setProducts(data);
    };
    fetch();
  }, []);

  return (
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
          {products.map((product, idx) => {
            const specs = Array.isArray(product.specs) ? product.specs : [];
            return (
              <div
                key={product.id}
                className="bg-background border border-brand-gray-200 rounded-xl overflow-hidden flex flex-col group hover:border-primary hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <Link to={product.detail_link || "#"} className="relative h-48 overflow-hidden block" style={{ background: gradients[idx % gradients.length] }}>
                  {product.image_url && (
                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  )}
                  <span className="absolute top-3 left-3 bg-primary/90 text-primary-foreground text-[0.68rem] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">Textiles</span>
                  {product.brand && <span className="absolute top-3 right-3 bg-background/92 text-primary text-[0.68rem] font-bold px-2.5 py-1 rounded-full">{product.brand}</span>}
                </Link>
                <div className="p-5 flex-1 flex flex-col">
                  <Link to={product.detail_link || "#"} className="hover:text-primary transition-colors">
                    <h3 className="text-lg font-bold text-foreground mb-1">{product.name}</h3>
                  </Link>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{product.description}</p>
                  <div className="space-y-1.5 mb-4">
                    {specs.map((s: any) => (
                      <div key={s.label} className="flex justify-between text-xs">
                        <span className="text-muted-foreground">{s.label}</span>
                        <span className="font-semibold text-foreground">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t border-brand-gray-100 px-5 py-3.5 flex gap-2.5 items-center">
                  <Link
                    to={product.detail_link || "#"}
                    className="flex-1 bg-destructive text-destructive-foreground text-sm font-bold py-2.5 rounded-md hover:bg-brand-gold-dark transition-colors flex items-center justify-center gap-2"
                  >
                    <Info className="w-3.5 h-3.5" /> View Details
                  </Link>
                  <Link
                    to={product.detail_link || "#"}
                    className="w-9 h-9 border border-brand-gray-200 bg-background rounded-md flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary hover:bg-secondary transition-colors"
                    title="View Details"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
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
};

export default TextilesSection;
