"use client";

import { Moon, Sun } from "lucide-react";

// Theme is a data-theme attribute on <html>; icons switch with CSS, so there is no hydration mismatch.
export default function ThemeToggle() {
  const toggle = () => {
    const el = document.documentElement;
    const next = el.dataset.theme === "light" ? "dark" : "light";
    el.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      className="grid h-10 w-10 place-items-center rounded-full border border-line bg-card text-fg transition hover:border-accent/50 focus-visible:outline-2 focus-visible:outline-accent"
    >
      <Sun size={18} aria-hidden="true" className="hidden dark:block" />
      <Moon size={18} aria-hidden="true" className="block dark:hidden" />
    </button>
  );
}
