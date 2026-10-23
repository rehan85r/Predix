import "./globals.css";
import type {ReactNode} from "react";
import SiteHeader from "./components/site-header";
export const metadata={title:"Predix | Prediction Intelligence",description:"Research crypto predictions, preserve reasoning and measure outcomes"};
export default function RootLayout({children}:{children:ReactNode}){return <html lang="en"><body><SiteHeader/>{children}</body></html>}
