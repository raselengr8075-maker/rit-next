export interface BaseContent { id:string; slug:string; titleEn:string; titleBn:string; summaryEn:string; summaryBn:string; contentEn:string; contentBn:string; status:string; published:boolean; createdAt:string; updatedAt:string; imageUrl?:string; gallery?:string[]; category?:string; year?:number; technologies?:string[]; featured?:boolean; sortOrder?:number; seoTitle?:string; seoDescription?:string }
export interface Project extends BaseContent { objectivesEn?:string; objectivesBn?:string; resultsEn?:string; resultsBn?:string }
export interface AppProduct extends BaseContent { platform?:string; playStoreUrl?:string; websiteUrl?:string; version?:string; features?:string[] }
export interface GalleryItem extends BaseContent { altEn:string; altBn:string; captionEn?:string; captionBn?:string; width?:number; height?:number }
export interface NewsArticle extends BaseContent { author?:string; publishedAt?:string }
export interface FounderProfile extends BaseContent { name:string; roleEn:string; roleBn:string; expertise?:string[]; philosophyEn?:string; philosophyBn?:string }
export interface Achievement extends BaseContent { year?:number; icon?:string }
export interface TimelineEvent extends BaseContent { date?:string }
export interface Partner extends BaseContent { name:string; logoUrl?:string; websiteUrl?:string; partnerType?:string }
export interface Resource extends BaseContent { fileUrl?:string; externalUrl?:string; thumbnailUrl?:string }
export interface ContactMessage { id?:string; name:string; email:string; phone?:string; subject:string; message:string; status?:string; createdAt?:string }
export interface AssistantMessage { role:"user"|"assistant"; content:string; relatedUrl?:string; suggestions?:string[] }
