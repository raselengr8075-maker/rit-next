import "server-only";
import { access } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/types/content";

const toCamel = (record: Record<string, unknown>) => Object.fromEntries(
  Object.entries(record).map(([key, value]) => [key.replace(/_([a-z])/g, (_, letter: string) => letter.toUpperCase()), value]),
);

const projectImageDirectory = path.join(process.cwd(), "public", "images", "projects");

// Only project-specific illustrative assets may be used on featured project cards.
// General workshop, laboratory and showroom visuals belong to the engineering gallery.
const localProjectImageMap: Readonly<Record<string, string>> = {
  "batch-type-grain-dryer": "rit-batch-type-grain-dryer.png",
  "vacuum-paddy-collector": "rit-vacuum-paddy-collector.png",
};

async function getApprovedLocalImage(project: Project): Promise<string | undefined> {
  const filename = localProjectImageMap[project.slug];
  if (!filename) return undefined;

  try {
    await access(path.join(projectImageDirectory, filename));
    return `/images/projects/${filename}`;
  } catch {
    return undefined;
  }
}

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

    return Promise.all(rows.map(async (row) => {
      const item = toCamel(row) as unknown as Project;
      const hasDatabaseImage = Boolean(item.heroImageUrl?.trim() || item.imageUrl?.trim());
      const localImageUrl = hasDatabaseImage ? undefined : await getApprovedLocalImage(item);

      return {
        ...item,
        ...(localImageUrl ? { imageUrl: localImageUrl } : {}),
        imageClassification: item.imageClassification
          || (localImageUrl ? "Illustrative image" : "Concept visualization"),
      };
    }));
  } catch {
    return [];
  }
}
