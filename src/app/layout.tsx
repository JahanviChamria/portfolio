import type { Metadata } from "next";
import { Fraunces, Spline_Sans_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
});

const splineMono = Spline_Sans_Mono({
  variable: "--font-spline-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Jahanvi Chamria — I build.",
  description:
    "Physics & computer science, in superposition: electronics, machine learning, and experimental research. Choose your measurement basis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-lens="all"
      className={`${fraunces.variable} ${splineMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
