import { NextRequest,NextResponse } from "next/server";
import { fetchMarketQuotes } from "../../../lib/market";
import { getSupabaseConfig,supabaseRequest } from "../../../lib/predictions";
export const runtime="nodejs";
export const dynamic="force-dynamic";
type Pending={id:string;asset:"BTC"|"ETH";direction:"UP"|"DOWN";probability:number;reference_price_usd:number;target_at:string};
const WINDOW_MS=65*60*1000;
export async function GET(request:NextRequest){
 const token=process.env.CRON_SECRET;
 if(!token||request.headers.get("authorization")!=="Bearer "+token)return NextResponse.json({error:"Unauthorized"},{status:401});
 if(!getSupabaseConfig())return NextResponse.json({error:"Database not configured"},{status:503});
 try{
  const now=new Date();
  const rows:Pending[]=await supabaseRequest("predictions?select=id,asset,direction,probability,reference_price_usd,target_at&status=eq.pending&target_at=lte."+encodeURIComponent(now.toISOString())+"&order=target_at.asc&limit=100");
  if(rows.length===0)return NextResponse.json({checked:0,verified:0,expired:0});
  const quotes=await fetchMarketQuotes();
  let verified=0,expired=0,skipped=0;
  for(const p of rows){
   const target=Date.parse(p.target_at);
   const q=quotes[p.asset];
   const quoteTime=Date.parse(q.updatedAt);
   if(!Number.isFinite(target)||!Number.isFinite(quoteTime)){skipped++;continue}
   // Never grade using a price from before the target or too far after it.
   if(quoteTime<target){skipped++;continue}
   if(quoteTime-target>WINDOW_MS){
    await supabaseRequest("predictions?id=eq."+encodeURIComponent(p.id)+"&status=eq.pending",{method:"PATCH",headers:{"Prefer":"return=minimal"},body:JSON.stringify({status:"invalid"})});
    expired++;continue;
   }
   const ref=Number(p.reference_price_usd);
   const probability=Number(p.probability);
   if(!Number.isFinite(ref)||ref<=0||!Number.isFinite(probability)||probability<=0||probability>=1){skipped++;continue}
   // Equal price is a tie: neither UP nor DOWN wins.
   const correct=p.direction==="UP"?q.usd>ref:q.usd<ref;
   const event=q.usd>ref?1:0;
   const upProbability=p.direction==="UP"?probability:1-probability;
   const brier=(upProbability-event)**2;
   await supabaseRequest("predictions?id=eq."+encodeURIComponent(p.id)+"&status=eq.pending",{method:"PATCH",headers:{"Prefer":"return=minimal"},body:JSON.stringify({status:"verified",outcome_price_usd:q.usd,outcome_correct:correct,verified_at:q.updatedAt,brier_score:brier})});
   verified++;
  }
  return NextResponse.json({checked:rows.length,verified,expired,skipped,source:"CoinGecko",note:"Hourly invocation required; only quotes 0–65 minutes after target are eligible."});
 }catch{return NextResponse.json({error:"Verification unavailable; retry later"},{status:503})}
}
