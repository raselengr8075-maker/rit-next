import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { VerifiedMetric } from "@/types/content";

const automaticMetrics = [
  { table: "projects", labelEn: "Published engineering projects", labelBn: "প্রকাশিত প্রকৌশল প্রকল্প", iconKey: "project" },
  { table: "apps", labelEn: "Published digital products", labelBn: "প্রকাশিত ডিজিটাল পণ্য", iconKey: "app" },
  { table: "achievements", labelEn: "Documented development milestones", labelBn: "নথিভুক্ত উন্নয়ন মাইলফলক", iconKey: "milestone" },
] as const;

export async function getVerifiedHomeMetrics(): Promise<VerifiedMetric[]> {
  try {
    const db = await createClient();
    if (!db) return [];

    const [counts, newsCount, resourceCount, manualResult] = await Promise.all([
      Promise.all(automaticMetrics.map(async (metric) => {
        const { count, error } = await db.from(metric.table).select("id", { count: "exact", head: true }).eq("published", true);
        return error || !count ? null : { ...metric, count };
      })),
      db.from("news_articles").select("id", { count: "exact", head: true }).eq("published", true),
      db.from("resources").select("id", { count: "exact", head: true }).eq("published", true),
      db.from("site_metrics")
        .select("id,label_en,label_bn,numeric_value,suffix,source_note,icon_key,display_order")
        .eq("is_verified", true)
        .eq("is_visible", true)
        .order("display_order"),
    ]);

    const verified: VerifiedMetric[] = counts.flatMap((metric, index) => metric ? [{
      id: `published-${metric.table}`,
      labelEn: metric.labelEn,
      labelBn: metric.labelBn,
      numericValue: metric.count,
      sourceNote: `Live count of published ${metric.table.replace("_", " ")} records.`,
      iconKey: metric.iconKey,
      displayOrder: index,
    }] : []);

    const publications = (newsCount.error ? 0 : newsCount.count || 0) + (resourceCount.error ? 0 : resourceCount.count || 0);
    if (publications > 0) {
      verified.push({
        id: "published-publications",
        labelEn: "Published articles and resources",
        labelBn: "প্রকাশিত নিবন্ধ ও রিসোর্স",
        numericValue: publications,
        sourceNote: "Live combined count of published news and resource records.",
        iconKey: "publication",
        displayOrder: 3,
      });
    }

    if (!manualResult.error) {
      for (const row of manualResult.data || []) {
        const value = Number(row.numeric_value);
        if (!row.label_en?.trim() || !row.source_note?.trim() || !Number.isFinite(value) || value < 0) continue;
        verified.push({
          id: row.id,
          labelEn: row.label_en,
          labelBn: row.label_bn || row.label_en,
          numericValue: value,
          suffix: row.suffix || "",
          sourceNote: row.source_note,
          iconKey: row.icon_key || "verified",
          displayOrder: Number(row.display_order || 100),
        });
      }
    }

    return verified.filter((metric) => metric.numericValue > 0).sort((a, b) => a.displayOrder - b.displayOrder).slice(0, 8);
  } catch {
    return [];
  }
}
