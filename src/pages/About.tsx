import {
  Building2, Calendar, MapPin, Users, Award, Phone, Shirt,
  FlaskConical, ChevronRight, CheckCircle2, Target, Handshake
} from "lucide-react";
import { Link } from "react-router-dom";

const milestones = [
  { year: "1972", text: "Appointed as Authorised DCA for Reliance Textiles" },
  { year: "2003", text: "Appointed as DCA for Reliance Polymers Division" },
  { year: "2010", text: "Expanded distribution to Pan-India market" },
  { year: "2020", text: "Among the leading DCAs under Delhi Regional Office" },
  { year: "2025", text: "52+ years of continued partnership with Reliance" },
];

import teamSham from "@/assets/team-sham.jpeg";
import teamRadhika from "@/assets/team-radhika.jpeg";
import teamPooja from "@/assets/team-pooja.jpeg";

const teamMembers = [
  { name: "Sham Chopra", role: "Founder & CEO", image: teamSham },
  { name: "Radhika Mehta", role: "Managing Partner", image: teamRadhika },
  { name: "Pooja Mahant", role: "Managing Partner", image: teamPooja },
];

const About = () => (
  <div>
    {/* Hero Banner */}
    <section className="bg-primary py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(ellipse at 30% 50%, hsl(0 0% 100% / 0.3) 0%, transparent 70%)" }} />
      <div className="max-w-[1000px] mx-auto relative z-10 text-center">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-3">About Us</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-4 text-balance">
          Devisahai Charan Dass Associates
        </h1>
        <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "hsl(0 0% 100% / 0.8)" }}>
          A well-established and trusted Authorised Del Credere Agent (DCA) of Reliance Industries Limited,
          representing both the Textile and Petrochemical Divisions.
        </p>
      </div>
    </section>

    {/* Mission */}
    <section className="max-w-[1200px] mx-auto py-16 px-6">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-2">Our Mission</span>
          <h2 className="text-3xl font-extrabold text-primary mb-4">Built on Trust, Performance & Systems</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            With a hardworking and robust work culture based on systems, we are proud to bring forth the best of services, 
            information, and timely supply to our customers. Our sustained success reflects our unwavering commitment to 
            reliability, performance, and long-term partnerships.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Target, label: "Customer-First Approach" },
              { icon: Handshake, label: "Long-Term Partnerships" },
              { icon: Award, label: "Operational Excellence" },
              { icon: Building2, label: "Pan-India Presence" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
                <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm font-semibold text-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-brand-gray-50 rounded-2xl p-8 border border-brand-gray-200">
          <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5" /> Key Milestones
          </h3>
          <div className="space-y-0">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex gap-4 relative">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-destructive flex-shrink-0 mt-1.5" />
                  {i < milestones.length - 1 && <div className="w-0.5 flex-1 bg-brand-gray-200 my-1" />}
                </div>
                <div className="pb-6">
                  <span className="text-xs font-bold text-destructive">{m.year}</span>
                  <p className="text-sm text-foreground font-medium">{m.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Know Our Team */}
    <section className="bg-brand-gray-50 py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-2">Our Leadership</span>
          <h2 className="text-3xl font-extrabold text-primary mb-2">Know Our Team</h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            The partners behind Devisahai Charan Dass Associates — driving excellence and building lasting relationships for over five decades.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div key={member.name} className="bg-background border border-brand-gray-200 rounded-xl overflow-hidden hover:border-primary hover:shadow-lg transition-all text-center">
              <div className="h-56 overflow-hidden">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-5">
                <h4 className="text-base font-bold text-foreground mb-1">{member.name}</h4>
                <p className="text-sm text-primary font-semibold">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Textile Division */}
    <section className="py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Shirt className="w-5 h-5 text-primary" />
          </div>
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive">Textile Division</span>
        </div>
        <h2 className="text-3xl font-extrabold text-primary mb-4">A Legacy of 50+ Years in Textiles</h2>
        <p className="text-muted-foreground leading-relaxed max-w-3xl mb-8">
          Appointed as the Authorised Del Credere Agent for Reliance Industries – Textile Division in 1972, 
          we have maintained a strong and progressive association with Reliance for more than 50 years. 
          Today, we are recognized among the leading DCAs for Textiles in India.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Calendar, value: "1972", label: "Appointed as Authorised DCA" },
            { icon: Award, value: "50+ Years", label: "Strong Association with Reliance" },
            { icon: MapPin, value: "Pan India", label: "Market Presence & Expansion" },
            { icon: Users, value: "Extensive", label: "Distribution Network" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="bg-background border border-brand-gray-200 rounded-xl p-5 text-center">
              <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <strong className="block text-xl font-extrabold text-primary">{value}</strong>
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
        <div className="bg-background border border-brand-gray-200 rounded-xl p-6">
          <h4 className="font-bold text-primary mb-3">Our Distribution Network Covers:</h4>
          <div className="flex gap-6 flex-wrap">
            {[
              { icon: Users, label: "Wholesalers" },
              { icon: Building2, label: "Retailers" },
              { icon: Shirt, label: "Institutional Uniform Businesses" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-destructive" />
                <span className="text-sm font-semibold text-foreground">{label}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Phone className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">For Textiles:</span>
            <a href="tel:+919599498336" className="text-sm font-semibold text-primary hover:underline">95994 98336</a>
            <span className="text-muted-foreground">|</span>
            <a href="tel:+919810625999" className="text-sm font-semibold text-primary hover:underline">98106 25999</a>
          </div>
        </div>
      </div>
    </section>

    {/* Polymer Division */}
    <section className="bg-brand-gray-50 py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <FlaskConical className="w-5 h-5 text-primary" />
          </div>
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive">Polymers Division</span>
        </div>
        <h2 className="text-3xl font-extrabold text-primary mb-4">Leading Polymer Distribution Since 2003</h2>
        <p className="text-muted-foreground leading-relaxed max-w-3xl mb-8">
          Since 2003, Devi Sahai Charan Dass Associates has been serving as the Authorised Del Credere Agent 
          for Reliance Industries – Polymer Division. Through strategic coordination we ensure efficient product availability 
          and structured commercial support.
        </p>
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <div className="bg-background rounded-xl p-6 border border-brand-gray-200">
            <h4 className="font-bold text-primary mb-4">Our Polymer Portfolio</h4>
            <ul className="space-y-2.5">
              {["Polypropylene (PP)", "Polyethylene (PE)", "Polyvinyl Chloride (PVC)", "Polyethylene Terephthalate (PET)"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-destructive flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-background rounded-xl p-6 border border-brand-gray-200">
            <h4 className="font-bold text-primary mb-4">Key Industry Sectors</h4>
            <ul className="space-y-2.5">
              {["Hygiene & Healthcare", "Packaging & FMCG", "Pipes & Infrastructure", "Fibre Optic Cables", "Automotive Components", "Beverage & Container Manufacturing"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-primary rounded-xl p-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-primary-foreground font-bold">We are among the leading DCAs under the Delhi Regional Office</p>
            <p className="text-sm" style={{ color: "hsl(0 0% 100% / 0.7)" }}>In terms of sanctioned limits and total tonnage handled</p>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-primary-foreground" />
            <div>
              <span className="text-sm text-primary-foreground/70">For Polymers:</span>
              <div className="text-primary-foreground font-bold text-sm">
                <a href="tel:+919910495815" className="hover:underline">99104 95815</a> | <a href="tel:+919810100045" className="hover:underline">98101 00045</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="bg-secondary py-16 px-6">
      <div className="max-w-[800px] mx-auto text-center">
        <h2 className="text-2xl font-extrabold text-primary mb-4">Want to Know More?</h2>
        <p className="text-muted-foreground mb-6">Explore our full product range or get in touch with our team.</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/products" className="inline-flex items-center gap-2 bg-destructive text-destructive-foreground font-bold px-6 py-3 rounded-lg hover:bg-brand-gold-dark transition-colors">
            View All Products <ChevronRight className="w-4 h-4" />
          </Link>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-3 rounded-lg hover:bg-brand-blue-dark transition-colors">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default About;
