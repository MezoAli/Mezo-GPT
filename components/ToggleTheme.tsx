"use client";
import { useState } from "react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

const ToggleTheme = () => {
  const [theme, setTheme] = useState("winter");
  const handleThemeToggle = () => {
    setTheme((prevValue: string) => {
      const value = prevValue === "winter" ? "night" : "winter";
      document.documentElement.setAttribute("data-theme", value);
      return value;
    });
  };
  return (
    <button className="btn btn-outline" onClick={handleThemeToggle}>
      {theme === "winter" ? (
        <BsMoonFill className="w-5 h-5" />
      ) : (
        <BsSunFill className="w-5 h-5 text-yellow-500" />
      )}
    </button>
  );
};

export default ToggleTheme;
