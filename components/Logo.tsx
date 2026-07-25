import Image from "next/image";

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`logo ${compact ? "compact" : ""}`} aria-label="RIT logo">
      <Image
        className="rit-logo-image"
        src="/rit-logo.png"
        alt="Rasel Innovation & Technology logo"
        width={220}
        height={220}
        sizes={compact ? "152px" : "56px"}
      />
      {!compact && (
        <div>
          <strong>RIT</strong>
          <span>Rasel Innovation & Technology</span>
        </div>
      )}
    </div>
  );
}
