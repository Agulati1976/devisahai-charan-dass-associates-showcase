import { Users, Heart, Lightbulb, Target, Handshake, Mail, ChevronRight, CheckCircle2, Briefcase, Building2 } from "lucide-react";

const values = [
  { icon: Building2, title: "Company", desc: "55+ years of trusted partnership with Reliance Industries as Authorised Del Credere Agent" },
  { icon: CheckCircle2, title: "Integrity", desc: "Acting with honesty and accountability" },
  { icon: Target, title: "Excellence", desc: "Delivering high standards in every task" },
  { icon: Users, title: "Collaboration", desc: "Working together to achieve shared success" },
  { icon: Lightbulb, title: "Innovation", desc: "Encouraging new ideas and forward thinking" },
  { icon: Handshake, title: "Commitment", desc: "Building lasting relationships with clients and partners" },
];

const culturePoints = [
  "Collaborative and inclusive",
  "Ethical and transparent",
  "Innovation-driven",
  "Focused on continuous improvement",
];

const opportunities = [
  "Business Operations & Process Management",
  "Corporate Administration",
  "Sales & Business Development",
  "Marketing & Branding",
  "Supply Chain & Procurement",
  "Textile & Corporate Gifting Solutions",
];

const Careers = () => (
  <div>
    {/* Hero */}
    <section className="bg-primary py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(ellipse at 30% 50%, hsl(0 0% 100% / 0.3) 0%, transparent 70%)" }} />
      <div className="max-w-[1000px] mx-auto relative z-10 text-center">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-3">Careers</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-4 text-balance">
          Careers at Devi Sahai Charan Dass Associates
        </h1>
        <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "hsl(0 0% 100% / 0.8)" }}>
          We believe that our people are the driving force behind our success. We welcome passionate and motivated individuals who aspire to grow, lead, and contribute.
        </p>
      </div>
    </section>

    {/* Life at Devi Sahai */}
    <section className="max-w-[1200px] mx-auto py-16 px-6">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-2">Work With Us</span>
          <h2 className="text-3xl font-extrabold text-primary mb-4">Life at Devi Sahai</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Life at Devi Sahai Charan Dass Associates is defined by teamwork, innovation, and professional development. We foster a workplace where individuals are empowered to share ideas, develop new skills, and contribute meaningfully to the organization's success.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Our teams collaborate across departments, ensuring that every project reflects quality, efficiency, and excellence.
          </p>
        </div>
        <div className="bg-brand-gray-50 rounded-2xl p-8 border border-brand-gray-200">
          <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5" /> Our Culture
          </h3>
          <p className="text-muted-foreground text-sm mb-5">
            Our organizational culture is built on integrity, professionalism, and respect. We strive to maintain a work environment that values diversity of thought and encourages employees to reach their highest potential.
          </p>
          <ul className="space-y-3">
            {culturePoints.map((point) => (
              <li key={point} className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-destructive flex-shrink-0" />
                <span className="text-sm font-semibold text-foreground">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    {/* Employee Values */}
    <section className="bg-brand-gray-50 py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-2">What Guides Us</span>
          <h2 className="text-3xl font-extrabold text-primary mb-2">Employee Values</h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Our employees are guided by core values that define our work and relationships.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {values.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-background border border-brand-gray-200 rounded-xl p-6 text-center hover:border-primary hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-base font-bold text-foreground mb-1">{title}</h4>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Career Opportunities */}
    <section className="py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-2">Opportunities</span>
            <h2 className="text-3xl font-extrabold text-primary mb-4">Career Opportunities</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We offer opportunities across multiple business functions. If you are passionate about professional growth, innovation, and making a meaningful impact, we invite you to explore career opportunities with us.
            </p>
            <ul className="space-y-3">
              {opportunities.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <Briefcase className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm font-semibold text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Join CTA */}
          <div className="bg-primary rounded-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-extrabold text-primary-foreground mb-3">Join Our Team</h3>
            <p className="text-sm mb-6" style={{ color: "hsl(0 0% 100% / 0.8)" }}>
              Become part of a team that values excellence, integrity, and continuous progress.
            </p>
            <a
              href="mailto:info@devisahaicharandass.com"
              className="inline-flex items-center gap-2 bg-destructive text-destructive-foreground font-bold px-6 py-3 rounded-lg hover:bg-brand-gold-dark transition-colors"
            >
              Send Your Resume <ChevronRight className="w-4 h-4" />
            </a>
            <p className="text-xs mt-4" style={{ color: "hsl(0 0% 100% / 0.6)" }}>
              📩 info@devisahaicharandass.com
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Careers;
