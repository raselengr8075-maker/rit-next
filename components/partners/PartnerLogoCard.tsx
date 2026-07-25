"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { useState } from "react";
import type { Partner } from "@/types/content";

function safeWebsite(value?: string) {
  try {
    const url = new URL(value || "");
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : "";
  } catch {
    return "";
  }
}

export default function PartnerLogoCard({ partner }: { partner: Partner }) {
  const [failed, setFailed] = useState(false);
  const website = safeWebsite(partner.websiteUrl);
  const content = (
    <>
      <span className="partner-logo-visual">
        {partner.logoUrl && !failed ? <Image unoptimized src={partner.logoUrl} alt={`${partner.name} logo`} fill sizes="220px" onError={() => setFailed(true)} /> : <b>{partner.name.slice(0, 2).toUpperCase()}</b>}
      </span>
      <span><b>{partner.name}</b><small>{partner.relationshipType || partner.partnerType || "Collaborator"}</small></span>
      {website ? <ExternalLink size={15} aria-hidden="true" /> : null}
    </>
  );
  return website ? <a className="partner-logo-card" href={website} target="_blank" rel="noopener noreferrer">{content}</a> : <article className="partner-logo-card">{content}</article>;
}
