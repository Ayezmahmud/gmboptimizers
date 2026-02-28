import { useState, useRef, useCallback } from "react";
import { AdminProduct, useAdminProducts } from "@/hooks/useAdminData";
import { Plus, Edit2, Trash2, X, Check, Star, Zap, Clock, Tag, Database, Copy, GripVertical } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DEFAULT_PRODUCTS } from "@/data/defaultProducts";
import { useToast } from "@/hooks/use-toast";

const COLOR_OPTIONS = ["google-blue", "google-red", "google-yellow", "google-green"];

const emptyProduct: Partial<AdminProduct> = {
  name: "",
  price: 0,
  popular: false,
  is_limited_offer: false,
  is_new_deal: false,
  is_upcoming: false,
  color_theme: "google-blue",
  features: [],
  sort_order: 0,
  active: true,
};

const AdminProductsManager = () => {
  const { products, loading, save, remove } = useAdminProducts();
  const [editing, setEditing] = useState<Partial<AdminProduct> | null>(null);
  const [featureInput, setFeatureInput] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);
  const { toast } = useToast();

  // Drag-and-drop state
  const dragIndex = useRef<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const seedDefaults = async () => {
    setSeeding(true);
    const existingNames = new Set(products.map((p) => p.name.toLowerCase()));
    let added = 0;
    for (const dp of DEFAULT_PRODUCTS) {
      if (!existingNames.has(dp.name.toLowerCase())) {
        await save(dp);
        added++;
      }
    }
    toast({ title: added > 0 ? `${added} default product(s) seeded` : "All defaults already exist" });
    setSeeding(false);
  };

  const handleSave = async () => {
    if (!editing?.name) return;
    const success = await save(editing);
    if (success) setEditing(null);
  };

  const addFeature = () => {
    if (!featureInput.trim() || !editing) return;
    setEditing({ ...editing, features: [...(editing.features || []), featureInput.trim()] });
    setFeatureInput("");
  };

  const removeFeature = (index: number) => {
    if (!editing) return;
    setEditing({ ...editing, features: (editing.features || []).filter((_, i) => i !== index) });
  };

  const handleDelete = async (id: string) => {
    await remove(id);
    setDeleting(null);
  };

  const handleDuplicate = async (product: AdminProduct) => {
    const { id, created_at, updated_at, ...rest } = product;
    await save({ ...rest, name: `${rest.name} (Copy)`, sort_order: products.length });
    toast({ title: "Product duplicated" });
  };

  const handleDrop = useCallback(async (toIndex: number) => {
    const fromIndex = dragIndex.current;
    if (fromIndex === null || fromIndex === toIndex) {
      dragIndex.current = null;
      setDragOverIndex(null);
      return;
    }
    const reordered = [...products];
    const [moved] = reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, moved);
    // Save new sort_order for all affected items
    for (let i = 0; i < reordered.length; i++) {
      if (reordered[i].sort_order !== i) {
        await save({ id: reordered[i].id, sort_order: i });
      }
    }
    dragIndex.current = null;
    setDragOverIndex(null);
  }, [products, save]);

  if (loading) return <div className="text-muted-foreground animate-pulse py-8 text-center">Loading products...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="text-lg font-bold uppercase tracking-wider text-foreground">Products & Packages</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={seedDefaults}
            disabled={seeding}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors disabled:opacity-50"
          >
            <Database className="w-3.5 h-3.5" /> {seeding ? "Seeding..." : "Seed Defaults"}
          </button>
          <button
            onClick={() => setEditing({ ...emptyProduct, sort_order: products.length })}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider bg-google-blue text-white hover:opacity-90 transition-opacity"
          >
            <Plus className="w-3.5 h-3.5" /> Add Product
          </button>
        </div>
      </div>

      {/* Product List */}
      <div className="space-y-1">
        {products.map((p, i) => (
          <motion.div
            key={p.id}
            layout
            draggable
            onDragStart={() => { dragIndex.current = i; }}
            onDragOver={(e) => { e.preventDefault(); setDragOverIndex(i); }}
            onDragLeave={() => setDragOverIndex(null)}
            onDrop={(e) => { e.preventDefault(); handleDrop(i); }}
            onDragEnd={() => { dragIndex.current = null; setDragOverIndex(null); }}
            className={`border bg-card p-3 flex items-center gap-3 transition-all cursor-grab active:cursor-grabbing ${
              !p.active ? "opacity-50" : ""
            } ${
              dragOverIndex === i ? "border-google-blue border-2 bg-google-blue/5" : "border-border"
            }`}
          >
            <GripVertical className="w-4 h-4 text-muted-foreground/50 shrink-0" />
            <div className={`w-3 h-3 rounded-full bg-${p.color_theme} shrink-0`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-sm text-foreground">{p.name}</span>
                <span className="text-xs text-muted-foreground">${p.price}</span>
                {p.popular && <span className="text-[10px] px-1.5 py-0.5 bg-google-yellow/20 text-google-yellow font-bold uppercase">Popular</span>}
                {p.is_limited_offer && <span className="text-[10px] px-1.5 py-0.5 bg-google-red/20 text-google-red font-bold uppercase">Limited</span>}
                {p.is_new_deal && <span className="text-[10px] px-1.5 py-0.5 bg-google-green/20 text-google-green font-bold uppercase">New</span>}
                {p.is_upcoming && <span className="text-[10px] px-1.5 py-0.5 bg-google-blue/20 text-google-blue font-bold uppercase">Upcoming</span>}
                {!p.active && <span className="text-[10px] px-1.5 py-0.5 bg-muted text-muted-foreground font-bold uppercase">Inactive</span>}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{p.features.length} features · Order: {p.sort_order}</p>
            </div>
            <button onClick={() => handleDuplicate(p)} className="p-2 text-muted-foreground hover:text-google-green transition-colors" title="Duplicate">
              <Copy className="w-4 h-4" />
            </button>
            <button onClick={() => setEditing({ ...p })} className="p-2 text-muted-foreground hover:text-google-blue transition-colors" title="Edit">
              <Edit2 className="w-4 h-4" />
            </button>
            <button onClick={() => setDeleting(p.id)} className="p-2 text-muted-foreground hover:text-google-red transition-colors" title="Delete">
              <Trash2 className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
        {products.length === 0 && (
          <p className="text-center text-muted-foreground py-8">No products yet. Add your first product above.</p>
        )}
      </div>

      {products.length > 1 && (
        <p className="text-[11px] text-muted-foreground text-center">
          <GripVertical className="w-3 h-3 inline -mt-0.5" /> Drag rows to reorder
        </p>
      )}

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleting && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-card border border-border p-6 max-w-sm w-full">
              <h4 className="font-bold text-foreground mb-2">Delete Product?</h4>
              <p className="text-sm text-muted-foreground mb-4">This action cannot be undone.</p>
              <div className="flex gap-2">
                <button onClick={() => setDeleting(null)} className="flex-1 px-4 py-2 text-xs font-bold uppercase border border-border text-muted-foreground hover:text-foreground transition-colors">Cancel</button>
                <button onClick={() => handleDelete(deleting)} className="flex-1 px-4 py-2 text-xs font-bold uppercase bg-google-red text-white hover:opacity-90 transition-opacity">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit/Create Modal */}
      <AnimatePresence>
        {editing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-card border border-border p-6 max-w-lg w-full my-8 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-bold text-foreground text-lg">{editing.id ? "Edit Product" : "New Product"}</h4>
                <button onClick={() => setEditing(null)} className="p-1 text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1">Name *</label>
                  <input value={editing.name || ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full px-3 py-2 bg-background border border-border text-foreground text-sm focus:outline-none focus:border-[hsl(var(--google-blue))]" maxLength={100} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1">Price (AUD) *</label>
                    <input type="number" step="0.01" value={editing.price || 0} onChange={(e) => setEditing({ ...editing, price: parseFloat(e.target.value) || 0 })} className="w-full px-3 py-2 bg-background border border-border text-foreground text-sm focus:outline-none focus:border-[hsl(var(--google-blue))]" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1">Sort Order</label>
                    <input type="number" value={editing.sort_order || 0} onChange={(e) => setEditing({ ...editing, sort_order: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 bg-background border border-border text-foreground text-sm focus:outline-none focus:border-[hsl(var(--google-blue))]" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1">Color Theme</label>
                  <div className="flex gap-2">
                    {COLOR_OPTIONS.map((c) => (
                      <button key={c} onClick={() => setEditing({ ...editing, color_theme: c })} className={`w-8 h-8 rounded-full bg-${c} border-2 transition-all ${editing.color_theme === c ? "border-foreground scale-110" : "border-transparent opacity-60"}`} />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: "popular", label: "Popular", icon: Star, color: "text-google-yellow" },
                    { key: "is_limited_offer", label: "Limited Offer", icon: Tag, color: "text-google-red" },
                    { key: "is_new_deal", label: "New Deal", icon: Zap, color: "text-google-green" },
                    { key: "is_upcoming", label: "Upcoming", icon: Clock, color: "text-google-blue" },
                  ].map((flag) => (
                    <button
                      key={flag.key}
                      onClick={() => setEditing({ ...editing, [flag.key]: !(editing as any)[flag.key] })}
                      className={`flex items-center gap-2 px-3 py-2 border text-xs font-bold uppercase transition-all ${
                        (editing as any)[flag.key] ? `border-foreground/30 ${flag.color}` : "border-border text-muted-foreground"
                      }`}
                    >
                      <flag.icon className="w-3.5 h-3.5" />
                      {flag.label}
                      {(editing as any)[flag.key] && <Check className="w-3 h-3 ml-auto" />}
                    </button>
                  ))}
                </div>

                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={editing.active !== false} onChange={(e) => setEditing({ ...editing, active: e.target.checked })} className="accent-[hsl(var(--google-blue))]" />
                  <span className="text-foreground">Active (visible on site)</span>
                </label>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1">Features</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                      placeholder="Add a feature..."
                      className="flex-1 px-3 py-2 bg-background border border-border text-foreground text-sm focus:outline-none focus:border-[hsl(var(--google-blue))]"
                      maxLength={200}
                    />
                    <button onClick={addFeature} className="px-3 py-2 bg-google-green text-white text-xs font-bold uppercase hover:opacity-90 transition-opacity">Add</button>
                  </div>
                  <ul className="space-y-1">
                    {(editing.features || []).map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-foreground bg-background px-3 py-1.5 border border-border">
                        <Check className="w-3 h-3 text-google-green shrink-0" />
                        <span className="flex-1">{f}</span>
                        <button onClick={() => removeFeature(i)} className="text-muted-foreground hover:text-google-red"><X className="w-3.5 h-3.5" /></button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <button onClick={() => setEditing(null)} className="flex-1 px-4 py-2.5 text-xs font-bold uppercase border border-border text-muted-foreground hover:text-foreground transition-colors">Cancel</button>
                <button onClick={handleSave} disabled={!editing.name} className="flex-1 px-4 py-2.5 text-xs font-bold uppercase bg-google-blue text-white hover:opacity-90 transition-opacity disabled:opacity-40">Save Product</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminProductsManager;
