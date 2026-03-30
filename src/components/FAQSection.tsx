import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "What products does Devi Sahai Charan Dass Associates deal in?",
    a: "We are authorised Del Credere Agents of Reliance Industries Limited, dealing in the complete range of Reliance Polymers (PP, HDPE, LLDPE, LDPE, PVC, PET) and Reliance Textiles (Vimal Suitings, Vimal Gifting, Uniforms, Polyester Suiting, Georgia Gullini).",
  },
  {
    q: "What is the minimum order quantity?",
    a: "For polymers, the minimum order is typically 1 metric tonne (MT). For textiles, minimum orders vary by product — please contact us for specific requirements.",
  },
  {
    q: "Do you provide grade sheets and technical specifications?",
    a: "Yes, we provide detailed Reliance grade sheets for all polymer products. You can download them directly from our product pages by providing your contact details.",
  },
  {
    q: "Which regions do you serve?",
    a: "We primarily serve customers across North India from our offices in Delhi and Lucknow. For bulk orders, we cater to clients pan-India.",
  },
  {
    q: "How can I get a quotation?",
    a: "You can request a quotation through our contact page, call us directly, or use the enquiry form available on each product page. Our team responds within 24 hours.",
  },
  {
    q: "Are you an authorised dealer of Reliance Industries?",
    a: "Yes, we have been an authorised Del Credere Agent (DCA) of Reliance Industries since 1972 for Textiles and since 2003 for Polymers.",
  },
];

const FAQSection = () => (
  <section className="max-w-[1200px] mx-auto py-16 px-6">
    <div className="flex items-center gap-3 mb-2">
      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
        <HelpCircle className="w-5 h-5 text-primary" />
      </div>
      <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent">Got Questions?</span>
    </div>
    <h2 className="text-3xl font-extrabold text-primary mb-8">Frequently Asked Questions</h2>
    <Accordion type="single" collapsible className="w-full space-y-3">
      {faqs.map((faq, i) => (
        <AccordionItem key={i} value={`faq-${i}`} className="border border-brand-gray-200 rounded-xl px-6 bg-card data-[state=open]:border-primary transition-colors">
          <AccordionTrigger className="text-left font-bold text-foreground hover:no-underline">
            {faq.q}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground leading-relaxed">
            {faq.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </section>
);

export default FAQSection;
