import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  description: string | null;
  category: string;
  subcategory: string | null;
  brand: string | null;
  image_url: string | null;
  detail_link: string | null;
  grade_sheet_url: string | null;
  specs: any;
  is_active: boolean;
  sort_order: number;
}

const emptyProduct: Omit<Product, "id"> = {
  name: "",
  description: "",
  category: "polymers",
  subcategory: "",
  brand: "",
  image_url: "",
  detail_link: "",
  specs: [],
  is_active: true,
  sort_order: 0,
};

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Product | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("products").select("*").order("sort_order");
    if (!error && data) setProducts(data as Product[]);
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const openNew = () => {
    setEditing({ id: "", ...emptyProduct } as Product);
    setIsNew(true);
  };

  const openEdit = (p: Product) => {
    setEditing({ ...p });
    setIsNew(false);
  };

  const handleSave = async () => {
    if (!editing || !editing.name.trim()) {
      toast.error("Product name is required");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        name: editing.name,
        description: editing.description,
        category: editing.category,
        subcategory: editing.subcategory,
        brand: editing.brand,
        image_url: editing.image_url,
        detail_link: editing.detail_link,
        specs: editing.specs,
        is_active: editing.is_active,
        sort_order: editing.sort_order,
      };

      if (isNew) {
        const { error } = await supabase.from("products").insert(payload);
        if (error) throw error;
        toast.success("Product added");
      } else {
        const { error } = await supabase.from("products").update(payload).eq("id", editing.id);
        if (error) throw error;
        toast.success("Product updated");
      }
      setEditing(null);
      fetchProducts();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Product deleted");
      fetchProducts();
    }
  };

  const inputCls = "w-full px-3 py-2 border border-brand-gray-200 rounded-lg text-sm bg-background outline-none focus:border-primary focus:ring-2 focus:ring-primary/10";

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-foreground">Products</h1>
        <button onClick={openNew} className="flex items-center gap-2 bg-primary text-primary-foreground font-bold px-5 py-2.5 rounded-lg text-sm hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Product List */}
      <div className="bg-card border border-brand-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-brand-gray-50 border-b border-brand-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Name</th>
              <th className="text-left px-4 py-3 font-semibold text-muted-foreground hidden sm:table-cell">Category</th>
              <th className="text-left px-4 py-3 font-semibold text-muted-foreground hidden md:table-cell">Brand</th>
              <th className="text-left px-4 py-3 font-semibold text-muted-foreground hidden md:table-cell">Status</th>
              <th className="text-right px-4 py-3 font-semibold text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-12 text-muted-foreground">No products yet. Click "Add Product" to get started.</td></tr>
            ) : products.map((p) => (
              <tr key={p.id} className="border-b border-brand-gray-100 hover:bg-brand-gray-50/50">
                <td className="px-4 py-3 font-semibold text-foreground">{p.name}</td>
                <td className="px-4 py-3 text-muted-foreground capitalize hidden sm:table-cell">{p.category}</td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{p.brand || "—"}</td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className={`text-xs font-bold px-2 py-1 rounded ${p.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {p.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => openEdit(p)} className="text-primary hover:text-primary/80 mr-3"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit/Create Modal */}
      {editing && (
        <div className="fixed inset-0 bg-foreground/40 z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-brand-gray-200 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-brand-gray-200">
              <h2 className="text-lg font-extrabold text-foreground">{isNew ? "Add Product" : "Edit Product"}</h2>
              <button onClick={() => setEditing(null)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Name *</label>
                <input className={inputCls} value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Description</label>
                <textarea className={`${inputCls} min-h-[80px] resize-y`} value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Category</label>
                  <select className={inputCls} value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })}>
                    <option value="polymers">Polymers</option>
                    <option value="textiles">Textiles</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Subcategory</label>
                  <input className={inputCls} value={editing.subcategory || ""} onChange={(e) => setEditing({ ...editing, subcategory: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Brand</label>
                  <input className={inputCls} value={editing.brand || ""} onChange={(e) => setEditing({ ...editing, brand: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Sort Order</label>
                  <input type="number" className={inputCls} value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: parseInt(e.target.value) || 0 })} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Image URL</label>
                <input className={inputCls} value={editing.image_url || ""} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Detail Link</label>
                <input className={inputCls} value={editing.detail_link || ""} onChange={(e) => setEditing({ ...editing, detail_link: e.target.value })} placeholder="/products/pp" />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="isActive" checked={editing.is_active} onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })} className="w-4 h-4 rounded border-brand-gray-200" />
                <label htmlFor="isActive" className="text-sm font-semibold">Active (visible on website)</label>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-brand-gray-200 flex justify-end gap-3">
              <button onClick={() => setEditing(null)} className="px-5 py-2.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-2.5 rounded-lg text-sm hover:opacity-90 disabled:opacity-50">
                <Save className="w-4 h-4" /> {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
