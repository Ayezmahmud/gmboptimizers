import { useState, useRef } from "react";
import { AdminService, useAdminServices } from "@/hooks/useAdminData";
import { Plus, Edit2, Trash2, X, Check, Upload, Link as LinkIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const COLOR_OPTIONS = ["google-blue", "google-red", "google-yellow", "google-green"];
const ICON_OPTIONS = ["MapPin", "TrendingUp", "Search", "Star", "Building2", "BarChart3", "FileText", "Camera", "MessageSquare", "Smartphone", "Globe", "Shield", "Zap", "Award", "Users"];

const emptyService: Partial<AdminService> = {
  title: "",
  description: "",
  details: [],
  color_theme: "google-blue",
  icon_name: "MapPin",
  image_url: "",
  sort_order: 0,
  active: true,
};

const AdminServicesManager = () => {
  const { services, loading, save, remove, uploadImage } = useAdminServices();
  const [editing, setEditing] = useState<Partial<AdminService> | null>(null);
  const [detailInput, setDetailInput] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageMode, setImageMode] = useState<"upload" | "url">("upload");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSave = async () => {
    if (!editing?.title) return;
    const success = await save(editing);
    if (success) setEditing(null);
  };

  const addDetail = () => {
    if (!detailInput.trim() || !editing) return;
    setEditing({ ...editing, details: [...(editing.details || []), detailInput.trim()] });
    setDetailInput("");
  };

  const removeDetail = (index: number) => {
    if (!editing) return;
    setEditing({ ...editing, details: (editing.details || []).filter((_, i) => i !== index) });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    setUploading(true);
    const url = await uploadImage(file);
    if (url) setEditing({ ...editing, image_url: url });
    setUploading(false);
  };

  const handleDelete = async (id: string) => {
    await remove(id);
    setDeleting(null);
  };

  if (loading) return <div className="text-muted-foreground animate-pulse py-8 text-center">Loading services...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold uppercase tracking-wider text-foreground">Services</h3>
        <button
          onClick={() => setEditing({ ...emptyService, sort_order: services.length })}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider bg-google-green text-white hover:opacity-90 transition-opacity"
        >
          <Plus className="w-3.5 h-3.5" /> Add Service
        </button>
      </div>

      <div className="space-y-3">
        {services.map((s) => (
          <motion.div key={s.id} layout className={`border border-border bg-card p-4 flex items-center gap-4 ${!s.active ? "opacity-50" : ""}`}>
            {s.image_url ? (
              <img src={s.image_url} alt={s.title} className="w-12 h-12 object-cover rounded shrink-0 border border-border" />
            ) : (
              <div className={`w-12 h-12 bg-${s.color_theme}/10 flex items-center justify-center shrink-0 border border-border`}>
                <span className="text-xs text-muted-foreground">{s.icon_name}</span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <span className="font-bold text-sm text-foreground">{s.title}</span>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">{s.description}</p>
              <p className="text-xs text-muted-foreground">{s.details.length} details · Order: {s.sort_order}</p>
            </div>
            <button onClick={() => { setEditing({ ...s }); setImageMode(s.image_url?.startsWith("http") ? "url" : "upload"); }} className="p-2 text-muted-foreground hover:text-google-blue transition-colors">
              <Edit2 className="w-4 h-4" />
            </button>
            <button onClick={() => setDeleting(s.id)} className="p-2 text-muted-foreground hover:text-google-red transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
        {services.length === 0 && <p className="text-center text-muted-foreground py-8">No services yet. Add your first service above.</p>}
      </div>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleting && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-card border border-border p-6 max-w-sm w-full">
              <h4 className="font-bold text-foreground mb-2">Delete Service?</h4>
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
                <h4 className="font-bold text-foreground text-lg">{editing.id ? "Edit Service" : "New Service"}</h4>
                <button onClick={() => setEditing(null)} className="p-1 text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1">Title *</label>
                  <input value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full px-3 py-2 bg-background border border-border text-foreground text-sm focus:outline-none focus:border-[hsl(var(--google-blue))]" maxLength={200} />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1">Description</label>
                  <textarea value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={3} className="w-full px-3 py-2 bg-background border border-border text-foreground text-sm focus:outline-none focus:border-[hsl(var(--google-blue))] resize-none" maxLength={1000} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1">Icon</label>
                    <select value={editing.icon_name || "MapPin"} onChange={(e) => setEditing({ ...editing, icon_name: e.target.value })} className="w-full px-3 py-2 bg-background border border-border text-foreground text-sm focus:outline-none focus:border-[hsl(var(--google-blue))]">
                      {ICON_OPTIONS.map((icon) => <option key={icon} value={icon}>{icon}</option>)}
                    </select>
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

                {/* Image */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1">Image</label>
                  <div className="flex gap-2 mb-2">
                    <button onClick={() => setImageMode("upload")} className={`px-3 py-1 text-xs font-bold uppercase ${imageMode === "upload" ? "bg-google-blue text-white" : "border border-border text-muted-foreground"}`}>
                      <Upload className="w-3 h-3 inline mr-1" /> Upload
                    </button>
                    <button onClick={() => setImageMode("url")} className={`px-3 py-1 text-xs font-bold uppercase ${imageMode === "url" ? "bg-google-blue text-white" : "border border-border text-muted-foreground"}`}>
                      <LinkIcon className="w-3 h-3 inline mr-1" /> URL
                    </button>
                  </div>
                  {imageMode === "upload" ? (
                    <div>
                      <input ref={fileRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                      <button onClick={() => fileRef.current?.click()} disabled={uploading} className="w-full px-3 py-3 border border-dashed border-border text-sm text-muted-foreground hover:border-foreground/30 transition-colors disabled:opacity-50">
                        {uploading ? "Uploading..." : "Click to upload image"}
                      </button>
                    </div>
                  ) : (
                    <input value={editing.image_url || ""} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })} placeholder="https://example.com/image.jpg" className="w-full px-3 py-2 bg-background border border-border text-foreground text-sm focus:outline-none focus:border-[hsl(var(--google-blue))]" />
                  )}
                  {editing.image_url && (
                    <img src={editing.image_url} alt="Preview" className="mt-2 w-full h-32 object-cover border border-border" />
                  )}
                </div>

                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={editing.active !== false} onChange={(e) => setEditing({ ...editing, active: e.target.checked })} className="accent-[hsl(var(--google-blue))]" />
                  <span className="text-foreground">Active (visible on site)</span>
                </label>

                {/* Details */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1">Details / Deliverables</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      value={detailInput}
                      onChange={(e) => setDetailInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addDetail())}
                      placeholder="Add a deliverable..."
                      className="flex-1 px-3 py-2 bg-background border border-border text-foreground text-sm focus:outline-none focus:border-[hsl(var(--google-blue))]"
                      maxLength={200}
                    />
                    <button onClick={addDetail} className="px-3 py-2 bg-google-green text-white text-xs font-bold uppercase hover:opacity-90 transition-opacity">Add</button>
                  </div>
                  <ul className="space-y-1">
                    {(editing.details || []).map((d, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-foreground bg-background px-3 py-1.5 border border-border">
                        <Check className="w-3 h-3 text-google-green shrink-0" />
                        <span className="flex-1">{d}</span>
                        <button onClick={() => removeDetail(i)} className="text-muted-foreground hover:text-google-red"><X className="w-3.5 h-3.5" /></button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <button onClick={() => setEditing(null)} className="flex-1 px-4 py-2.5 text-xs font-bold uppercase border border-border text-muted-foreground hover:text-foreground transition-colors">Cancel</button>
                <button onClick={handleSave} disabled={!editing.title} className="flex-1 px-4 py-2.5 text-xs font-bold uppercase bg-google-blue text-white hover:opacity-90 transition-opacity disabled:opacity-40">Save Service</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminServicesManager;
