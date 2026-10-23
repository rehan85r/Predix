"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./ui-icon";

const links = [["/markets", "Markets"], ["/prediction-lab", "Predict"], ["/memory", "Memory"], ["/history", "History"]] as const;

export default function SiteHeader() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="topbar">
      <div className="shell topbar-inner">
        <Link href="/" className="identity" aria-label="Predix home" onClick={() => setOpen(false)}>
          <span className="mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M6 18V6h6a4 4 0 0 1 0 8H6m8 4 4-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
          <span className="brand">predix<span>.</span></span>
        </Link>
        <nav className="nav desktop-nav" aria-label="Main navigation">
          {links.map(([href, label]) => <Link key={href} href={href} className={path === href ? "active" : ""} aria-current={path === href ? "page" : undefined}>{label}</Link>)}
        </nav>
        <Link className="header-cta" href={path === "/prediction-lab" ? "/history" : "/prediction-lab"}>
          {path === "/prediction-lab" ? "Your history" : "Make prediction"}<Icon name="arrow-up-right" size={16} />
        </Link>
        <button ref={menuButton} className="menu-toggle" type="button" aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(value => !value)}>
          <Icon name={open ? "close" : "menu"} size={21} />
        </button>
      </div>
      <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" hidden={!open}>
        <div className="shell mobile-nav-inner">
          {links.map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)} className={path === href ? "active" : ""} aria-current={path === href ? "page" : undefined}>{label}<Icon name="arrow-right" size={16} /></Link>)}
        </div>
      </nav>
    </header>
  );
}
