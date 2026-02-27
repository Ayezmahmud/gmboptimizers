import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroBackground from "@/components/HeroBackground";
import { CheckCircle, Download, ArrowRight } from "lucide-react";
import { generateOrderPDF } from "@/utils/generateOrderPDF";
import type { CartItem } from "@/contexts/CartContext";

const OrderConfirmation = () => {
  const location = useLocation();
  const { orderCode, items, total, customerName } = (location.state || {}) as {
    orderCode?: string;
    items?: CartItem[];
    total?: number;
    customerName?: string;
  };

  if (!orderCode) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">No order found.</p>
            <Link to="/pricing" className="text-google-blue underline text-sm">Go to Pricing</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleDownloadPDF = () => {
    generateOrderPDF({ orderCode, customerName: customerName || "", customerEmail: "", items: items || [], total: total || 0 });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="relative min-h-[25vh] flex items-center justify-center overflow-hidden">
        <HeroBackground />
        <div className="relative z-10 text-center px-6 py-16">
          <CheckCircle className="w-16 h-16 text-google-green mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-gradient-google mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground text-lg">Your order has been submitted successfully</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 max-w-xl">
          <div className="bg-card border border-border p-8 shadow-lg text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Order Code</p>
            <p className="text-3xl font-black text-google-blue mb-6 tracking-wider">{orderCode}</p>

            <div className="border-t border-border pt-6 mb-6">
              <div className="space-y-2 text-sm text-left">
                {items?.map((item, i) => (
                  <div key={i} className="flex justify-between">
                    <span className="text-muted-foreground">{item.name}</span>
                    <span className="text-foreground font-medium">${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 pt-4 border-t border-border text-sm font-bold">
                <span>Total</span>
                <span className="text-google-blue">${total?.toFixed(2)} AUD</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={handleDownloadPDF} className="flex-1 inline-flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-wider bg-google-green text-white hover:opacity-90 transition-opacity">
                <Download className="w-4 h-4" /> Download PDF
              </button>
              <Link to="/dashboard" className="flex-1 inline-flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-wider bg-google-blue text-white hover:opacity-90 transition-opacity">
                Go to Dashboard <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OrderConfirmation;
