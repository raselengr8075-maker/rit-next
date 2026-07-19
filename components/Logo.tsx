export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`logo ${compact ? "compact" : ""}`} aria-label="RIT logo">
      <svg viewBox="0 0 220 220" role="img" aria-labelledby="rit-logo-title">
        <title id="rit-logo-title">Rasel Innovation & Technology logo</title>
        <defs>
          <linearGradient id="ritBlue" x1="0" x2="1">
            <stop offset="0" stopColor="#063b82" />
            <stop offset="1" stopColor="#176dcc" />
          </linearGradient>
          <linearGradient id="ritGreen" x1="0" x2="1">
            <stop offset="0" stopColor="#126f27" />
            <stop offset="1" stopColor="#39a844" />
          </linearGradient>
        </defs>
        <circle cx="110" cy="110" r="92" fill="none" stroke="url(#ritBlue)" strokeWidth="12" strokeDasharray="430 150" transform="rotate(-35 110 110)" />
        <path d="M70 124h34c19 0 30-9 30-25 0-17-11-26-30-26H63v73h18v-23h18l18 23h23l-21-27c19-5 31-18 31-38 0-31-21-46-55-46H51" fill="none" stroke="url(#ritBlue)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M111 65v84" stroke="url(#ritGreen)" strokeWidth="12" strokeLinecap="round"/>
        <path d="M143 72h35M160 72v78" stroke="url(#ritBlue)" strokeWidth="12" strokeLinecap="round"/>
        <path d="M109 54c-1-20 11-33 23-41 2 20-6 34-23 41Zm-10 3C81 54 69 43 64 28c19-1 31 8 35 29Z" fill="url(#ritGreen)"/>
        <path d="M62 168h96" stroke="#0b4ca1" strokeWidth="7" strokeLinecap="round"/>
        <path d="M82 168v17m20-17v17m20-17v17m20-17v17" stroke="#0b4ca1" strokeWidth="5" strokeLinecap="round"/>
      </svg>
      {!compact && (
        <div>
          <strong>RIT</strong>
          <span>Rasel Innovation & Technology</span>
        </div>
      )}
    </div>
  );
}
