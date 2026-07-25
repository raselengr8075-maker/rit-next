"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin/auth";

const optionalUrl = z.string().trim().url().or(z.literal(""));
const publicSettingsSchema = z.object({
  websiteName: z.string().trim().min(2).max(120),
  tagline: z.string().trim().max(240),
  publicUrl: optionalUrl,
  contactEmail: z.string().trim().email().or(z.literal("")),
  phone: z.string().trim().max(40),
  address: z.string().trim().max(400),
  workingHours: z.string().trim().max(200),
  facebook: optionalUrl,
  linkedIn: optionalUrl,
  youTube: optionalUrl,
  whatsApp: optionalUrl,
  defaultSeoImage: optionalUrl,
  founderVisible: z.boolean(),
  partnersVisible: z.boolean(),
  newsletterVisible: z.boolean(),
  assistantVisible: z.boolean(),
});

export type PublicSiteSettings = z.infer<typeof publicSettingsSchema>;

export async function savePublicSiteSettings(input: unknown) {
  try {
    const value = publicSettingsSchema.parse(input);
    const { db } = await requireAdmin();
    const { error } = await db.from("site_settings").upsert(
      { key: "public_site", value },
      { onConflict: "key" },
    );
    if (error) return { ok: false, message: "Settings could not be saved. Confirm that schema.sql has been applied." };
    revalidatePath("/");
    revalidatePath("/admin/settings");
    return { ok: true, message: "Public site settings saved." };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof z.ZodError
        ? "Review the URLs, email address and field lengths."
        : "You are not authorized to change settings.",
    };
  }
}
