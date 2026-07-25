import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/types/content";

const toCamel = (record: Record<string, unknown>) => Object.fromEntries(
  Object.entries(record).map(([key, value]) => [key.replace(/_([a-z])/g, (_, letter: string) => letter.toUpperCase()), value]),
);

const projectColumns = "id,slug,title_en,title_bn,summary_en,summary_bn,status,published,featured,sort_order,category,year,image_url,hero_image_url,development_stage,image_classification,featured_on_home,featured_rank,document_urls,gallery_images";
const legacyColumns = "id,slug,title_en,title_bn,summary_en,summary_bn,status,published,featured,sort_order,category,year,image_url";

export async function getFeaturedMachines(): Promise<Project[]> {
  try {
    const db = await createClient();
    if (!db) return [];

    const primary = await db.from("projects")
      .select(projectColumns)
      .eq("published", true)
      .eq("featured_on_home", true)
      .order("featured_rank")
      .limit(5);

    let rows: Record<string, unknown>[] = [];
    if (!primary.error && primary.data?.length) {
      rows = (primary.data || []) as Record<string, unknown>[];
    } else {
      const legacy = await db.from("projects")
        .select(legacyColumns)
        .eq("published", true)
        .eq("featured", true)
        .order("sort_order")
        .limit(5);
      if (!legacy.error && legacy.data?.length) {
        rows = legacy.data as Record<string, unknown>[];
      } else {
        const published = await db.from("projects")
          .select(legacyColumns)
          .eq("published", true)
          .order("sort_order")
          .limit(5);
        if (published.error) return [];
        rows = (published.data || []) as Record<string, unknown>[];
      }
    }

    return rows.map((row) => {
      const item = toCamel(row) as unknown as Project;
      return { ...item, imageClassification: item.imageClassification || "Concept visualization" };
    });
  } catch {
    return [];
  }
}
