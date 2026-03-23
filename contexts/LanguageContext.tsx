"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { en, Translations } from "../locales/en";
import { sw } from "../locales/sw";

type Language = "en" | "sw";

interface LanguageContextType {
  language: Language;
  t: Translations;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check local storage for language preference on mount
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang === "en" || savedLang === "sw") {
      setLanguage(savedLang);
    }
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    const newLang = language === "en" ? "sw" : "en";
    setLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  const t = language === "en" ? en : sw;

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
