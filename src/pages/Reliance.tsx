import {
  Factory,
  Cog,
  Microscope,
  Palette,
  Shirt,
  CheckCircle2,
  ChevronRight,
  Scissors,
  Paintbrush,
  Shield,
  Droplets,
  Flame,
  Sparkles,
  FlaskConical,
  Beaker,
  Pipette,
  Box,
  Cylinder,
} from "lucide-react";
import { Link } from "react-router-dom";

const manufacturingStrengths = [
  "State-of-the-art plants in Naroda – Ahmedabad",
  "Vertically integrated composite plant: spinning, weaving, processing & finishing",
  "Spinning: 24s to 120s metric counts",
  "Synthetic Spinning: polyester and viscose blends",
  "Air jet looms & rapiers for stringent quality requirements",
  "Processing capacity: 1.8 million meters per month",
  "Most comprehensive product range with widest assortment",
  "Capacity to offer large volumes with timely deliveries",
];

const specialFinishes = [
  {
    icon: Shield,
    name: "DEO2 Anti-Microbial",
    desc: "Lasts 100 washes – in-house innovation that created a revolution in the textile industry",
  },
  { icon: Droplets, name: "Teflon Finish", desc: "Oil & water repellent with soil release properties" },
  { icon: Sparkles, name: "RIL-Nano Finish", desc: "Water repellency without compromising on hand & feel" },
  { icon: Flame, name: "Fire-Proof Fabrics", desc: "Developed and patented for high-safety environments" },
];

const Reliance = () => (
  <div>
    {/* Hero */}
    <section className="bg-primary py-20 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{ background: "radial-gradient(ellipse at 70% 50%, hsl(0 0% 100% / 0.3) 0%, transparent 70%)" }}
      />
      <div className="max-w-[1000px] mx-auto relative z-10 text-center">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent mb-3">
          Partner Profile
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-4">About Reliance Industries</h1>
        <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "hsl(0 0% 100% / 0.8)" }}>
          India's largest private sector enterprise — a global leader in polymers, petrochemicals, and integrated
          textile manufacturing.
        </p>
      </div>
    </section>

    {/* Textiles Division Header */}
    <section className="bg-secondary border-b border-brand-gray-200 py-10 px-6">
      <div className="max-w-[1200px] mx-auto flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Shirt className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-primary">Textiles Division</h2>
          <p className="text-sm text-muted-foreground">
            Vertically integrated textile manufacturing — spinning, weaving, processing & finishing
          </p>
        </div>
      </div>
    </section>

    {/* Capacity Overview */}
    <section className="max-w-[1200px] mx-auto py-16 px-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
        {[
          { value: "10 Mn", unit: "Mtr", label: "Worsted Fabric Capacity" },
          { value: "16 Mn", unit: "Mtr", label: "Synthetic Fabric Capacity" },
          { value: "1.8 Mn", unit: "Mtr/Mo", label: "Processing Capacity" },
          { value: "20,000+", unit: "", label: "Design-Shade Combinations/Year" },
        ].map((s) => (
          <div key={s.label} className="bg-secondary border border-brand-gray-200 rounded-xl p-6 text-center">
            <strong className="text-2xl font-extrabold text-primary">{s.value}</strong>
            {s.unit && <span className="text-sm font-semibold text-accent ml-1">{s.unit}</span>}
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <p className="text-muted-foreground leading-relaxed max-w-3xl mb-4">
        Reliance has the capacity to manufacture 10 million metres of worsted fabrics and 16 million metres of
        Poly/Viscose fabrics. Uniform fabrics cover Poly Viscose, Poly Cotton, 100% Cotton or Poly Wool with different
        finishes like Nano finish, Teflon finish etc.
      </p>
      <p className="text-muted-foreground leading-relaxed max-w-3xl">
        Performance fabrics like Anti-Microbial, Anti Dust, Quick Stain Release, Fire proof fabrics etc have been
        developed and some patented too. The prices are extremely competitive to both China and local competition.
      </p>
    </section>

    {/* Manufacturing Strengths */}
    <section className="bg-brand-gray-50 py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Factory className="w-5 h-5 text-primary" />
          </div>
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent">Manufacturing</span>
        </div>
        <h2 className="text-3xl font-extrabold text-primary mb-8">Manufacturing Strengths</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {manufacturingStrengths.map((s, i) => (
            <div key={i} className="flex items-start gap-3 bg-background border border-brand-gray-200 rounded-lg p-4">
              <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground font-medium">{s}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* R&D */}
    <section className="max-w-[1200px] mx-auto py-16 px-6">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Microscope className="w-5 h-5 text-primary" />
            </div>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent">R&D</span>
          </div>
          <h2 className="text-3xl font-extrabold text-primary mb-6">R&D and Quality Control</h2>
          <ul className="space-y-4">
            {[
              "R&D / Quality Assurance Department is the backbone of industry leadership",
              "Team of dedicated, qualified & experienced specialists keeping close check on every meter delivered",
              "Constant improvements in products & processes for consumer satisfaction",
              "Design experts craft trend-setting designs everyday, showcasing innovative designs & textures to the world",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">{i + 1}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent">Innovation</span>
          </div>
          <h2 className="text-3xl font-extrabold text-primary mb-6">Special Finishes</h2>
          <div className="space-y-4">
            {specialFinishes.map(({ icon: Icon, name, desc }) => (
              <div key={name} className="bg-secondary rounded-xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-foreground mb-1">{name}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Textile Product Range */}
    <section className="bg-primary py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ background: "hsl(0 0% 100% / 0.15)" }}
          >
            <Palette className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent">
            Textiles Catalogue
          </span>
        </div>
        <h2 className="text-3xl font-extrabold text-primary-foreground mb-8">Textile Product Range</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              icon: Shirt,
              title: "Fabrics",
              desc: "20,000+ design-shade combinations in light wool, polyester wool, woolen, polyester viscose, and polyester cotton under the VIMAL brand.",
            },
            {
              icon: Scissors,
              title: "Apparel",
              desc: "Vimal apparel: business formals, casuals, sport, shirts, t-shirts, trousers, cardigans, suits, jackets, blazers, and linen wear.",
            },
            {
              icon: Paintbrush,
              title: "Uniform Range",
              desc: "Blended fabrics — Poly Wool, Poly Viscose, Poly Cotton, 100% Cotton. Suitings: Plain, Matt, Canvas, Twills, Gabardine, Dobby, Lycra.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-xl p-6"
              style={{ background: "hsl(0 0% 100% / 0.1)", border: "1px solid hsl(0 0% 100% / 0.18)" }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: "hsl(0 0% 100% / 0.15)" }}
              >
                <Icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <h4 className="text-primary-foreground font-bold text-sm mb-2">{title}</h4>
              <p className="text-sm leading-relaxed" style={{ color: "hsl(0 0% 100% / 0.7)" }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Polymers Division Header */}
    <section className="bg-secondary border-b border-brand-gray-200 py-10 px-6">
      <div className="max-w-[1200px] mx-auto flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <FlaskConical className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-primary">Polymers Division</h2>
          <p className="text-sm text-muted-foreground">
            India's largest polymer producer — PP, PE, PVC & PET across 30+ export countries
          </p>
        </div>
      </div>
    </section>

    {/* Polymers Detail */}
    <section className="max-w-[1200px] mx-auto py-16 px-6">
      <p className="text-muted-foreground leading-relaxed max-w-3xl mb-8">
        Reliance is India's largest producer of polymers with world-class manufacturing facilities using globally
        licensed technologies. Products are exported to 30+ countries across diverse applications — packaging, pipes,
        automotive, healthcare, and construction.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {[
          { value: "2.9", unit: "MMT", label: "PP Capacity" },
          { value: "2.2", unit: "MMT", label: "PE Capacity" },
          { value: "750", unit: "KT", label: "PVC Capacity" },
          { value: "60+", unit: "", label: "Export Countries" },
        ].map((s) => (
          <div key={s.label} className="bg-secondary border border-brand-gray-200 rounded-xl p-6 text-center">
            <strong className="text-2xl font-extrabold text-primary">{s.value}</strong>
            {s.unit && <span className="text-sm font-semibold text-accent ml-1">{s.unit}</span>}
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          {
            icon: Box,
            title: "PP — Polypropylene",
            desc: "Homopolymer, random copolymer, and impact copolymer grades. Top 5 global manufacturer. Annual capacity: 2.9 MMT.",
            link: "/products/pp",
          },
          {
            icon: Cylinder,
            title: "PE — Polyethylene",
            desc: "Complete range of HDPE, LLDPE, and LDPE grades for packaging, agriculture, and industrial uses. Annual capacity: 2.2 MMT.",
            link: "/products/pe",
          },
          {
            icon: Pipette,
            title: "PVC — Polyvinyl Chloride",
            desc: "India's largest suspension-grade PVC manufacturer for agriculture, construction, and healthcare. Annual capacity: 750 KT.",
            link: "/products/pvc",
          },
          {
            icon: FlaskConical,
            title: "PET — Polyethylene Terephthalate",
            desc: "High clarity bottle-grade resin. Food-contact compliant, lightweight, and fully recyclable. Ideal for ISBM applications.",
            link: "/products/pet",
          },
        ].map(({ icon: Icon, title, desc, link }) => (
          <Link
            to={link}
            key={title}
            className="bg-card border border-brand-gray-200 rounded-xl p-6 hover:border-primary hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-bold text-sm text-foreground mb-2 group-hover:text-primary transition-colors">
              {title}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
          </Link>
        ))}
      </div>
    </section>

    {/* Polymer Manufacturing */}
    <section className="bg-brand-gray-50 py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Cog className="w-5 h-5 text-primary" />
          </div>
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent">Technology</span>
        </div>
        <h2 className="text-3xl font-extrabold text-primary mb-8">Polymer Manufacturing Excellence</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            "World-class plants at Jamnagar, Dahej, Nagothane, Hazira & Silvassa",
            "Globally licensed technologies: Basell Spheripol, Dow Unipol, DuPont PET process",
            "Integrated petrochemical complex for feedstock security",
            "Stringent quality control with ISO & BIS certifications",
            "Dedicated R&D for application development and grade customisation",
            "Pan-India distribution with warehousing and logistics support",
          ].map((s, i) => (
            <div key={i} className="flex items-start gap-3 bg-background border border-brand-gray-200 rounded-lg p-4">
              <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground font-medium">{s}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="bg-secondary py-16 px-6">
      <div className="max-w-[800px] mx-auto text-center">
        <h2 className="text-2xl font-extrabold text-primary mb-4">Explore Our Full Range</h2>
        <p className="text-muted-foreground mb-6">
          View all polymer and textile products with specifications and request quotes instantly.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-bold px-6 py-3 rounded-lg hover:bg-brand-gold-dark transition-colors"
        >
          View All Products <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  </div>
);

export default Reliance;
