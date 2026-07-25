import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

export type PublicSiteSettings = {
  websiteName: string; tagline: string; publicUrl: string; contactEmail: string;
  phone: string; address: string; workingHours: string; facebook: string;
  linkedIn: string; youTube: string; whatsApp: string; defaultSeoImage: string;
  founderVisible: boolean; partnersVisible: boolean; newsletterVisible: boolean;
  assistantVisible: boolean;
};

export const defaultPublicSiteSettings: PublicSiteSettings = {
  websiteName: "Rasel Innovation & Technology",
  tagline: "Practical engineering and digital innovation for real-world progress.",
  publicUrl: "", contactEmail: "", phone: "", address: "", workingHours: "",
  facebook: "", linkedIn: "", youTube: "", whatsApp: "", defaultSeoImage: "",
  founderVisible: true, partnersVisible: true, newsletterVisible: false,
  assistantVisible: true,
};

export async function getPublicSiteSettings(): Promise<PublicSiteSettings> {
  try {
    const db = createAdminClient();
    if (!db) return defaultPublicSiteSettings;
    const { data, error } = await db.from("site_settings").select("value").eq("key", "public_site").maybeSingle();
    if (error || !data?.value || typeof data.value !== "object") return defaultPublicSiteSettings;
    return { ...defaultPublicSiteSettings, ...(data.value as Partial<PublicSiteSettings>) };
  } catch {
    return defaultPublicSiteSettings;
  }
}
