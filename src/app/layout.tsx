import { LanguageProvider } from "@/context/languageContext";
import clsx from "clsx";
import "../styles/style.scss";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    description: "Portafolio personal Andrés Torres Sánchez",
};

export default function RootLayout({children, params,}: { children: React.ReactNode; params: { locale: string }; }) {
    const locale = params.locale || "es";

    return (
        <html lang={locale}>
        <body className={clsx("flex min-h-[100vh] flex-col bg-slate-100")}>
        <LanguageProvider>{children}</LanguageProvider>
        </body>
        </html>
    );
}