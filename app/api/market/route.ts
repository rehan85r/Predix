import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
type Quote = {usd:number;usd_24h_change:number;last_updated_at:number};
export async function GET(){
 try{
  const response=await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true&include_last_updated_at=true",{next:{revalidate:60},headers:{"accept":"application/json"}});
  if(!response.ok)throw new Error("Price provider unavailable");
  const data:unknown=await response.json();
  if(!data||typeof data!=="object")throw new Error("Invalid data");
  const values=data as Record<string,Quote>;
  const result:Record<string,{usd:number;change24h:number;updatedAt:string}>={};
  for(const [symbol,id] of [["BTC","bitcoin"],["ETH","ethereum"]] as const){
   const q=values[id];
   if(!q||!Number.isFinite(q.usd)||q.usd<=0||!Number.isFinite(q.usd_24h_change)||!Number.isFinite(q.last_updated_at))throw new Error("Incomplete quote");
   if(Date.now()-q.last_updated_at*1000>15*60*1000)throw new Error("Stale quote");
   result[symbol]={usd:q.usd,change24h:q.usd_24h_change,updatedAt:new Date(q.last_updated_at*1000).toISOString()};
  }
  return NextResponse.json({prices:result,source:"CoinGecko",disclaimer:"Market quotes are informational; not forecasts."});
 }catch{
  return NextResponse.json({error:"Live market quotes temporarily unavailable"},{status:503,headers:{"Cache-Control":"no-store"}});
 }
}
