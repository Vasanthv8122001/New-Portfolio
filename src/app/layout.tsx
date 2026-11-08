import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { getSiteUrl } from "@/lib/utils";

const title = "Vasanth V | Software Engineer | Full-Stack Developer";
const description =
  "Portfolio of Vasanth V, a Software Engineer and Full-Stack Developer with 3+ years of experience building web applications with React.js, Next.js, Node.js, Express.js, and MongoDB.";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title,
  description,
  openGraph: { title, description, type: "website", siteName: "Vasanth V" },
  twitter: { card: "summary", title, description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5fbfa" },
    { media: "(prefers-color-scheme: dark)", color: "#071018" },
  ],
};

// Runs before first paint so the saved theme is applied without a flash. Dark is the default.
const themeScript = `try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark')t='dark';document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
