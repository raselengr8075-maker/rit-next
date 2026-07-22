export default function BilingualText({ en, bn }: { en: string; bn: string }) { return <><span className="lang-en">{en}</span><span className="lang-bn" lang="bn">{bn}</span></>; }
