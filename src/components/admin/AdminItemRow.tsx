import { useState } from "react";
import { Save } from "lucide-react";

export interface OrderItem {
  id: string;
  service_name: string;
  price: number;
  progress_percentage: number;
  progress_notes: string | null;
  status: string;
}

interface AdminItemRowProps {
  item: OrderItem;
  saving: boolean;
  onSave: (updates: Partial<OrderItem>) => void;
}

const AdminItemRow = ({ item, saving, onSave }: AdminItemRowProps) => {
  const [progress, setProgress] = useState(item.progress_percentage);
  const [notes, setNotes] = useState(item.progress_notes || "");

  const isDirty = progress !== item.progress_percentage || notes !== (item.progress_notes || "");

  return (
    <div className="border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-sm font-bold text-foreground">{item.service_name}</p>
          <p className="text-xs text-muted-foreground">${Number(item.price).toFixed(2)} AUD</p>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${progress === 100 ? "bg-google-green" : progress > 0 ? "bg-google-blue" : "bg-muted-foreground"}`} />
          <span className="text-xs font-bold text-foreground">{progress}%</span>
        </div>
      </div>

      {/* Progress bar visual */}
      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-gradient-to-r from-google-blue to-google-green rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center gap-3 mb-3">
        <input
          type="range"
          min={0}
          max={100}
          step={5}
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          className="flex-1 h-2 bg-secondary rounded-full appearance-none cursor-pointer accent-[hsl(var(--google-blue))]"
        />
        <input
          type="number"
          min={0}
          max={100}
          value={progress}
          onChange={(e) => setProgress(Math.min(100, Math.max(0, Number(e.target.value))))}
          className="w-16 px-2 py-1.5 bg-background border border-border text-foreground text-xs font-bold text-center focus:outline-none focus:border-[hsl(var(--google-blue))] transition-colors"
        />
      </div>

      <div className="mb-3">
        <label className="text-xs text-muted-foreground block mb-1">Progress Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          maxLength={1000}
          placeholder="e.g. Completed keyword research, starting optimization..."
          className="w-full px-3 py-2 bg-background border border-border text-foreground text-sm focus:outline-none focus:border-[hsl(var(--google-blue))] transition-colors resize-none"
        />
      </div>

      {isDirty && (
        <button
          onClick={() => onSave({ progress_percentage: progress, progress_notes: notes || null })}
          disabled={saving}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider bg-google-blue text-white hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <Save className="w-3.5 h-3.5" />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      )}
    </div>
  );
};

export default AdminItemRow;
