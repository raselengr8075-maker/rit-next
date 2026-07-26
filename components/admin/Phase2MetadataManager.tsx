"use client";

import { FormEvent, useState } from "react";
import { FilePenLine } from "lucide-react";
import { savePhase2Metadata } from "@/app/admin/phase2-actions";
import AdminModal from "./AdminModal";
import AdminToast from "./AdminToast";

type Row = Record<string, unknown> & { id: string; title_en?: string; name?: string; image_url?: string; logo_url?: string };
const classifications = ["Actual photograph", "Concept visualization", "Illustrative image", "Proposed facility", "Design representation"];

export default function Phase2MetadataManager({ kind, rows }: { kind: "projects" | "gallery_items" | "partners"; rows: Row[] }) {
  const [editing, setEditing] = useState<Row | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editing) return;
    setSaving(true);
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const payload = kind === "projects" ? {
      id: editing.id,
      featured_on_home: values.featured_on_home === "on",
      featured_rank: values.featured_rank === "" ? null : values.featured_rank,
      development_stage: values.development_stage || "",
      image_classification: values.image_classification,
      year: values.year === "" ? null : values.year,
      hero_image_url: values.hero_image_url || "",
    } : kind === "gallery_items" ? {
      id: editing.id,
      category: values.category || "",
      caption_en: values.caption_en || "",
      caption_bn: values.caption_bn || "",
      alt_en: values.alt_en || "",
      alt_bn: values.alt_bn || "",
      image_credit: values.image_credit || "",
      blur_data_url: values.blur_data_url || "",
      image_classification: values.image_classification,
      related_project_slug: values.related_project_slug || "",
      featured_on_home: values.featured_on_home === "on",
      display_order: values.display_order || 0,
      published: values.published === "on",
    } : {
      id: editing.id,
      name: values.name || "",
      logo_url: values.logo_url || "",
      relationship_type: values.relationship_type || "",
      website_url: values.website_url || "",
      is_approved: values.is_approved === "on",
      is_visible: values.is_visible === "on",
      display_order: values.display_order || 0,
      published: values.published === "on",
    };
    const result = await savePhase2Metadata(kind, payload);
    setSaving(false);
    setToast({ message: result.message, type: result.ok ? "success" : "error" });
    if (result.ok) setEditing(null);
  }

  return (
    <section className="adminPanel phase2MetadataPanel">
      <header><div><h2>Homepage presentation metadata</h2><p>Classification and approval controls used by the Engineering Experience sections.</p></div></header>
      <div className="phase2MetadataGrid">
        {rows.map((row) => {
          const image = String(row.hero_image_url || row.image_url || row.logo_url || "");
          return <article key={row.id}>{image ? <img src={image} alt="" /> : <span className="phase2MetadataFallback">{String(row.title_en || row.name || "R").slice(0, 1)}</span>}<div><b>{String(row.title_en || row.name || "Untitled")}</b><small>{String(row.image_classification || row.relationship_type || row.development_stage || "Metadata not set")}</small></div><button onClick={() => setEditing(row)}><FilePenLine size={15} />Edit metadata</button></article>;
        })}
      </div>
      <AdminModal open={editing !== null} title="Homepage presentation metadata" onClose={() => setEditing(null)}>
        {editing ? <form className="adminForm" onSubmit={submit}>
          {kind === "projects" ? <>
            <div className="fieldGrid"><label>Development stage<input name="development_stage" required defaultValue={String(editing.development_stage || editing.status || "")} /></label><label>Year<input name="year" type="number" defaultValue={String(editing.year || "")} /></label><label>Featured rank<input name="featured_rank" type="number" defaultValue={String(editing.featured_rank || "")} /></label><label>Image classification<select name="image_classification" defaultValue={String(editing.image_classification || "Concept visualization")}>{classifications.map((value) => <option key={value}>{value}</option>)}</select></label></div>
            <label>Hero image URL<input name="hero_image_url" type="url" defaultValue={String(editing.hero_image_url || "")} /></label>
            <label className="checkField"><input name="featured_on_home" type="checkbox" defaultChecked={Boolean(editing.featured_on_home)} />Featured on homepage</label>
          </> : kind === "gallery_items" ? <>
            <div className="fieldGrid"><label>Category<input name="category" required defaultValue={String(editing.category || "")} /></label><label>Display order<input name="display_order" type="number" defaultValue={String(editing.display_order || editing.sort_order || 0)} /></label><label>Image classification<select name="image_classification" defaultValue={String(editing.image_classification || "Design representation")}>{classifications.map((value) => <option key={value}>{value}</option>)}</select></label><label>Related project slug<input name="related_project_slug" defaultValue={String(editing.related_project_slug || "")} /></label></div>
            <label>English caption<textarea name="caption_en" rows={2} defaultValue={String(editing.caption_en || "")} /></label><label>Bangla caption<textarea name="caption_bn" rows={2} defaultValue={String(editing.caption_bn || "")} /></label><label>English alt text<input name="alt_en" required defaultValue={String(editing.alt_en || "")} /></label><label>Bangla alt text<input name="alt_bn" defaultValue={String(editing.alt_bn || "")} /></label><div className="fieldGrid"><label>Image credit<input name="image_credit" defaultValue={String(editing.image_credit || "")} /></label><label>Blur data URL<input name="blur_data_url" placeholder="Optional base64 data URL" defaultValue={String(editing.blur_data_url || "")} /></label></div>
            <div className="fieldGrid"><label className="checkField"><input name="featured_on_home" type="checkbox" defaultChecked={Boolean(editing.featured_on_home)} />Featured on homepage</label><label className="checkField"><input name="published" type="checkbox" defaultChecked={Boolean(editing.published)} />Published</label></div>
          </> : <>
            <div className="fieldGrid"><label>Name<input name="name" required defaultValue={String(editing.name || "")} /></label><label>Relationship type<input name="relationship_type" required defaultValue={String(editing.relationship_type || "")} /></label><label>Display order<input name="display_order" type="number" defaultValue={String(editing.display_order || editing.sort_order || 0)} /></label></div>
            <label>Logo URL<input name="logo_url" type="url" defaultValue={String(editing.logo_url || "")} /></label><label>Verified website URL<input name="website_url" type="url" defaultValue={String(editing.website_url || "")} /></label>
            <div className="fieldGrid"><label className="checkField"><input name="is_approved" type="checkbox" defaultChecked={Boolean(editing.is_approved)} />Approved for public display</label><label className="checkField"><input name="is_visible" type="checkbox" defaultChecked={Boolean(editing.is_visible)} />Visible</label><label className="checkField"><input name="published" type="checkbox" defaultChecked={Boolean(editing.published)} />Published</label></div>
          </>}
          <div className="formActions"><button type="button" onClick={() => setEditing(null)}>Cancel</button><button className="adminPrimary" disabled={saving}>{saving ? "Saving…" : "Save metadata"}</button></div>
        </form> : null}
      </AdminModal>
      {toast ? <AdminToast message={toast.message} type={toast.type} onClose={() => setToast(null)} /> : null}
    </section>
  );
}
