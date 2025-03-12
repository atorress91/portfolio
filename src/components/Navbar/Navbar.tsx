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
        <div className="row w-100">
          {/* First row (always visible): Logo, mobile language selector and menu button */}
          <div className="col-12 d-flex justify-content-between align-items-center">
            {/* Logo container and mobile language selector */}
            <div className="d-flex align-items-center">
              {/* Logo */}
              <div className={styles["navbar-logo"]}>
                <Image
                  src="/images/ats-logo.png"
                  alt="VisionDev Logo"
                  width={80}
                  height={80}
                />
                <span className={styles["navbar-brand"]}></span>
              </div>

              {/* Language selector for mobile (always visible) */}
              <div className="d-flex d-md-none ms-3 justify-content-center">
                <div
                  className={`${styles["language-dropdown"]} ${styles["language-dropdown-mobile"]}`}
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
            </div>

            {/* Hamburger button (visible only on mobile) */}
            <button
              className="navbar-toggler d-md-none"
              type="button"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen ? "true" : "false"}
              aria-label="Toggle navigation"
            >
              <span
                className="navbar-toggler-icon"
                style={{ fontSize: "1.5rem" }}
              >
                {isMenuOpen ? "✕" : "☰"}
              </span>
            </button>

            {/* Navigation links and language selector (visible on desktop) */}
            <div className="d-none d-md-flex align-items-center">
              <div className={`d-flex gap-3 me-4 ${styles["navbar-links"]}`}>
                {[
                  "Sobre mi",
                  "Experiencia",
                  "Proyectos",
                  "Habilidades",
                  "Contacto",
                ].map((item) => (
                  <a key={item} href={`#${item}`}>
                    {item}
                  </a>
                ))}
              </div>

              {/* Language selector for desktop */}
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
          </div>

          {/* Mobile dropdown menu */}
          <div
            className={`col-12 ${isMenuOpen ? "d-block" : "d-none"
              } d-md-none mt-3`}
          >
            <div className="d-flex flex-column">
              {/* Navigation links */}
              <div
                className={`d-flex flex-column mb-3 ${styles["navbar-links-mobile"]}`}
              >
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
          </div>
        </div>
      </div>
    </nav>
  );
}

export default StarWrapper(Navbar, "navbar");
