"use client";

import { useLanguage } from "@/context/languageContext";
import Link from "next/link";
import ReactCountryFlag from "react-country-flag";

export default function Navbar() {
  const { locale, setLocale } = useLanguage();

  return (
    <nav>
      <ul>
        <li>
          <Link href="/">🏠 {locale === "es" ? "Inicio" : "Home"}</Link>
        </li>
        <li>
          <Link href="/about">
            ℹ️ {locale === "es" ? "Sobre Nosotros" : "About Us"}
          </Link>
        </li>

        <li>
          🌍 {locale === "es" ? "Idioma" : "Language"}:
          <button onClick={() => setLocale("en")} disabled={locale === "en"}>
            <ReactCountryFlag 
              countryCode="US" 
              svg 
              style={{ width: '1em', height: '1em', marginRight: '5px' }} 
            />
            English
          </button>
          <button onClick={() => setLocale("es")} disabled={locale === "es"}>
            <ReactCountryFlag 
              countryCode="ES" 
              svg 
              style={{ width: '1em', height: '1em', marginRight: '5px' }} 
            />
            Español
          </button>
        </li>
      </ul>
    </nav>
  );
}