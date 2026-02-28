import { useState } from "react";
import { useSiteContent, SiteContent } from "@/hooks/useAdminData";
import { Plus, Save, Trash2, X, Edit2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SECTIONS = [
  { value: "contact", label: "Contact Information" },
  { value: "about", label: "About Page" },
  { value: "hero", label: "Hero Section" },
  { value: "footer", label: "Footer" },
  { value: "testimonials", label: "Testimonials" },
  { value: "general", label: "General" },
];

const AdminSiteContentManager = () => {
  const { content, loading, save, remove } = useSiteContent();
  const [editing, setEditing] = useState<{ section: string; key: string; value: string; content_type: string } | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [filterSection, setFilterSection] = useState("all");

  const handleSave = async () => {
    if (!editing?.section || !editing?.key) return;
    const success = await save(editing.section, editing.key, editing.value, editing.content_type);
    if (success) setEditing(null);
  };

  const handleDelete = async (id: string) => {
    await remove(id);
    setDeleting(null);
  };

  const filtered = filterSection === "all" ? content : content.filter((c) => c.section === filterSection);
  const grouped = filtered.reduce<Record<string, SiteContent[]>>((acc, item) => {
    acc[item.section] = [...(acc[item.section] || []), item];
    return acc;
  }, {});

  if (loading) return <div className="text-muted-foreground animate-pulse py-8 text-center">Loading content...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h3 className="text-lg font-bold uppercase tracking-wider text-foreground">Site Content</h3>
        <div className="flex items-center gap-3">
          <select
            value={filterSection}
            onChange={(e) => setFilterSection(e.target.value)}
            className="px-3 py-2 bg-card border border-border text-foreground text-xs font-medium focus:outline-none focus:border-[hsl(var(--google-blue))]"
          >
            <option value="all">All Sections</option>
            {SECTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
          <button
            onClick={() => setEditing({ section: "general", key: "", value: "", content_type: "text" })}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider bg-google-yellow text-white hover:opacity-90 transition-opacity"
          >
            <Plus className="w-3.5 h-3.5" /> Add Content
          </button>
        </div>
      </div>

      {Object.keys(grouped).length === 0 ? (
        <p className="text-center text-muted-foreground py-8">No site content yet. Add content entries to make site sections editable.</p>
      ) : (
        Object.entries(grouped).map(([section, items]) => (
          <div key={section} className="border border-border bg-card">
            <div className="px-4 py-3 border-b border-border bg-muted/30">
              <span className="text-xs font-bold uppercase tracking-wider text-foreground">{SECTIONS.find((s) => s.value === section)?.label || section}</span>
              <span className="text-xs text-muted-foreground ml-2">({items.length})</span>
            </div>
            <div className="divide-y divide-border">
              {items.map((item) => (
                <div key={item.id} className="px-4 py-3 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold uppercase tracking-wider text-google-blue">{item.key}</span>
                    <p className="text-sm text-foreground mt-0.5 truncate">{item.value}</p>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 bg-muted text-muted-foreground font-medium uppercase shrink-0">{item.content_type}</span>
                  <button onClick={() => setEditing({ section: item.section, key: item.key, value: item.value, content_type: item.content_type })} className="p-2 text-muted-foreground hover:text-google-blue transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => setDeleting(item.id)} className="p-2 text-muted-foreground hover:text-google-red transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleting && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-card border border-border p-6 max-w-sm w-full">
              <h4 className="font-bold text-foreground mb-2">Delete Content?</h4>
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
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-card border border-border p-6 max-w-lg w-full my-8">
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-bold text-foreground text-lg">{content.find((c) => c.section === editing.section && c.key === editing.key) ? "Edit Content" : "New Content"}</h4>
                <button onClick={() => setEditing(null)} className="p-1 text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1">Section *</label>
                    <select value={editing.section} onChange={(e) => setEditing({ ...editing, section: e.target.value })} className="w-full px-3 py-2 bg-background border border-border text-foreground text-sm focus:outline-none focus:border-[hsl(var(--google-blue))]">
                      {SECTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1">Type</label>
                    <select value={editing.content_type} onChange={(e) => setEditing({ ...editing, content_type: e.target.value })} className="w-full px-3 py-2 bg-background border border-border text-foreground text-sm focus:outline-none focus:border-[hsl(var(--google-blue))]">
                      <option value="text">Text</option>
                      <option value="html">HTML</option>
                      <option value="url">URL</option>
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1">Key *</label>
                  <input value={editing.key} onChange={(e) => setEditing({ ...editing, key: e.target.value })} placeholder="e.g. phone_number, hero_title" className="w-full px-3 py-2 bg-background border border-border text-foreground text-sm focus:outline-none focus:border-[hsl(var(--google-blue))]" maxLength={100} />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1">Value *</label>
                  <textarea value={editing.value} onChange={(e) => setEditing({ ...editing, value: e.target.value })} rows={4} className="w-full px-3 py-2 bg-background border border-border text-foreground text-sm focus:outline-none focus:border-[hsl(var(--google-blue))] resize-none" maxLength={5000} />
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <button onClick={() => setEditing(null)} className="flex-1 px-4 py-2.5 text-xs font-bold uppercase border border-border text-muted-foreground hover:text-foreground transition-colors">Cancel</button>
                <button onClick={handleSave} disabled={!editing.section || !editing.key} className="flex-1 px-4 py-2.5 text-xs font-bold uppercase bg-google-blue text-white hover:opacity-90 transition-opacity disabled:opacity-40">
                  <Save className="w-3.5 h-3.5 inline mr-1" /> Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminSiteContentManager;
