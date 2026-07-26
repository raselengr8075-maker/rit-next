"use client";

import { ChangeEvent, DragEvent, FormEvent, useState } from "react";
import { FileUp, GripVertical, LoaderCircle, Settings2, Trash2 } from "lucide-react";
import { deleteMedia, uploadMedia } from "@/app/admin/actions";
import { deleteProjectDocument, saveProjectPortfolio, uploadProjectDocument } from "@/app/admin/projects/actions";
import AdminModal from "./AdminModal";
import AdminToast from "./AdminToast";

type Row = Record<string, unknown> & { id: string; title_en?: string; slug?: string };
type CollectionName =
  | "technical_specs"
  | "project_gallery"
  | "videos"
  | "documents"
  | "downloads"
  | "development_timeline";

const collectionNames: CollectionName[] = [
  "technical_specs",
  "project_gallery",
  "videos",
  "documents",
  "downloads",
  "development_timeline",
];
const defaults: Record<CollectionName, unknown[]> = {
  technical_specs: [],
  project_gallery: [],
  videos: [],
  documents: [],
  downloads: [],
  development_timeline: [],
};
const asArray = (value: unknown) => Array.isArray(value) ? value : [];
const lineList = (value: unknown) => Array.isArray(value) ? value.join("\n") : "";
const parseLines = (value: FormDataEntryValue | null) =>
  String(value || "").split(/\r?\n|,/).map((item) => item.trim()).filter(Boolean);

function OrderedJsonEditor({
  label,
  value,
  onChange,
  deleteStoredItem,
}: {
  label: string;
  value: unknown[];
  onChange: (items: unknown[]) => void;
  deleteStoredItem?: (path: string) => Promise<{ ok: boolean; message: string }>;
}) {
  const [text, setText] = useState(() => JSON.stringify(value, null, 2));
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  function update(event: ChangeEvent<HTMLTextAreaElement>) {
    setText(event.target.value);
    try {
      const parsed = JSON.parse(event.target.value);
      if (Array.isArray(parsed)) onChange(parsed);
    } catch {
      // Keep the draft text visible while the administrator finishes valid JSON.
    }
  }

  function drop(event: DragEvent, target: number) {
    event.preventDefault();
    if (dragIndex === null || dragIndex === target) return;
    const reordered = [...value];
    const [moved] = reordered.splice(dragIndex, 1);
    reordered.splice(target, 0, moved);
    onChange(reordered);
    setText(JSON.stringify(reordered, null, 2));
    setDragIndex(null);
  }

  async function remove(index: number) {
    if (!confirm(`Remove item ${index + 1} from ${label}?`)) return;
    const item = value[index] as Record<string, unknown>;
    const path = typeof item.storagePath === "string" ? item.storagePath : "";
    if (path && deleteStoredItem) {
      const result = await deleteStoredItem(path);
      if (!result.ok) {
        alert(result.message);
        return;
      }
    }
    const next = value.filter((_, itemIndex) => itemIndex !== index);
    onChange(next);
    setText(JSON.stringify(next, null, 2));
  }

  return (
    <fieldset>
      <legend>{label}</legend>
      <textarea rows={8} value={text} onChange={update} spellCheck={false} />
      {value.length ? (
        <div className="portfolioOrderList" aria-label={`${label} order`}>
          {value.map((item, index) => {
            const record = item as Record<string, unknown>;
            return (
              <div
                key={index}
                draggable
                onDragStart={() => setDragIndex(index)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => drop(event, index)}
              >
                <GripVertical size={16} aria-hidden="true" />
                <span>{String(record?.title || record?.label || record?.stage || `Item ${index + 1}`)}</span>
                <button type="button" className="portfolioRemoveItem" onClick={() => void remove(index)} aria-label={`Remove ${label} item ${index + 1}`}><Trash2 size={14} /></button>
              </div>
            );
          })}
        </div>
      ) : null}
      <small>Use valid JSON. Drag the preview rows to change display order.</small>
    </fieldset>
  );
}

export default function ProjectPortfolioManager({ rows }: { rows: Row[] }) {
  const [editing, setEditing] = useState<Row | null>(null);
  const [collections, setCollections] = useState<Record<CollectionName, unknown[]>>(defaults);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  function open(row: Row) {
    setEditing(row);
    setCollections(Object.fromEntries(
      collectionNames.map((name) => [name, asArray(row[name])]),
    ) as Record<CollectionName, unknown[]>);
  }

  function setCollection(name: CollectionName, items: unknown[]) {
    setCollections((current) => ({ ...current, [name]: items }));
  }

  async function uploadDocument(file?: File) {
    if (!file || uploading) return;
    setUploading(true);
    const data = new FormData();
    data.set("file", file);
    const result = await uploadProjectDocument(data);
    setUploading(false);
    setToast({ message: result.message, type: result.ok ? "success" : "error" });
    if (result.ok && result.url) {
      setCollection("documents", [
        ...collections.documents,
        { title: result.title, url: result.url, type: result.type, size: result.size, storagePath: result.path },
      ]);
    }
  }

  async function uploadGallery(files?: FileList | null) {
    if (!files?.length || uploadingGallery) return;
    setUploadingGallery(true);
    const additions: unknown[] = [];
    for (const file of Array.from(files)) {
      const data = new FormData();
      data.set("folder", "projects");
      data.set("file", file);
      const result = await uploadMedia(data);
      if (result.ok && result.url) {
        additions.push({
          url: result.url,
          storagePath: result.path,
          altEn: file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "),
          classification: "Illustrative image",
        });
      } else {
        setToast({ message: result.message, type: "error" });
      }
    }
    if (additions.length) {
      setCollection("project_gallery", [...collections.project_gallery, ...additions]);
      setToast({
        message: `${additions.length} gallery image${additions.length === 1 ? "" : "s"} uploaded. Add verified captions and classifications before publishing.`,
        type: "success",
      });
    }
    setUploadingGallery(false);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editing) return;
    setSaving(true);
    const values = new FormData(event.currentTarget);
    const result = await saveProjectPortfolio({
      id: editing.id,
      hero_image: String(values.get("hero_image") || ""),
      problem: String(values.get("problem") || ""),
      objective: String(values.get("objective") || ""),
      solution: String(values.get("solution") || ""),
      research_method_en: String(values.get("research_method_en") || ""),
      research_method_bn: String(values.get("research_method_bn") || ""),
      research_status: String(values.get("research_status") || ""),
      prototype_status: String(values.get("prototype_status") || ""),
      field_test_status: String(values.get("field_test_status") || ""),
      research_area: String(values.get("research_area") || ""),
      machine_type: String(values.get("machine_type") || ""),
      seo_title: String(values.get("seo_title") || ""),
      seo_description: String(values.get("seo_description") || ""),
      technical_specs: collections.technical_specs,
      project_gallery: collections.project_gallery,
      videos: collections.videos,
      documents: collections.documents,
      downloads: collections.downloads,
      development_timeline: collections.development_timeline,
      key_innovations: parseLines(values.get("key_innovations")),
      engineering_features: parseLines(values.get("engineering_features")),
      benefits: parseLines(values.get("benefits")),
      applications: parseLines(values.get("applications")),
      keywords: parseLines(values.get("keywords")),
      related_projects: parseLines(values.get("related_projects")),
    });
    setSaving(false);
    setToast({ message: result.message, type: result.ok ? "success" : "error" });
    if (result.ok) setEditing(null);
  }

  return (
    <section className="adminPanel projectPortfolioPanel">
      <header>
        <div>
          <h2>Engineering portfolio experience</h2>
          <p>Edit specifications, narratives, media, documents, timeline and SEO without changing code.</p>
        </div>
      </header>
      <div className="projectPortfolioGrid">
        {rows.map((row) => (
          <article key={row.id}>
            <div><b>{String(row.title_en || "Untitled project")}</b><small>{String(row.slug || "")}</small></div>
            <button type="button" onClick={() => open(row)}><Settings2 size={16} />Edit portfolio</button>
          </article>
        ))}
      </div>
      <AdminModal
        open={editing !== null}
        title={`Engineering portfolio · ${String(editing?.title_en || "Project")}`}
        onClose={() => setEditing(null)}
      >
        {editing ? (
          <form className="adminForm portfolioForm" onSubmit={submit}>
            <fieldset>
              <legend>Project narrative</legend>
              <label>Hero image URL<input name="hero_image" defaultValue={String(editing.hero_image || editing.hero_image_url || "")} placeholder="https://… or /images/…" /></label>
              <label>Problem statement<textarea name="problem" rows={4} defaultValue={String(editing.problem || editing.problem_statement_en || "")} /></label>
              <label>Objective<textarea name="objective" rows={4} defaultValue={String(editing.objective || editing.objectives_en || "")} /></label>
              <label>Technical solution<textarea name="solution" rows={5} defaultValue={String(editing.solution || editing.proposed_solution_en || "")} /></label>
              <div className="fieldGrid">
                <label>Research method (English)<textarea name="research_method_en" rows={4} defaultValue={String(editing.research_method_en || "")} /></label>
                <label>Research method (Bangla)<textarea name="research_method_bn" rows={4} defaultValue={String(editing.research_method_bn || "")} /></label>
              </div>
            </fieldset>
            <fieldset>
              <legend>Status and classification</legend>
              <div className="fieldGrid">
                <label>Research status<input name="research_status" defaultValue={String(editing.research_status || "")} /></label>
                <label>Prototype status<input name="prototype_status" defaultValue={String(editing.prototype_status || "")} /></label>
                <label>Field-test status<input name="field_test_status" defaultValue={String(editing.field_test_status || "")} /></label>
                <label>Research area<input name="research_area" defaultValue={String(editing.research_area || "")} /></label>
                <label>Machine type<input name="machine_type" defaultValue={String(editing.machine_type || "")} /></label>
              </div>
            </fieldset>
            <fieldset>
              <legend>Engineering lists</legend>
              <div className="fieldGrid">
                <label>Key innovations<textarea name="key_innovations" rows={5} defaultValue={lineList(editing.key_innovations)} /><small>One verified item per line.</small></label>
                <label>Engineering features<textarea name="engineering_features" rows={5} defaultValue={lineList(editing.engineering_features)} /></label>
                <label>Benefits<textarea name="benefits" rows={5} defaultValue={lineList(editing.benefits)} /></label>
                <label>Application areas<textarea name="applications" rows={5} defaultValue={lineList(editing.applications)} /></label>
              </div>
            </fieldset>
            <OrderedJsonEditor label="Technical specifications" value={collections.technical_specs} onChange={(items) => setCollection("technical_specs", items)} />
            <fieldset>
              <legend>Project gallery uploads</legend>
              <label className="documentUploadButton">
                <FileUp size={18} />{uploadingGallery ? "Uploading…" : "Upload multiple images"}
                <input className="srOnly" type="file" multiple accept="image/jpeg,image/png,image/webp" disabled={uploadingGallery} onChange={(event) => void uploadGallery(event.target.files)} />
              </label>
              <small>JPEG, PNG or WebP, maximum 5 MB each. Uploaded visuals default to “Illustrative image” until accurately classified.</small>
            </fieldset>
            <OrderedJsonEditor label="Project gallery" value={collections.project_gallery} onChange={(items) => setCollection("project_gallery", items)} deleteStoredItem={deleteMedia} />
            <OrderedJsonEditor label="Videos" value={collections.videos} onChange={(items) => setCollection("videos", items)} />
            <fieldset>
              <legend>Project documents</legend>
              <label className="documentUploadButton">
                <FileUp size={18} />{uploading ? "Uploading…" : "Upload PDF, DOCX or PPTX"}
                <input className="srOnly" type="file" accept=".pdf,.docx,.pptx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation" disabled={uploading} onChange={(event) => void uploadDocument(event.target.files?.[0])} />
              </label>
            </fieldset>
            <OrderedJsonEditor label="Documents" value={collections.documents} onChange={(items) => setCollection("documents", items)} deleteStoredItem={deleteProjectDocument} />
            <OrderedJsonEditor label="Additional downloads" value={collections.downloads} onChange={(items) => setCollection("downloads", items)} />
            <OrderedJsonEditor label="Development timeline" value={collections.development_timeline} onChange={(items) => setCollection("development_timeline", items)} />
            <fieldset>
              <legend>Related projects and SEO</legend>
              <label>Related project slugs<textarea name="related_projects" rows={3} defaultValue={lineList(editing.related_projects)} /></label>
              <label>Keywords<textarea name="keywords" rows={3} defaultValue={lineList(editing.keywords)} /></label>
              <label>SEO title<input name="seo_title" maxLength={200} defaultValue={String(editing.seo_title || "")} /></label>
              <label>SEO description<textarea name="seo_description" maxLength={500} rows={3} defaultValue={String(editing.seo_description || "")} /></label>
            </fieldset>
            <div className="formActions">
              <button type="button" onClick={() => setEditing(null)}>Cancel</button>
              <button className="adminPrimary" disabled={saving}>{saving ? <><LoaderCircle className="spin" size={16} />Saving…</> : "Save portfolio"}</button>
            </div>
          </form>
        ) : null}
      </AdminModal>
      {toast ? <AdminToast message={toast.message} type={toast.type} onClose={() => setToast(null)} /> : null}
    </section>
  );
}
