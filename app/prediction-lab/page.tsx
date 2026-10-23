"use client";

import {Suspense,useEffect,useState,type CSSProperties,type FormEvent} from "react";
import Link from "next/link";
import {useSearchParams} from "next/navigation";
import {Icon} from "../components/ui-icon";
import {loadPredictions,STORAGE_KEY,type Prediction} from "../components/prediction-store";

function Lab(){
  const params=useSearchParams();
  const [asset,setAsset]=useState<"BTC"|"ETH">("BTC");
  const [direction,setDirection]=useState<"UP"|"DOWN">("UP");
  const [probability,setProbability]=useState("60");
  const [reasoning,setReasoning]=useState("");
  const [saved,setSaved]=useState(false);
  const [error,setError]=useState("");

  useEffect(()=>{setAsset(params.get("asset")==="ETH"?"ETH":"BTC")},[params]);

  function updateConfidence(value:string){setProbability(value);setSaved(false)}

  function submit(event:FormEvent){
    event.preventDefault();
    const confidence=Number(probability);
    if(!Number.isFinite(confidence)||confidence<1||confidence>99)return;
    const record:Prediction={id:crypto.randomUUID(),asset,direction,probability:confidence,reasoning:reasoning.trim(),createdAt:new Date().toISOString(),status:"Unresolved"};
    try{
      localStorage.setItem(STORAGE_KEY,JSON.stringify([record,...loadPredictions()]));
      setReasoning("");
      setSaved(true);
      setError("");
    }catch{
      setSaved(false);
      setError("Your browser couldn’t save this forecast. Check that local storage is available, then try again.");
    }
  }

  const confidence=Math.min(99,Math.max(1,Number(probability)||1));
  const assetName=asset==="BTC"?"Bitcoin":"Ethereum";

  return <main className="workspace-page shell" id="main-content">
    <div className="intro">
      <div>
        <div className="eyebrow">Your research workspace</div>
        <h1>Prediction Lab<span className="heading-dot" aria-hidden="true">.</span></h1>
        <p>Turn a market view into a forecast you can come back to.</p>
      </div>
      <span className="status"><span className="status-dot"/>Manual forecasts</span>
    </div>

    <div className="grid-layout lab-layout">
      <section className="panel forecast-form-panel" aria-labelledby="forecast-form-heading">
        <div className="panel-head form-heading">
          <div><div className="eyebrow">01 / Capture your conviction</div><h2 id="forecast-form-heading">Build your forecast</h2></div>
          <span className="panel-icon"><Icon name="target" size={21}/></span>
        </div>

        <form onSubmit={submit}>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="asset">Choose an asset</label>
              <select id="asset" value={asset} onChange={event=>{setAsset(event.target.value as "BTC"|"ETH");setSaved(false)}}>
                <option value="BTC">Bitcoin (BTC)</option>
                <option value="ETH">Ethereum (ETH)</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="direction">Your direction</label>
              <select id="direction" value={direction} onChange={event=>{setDirection(event.target.value as "UP"|"DOWN");setSaved(false)}}>
                <option value="UP">UP / Bullish</option>
                <option value="DOWN">DOWN / Bearish</option>
              </select>
            </div>
          </div>

          <div className="field confidence-field">
            <div className="confidence-control">
              <div><label htmlFor="probability">How confident are you?</label><p className="field-help" id="confidence-help">Your confidence in the direction you selected.</p></div>
              <div className="confidence-input"><input id="probability" type="number" min="1" max="99" step="1" required value={probability} aria-describedby="confidence-help" onChange={event=>updateConfidence(event.target.value)}/><span aria-hidden="true">%</span></div>
            </div>
            <input className="confidence-range" type="range" min="1" max="99" step="1" value={confidence} aria-label="Adjust confidence" onChange={event=>updateConfidence(event.target.value)} style={{"--confidence":`${confidence}%`} as CSSProperties}/>
            <div className="field-caption"><span>Less certain</span><span>More certain</span></div>
          </div>

          <div className="field reasoning-field">
            <label htmlFor="reasoning">Evidence and reasoning <span className="optional-label">Optional</span></label>
            <textarea id="reasoning" maxLength={1000} value={reasoning} aria-describedby="reasoning-help" onChange={event=>{setReasoning(event.target.value);setSaved(false)}} placeholder="What supports your view? Note the signals, assumptions, and what could change your mind."/>
            <div className="field-caption"><span id="reasoning-help">Give your future self something to learn from.</span><span>{reasoning.length.toLocaleString()} / 1,000</span></div>
          </div>

          <div className="form-footer">
            <span className="muted"><Icon name="clock" size={15}/>24-hour outlook</span>
            <button className="primary" type="submit">Record prediction <Icon name="arrow-right" size={17}/></button>
          </div>
          {saved&&<div role="status" className="success-message"><Icon name="check" size={18}/><div>Saved in this browser. <Link href="/history" className="text-link">View it on the History page <Icon name="arrow-right" size={14}/></Link></div></div>}
          {error&&<p role="alert" className="error-message">{error}</p>}
        </form>
      </section>

      <aside className="lab-sidebar">
        <section className="forecast" aria-labelledby="forecast-preview-heading">
          <div className="row"><div className="eyebrow">Your forecast preview</div><Icon name="activity" size={19}/></div>
          <div className="forecast-asset"><span className={`asset-badge ${asset.toLowerCase()}`}>{asset==="BTC"?"₿":"Ξ"}</span><div><strong>{assetName}</strong><span>{asset} · Next 24 hours</span></div></div>
          <h2 className="question" id="forecast-preview-heading">Will {assetName} move {direction==="UP"?"higher":"lower"}?</h2>
          <div className="row"><div><span className="muted">Your confidence</span><div className="forecast-value">{probability||"—"}<span>%</span></div></div><span className={`forecast-direction ${direction==="UP"?"up":"down"}`}><Icon name={direction==="UP"?"arrow-up":"arrow-down"} size={16}/>{direction==="UP"?"Bullish":"Bearish"}</span></div>
          <div className="probbar" aria-hidden="true"><div className="bull" style={{width:(direction==="UP"?confidence:100-confidence)+"%"}}/><div className="bear"/></div>
          <div className="legend"><span className="up">UP</span><span className="down">DOWN</span></div>
          <p className="section-note">This reflects your view. It isn’t an AI forecast or a verified market probability.</p>
        </section>

        <section className="panel methodology" aria-labelledby="methodology-heading">
          <h2 id="methodology-heading">A little structure. Better thinking.</h2>
          {[
            ["01","Start with evidence","Name the signals behind your view, not just the direction."],
            ["02","Make room for uncertainty","Confidence is a judgement, never a guarantee."],
            ["03","Return and reflect","Revisit your reasoning as the market changes."]
          ].map(([number,title,description])=><div className="methodology-step" key={number}><span className="step-number">{number}</span><div><h3>{title}</h3><p>{description}</p></div></div>)}
        </section>
      </aside>
    </div>
    <p className="workspace-note"><Icon name="shield" size={15}/>Forecasts are stored only in this browser and aren’t automatically verified. Clearing browser data removes them.</p>
  </main>
}

export default function PredictionLab(){
  return <Suspense fallback={<main className="workspace-page shell" id="main-content"><div className="intro"><div><div className="eyebrow">Your research workspace</div><h1>Prediction Lab</h1><p role="status">Loading Prediction Lab…</p></div></div></main>}><Lab/></Suspense>
}
