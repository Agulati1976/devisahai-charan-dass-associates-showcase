import { Zap, Package, Banknote, BarChart3, Users } from "lucide-react";

const items = [
  { icon: Award, label: "India's #1 Textile DCA" },
  { icon: Zap, label: "Priority Supply Access" },
  { icon: Package, label: "Pan-India Delivery" },
  { icon: Banknote, label: "Competitive Credit Terms" },
  { icon: BarChart3, label: "Real-Time Price Intelligence" },
  { icon: Users, label: "Dedicated Account Manager" },
];

const TrustBar = () => (
  <div className="bg-primary py-4 px-6 overflow-hidden">
    <div className="max-w-[1200px] mx-auto hidden md:flex items-center justify-center gap-8 flex-wrap">
      {items.map(({ icon: Icon, label }) => (
        <div key={label} className="flex items-center gap-2 text-primary-foreground/90 text-sm">
          <Icon className="w-4 h-4 flex-shrink-0" />
          <span className="whitespace-nowrap">{label}</span>
        </div>
      ))}
    </div>
    {/* Mobile: auto-scrolling marquee */}
    <div className="md:hidden flex gap-10 animate-marquee whitespace-nowrap">
      {[...items, ...items].map(({ icon: Icon, label }, i) => (
        <div key={i} className="flex items-center gap-2 text-primary-foreground/90 text-sm">
          <Icon className="w-4 h-4 flex-shrink-0" />
          <span className="whitespace-nowrap">{label}</span>
        </div>
      ))}
    </div>
  </div>
);

export default TrustBar;
