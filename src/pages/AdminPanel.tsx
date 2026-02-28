import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroBackground from "@/components/HeroBackground";
import { useToast } from "@/hooks/use-toast";
import { Shield, Package, Search, ChevronDown, ChevronUp, Save, DollarSign, Users, FileText } from "lucide-react";

interface OrderItem {
  id: string;
  service_name: string;
  price: number;
  progress_percentage: number;
  progress_notes: string | null;
  status: string;
}

interface Order {
  id: string;
  order_code: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  customer_address: string | null;
  total_amount: number;
  status: string;
  created_at: string;
  items: OrderItem[];
}

const ORDER_STATUSES = ["pending", "in_progress", "completed", "cancelled"];
const ITEM_STATUSES = ["pending", "in_progress", "completed"];

const AdminPanel = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [savingItems, setSavingItems] = useState<Record<string, boolean>>({});
  const [savingOrders, setSavingOrders] = useState<Record<string, boolean>>({});

  // Check admin role
  useEffect(() => {
    if (!authLoading && !user) {
      setChecking(false);
      navigate("/sign-in");
      return;
    }
    if (user) {
      checkAdmin();
    }
  }, [user, authLoading, navigate]);

  const checkAdmin = async () => {
    const { data, error } = await supabase.rpc("has_role", {
      _user_id: user!.id,
      _role: "admin",
    });

    if (error || !data) {
      setChecking(false);
      navigate("/unauthorized", { replace: true });
      return;
    }

    setIsAdmin(true);
    setChecking(false);
  };

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    const { data: ordersData } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (!ordersData) { setOrders([]); setLoading(false); return; }

    const orderIds = ordersData.map((o) => o.id);
    const { data: itemsData } = await supabase
      .from("order_items")
      .select("*")
      .in("order_id", orderIds);

    const merged: Order[] = ordersData.map((o) => ({
      ...o,
      items: (itemsData || []).filter((i) => i.order_id === o.id),
    }));
    setOrders(merged);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isAdmin) fetchOrders();
  }, [isAdmin, fetchOrders]);

  const updateOrderStatus = async (orderId: string, status: string) => {
    setSavingOrders((p) => ({ ...p, [orderId]: true }));
    const { error } = await supabase.from("orders").update({ status }).eq("id", orderId);
    setSavingOrders((p) => ({ ...p, [orderId]: false }));
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, status } : o));
    toast({ title: "Order status updated" });
  };

  const updateItem = async (itemId: string, updates: Partial<OrderItem>) => {
    setSavingItems((p) => ({ ...p, [itemId]: true }));
    const { error } = await supabase.from("order_items").update(updates).eq("id", itemId);
    setSavingItems((p) => ({ ...p, [itemId]: false }));
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    setOrders((prev) =>
      prev.map((o) => ({
        ...o,
        items: o.items.map((i) => (i.id === itemId ? { ...i, ...updates } : i)),
      }))
    );
    toast({ title: "Service updated" });
  };

  const filteredOrders = orders.filter((o) =>
    search === "" ||
    o.order_code.toLowerCase().includes(search.toLowerCase()) ||
    o.customer_name.toLowerCase().includes(search.toLowerCase()) ||
    o.customer_email.toLowerCase().includes(search.toLowerCase())
  );

  const totalRevenue = orders.reduce((s, o) => s + Number(o.total_amount), 0);
  const totalCustomers = new Set(orders.map((o) => o.customer_email)).size;
  const totalServices = orders.reduce((s, o) => s + o.items.length, 0);

  if (authLoading || checking) {
    return <div className="min-h-screen bg-background flex items-center justify-center"><div className="text-muted-foreground animate-pulse">Checking access...</div></div>;
  }

  if (!isAdmin) return null;

  const inputClass = "w-full px-4 py-2.5 bg-background border border-border text-foreground text-sm focus:outline-none focus:border-[hsl(var(--google-blue))] transition-colors";
  const selectClass = "px-3 py-2 bg-background border border-border text-foreground text-sm focus:outline-none focus:border-[hsl(var(--google-blue))] transition-colors";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="relative min-h-[25vh] flex items-center justify-center overflow-hidden">
        <HeroBackground />
        <div className="relative z-10 text-center px-6 py-16">
          <Shield className="w-10 h-10 text-google-red mx-auto mb-3" />
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-gradient-google mb-2">Admin Panel</h1>
          <p className="text-muted-foreground text-lg">Manage orders, progress & customers</p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-secondary">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-3 gap-4 py-8">
            <div className="bg-card border border-border p-5 text-center">
              <DollarSign className="w-6 h-6 text-google-green mx-auto mb-2" />
              <p className="text-2xl font-black text-foreground">${totalRevenue.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Revenue</p>
            </div>
            <div className="bg-card border border-border p-5 text-center">
              <Users className="w-6 h-6 text-google-blue mx-auto mb-2" />
              <p className="text-2xl font-black text-foreground">{totalCustomers}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Customers</p>
            </div>
            <div className="bg-card border border-border p-5 text-center">
              <FileText className="w-6 h-6 text-google-yellow mx-auto mb-2" />
              <p className="text-2xl font-black text-foreground">{totalServices}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Services</p>
            </div>
          </div>
        </div>
      </section>

      {/* Orders */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Search */}
          <div className="flex items-center gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by order code, name, or email..."
                className="w-full pl-10 pr-4 py-3 bg-card border border-border text-foreground text-sm focus:outline-none focus:border-[hsl(var(--google-blue))] transition-colors"
                maxLength={100}
              />
            </div>
            <p className="text-sm text-muted-foreground">{filteredOrders.length} order(s)</p>
          </div>

          {loading ? (
            <div className="text-center py-16 text-muted-foreground animate-pulse">Loading orders...</div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-16">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No orders found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => {
                const isExpanded = expandedOrder === order.id;
                return (
                  <div key={order.id} className="bg-card border border-border shadow-lg overflow-hidden">
                    {/* Order header */}
                    <button
                      onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                      className="w-full flex flex-wrap items-center justify-between gap-4 p-6 text-left hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-lg font-black text-google-blue tracking-wider">{order.order_code}</p>
                          <p className="text-sm text-foreground font-medium">{order.customer_name}</p>
                          <p className="text-xs text-muted-foreground">{order.customer_email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-sm font-bold text-foreground">${Number(order.total_amount).toFixed(2)} AUD</p>
                          <p className="text-xs text-muted-foreground">{new Date(order.created_at).toLocaleDateString("en-AU")}</p>
                        </div>
                        <StatusBadge status={order.status} />
                        {isExpanded ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                      </div>
                    </button>

                    {/* Expanded details */}
                    {isExpanded && (
                      <div className="border-t border-border p-6 bg-secondary/30 space-y-6">
                        {/* Customer info */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div><p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Phone</p><p className="text-foreground">{order.customer_phone || "—"}</p></div>
                          <div><p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Address</p><p className="text-foreground">{order.customer_address || "—"}</p></div>
                          <div><p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Items</p><p className="text-foreground">{order.items.length} service(s)</p></div>
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Order Status</p>
                            <div className="flex items-center gap-2">
                              <select
                                value={order.status}
                                onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                className={selectClass}
                                disabled={savingOrders[order.id]}
                              >
                                {ORDER_STATUSES.map((s) => (
                                  <option key={s} value={s}>{s.replace("_", " ")}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Service items */}
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Services</h4>
                          <div className="space-y-3">
                            {order.items.map((item) => (
                              <AdminItemRow
                                key={item.id}
                                item={item}
                                saving={!!savingItems[item.id]}
                                onSave={(updates) => updateItem(item.id, updates)}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const colors: Record<string, string> = {
    pending: "text-google-yellow bg-google-yellow/10",
    in_progress: "text-google-blue bg-google-blue/10",
    completed: "text-google-green bg-google-green/10",
    cancelled: "text-google-red bg-google-red/10",
  };
  return (
    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded ${colors[status] || colors.pending}`}>
      {status.replace("_", " ")}
    </span>
  );
};

const AdminItemRow = ({
  item,
  saving,
  onSave,
}: {
  item: OrderItem;
  saving: boolean;
  onSave: (updates: Partial<OrderItem>) => void;
}) => {
  const [progress, setProgress] = useState(item.progress_percentage);
  const [notes, setNotes] = useState(item.progress_notes || "");
  const [status, setStatus] = useState(item.status);

  const isDirty = progress !== item.progress_percentage || notes !== (item.progress_notes || "") || status !== item.status;

  return (
    <div className="border border-border bg-card p-4">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div>
          <p className="text-sm font-bold text-foreground">{item.service_name}</p>
          <p className="text-xs text-muted-foreground">${Number(item.price).toFixed(2)} AUD</p>
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-3 py-1.5 bg-background border border-border text-foreground text-xs focus:outline-none focus:border-[hsl(var(--google-blue))] transition-colors"
        >
          {ITEM_STATUSES.map((s) => (
            <option key={s} value={s}>{s.replace("_", " ")}</option>
          ))}
        </select>
      </div>

      {/* Progress slider */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs text-muted-foreground">Progress</label>
          <span className="text-xs font-bold text-foreground">{progress}%</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          step={5}
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer accent-[hsl(var(--google-blue))]"
        />
      </div>

      {/* Notes */}
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
          onClick={() => onSave({ progress_percentage: progress, progress_notes: notes || null, status })}
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

export default AdminPanel;
