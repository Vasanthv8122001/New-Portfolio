import { Bug, Code, Database, LayoutDashboard, Plug, Server, ShieldCheck, Wrench, type LucideIcon } from "lucide-react";
import { skillGroups } from "@/data/portfolio";
import Section from "./Section";
import Reveal from "./Reveal";

// Icon + colour per category (colours follow the reference: coral, green, purple, ...).
const meta: Record<string, [LucideIcon, string]> = {
  "Programming Languages": [Code, "bg-teal-600"],
  "Frontend Development": [LayoutDashboard, "bg-sky-600"],
  "Backend Development": [Server, "bg-emerald-600"],
  "Databases and Caching": [Database, "bg-indigo-500"],
  "APIs and Integrations": [Plug, "bg-cyan-600"],
  "Authentication and Security": [ShieldCheck, "bg-blue-600"],
  "Testing and Debugging": [Bug, "bg-violet-500"],
  "Tools and Platforms": [Wrench, "bg-slate-600"],
};

export default function Skills() {
  return (
    <Section id="skills" narrow className="bg-card/40" eyebrow="Expertise" title={<>Skills &amp; <span className="text-hi">Technologies</span></>}>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g, i) => {
          const [Icon, color] = meta[g.title] ?? [Code, "bg-teal-600"];
          return (
            <Reveal key={g.title} delay={(i % 3) * 80} className="card p-6">
              <div className="mb-5 flex items-center gap-3">
                <span className={`grid h-11 w-11 place-items-center rounded-xl text-white ${color}`}>
                  <Icon size={20} aria-hidden="true" />
                </span>
                <h3 className="font-bold leading-tight text-fg">{g.title}</h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li key={s} className="rounded-full bg-chip px-3 py-1 text-sm text-fg transition hover:bg-accent-soft hover:text-accent-text">{s}</li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
