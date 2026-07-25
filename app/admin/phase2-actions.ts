"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin/auth";

const optionalUrl = z.string().trim().url().or(z.literal(""));
const classification = z.enum(["Actual photograph", "Concept visualization", "Illustrative image", "Proposed facility", "Design representation"]);
const projectSchema = z.object({
  id: z.string().uuid(),
  featured_on_home: z.boolean(),
  featured_rank: z.coerce.number().int().min(0).max(1000).nullable(),
  development_stage: z.string().trim().max(80),
  image_classification: classification,
  year: z.coerce.number().int().min(1900).max(2200).nullable(),
  hero_image_url: optionalUrl,
});
const gallerySchema = z.object({
  id: z.string().uuid(),
  category: z.string().trim().max(100),
  caption_en: z.string().trim().max(500),
  caption_bn: z.string().trim().max(500),
  alt_en: z.string().trim().min(3).max(300),
  alt_bn: z.string().trim().max(300),
  image_classification: classification,
  related_project_slug: z.string().trim().max(120),
  featured_on_home: z.boolean(),
  display_order: z.coerce.number().int().min(-10000).max(10000),
  published: z.boolean(),
});
const partnerSchema = z.object({
  id: z.string().uuid(),
  name: z.string().trim().min(2).max(200),
  logo_url: optionalUrl,
  relationship_type: z.string().trim().min(2).max(100),
  website_url: optionalUrl,
  is_approved: z.boolean(),
  is_visible: z.boolean(),
  display_order: z.coerce.number().int().min(-10000).max(10000),
  published: z.boolean(),
});
const metricSchema = z.object({
  id: z.string().uuid().optional(),
  label_en: z.string().trim().min(2).max(160),
  label_bn: z.string().trim().max(160),
  numeric_value: z.coerce.number().min(0).max(1_000_000_000),
  suffix: z.string().trim().max(20),
  source_note: z.string().trim().min(5).max(500),
  is_verified: z.boolean(),
  is_visible: z.boolean(),
  display_order: z.coerce.number().int().min(-10000).max(10000),
  icon_key: z.enum(["verified", "project", "app", "publication", "milestone"]),
});

export async function savePhase2Metadata(kind: "projects" | "gallery_items" | "partners", input: unknown) {
  try {
    const schema = kind === "projects" ? projectSchema : kind === "gallery_items" ? gallerySchema : partnerSchema;
    const data = schema.parse(input);
    const { db } = await requireAdmin();
    const { id, ...values } = data;
    const { error } = await db.from(kind).update(values).eq("id", id);
    if (error) return { ok: false, message: "Metadata could not be saved. Apply the Phase 2 migration first." };
    revalidatePath("/");
    revalidatePath(`/admin/${kind === "gallery_items" ? "gallery" : kind}`);
    return { ok: true, message: "Homepage presentation metadata saved." };
  } catch (error) {
    return { ok: false, message: error instanceof z.ZodError ? "Review the required fields and values." : "Unauthorized update." };
  }
}

export async function saveMetric(input: unknown) {
  try {
    const data = metricSchema.parse(input);
    const { db } = await requireAdmin();
    const id = data.id;
    delete data.id;
    const { error } = await (id ? db.from("site_metrics").update(data).eq("id", id) : db.from("site_metrics").insert(data));
    if (error) return { ok: false, message: "Metric could not be saved. Apply the Phase 2 migration first." };
    revalidatePath("/");
    revalidatePath("/admin/metrics");
    return { ok: true, message: id ? "Metric updated." : "Metric created." };
  } catch (error) {
    return { ok: false, message: error instanceof z.ZodError ? "A label, non-negative value and source note are required." : "Unauthorized update." };
  }
}

export async function deleteMetric(idInput: string) {
  try {
    const id = z.string().uuid().parse(idInput);
    const { db } = await requireAdmin();
    const { error } = await db.from("site_metrics").delete().eq("id", id);
    if (error) return { ok: false, message: "Metric could not be deleted." };
    revalidatePath("/");
    revalidatePath("/admin/metrics");
    return { ok: true, message: "Metric deleted." };
  } catch {
    return { ok: false, message: "Unauthorized delete." };
  }
}
