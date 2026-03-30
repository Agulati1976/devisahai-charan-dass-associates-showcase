import { useOutletContext, Link } from "react-router-dom";
import {
  FileText, CheckCircle2, ChevronRight, ArrowRight, Crown
} from "lucide-react";

interface ContextType {
  openRFQ: (product: string, grade: string, cat: string) => void;
}

const advantages = [
  { title: "Powerful structure with crisp shape retention", desc: "Holds its shape from boardroom to beyond — delivering a sharp, commanding silhouette throughout the day." },
  { title: "High-performance wrinkle resistance", desc: "Superior crease resistance ensures you look sharp, confident, and in control at all times." },
  { title: "Rich, long-lasting colour finish", desc: "Deep, vibrant colour depth that stays true wash after wash, maintaining a premium appearance." },
  { title: "Durable and low-maintenance fabric", desc: "Engineered for uncompromising durability with minimal upkeep — ready to perform every day." },
  { title: "Built for corporate, executive, and institutional excellence", desc: "Designed for leaders who demand presence and performance in professional environments." },
];

const GeorgiaGullini = () => {
  const { openRFQ } = useOutletContext<ContextType>();

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-brand-blue-dark">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://pplx-res.cloudinary.com/image/upload/pplx_search_images/2dfe842e4023b65e62bab4d9afb27580e6086582.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-24">
          <nav className="flex items-center gap-2 text-xs text-primary-foreground/60 mb-6">
            <Link to="/" className="hover:text-primary-foreground">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/products" className="hover:text-primary-foreground">Products</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary-foreground">Georgia Gullini</span>
          </nav>
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-3">Textiles Division</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-4 text-balance">Georgia Gullini</h1>
          <p className="text-xl font-semibold text-primary-foreground/90 mb-2">Not Just Suiting — A Statement of Authority</p>
          <p className="text-base max-w-2xl leading-relaxed mb-8 text-primary-foreground/75">
            Engineered for leaders who demand presence and performance — premium 100% polyester suiting fabric delivering a sharp, commanding silhouette with uncompromising durability.
          </p>
          <button onClick={() => openRFQ("Georgia Gullini", "Premium Suiting", "Textiles")} className="inline-flex items-center gap-2 bg-destructive text-destructive-foreground font-bold px-7 py-3.5 rounded-lg shadow-lg shadow-destructive/35 hover:bg-brand-gold-dark hover:-translate-y-0.5 transition-all">
            <FileText className="w-4 h-4" /> Request for Quotation
          </button>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto py-16 px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-2">Advantages</span>
            <h2 className="text-3xl font-extrabold text-primary mb-6">Key Advantages</h2>
            <div className="space-y-3">
              {advantages.map((a) => (
                <div key={a.title} className="flex items-start gap-3 bg-brand-gray-50 border border-brand-gray-200 rounded-lg p-4">
                  <CheckCircle2 className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm font-semibold text-foreground">{a.title}</span>
                    <p className="text-xs text-muted-foreground mt-1">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-secondary rounded-xl p-8 text-center">
            <Crown className="w-14 h-14 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-extrabold text-foreground mb-3">Wear Confidence.<br />Lead with Presence.</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Designed to hold its structure from boardroom to beyond — flawless finish, superior crease resistance, and long-lasting colour depth.
            </p>
            <p className="text-sm font-bold text-primary uppercase tracking-wider">
              Georgia Gullini defines strength, precision, and professional dominance.
            </p>
          </div>
        </div>
      </section>

      {/* Product Images */}
      <section className="bg-brand-gray-50 py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-2">Gallery</span>
          <h2 className="text-3xl font-extrabold text-primary mb-8">Georgia Gullini Collection</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { src: "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/2dfe842e4023b65e62bab4d9afb27580e6086582.jpg", label: "Premium Worsted Suiting" },
              { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format", label: "Executive Collection" },
              { src: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&auto=format", label: "Corporate Suiting Range" },
            ].map((img) => (
              <div key={img.label} className="group rounded-xl overflow-hidden border border-brand-gray-200 bg-background">
                <div className="h-52 overflow-hidden">
                  <img src={img.src} alt={img.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-foreground">{img.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-primary-foreground mb-4">Interested in Georgia Gullini?</h2>
          <p className="text-sm mb-8 text-primary-foreground/70">Premium suiting for corporate, executive, and institutional excellence.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button onClick={() => openRFQ("Georgia Gullini", "Premium Suiting", "Textiles")} className="inline-flex items-center gap-2 bg-destructive text-destructive-foreground font-bold px-7 py-3.5 rounded-lg hover:bg-brand-gold-dark transition-colors">
              <FileText className="w-4 h-4" /> Get a Quote
            </button>
            <Link to="/products" className="inline-flex items-center gap-2 border-2 border-primary-foreground/30 text-primary-foreground font-semibold px-6 py-3 rounded-lg hover:bg-primary-foreground/10 transition-colors">
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GeorgiaGullini;
