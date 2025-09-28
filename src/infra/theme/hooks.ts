import { useEffect, useState } from "react";
import { ThemeManager } from "./manager";

export function useTheme() {
  const [theme, setTheme] = useState(ThemeManager.theme);
  
  useEffect(() => {
    return ThemeManager.on("theme-updated", () => {
      setTheme(ThemeManager.theme);
    });
  }, []);

  return {
    theme,
    toggleTheme: () => ThemeManager.toggleTheme(),
  }
}