import Section from "./Section";
import Experience from "./Experience";
import Projects from "./Projects";

// Side-by-side Experience and Projects columns, as in the reference.
export default function Work() {
  return (
    <Section id="work" className="bg-card/40" eyebrow="Experience & Work" title={<>Where I&apos;ve <span className="text-hi">Worked</span> &amp; Built</>} intro="My professional journey and the projects behind it.">
      <div className="grid items-start gap-12 lg:grid-cols-2">
        <Experience />
        <Projects />
      </div>
    </Section>
  );
}
