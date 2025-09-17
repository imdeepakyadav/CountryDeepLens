import type { Metadata } from "next";
import {
  Playfair_Display,
  Source_Sans_3 as Source_Sans_Pro,
} from "next/font/google";
import type React from "react";
import "./globals.css";

const sourceSansPro = Source_Sans_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-sans",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "CountryDeepLens - Explore Countries",
  description:
    "A comprehensive platform to explore and discover information about countries around the world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${sourceSansPro.variable} ${playfairDisplay.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
