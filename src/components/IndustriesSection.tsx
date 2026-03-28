import { Factory, Droplets, Car, Building2, Wheat, Cable, Shirt, Pill } from "lucide-react";

const industries = [
  { icon: Factory, name: "Packaging", desc: "Flexible & rigid packaging solutions" },
  { icon: Droplets, name: "Pipes & Fittings", desc: "Water, gas, and telecom infrastructure" },
  { icon: Car, name: "Automotive", desc: "Interior trims, bumpers, under-the-hood" },
  { icon: Building2, name: "Construction", desc: "Profiles, doors, windows, roofing" },
  { icon: Wheat, name: "Agriculture", desc: "Mulch films, irrigation, drip systems" },
  { icon: Cable, name: "Electrical & Cables", desc: "Wire insulation, conduits, switches" },
  { icon: Shirt, name: "Textiles & Apparel", desc: "Suitings, uniforms, performance wear" },
  { icon: Pill, name: "Pharma & FMCG", desc: "Bottles, blister packs, containers" },
];

const IndustriesSection = () => (
  <section className="py-16 px-6">
    <div className="max-w-[1200px] mx-auto">
      <div className="text-center mb-12">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-2">Industries We Serve</span>
        <h2 className="text-3xl font-extrabold text-primary mb-2">Trusted Across Sectors</h2>
        <p className="text-muted-foreground text-sm max-w-xl mx-auto">
          Our polymers and textiles power a diverse range of industries across India and beyond.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {industries.map(({ icon: Icon, name, desc }) => (
          <div key={name} className="border border-brand-gray-200 rounded-xl p-5 text-center hover:border-primary hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/10 transition-colors">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-bold text-sm text-foreground mb-1">{name}</h4>
            <p className="text-xs text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default IndustriesSection;
