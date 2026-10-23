"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
const links=[["/markets","Markets"],["/prediction-lab","Prediction Lab"],["/memory","Memory"],["/history","History"]] as const;
export default function SiteHeader(){const path=usePathname();return <header className="topbar"><div className="shell topbar-inner"><Link href="/markets" className="identity"><span className="mark">P</span><span className="brand">predix<span>.</span></span></Link><nav className="nav" aria-label="Main navigation">{links.map(([href,label])=><Link key={href} href={href} className={path===href?"active":""} aria-current={path===href?"page":undefined}>{label}</Link>)}</nav><span className="top-label">PREDICTION INTELLIGENCE</span></div></header>}
