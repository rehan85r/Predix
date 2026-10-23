import { NextRequest, NextResponse } from "next/server";
import { getSupabaseConfig, supabaseRequest, validatePrediction } from "../../../lib/predictions";
import { fetchMarketQuotes } from "../../../lib/market";
export const runtime="nodejs";
export const dynamic="force-dynamic";
function authorized(request:NextRequest){const token=process.env.PREDIX_WRITE_TOKEN;return !!token&&request.headers.get("authorization")==="Bearer "+token}
export async function GET(request:NextRequest){
 if(!getSupabaseConfig())return NextResponse.json({error:"Database not configured"},{status:503});
 if(!authorized(request))return NextResponse.json({error:"Unauthorized"},{status:401});
 try{return NextResponse.json({predictions:await supabaseRequest("predictions?select=id,asset,direction,probability,reasoning,source,status,created_at,target_at,reference_price_usd,outcome_price_usd,outcome_correct,brier_score,walrus_blob_id&order=created_at.desc&limit=100")})}
 catch{return NextResponse.json({error:"Database unavailable"},{status:502})}
}
export async function POST(request:NextRequest){
 if(!getSupabaseConfig())return NextResponse.json({error:"Database not configured"},{status:503});
 if(!authorized(request))return NextResponse.json({error:"Unauthorized"},{status:401});
 let body:unknown;
 try{body=await request.json()}catch{return NextResponse.json({error:"Invalid JSON"},{status:400})}
 const prediction=validatePrediction(body);
 if(!prediction)return NextResponse.json({error:"Invalid prediction"},{status:400});
 try{
  const quote=(await fetchMarketQuotes())[prediction.asset];
  const targetAt=new Date(new Date(quote.updatedAt).getTime()+24*60*60*1000).toISOString();
  const rows=await supabaseRequest("predictions",{method:"POST",headers:{"Prefer":"return=representation"},body:JSON.stringify({asset:prediction.asset,direction:prediction.direction,probability:prediction.probability/100,reasoning:prediction.reasoning,source:"manual",horizon_hours:24,reference_price_usd:quote.usd,target_at:targetAt})});
  return NextResponse.json({prediction:rows[0]},{status:201});
 }catch{return NextResponse.json({error:"Unable to save prediction with a fresh reference price"},{status:503})}
}
