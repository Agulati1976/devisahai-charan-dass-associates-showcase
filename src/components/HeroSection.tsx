import { FileText, ArrowRight, TrendingUp, TrendingDown } from "lucide-react";

interface HeroProps {
  onOpenRFQ: (product: string, grade: string, cat: string) => void;
}

const ticker = [
  { prod: "Repol PP", grade: "H110MA · Homopolymer", price: "₹93.50/kg", change: "+0.8%", up: true },
  { prod: "Relene HDPE", grade: "50064 · Film Grade", price: "₹102.00/kg", change: "-0.3%", up: false },
  { prod: "Reon PVC", grade: "S6508 · Suspension", price: "₹88.25/kg", change: "+1.2%", up: true },
  { prod: "Relpet G5801", grade: "Bottle Grade · PET", price: "₹98.75/kg", change: "+0.5%", up: true },
  { prod: "Vimal Gifting", grade: "Poly Viscose · 37\" wide", price: "₹220/mtr", change: "-0.2%", up: false },
];

const stats = [
  { value: "52+", label: "Years of Legacy" },
  { value: "500+", label: "B2B Clients" },
  { value: "₹200Cr+", label: "Annual Volume" },
  { value: "#1", label: "Largest DCA – Textiles" },
];

const HeroSection = ({ onOpenRFQ }: HeroProps) => (
  <section className="relative overflow-hidden min-h-[520px] flex items-center py-16 px-6"
    style={{ background: "linear-gradient(120deg, hsl(0 0% 100%) 0%, hsl(224 60% 95%) 45%, hsl(224 100% 30%) 100%)" }}
  >
    <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 80% 50%, hsl(224 100% 30% / 0.12) 0%, transparent 65%)" }} />
    <div className="relative z-10 max-w-[1200px] mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
      {/* Left */}
      <div>
        <div className="inline-flex items-center gap-2 bg-primary/8 border border-primary/18 text-primary text-xs font-semibold px-3.5 py-1.5 rounded-full mb-5">
          <span className="w-2 h-2 bg-destructive rounded-full" />
          Authorised Del Credere Agent – Reliance Industries Ltd.
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.15] text-primary mb-4 text-balance">
          Partnering with <span className="text-destructive">Reliance Industries</span> since 1972
        </h1>
        <p className="text-base text-brand-gray-700 leading-relaxed mb-8 max-w-[480px]">
          India's leading B2B distributor of Reliance Polymers & Textiles. Priority supply access, real-time price intelligence, and pan-India logistics — trusted by 500+ industrial buyers.
        </p>
        <div className="flex gap-4 flex-wrap items-center">
          <button
            onClick={() => onOpenRFQ("General Enquiry", "All Products", "General")}
            className="inline-flex items-center gap-2 bg-destructive text-destructive-foreground font-bold px-7 py-3.5 rounded-lg shadow-lg shadow-destructive/35 hover:bg-brand-red-dark hover:-translate-y-0.5 transition-all"
          >
            <FileText className="w-4 h-4" /> Get a Quote
          </button>
          <a href="#polymers" className="inline-flex items-center gap-2 border-2 border-primary text-primary font-semibold px-6 py-3 rounded-lg hover:bg-primary hover:text-primary-foreground transition-all">
            Explore Products <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        <div className="flex gap-8 mt-10 flex-wrap">
          {stats.map((s) => (
            <div key={s.label}>
              <strong className="block text-2xl font-extrabold text-primary">{s.value}</strong>
              <span className="text-xs text-brand-gray-500 font-medium">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right - Live Ticker */}
      <div className="hidden lg:block bg-primary/6 border border-primary/14 rounded-2xl p-6 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-sm font-bold text-primary">Live Commodity Board</h4>
          <span className="bg-green-100 text-green-600 text-[0.7rem] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> LIVE
          </span>
        </div>
        <div className="space-y-2">
          {ticker.map((t, i) => (
            <div key={i} className="flex justify-between items-center bg-background border border-brand-gray-200 rounded-lg px-3.5 py-2.5 text-sm">
              <div>
                <div className="font-semibold text-foreground">{t.prod}</div>
                <div className="text-xs text-brand-gray-500">{t.grade}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-primary">{t.price}</div>
                <span className={`text-[0.72rem] font-semibold px-1.5 py-0.5 rounded inline-flex items-center gap-1 ${t.up ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                  {t.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {t.change}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <button
            onClick={() => onOpenRFQ("General Enquiry", "All Products", "General")}
            className="text-xs font-bold bg-destructive text-destructive-foreground px-4 py-2 rounded-md hover:bg-brand-red-dark transition-colors"
          >
            View All Price Trends →
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
