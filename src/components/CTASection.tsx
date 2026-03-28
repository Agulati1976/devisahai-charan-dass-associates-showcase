import { FileText, Phone } from "lucide-react";

interface Props {
  onOpenRFQ: (product: string, grade: string, cat: string) => void;
}

const CTASection = ({ onOpenRFQ }: Props) => (
  <section className="py-20 px-6" style={{ background: "linear-gradient(135deg, hsl(224 60% 95%) 0%, hsl(224 80% 90%) 50%, hsl(224 100% 30% / 0.1) 100%)" }}>
    <div className="max-w-[800px] mx-auto text-center">
      <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-3">Ready to Get Started?</span>
      <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-4 text-balance">
        Let's discuss your polymer & textile requirements
      </h2>
      <p className="text-muted-foreground text-base mb-8 max-w-lg mx-auto">
        Get priority pricing, flexible credit terms, and dedicated account management. Our team responds within 2 business hours.
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        <button
          onClick={() => onOpenRFQ("General Enquiry", "All Products", "General")}
          className="inline-flex items-center gap-2 bg-destructive text-destructive-foreground font-bold px-8 py-4 rounded-lg shadow-lg shadow-destructive/30 hover:bg-brand-red-dark hover:-translate-y-0.5 transition-all text-base"
        >
          <FileText className="w-5 h-5" /> Submit RFQ Now
        </button>
        <a
          href="tel:+919810100045"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-8 py-4 rounded-lg hover:bg-brand-blue-dark transition-all text-base"
        >
          <Phone className="w-5 h-5" /> Call Us
        </a>
      </div>
    </div>
  </section>
);

export default CTASection;
