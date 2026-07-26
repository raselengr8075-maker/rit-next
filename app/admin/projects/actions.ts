"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin/auth";

const safeUrl = z.string().trim().refine(
  (value) => value.startsWith("/") || /^https?:\/\//i.test(value),
  "Use an HTTP(S) URL or a root-relative local path.",
);
const optionalUrl = safeUrl.or(z.literal(""));
const stringArray = z.array(z.string().trim().min(1).max(300)).max(100);
const specification = z.object({
  label: z.string().trim().min(1).max(120),
  value: z.union([z.string().max(300), z.number()]),
  unit: z.string().trim().max(40).optional(),
  group: z.string().trim().max(80).optional(),
});
const galleryMedia = z.object({
  url: safeUrl,
  altEn: z.string().trim().min(3).max(300),
  altBn: z.string().trim().max(300).optional(),
  captionEn: z.string().trim().max(500).optional(),
  captionBn: z.string().trim().max(500).optional(),
  credit: z.string().trim().max(200).optional(),
  classification: z.enum(["Actual photograph", "Concept visualization", "Illustrative image", "Proposed facility", "Design representation"]).optional(),
  blurDataUrl: z.string().max(5000).optional(),
  storagePath: z.string().max(500).optional(),
});
const video = z.object({
  title: z.string().trim().min(1).max(200),
  url: safeUrl,
  type: z.enum(["youtube", "mp4", "embed"]).optional(),
  captionEn: z.string().max(1000).optional(),
  captionBn: z.string().max(1000).optional(),
});
const document = z.object({
  title: z.string().trim().min(1).max(200),
  url: safeUrl,
  type: z.string().trim().max(80).optional(),
  descriptionEn: z.string().max(1000).optional(),
  descriptionBn: z.string().max(1000).optional(),
  previewUrl: optionalUrl,
  size: z.string().max(40).optional(),
  storagePath: z.string().max(500).optional(),
});
const timelineStage = z.object({
  stage: z.string().trim().min(1).max(100),
  titleEn: z.string().max(200).optional(),
  titleBn: z.string().max(200).optional(),
  descriptionEn: z.string().max(2000).optional(),
  descriptionBn: z.string().max(2000).optional(),
  date: z.string().max(30).optional(),
  status: z.string().max(80).optional(),
});

const portfolioSchema = z.object({
  id: z.string().uuid(),
  hero_image: optionalUrl,
  problem: z.string().max(10000),
  objective: z.string().max(10000),
  solution: z.string().max(15000),
  research_method_en: z.string().max(15000),
  research_method_bn: z.string().max(15000),
  research_status: z.string().max(100),
  prototype_status: z.string().max(100),
  field_test_status: z.string().max(100),
  research_area: z.string().max(120),
  machine_type: z.string().max(120),
  seo_title: z.string().max(200),
  seo_description: z.string().max(500),
  technical_specs: z.array(specification).max(100),
  project_gallery: z.array(galleryMedia).max(100),
  videos: z.array(video).max(50),
  documents: z.array(document).max(100),
  downloads: z.array(document).max(100),
  development_timeline: z.array(timelineStage).max(100),
  key_innovations: stringArray,
  engineering_features: stringArray,
  benefits: stringArray,
  applications: stringArray,
  keywords: stringArray,
  related_projects: stringArray,
});

export async function saveProjectPortfolio(input: unknown) {
  try {
    const data = portfolioSchema.parse(input);
    const { id, ...values } = data;
    const { db } = await requireAdmin();
    const { error } = await db.from("projects").update({ ...values, last_updated: new Date().toISOString() }).eq("id", id);
    if (error) return { ok: false, message: "Portfolio fields could not be saved. Apply the Phase 3 migration first." };
    revalidatePath("/projects");
    revalidatePath("/admin/projects");
    return { ok: true, message: "Engineering portfolio fields saved." };
  } catch (error) {
    return { ok: false, message: error instanceof z.ZodError ? "Review the structured fields and JSON collections." : "Unauthorized update." };
  }
}

const documentTypes = {
  "application/pdf": { extension: "pdf", signature: (bytes: Uint8Array) => String.fromCharCode(...bytes.slice(0, 4)) === "%PDF" },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": { extension: "docx", signature: (bytes: Uint8Array) => bytes[0] === 0x50 && bytes[1] === 0x4b },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": { extension: "pptx", signature: (bytes: Uint8Array) => bytes[0] === 0x50 && bytes[1] === 0x4b },
} as const;

export async function uploadProjectDocument(formData: FormData) {
  try {
    const file = formData.get("file");
    if (!(file instanceof File)) return { ok: false, message: "Choose a document." };
    const config = documentTypes[file.type as keyof typeof documentTypes];
    if (!config) return { ok: false, message: "Only PDF, DOCX and PPTX documents are supported." };
    if (file.size <= 0 || file.size > 20 * 1024 * 1024) return { ok: false, message: "Document must be 20 MB or smaller." };
    const bytes = new Uint8Array(await file.slice(0, 8).arrayBuffer());
    if (!config.signature(bytes)) return { ok: false, message: "Document contents do not match its file type." };
    const storagePath = `projects/documents/${randomUUID()}.${config.extension}`;
    const { db } = await requireAdmin();
    const { error } = await db.storage.from("rit-media").upload(storagePath, file, { contentType: file.type, upsert: false });
    if (error) return { ok: false, message: "Document upload failed. Apply the Phase 3 storage migration." };
    return {
      ok: true,
      message: "Document uploaded.",
      path: storagePath,
      url: db.storage.from("rit-media").getPublicUrl(storagePath).data.publicUrl,
      title: file.name.replace(/\.[^.]+$/, ""),
      type: config.extension.toUpperCase(),
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
    };
  } catch {
    return { ok: false, message: "Unauthorized or invalid document upload." };
  }
}

export async function deleteProjectDocument(pathInput: string) {
  try {
    const path = z.string().regex(
      /^projects\/documents\/[a-f0-9-]+\.(pdf|docx|pptx)$/,
      "Invalid project document path.",
    ).parse(pathInput);
    const { db } = await requireAdmin();
    const { error } = await db.storage.from("rit-media").remove([path]);
    return error
      ? { ok: false, message: "Document could not be removed from storage." }
      : { ok: true, message: "Document removed." };
  } catch {
    return { ok: false, message: "Unauthorized or invalid document deletion." };
  }
}
