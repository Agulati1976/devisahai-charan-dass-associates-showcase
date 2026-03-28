import { useState } from "react";
import { X, FileText, FlaskConical, Scissors, Package, Lock, CheckCircle2 } from "lucide-react";

interface RFQDrawerProps {
  open: boolean;
  onClose: () => void;
  product: string;
  grade: string;
  category: string;
}

const catIcons: Record<string, typeof FlaskConical> = {
  Polymers: FlaskConical,
  Textiles: Scissors,
  General: Package,
};

const RFQDrawer = ({ open, onClose, product, grade, category }: RFQDrawerProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [refNo, setRefNo] = useState("");
  const [urgency, setUrgency] = useState("Within 1 Week");
  const [errors, setErrors] = useState<Set<string>>(new Set());

  const CatIcon = catIcons[category] || Package;

  const handleSubmit = () => {
    const required = ["companyName", "industrySeg", "gradeReq", "quantity", "deliveryLoc", "contactName", "mobile", "email"];
    const form = document.getElementById("rfqFormReact") as HTMLFormElement;
    const newErrors = new Set<string>();
    required.forEach((id) => {
      const el = form.querySelector(`#${id}`) as HTMLInputElement;
      if (!el?.value.trim()) newErrors.add(id);
    });
    if (newErrors.size > 0) {
      setErrors(newErrors);
      return;
    }
    const ref = `DSCD-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 90000) + 10000)}`;
    setRefNo(ref);
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setErrors(new Set());
    onClose();
  };

  const inputClass = (id: string) =>
    `w-full px-3.5 py-2.5 border rounded-lg text-sm font-normal bg-background text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10 ${
      errors.has(id) ? "border-destructive ring-2 ring-destructive/12" : "border-brand-gray-200"
    }`;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-foreground/45 z-[1000] transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={handleClose}
      />
      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen w-full max-w-[520px] bg-background z-[1001] flex flex-col shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="bg-primary text-primary-foreground px-7 py-5 flex justify-between items-start flex-shrink-0">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <FileText className="w-5 h-5" /> Request for Quotation
            </h3>
            <p className="text-sm opacity-75 mt-0.5">Our team will respond within 2 business hours</p>
          </div>
          <button onClick={handleClose} className="bg-primary-foreground/15 hover:bg-primary-foreground/28 rounded-md w-8 h-8 flex items-center justify-center transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Product Banner */}
        <div className="bg-secondary border-b border-brand-gray-200 px-7 py-3.5 flex items-center gap-3 flex-shrink-0">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <CatIcon className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <div className="font-bold text-sm text-primary">{product}</div>
            <div className="text-xs text-muted-foreground">{category} Division</div>
          </div>
          <span className="bg-destructive text-destructive-foreground text-[0.72rem] font-bold px-2.5 py-1 rounded">RFQ</span>
        </div>

        {!submitted ? (
          <>
            {/* Form */}
            <div className="flex-1 overflow-y-auto px-7 py-6">
              <form id="rfqFormReact" onSubmit={(e) => e.preventDefault()}>
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-brand-gray-100 pb-2 mb-4">Company Information</div>
                <div className="mb-3">
                  <label className="block text-sm font-semibold text-brand-gray-700 mb-1">Company Name <span className="text-destructive">*</span></label>
                  <input id="companyName" className={inputClass("companyName")} placeholder="e.g. ABC Industries Pvt. Ltd." onInput={() => setErrors((prev) => { const n = new Set(prev); n.delete("companyName"); return n; })} />
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-sm font-semibold text-brand-gray-700 mb-1">Industry Segment <span className="text-destructive">*</span></label>
                    <select id="industrySeg" className={inputClass("industrySeg")} onInput={() => setErrors((prev) => { const n = new Set(prev); n.delete("industrySeg"); return n; })}>
                      <option value="">Select Segment</option>
                      {["Packaging", "Automotive", "Pipes & Fittings", "Textiles / Apparel", "FMCG / Pharma", "Construction", "Agriculture", "Electrical / Cables", "Other"].map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brand-gray-700 mb-1">GST Number</label>
                    <input id="gstNum" className={inputClass("gstNum")} placeholder="27AAACR5055K1ZT" />
                  </div>
                </div>

                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-brand-gray-100 pb-2 mb-4 mt-6">Product Requirements</div>
                <div className="mb-3">
                  <label className="block text-sm font-semibold text-brand-gray-700 mb-1">Grade Required <span className="text-destructive">*</span></label>
                  <input id="gradeReq" className={inputClass("gradeReq")} defaultValue={grade !== "All Products" ? grade : ""} placeholder="e.g. Repol H110MA, Reon S6508…" onInput={() => setErrors((prev) => { const n = new Set(prev); n.delete("gradeReq"); return n; })} />
                  <p className="text-xs text-muted-foreground mt-1">Specify Reliance grade code if known</p>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-sm font-semibold text-brand-gray-700 mb-1">Quantity (MT) <span className="text-destructive">*</span></label>
                    <input id="quantity" type="number" className={inputClass("quantity")} placeholder="e.g. 25" min="1" onInput={() => setErrors((prev) => { const n = new Set(prev); n.delete("quantity"); return n; })} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brand-gray-700 mb-1">Frequency</label>
                    <select id="frequency" className={inputClass("frequency")}>
                      <option value="">Select</option>
                      {["One-Time", "Monthly", "Quarterly", "Spot Purchase"].map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-semibold text-brand-gray-700 mb-1">Delivery Location <span className="text-destructive">*</span></label>
                  <input id="deliveryLoc" className={inputClass("deliveryLoc")} placeholder="City, State" onInput={() => setErrors((prev) => { const n = new Set(prev); n.delete("deliveryLoc"); return n; })} />
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-semibold text-brand-gray-700 mb-1">Urgency</label>
                  <div className="flex gap-2 flex-wrap mt-1">
                    {["Immediate", "Within 1 Week", "1 – 4 Weeks", "Flexible"].map((u) => (
                      <button
                        key={u}
                        type="button"
                        onClick={() => setUrgency(u)}
                        className={`px-3.5 py-2 rounded-md border text-xs font-semibold transition-all ${
                          urgency === u
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background text-brand-gray-700 border-brand-gray-200 hover:border-primary"
                        }`}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-brand-gray-100 pb-2 mb-4 mt-6">Contact Details</div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-sm font-semibold text-brand-gray-700 mb-1">Contact Name <span className="text-destructive">*</span></label>
                    <input id="contactName" className={inputClass("contactName")} placeholder="Your Name" onInput={() => setErrors((prev) => { const n = new Set(prev); n.delete("contactName"); return n; })} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brand-gray-700 mb-1">Designation</label>
                    <input id="designation" className={inputClass("designation")} placeholder="Purchase Manager" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-sm font-semibold text-brand-gray-700 mb-1">Mobile Number <span className="text-destructive">*</span></label>
                    <input id="mobile" type="tel" className={inputClass("mobile")} placeholder="+91 98XXXXXXXX" onInput={() => setErrors((prev) => { const n = new Set(prev); n.delete("mobile"); return n; })} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brand-gray-700 mb-1">Business Email <span className="text-destructive">*</span></label>
                    <input id="email" type="email" className={inputClass("email")} placeholder="you@company.com" onInput={() => setErrors((prev) => { const n = new Set(prev); n.delete("email"); return n; })} />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-semibold text-brand-gray-700 mb-1">Additional Requirements</label>
                  <textarea id="addlReqs" className={`${inputClass("addlReqs")} resize-y min-h-[80px]`} placeholder="Specify any special grades, packaging, documentation, or delivery requirements…" />
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="border-t border-brand-gray-200 px-7 py-5 bg-brand-gray-50 flex-shrink-0">
              <button onClick={handleSubmit} className="w-full bg-destructive text-destructive-foreground font-bold py-3.5 rounded-lg hover:bg-brand-red-dark transition-colors flex items-center justify-center gap-2 text-base">
                <FileText className="w-4 h-4" /> Submit Quotation Request
              </button>
              <p className="text-center text-xs text-muted-foreground mt-2 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" /> Your information is confidential and used only for quotation purposes
              </p>
            </div>
          </>
        ) : (
          /* Success */
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-4">
            <div className="w-[72px] h-[72px] rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-extrabold text-foreground">RFQ Submitted!</h3>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Your quotation request has been received. Our team will contact you within <strong>2 business hours</strong> with pricing and availability.
            </p>
            <div className="bg-secondary border border-dashed border-primary px-5 py-2.5 rounded-lg text-sm font-bold text-primary">
              RFQ Ref: {refNo}
            </div>
            <button onClick={handleClose} className="bg-destructive text-destructive-foreground font-bold px-6 py-3 rounded-lg mt-2 hover:bg-brand-red-dark transition-colors">
              Close
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default RFQDrawer;
