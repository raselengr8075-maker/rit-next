import{createClient}from"@supabase/supabase-js";
const url=process.env.NEXT_PUBLIC_SUPABASE_URL?.trim(),key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
if(!url||!key){console.log("Supabase connection test skipped: Project URL or anon key is missing. No credentials were printed.");process.exit(0)}
try{new URL(url)}catch{console.error("Supabase connection failed: NEXT_PUBLIC_SUPABASE_URL is not a valid URL.");process.exit(1)}
try{const db=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});const{error}=await db.from("projects").select("id").eq("published",true).limit(1);if(error)throw error;console.log("Supabase connection succeeded and the public published-project query was accepted.")}catch(error){const message=error instanceof Error?error.message:"Unknown connection error";console.error(`Supabase connection failed: ${message}`);console.error("Credential values were not printed.");process.exitCode=1}
