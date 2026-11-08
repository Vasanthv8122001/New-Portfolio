import { ArrowUp, Heart, Mail, Phone } from "lucide-react";
import { navLinks, profile } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "./Icons";

const icon = "grid h-10 w-10 place-items-center rounded-lg border border-line text-muted transition hover:border-accent/50 hover:text-accent-text focus-visible:outline-2 focus-visible:outline-accent";

export default function Footer() {
  return (
    <footer className="relative mt-10 pb-8 pt-16">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      <a href="#home" aria-label="Back to top" className="btn-primary absolute -top-6 left-1/2 grid h-12 w-12 -translate-x-1/2 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
        <ArrowUp size={20} aria-hidden="true" />
      </a>
      <div className="mx-auto grid max-w-5xl gap-10 px-5 sm:px-8 md:grid-cols-3">
        <div>
          <p className="text-2xl font-bold text-fg">{profile.name}<span className="text-accent">.</span></p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed">Software Engineer building reliable full-stack web applications.</p>
          <div className="mt-5 flex items-center gap-3">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className={icon}><GithubIcon className="h-[18px] w-[18px]" /></a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className={icon}><LinkedinIcon className="h-[18px] w-[18px]" /></a>
            <a href={`mailto:${profile.email}`} aria-label="Send an email" className={icon}><Mail size={18} aria-hidden="true" /></a>
          </div>
        </div>
        <nav aria-label="Footer">
          <p className="mb-4 font-semibold text-fg">Quick Links</p>
          <ul className="space-y-2.5 text-sm">
            {navLinks.map((l) => (
              <li key={l.id}><a href={`#${l.id}`} className="transition hover:text-accent-text">{l.label}</a></li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="mb-4 font-semibold text-fg">Get in Touch</p>
          <ul className="space-y-2.5 text-sm">
            <li><a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 break-all transition hover:text-accent-text"><Mail size={16} aria-hidden="true" className="shrink-0" /> {profile.email}</a></li>
            <li><a href={`tel:${profile.phoneHref}`} className="inline-flex items-center gap-2 transition hover:text-accent-text"><Phone size={16} aria-hidden="true" /> {profile.phone}</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-5xl flex-col items-center justify-between gap-2 border-t border-line px-5 pt-6 text-sm text-subtle sm:flex-row sm:px-8">
        <p className="inline-flex items-center gap-1.5">Made with <Heart size={14} aria-hidden="true" className="fill-accent text-accent" /> by <span className="font-medium text-fg">{profile.name}</span></p>
        <p>© {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
}
