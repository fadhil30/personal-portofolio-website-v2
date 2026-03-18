import type { Metadata } from "next";
import { Inter, Archivo_Black } from "next/font/google";
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

export const metadata: Metadata = {
 title: "Fadhil - Web Developer",
 description:
  "Personal portfolio of Fadhil, a Results-driven Web Developer specializing in React, Next.js, and Modern Web Tech.",
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <html lang="en">
   <body
    className={`${inter.variable} ${archivoBlack.variable} antialiased`}
   >
    {children}
   </body>
  </html>
 );
}
