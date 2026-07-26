import { hasPublicSupabaseConfig } from "@/lib/supabase/config";
import { requireAdmin } from "@/lib/admin/auth";
import SetupRequired from "./SetupRequired";
import AdminShell from "./AdminShell";
import ContentManager from "./ContentManager";
import Phase2MetadataManager from "./Phase2MetadataManager";
import ProjectPortfolioManager from "./ProjectPortfolioManager";

const config = {
  Projects: { table: "projects" as const, description: "Manage RIT engineering and agricultural project pages.", folder: "projects" },
  Gallery: { table: "gallery_items" as const, description: "Organize published media and gallery captions.", folder: "gallery" },
  Partners: { table: "partners" as const, description: "List only confirmed collaborations with explicit public approval.", folder: "partners" },
};

export default async function AdminPhase2ResourcePage({ title }: { title: keyof typeof config }) {
  if (!hasPublicSupabaseConfig()) return <SetupRequired />;
  const { db } = await requireAdmin();
  const resource = config[title];
  const { data, error } = await db.from(resource.table).select("*").order("sort_order").limit(200);
  return (
    <AdminShell>
      {error ? <div className="adminError">Records could not be loaded. Apply schema.sql and the Phase 2 migration.</div> : <>
        <ContentManager table={resource.table} title={title} description={resource.description} initialRows={(data || []) as never[]} folder={resource.folder} />
        <Phase2MetadataManager kind={resource.table} rows={(data || []) as never[]} />
        {resource.table === "projects" ? <ProjectPortfolioManager rows={(data || []) as never[]} /> : null}
      </>}
    </AdminShell>
  );
}
