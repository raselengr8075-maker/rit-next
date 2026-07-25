import "server-only";
import { access } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@/lib/supabase/server";
import { fallbackGallery } from "@/data/fallback-content";
import type { GalleryItem, ImageClassification } from "@/types/content";

const localAssets = [
  ["rit-workshop-modern.png", "Modern engineering workshop", "Workshop"],
  ["rit-rd-laboratory.png", "Research and development laboratory", "Research"],
  ["rit-cad-design-lab.png", "CAD design laboratory", "CAD Design"],
  ["rit-3d-printing-lab.png", "3D printing laboratory", "3D Printing"],
  ["rit-electronics-lab.png", "Electronics development laboratory", "Electronics"],
  ["rit-testing-bench.png", "Engineering testing bench", "Testing"],
  ["rit-cnc-milling-machine.png", "CNC milling machine", "CNC Machining"],
  ["rit-cnc-lathe.png", "CNC lathe", "CNC Machining"],
  ["rit-plasma-cutter.png", "Plasma cutting equipment", "Plasma Cutting"],
  ["rit-agricultural-showroom.png", "Agricultural engineering showroom", "Agricultural Engineering"],
  ["rit-smart-agriculture-field.png", "Smart agriculture field", "Smart Agriculture"],
] as const;

const toCamel = (record: Record<string, unknown>) => Object.fromEntries(
  Object.entries(record).map(([key, value]) => [key.replace(/_([a-z])/g, (_, letter: string) => letter.toUpperCase()), value]),
);

async function getApprovedLocalAssets(): Promise<GalleryItem[]> {
  const local: GalleryItem[] = [];
  for (const [fileName, title, category] of localAssets) {
    try {
      await access(path.join(process.cwd(), "public", "images", "engineering", fileName));
      local.push({
        id: `local-${fileName}`,
        slug: fileName.replace(/\.png$/, ""),
        titleEn: title,
        titleBn: title,
        summaryEn: "Illustrative visual prepared for engineering presentation.",
        summaryBn: "প্রকৌশল উপস্থাপনার জন্য প্রস্তুতকৃত চিত্র।",
        contentEn: "",
        contentBn: "",
        status: "illustrative",
        published: true,
        createdAt: "",
        updatedAt: "",
        imageUrl: `/images/engineering/${fileName}`,
        altEn: `${title}, illustrative image`,
        altBn: `${title}, চিত্রিত উপস্থাপনা`,
        captionEn: title,
        captionBn: title,
        category,
        imageClassification: "Illustrative image",
        sourceType: "local-illustrative",
      });
    } catch {
      // Missing optional files are intentionally ignored.
    }
  }
  return local;
}

export async function getEngineeringGallery(): Promise<GalleryItem[]> {
  let databaseItems: GalleryItem[] = [];

  try {
    const db = await createClient();
    if (db) {
      const primary = await db.from("gallery_items")
        .select("id,slug,title_en,title_bn,summary_en,summary_bn,status,published,featured,sort_order,category,image_url,alt_en,alt_bn,caption_en,caption_bn,media_date,related_project_slug,image_classification,featured_on_home,display_order,source_type")
        .eq("published", true)
        .eq("featured_on_home", true)
        .order("display_order")
        .limit(6);

      let rows: Record<string, unknown>[] = [];
      if (!primary.error && primary.data?.length) {
        rows = (primary.data || []) as Record<string, unknown>[];
      } else {
        const legacy = await db.from("gallery_items")
          .select("id,slug,title_en,title_bn,summary_en,summary_bn,status,published,featured,sort_order,category,image_url,alt_en,alt_bn,caption_en,caption_bn")
          .eq("published", true)
          .eq("featured", true)
          .order("sort_order")
          .limit(6);
        if (!legacy.error) rows = (legacy.data || []) as Record<string, unknown>[];
      }

      databaseItems = rows.map((row) => {
        const item = toCamel(row) as unknown as GalleryItem;
        return {
          ...item,
          imageClassification: item.imageClassification || (item.imageUrl ? "Illustrative image" : "Design representation"),
          sourceType: item.sourceType || "database",
        };
      });
    }
  } catch {
    // Continue to approved local assets and branded placeholders.
  }

  const local = await getApprovedLocalAssets();
  const databaseImages = databaseItems.filter((item) => Boolean(item.imageUrl));

  if (databaseImages.length || local.length) {
    return [...databaseImages, ...local]
      .filter((item, index, items) => items.findIndex((candidate) => candidate.imageUrl === item.imageUrl) === index)
      .slice(0, 6);
  }

  if (databaseItems.length) return databaseItems.slice(0, 6);

  return fallbackGallery.slice(0, 6).map((item) => ({
    ...item,
    imageClassification: "Design representation" as ImageClassification,
    sourceType: "abstract-placeholder",
    captionEn: item.titleEn,
    captionBn: item.titleBn || item.titleEn,
  }));
}
