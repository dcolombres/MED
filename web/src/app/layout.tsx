import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MED Express | MVP Demo",
  description: "Telemedicina rápida y segura",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased scroll-smooth">
      <body className="min-h-screen bg-white selection:bg-blue-100 text-slate-900 font-sans">
        {children}
      </body>
    </html>
  );
}
