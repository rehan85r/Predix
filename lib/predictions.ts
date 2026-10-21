export type PredictionInput = {asset:"BTC"|"ETH";direction:"UP"|"DOWN";probability:number;reasoning:string};
export function validatePrediction(value:unknown):PredictionInput|null{
 if(!value||typeof value!=="object")return null;
 const x=value as Record<string,unknown>;
 if(x.asset!=="BTC"&&x.asset!=="ETH")return null;
 if(x.direction!=="UP"&&x.direction!=="DOWN")return null;
 if(typeof x.probability!=="number"||!Number.isFinite(x.probability)||x.probability<1||x.probability>99)return null;
 if(typeof x.reasoning!=="string"||x.reasoning.length>1000)return null;
 return {asset:x.asset,direction:x.direction,probability:x.probability,reasoning:x.reasoning.trim()};
}
export function getSupabaseConfig(){
 const url=process.env.SUPABASE_URL;
 const key=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!key)return null;
 const parsed=new URL(url);
 if(parsed.protocol!=="https:"||!parsed.hostname.endsWith(".supabase.co"))throw new Error("Invalid Supabase URL");
 return {url:parsed.origin,key};
}
export async function supabaseRequest(path:string,options:RequestInit={}){
 const config=getSupabaseConfig();
 if(!config)throw new Error("Supabase backend is not configured");
 const response=await fetch(config.url+"/rest/v1/"+path,{...options,headers:{"apikey":config.key,"Authorization":"Bearer "+config.key,"Content-Type":"application/json",...options.headers},cache:"no-store"});
 if(!response.ok)throw new Error("Supabase request failed: "+response.status);
 return response.json();
}
