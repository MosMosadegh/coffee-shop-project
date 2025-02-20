"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // بررسی تم ذخیره‌شده در LocalStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      setDarkMode(false);
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    } else {
      setDarkMode(true);
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <button onClick={toggleDarkMode}>
      {darkMode ? <span className="text-xl">🌞</span> : <span className="text-xl">🌚</span>}
    </button>
  );
}
