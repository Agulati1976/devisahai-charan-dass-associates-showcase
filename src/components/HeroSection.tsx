import { useState } from "react";
import { FileText, ArrowRight, Send, Building2, User, Phone, Mail, Package, MapPin } from "lucide-react";

interface HeroProps {
  onOpenRFQ: (product: string, grade: string, cat: string) => void;
}

const stats = [
  { value: "52+", label: "Years of Legacy" },
  { value: "500+", label: "B2B Clients" },
  { value: "₹200Cr+", label: "Annual Volume" },
  { value: "#1", label: "Largest DCA – Textiles" },
];

const HeroSection = ({ onOpenRFQ }: HeroProps) => {
  const [formData, setFormData] = useState({
    name: "", company: "", mobile: "", email: "", product: "", location: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", company: "", mobile: "", email: "", product: "", location: "", message: "" });
  };

  return (
    <section className="relative overflow-hidden min-h-[560px] flex items-center py-16 px-6">
      {/* Background layers */}
      <div className="absolute inset-0 bg-primary" />
      <div className="absolute inset-0 opacity-[0.07]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 20% 50%, hsl(224 100% 45% / 0.5) 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, hsl(0 85% 55% / 0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, hsl(224 100% 25% / 0.6) 0%, transparent 50%)",
      }} />
      {/* Floating shapes */}
      <div className="absolute top-16 left-[10%] w-72 h-72 rounded-full bg-white/[0.03] blur-2xl" />
      <div className="absolute bottom-10 right-[15%] w-96 h-96 rounded-full bg-white/[0.04] blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/[0.06]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/[0.04]" />

      <div className="relative z-10 max-w-[1200px] mx-auto w-full grid lg:grid-cols-[1fr_420px] gap-12 items-center">
        {/* Left Content */}
        <div>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-3.5 py-1.5 rounded-full mb-5">
            <span className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
            Authorised Del Credere Agent – Reliance Industries Ltd.
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.15] text-white mb-4 text-balance">
            Partnering with <span className="text-destructive font-extrabold">Reliance Industries</span> since 1972
          </h1>
          <p className="text-base text-white/70 leading-relaxed mb-8 max-w-[480px]">
            India's leading B2B distributor of Reliance Polymers & Textiles. Priority supply access, real-time price intelligence, and pan-India logistics — trusted by 500+ industrial buyers.
          </p>
          <div className="flex gap-4 flex-wrap items-center">
            <button
              onClick={() => onOpenRFQ("General Enquiry", "All Products", "General")}
              className="inline-flex items-center gap-2 bg-destructive text-destructive-foreground font-bold px-7 py-3.5 rounded-lg shadow-lg shadow-destructive/35 hover:bg-brand-gold-dark hover:-translate-y-0.5 transition-all"
            >
              <FileText className="w-4 h-4" /> Get a Quote
            </button>
            <a href="#polymers" className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-all">
              Explore Products <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="flex gap-8 mt-10 flex-wrap">
            {stats.map((s) => (
              <div key={s.label}>
                <strong className="block text-2xl font-extrabold text-white">{s.value}</strong>
                <span className="text-xs text-white/60 font-medium">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Quick RFQ Form */}
        <div className="relative rounded-2xl p-6 shadow-2xl overflow-hidden" style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.70) 50%, rgba(255,255,255,0.80) 100%)",
          backdropFilter: "blur(24px) saturate(1.6)",
          WebkitBackdropFilter: "blur(24px) saturate(1.6)",
          border: "1.5px solid rgba(255,255,255,0.7)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(255,255,255,0.3), 0 0 0 1px rgba(255,255,255,0.15)",
        }}>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-9 h-9 rounded-lg bg-destructive/90 flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground">Quick RFQ</h4>
              <p className="text-[0.7rem] text-muted-foreground">Get pricing within 2 hours</p>
            </div>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                <input name="name" value={formData.name} onChange={handleChange} required placeholder="Your Name *" className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground/60 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors" />
              </div>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                <input name="company" value={formData.company} onChange={handleChange} required placeholder="Company Name *" className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground/60 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                  <input name="mobile" value={formData.mobile} onChange={handleChange} required type="tel" placeholder="Mobile *" className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground/60 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors" />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                  <input name="email" value={formData.email} onChange={handleChange} required type="email" placeholder="Email *" className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground/60 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors" />
                </div>
              </div>
              <div className="relative">
                <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                <select name="product" value={formData.product} onChange={handleChange} required className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-muted/50 border border-border text-foreground text-sm appearance-none outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors">
                  <option value="">Select Product *</option>
                  <option>Polypropylene (PP)</option>
                  <option>Polyethylene (PE)</option>
                  <option>PVC</option>
                  <option>PET – Bottle Grade</option>
                  <option>Vimal Suitings</option>
                  <option>Georgia Gullini</option>
                  <option>Uniform Fabrics</option>
                  <option>Polyester Suiting</option>
                  <option>Vimal Gifting</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                <input name="location" value={formData.location} onChange={handleChange} placeholder="Delivery Location" className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground/60 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors" />
              </div>
              <textarea name="message" value={formData.message} onChange={handleChange} rows={2} placeholder="Additional requirements..." className="w-full px-3 py-2.5 rounded-lg bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground/60 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors resize-none" />
              <button type="submit" className="w-full bg-destructive text-destructive-foreground font-bold py-3 rounded-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-destructive/30">
                <Send className="w-4 h-4" /> Submit RFQ
              </button>
              <p className="text-[0.65rem] text-muted-foreground text-center">Your data is confidential & used only for quotation</p>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h4 className="text-foreground font-bold text-lg">RFQ Submitted!</h4>
              <p className="text-muted-foreground text-sm mt-1">We'll get back within 2 hours</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
