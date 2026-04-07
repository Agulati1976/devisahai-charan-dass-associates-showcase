import { Medal, Zap, BarChart3, Truck, CreditCard, Headphones } from "lucide-react";

const cards = [
  { icon: Medal, title: "56+ Years of Trust", desc: "Associated with Reliance Industries since 1972 for textiles and 2003 for polymers. Decades of reliable supply and market expertise." },
  { icon: Zap, title: "Priority Allocation", desc: "Authorised DCA status ensures priority supply during demand peaks, tight allocations, and force-majeure situations — giving your plant continuity." },
  { icon: BarChart3, title: "Price Intelligence", desc: "Real-time market data and first-mover advantage on price revisions. Our clients consistently pay optimal rates, protecting their margins." },
  { icon: Truck, title: "Pan-India Logistics", desc: "Robust distribution network across Northern India with FTL, LTL, and express options. Guaranteed delivery timelines with digital tracking." },
  { icon: CreditCard, title: "Flexible Credit Terms", desc: "Competitive payment terms including credit periods tailored to your business cycle — a key advantage of our Del Credere Agent standing." },
  { icon: Headphones, title: "Dedicated Support", desc: "Named account managers, technical grade advisory, and documentation support. We simplify sourcing so you focus on production." },
];

const WhyUsSection = () => (
  <section id="why-us" className="bg-primary py-16">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="mb-10">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-2">Why Choose Us</span>
        <h2 className="text-3xl font-extrabold text-primary-foreground mb-2">The DSCD Advantage</h2>
        <p className="text-sm max-w-xl" style={{ color: "hsl(0 0% 100% / 0.7)" }}>
          More than just a distributor — we are your strategic procurement partner with deep industry roots and Reliance's backing.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-xl p-6 transition-colors" style={{ background: "hsl(0 0% 100% / 0.1)", border: "1px solid hsl(0 0% 100% / 0.18)" }}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: "hsl(0 0% 100% / 0.15)" }}>
              <Icon className="w-5 h-5 text-primary-foreground" />
            </div>
            <h4 className="text-primary-foreground font-bold text-sm mb-2">{title}</h4>
            <p className="text-sm leading-relaxed" style={{ color: "hsl(0 0% 100% / 0.7)" }}>{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyUsSection;
