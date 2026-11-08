import { ArrowUpRight, Briefcase, Calendar, MapPin } from "lucide-react";
import { experience } from "@/data/portfolio";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent-text"><Briefcase size={20} aria-hidden="true" /></span>
        <div>
          <h3 className="text-xl font-bold text-fg">Work Experience</h3>
          <p className="text-sm text-muted">{experience.roles.length} positions</p>
        </div>
      </div>
      <ol className="space-y-5">
        {experience.roles.map((r, i) => (
          <Reveal as="li" key={r.title} delay={i * 80} className={`card border-l-4 p-6 ${r.current ? "border-l-teal-500" : "border-l-sky-500"}`}>
            <div className="flex flex-wrap items-center gap-3">
              <h4 className={`text-lg font-bold ${r.current ? "text-accent-text" : "text-fg"}`}>{r.title}</h4>
              {r.current && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Current
                </span>
              )}
            </div>
            <a href={experience.companyUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-accent-text hover:underline">
              {experience.company} <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
              <span className="inline-flex items-center gap-1.5"><Calendar size={13} aria-hidden="true" /> {r.dates}</span>
              <span className="inline-flex items-center gap-1.5"><MapPin size={13} aria-hidden="true" /> {experience.location}</span>
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed marker:text-accent-text">
              {r.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
              {r.tech.map((t) => (
                <li key={t} className="rounded-full bg-chip px-3 py-1 text-xs font-medium text-fg transition hover:bg-accent-soft hover:text-accent-text">{t}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
