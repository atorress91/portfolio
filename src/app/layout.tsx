import { LanguageProvider } from "@/context/languageContext";
import clsx from "clsx";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/style.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My portfolio",
  description: "Personal portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body
        className={clsx(
          "flex min-h-[100vh] flex-col bg-slate-100",
          geistSans.variable,
          geistMono.variable
        )}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
