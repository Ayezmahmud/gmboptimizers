import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminProduct, AdminService, SiteContent } from "@/hooks/useAdminData";

export function usePublicProducts() {
  const [dbProducts, setDbProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("admin_products")
        .select("*")
        .eq("active", true)
        .order("sort_order", { ascending: true });
      setDbProducts((data as AdminProduct[]) || []);
      setLoading(false);
    };
    fetch();
  }, []);

  return { dbProducts, loading };
}

export function usePublicServices() {
  const [dbServices, setDbServices] = useState<AdminService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("admin_services")
        .select("*")
        .eq("active", true)
        .order("sort_order", { ascending: true });
      setDbServices((data as AdminService[]) || []);
      setLoading(false);
    };
    fetch();
  }, []);

  return { dbServices, loading };
}

export function usePublicContent() {
  const [content, setContent] = useState<SiteContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("site_content").select("*");
      setContent((data as SiteContent[]) || []);
      setLoading(false);
    };
    fetch();
  }, []);

  const getValue = (section: string, key: string, fallback = "") => {
    const item = content.find((c) => c.section === section && c.key === key);
    return item?.value || fallback;
  };

  return { content, loading, getValue };
}
