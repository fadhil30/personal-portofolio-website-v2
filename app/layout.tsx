import type { Metadata } from "next";
import { Inter, Archivo_Black, Press_Start_2P } from "next/font/google";
import { config } from "@/app/data/config";
import "./globals.css";

const inter = Inter({
 variable: "--font-inter",
 subsets: ["latin"],
});

const archivoBlack = Archivo_Black({
 variable: "--font-archivo-black",
 weight: "400",
 subsets: ["latin"],
});

const pressStart = Press_Start_2P({
 variable: "--font-retro",
 weight: "400",
 subsets: ["latin"],
});

const getMetadataBase = () => {
 if (!config.siteUrl) {
  return undefined;
 }

 try {
  return new URL(config.siteUrl);
 } catch {
  return undefined;
 }
};

const metadataBase = getMetadataBase();

export const metadata: Metadata = {
 title: config.title,
 description: config.description.short,
 metadataBase,
 authors: [{ name: config.author }],
 openGraph: {
  title: config.title,
  description: config.description.long,
 },
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <html lang="en">
   <body
    className={`${inter.variable} ${archivoBlack.variable} ${pressStart.variable} antialiased`}
   >
    {children}
   </body>
  </html>
 );
}
