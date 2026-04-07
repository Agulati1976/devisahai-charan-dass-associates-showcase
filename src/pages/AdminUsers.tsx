import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, X, Users, Shield, User } from "lucide-react";
import { toast } from "sonner";

interface AppUser {
  id: string;
  email: string;
  full_name: string;
  roles: string[];
  created_at: string;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", full_name: "", role: "user" });

  const fetchUsers = async () => {
    const { data, error } = await supabase.functions.invoke("manage-users", {
      body: { action: "list_users" },
    });
    if (error) {
      toast.error("Failed to load users");
    } else if (data?.users) {
      setUsers(data.users);
    }
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) return;
    setCreating(true);
    try {
      const { data, error } = await supabase.functions.invoke("manage-users", {
        body: { action: "create_user", ...form },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      toast.success("User created successfully");
      setShowCreate(false);
      setForm({ email: "", password: "", full_name: "", role: "user" });
      fetchUsers();
    } catch (err: any) {
      toast.error(err.message || "Failed to create user");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (userId: string, email: string) => {
    if (!confirm(`Delete user ${email}?`)) return;
    const { data, error } = await supabase.functions.invoke("manage-users", {
      body: { action: "delete_user", user_id: userId },
    });
    if (error || data?.error) {
      toast.error(data?.error || "Failed to delete");
    } else {
      toast.success("User deleted");
      fetchUsers();
    }
  };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-foreground">User Management</h1>
        <button onClick={() => setShowCreate(true)} className="bg-primary text-primary-foreground font-bold px-4 py-2.5 rounded-lg text-sm flex items-center gap-2 hover:opacity-90">
          <Plus className="w-4 h-4" /> Create User
        </button>
      </div>

      <div className="bg-card border border-brand-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-brand-gray-50 border-b border-brand-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Name</th>
              <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Email</th>
              <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Role</th>
              <th className="text-right px-4 py-3 font-semibold text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr><td colSpan={4} className="text-center py-12 text-muted-foreground">No users found.</td></tr>
            ) : users.map((u) => (
              <tr key={u.id} className="border-b border-brand-gray-100 hover:bg-brand-gray-50/50">
                <td className="px-4 py-3 font-semibold text-foreground flex items-center gap-2">
                  {u.roles.includes("admin") ? <Shield className="w-4 h-4 text-primary" /> : <User className="w-4 h-4 text-muted-foreground" />}
                  {u.full_name}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-bold px-2 py-1 rounded capitalize ${u.roles.includes("admin") ? "bg-primary/10 text-primary" : "bg-green-100 text-green-700"}`}>
                    {u.roles.includes("admin") ? "Admin" : "User"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  {!u.roles.includes("admin") && (
                    <button onClick={() => handleDelete(u.id, u.email)} className="text-red-500 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create User Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-foreground/40 z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-brand-gray-200 rounded-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-brand-gray-200">
              <h2 className="text-lg font-extrabold text-foreground flex items-center gap-2"><Users className="w-5 h-5 text-primary" /> Create New User</h2>
              <button onClick={() => setShowCreate(false)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleCreate} className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Full Name</label>
                <input className="w-full px-3.5 py-2.5 border border-brand-gray-200 rounded-lg text-sm bg-background outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" placeholder="User name" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Email <span className="text-destructive">*</span></label>
                <input type="email" required className="w-full px-3.5 py-2.5 border border-brand-gray-200 rounded-lg text-sm bg-background outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" placeholder="user@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Password <span className="text-destructive">*</span></label>
                <input type="text" required className="w-full px-3.5 py-2.5 border border-brand-gray-200 rounded-lg text-sm bg-background outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" placeholder="Set password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Role</label>
                <select className="w-full px-3.5 py-2.5 border border-brand-gray-200 rounded-lg text-sm bg-background outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button type="submit" disabled={creating} className="w-full bg-primary text-primary-foreground font-bold py-2.5 rounded-lg hover:opacity-90 disabled:opacity-50 text-sm">
                {creating ? "Creating…" : "Create User"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
