"use client";

import {useEffect,useState} from "react";
import Link from "next/link";
import {Icon} from "../components/ui-icon";
import {loadPredictions,type Prediction} from "../components/prediction-store";

export default function History(){
  const [items,setItems]=useState<Prediction[]>([]);
  const [loaded,setLoaded]=useState(false);
  const [filter,setFilter]=useState<"ALL"|"BTC"|"ETH">("ALL");

  useEffect(()=>{
    function refresh(){setItems(loadPredictions());setLoaded(true)}
    refresh();
    window.addEventListener("storage",refresh);
    return ()=>window.removeEventListener("storage",refresh);
  },[]);

  const filtered=items.filter(item=>filter==="ALL"||item.asset===filter);
  const assetCount=new Set(items.map(item=>item.asset)).size;

  return <main className="workspace-page shell" id="main-content">
    <div className="intro">
      <div><div className="eyebrow">Your research workspace</div><h1>Prediction history<span className="heading-dot" aria-hidden="true">.</span></h1><p>A record of what you believed, and the reasoning behind it.</p></div>
      <Link className="primary" href="/prediction-lab"><Icon name="plus" size={17}/>New prediction</Link>
    </div>

    <section className="stats" aria-label="Forecast summary">
      <div className="stat"><div className="row"><span className="muted">Total forecasts</span><span className="stat-icon"><Icon name="layers" size={19}/></span></div><strong>{loaded?items.length:"—"}</strong><span className="stat-caption">Your recorded hypotheses</span></div>
      <div className="stat"><div className="row"><span className="muted">Unresolved</span><span className="stat-icon"><Icon name="clock" size={19}/></span></div><strong>{loaded?items.length:"—"}</strong><span className="stat-caption">Not automatically verified</span></div>
      <div className="stat"><div className="row"><span className="muted">Assets covered</span><span className="stat-icon"><Icon name="chart" size={19}/></span></div><strong>{loaded?assetCount:"—"}</strong><span className="stat-caption">Across Bitcoin and Ethereum</span></div>
    </section>

    <section className="panel history-panel" aria-labelledby="recorded-heading">
      <div className="panel-head"><div><h2 id="recorded-heading">Recorded forecasts</h2><p className="panel-description">Your decisions, with the context that matters.</p></div><span className="pill"><Icon name="shield" size={13}/>Browser-local only</span></div>

      {!loaded?<div className="empty-state"><span className="empty-state-icon"><Icon name="clock" size={28}/></span><p role="status">Loading your forecasts…</p></div>:items.length===0?<div className="empty-state"><span className="empty-state-icon"><Icon name="book" size={29}/></span><span className="eyebrow">Every insight starts somewhere</span><h3>Your first forecast belongs here.</h3><p>Capture a view in the Prediction Lab. Your direction, confidence, and reasoning will be saved here for you to revisit.</p><Link className="primary" href="/prediction-lab">Create your first forecast <Icon name="arrow-right" size={17}/></Link><span className="empty-state-note">A thoughtful record starts with a single prediction.</span></div>:<>
        <div className="history-toolbar">
          <div className="history-filter" role="group" aria-label="Filter forecasts by asset">{(["ALL","BTC","ETH"] as const).map(value=><button key={value} type="button" aria-pressed={filter===value} onClick={()=>setFilter(value)}>{value==="ALL"?"All forecasts":value}<span>{value==="ALL"?items.length:items.filter(item=>item.asset===value).length}</span></button>)}</div>
          <span className="muted">Newest first</span>
        </div>
        <div className="history-list">
          {filtered.length===0?<div className="empty-state compact"><Icon name="search" size={24}/><h3>No {filter} forecasts yet.</h3><p>Try another asset, or record your first {filter} view.</p><Link className="text-link" href={`/prediction-lab?asset=${filter}`}>Create a forecast <Icon name="arrow-right" size={15}/></Link></div>:filtered.map(item=>{
            const date=new Date(item.createdAt);
            const validDate=Number.isFinite(date.getTime());
            return <article className="item history-item" key={item.id}>
              <span className={`asset-badge ${item.asset.toLowerCase()}`}>{item.asset==="BTC"?"₿":"Ξ"}</span>
              <div className="history-item-main"><div className="history-item-title"><h3>{item.asset==="BTC"?"Bitcoin":"Ethereum"}<span>{item.asset}</span></h3><span className={`forecast-direction ${item.direction==="UP"?"up":"down"}`}><Icon name={item.direction==="UP"?"arrow-up":"arrow-down"} size={14}/>{item.direction}</span><span className="history-confidence">{item.probability}% confidence</span></div><p>{typeof item.reasoning==="string"&&item.reasoning.trim()?item.reasoning:"No reasoning recorded for this forecast."}</p><time className="muted" dateTime={validDate?date.toISOString():undefined}>{validDate?date.toLocaleString(undefined,{month:"short",day:"numeric",year:"numeric",hour:"numeric",minute:"2-digit"}):"Date unavailable"}</time></div>
              <span className="pill unresolved-pill"><Icon name="clock" size={13}/>Unresolved</span>
            </article>
          })}
        </div>
      </>}
    </section>
    <p className="workspace-note"><Icon name="shield" size={15}/>These forecasts live in this browser. Outcomes aren’t independently verified, so accuracy and performance metrics aren’t available.</p>
  </main>
}
