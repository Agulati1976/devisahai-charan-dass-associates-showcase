import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Package, MessageSquare, TrendingUp, Clock } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ products: 0, enquiries: 0, newEnquiries: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [{ count: pCount }, { count: eCount }, { count: nCount }] = await Promise.all([
        supabase.from("products").select("*", { count: "exact", head: true }),
        supabase.from("enquiries").select("*", { count: "exact", head: true }),
        supabase.from("enquiries").select("*", { count: "exact", head: true }).eq("status", "new"),
      ]);
      setStats({ products: pCount || 0, enquiries: eCount || 0, newEnquiries: nCount || 0 });
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Total Products", value: stats.products, icon: Package, color: "bg-primary" },
    { label: "Total Enquiries", value: stats.enquiries, icon: MessageSquare, color: "bg-accent" },
    { label: "New Enquiries", value: stats.newEnquiries, icon: TrendingUp, color: "bg-green-600" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-foreground mb-6">Dashboard</h1>
      <div className="grid sm:grid-cols-3 gap-6 mb-8">
        {cards.map((c) => (
          <div key={c.label} className="bg-card border border-brand-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg ${c.color} flex items-center justify-center`}>
                <c.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-foreground">{c.value}</p>
                <p className="text-sm text-muted-foreground">{c.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-card border border-brand-gray-200 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">Quick Actions</h2>
        </div>
        <p className="text-sm text-muted-foreground">Use the sidebar to manage products and view enquiries from your website.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
