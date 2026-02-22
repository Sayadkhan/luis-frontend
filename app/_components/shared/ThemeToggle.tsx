// app/components/ThemeToggle.tsx
"use client";

import { useTheme } from "@/providers/ThemeProvider";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const buttonClasses = `p-2 rounded-full ${
    theme === "light"
      ? "bg-gray-100 border-gray-200"
      : "bg-gray-800 border-gray-700"
  } border shadow-sm hover:shadow-md transition-all duration-200 group`;

  return (
    <button
      onClick={toggleTheme}
      className={buttonClasses}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        <MdLightMode
          className={`w-5 h-5 text-yellow-500 transition-all duration-300 ${
            theme === "light"
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 -rotate-90 scale-0"
          }`}
        />
        <MdDarkMode
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-blue-400 transition-all duration-300 ${
            theme === "dark"
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 rotate-90 scale-0"
          }`}
        />
      </div>
    </button>
  );
}
