import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Partner } from "@/types/content";

const toCamel = (record: Record<string, unknown>) => Object.fromEntries(
  Object.entries(record).map(([key, value]) => [key.replace(/_([a-z])/g, (_, letter: string) => letter.toUpperCase()), value]),
);

export async function getPublicPartners(): Promise<Partner[]> {
  try {
    const db = await createClient();
    if (!db) return [];
    const { data, error } = await db.from("partners")
      .select("id,slug,name,title_en,title_bn,summary_en,summary_bn,status,published,featured,sort_order,logo_url,website_url,relationship_type,is_approved,is_visible,display_order")
      .eq("published", true)
      .eq("is_approved", true)
      .eq("is_visible", true)
      .order("display_order");
    if (error) return [];
    return (data || [])
      .map((row) => toCamel(row as Record<string, unknown>) as unknown as Partner)
      .filter((partner) => partner.name?.trim() && partner.isApproved === true && partner.isVisible === true);
  } catch {
    return [];
  }
}
