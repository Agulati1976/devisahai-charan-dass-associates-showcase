import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ContextType {
  openRFQ: (product: string, grade: string, cat: string) => void;
}

const Contact = () => {
  const { openRFQ } = useOutletContext<ContextType>();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("enquiries").insert({
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: form.company,
        message: `[${form.subject || "General"}] ${form.message}`,
        product_interest: form.subject,
        source_type: "contact",
      });
      if (error) throw error;
      setSubmitted(true);
    } catch (err: any) {
      toast.error(err.message || "Failed to submit");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-3.5 py-2.5 border border-brand-gray-200 rounded-lg text-sm bg-background text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10";

  return (
    <div>
      <section className="bg-primary py-16 px-6">
        <div className="max-w-[1000px] mx-auto text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-3">Get in Touch</span>
          <h1 className="text-4xl font-extrabold text-primary-foreground mb-3">Contact Us</h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "hsl(0 0% 100% / 0.8)" }}>
            Reach out for quotations, product queries, or partnership discussions.
          </p>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto py-16 px-6">
        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-xl font-extrabold text-primary mb-6">Devisahai Charan Dass Associates</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0"><MapPin className="w-5 h-5 text-primary" /></div>
                  <div><h4 className="text-sm font-bold text-foreground">Office Address</h4><p className="text-sm text-muted-foreground">New Delhi, India</p></div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0"><Mail className="w-5 h-5 text-primary" /></div>
                  <div><h4 className="text-sm font-bold text-foreground">Email</h4><a href="mailto:info@devisahaicharandass.com" className="text-sm text-primary hover:underline">info@devisahaicharandass.com</a></div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0"><Clock className="w-5 h-5 text-primary" /></div>
                  <div><h4 className="text-sm font-bold text-foreground">Business Hours</h4><p className="text-sm text-muted-foreground">Mon – Sat: 9:30 AM – 6:30 PM IST</p></div>
                </div>
              </div>
            </div>
            <div className="bg-secondary rounded-xl p-5">
              <h4 className="font-bold text-primary mb-4">Division Contacts</h4>
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-destructive">Textiles Division</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone className="w-3.5 h-3.5 text-primary" />
                    <a href="tel:+919599498336" className="text-sm font-semibold text-foreground hover:text-primary">95994 98336</a>
                    <span className="text-muted-foreground">|</span>
                    <a href="tel:+919810625999" className="text-sm font-semibold text-foreground hover:text-primary">98106 25999</a>
                  </div>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-destructive">Polymers Division</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone className="w-3.5 h-3.5 text-primary" />
                    <a href="tel:+919910495815" className="text-sm font-semibold text-foreground hover:text-primary">99104 95815</a>
                    <span className="text-muted-foreground">|</span>
                    <a href="tel:+919810100045" className="text-sm font-semibold text-foreground hover:text-primary">98101 00045</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-primary rounded-xl p-5 text-center">
              <p className="text-primary-foreground font-bold mb-2">Need a Quick Quote?</p>
              <p className="text-sm mb-4" style={{ color: "hsl(0 0% 100% / 0.7)" }}>Submit an RFQ and get a response within 2 hours.</p>
              <button onClick={() => openRFQ("General Enquiry", "All Products", "General")} className="bg-destructive text-destructive-foreground font-bold px-6 py-2.5 rounded-lg text-sm hover:bg-brand-gold-dark transition-colors">Contact Us</button>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-card border border-brand-gray-200 rounded-2xl p-8">
              <h3 className="text-xl font-extrabold text-primary mb-1">Send Us a Message</h3>
              <p className="text-sm text-muted-foreground mb-6">We'll get back to you within 1 business day.</p>
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-brand-gray-700 mb-1">Full Name <span className="text-destructive">*</span></label>
                      <input className={inputClass} placeholder="Your Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-brand-gray-700 mb-1">Company Name</label>
                      <input className={inputClass} placeholder="Company Name" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-brand-gray-700 mb-1">Email <span className="text-destructive">*</span></label>
                      <input type="email" className={inputClass} placeholder="you@company.com" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-brand-gray-700 mb-1">Phone Number <span className="text-destructive">*</span></label>
                      <input type="tel" className={inputClass} placeholder="+91 98XXXXXXXX" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brand-gray-700 mb-1">Subject</label>
                    <select className={inputClass} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>
                      <option value="">Select a subject</option>
                      <option>Polymer Enquiry</option>
                      <option>Textile Enquiry</option>
                      <option>Partnership</option>
                      <option>Pricing & Availability</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brand-gray-700 mb-1">Message <span className="text-destructive">*</span></label>
                    <textarea className={`${inputClass} min-h-[120px] resize-y`} placeholder="How can we help you?" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                  </div>
                  <button type="submit" disabled={loading} className="w-full bg-destructive text-destructive-foreground font-bold py-3.5 rounded-lg hover:bg-brand-gold-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                    <Send className="w-4 h-4" /> {loading ? "Sending…" : "Send Message"}
                  </button>
                </form>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4"><Send className="w-7 h-7 text-green-600" /></div>
                  <h3 className="text-xl font-extrabold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-sm text-muted-foreground mb-4">Thank you for reaching out. We'll get back to you within 1 business day.</p>
                  <button onClick={() => { setSubmitted(false); setForm({ name: "", company: "", email: "", phone: "", subject: "", message: "" }); }} className="text-sm text-primary font-semibold hover:underline">Send another message</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
