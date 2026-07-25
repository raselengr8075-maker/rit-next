import { hasPublicSupabaseConfig } from "@/lib/supabase/config";
import { requireAdmin } from "@/lib/admin/auth";
import SetupRequired from "@/components/admin/SetupRequired";
import AdminShell from "@/components/admin/AdminShell";
import MetricManager from "@/components/admin/MetricManager";

export default async function Page() {
  if (!hasPublicSupabaseConfig()) return <SetupRequired />;
  const { db } = await requireAdmin();
  const { data, error } = await db.from("site_metrics").select("*").order("display_order");
  return <AdminShell>{error ? <div className="adminError">Metrics could not be loaded. Apply the Phase 2 migration first.</div> : <MetricManager initialRows={(data || []) as never[]} />}</AdminShell>;
}
