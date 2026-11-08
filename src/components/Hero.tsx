import { ArrowRight, Download, Mail, Sparkles } from "lucide-react";
import { heroStats, profile } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "./Icons";

const social = "grid h-12 w-12 place-items-center rounded-full border border-line bg-card text-muted shadow-sm transition hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent-text focus-visible:outline-2 focus-visible:outline-accent";

export default function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      {/* Decorative background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="hero-bg absolute inset-0" />
        <div className="blob blob-a -left-24 top-16 h-96 w-96" style={{ background: "var(--blob-1)" }} />
        <div className="blob blob-b -right-24 top-40 h-[26rem] w-[26rem]" style={{ background: "var(--blob-2)" }} />
        <div className="blob blob-a bottom-0 left-1/3 h-80 w-80" style={{ background: "var(--blob-3)" }} />
      </div>

      <div className="relative mx-auto w-full max-w-4xl px-5 pb-32 pt-20 text-center sm:px-8">
        <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-4 py-1.5 text-sm font-medium text-accent-text backdrop-blur">
          <Sparkles size={15} aria-hidden="true" />
          Software Engineer at {profile.company}
        </p>

        <h1 id="hero-title" className="text-5xl font-extrabold leading-[1.05] tracking-tight text-fg sm:text-7xl lg:text-8xl">
          Hi, I&apos;m <span className="text-hi whitespace-nowrap">{profile.name}</span>
        </h1>

        <p className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xl sm:text-3xl">
          <span className="font-semibold text-fg">Software Engineer</span>
          <span aria-hidden="true" className="h-7 w-0.5 rounded-full bg-gradient-to-b from-teal-400 to-sky-400" />
          <span className="sr-only"> | </span>
          <span className="text-muted">Full-Stack Developer</span>
        </p>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{profile.intro}</p>

        <ul className="mt-6 flex flex-wrap justify-center gap-2" aria-label="Core technologies">
          {profile.heroTech.map((t) => (
            <li key={t} className="rounded-full border border-line bg-card/70 px-3.5 py-1 text-sm text-fg backdrop-blur transition hover:border-accent/50 hover:text-accent-text">{t}</li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href="#contact" className="btn-primary inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
            Get in Touch <ArrowRight size={16} aria-hidden="true" />
          </a>
          <a href="#work" className="inline-flex items-center rounded-full border border-line bg-card/60 px-7 py-3.5 text-sm font-semibold text-fg backdrop-blur transition hover:-translate-y-0.5 hover:border-accent/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
            View My Work
          </a>
        </div>
        <a href={profile.resume} download className="mt-5 inline-flex items-center gap-2 text-sm text-muted transition hover:text-accent-text focus-visible:outline-2 focus-visible:outline-accent">
          <Download size={15} aria-hidden="true" /> Download Resume
        </a>

        <div className="mt-8 flex items-center justify-center gap-3">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className={social}><GithubIcon className="h-5 w-5" /></a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className={social}><LinkedinIcon className="h-5 w-5" /></a>
          <a href={`mailto:${profile.email}`} aria-label="Send an email" className={social}><Mail size={20} aria-hidden="true" /></a>
        </div>

        <dl className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-4">
          {heroStats.map((s) => (
            <div key={s.label} className="card-static px-4 py-4 backdrop-blur">
              <dd className="text-hi text-2xl font-extrabold sm:text-3xl">{s.value}</dd>
              <dt className="mt-1 text-xs text-muted">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>

      <a href="#about" aria-label="Scroll to About section" className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-[11px] uppercase tracking-[0.25em] text-subtle hover:text-accent-text xl:flex">
        Scroll
        <span aria-hidden="true" className="relative block h-9 w-5 rounded-full border-2 border-subtle">
          <span className="scroll-dot absolute left-1/2 top-1.5 h-1.5 w-1 -translate-x-1/2 rounded-full bg-subtle" />
        </span>
      </a>
    </section>
  );
}
