import { CheckCircle2, ChevronRight, Eye, Target } from "lucide-react";
import { Link } from "react-router-dom";
import alokBuilding from "@/assets/alok-building.jpg";
import alokWeaving from "@/assets/alok-weaving.jpg";
import alokYarnDyeing from "@/assets/alok-yarn-dyeing.jpg";

const coreStrengths = [
  "One of India's largest vertically integrated textile manufacturers",
  "Five core divisions: Home Textiles, Cotton Yarn, Apparel Fabric, Garments, and Polyester Yarn",
  "Nearly four decades of industry leadership",
  "End-to-end textile solutions under one roof",
  "Internationally competitive pricing with reliable delivery",
];

const capacitiesApparel = [
  { label: "FIBERS", value: "1250 Tons/Day" },
  { label: "SPINNING", value: "450,000 Spindles" },
  { label: "POLYESTER YARN", value: "4500+ Tons Yarn/Month" },
  { label: "BEDDING PRODUCTION", value: "84 Million Mtrs/Year" },
  { label: "BATH PRODUCTION", value: "12000 Tons/Year" },
  { label: "BEDDING PROCESSING", value: "108 Million Meters/Year" },
  { label: "BATH PROCESSING", value: "12000 Tons/Year" },
  { label: "WASHING CAPACITY", value: "7000 Sets/Day" },
  { label: "SHEETS", value: "20 Million Sets/Year" },
  { label: "TOWELS", value: "40 Million Pcs/Year" },
];

const capacitiesHome = [
  { label: "SPINNING", value: "450,000 Spindles" },
  { label: "POLYESTER YARN", value: "4500+ Tons/Month" },
  { label: "YARN DYEING", value: "1250 Tons/Day" },
  { label: "GARMENTS", value: "750 Tons/Month" },
  { label: "EMBROIDERY", value: "1.5 Million Pcs/Month" },
  { label: "PRINTING", value: "450,000 Spindles" },
  { label: "WOVEN PRODUCTION", value: "4500+ Tons/Month" },
  { label: "KNITS PRODUCTION", value: "750 Tons/Month" },
  { label: "WOVEN PROCESSING", value: "1.5 Million Pcs/Month" },
  { label: "KNITS PROCESSING", value: "30 Billion Stitches/Year" },
];

const divisions = [
  { name: "Wovens", to: "/alok/wovens", desc: "Premium woven fabrics for apparel and industrial use" },
  { name: "Knits", to: "/alok/knits", desc: "Comfortable knitted fabrics for modern fashion" },
  { name: "Yarns", to: "/alok/yarns", desc: "High-quality yarns for textile manufacturing" },
  { name: "Furnishing", to: "/alok/furnishing", desc: "Elegant furnishing fabrics for interiors" },
  { name: "Embroideries", to: "/alok/embroideries", desc: "Intricate embroidery solutions for fashion & décor" },
];

const AlokIndustries = () => (
  <div>
    {/* Hero - Big title like original */}
    <section className="bg-background py-16 px-6 text-center border-b border-brand-gray-200">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary tracking-tight uppercase">
        Alok Industries
      </h1>
    </section>

    {/* Section 1: Building image + About text */}
    <section className="max-w-[1200px] mx-auto py-16 px-6">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <img src={alokBuilding} alt="Alok Industries Limited building" className="w-full rounded-xl shadow-lg object-cover" />
        </div>
        <div>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Founded in 1986, Alok Industries began as a private limited company and quickly established itself as a dynamic force in the textile sector. The commissioning of its first polyester texturizing plant in 1989 marked the beginning of its manufacturing excellence. In 1993, the company transitioned into a public limited entity, further strengthening its growth trajectory.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Over the years, Alok Industries has evolved into one of India's largest vertically integrated textile manufacturers, expanding into weaving, knitting, processing, home textiles, garments, cotton spinning, and polyester yarn production through continuous polymerization technology.
          </p>
        </div>
      </div>
    </section>

    {/* Section 2: Weaving image + Vision/Mission */}
    <section className="max-w-[1200px] mx-auto pb-16 px-6">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <img src={alokWeaving} alt="Alok Industries weaving facility" className="w-full rounded-xl shadow-lg object-cover" loading="lazy" />
        </div>
        <div>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Today, Alok is a globally recognized and diversified textile leader, delivering world-class fabrics, garments, home textiles, and yarns to clients across more than 90 countries.
          </p>
          <div className="mb-5">
            <h3 className="text-lg font-bold text-primary flex items-center gap-2 mb-2">
              <Eye className="w-5 h-5" /> Vision
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              To exceed the expectations of customers, stakeholders, and associates while empowering employees and supporting the communities connected to its growth.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary flex items-center gap-2 mb-2">
              <Target className="w-5 h-5" /> Mission
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              To drive innovation, ethical resource utilization, and sustainable development while delivering globally competitive products and services. Alok Industries is committed to transparency, quality excellence, and continuous advancement across markets and technologies.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Section 3: Yarn Dyeing image + Core Strengths */}
    <section className="max-w-[1200px] mx-auto pb-16 px-6">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <img src={alokYarnDyeing} alt="Alok Industries yarn dyeing facility" className="w-full rounded-xl shadow-lg object-cover" loading="lazy" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-primary mb-4">Core Strengths</h3>
          <ul className="space-y-3">
            {coreStrengths.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-foreground">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground text-sm mt-4 leading-relaxed">
            Strong global presence across 90+ countries. Alok Industries stands for scale, integration, innovation, and responsible growth — setting benchmarks in the global textile industry.
          </p>
        </div>
      </div>
    </section>

    {/* Capacities - Apparels */}
    <section className="bg-brand-gray-50 py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-primary text-center mb-10">Our Capacities – Apparels</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {capacitiesApparel.map(({ label, value }) => (
            <div key={label} className="bg-background border border-brand-gray-200 rounded-xl p-4 text-center">
              <h4 className="text-xs font-bold text-destructive uppercase tracking-wide mb-2">{label}</h4>
              <p className="text-sm font-semibold text-foreground">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Capacities - Home Textiles */}
    <section className="py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-primary text-center mb-10">Our Capacities – Home Textiles</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {capacitiesHome.map(({ label, value }) => (
            <div key={label} className="bg-background border border-brand-gray-200 rounded-xl p-4 text-center">
              <h4 className="text-xs font-bold text-destructive uppercase tracking-wide mb-2">{label}</h4>
              <p className="text-sm font-semibold text-foreground">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Quality Assurance */}
    <section className="bg-brand-gray-50 py-16">
      <div className="max-w-[800px] mx-auto px-6 text-center">
        <h2 className="text-3xl font-extrabold text-primary mb-4">Quality Assurance</h2>
        <p className="text-muted-foreground leading-relaxed">
          Alok Industries continuously focuses on manufacturing and allied practices on the concept of "get it right — first time and every time." Their products, manufacturing processes, and equipment are rigorously and always checked for quality standards and process deviations. Their adherence to internationally recognized certification standards and compliances is recognized by renowned certification bodies.
        </p>
      </div>
    </section>

    {/* Divisions */}
    <section className="py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-primary text-center mb-10">Our Divisions</h2>
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
  </div>
);

export default AlokIndustries;
