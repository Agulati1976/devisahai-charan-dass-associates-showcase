import { FileText, Info } from "lucide-react";

export interface Product {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category: string;
  brand: string;
  specs: { label: string; value: string }[];
  cat: string;
  gradient?: string;
}

interface ProductCardProps {
  product: Product;
  onOpenRFQ: (product: string, grade: string, cat: string) => void;
}

const ProductCard = ({ product, onOpenRFQ }: ProductCardProps) => (
  <div className="bg-card border border-brand-gray-200 rounded-xl overflow-hidden flex flex-col group hover:border-primary hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
    <div
      className="relative h-48 overflow-hidden"
      style={{ background: product.gradient || "linear-gradient(135deg, hsl(224 60% 95%), hsl(224 50% 82%))" }}
    >
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      <span className="absolute top-3 left-3 bg-primary/90 text-primary-foreground text-[0.68rem] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
        {product.category}
      </span>
      <span className="absolute top-3 right-3 bg-background/92 text-primary text-[0.68rem] font-bold px-2.5 py-1 rounded-full">
        {product.brand}
      </span>
    </div>
    <div className="p-5 flex-1 flex flex-col">
      <h3 className="text-lg font-bold text-foreground mb-1">{product.title}</h3>
      <p className="text-sm font-semibold text-primary mb-2">{product.subtitle}</p>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{product.description}</p>
      <div className="space-y-1.5 mb-4">
        {product.specs.map((spec) => (
          <div key={spec.label} className="flex justify-between text-xs">
            <span className="text-muted-foreground">{spec.label}</span>
            <span className="font-semibold text-foreground">{spec.value}</span>
          </div>
        ))}
      </div>
    </div>
    <div className="border-t border-brand-gray-100 px-5 py-3.5 flex gap-2.5 items-center">
      <button
        onClick={() => onOpenRFQ(product.title, product.subtitle, product.cat)}
        className="flex-1 bg-destructive text-destructive-foreground text-sm font-bold py-2.5 rounded-md hover:bg-brand-red-dark transition-colors flex items-center justify-center gap-2"
      >
        <FileText className="w-3.5 h-3.5" /> Request for Quotation
      </button>
      <button className="w-9 h-9 border border-brand-gray-200 bg-background rounded-md flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary hover:bg-secondary transition-colors">
        <Info className="w-4 h-4" />
      </button>
    </div>
  </div>
);

export default ProductCard;
