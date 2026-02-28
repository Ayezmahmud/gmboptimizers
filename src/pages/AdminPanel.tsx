import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroBackground from "@/components/HeroBackground";
import AdminStats from "@/components/admin/AdminStats";
import AdminOrderCard from "@/components/admin/AdminOrderCard";
import { OrderItem } from "@/components/admin/AdminItemRow";
import { useToast } from "@/hooks/use-toast";
import { Shield, Package, Search, RefreshCw, Filter } from "lucide-react";

interface Order {
  id: string;
  order_code: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  customer_address: string | null;
  total_amount: number;
  status: string;
  payment_status: string;
  created_at: string;
  items: OrderItem[];
}

const STATUS_FILTERS = [
  { value: "all", label: "All Orders" },
  { value: "pending", label: "Pending" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const PAYMENT_FILTERS = [
  { value: "all", label: "All" },
  { value: "not_received", label: "Unpaid" },
  { value: "received", label: "Paid" },
];

const AdminPanel = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [savingItems, setSavingItems] = useState<Record<string, boolean>>({});
  const [savingOrders, setSavingOrders] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!authLoading && !user) {
      setChecking(false);
      navigate("/sign-in");
      return;
    }
    if (user) checkAdmin();
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

  // Realtime
  useEffect(() => {
    if (!isAdmin) return;
    const channel = supabase
      .channel('admin-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => fetchOrders())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'order_items' }, () => fetchOrders())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [isAdmin, fetchOrders]);

  const updateOrderField = async (orderId: string, field: string, value: string) => {
    setSavingOrders((p) => ({ ...p, [orderId]: true }));
    const { error } = await supabase.from("orders").update({ [field]: value } as any).eq("id", orderId);
    setSavingOrders((p) => ({ ...p, [orderId]: false }));
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, [field]: value } : o));
    toast({ title: "Order updated" });
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

  const filteredOrders = orders.filter((o) => {
    const matchesSearch = search === "" ||
      o.order_code.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    const matchesPayment = paymentFilter === "all" || o.payment_status === paymentFilter;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  if (authLoading || checking) {
    return <div className="min-h-screen bg-background flex items-center justify-center"><div className="text-muted-foreground animate-pulse">Checking access...</div></div>;
  }
  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="relative min-h-[22vh] flex items-center justify-center overflow-hidden">
        <HeroBackground />
        <div className="relative z-10 text-center px-6 py-14">
          <Shield className="w-10 h-10 text-google-red mx-auto mb-3" />
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-gradient-google mb-2">Admin Panel</h1>
          <p className="text-muted-foreground text-base">Manage orders, track progress & monitor revenue</p>
        </div>
      </section>

      {/* Stats */}
      <AdminStats orders={orders} />

      {/* Orders Section */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Toolbar */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by order code, name, or email..."
                className="w-full pl-10 pr-4 py-2.5 bg-card border border-border text-foreground text-sm focus:outline-none focus:border-[hsl(var(--google-blue))] transition-colors"
                maxLength={100}
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-muted-foreground" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-card border border-border text-foreground text-xs font-medium focus:outline-none focus:border-[hsl(var(--google-blue))] transition-colors cursor-pointer"
                >
                  {STATUS_FILTERS.map((f) => (
                    <option key={f.value} value={f.value}>{f.label}</option>
                  ))}
                </select>
              </div>

              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="px-3 py-2 bg-card border border-border text-foreground text-xs font-medium focus:outline-none focus:border-[hsl(var(--google-blue))] transition-colors cursor-pointer"
              >
                {PAYMENT_FILTERS.map((f) => (
                  <option key={f.value} value={f.value}>{f.label}</option>
                ))}
              </select>

              <button
                onClick={() => fetchOrders()}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-wider border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </button>
            </div>

            <p className="text-xs text-muted-foreground ml-auto">
              {filteredOrders.length} of {orders.length} order(s)
            </p>
          </div>

          {/* Order list */}
          {loading ? (
            <div className="text-center py-16 text-muted-foreground animate-pulse">Loading orders...</div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-16">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No orders match your filters.</p>
              {(statusFilter !== "all" || paymentFilter !== "all" || search) && (
                <button
                  onClick={() => { setSearch(""); setStatusFilter("all"); setPaymentFilter("all"); }}
                  className="mt-3 text-xs text-google-blue hover:underline"
                >
                  Clear all filters
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <AdminOrderCard
                  key={order.id}
                  order={order}
                  isExpanded={expandedOrder === order.id}
                  onToggle={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  onUpdateOrderField={updateOrderField}
                  onUpdateItem={updateItem}
                  savingOrder={!!savingOrders[order.id]}
                  savingItems={savingItems}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdminPanel;
