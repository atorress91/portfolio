"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type LanguageContextType = {
  locale: string;
  setLocale: (locale: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState("es");

  useEffect(() => {
    const savedLocale =
      document.cookie.match("(^|;)\\s*NEXT_LOCALE\\s*=\\s*([^;]+)")?.pop() ||
      "es";
    setLocale(savedLocale);
  }, []);

  const changeLanguage = (newLocale: string) => {
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`;
    setLocale(newLocale);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale: changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
}
