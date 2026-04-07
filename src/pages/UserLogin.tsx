import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/logo-dc.jpeg";

const UserLogin = () => {
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

      // Check if admin → redirect to admin
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user.id);

      const isAdmin = roles?.some(r => r.role === "admin");
      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
      toast.success("Welcome back!");
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-brand-gray-50">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img src={logo} alt="DSCD" className="h-12 mx-auto mb-3" />
          <h1 className="text-2xl font-extrabold text-foreground">Team Login</h1>
          <p className="text-sm text-muted-foreground">Access your assigned leads</p>
        </div>
        <div className="bg-card border border-brand-gray-200 rounded-2xl p-6">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2.5 border border-brand-gray-200 rounded-lg text-sm bg-background outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" placeholder="you@company.com" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
              <div className="relative">
                <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2.5 pr-10 border border-brand-gray-200 rounded-lg text-sm bg-background outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" placeholder="Enter your password" required />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 text-sm">
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
