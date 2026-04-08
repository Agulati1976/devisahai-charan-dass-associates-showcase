import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MessageSquare, TrendingUp, Clock, Eye, X, Mail, Phone, Building2, Package, FileText, Save } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string | null;
  product_interest: string | null;
  source_type: string;
  status: string;
  notes: string | null;
  created_at: string;
}

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  converted: "bg-green-100 text-green-700",
  closed: "bg-gray-100 text-gray-500",
};

const UserDashboard = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Enquiry | null>(null);
  const [editNotes, setEditNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [userName, setUserName] = useState("");

  const fetchData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: profile } = await supabase.from("profiles").select("full_name").eq("user_id", user.id).maybeSingle();
    setUserName(profile?.full_name || user.email || "User");

    let q = supabase.from("enquiries").select("*").order("created_at", { ascending: false });
    if (statusFilter !== "all") q = q.eq("status", statusFilter);
    const { data } = await q;
    if (data) setEnquiries(data as Enquiry[]);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, [statusFilter]);

  const updateEnquiry = async (id: string, updates: Record<string, any>) => {
    setSaving(true);
    const { error } = await supabase.from("enquiries").update(updates as any).eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Updated successfully");
      fetchData();
      if (selected?.id === id) setSelected({ ...selected, ...updates } as Enquiry);
    }
    setSaving(false);
  };

  const stats = {
    total: enquiries.length,
    newCount: enquiries.filter(e => e.status === "new").length,
    contacted: enquiries.filter(e => e.status === "contacted").length,
    converted: enquiries.filter(e => e.status === "converted").length,
  };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>;

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-foreground mb-1">Welcome, {userName}</h1>
      <p className="text-sm text-muted-foreground mb-6">Here are your assigned leads</p>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Leads", value: stats.total, icon: MessageSquare, color: "bg-primary" },
          { label: "New", value: stats.newCount, icon: TrendingUp, color: "bg-blue-600" },
          { label: "Contacted", value: stats.contacted, icon: Clock, color: "bg-yellow-600" },
          { label: "Converted", value: stats.converted, icon: MessageSquare, color: "bg-green-600" },
        ].map(c => (
          <div key={c.label} className="bg-card border border-brand-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${c.color} flex items-center justify-center flex-shrink-0`}>
                <c.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xl font-extrabold text-foreground">{c.value}</p>
                <p className="text-xs text-muted-foreground">{c.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Status filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["all", "new", "contacted", "converted", "closed"].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 text-xs font-bold rounded-lg capitalize transition-colors ${statusFilter === s ? "bg-accent text-accent-foreground" : "bg-brand-gray-100 text-muted-foreground hover:bg-brand-gray-200"}`}>
            {s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-card border border-brand-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-brand-gray-50 border-b border-brand-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Name</th>
              <th className="text-left px-4 py-3 font-semibold text-muted-foreground hidden sm:table-cell">Email</th>
              <th className="text-left px-4 py-3 font-semibold text-muted-foreground hidden md:table-cell">Source</th>
              <th className="text-left px-4 py-3 font-semibold text-muted-foreground hidden md:table-cell">Status</th>
              <th className="text-left px-4 py-3 font-semibold text-muted-foreground hidden lg:table-cell">Date</th>
              <th className="text-right px-4 py-3 font-semibold text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-12 text-muted-foreground">No leads assigned to you yet.</td></tr>
            ) : enquiries.map(e => (
              <tr key={e.id} className="border-b border-brand-gray-100 hover:bg-brand-gray-50/50">
                <td className="px-4 py-3 font-semibold text-foreground">{e.name}</td>
                <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{e.email}</td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="text-xs font-bold uppercase px-2 py-1 rounded bg-secondary text-primary">{e.source_type}</span>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className={`text-xs font-bold px-2 py-1 rounded capitalize ${statusColors[e.status] || ""}`}>{e.status}</span>
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell text-xs">{format(new Date(e.created_at), "dd MMM yyyy")}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => { setSelected(e); setEditNotes(e.notes || ""); }} className="text-primary hover:text-primary/80"><Eye className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-foreground/40 z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-brand-gray-200 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-brand-gray-200">
              <h2 className="text-lg font-extrabold text-foreground flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" /> Lead Details
              </h2>
              <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <p className="font-bold text-foreground text-lg">{selected.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{selected.source_type} • {format(new Date(selected.created_at), "dd MMM yyyy, hh:mm a")}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm"><Mail className="w-4 h-4 text-muted-foreground" /><a href={`mailto:${selected.email}`} className="text-primary hover:underline">{selected.email}</a></div>
                {selected.phone && <div className="flex items-center gap-2 text-sm"><Phone className="w-4 h-4 text-muted-foreground" /><a href={`tel:${selected.phone}`} className="text-foreground">{selected.phone}</a></div>}
                {selected.company && <div className="flex items-center gap-2 text-sm"><Building2 className="w-4 h-4 text-muted-foreground" /><span>{selected.company}</span></div>}
                {selected.product_interest && <div className="flex items-center gap-2 text-sm"><Package className="w-4 h-4 text-muted-foreground" /><span>{selected.product_interest}</span></div>}
              </div>
              {selected.message && (
                <div className="bg-brand-gray-50 rounded-lg p-4">
                  <p className="text-xs font-bold text-muted-foreground mb-1">Message</p>
                  <p className="text-sm text-foreground whitespace-pre-wrap">{selected.message}</p>
                </div>
              )}

              {/* Status Update */}
              <div>
                <p className="text-xs font-bold text-muted-foreground mb-2">Update Status</p>
                <div className="flex gap-2 flex-wrap">
                  {["new", "contacted", "converted", "closed"].map(s => (
                    <button key={s} onClick={() => updateEnquiry(selected.id, { status: s })} className={`px-3 py-1.5 text-xs font-bold rounded-lg capitalize transition-colors ${selected.status === s ? "bg-primary text-primary-foreground" : "bg-brand-gray-100 text-muted-foreground hover:bg-brand-gray-200"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <p className="text-xs font-bold text-muted-foreground mb-2">Notes</p>
                <textarea
                  className="w-full px-3.5 py-2.5 border border-brand-gray-200 rounded-lg text-sm bg-background outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 min-h-[100px] resize-y"
                  placeholder="Add notes about this lead..."
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                />
                <button
                  onClick={() => updateEnquiry(selected.id, { notes: editNotes })}
                  disabled={saving}
                  className="mt-2 bg-primary text-primary-foreground font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:opacity-90 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" /> {saving ? "Saving…" : "Save Notes"}
                </button>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-brand-gray-200 flex justify-end">
              <button onClick={() => setSelected(null)} className="px-5 py-2 bg-primary text-primary-foreground font-bold text-sm rounded-lg hover:opacity-90">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
