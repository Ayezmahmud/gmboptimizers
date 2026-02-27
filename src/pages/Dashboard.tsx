import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroBackground from "@/components/HeroBackground";
import ScrollRevealSection from "@/components/ScrollRevealSection";
import { useToast } from "@/hooks/use-toast";
import { User, Building2, Phone, Mail, Save, LogOut, Shield, Clock } from "lucide-react";

interface Profile {
  full_name: string | null;
  business_name: string | null;
  phone: string | null;
  avatar_url: string | null;
}

const Dashboard = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile>({ full_name: "", business_name: "", phone: "", avatar_url: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/sign-in");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("full_name, business_name, phone, avatar_url")
      .eq("user_id", user!.id)
      .single();
    if (data) setProfile(data);
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: profile.full_name,
        business_name: profile.business_name,
        phone: profile.phone,
      })
      .eq("user_id", user!.id);
    setSaving(false);
    if (error) {
      toast({ title: "Error saving", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Profile updated!" });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  const memberSince = new Date(user.created_at).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  const inputClass = "w-full pl-10 pr-4 py-3 bg-background border border-border text-foreground text-sm focus:outline-none focus:border-[hsl(var(--google-blue))] transition-colors";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="relative min-h-[30vh] flex items-center justify-center overflow-hidden">
        <HeroBackground />
        <div className="relative z-10 text-center px-6 py-16">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-gradient-google mb-2">
            Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">
            Welcome back, {profile.full_name || user.email}
          </p>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <ScrollRevealSection>
            <div className="grid md:grid-cols-3 gap-8">

              {/* Sidebar Info */}
              <div className="space-y-6">
                {/* Account Card */}
                <div className="bg-card border border-border p-6 shadow-lg">
                  <div className="w-16 h-16 rounded-full bg-google-blue/10 border-2 border-google-blue/30 flex items-center justify-center mb-4 mx-auto">
                    <User className="w-8 h-8 text-google-blue" />
                  </div>
                  <h3 className="text-center font-bold text-foreground">{profile.full_name || "Your Name"}</h3>
                  <p className="text-center text-xs text-muted-foreground mt-1 truncate">{user.email}</p>
                  {profile.business_name && (
                    <p className="text-center text-xs text-google-green mt-1">{profile.business_name}</p>
                  )}
                </div>

                {/* Stats */}
                <div className="bg-card border border-border p-6 shadow-lg space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">Account Info</h4>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-4 h-4 text-google-yellow" />
                    <div>
                      <p className="text-muted-foreground text-xs">Member since</p>
                      <p className="text-foreground font-medium">{memberSince}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Shield className="w-4 h-4 text-google-green" />
                    <div>
                      <p className="text-muted-foreground text-xs">Account status</p>
                      <p className="text-google-green font-medium">Active</p>
                    </div>
                  </div>
                </div>

                {/* Sign Out */}
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-wider border border-border text-muted-foreground hover:text-google-red hover:border-google-red/30 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>

              {/* Main Profile Form */}
              <div className="md:col-span-2">
                <div className="bg-card border border-border p-8 shadow-lg">
                  <h2 className="text-xl font-bold text-foreground mb-1">Edit Profile</h2>
                  <p className="text-muted-foreground text-sm mb-8">Update your personal and business information</p>

                  <form onSubmit={handleSave} className="space-y-6">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="text"
                          value={profile.full_name || ""}
                          onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                          className={inputClass}
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Business Name</label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="text"
                          value={profile.business_name || ""}
                          onChange={(e) => setProfile({ ...profile, business_name: e.target.value })}
                          className={inputClass}
                          placeholder="Your Business Name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="tel"
                          value={profile.phone || ""}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          className={inputClass}
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="email"
                          value={user.email || ""}
                          disabled
                          className={`${inputClass} opacity-50 cursor-not-allowed`}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Email cannot be changed here</p>
                    </div>

                    <button
                      type="submit"
                      disabled={saving}
                      className="inline-flex items-center gap-2 px-8 py-3 text-xs font-bold uppercase tracking-wider bg-google-blue text-white hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      <Save className="w-4 h-4" />
                      {saving ? "Saving..." : "Save Changes"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;
