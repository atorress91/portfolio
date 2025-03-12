"use client";

import LightEffect from "@/components/LightEffect/LightEffect";
import Navbar from "@/components/Navbar/Navbar";
import { useLanguage } from "@/context/languageContext";
import { NextIntlClientProvider } from "next-intl";
import messagesEs from "../../messages//es.json";
import messagesEn from "../../messages/en.json";
import styles from "./page.module.scss";

function MainContent() {
  // const t = useTranslations("HomePage");

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Navbar />
        <LightEffect />
      </main>
    </div>
  );
}

// Componente principal que envuelve todo con NextIntlClientProvider
export default function Page() {
  const { locale } = useLanguage(); // Obtenemos el idioma desde el contexto
  const messages = locale === "es" ? messagesEs : messagesEn; // Cargamos los mensajes correctos

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <MainContent />
    </NextIntlClientProvider>
  );
}
