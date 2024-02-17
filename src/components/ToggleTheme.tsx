"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IoMoonOutline } from "react-icons/io5";
import { MdSunny } from "react-icons/md";

const ToggleTheme = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <div
      onClick={toggleTheme}
      className="flex items-center p-2 rounded-md gap-2 cursor-pointer dark:hover:bg-zinc-700 hover:bg-gray-200 transition-all duration-300"
    >
      <span className="">
        {theme === "light" ? (
          <MdSunny size={22} />
        ) : (
          <IoMoonOutline size={22} />
        )}
      </span>
      <span className="text-xl">Switch Appearance</span>
    </div>
  );
};

export default ToggleTheme;
