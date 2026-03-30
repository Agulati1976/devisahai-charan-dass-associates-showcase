import { Award, Zap, Globe, CreditCard, BarChart3, Users } from "lucide-react";

const items = [
  { icon: Award, text: "India's #1 Textile DCA" },
  { icon: Zap, text: "Priority Supply Access" },
  { icon: Globe, text: "Pan-India Delivery" },
  { icon: CreditCard, text: "Competitive Credit Terms" },
  { icon: BarChart3, text: "Real-Time Price Intelligence" },
  { icon: Users, text: "Dedicated Account Manager" },
];

const MarqueeBanner = () => (
  <div className="bg-primary overflow-hidden py-2.5">
    <div className="flex justify-center items-center gap-8 flex-wrap px-6">
      {items.map((item, i) => (
        <span key={i} className="text-xs font-medium text-primary-foreground/85 flex items-center gap-2 whitespace-nowrap">
          <item.icon className="w-3.5 h-3.5 text-primary-foreground/60" />
          {item.text}
        </span>
      ))}
    </div>
  </div>
);

export default MarqueeBanner;
