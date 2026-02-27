import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroBackground from "@/components/HeroBackground";
import { Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setSent(true);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <HeroBackground />
        <div className="relative z-10 w-full max-w-md mx-auto px-6">
          <div className="bg-card border border-border p-8 shadow-2xl">
            <h1 className="text-3xl font-black uppercase tracking-tight text-gradient-google mb-2 text-center">Reset Password</h1>
            {sent ? (
              <div className="text-center py-8">
                <p className="text-foreground mb-2">Check your email!</p>
                <p className="text-muted-foreground text-sm">We've sent a password reset link to <strong>{email}</strong></p>
                <Link to="/sign-in" className="inline-block mt-6 text-google-blue hover:underline text-sm font-semibold">Back to Sign In</Link>
              </div>
            ) : (
              <>
                <p className="text-muted-foreground text-sm text-center mb-8">Enter your email and we'll send you a reset link</p>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full pl-10 pr-4 py-3 bg-background border border-border text-foreground text-sm focus:outline-none focus:border-[hsl(var(--google-blue))] transition-colors" placeholder="you@example.com" />
                    </div>
                  </div>
                  <button type="submit" disabled={loading} className="w-full py-3 text-xs font-bold uppercase tracking-wider bg-google-blue text-white hover:opacity-90 transition-opacity disabled:opacity-50">
                    {loading ? "Sending..." : "Send Reset Link"}
                  </button>
                </form>
                <p className="text-center text-sm text-muted-foreground mt-6">
                  <Link to="/sign-in" className="text-google-blue hover:underline font-semibold">Back to Sign In</Link>
                </p>
              </>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
