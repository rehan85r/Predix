export type MarketQuote={usd:number;change24h:number;updatedAt:string};
export async function fetchMarketQuotes():Promise<Record<"BTC"|"ETH",MarketQuote>>{
 const response=await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true&include_last_updated_at=true",{cache:"no-store",headers:{accept:"application/json"}});
 if(!response.ok)throw new Error("Market provider error");
 const payload:unknown=await response.json();
 if(!payload||typeof payload!=="object")throw new Error("Invalid market response");
 const data=payload as Record<string,Record<string,unknown>>;
 const result={} as Record<"BTC"|"ETH",MarketQuote>;
 for(const [asset,id] of [["BTC","bitcoin"],["ETH","ethereum"]] as const){
  const row=data[id];
  if(!row||typeof row.usd!=="number"||!Number.isFinite(row.usd)||row.usd<=0||typeof row.usd_24h_change!=="number"||!Number.isFinite(row.usd_24h_change)||typeof row.last_updated_at!=="number"||!Number.isFinite(row.last_updated_at))throw new Error("Incomplete quote");
  const timestamp=row.last_updated_at*1000;
  if(Math.abs(Date.now()-timestamp)>15*60*1000)throw new Error("Stale market quote");
  result[asset]={usd:row.usd,change24h:row.usd_24h_change,updatedAt:new Date(timestamp).toISOString()};
 }
 return result;
}
