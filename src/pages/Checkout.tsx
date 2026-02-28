import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/hooks/useAuth";
import { useCountry } from "@/contexts/CountryContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroBackground from "@/components/HeroBackground";
import { Trash2, ShoppingCart, User, Mail, Phone, MapPin } from "lucide-react";
import { generateOrderPDF } from "@/utils/generateOrderPDF";

const Checkout = () => {
  const { items, removeItem, total, clearCart } = useCart();
  const { user } = useAuth();
  const { country } = useCountry();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: user?.email || "",
    phone: "",
    address: "",
  });

  const generateOrderCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "GBO-";
    for (let i = 0; i < 8; i++) code += chars[Math.floor(Math.random() * chars.length)];
    return code;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({ title: "Please sign in first", description: "You need an account to place an order.", variant: "destructive" });
      navigate("/sign-in");
      return;
    }
    if (items.length === 0) {
      toast({ title: "Cart is empty", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    const orderCode = generateOrderCode();

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        order_code: orderCode,
        customer_name: form.name.trim(),
        customer_email: form.email.trim(),
        customer_phone: form.phone.trim() || null,
        customer_address: form.address.trim() || null,
        total_amount: total,
        status: "pending",
      })
      .select("id, order_code")
      .single();

    if (orderError || !order) {
      toast({ title: "Order failed", description: orderError?.message || "Unknown error", variant: "destructive" });
      setSubmitting(false);
      return;
    }

    const orderItems = items.map((item) => ({
      order_id: order.id,
      service_name: item.name,
      price: item.price,
    }));

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems);

    if (itemsError) {
      toast({ title: "Error saving items", description: itemsError.message, variant: "destructive" });
      setSubmitting(false);
      return;
    }

    // Generate PDF
    generateOrderPDF({
      orderCode,
      customerName: form.name,
      customerEmail: form.email,
      items,
      total,
      currencySymbol: country.currencySymbol,
      currencyCode: country.currency,
    });

    clearCart();
    setSubmitting(false);

    navigate("/order-confirmation", { state: { orderCode, items, total, customerName: form.name } });
  };

  const inputClass = "w-full pl-10 pr-4 py-3 bg-background border border-border text-foreground text-sm focus:outline-none focus:border-[hsl(var(--google-blue))] transition-colors";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="relative min-h-[25vh] flex items-center justify-center overflow-hidden">
        <HeroBackground />
        <div className="relative z-10 text-center px-6 py-16">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-gradient-google mb-2">Checkout</h1>
          <p className="text-muted-foreground text-lg">Complete your order</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid md:grid-cols-5 gap-8">
            {/* Order Summary */}
            <div className="md:col-span-2">
              <div className="bg-card border border-border p-6 shadow-lg sticky top-24">
                <h2 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4 flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-google-blue" /> Order Summary
                </h2>
                {items.length === 0 ? (
                  <p className="text-muted-foreground text-sm">Your cart is empty.</p>
                ) : (
                  <>
                    <div className="space-y-3 mb-6">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between text-sm border-b border-border pb-3">
                          <div>
                            <p className="text-foreground font-medium">{item.name}</p>
                            <p className="text-xs text-muted-foreground capitalize">{item.type}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-foreground font-bold">{country.currencySymbol}{item.price.toFixed(2)}</span>
                            <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-google-red transition-colors">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center border-t border-border pt-4">
                      <span className="text-sm font-bold uppercase text-foreground">Total</span>
                      <span className="text-xl font-black text-google-blue">{country.currencySymbol}{total.toFixed(2)} {country.currency}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Billing Form */}
            <div className="md:col-span-3">
              <div className="bg-card border border-border p-8 shadow-lg">
                <h2 className="text-xl font-bold text-foreground mb-1">Billing Details</h2>
                <p className="text-muted-foreground text-sm mb-8">Fill in your details to complete the order</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="John Doe" maxLength={100} />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="you@example.com" maxLength={255} />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} placeholder="+61 400 000 000" maxLength={20} />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input type="text" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className={inputClass} placeholder="123 Main St, Sydney" maxLength={500} />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting || items.length === 0}
                    className="w-full py-4 text-xs font-bold uppercase tracking-wider bg-google-blue text-white hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {submitting ? "Processing..." : `Submit Order — ${country.currencySymbol}${total.toFixed(2)} ${country.currency}`}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Checkout;
