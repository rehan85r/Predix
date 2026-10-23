import "./globals.css";
import type {ReactNode} from "react";
import SiteHeader from "./components/site-header";
export const metadata={title:"Predix | AI Prediction Intelligence",description:"Predict. Verify. Remember. Improve. Explore crypto markets, record forecasts, and learn from outcomes."};
export default function RootLayout({children}:{children:ReactNode}){return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader/>{children}</body></html>}
