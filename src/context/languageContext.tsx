"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";

type LanguageContextType = {
  locale: string;
  setLocale: (locale: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [locale, setLocale] = useState("es");

  useEffect(() => {
    const savedLocale =
        /(^|;)\s*NEXT_LOCALE\s*=\s*([^;]+)/.exec(document.cookie)?.pop() ||
      "es";
    setLocale(savedLocale);
  }, []);

  const changeLanguage = useCallback((newLocale: string) => {
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`;
    setLocale(newLocale);
  }, []);

  const contextValue = useMemo(
    () => ({ locale, setLocale: changeLanguage }),
    [locale, changeLanguage]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
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
