"use client";

import { FormEvent, useState } from "react";
import { Save } from "lucide-react";
import { savePublicSiteSettings, type PublicSiteSettings } from "@/app/admin/settings/actions";
import AdminToast from "./AdminToast";

export default function SiteSettingsForm({ initial }: { initial: PublicSiteSettings }) {
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const result = await savePublicSiteSettings({
      ...data,
      founderVisible: data.founderVisible === "on",
      partnersVisible: data.partnersVisible === "on",
      newsletterVisible: data.newsletterVisible === "on",
      assistantVisible: data.assistantVisible === "on",
    });
    setSaving(false);
    setToast({ message: result.message, type: result.ok ? "success" : "error" });
  }

  return (
    <>
      <form className="adminForm adminPanel" onSubmit={submit}>
        <fieldset>
          <legend>Public identity</legend>
          <div className="fieldGrid">
            <label>Website name<input name="websiteName" required defaultValue={initial.websiteName} /></label>
            <label>Public URL<input name="publicUrl" type="url" defaultValue={initial.publicUrl} placeholder="https://…" /></label>
          </div>
          <label>Tagline<textarea name="tagline" rows={2} defaultValue={initial.tagline} /></label>
          <label>Default SEO image<input name="defaultSeoImage" type="url" defaultValue={initial.defaultSeoImage} placeholder="https://…" /></label>
        </fieldset>
        <fieldset>
          <legend>Public contact details</legend>
          <div className="fieldGrid">
            <label>Contact email<input name="contactEmail" type="email" defaultValue={initial.contactEmail} /></label>
            <label>Phone<input name="phone" defaultValue={initial.phone} /></label>
            <label>Working hours<input name="workingHours" defaultValue={initial.workingHours} /></label>
            <label>WhatsApp link<input name="whatsApp" type="url" defaultValue={initial.whatsApp} /></label>
          </div>
          <label>Address<textarea name="address" rows={2} defaultValue={initial.address} /></label>
        </fieldset>
        <fieldset>
          <legend>Social links</legend>
          <div className="fieldGrid">
            <label>Facebook<input name="facebook" type="url" defaultValue={initial.facebook} /></label>
            <label>LinkedIn<input name="linkedIn" type="url" defaultValue={initial.linkedIn} /></label>
            <label>YouTube<input name="youTube" type="url" defaultValue={initial.youTube} /></label>
          </div>
        </fieldset>
        <fieldset>
          <legend>Public visibility</legend>
          <div className="fieldGrid">
            <label className="checkField"><input name="founderVisible" type="checkbox" defaultChecked={initial.founderVisible} />Founder section</label>
            <label className="checkField"><input name="partnersVisible" type="checkbox" defaultChecked={initial.partnersVisible} />Partners section</label>
            <label className="checkField"><input name="newsletterVisible" type="checkbox" defaultChecked={initial.newsletterVisible} />Newsletter (only enable with a backend)</label>
            <label className="checkField"><input name="assistantVisible" type="checkbox" defaultChecked={initial.assistantVisible} />RIT Smart Assistant</label>
          </div>
        </fieldset>
        <p className="adminHint">Only public presentation data belongs here. Never store credentials, API keys or private configuration.</p>
        <div className="formActions"><button className="adminPrimary" disabled={saving}><Save size={16} />{saving ? "Saving…" : "Save settings"}</button></div>
      </form>
      {toast ? <AdminToast message={toast.message} type={toast.type} onClose={() => setToast(null)} /> : null}
    </>
  );
}
