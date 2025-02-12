import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

import PageTransition from "@/components/PageTransition";
import TanstackProvider from "@/providers/TanstackProvider";

// import StairTransition from "@/components/StairAnimation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Hire Sphere App",
  description: "A job posting website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      ></meta>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TanstackProvider>
          {/* <StairTransition /> */}
          <PageTransition>{children}</PageTransition>
        </TanstackProvider>
      </body>
    </html>
  );
}
