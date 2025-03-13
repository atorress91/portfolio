"use client";

import { useLanguage } from "@/context/languageContext";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import StarWrapper from "../../hoc/SectionWrapper";
import styles from "./Navbar.module.scss";

function Navbar() {
  const { locale, setLocale } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLangDropdown = () => {
    setIsLangDropdownOpen(!isLangDropdownOpen);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLangDropdownOpen(false);
      }
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsLangDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [langDropdownRef]);

  const languages = {
    en: { code: "US", name: "English" },
    es: { code: "ES", name: "Español" },
  };

  const currentLang = languages[locale as keyof typeof languages];

  const alternateLang = locale === "es" ? languages["en"] : languages["es"];
  const alternateLocale = locale === "es" ? "en" : "es";

  return (
    <nav className={`py-1 ${styles.navbar}`}>
      <div className="container">
        <div className="row">
          {/* Logo and Brand - Visible on all screen sizes */}
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

          {/* Desktop Navigation and Language Selector Container */}
          <div className="col-lg-9 d-none d-lg-flex align-items-center justify-content-end">
            {/* Navigation Links */}
            <div className={`d-flex me-4 ${styles["navbar-links"]}`}>
              {[
                "Sobre mi",
                "Experiencia",
                "Proyectos",
                "Habilidades",
                "Contacto",
              ].map((item) => (
                <a key={item} href={`#${item}`} className="mx-2">
                  {item}
                </a>
              ))}
            </div>

            {/* Language Selector (Desktop) */}
            <div
              className={styles["language-dropdown"]}
              ref={langDropdownRef}
            >
              <button
                onClick={toggleLangDropdown}
                className={styles["lang-selector-btn"]}
                aria-expanded={isLangDropdownOpen}
              >
                <ReactCountryFlag
                  countryCode={currentLang.code}
                  svg
                  className={styles["language-btn"]}
                />
                <span className="ms-1">{currentLang.name}</span>
                <span>▼</span>
              </button>

              {isLangDropdownOpen && (
                <div className={styles["language-dropdown-menu"]}>
                  <button
                    onClick={() => {
                      setLocale(alternateLocale);
                      setIsLangDropdownOpen(false);
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

          {/* Language Selector (Mobile) and Menu Toggle - Only visible on small screens */}
          <div className="col-6 col-sm-6 d-flex d-lg-none align-items-center justify-content-end">
            {/* Language selector for mobile */}
            <div className="me-3">
              <div
                className={`${styles["language-dropdown"]}`}
                ref={langDropdownRef}
              >
                <button
                  onClick={toggleLangDropdown}
                  className={styles["lang-selector-btn"]}
                  aria-expanded={isLangDropdownOpen}
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

                {isLangDropdownOpen && (
                  <div className={styles["language-dropdown-menu"]}>
                    <button
                      onClick={() => {
                        setLocale(alternateLocale);
                        setIsLangDropdownOpen(false);
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

            {/* Hamburger button */}
            <button
              className="navbar-toggler"
              type="button"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen ? "true" : "false"}
              aria-label="Toggle navigation"
            >
              <span
                className="navbar-toggler-icon"
              >
                {isMenuOpen ? "✕" : "☰"}
              </span>
            </button>
          </div>

          {/* Mobile dropdown menu - Only visible when menu is open and on small screens */}
          {isMenuOpen && (
            <div className="col-12 d-lg-none mt-3">
              <div className={`d-flex flex-column ${styles["navbar-links-mobile"]}`}>
                {[
                  "Sobre mi",
                  "Experiencia",
                  "Proyectos",
                  "Habilidades",
                  "Contacto",
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

export default StarWrapper(Navbar, "navbar");