import { Moon, Sun } from "lucide-react";
import { RefAttributes, useState } from "react";
import { Button, type ButtonProps } from "./ui";

interface DarkModeToggleProps {
  buttonProps?: ButtonProps & RefAttributes<HTMLButtonElement>;
}

export default function DarkModeToggle({ buttonProps }: DarkModeToggleProps) {
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark((prev) => !prev);
  };

  return (
    <Button
      size="icon"
      onClick={toggleDarkMode}
      variant="outline"
      {...buttonProps}
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  );
}
