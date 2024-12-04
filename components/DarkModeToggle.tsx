import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark((prev) => !prev);
  };

  return (
    <Button
      size="icon"
      onClick={toggleDarkMode}
      className="bg-gray-200 shadow-md dark:bg-gray-700"
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  );
};
