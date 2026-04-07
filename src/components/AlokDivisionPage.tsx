import { CheckCircle2, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface AlokDivisionPageProps {
  title: string;
  description: string;
  features: string[];
  applications: string[];
  image?: string;
}

const AlokDivisionPage = ({ title, description, features, applications, image }: AlokDivisionPageProps) => (
  <div>
    {/* Hero */}
    <section className="bg-primary py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(ellipse at 30% 50%, hsl(0 0% 100% / 0.3) 0%, transparent 70%)" }} />
      <div className="max-w-[1000px] mx-auto relative z-10 text-center">
        <Link to="/alok" className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-destructive mb-3 hover:underline">
          Alok Industries <ChevronRight className="w-3 h-3" /> {title}
        </Link>
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-4 text-balance">
          {title}
        </h1>
      </div>
    </section>

    {/* Content */}
    <section className="max-w-[1200px] mx-auto py-16 px-6">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left: Description + Features + Applications */}
        <div>
          <h2 className="text-3xl font-extrabold text-primary mb-4">{title}</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">{description}</p>
          <div className="bg-brand-gray-50 rounded-xl p-6 border border-brand-gray-200 mb-6">
            <h3 className="font-bold text-primary mb-4">Key Features</h3>
            <ul className="space-y-3">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-foreground">{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-brand-gray-50 rounded-xl p-6 border border-brand-gray-200">
            <h3 className="font-bold text-primary mb-4">Applications</h3>
            <ul className="space-y-3">
              {applications.map((a) => (
                <li key={a} className="flex items-start gap-3">
                  <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-foreground">{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Image + CTA */}
        <div>
          {image && (
            <div className="rounded-xl overflow-hidden mb-6 border border-brand-gray-200">
              <img src={image} alt={title} className="w-full h-auto object-cover" />
            </div>
          )}
          <div className="bg-primary rounded-xl p-6 text-center">
            <p className="text-primary-foreground font-bold mb-2">Interested in our {title.toLowerCase()}?</p>
            <p className="text-sm mb-4" style={{ color: "hsl(0 0% 100% / 0.7)" }}>Get in touch with our team for samples and pricing.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-destructive text-destructive-foreground font-bold px-6 py-3 rounded-lg hover:bg-brand-gold-dark transition-colors">
              Contact Us <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default AlokDivisionPage;
