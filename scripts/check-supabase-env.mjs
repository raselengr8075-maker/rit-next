const required=["NEXT_PUBLIC_SUPABASE_URL","NEXT_PUBLIC_SUPABASE_ANON_KEY","SUPABASE_SERVICE_ROLE_KEY"];
const missing=required.filter(name=>!process.env[name]?.trim());
if(missing.length){console.log("Supabase setup is incomplete. Missing variables:");for(const name of missing)console.log(`- ${name}`);console.log("No credential values were printed.");process.exitCode=1}else{console.log("Supabase environment variables are configured. Values were not printed.")}
