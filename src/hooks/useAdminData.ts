import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface AdminProduct {
  id: string;
  name: string;
  price: number;
  popular: boolean;
  is_limited_offer: boolean;
  is_new_deal: boolean;
  is_upcoming: boolean;
  color_theme: string;
  features: string[];
  sort_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdminService {
  id: string;
  title: string;
  description: string;
  details: string[];
  color_theme: string;
  icon_name: string;
  image_url: string | null;
  price: number;
  sort_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SiteContent {
  id: string;
  section: string;
  key: string;
  value: string;
  content_type: string;
}

export function useAdminProducts() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetch = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("admin_products")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) toast({ title: "Error loading products", variant: "destructive" });
    setProducts((data as AdminProduct[]) || []);
    setLoading(false);
  }, [toast]);

  useEffect(() => { fetch(); }, [fetch]);

  const save = async (product: Partial<AdminProduct> & { id?: string }) => {
    if (product.id) {
      const { error } = await supabase.from("admin_products").update(product).eq("id", product.id);
      if (error) { toast({ title: "Error updating product", description: error.message, variant: "destructive" }); return false; }
    } else {
      const { error } = await supabase.from("admin_products").insert([product] as any);
      if (error) { toast({ title: "Error creating product", description: error.message, variant: "destructive" }); return false; }
    }
    toast({ title: product.id ? "Product updated" : "Product created" });
    await fetch();
    return true;
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("admin_products").delete().eq("id", id);
    if (error) { toast({ title: "Error deleting product", description: error.message, variant: "destructive" }); return false; }
    toast({ title: "Product deleted" });
    await fetch();
    return true;
  };

  return { products, loading, save, remove, refetch: fetch };
}

export function useAdminServices() {
  const [services, setServices] = useState<AdminService[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetch = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("admin_services")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) toast({ title: "Error loading services", variant: "destructive" });
    setServices((data as AdminService[]) || []);
    setLoading(false);
  }, [toast]);

  useEffect(() => { fetch(); }, [fetch]);

  const save = async (service: Partial<AdminService> & { id?: string }) => {
    if (service.id) {
      const { error } = await supabase.from("admin_services").update(service).eq("id", service.id);
      if (error) { toast({ title: "Error updating service", description: error.message, variant: "destructive" }); return false; }
    } else {
      const { error } = await supabase.from("admin_services").insert([service] as any);
      if (error) { toast({ title: "Error creating service", description: error.message, variant: "destructive" }); return false; }
    }
    toast({ title: service.id ? "Service updated" : "Service created" });
    await fetch();
    return true;
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("admin_services").delete().eq("id", id);
    if (error) { toast({ title: "Error deleting service", description: error.message, variant: "destructive" }); return false; }
    toast({ title: "Service deleted" });
    await fetch();
    return true;
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("service-images").upload(path, file);
    if (error) { toast({ title: "Upload failed", description: error.message, variant: "destructive" }); return null; }
    const { data } = supabase.storage.from("service-images").getPublicUrl(path);
    return data.publicUrl;
  };

  return { services, loading, save, remove, uploadImage, refetch: fetch };
}

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetch = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from("site_content").select("*").order("section");
    if (error) toast({ title: "Error loading site content", variant: "destructive" });
    setContent((data as SiteContent[]) || []);
    setLoading(false);
  }, [toast]);

  useEffect(() => { fetch(); }, [fetch]);

  const getValue = (section: string, key: string, fallback = "") => {
    const item = content.find((c) => c.section === section && c.key === key);
    return item?.value || fallback;
  };

  const save = async (section: string, key: string, value: string, content_type = "text") => {
    const existing = content.find((c) => c.section === section && c.key === key);
    if (existing) {
      const { error } = await supabase.from("site_content").update({ value }).eq("id", existing.id);
      if (error) { toast({ title: "Error saving", description: error.message, variant: "destructive" }); return false; }
    } else {
      const { error } = await supabase.from("site_content").insert({ section, key, value, content_type });
      if (error) { toast({ title: "Error saving", description: error.message, variant: "destructive" }); return false; }
    }
    toast({ title: "Content saved" });
    await fetch();
    return true;
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("site_content").delete().eq("id", id);
    if (error) { toast({ title: "Error deleting", description: error.message, variant: "destructive" }); return false; }
    toast({ title: "Content deleted" });
    await fetch();
    return true;
  };

  return { content, loading, getValue, save, remove, refetch: fetch };
}
