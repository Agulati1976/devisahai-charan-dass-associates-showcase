import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { MessageSquare, Eye, X, Mail, Phone, Building2, Package, FileText, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

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
  assigned_to: string | null;
  created_at: string;
}

interface AppUser {
  id: string;
  email: string;
  full_name: string;
  roles: string[];
}

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  converted: "bg-green-100 text-green-700",
  closed: "bg-gray-100 text-gray-500",
};

const AdminEnquiries = () => {
  const [searchParams] = useSearchParams();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Enquiry | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState(searchParams.get("source") || "all");
  const [users, setUsers] = useState<AppUser[]>([]);

  const fetchEnquiries = async () => {
    let q = supabase.from("enquiries").select("*").order("created_at", { ascending: false });
    if (statusFilter !== "all") q = q.eq("status", statusFilter);
    if (sourceFilter !== "all") q = q.eq("source_type", sourceFilter);
    const { data, error } = await q;
    if (!error && data) setEnquiries(data as Enquiry[]);
    setLoading(false);
  };

  const fetchUsers = async () => {
    const { data } = await supabase.functions.invoke("manage-users", {
      body: { action: "list_users" },
    });
    if (data?.users) setUsers(data.users);
  };

  useEffect(() => { fetchEnquiries(); }, [statusFilter, sourceFilter]);
  useEffect(() => { fetchUsers(); }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("enquiries").update({ status }).eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success(`Status updated to ${status}`);
      fetchEnquiries();
      if (selected?.id === id) setSelected({ ...selected, status });
    }
  };

  const assignTo = async (id: string, userId: string | null) => {
    const { error } = await supabase.from("enquiries").update({ assigned_to: userId }).eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success(userId ? "Lead assigned" : "Assignment removed");
      fetchEnquiries();
      if (selected?.id === id) setSelected({ ...selected, assigned_to: userId });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this enquiry?")) return;
    const { error } = await supabase.from("enquiries").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Enquiry deleted");
      setSelected(null);
      fetchEnquiries();
    }
  };

  const getUserName = (userId: string | null) => {
    if (!userId) return "Unassigned";
    const u = users.find(u => u.id === userId);
    return u?.full_name || u?.email || "Unknown";
  };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>;

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-foreground mb-6">Enquiries</h1>

      {/* Source tabs */}
      <div className="flex gap-3 mb-4 flex-wrap">
        {[
          { key: "all", label: "All Enquiries", icon: MessageSquare },
          { key: "contact", label: "Contact Form", icon: Mail },
          { key: "rfq", label: "RFQ Submissions", icon: FileText },
          { key: "grade_sheet", label: "Grade Sheet", icon: Package },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSourceFilter(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${sourceFilter === tab.key ? "bg-primary text-primary-foreground" : "bg-card border border-brand-gray-200 text-muted-foreground hover:border-primary hover:text-primary"}`}
          >
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </div>

      {/* Status filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["all", "new", "contacted", "converted", "closed"].map((s) => (
          <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 text-xs font-bold rounded-lg capitalize transition-colors ${statusFilter === s ? "bg-accent text-accent-foreground" : "bg-brand-gray-100 text-muted-foreground hover:bg-brand-gray-200"}`}>
            {s}
          </button>
        ))}
      </div>

      <div className="bg-card border border-brand-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-brand-gray-50 border-b border-brand-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Name</th>
              <th className="text-left px-4 py-3 font-semibold text-muted-foreground hidden sm:table-cell">Email</th>
              <th className="text-left px-4 py-3 font-semibold text-muted-foreground hidden md:table-cell">Source</th>
              <th className="text-left px-4 py-3 font-semibold text-muted-foreground hidden md:table-cell">Assigned To</th>
              <th className="text-left px-4 py-3 font-semibold text-muted-foreground hidden md:table-cell">Status</th>
              <th className="text-left px-4 py-3 font-semibold text-muted-foreground hidden lg:table-cell">Date</th>
              <th className="text-right px-4 py-3 font-semibold text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.length === 0 ? (
              <tr><td colSpan={7} className="text-center py-12 text-muted-foreground">No enquiries found.</td></tr>
            ) : enquiries.map((e) => (
              <tr key={e.id} className="border-b border-brand-gray-100 hover:bg-brand-gray-50/50">
                <td className="px-4 py-3 font-semibold text-foreground">{e.name}</td>
                <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{e.email}</td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${e.source_type === "rfq" ? "bg-primary/10 text-primary" : "bg-secondary text-accent-foreground"}`}>{e.source_type}</span>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className={`text-xs font-semibold ${e.assigned_to ? "text-primary" : "text-muted-foreground"}`}>
                    {getUserName(e.assigned_to)}
                  </span>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className={`text-xs font-bold px-2 py-1 rounded capitalize ${statusColors[e.status] || ""}`}>{e.status}</span>
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell text-xs">{format(new Date(e.created_at), "dd MMM yyyy")}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => setSelected(e)} className="text-primary hover:text-primary/80"><Eye className="w-4 h-4" /></button>
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
              <div className="flex items-center gap-2">
                {selected.source_type === "rfq" ? <FileText className="w-5 h-5 text-primary" /> : <MessageSquare className="w-5 h-5 text-primary" />}
                <h2 className="text-lg font-extrabold text-foreground">{selected.source_type === "rfq" ? "RFQ Details" : "Enquiry Details"}</h2>
              </div>
              <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <p className="font-bold text-foreground">{selected.name}</p>
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
                  <p className="text-xs font-bold text-muted-foreground mb-1">{selected.source_type === "rfq" ? "RFQ Details" : "Message"}</p>
                  <p className="text-sm text-foreground whitespace-pre-wrap">{selected.message}</p>
                </div>
              )}

              {/* Assign To */}
              <div>
                <p className="text-xs font-bold text-muted-foreground mb-2 flex items-center gap-1"><UserPlus className="w-3.5 h-3.5" /> Assign To</p>
                <select
                  className="w-full px-3.5 py-2.5 border border-brand-gray-200 rounded-lg text-sm bg-background outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                  value={selected.assigned_to || ""}
                  onChange={(e) => assignTo(selected.id, e.target.value || null)}
                >
                  <option value="">Unassigned</option>
                  {users.filter(u => !u.roles.includes("admin")).map(u => (
                    <option key={u.id} value={u.id}>{u.full_name} ({u.email})</option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div>
                <p className="text-xs font-bold text-muted-foreground mb-2">Update Status</p>
                <div className="flex gap-2 flex-wrap">
                  {["new", "contacted", "converted", "closed"].map((s) => (
                    <button key={s} onClick={() => updateStatus(selected.id, s)} className={`px-3 py-1.5 text-xs font-bold rounded-lg capitalize transition-colors ${selected.status === s ? "bg-primary text-primary-foreground" : "bg-brand-gray-100 text-muted-foreground hover:bg-brand-gray-200"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {selected.notes && (
                <div className="bg-brand-gray-50 rounded-lg p-4">
                  <p className="text-xs font-bold text-muted-foreground mb-1">Notes</p>
                  <p className="text-sm text-foreground whitespace-pre-wrap">{selected.notes}</p>
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t border-brand-gray-200 flex justify-between">
              <button onClick={() => handleDelete(selected.id)} className="text-red-500 text-sm font-semibold hover:text-red-700">Delete</button>
              <button onClick={() => setSelected(null)} className="px-5 py-2 bg-primary text-primary-foreground font-bold text-sm rounded-lg hover:opacity-90">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEnquiries;
