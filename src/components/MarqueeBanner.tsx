const items = [
  "Authorised Del Credere Agent of Reliance Industries Limited",
  "Trusted Partner for Polymers & Textiles Since 1972",
  "Pan-India Supply Chain for PP, PE, PVC & PET Resins",
  "Premium Vimal Suitings & Corporate Gifting Solutions",
  "Reliable. Consistent. Industry-Leading Quality.",
  "Your Single Source for Reliance Polymer & Textile Products",
  "Committed to Excellence in Every Delivery",
  "Empowering Industries with World-Class Raw Materials",
];

const MarqueeBanner = () => (
  <div className="bg-primary overflow-hidden py-2.5">
    <div className="flex gap-12 animate-marquee whitespace-nowrap">
      {[...items, ...items].map((item, i) => (
        <span key={i} className="text-xs font-medium text-primary-foreground/90 flex items-center gap-3">
          <span className="w-1 h-1 bg-primary-foreground/60 rounded-full flex-shrink-0" />
          {item}
        </span>
      ))}
    </div>
  </div>
);

export default MarqueeBanner;
