import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroBackground from "@/components/HeroBackground";
import { Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) {
      setValid(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast({ title: "Password too short", description: "Min. 6 characters", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Password updated!" });
      navigate("/sign-in");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <HeroBackground />
        <div className="relative z-10 w-full max-w-md mx-auto px-6">
          <div className="bg-card border border-border p-8 shadow-2xl">
            <h1 className="text-3xl font-black uppercase tracking-tight text-gradient-google mb-2 text-center">New Password</h1>
            {!valid ? (
              <p className="text-center text-muted-foreground py-8">Invalid or expired reset link.</p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 mt-6">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="w-full pl-10 pr-4 py-3 bg-background border border-border text-foreground text-sm focus:outline-none focus:border-[hsl(var(--google-blue))] transition-colors" placeholder="Min. 6 characters" />
                  </div>
                </div>
                <button type="submit" disabled={loading} className="w-full py-3 text-xs font-bold uppercase tracking-wider bg-google-blue text-white hover:opacity-90 transition-opacity disabled:opacity-50">
                  {loading ? "Updating..." : "Update Password"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ResetPassword;
