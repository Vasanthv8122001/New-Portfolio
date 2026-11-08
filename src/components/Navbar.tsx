"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = navLinks.map((l) => document.getElementById(l.id)).filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const pill = (id: string) =>
    cn(
      "rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-accent",
      active === id ? "btn-primary" : "text-muted hover:text-fg"
    );

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-colors", scrolled || open ? "border-b border-line bg-bg/85 backdrop-blur" : "bg-transparent")}>
      <nav aria-label="Main" className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-8">
        <a href="#home" aria-label={`${profile.name} – back to top`} className="justify-self-start text-xl font-bold tracking-tight text-fg focus-visible:outline-2 focus-visible:outline-accent">
          {profile.initials}
        </a>

        <ul className="hidden items-center gap-1 rounded-full border border-line bg-card/60 p-1 backdrop-blur md:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} className={pill(l.id)} aria-current={active === l.id ? "true" : undefined}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="col-start-3 flex items-center gap-2 justify-self-end">
          <ThemeToggle />
          <a href="#contact" className="hidden rounded-full btn-primary px-5 py-2.5 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:inline-flex">
            Let&apos;s Talk
          </a>
          <button type="button" className="grid h-10 w-10 place-items-center rounded-full text-fg hover:bg-chip focus-visible:outline-2 focus-visible:outline-accent md:hidden" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((v) => !v)}>
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line px-5 pb-5 pt-3 md:hidden">
          <ul className="flex flex-col gap-1">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} onClick={() => setOpen(false)} className={cn(pill(l.id), "block py-3 text-base")}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" onClick={() => setOpen(false)} className="mt-3 inline-flex w-full items-center justify-center btn-primary rounded-full px-4 py-3 text-sm font-semibold">
            Let&apos;s Talk
          </a>
        </div>
      )}
    </header>
  );
}
