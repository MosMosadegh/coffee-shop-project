"use client";

import { useEffect, useState } from "react";
import { FaRegMoon } from "react-icons/fa";
import { IoSunnySharp } from "react-icons/io5";

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
    <button  className="flex items-center gap-x-2" onClick={toggleDarkMode}>
      {darkMode ? <IoSunnySharp className="h-5 w-5"/> : <FaRegMoon className="h-5 w-5" />}
      <span className="inline-block dark:hidden"> تم تیره</span>
      <span className="hidden dark:inline-block "> تم روشن</span>
    </button>
  );
}
