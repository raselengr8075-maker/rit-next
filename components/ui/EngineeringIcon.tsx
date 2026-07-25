type IconName="agriculture"|"software"|"research"|"prototype"|"machinery"|"product"|"mobile"|"document"|"consultation";
const paths:Record<IconName,React.ReactNode>={
 agriculture:<><path d="M5 19c8 0 13-5 14-14C10 6 5 11 5 19Z"/><path d="M5 19c4-5 7-8 12-11M9 15c-2-2-4-3-6-3"/></>,
 machinery:<><circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M4.9 4.9 7 7m10 10 2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"/></>,
 software:<><rect x="3" y="4" width="18" height="16" rx="2"/><path d="m8 10-2 2 2 2m8-4 2 2-2 2m-5 3 2-10"/></>,
 mobile:<><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M10 5h4m-3 14h2"/></>,
 research:<><path d="M9 3h6m-5 0v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/><path d="M7 16h10m-7-4h4"/></>,
 prototype:<><path d="m12 2 8 4.5v9L12 22l-8-6.5v-9L12 2Z"/><path d="m4 6.5 8 5 8-5M12 22V11.5"/></>,
 product:<><path d="M4 7h16v13H4zM8 7V4h8v3"/><path d="M8 12h8m-8 4h5"/></>,
 document:<><path d="M6 2h8l4 4v16H6z"/><path d="M14 2v5h5M9 12h6m-6 4h6"/></>,
 consultation:<><path d="M21 12a8 8 0 0 1-9 8l-5 2 1-4a8 8 0 1 1 13-6Z"/><path d="M8 11h8m-8 4h5"/></>,
};
export default function EngineeringIcon({name,size=24}:{name:IconName;size?:number}){return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>}
