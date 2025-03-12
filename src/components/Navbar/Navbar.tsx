"use client";

import { useLanguage } from "@/context/languageContext";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const { locale, setLocale } = useLanguage();

  return (
    <nav className={`py-3 ${styles.navbar}`}>
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo */}
        <div className={styles["navbar-logo"]}>
          <Image src="/logo.png" alt="VisionDev Logo" width={60} height={60} />
          <span className={styles["navbar-brand"]}>visiondev</span>
        </div>

        {/* Enlaces de Navegación */}
        <div className={`d-flex gap-3 ${styles["navbar-links"]}`}>
          {["proyectos", "visión", "contacto"].map((item) => (
            <a key={item} href="#">
              {item}
            </a>
          ))}
        </div>

        {/* Selector de idioma */}
        <div className="d-flex align-items-center">
          🌍 {locale === "es" ? "Idioma" : "Language"}:
          <button
            onClick={() => setLocale("en")}
            disabled={locale === "en"}
            className="btn btn-sm btn-outline-primary mx-2"
          >
            <ReactCountryFlag
              countryCode="US"
              svg
              className={styles["language-btn"]}
            />
            English
          </button>
          <button
            onClick={() => setLocale("es")}
            disabled={locale === "es"}
            className="btn btn-sm btn-outline-secondary"
          >
            <ReactCountryFlag
              countryCode="ES"
              svg
              className={styles["language-btn"]}
            />
            Español
          </button>
        </div>
      </div>
    </nav>
  );
}
