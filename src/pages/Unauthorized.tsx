import { Link } from "react-router-dom";
import { ShieldX } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Unauthorized = () => (
  <div className="min-h-screen bg-background text-foreground flex flex-col">
    <Header />
    <main className="flex-1 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <ShieldX className="w-16 h-16 text-destructive mx-auto mb-6" />
        <h1 className="text-3xl font-black uppercase tracking-tight mb-3">Access Denied</h1>
        <p className="text-muted-foreground mb-8">You don't have permission to view this page. Admin privileges are required.</p>
        <div className="flex items-center justify-center gap-4">
          <Link to="/dashboard" className="px-6 py-3 text-xs font-bold uppercase tracking-wider bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
            Go to Dashboard
          </Link>
          <Link to="/" className="px-6 py-3 text-xs font-bold uppercase tracking-wider border border-border text-foreground hover:bg-foreground/5 transition-colors">
            Home
          </Link>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Unauthorized;
