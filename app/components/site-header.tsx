"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useEffect,useState} from "react";
const links=[["/markets","Markets"],["/prediction-lab","Predict"],["/memory","Memory"],["/history","History"]] as const;
export default function SiteHeader(){
 const path=usePathname();
 const [open,setOpen]=useState(false);
 useEffect(()=>setOpen(false),[path]);
 useEffect(()=>{if(!open)return;function onKey(event:KeyboardEvent){if(event.key==="Escape")setOpen(false)}window.addEventListener("keydown",onKey);return()=>window.removeEventListener("keydown",onKey)},[open]);
 return <header className="topbar"><div className="shell topbar-inner">
 <Link href="/" className="identity" onClick={()=>setOpen(false)}><span className="mark">P</span><span className="brand">predix<span>.</span></span></Link>
 <nav className="nav desktop-nav" aria-label="Main navigation">{links.map(([href,label])=><Link key={href} href={href} className={path===href?"active":""} aria-current={path===href?"page":undefined}>{label}</Link>)}</nav>
 <span className="top-label">AI PREDICTION INTELLIGENCE</span>
 <button className="menu-toggle" type="button" aria-label={open?"Close navigation menu":"Open navigation menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={()=>setOpen(v=>!v)}><span aria-hidden="true">{open?"✕":"☰"}</span></button>
 </div><nav id="mobile-navigation" className={"mobile-nav"+(open?" is-open":"")} aria-label="Mobile navigation" hidden={!open}><div className="shell mobile-nav-inner">{links.map(([href,label])=><Link key={href} href={href} onClick={()=>setOpen(false)} className={path===href?"active":""} aria-current={path===href?"page":undefined}>{label}</Link>)}</div></nav></header>
}
