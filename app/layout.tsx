import "./globals.css";
import type { ReactNode } from "react";
export const metadata = { title: "Predix | Predict. Remember. Improve.", description: "Prediction intelligence with persistent memory" };
export default function RootLayout({ children }: { children: ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
