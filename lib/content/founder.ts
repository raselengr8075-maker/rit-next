import{fallbackFounder}from"@/data/fallback-content";import{published}from"./repository";export async function getFounder(){return(await published("founder_profiles",[fallbackFounder]))[0]}
