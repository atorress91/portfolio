"use client";

import LightEffect from "@/components/LightEffect/LightEffect";
import Navbar from "@/components/Navbar/Navbar";
import { useLanguage } from "@/context/languageContext";
import { NextIntlClientProvider } from "next-intl";
import Head from "next/head";
import { useEffect } from "react";
import messagesEn from "../../messages/en.json";
import messagesEs from "../../messages/es.json";
import styles from "./page.module.scss";

function MainContent() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Navbar />
        <LightEffect />
      </main>
    </div>
  );
}

/**
 * Main page component that handles internationalization.
 * 
 * This component serves as the root of the application, configuring the
 * internationalization context for all child components.
 * 
 * @remarks
 * The component uses the `useLanguage` hook to determine the current locale
 * and loads the appropriate message bundle for that locale.
 * 
 * @returns A NextIntlClientProvider wrapping the MainContent component,
 * configured with the current locale and corresponding messages.
 * 
 * @example
 * ```tsx
 * // In _app.tsx or similar
 * <Page />
 * ```
 */
export default function Page() {
  const { locale } = useLanguage();
  const messages = locale === "es" ? messagesEs : messagesEn;

  useEffect(() => {
    document.title = messages.Layout.title;
  }, [messages.Layout.title]);

  return (
    <NextIntlClientProvider key={locale} locale={locale} messages={messages}>
      <Head>
        <meta name="description" content={messages.Layout.description} />
      </Head>
      <MainContent />
    </NextIntlClientProvider>
  );
}