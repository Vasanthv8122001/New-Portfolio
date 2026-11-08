import { ArrowUpRight, Rocket, Sparkles } from "lucide-react";
import { projects } from "@/data/portfolio";
import Reveal from "./Reveal";
import { GithubIcon } from "./Icons";

export default function Projects() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent-text"><Rocket size={20} aria-hidden="true" /></span>
        <div>
          <h3 className="text-xl font-bold text-fg">Featured Projects</h3>
          <p className="text-sm text-muted">{projects.length} projects</p>
        </div>
      </div>
      <div className="space-y-5">
        {projects.map((p, i) => (
          <Reveal as="article" key={p.name} delay={i * 80} className="card relative overflow-hidden p-6">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal-400 via-sky-400 to-indigo-400" />
            <span aria-hidden="true" className="pointer-events-none absolute bottom-3 right-5 text-6xl font-extrabold text-fg/[0.06]">{String(i + 1).padStart(2, "0")}</span>
            {p.featured && (
              <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-fg">
                <Sparkles size={12} aria-hidden="true" /> Featured
              </span>
            )}
            <h4 className="pr-24 text-lg font-bold text-fg">{p.name}</h4>
            <p className="mt-1 text-sm text-accent-text">{p.purpose}</p>
            <p className="mt-3 text-sm leading-relaxed">{p.overview}</p>

            <h5 className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wider text-subtle">My contributions</h5>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed marker:text-accent-text">
              {p.contributions.map((c) => (
                <li key={c}>{c}</li>
              ))}
              {p.also && <li>{p.also}</li>}
            </ul>

            {p.challenge && (
              <>
                <h5 className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wider text-subtle">Technical challenge</h5>
                <p className="text-sm leading-relaxed"><span className="font-semibold text-fg">Problem: </span>{p.challenge.problem}</p>
                <p className="mt-2 text-sm leading-relaxed"><span className="font-semibold text-fg">Solution: </span>{p.challenge.solution}</p>
              </>
            )}

            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
              {p.tech.map((t) => (
                <li key={t} className="rounded-md bg-chip px-2.5 py-1 font-mono text-xs text-muted">{t}</li>
              ))}
            </ul>

            {(p.links?.github || p.links?.live) && (
              <div className="mt-5 flex gap-4 text-sm">
                {p.links.github && (
                  <a href={p.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-muted hover:text-accent-text">
                    <GithubIcon className="h-4 w-4" /> Code
                  </a>
                )}
                {p.links.live && (
                  <a href={p.links.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium text-accent-text hover:underline">
                    Live Demo <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                )}
              </div>
            )}
          </Reveal>
        ))}
      </div>
    </div>
  );
}
