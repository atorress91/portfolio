"use client";

import { useLanguage } from "@/context/languageContext";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import styles from "./Navbar.module.scss";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  key: string;
  id: string;
}

function Navbar() {
  const { locale, setLocale } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangDropdownOpenDesktop, setIsLangDropdownOpenDesktop] = useState(false);
  const [isLangDropdownOpenMobile, setIsLangDropdownOpenMobile] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  const langDropdownDesktopRef = useRef<HTMLDivElement | null>(null);
  const langDropdownMobileRef = useRef<HTMLDivElement | null>(null);
  const t = useTranslations("Navbar");

  const navItems: NavItem[] = React.useMemo(
    () => [
      { key: "about", id: "hero" },
      { key: "experience", id: "work" },
      { key: "projects", id: "projects" },
      { key: "skills", id: "skills" },
      { key: "contact", id: "contact" },
    ],
    []
  );

  useEffect(() => {
    const sectionIds = ['hero', 'work', 'projects', 'skills', 'contact'];
    const sections = sectionIds
        .map(id => document.getElementById(id))
        .filter(Boolean) as HTMLElement[];

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      const visibleEntries = entries.filter(entry => entry.isIntersecting);

      if (visibleEntries.length > 0) {
        const maxEntry = visibleEntries.reduce((max, entry) =>
            entry.intersectionRatio > max.intersectionRatio ? entry : max
        );
        setActiveSection(maxEntry.target.id);
      }
    };

    const observer = new window.IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "0px",
      threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
    });

    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleLangDropdownDesktop = () =>
    setIsLangDropdownOpenDesktop(!isLangDropdownOpenDesktop);

  const toggleLangDropdownMobile = () =>
    setIsLangDropdownOpenMobile(!isLangDropdownOpenMobile);

  const handleNavClick = (
      e: React.MouseEvent<HTMLAnchorElement>,
      id: string
  ) => {
    e.preventDefault();
    setActiveSection(id);

    const isMobile = window.innerWidth <= 992 && isMenuOpen;

    const doScroll = () => {
      const targetElement = document.getElementById(id);
      if (targetElement) {
        const navbar = document.querySelector(`.${styles.navbar}`);
        const navbarHeight = navbar?.clientHeight || 0;
        const targetPosition =
            targetElement.getBoundingClientRect().top +
            window.scrollY -
            navbarHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    };

    if (isMobile) {
      setIsMenuOpen(false);
      setTimeout(doScroll, 400);
    } else {
      doScroll();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        langDropdownDesktopRef.current &&
        !langDropdownDesktopRef.current.contains(event.target as Node)
      ) {
        setIsLangDropdownOpenDesktop(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsLangDropdownOpenDesktop(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        langDropdownMobileRef.current &&
        !langDropdownMobileRef.current.contains(event.target as Node)
      ) {
        setIsLangDropdownOpenMobile(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsLangDropdownOpenMobile(false);
    };

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

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2 } },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren",
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
      },
    },
  };

  const [mobileMenuItemVariants] = useState<{
    hidden: { opacity: number; x: number };
    visible: (i: number) => { opacity: number; x: number; transition: { delay: number; duration: number } };
    exit: (i: number) => { opacity: number; x: number; transition: { delay: number; duration: number } }
  }>({
    hidden: {opacity: 0, x: -20},
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
    exit: (i: number) => ({
      opacity: 0,
      x: -20,
      transition: {
        delay: i * 0.05,
        duration: 0.2,
      },
    }),
  });

  return (
    <nav className={`py-2 ${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className="container">
        <div className="row">
          {/* Logo */}
          <div className="col-6 col-sm-6 col-lg-3 d-flex align-items-center">
            <motion.div
              className={styles["navbar-logo"]}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src="/images/ats-logo.png"
                alt={"Logo ATS"}
                width={80}
                height={80}
                style={{ objectFit: "contain" }}
              />
              <span className={styles["navbar-brand"]}></span>
            </motion.div>
          </div>

          {/* Navegación Desktop y Selector de Idioma */}
          <div className="col-lg-9 d-none d-lg-flex align-items-center justify-content-end">
            <div className={`d-flex me-4 ${styles["navbar-links"]}`}>
              {navItems.map((item) => (
                <motion.a
                  key={item.key}
                  href={`#${item.id}`}
                  className={`mx-2 ${activeSection === item.id ? styles.active : ""}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{ y: -3 }}
                >
                  {t(item.key)}
                </motion.a>
              ))}
            </div>

            {/* CV Download Button (Desktop) */}
            <motion.a
              href={`/pdf/${locale}.pdf`}
              download
              className={styles["cv-download-btn"] + " me-3"}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              whileHover={{ rotate: [0, -5, 5, -5, 0] }}
              aria-label={t("downloadCV") || "Descargar CV"}
              title={t("downloadCV") || "Descargar CV"}
            >
              <Image
                src="/curriculum-information.svg"
                alt={t("downloadCV") || "Descargar CV"}
                width={24}
                height={24}
                className={styles["cv-icon"]}
              />
            </motion.a>

            {/* Selector de Idioma (Desktop) */}
            <div
              className={styles["language-dropdown"]}
              ref={langDropdownDesktopRef}
            >
              <motion.button
                onClick={toggleLangDropdownDesktop}
                className={styles["lang-selector-btn"]}
                aria-expanded={isLangDropdownOpenDesktop ? "true" : "false"}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                whileHover={{ y: -3 }}
              >
                <ReactCountryFlag
                  countryCode={currentLang.code}
                  svg
                  className={styles["language-btn"]}
                  title={
                    t("currentLangFlag", { lang: currentLang.name }) ||
                    `Bandera de ${currentLang.name}`
                  }
                />
                <span className="ms-1">{currentLang.name}</span>
                <motion.span
                  animate={{ rotate: isLangDropdownOpenDesktop ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ▼
                </motion.span>
              </motion.button>

              <AnimatePresence>
                {isLangDropdownOpenDesktop && (
                  <motion.div
                    className={styles["language-dropdown-menu"]}
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <motion.button
                      onClick={() => {
                        setLocale(alternateLocale);
                        setIsLangDropdownOpenDesktop(false);
                      }}
                      className={styles["lang-dropdown-item"]}
                      whileHover={{ x: 5 }}
                    >
                      <ReactCountryFlag
                        countryCode={alternateLang.code}
                        svg
                        className={styles["language-btn"]}
                        title={
                          t("alternateLangFlag", {
                            lang: alternateLang.name,
                          }) || `Bandera de ${alternateLang.name}`
                        }
                      />
                      <span className="ms-1">{alternateLang.name}</span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* (Mobile) y Toggle del Menú */}
          <div className="col-6 col-sm-6 d-flex d-lg-none align-items-center justify-content-end">
            {/* CV Download Button (Mobile) */}
            <motion.a
              href={`/pdf/${locale}.pdf`}
              download
              className={styles["cv-download-btn"] + " me-2"}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              aria-label={t("downloadCV") || "Descargar CV"}
              title={t("downloadCV") || "Descargar CV"}
            >
              <Image
                src="/curriculum-information.svg"
                alt={t("downloadCV") || "Descargar CV"}
                width={20}
                height={20}
                className={styles["cv-icon"]}
              />
            </motion.a>
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
                  title={
                    t("currentLangFlag", { lang: currentLang.name }) ||
                    `Bandera de ${currentLang.name}`
                  }
                />
                <span className="ms-1 d-none d-sm-inline">
                  {currentLang.name}
                </span>
                <motion.span
                  animate={{ rotate: isLangDropdownOpenMobile ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ▼
                </motion.span>
              </button>

              <AnimatePresence>
                {isLangDropdownOpenMobile && (
                  <motion.div
                    className={styles["language-dropdown-menu"]}
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <motion.button
                      onClick={() => {
                        setLocale(alternateLocale);
                        setIsLangDropdownOpenMobile(false);
                      }}
                      className={styles["lang-dropdown-item"]}
                      whileHover={{ x: 5 }}
                    >
                      <ReactCountryFlag
                        countryCode={alternateLang.code}
                        svg
                        className={styles["language-btn"]}
                        title={
                          t("alternateLangFlag", {
                            lang: alternateLang.name,
                          }) || `Bandera de ${alternateLang.name}`
                        }
                      />
                      <span className="ms-1">{alternateLang.name}</span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Botón para el Menú Hamburger */}
            <button
              className={styles.hamburgerBtn}
              type="button"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label={t("toggleMenu") || "Abrir/Cerrar menú de navegación"}
            >
              <span
                className={`${styles.hamburgerLine} ${
                  isMenuOpen ? styles.lineTop : ""
                }`}
              ></span>
              <span
                className={`${styles.hamburgerLine} ${
                  isMenuOpen ? styles.lineMiddle : ""
                }`}
              ></span>
              <span
                className={`${styles.hamburgerLine} ${
                  isMenuOpen ? styles.lineBottom : ""
                }`}
              ></span>
            </button>
          </div>

          {/* Menú Mobile */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="col-12 d-lg-none"
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div
                  className={`d-flex flex-column ${styles["navbar-links-mobile"]}`}
                >
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.key}
                      href={`#${item.id}`}
                      className={activeSection === item.id ? styles.active : ""}
                      onClick={(e) => handleNavClick(e, item.id)}
                      custom={index}
                      variants={mobileMenuItemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      {t(item.key)}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
