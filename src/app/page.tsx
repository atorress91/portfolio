"use client";

import LightEffect from "@/components/LightEffect/LightEffect";
import Navbar from "@/components/Navbar/Navbar";
import { useLanguage } from "@/context/languageContext";
import { NextIntlClientProvider, useTranslations } from "next-intl";
import Image from "next/image";
import messagesEs from "../../messages//es.json";
import messagesEn from "../../messages/en.json";
import styles from "./page.module.css";

function MainContent() {
  
  const t = useTranslations("HomePage");

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Navbar />
        <LightEffect />
        <div className={styles.logoContainer}>
          <Image
            className={styles.mainLogo}
            src="/logo.png"
            alt="Logo Principal"
            width={100}
            height={100}
            priority
          />
        </div>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt={t("nextLogoAlt")}
          width={180}
          height={38}
          priority
        />

        <h1>{t("welcome")}</h1>
        <p>{t("description")}</p>

        <ol>
          <li>
            {t("getStarted")} <code>src/app/page.tsx</code>
          </li>
          <li>{t("saveChanges")}</li>
        </ol>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt={t("vercelLogoAlt")}
              width={20}
              height={20}
            />
            {t("deploy")}
          </a>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            {t("readDocs")}
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt={t("fileIconAlt")}
            width={16}
            height={16}
          />
          {t("learn")}
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt={t("windowIconAlt")}
            width={16}
            height={16}
          />
          {t("examples")}
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt={t("globeIconAlt")}
            width={16}
            height={16}
          />
          {t("visitNext")}
        </a>
      </footer>
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
