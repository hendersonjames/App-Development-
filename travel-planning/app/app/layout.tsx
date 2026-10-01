import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Travel Planning", description: "AI-assisted trip planning" };

export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}