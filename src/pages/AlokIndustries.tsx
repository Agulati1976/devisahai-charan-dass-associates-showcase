import {
  Building2, Calendar, Target, Eye, CheckCircle2, ChevronRight, Award, Factory
} from "lucide-react";
import { Link } from "react-router-dom";

const coreStrengths = [
  "One of India's largest vertically integrated textile manufacturers",
  "Five core divisions: Home Textiles, Cotton Yarn, Apparel Fabric, Garments, and Polyester Yarn",
  "Nearly four decades of industry leadership",
  "End-to-end textile solutions under one roof",
  "Internationally competitive pricing with reliable delivery",
];

const divisions = [
  { name: "Wovens", to: "/alok/wovens", desc: "Premium woven fabrics for apparel and industrial use" },
  { name: "Knits", to: "/alok/knits", desc: "Comfortable knitted fabrics for modern fashion" },
  { name: "Yarns", to: "/alok/yarns", desc: "High-quality yarns for textile manufacturing" },
  { name: "Furnishing", to: "/alok/furnishing", desc: "Elegant furnishing fabrics for interiors" },
  { name: "Embroideries", to: "/alok/embroideries", desc: "Intricate embroidery solutions for fashion & décor" },
];

const capacitiesApparel = [
  { label: "Fibers", value: "1250 Tons/Day" },
  { label: "Spinning", value: "450,000 Spindles" },
  { label: "Polyester Yarn", value: "4500+ Tons/Month" },
  { label: "Bedding Production", value: "84 Million Mtrs/Year" },
];

const capacitiesHome = [
  { label: "Yarn Dyeing", value: "1250 Tons/Day" },
  { label: "Garments", value: "750 Tons/Month" },
  { label: "Embroidery", value: "1.5 Million Pcs/Month" },
  { label: "Sheets", value: "20 Million Sets/Year" },
];

const AlokIndustries = () => (
  <div>
    {/* Hero */}
    <section className="bg-primary py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(ellipse at 30% 50%, hsl(0 0% 100% / 0.3) 0%, transparent 70%)" }} />
      <div className="max-w-[1000px] mx-auto relative z-10 text-center">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-3">Partner Brand</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-4 text-balance">
          Alok Industries Limited
        </h1>
        <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "hsl(0 0% 100% / 0.8)" }}>
          One of India's largest vertically integrated textile manufacturers — delivering world-class fabrics, garments, home textiles, and yarns to clients across 90+ countries.
        </p>
      </div>
    </section>

    {/* About */}
    <section className="max-w-[1200px] mx-auto py-16 px-6">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-2">Since 1986</span>
          <h2 className="text-3xl font-extrabold text-primary mb-4">A Legacy of Textile Excellence</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Founded in 1986, Alok Industries began as a private limited company and quickly established itself as a dynamic force in the textile sector. The commissioning of its first polyester texturizing plant in 1989 marked the beginning of its manufacturing excellence.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            In 1993, the company transitioned into a public limited entity. Today, Alok is a globally recognized and diversified textile leader, delivering world-class products to clients across more than 90 countries.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Calendar, label: "Founded in 1986" },
              { icon: Building2, label: "90+ Countries" },
              { icon: Factory, label: "Vertically Integrated" },
              { icon: Award, label: "4 Decades of Leadership" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
                <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm font-semibold text-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-brand-gray-50 rounded-2xl p-6 border border-brand-gray-200">
            <h3 className="text-lg font-bold text-primary mb-3 flex items-center gap-2">
              <Eye className="w-5 h-5" /> Vision
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              To exceed the expectations of customers, stakeholders, and associates while empowering employees and supporting the communities connected to its growth.
            </p>
          </div>
          <div className="bg-brand-gray-50 rounded-2xl p-6 border border-brand-gray-200">
            <h3 className="text-lg font-bold text-primary mb-3 flex items-center gap-2">
              <Target className="w-5 h-5" /> Mission
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              To drive innovation, ethical resource utilization, and sustainable development while delivering globally competitive products and services. Committed to transparency, quality excellence, and continuous advancement.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Core Strengths */}
    <section className="bg-brand-gray-50 py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-2">Why Alok</span>
        <h2 className="text-3xl font-extrabold text-primary mb-8">Core Strengths</h2>
        <div className="bg-background rounded-xl p-6 border border-brand-gray-200">
          <ul className="space-y-3">
            {coreStrengths.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    {/* Capacities */}
    <section className="py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-2">Scale & Infrastructure</span>
        <h2 className="text-3xl font-extrabold text-primary mb-8">Our Capacities</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="font-bold text-primary mb-4">Apparels</h3>
            <div className="grid grid-cols-2 gap-4">
              {capacitiesApparel.map(({ label, value }) => (
                <div key={label} className="bg-background border border-brand-gray-200 rounded-xl p-4 text-center">
                  <strong className="block text-lg font-extrabold text-primary">{value}</strong>
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-bold text-primary mb-4">Home Textiles</h3>
            <div className="grid grid-cols-2 gap-4">
              {capacitiesHome.map(({ label, value }) => (
                <div key={label} className="bg-background border border-brand-gray-200 rounded-xl p-4 text-center">
                  <strong className="block text-lg font-extrabold text-primary">{value}</strong>
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Divisions */}
    <section className="bg-brand-gray-50 py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-2">Explore</span>
          <h2 className="text-3xl font-extrabold text-primary mb-2">Our Divisions</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {divisions.map((div) => (
            <Link
              key={div.name}
              to={div.to}
              className="bg-background border border-brand-gray-200 rounded-xl p-6 hover:border-primary hover:shadow-lg transition-all group"
            >
              <h4 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{div.name}</h4>
              <p className="text-sm text-muted-foreground mb-4">{div.desc}</p>
              <span className="text-sm font-semibold text-primary flex items-center gap-1">
                Learn More <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* Quality */}
    <section className="py-16">
      <div className="max-w-[800px] mx-auto px-6 text-center">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-2">Standards</span>
        <h2 className="text-3xl font-extrabold text-primary mb-4">Quality Assurance</h2>
        <p className="text-muted-foreground leading-relaxed">
          Alok Industries continuously focuses on manufacturing and allied practices on the concept of "get it right — first time and every time." Products, manufacturing processes, and equipment are rigorously checked for quality standards. Their adherence to internationally recognized certification standards is recognized by renowned certification bodies.
        </p>
      </div>
    </section>
  </div>
);

export default AlokIndustries;
