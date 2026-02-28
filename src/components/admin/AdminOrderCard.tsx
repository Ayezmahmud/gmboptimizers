import { ChevronDown, ChevronUp, Calendar, MapPin, Phone, Mail, Hash } from "lucide-react";
import AdminItemRow, { OrderItem } from "./AdminItemRow";

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

const PAYMENT_STATUSES = ["not_received", "received"];
const PROGRESS_STATUSES = ["pending", "in_progress", "completed", "cancelled"];

const PaymentBadge = ({ status }: { status: string }) => {
  const isReceived = status === "received";
  return (
    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded ${isReceived ? "text-google-green bg-google-green/10" : "text-google-red bg-google-red/10"}`}>
      {isReceived ? "paid" : "unpaid"}
    </span>
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

interface AdminOrderCardProps {
  order: Order;
  isExpanded: boolean;
  onToggle: () => void;
  onUpdateOrderField: (orderId: string, field: string, value: string) => void;
  onUpdateItem: (itemId: string, updates: Partial<OrderItem>) => void;
  savingOrder: boolean;
  savingItems: Record<string, boolean>;
}

const AdminOrderCard = ({
  order,
  isExpanded,
  onToggle,
  onUpdateOrderField,
  onUpdateItem,
  savingOrder,
  savingItems,
}: AdminOrderCardProps) => {
  const selectClass = "px-3 py-2 bg-background border border-border text-foreground text-sm focus:outline-none focus:border-[hsl(var(--google-blue))] transition-colors cursor-pointer";
  const orderProgress = order.items.length > 0
    ? Math.round(order.items.reduce((s, i) => s + i.progress_percentage, 0) / order.items.length)
    : 0;

  return (
    <div className="bg-card border border-border shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {/* Order header */}
      <button
        onClick={onToggle}
        className="w-full flex flex-wrap items-center justify-between gap-4 p-5 text-left hover:bg-secondary/30 transition-colors"
      >
        <div className="flex items-center gap-4 min-w-0">
          {/* Progress circle */}
          <div className="relative w-12 h-12 flex-shrink-0">
            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                className="stroke-secondary"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                className={orderProgress === 100 ? "stroke-google-green" : "stroke-google-blue"}
                strokeWidth="3"
                strokeDasharray={`${orderProgress}, 100`}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-foreground">{orderProgress}%</span>
          </div>
          <div className="min-w-0">
            <p className="text-base font-black text-google-blue tracking-wider">{order.order_code}</p>
            <p className="text-sm text-foreground font-medium truncate">{order.customer_name}</p>
            <p className="text-xs text-muted-foreground truncate">{order.customer_email}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-foreground">${Number(order.total_amount).toFixed(2)}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
              <Calendar className="w-3 h-3" />
              {new Date(order.created_at).toLocaleDateString("en-AU", { day: "2-digit", month: "short", year: "numeric" })}
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            <PaymentBadge status={order.payment_status} />
            <StatusBadge status={order.status} />
          </div>
          {isExpanded ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
        </div>
      </button>

      {/* Expanded details */}
      {isExpanded && (
        <div className="border-t border-border bg-secondary/20">
          {/* Customer details */}
          <div className="p-5 border-b border-border">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Customer Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-start gap-2.5">
                <Hash className="w-4 h-4 text-google-blue mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Order Code</p>
                  <p className="text-sm font-bold text-foreground">{order.order_code}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-google-green mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Email</p>
                  <p className="text-sm text-foreground break-all">{order.customer_email}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-google-yellow mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Phone</p>
                  <p className="text-sm text-foreground">{order.customer_phone || "—"}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-google-red mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Address</p>
                  <p className="text-sm text-foreground">{order.customer_address || "—"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Status controls */}
          <div className="p-5 border-b border-border">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Order Controls</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card border border-border p-4">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2 font-bold">💳 Payment Status</p>
                <select
                  value={order.payment_status}
                  onChange={(e) => onUpdateOrderField(order.id, "payment_status", e.target.value)}
                  className={selectClass}
                  disabled={savingOrder}
                >
                  {PAYMENT_STATUSES.map((s) => (
                    <option key={s} value={s}>{s === "received" ? "Received (Paid)" : "Not Received (Unpaid)"}</option>
                  ))}
                </select>
              </div>
              <div className="bg-card border border-border p-4">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2 font-bold">📋 Progress Status</p>
                <select
                  value={order.status}
                  onChange={(e) => onUpdateOrderField(order.id, "status", e.target.value)}
                  className={selectClass}
                  disabled={savingOrder}
                >
                  {PROGRESS_STATUSES.map((s) => (
                    <option key={s} value={s}>{s.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())}</option>
                  ))}
                </select>
              </div>
              <div className="bg-card border border-border p-4">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2 font-bold">📊 Overall Progress</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-3 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-google-blue to-google-green rounded-full transition-all duration-500"
                      style={{ width: `${orderProgress}%` }}
                    />
                  </div>
                  <span className="text-sm font-black text-foreground">{orderProgress}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Service items */}
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Services ({order.items.length})
              </h4>
              <p className="text-xs text-muted-foreground">
                Total: <span className="font-bold text-foreground">${Number(order.total_amount).toFixed(2)} AUD</span>
              </p>
            </div>
            <div className="space-y-3">
              {order.items.map((item) => (
                <AdminItemRow
                  key={item.id}
                  item={item}
                  saving={!!savingItems[item.id]}
                  onSave={(updates) => onUpdateItem(item.id, updates)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrderCard;
