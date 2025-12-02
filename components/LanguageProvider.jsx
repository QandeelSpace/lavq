// components/LanguageProvider.jsx
"use client";
import React, { createContext, useState } from "react";

export const AppContext = createContext();

export default function LanguageProvider({ children }) {
  const [isArabic, setIsArabic] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <AppContext.Provider value={{ isArabic, setIsArabic, darkMode, setDarkMode }}>
      <div className={darkMode ? "dark" : ""}>
        {children}
      </div>
    </AppContext.Provider>
  );
}
