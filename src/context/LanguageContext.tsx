"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Language = "ru" | "en";

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
}>({ language: "ru", setLanguage: () => {} });

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("ru");

  useEffect(() => {
    const stored = localStorage.getItem("interfaceLanguage");
    if (stored === "ru" || stored === "en") setLanguage(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("interfaceLanguage", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext); 