import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Code, Layers, Plug, ShieldCheck, Zap, type LucideIcon } from "lucide-react";
import { about, profile, type HighlightIcon } from "@/data/portfolio";
import Section from "./Section";
import Reveal from "./Reveal";

const icons: Record<HighlightIcon, LucideIcon> = { layers: Layers, plug: Plug, zap: Zap, shield: ShieldCheck };

// If a photo exists at public/images/profile.(jpg|jpeg|png|webp) it is shown automatically.
const photo = ["jpg", "jpeg", "png", "webp"]
  .map((ext) => `/images/Vasanth.V.${ext}`)
  .find((p) => fs.existsSync(path.join(process.cwd(), "public", p)));

export default function About() {
  return (
    <Section id="about" eyebrow="About Me" title={<>Building Reliable <span className="text-hi">Full-Stack Applications</span></>}>
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="mx-auto w-full max-w-md">
          <div className="relative">
            <div aria-hidden="true" className="absolute inset-0 -rotate-3 scale-[1.03] rounded-3xl bg-gradient-to-br from-teal-400/40 via-sky-400/25 to-indigo-400/30" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-card">
              {photo ? (
                <Image src={photo} alt={`Portrait of ${profile.name}`} fill sizes="(min-width: 1024px) 448px, 90vw" className="object-cover" />
              ) : (
                <div className="grid h-full w-full place-items-center">
                  <span aria-hidden="true" className="text-8xl font-extrabold tracking-tight text-hi">{profile.initials}</span>
                </div>
              )}
            </div>
            <div className="absolute -bottom-5 -right-2 flex items-center gap-3 rounded-2xl border border-line bg-card px-4 py-3 shadow-xl sm:-right-6">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-accent-soft text-accent-text">
                <Code size={20} aria-hidden="true" />
              </span>
              <p>
                <span className="block font-semibold text-fg">3+ Years</span>
                <span className="block text-xs text-muted">Experience</span>
              </p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal className="space-y-5 leading-relaxed">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {about.highlights.map((h, i) => {
              const Icon = icons[h.icon];
              return (
                <Reveal as="li" key={h.title} delay={i * 80} className="card p-5">
                  <Icon size={22} aria-hidden="true" className="mb-3 text-accent-text" />
                  <h3 className="font-semibold text-fg">{h.title}</h3>
                  <p className="mt-1 text-sm text-muted">{h.text}</p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}
