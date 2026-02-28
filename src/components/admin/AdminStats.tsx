import { DollarSign, Users, FileText, Package, CheckCircle, Clock, AlertTriangle, TrendingUp } from "lucide-react";

interface Order {
  id: string;
  total_amount: number;
  status: string;
  payment_status: string;
  customer_email: string;
  items: { progress_percentage: number }[];
}

interface AdminStatsProps {
  orders: Order[];
}

const StatCard = ({ icon: Icon, value, label, color }: { icon: any; value: string | number; label: string; color: string }) => (
  <div className="bg-card border border-border p-5 hover:shadow-md transition-shadow">
    <div className="flex items-center gap-3 mb-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
    <p className="text-2xl font-black text-foreground">{value}</p>
    <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{label}</p>
  </div>
);

const AdminStats = ({ orders }: AdminStatsProps) => {
  const totalRevenue = orders.reduce((s, o) => s + Number(o.total_amount), 0);
  const paidRevenue = orders.filter(o => o.payment_status === "received").reduce((s, o) => s + Number(o.total_amount), 0);
  const totalCustomers = new Set(orders.map((o) => o.customer_email)).size;
  const totalServices = orders.reduce((s, o) => s + o.items.length, 0);
  const pendingOrders = orders.filter(o => o.status === "pending").length;
  const inProgressOrders = orders.filter(o => o.status === "in_progress").length;
  const completedOrders = orders.filter(o => o.status === "completed").length;
  const unpaidOrders = orders.filter(o => o.payment_status === "not_received").length;
  const avgProgress = totalServices > 0
    ? Math.round(orders.reduce((s, o) => s + o.items.reduce((si, it) => si + it.progress_percentage, 0), 0) / totalServices)
    : 0;

  return (
    <section className="border-b border-border bg-secondary/50">
      <div className="container mx-auto px-6 max-w-7xl py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <StatCard icon={DollarSign} value={`$${totalRevenue.toFixed(2)}`} label="Total Revenue" color="bg-google-green/10 text-google-green" />
          <StatCard icon={CheckCircle} value={`$${paidRevenue.toFixed(2)}`} label="Collected" color="bg-google-blue/10 text-google-blue" />
          <StatCard icon={Users} value={totalCustomers} label="Customers" color="bg-accent text-accent-foreground" />
          <StatCard icon={Package} value={orders.length} label="Total Orders" color="bg-google-yellow/10 text-google-yellow" />
          <StatCard icon={TrendingUp} value={`${avgProgress}%`} label="Avg Progress" color="bg-google-red/10 text-google-red" />
        </div>

        {/* Secondary row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="bg-card border border-border px-4 py-3 flex items-center gap-3">
            <Clock className="w-4 h-4 text-google-yellow" />
            <div>
              <p className="text-sm font-bold text-foreground">{pendingOrders}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Pending</p>
            </div>
          </div>
          <div className="bg-card border border-border px-4 py-3 flex items-center gap-3">
            <TrendingUp className="w-4 h-4 text-google-blue" />
            <div>
              <p className="text-sm font-bold text-foreground">{inProgressOrders}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">In Progress</p>
            </div>
          </div>
          <div className="bg-card border border-border px-4 py-3 flex items-center gap-3">
            <CheckCircle className="w-4 h-4 text-google-green" />
            <div>
              <p className="text-sm font-bold text-foreground">{completedOrders}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Completed</p>
            </div>
          </div>
          <div className="bg-card border border-border px-4 py-3 flex items-center gap-3">
            <AlertTriangle className="w-4 h-4 text-google-red" />
            <div>
              <p className="text-sm font-bold text-foreground">{unpaidOrders}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Unpaid</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminStats;
