"use server";
import { z } from "zod";
import { deleteMedia, uploadMedia } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin/auth";
export async function uploadLibraryMedia(formData: FormData) {
  const altEn=z.string().trim().max(300).parse(formData.get("altEn")||"");
  const captionEn=z.string().trim().max(500).parse(formData.get("captionEn")||"");
  const file=formData.get("file");
  if(!(file instanceof File))return{ok:false,message:"Choose an image."};
  formData.set("folder","gallery");
  const uploaded=await uploadMedia(formData);
  if(!uploaded.ok||!uploaded.url||!uploaded.path)return uploaded;
  const{db,user}=await requireAdmin();
  const{error}=await db.from("media_assets").insert({file_name:file.name.slice(0,240),storage_path:uploaded.path,public_url:uploaded.url,alt_en:altEn,caption_en:captionEn,mime_type:file.type,size_bytes:file.size,created_by:user.id});
  if(error){await deleteMedia(uploaded.path);return{ok:false,message:"Upload was rolled back. Apply the premium content migration first."}}
  return uploaded;
}
export async function deleteLibraryMedia(idInput:string,pathInput:string){
  const id=z.string().uuid().parse(idInput),path=z.string().max(300).parse(pathInput),{db}=await requireAdmin();
  const removed=await deleteMedia(path);if(!removed.ok)return removed;
  const{error}=await db.from("media_assets").delete().eq("id",id);
  return error?{ok:false,message:"Storage file was removed, but its catalog record needs manual cleanup."}:{ok:true,message:"Asset deleted."};
}
