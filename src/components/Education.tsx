import type { ReactNode } from "react";
import { Award, GraduationCap, Trophy, type LucideIcon } from "lucide-react";
import { awards, certifications, education } from "@/data/portfolio";
import Section from "./Section";
import Reveal from "./Reveal";

const chip = "inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent-text";

type InfoCardProps = {
  icon: LucideIcon;
  title: string;
  right?: string;
  sub?: string;
  children?: ReactNode;
};

function InfoCard({ icon: Icon, title, right, sub, children }: InfoCardProps) {
  return (
    <Reveal as="article" className="card p-6">
      <div className="flex items-start gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent-text">
          <Icon size={22} aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3 className="text-lg font-bold text-fg">{title}</h3>
            {right && <span className="rounded-full bg-chip px-3 py-1 font-mono text-xs text-muted">{right}</span>}
          </div>
          {sub && <p className="mt-1 font-medium text-accent-text">{sub}</p>}
          {children}
        </div>
      </div>
    </Reveal>
  );
}

export default function Education() {
  const degreeField = education.degree.replace("Bachelor of Engineering in ", "");
  return (
    <Section id="education" narrow eyebrow="Education" title={<>Academic <span className="text-hi">Background</span></>}>
      <div className="space-y-5">
        <InfoCard icon={GraduationCap} title="Bachelor of Engineering" right={education.years.replace("–", "-")} sub={education.institution}>
          <p className="mt-2 text-sm leading-relaxed">{degreeField}</p>
          <p className="mt-3"><span className={chip}><Trophy size={13} aria-hidden="true" /> CGPA: {education.cgpa}</span></p>
        </InfoCard>
        {awards.map((a) => (
          <InfoCard key={a.name} icon={Award} title={a.name} sub="Awards and Recognition">
            <p className="mt-2 text-sm leading-relaxed">{a.text}</p>
          </InfoCard>
        ))}
      </div>

      <div>
        <h3 className="mb-5 flex items-center gap-3 text-xl font-bold text-fg">
          <Award size={22} aria-hidden="true" className="text-accent-text" /> Certifications
        </h3>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((c, i) => (
            <Reveal as="li" key={c.name} delay={(i % 4) * 80} className="card flex flex-col p-5">
              <p className="font-semibold leading-snug text-fg">{c.name}</p>
              <p className="mt-1 text-sm text-muted">{c.issuer}</p>
              <p className="mt-auto pt-3 font-mono text-xs text-accent-text">{c.date}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
