import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/logo.png";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      const { data: roles, error: roleErr } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user.id)
        .eq("role", "admin");

      if (roleErr || !roles || roles.length === 0) {
        await supabase.auth.signOut();
        toast.error("Access denied. You are not an admin.");
        return;
      }

      toast.success("Welcome back!");
      navigate("/admin");
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative flex-col justify-between p-12">
        <div>
          <img src={logo} alt="DSCD" className="h-12 brightness-0 invert mb-2" />
          <p className="text-primary-foreground/60 text-sm">Authorised DCA of Reliance Industries</p>
        </div>
        <div>
          <h2 className="text-3xl font-extrabold text-primary-foreground leading-tight mb-4">
            Manage your products<br />and enquiries.
          </h2>
          <p className="text-primary-foreground/60 text-sm max-w-sm leading-relaxed">
            Access the internal management dashboard to update product listings, track customer enquiries, and monitor business performance.
          </p>
        </div>
        <p className="text-primary-foreground/40 text-xs">© {new Date().getFullYear()} Devisahai Charan Dass Associates. All rights reserved.</p>
      </div>

      {/* Right side - form */}
      <div className="flex-1 flex items-center justify-center px-6 bg-background">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-8">
            <img src={logo} alt="DSCD" className="h-10 mb-1" />
          </div>
          <h1 className="text-2xl font-extrabold text-foreground mb-1">Welcome back</h1>
          <p className="text-sm text-muted-foreground mb-8">Sign in to the admin dashboard</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-brand-gray-200 rounded-lg text-sm bg-background outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                placeholder="you@company.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 pr-10 border border-brand-gray-200 rounded-lg text-sm bg-background outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  placeholder="Enter your password"
                  required
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 text-sm"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-8">
            This area is restricted to authorised personnel only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
