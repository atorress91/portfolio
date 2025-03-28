"use client";

import { useLanguage } from "@/context/languageContext";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import styles from "./Navbar.module.scss";

function Navbar() {
  const { locale, setLocale } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangDropdownOpenDesktop, setIsLangDropdownOpenDesktop] = useState(false);
  const [isLangDropdownOpenMobile, setIsLangDropdownOpenMobile] = useState(false);

  const langDropdownDesktopRef = useRef<HTMLDivElement | null>(null);
  const langDropdownMobileRef = useRef<HTMLDivElement | null>(null);
  const t = useTranslations("Navbar");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLangDropdownDesktop = () => {
    setIsLangDropdownOpenDesktop(!isLangDropdownOpenDesktop);
  };

  const toggleLangDropdownMobile = () => {
    setIsLangDropdownOpenMobile(!isLangDropdownOpenMobile);
  };

  // Para cerrar el dropdown cuando se hace clic fuera (Desktop)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        langDropdownDesktopRef.current &&
        !langDropdownDesktopRef.current.contains(event.target as Node)
      ) {
        setIsLangDropdownOpenDesktop(false);
      }
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsLangDropdownOpenDesktop(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  // Para cerrar el dropdown cuando se hace clic fuera (Mobile)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        langDropdownMobileRef.current &&
        !langDropdownMobileRef.current.contains(event.target as Node)
      ) {
        setIsLangDropdownOpenMobile(false);
      }
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsLangDropdownOpenMobile(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const languages = {
    en: { code: "US", name: "English" },
    es: { code: "ES", name: "Español" },
  };

  const currentLang = languages[locale as keyof typeof languages];
  const alternateLocale = locale === "es" ? "en" : "es";
  const alternateLang = languages[alternateLocale as keyof typeof languages];

  return (
    <nav className={`py-3 ${styles.navbar}`}>
      <div className="container">
        <div className="row">
          {/* Logo y Marca */}
          <div className="col-6 col-sm-6 col-lg-3 d-flex align-items-center">
            <div className={styles["navbar-logo"]}>
              <Image
                src="/images/ats-logo.png"
                alt="VisionDev Logo"
                width={80}
                height={80}
              />
              <span className={styles["navbar-brand"]}></span>
            </div>
          </div>

          {/* Navegación Desktop y Selector de Idioma */}
          <div className="col-lg-9 d-none d-lg-flex align-items-center justify-content-end">
            {/* Enlaces de Navegación */}
            <div className={`d-flex me-4 ${styles["navbar-links"]}`}>
              {[
                t("about"),
                t("experience"),
                t("projects"),
                t("skills"),
                t("contact"),
              ].map((item) => (
                <a key={item} href={`#${item}`} className="mx-2">
                  {item}
                </a>
              ))}
            </div>

            {/* Selector de Idioma (Desktop) */}
            <div
              className={styles["language-dropdown"]}
              ref={langDropdownDesktopRef}
            >
              <button
                onClick={toggleLangDropdownDesktop}
                className={styles["lang-selector-btn"]}
                aria-expanded={isLangDropdownOpenDesktop ? "true" : "false"}
              >
                <ReactCountryFlag
                  countryCode={currentLang.code}
                  svg
                  className={styles["language-btn"]}
                />
                <span className="ms-1">{currentLang.name}</span>
                <span>▼</span>
              </button>

              {isLangDropdownOpenDesktop && (
                <div className={styles["language-dropdown-menu"]}>
                  <button
                    onClick={() => {
                      setLocale(alternateLocale);
                      setIsLangDropdownOpenDesktop(false);
                    }}
                    className={styles["lang-dropdown-item"]}
                  >
                    <ReactCountryFlag
                      countryCode={alternateLang.code}
                      svg
                      className={styles["language-btn"]}
                    />
                    <span className="ms-1">{alternateLang.name}</span>
                  </button>
                </div>
              )} 
            </div>
          </div>

          {/* Selector de Idioma (Mobile) y Toggle del Menú */}
          <div className="col-6 col-sm-6 d-flex d-lg-none align-items-center justify-content-end">
            {/* Selector de Idioma para Mobile */}
            <div className="me-3">
              <div
                className={styles["language-dropdown"]}
                ref={langDropdownMobileRef}
              >
                <button
                  onClick={toggleLangDropdownMobile}
                  className={styles["lang-selector-btn"]}
                  aria-expanded={isLangDropdownOpenMobile}
                >
                  <ReactCountryFlag
                    countryCode={currentLang.code}
                    svg
                    className={styles["language-btn"]}
                  />
                  <span className="ms-1 d-none d-sm-inline">
                    {currentLang.name}
                  </span>
                  <span>▼</span>
                </button>

                {isLangDropdownOpenMobile && (
                  <div className={styles["language-dropdown-menu"]}>
                    <button
                      onClick={() => {
                        setLocale(alternateLocale);
                        setIsLangDropdownOpenMobile(false);
                      }}
                      className={styles["lang-dropdown-item"]}
                    >
                      <ReactCountryFlag
                        countryCode={alternateLang.code}
                        svg
                        className={styles["language-btn"]}
                      />
                      <span className="ms-1">{alternateLang.name}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Botón para el Menú Hamburger */}
            <button
              className="navbar-toggler"
              type="button"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon">
                {isMenuOpen ? "✕" : "☰"}
              </span>
            </button>
          </div>

          {/* Menú Mobile */}
          {isMenuOpen && (
            <div className="col-12 d-lg-none mt-3">
              <div className={`d-flex flex-column ${styles["navbar-links-mobile"]}`}>
                {[
                  t("about"),
                  t("experience"),
                  t("projects"),
                  t("skills"),
                  t("contact"),
                ].map((item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    className="py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
