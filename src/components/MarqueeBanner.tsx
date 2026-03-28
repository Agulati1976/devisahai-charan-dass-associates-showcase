const items = [
  "Repol PP Homopolymer H110MA – ₹93.50/kg",
  "Relene HDPE 50064 – ₹102.00/kg",
  "Reon PVC S6508 – ₹88.25/kg",
  "Relpet G5801 – ₹98.75/kg",
  "Vimal Gifting – Poly Viscose Fabric – ₹220/mtr",
  "Georgia Gullini Worsted Suiting – ₹850/mtr",
  "Relene LLDPE 040EF – ₹99.80/kg",
  "Repol PP Random Copolymer RG006 – ₹95.40/kg",
];

const MarqueeBanner = () => (
  <div className="bg-brand-gray-50 border-y border-brand-gray-200 overflow-hidden py-3">
    <div className="flex gap-12 animate-marquee whitespace-nowrap">
      {[...items, ...items].map((item, i) => (
        <span key={i} className="text-xs font-semibold text-primary flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-destructive rounded-full flex-shrink-0" />
          {item}
        </span>
      ))}
    </div>
  </div>
);

export default MarqueeBanner;
