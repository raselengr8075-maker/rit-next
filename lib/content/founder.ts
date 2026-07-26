import { fallbackFounder } from "@/data/fallback-content";
import { published } from "./repository";

export async function getFounder() {
  const profile = (await published("founder_profiles", [fallbackFounder]))[0];
  return {
    ...profile,
    name: profile.name || profile.titleEn,
  };
}
