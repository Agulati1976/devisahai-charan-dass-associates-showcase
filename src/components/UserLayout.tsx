import { useEffect, useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LayoutDashboard, LogOut, Menu, Home } from "lucide-react";
import { toast } from "sonner";

const UserLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        return;
      }
      // If admin, redirect to admin panel
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin");

      if (roles && roles.length > 0) {
        navigate("/admin");
        return;
      }
      setLoading(false);
    };
    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out");
    navigate("/login");
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-brand-gray-50">
      <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
    </div>
  );

  return (
    <div className="min-h-screen flex bg-brand-gray-50">
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-primary text-primary-foreground flex flex-col transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="px-6 py-5 border-b border-primary-foreground/10">
          <h2 className="text-lg font-extrabold">DSCD Portal</h2>
          <p className="text-xs opacity-60">Team Dashboard</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          <Link to="/dashboard" onClick={() => setSidebarOpen(false)} className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${location.pathname === "/dashboard" ? "bg-primary-foreground/20" : "hover:bg-primary-foreground/10"}`}>
            <LayoutDashboard className="w-4 h-4" /> My Leads
          </Link>
        </nav>
        <div className="px-3 py-4 border-t border-primary-foreground/10 space-y-1">
          <Link to="/" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-foreground/10 transition-colors">
            <Home className="w-4 h-4" /> View Website
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-foreground/10 transition-colors text-left">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>
      {sidebarOpen && <div className="fixed inset-0 bg-foreground/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-background border-b border-brand-gray-200 px-6 py-4 flex items-center gap-4 lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="text-foreground"><Menu className="w-5 h-5" /></button>
          <h2 className="text-sm font-bold text-primary">DSCD Portal</h2>
        </header>
        <main className="flex-1 p-6"><Outlet /></main>
      </div>
    </div>
  );
};

export default UserLayout;
