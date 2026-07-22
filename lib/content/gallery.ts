import{fallbackGallery}from"@/data/fallback-content";import{published}from"./repository";export const getGallery=()=>published("gallery_items",fallbackGallery);
