import { useState } from "react";
import { X, Mail, Phone, Download, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface GradeSheetModalProps {
  open: boolean;
  onClose: () => void;
  productName: string;
  productKey?: string;
}

const GradeSheetModal = ({ open, onClose, productName, productKey }: GradeSheetModalProps) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("enquiries").insert({
        name,
        email,
        company,
        message: `Grade sheet download request for ${productName}`,
        product_interest: productName,
        source_type: "grade_sheet",
      });
      if (error) throw error;

      // Notify admin
      supabase.functions.invoke("notify-admin", {
        body: { type: "grade_sheet", name, email, company, product_interest: productName },
      });

      // Send grade sheet email
      if (productKey) {
        await supabase.functions.invoke("send-grade-sheet", {
          body: { name, email, company, productKey },
        });
      }

      setSubmitted(true);
    } catch (err: any) {
      toast.error(err.message || "Failed to submit");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setEmail("");
    setName("");
    setCompany("");
    onClose();
  };

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-foreground/45 z-[1000]" onClick={handleClose} />
      <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4">
        <div className="bg-background rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
          <div className="bg-primary px-6 py-5 flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold text-primary-foreground flex items-center gap-2">
                <Download className="w-5 h-5" /> Download Grade Sheet
              </h3>
              <p className="text-sm text-primary-foreground/75 mt-0.5">{productName}</p>
            </div>
            <button onClick={handleClose} className="bg-primary-foreground/15 hover:bg-primary-foreground/28 rounded-md w-8 h-8 flex items-center justify-center transition-colors">
              <X className="w-4 h-4 text-primary-foreground" />
            </button>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <p className="text-sm text-muted-foreground">
                Enter your details to download the Reliance grade sheet for {productName}.
              </p>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Full Name <span className="text-destructive">*</span></label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your Name"
                  className="w-full px-3.5 py-2.5 border border-brand-gray-200 rounded-lg text-sm bg-background text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Business Email <span className="text-destructive">*</span></label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@company.com"
                    className="w-full pl-10 pr-3.5 py-2.5 border border-brand-gray-200 rounded-lg text-sm bg-background text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Company Name</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Company Name"
                  className="w-full px-3.5 py-2.5 border border-brand-gray-200 rounded-lg text-sm bg-background text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-destructive text-destructive-foreground font-bold py-3 rounded-lg hover:bg-brand-gold-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Download className="w-4 h-4" /> {loading ? "Submitting…" : "Download Grade Sheet"}
              </button>
              <p className="text-[0.65rem] text-muted-foreground text-center flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" /> Your information is used only for providing product details
              </p>
            </form>
          ) : (
            <div className="p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-foreground font-bold text-lg mb-1">Thank You!</h4>
              <p className="text-muted-foreground text-sm mb-4">
                The grade sheet for {productName} will be sent to your email shortly. Our team will also reach out with more details.
              </p>
              <button onClick={handleClose} className="bg-primary text-primary-foreground font-bold px-6 py-2.5 rounded-lg hover:bg-brand-blue-dark transition-colors text-sm">
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GradeSheetModal;
