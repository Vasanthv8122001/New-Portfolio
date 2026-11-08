import { Mail, Phone } from "lucide-react";
import { profile } from "@/data/portfolio";
import Section from "./Section";
import Reveal from "./Reveal";
import ContactForm from "./ContactForm";
import { GithubIcon, LinkedinIcon } from "./Icons";

const row = "flex items-center gap-3 card rounded-xl p-4 text-sm text-fg focus-visible:outline-2 focus-visible:outline-accent";

export default function Contact() {
  return (
    <Section id="contact" eyebrow="Contact" title={<>Let&apos;s Work <span className="text-hi">Together</span></>} intro="I am open to discussing software engineering roles and new opportunities. Send a message or reach out directly.">
      <div className="mx-auto max-w-2xl space-y-6">
        <Reveal>
          <ContactForm />
        </Reveal>
        <Reveal delay={80}>
          <ul className="grid gap-3 sm:grid-cols-2">
            <li><a href={`mailto:${profile.email}`} className={row}><Mail size={18} aria-hidden="true" className="shrink-0 text-accent-text" /><span className="min-w-0 break-words">{profile.email}</span></a></li>
            <li><a href={`tel:${profile.phoneHref}`} className={row}><Phone size={18} aria-hidden="true" className="shrink-0 text-accent-text" />{profile.phone}</a></li>
            <li><a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={row}><LinkedinIcon className="h-[18px] w-[18px] shrink-0 text-accent-text" />LinkedIn</a></li>
            <li><a href={profile.github} target="_blank" rel="noopener noreferrer" className={row}><GithubIcon className="h-[18px] w-[18px] shrink-0 text-accent-text" />GitHub</a></li>
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
