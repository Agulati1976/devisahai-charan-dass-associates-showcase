import { useOutletContext, Link } from "react-router-dom";
import { CheckCircle2, ChevronRight, Shield, Palette, Award, Users, ArrowRight, Building2, Heart, HardHat, GraduationCap, Hotel } from "lucide-react";
import uniformsIndustrial from "@/assets/uniforms-industrial.jpeg";
import uniformsHospital from "@/assets/uniforms-hospital-security.jpeg";
import uniformsSchool from "@/assets/uniforms-school-corporate.jpeg";
interface ContextType { openRFQ: (product: string, grade: string, cat: string) => void; }

const whyChoose = [
  { icon: Award, label: "Quality Craftsmanship", desc: "Uniform fabrics crafted with precision, ensuring comfort and longevity." },
  { icon: Palette, label: "Customization", desc: "Tailored solutions to create a distinctive look aligned with your brand." },
  { icon: Shield, label: "Diverse Selection", desc: "Various styles, colors, and sizes for different industries and sectors." },
  { icon: Users, label: "Branding Opportunities", desc: "Incorporate logo, colors, and branding elements into uniforms." },
];

const collections = [
  { icon: Building2, title: "Corporate Uniforms", desc: "Professional attire exuding sophistication and consistency." },
  { icon: Hotel, title: "Hospitality Uniforms", desc: "Stylish and comfortable uniforms for hospitality and service industries." },
  { icon: Heart, title: "Healthcare Uniforms", desc: "Specialized medical and nursing uniforms ensuring comfort and hygiene." },
  { icon: HardHat, title: "Industrial Uniforms", desc: "Durable and functional uniforms for the rigors of the industrial environment." },
  { icon: GraduationCap, title: "School Uniforms", desc: "Comfortable, easy-to-maintain uniforms creating unity and discipline." },
];

const Uniforms = () => {
  const { openRFQ } = useOutletContext<ContextType>();
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-brand-blue-dark">
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-24">
          <nav className="flex items-center gap-2 text-xs text-primary-foreground/60 mb-6">
            <Link to="/" className="hover:text-primary-foreground">Home</Link><ChevronRight className="w-3 h-3" />
            <Link to="/products" className="hover:text-primary-foreground">Products</Link><ChevronRight className="w-3 h-3" />
            <span className="text-primary-foreground">Uniforms</span>
          </nav>
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-3">Textiles Division</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-4 text-balance">Only Vimal World Uniforms</h1>
          <p className="text-xl font-semibold text-primary-foreground/90 mb-2">Professionalism. Unity. Brand Identity.</p>
          <p className="text-base max-w-2xl leading-relaxed mb-8 text-primary-foreground/75">Premium uniform solutions that convey professionalism, unity, and brand identity.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-destructive text-destructive-foreground font-bold px-7 py-3.5 rounded-lg shadow-lg shadow-destructive/35 hover:bg-brand-gold-dark hover:-translate-y-0.5 transition-all">Contact Us <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto py-16 px-6">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-2">Why Us</span>
        <h2 className="text-3xl font-extrabold text-primary mb-8">Why Choose Only Vimal Uniforms?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChoose.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="bg-card border border-brand-gray-200 rounded-xl p-6 hover:border-primary hover:shadow-lg transition-all">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-4"><Icon className="w-5 h-5 text-primary" /></div>
              <h3 className="text-base font-bold text-foreground mb-2">{label}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand-gray-50 py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-2">Gallery</span>
          <h2 className="text-3xl font-extrabold text-primary mb-8">Uniform Fabric Samples</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {[{ src: uniformsIndustrial, label: "Industrial, Hotel & Aviation Uniforms" }, { src: uniformsHospital, label: "Hospital & Security Uniforms" }, { src: uniformsSchool, label: "School & Corporate Uniforms" }].map((img) => (
              <div key={img.label} className="group rounded-xl overflow-hidden border border-brand-gray-200 bg-background">
                <div className="overflow-hidden"><img src={img.src} alt={img.label} className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" loading="lazy" /></div>
                <div className="p-3"><p className="text-sm font-semibold text-foreground">{img.label}</p></div>
              </div>
            ))}
          </div>
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-2">Collection</span>
          <h2 className="text-3xl font-extrabold text-primary mb-8">Our Uniform Collection</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-background border border-brand-gray-200 rounded-xl p-6 hover:border-primary hover:shadow-lg transition-all">
                <Icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-primary-foreground mb-4">Need Uniform Solutions?</h2>
          <p className="text-sm mb-8 text-primary-foreground/70">Connect for premium uniform fabrics tailored to your organization.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-destructive text-destructive-foreground font-bold px-7 py-3.5 rounded-lg hover:bg-brand-gold-dark transition-colors">Contact Us <ArrowRight className="w-4 h-4" /></Link>
            <Link to="/products" className="inline-flex items-center gap-2 border-2 border-primary-foreground/30 text-primary-foreground font-semibold px-6 py-3 rounded-lg hover:bg-primary-foreground/10 transition-colors">View All Products <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Uniforms;
