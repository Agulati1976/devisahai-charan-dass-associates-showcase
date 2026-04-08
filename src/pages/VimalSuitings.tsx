import { useOutletContext, Link } from "react-router-dom";
import { CheckCircle2, ChevronRight, Scissors, Gem, Palette, Shirt, ArrowRight, Award, Sparkles } from "lucide-react";
import vimalFabric from "@/assets/vimal-suitings-fabric.jpeg";

interface ContextType {
  openRFQ: (product: string, grade: string, cat: string) => void;
}

const whyChoose = [
  {
    icon: Award,
    label: "Quality Craftsmanship",
    desc: "Suiting fabrics crafted with precision and care, ensuring exceptional quality and durability.",
  },
  {
    icon: Palette,
    label: "Diverse Selection",
    desc: "Wide variety of colors, patterns, and textures to suit your unique style and preferences.",
  },
  {
    icon: Scissors,
    label: "Custom Tailoring",
    desc: "Option of custom tailoring to create bespoke suits that fit perfectly and reflect individuality.",
  },
  {
    icon: Gem,
    label: "Timeless Elegance",
    desc: "Classic, modern, and contemporary styles to meet various fashion sensibilities.",
  },
];

const collections = [
  { title: "Wool Suitings", desc: "Unmatched comfort and sophistication of pure wool, suitable for all seasons." },
  { title: "Blended Suitings", desc: "Best of materials combined, offering both durability and style." },
  { title: "Designer Suitings", desc: "Unique patterns and textures to elevate your wardrobe." },
  { title: "Formal Suitings", desc: "Class and refinement for professional and formal occasions." },
  { title: "Casual Suitings", desc: "Express your style even in relaxed settings." },
];

const VimalSuitings = () => {
  const { openRFQ } = useOutletContext<ContextType>();
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-brand-blue-dark">
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-24">
          <nav className="flex items-center gap-2 text-xs text-primary-foreground/60 mb-6">
            <Link to="/" className="hover:text-primary-foreground">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/products" className="hover:text-primary-foreground">
              Products
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary-foreground">Vimal Suitings</span>
          </nav>
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-3">
            Textiles Division
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-4 text-balance">
            Only Vimal Suitings
          </h1>
          <p className="text-xl font-semibold text-primary-foreground/90 mb-2">
            Quality. Craftsmanship. Timeless Elegance.
          </p>
          <p className="text-base max-w-2xl leading-relaxed mb-8 text-primary-foreground/75">
            A distinguished selection of premium suiting fabrics that embody quality, craftsmanship, and timeless
            elegance.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-destructive text-destructive-foreground font-bold px-7 py-3.5 rounded-lg shadow-lg shadow-destructive/35 hover:bg-brand-gold-dark hover:-translate-y-0.5 transition-all"
          >
            Contact Us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto py-16 px-6">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-2">Why Us</span>
        <h2 className="text-3xl font-extrabold text-primary mb-8">Why Choose Only Vimal Suitings?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChoose.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="bg-card border border-brand-gray-200 rounded-xl p-6 hover:border-primary hover:shadow-lg transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">{label}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand-gray-50 py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-2">
            Gallery
          </span>
          <h2 className="text-3xl font-extrabold text-primary mb-8">Our Fabric Range</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {[
              { src: vimalFabric, label: "Only Vimal Fabric Collection" },
              {
                src: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&auto=format",
                label: "Marvel Collection Terreyon",
              },
              {
                src: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format",
                label: "Poly Wool Blend",
              },
              {
                src: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format",
                label: "Poly Cotton Fabric",
              },
            ].map((img) => (
              <div
                key={img.label}
                className="group rounded-xl overflow-hidden border border-brand-gray-200 bg-background"
              >
                <div className="h-44 overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold text-foreground">{img.label}</p>
                </div>
              </div>
            ))}
          </div>
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-2">
            Collection
          </span>
          <h2 className="text-3xl font-extrabold text-primary mb-8">Our Suiting Collection</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((c) => (
              <div
                key={c.title}
                className="bg-background border border-brand-gray-200 rounded-xl p-6 hover:border-primary hover:shadow-lg transition-all"
              >
                <Shirt className="w-8 h-8 text-primary mb-3" />
                <h3 className="text-lg font-bold text-foreground mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-primary-foreground mb-4">Looking for Premium Suiting Fabrics?</h2>
          <p className="text-sm mb-8 text-primary-foreground/70">Explore our extensive range and get in touch today.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-destructive text-destructive-foreground font-bold px-7 py-3.5 rounded-lg hover:bg-brand-gold-dark transition-colors"
            >
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 border-2 border-primary-foreground/30 text-primary-foreground font-semibold px-6 py-3 rounded-lg hover:bg-primary-foreground/10 transition-colors"
            >
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VimalSuitings;
