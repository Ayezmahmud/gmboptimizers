import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Activity, ShoppingCart, CreditCard, TrendingUp, BarChart3 } from "lucide-react";

interface ActivityEntry {
  id: string;
  order_code: string;
  action: string;
  details: string | null;
  created_at: string;
}

const actionConfig: Record<string, { icon: any; color: string; label: string }> = {
  order_created: { icon: ShoppingCart, color: "text-google-green bg-google-green/10", label: "New Order" },
  payment_updated: { icon: CreditCard, color: "text-google-yellow bg-google-yellow/10", label: "Payment" },
  status_updated: { icon: TrendingUp, color: "text-google-blue bg-google-blue/10", label: "Status" },
  progress_updated: { icon: BarChart3, color: "text-google-red bg-google-red/10", label: "Progress" },
};

const timeAgo = (date: string) => {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(date).toLocaleDateString("en-AU", { day: "2-digit", month: "short" });
};

const AdminActivityTimeline = () => {
  const [activities, setActivities] = useState<ActivityEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchActivities = useCallback(async () => {
    const { data } = await supabase
      .from("activity_log")
      .select("id, order_code, action, details, created_at")
      .order("created_at", { ascending: false })
      .limit(20);
    setActivities(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel("activity-realtime")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "activity_log" }, () => {
        fetchActivities();
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [fetchActivities]);

  if (loading) {
    return (
      <div className="bg-card border border-border p-6">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-4 h-4 text-google-blue" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Recent Activity</h3>
        </div>
        <div className="text-sm text-muted-foreground animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-google-blue" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Recent Activity</h3>
        </div>
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Last 20 events</span>
      </div>

      {activities.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-6">No activity yet. Changes to orders will appear here.</p>
      ) : (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border" />

          <div className="space-y-4">
            {activities.map((entry) => {
              const config = actionConfig[entry.action] || actionConfig.status_updated;
              const Icon = config.icon;
              return (
                <div key={entry.id} className="relative flex items-start gap-3 pl-0">
                  <div className={`relative z-10 w-[31px] h-[31px] rounded-full flex items-center justify-center flex-shrink-0 ${config.color}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-google-blue">{entry.order_code}</span>
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${config.color}`}>
                        {config.label}
                      </span>
                      <span className="text-[10px] text-muted-foreground ml-auto flex-shrink-0">{timeAgo(entry.created_at)}</span>
                    </div>
                    {entry.details && (
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{entry.details}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminActivityTimeline;
