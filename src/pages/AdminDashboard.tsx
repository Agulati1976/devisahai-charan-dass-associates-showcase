import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Package, MessageSquare, TrendingUp, FileText, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

interface RecentEnquiry {
  id: string;
  name: string;
  email: string;
  source_type: string;
  status: string;
  created_at: string;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState({ products: 0, enquiries: 0, newEnquiries: 0, rfqs: 0, contacts: 0 });
  const [recent, setRecent] = useState<RecentEnquiry[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const [{ count: pCount }, { count: eCount }, { count: nCount }, { count: rCount }, { count: cCount }] = await Promise.all([
        supabase.from("products").select("*", { count: "exact", head: true }),
        supabase.from("enquiries").select("*", { count: "exact", head: true }),
        supabase.from("enquiries").select("*", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("enquiries").select("*", { count: "exact", head: true }).eq("source_type", "rfq"),
        supabase.from("enquiries").select("*", { count: "exact", head: true }).eq("source_type", "contact"),
      ]);
      setStats({ products: pCount || 0, enquiries: eCount || 0, newEnquiries: nCount || 0, rfqs: rCount || 0, contacts: cCount || 0 });
    };
    const fetchRecent = async () => {
      const { data } = await supabase.from("enquiries").select("id, name, email, source_type, status, created_at").order("created_at", { ascending: false }).limit(5);
      if (data) setRecent(data as RecentEnquiry[]);
    };
    fetchStats();
    fetchRecent();
  }, []);

  const cards = [
    { label: "Total Products", value: stats.products, icon: Package, color: "bg-primary" },
    { label: "Total Enquiries", value: stats.enquiries, icon: MessageSquare, color: "bg-accent" },
    { label: "New Enquiries", value: stats.newEnquiries, icon: TrendingUp, color: "bg-green-600" },
    { label: "RFQ Submissions", value: stats.rfqs, icon: FileText, color: "bg-primary" },
    { label: "Contact Forms", value: stats.contacts, icon: MessageSquare, color: "bg-accent" },
  ];

  const statusColors: Record<string, string> = {
    new: "bg-blue-100 text-blue-700",
    contacted: "bg-yellow-100 text-yellow-700",
    converted: "bg-green-100 text-green-700",
    closed: "bg-gray-100 text-gray-500",
  };

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-foreground mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {cards.map((c) => (
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

      {/* Recent Enquiries */}
      <div className="bg-card border border-brand-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-brand-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            <h2 className="text-base font-bold text-foreground">Recent Enquiries</h2>
          </div>
          <Link to="/admin/enquiries" className="text-xs font-semibold text-primary hover:underline">View all →</Link>
        </div>
        {recent.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">No enquiries yet. They will appear here when customers submit forms on your website.</div>
        ) : (
          <table className="w-full text-sm">
            <tbody>
              {recent.map((e) => (
                <tr key={e.id} className="border-b border-brand-gray-100 last:border-0">
                  <td className="px-5 py-3 font-semibold text-foreground">{e.name}</td>
                  <td className="px-5 py-3 text-muted-foreground hidden sm:table-cell">{e.email}</td>
                  <td className="px-5 py-3 hidden md:table-cell">
                    <span className="text-xs font-bold uppercase px-2 py-1 rounded bg-secondary text-primary">{e.source_type}</span>
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell">
                    <span className={`text-xs font-bold px-2 py-1 rounded capitalize ${statusColors[e.status] || ""}`}>{e.status}</span>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground text-right text-xs">{format(new Date(e.created_at), "dd MMM yyyy")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
