"use client";

import * as React from "react";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = React.useState<"light" | "dark">("dark");

  React.useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    if (current === "light" || current === "dark") {
      setTheme(current);
    }
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("nowbat-theme", next);
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "تغییر به تم روشن" : "تغییر به تم تاریک"}
      className={cn(
        "flex items-center justify-center w-8 h-8 rounded",
        "text-[var(--text-secondary)]",
        "border border-[var(--border)] bg-[var(--bg-glass)]",
        "hover:text-[var(--text-primary)] hover:border-[rgba(55,138,221,0.3)]",
        "transition-colors duration-150",
        "outline-none focus-visible:ring-2 focus-visible:ring-brand",
        className,
      )}
    >
      {theme === "dark" ? (
        <IconSun size={16} aria-hidden="true" />
      ) : (
        <IconMoon size={16} aria-hidden="true" />
      )}
    </button>
  );
}

export { ThemeToggle };
