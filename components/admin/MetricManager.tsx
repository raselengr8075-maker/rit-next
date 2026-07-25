"use client";

import { FormEvent, useState } from "react";
import { FilePenLine, Plus, Trash2 } from "lucide-react";
import { deleteMetric, saveMetric } from "@/app/admin/phase2-actions";
import AdminPageHeader from "./AdminPageHeader";
import AdminModal from "./AdminModal";
import AdminConfirmDialog from "./AdminConfirmDialog";
import AdminToast from "./AdminToast";

type MetricRow = { id: string; label_en: string; label_bn?: string; numeric_value: number; suffix?: string; source_note: string; is_verified: boolean; is_visible: boolean; display_order: number; icon_key?: string };

export default function MetricManager({ initialRows }: { initialRows: MetricRow[] }) {
  const [rows, setRows] = useState(initialRows);
  const [editing, setEditing] = useState<MetricRow | null>(null);
  const [deleting, setDeleting] = useState<MetricRow | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    setSaving(true);
    const result = await saveMetric({ ...data, id: editing?.id || undefined, is_verified: data.is_verified === "on", is_visible: data.is_visible === "on" });
    setSaving(false);
    setToast({ message: result.message, type: result.ok ? "success" : "error" });
    if (result.ok) location.reload();
  }

  async function remove() {
    if (!deleting) return;
    setSaving(true);
    const result = await deleteMetric(deleting.id);
    setSaving(false);
    setToast({ message: result.message, type: result.ok ? "success" : "error" });
    if (result.ok) setRows(rows.filter((row) => row.id !== deleting.id));
    setDeleting(null);
  }

  return (
    <>
      <AdminPageHeader title="Verified metrics" description="Manual public numbers appear only when both Verified and Visible are enabled and a source note is provided." action={<button className="adminPrimary" onClick={() => setEditing({ id: "", label_en: "", numeric_value: 0, source_note: "", is_verified: false, is_visible: false, display_order: 0 })}><Plus size={16} />Add metric</button>} />
      <div className="metricAdminGrid">
        {rows.map((row) => <article className="adminPanel" key={row.id}><strong>{new Intl.NumberFormat("en").format(row.numeric_value)}{row.suffix}</strong><h2>{row.label_en}</h2><p>{row.source_note}</p><div className="cardBadges"><span>{row.is_verified ? "Verified" : "Unverified"}</span><span>{row.is_visible ? "Visible" : "Hidden"}</span></div><div className="rowActions"><button onClick={() => setEditing(row)}><FilePenLine size={15} />Edit</button><button className="danger" onClick={() => setDeleting(row)}><Trash2 size={15} />Delete</button></div></article>)}
      </div>
      {!rows.length ? <div className="adminEmpty"><h2>No manual metrics</h2><p>Database-derived published counts can still appear automatically. Add only independently verified manual values.</p></div> : null}
      <AdminModal open={editing !== null} title={editing?.id ? "Edit verified metric" : "Create verified metric"} onClose={() => setEditing(null)}>
        {editing ? <form className="adminForm" onSubmit={submit}><div className="fieldGrid"><label>English label<input name="label_en" required defaultValue={editing.label_en} /></label><label>Bangla label<input name="label_bn" defaultValue={editing.label_bn} /></label><label>Numeric value<input name="numeric_value" type="number" min="0" step="any" required defaultValue={editing.numeric_value} /></label><label>Suffix<input name="suffix" maxLength={20} defaultValue={editing.suffix} placeholder="+ or %" /></label><label>Display order<input name="display_order" type="number" defaultValue={editing.display_order} /></label><label>Icon<select name="icon_key" defaultValue={editing.icon_key || "verified"}><option value="verified">Verified</option><option value="project">Project</option><option value="app">Application</option><option value="publication">Publication</option><option value="milestone">Milestone</option></select></label></div><label>Source note<textarea name="source_note" required rows={3} defaultValue={editing.source_note} /></label><div className="fieldGrid"><label className="checkField"><input name="is_verified" type="checkbox" defaultChecked={editing.is_verified} />Verified</label><label className="checkField"><input name="is_visible" type="checkbox" defaultChecked={editing.is_visible} />Visible publicly</label></div><div className="formActions"><button type="button" onClick={() => setEditing(null)}>Cancel</button><button className="adminPrimary" disabled={saving}>{saving ? "Saving…" : "Save metric"}</button></div></form> : null}
      </AdminModal>
      <AdminConfirmDialog open={Boolean(deleting)} title={`Delete ${deleting?.label_en || "metric"}?`} description="This removes the manual metric from the database. Automatic published-content counts are unaffected." busy={saving} onCancel={() => setDeleting(null)} onConfirm={() => void remove()} />
      {toast ? <AdminToast message={toast.message} type={toast.type} onClose={() => setToast(null)} /> : null}
    </>
  );
}
