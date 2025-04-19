import { LanguageProvider } from "@/context/languageContext";
import clsx from "clsx";
import "../styles/style.scss";
import React from "react";
import {Metadata} from "next";

export const metadata: Metadata = {
    description: "Portafolio personal Andrés Torres Sánchez",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={clsx("flex min-h-[100vh] flex-col bg-slate-100")}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
