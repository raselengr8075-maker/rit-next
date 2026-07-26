import { fallbackProjects } from "@/data/fallback-content";
import type { Project } from "@/types/content";
import { one, published } from "./repository";

export const getProjects = () => published("projects", fallbackProjects);
export const getProject = (slug: string) => one("projects", slug, fallbackProjects);

const normalized = (values?: string[]) => new Set((values || []).map((value) => value.trim().toLowerCase()).filter(Boolean));

export function relatedProjects(project: Project, projects: Project[], limit = 3) {
  const explicit = new Set(project.relatedProjects || []);
  const projectTags = normalized([...(project.technologies || []), ...(project.keywords || [])]);
  return projects
    .filter((candidate) => candidate.slug !== project.slug)
    .map((candidate) => {
      let score = explicit.has(candidate.slug) ? 100 : 0;
      if (project.category && candidate.category === project.category) score += 20;
      if (project.researchArea && candidate.researchArea === project.researchArea) score += 14;
      if (project.machineType && candidate.machineType === project.machineType) score += 14;
      for (const value of [...(candidate.technologies || []), ...(candidate.keywords || [])]) {
        if (projectTags.has(value.trim().toLowerCase())) score += 4;
      }
      return { candidate, score };
    })
    .sort((a, b) => b.score - a.score || (a.candidate.sortOrder || 0) - (b.candidate.sortOrder || 0))
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}
