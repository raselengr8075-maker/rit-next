export default function ContentStatusBadge({ status }: { status?: string }) {
  const label = status?.trim() || "Published";
  return <span className={`content-status-badge status-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>{label}</span>;
}
