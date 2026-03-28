import { Award, Zap, Package, Banknote, BarChart3, Users } from "lucide-react";

const items = [
  { icon: Award, label: "India's #1 Textile DCA" },
  { icon: Zap, label: "Priority Supply Access" },
  { icon: Package, label: "Pan-India Delivery" },
  { icon: Banknote, label: "Competitive Credit Terms" },
  { icon: BarChart3, label: "Real-Time Price Intelligence" },
  { icon: Users, label: "Dedicated Account Manager" },
];

const TrustBar = () => (
  <div className="bg-primary py-4 px-6">
    <div className="max-w-[1200px] mx-auto flex items-center justify-center gap-8 flex-wrap">
      {items.map(({ icon: Icon, label }) => (
        <div key={label} className="flex items-center gap-2 text-primary-foreground/90 text-sm">
          <Icon className="w-4 h-4" />
          <span>{label}</span>
        </div>
      ))}
    </div>
  </div>
);

export default TrustBar;
