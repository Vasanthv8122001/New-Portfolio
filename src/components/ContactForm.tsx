"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { profile } from "@/data/portfolio";

const field = "w-full rounded-xl border border-line bg-bg px-4 py-3.5 text-sm text-fg placeholder:text-subtle focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";

export default function ContactForm() {
  // status: idle | sending | success | error
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [hint, setHint] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form));
    setStatus("sending");
    setError("");
    setHint("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data: { error?: string; hint?: string } = await res.json().catch(() => ({}));
      if (!res.ok) {
        setHint(data.hint ?? "");
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      form.reset();
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  const sending = status === "sending";

  return (
    <form onSubmit={onSubmit} className="card-static space-y-4 p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="sr-only">Your name</label>
          <input id="name" name="name" type="text" required maxLength={100} autoComplete="name" className={field} placeholder="Your Name" />
        </div>
        <div>
          <label htmlFor="email" className="sr-only">Your email</label>
          <input id="email" name="email" type="email" required maxLength={200} autoComplete="email" className={field} placeholder="Your Email" />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="sr-only">Subject</label>
        <input id="subject" name="subject" type="text" maxLength={150} className={field} placeholder="Subject" />
      </div>
      <div>
        <label htmlFor="message" className="sr-only">Your message</label>
        <textarea id="message" name="message" required minLength={5} maxLength={5000} rows={5} className={field} placeholder="Your Message" />
      </div>

      {/* Honeypot: hidden from people, filled in by bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="hp_contact_ref">Leave this field empty</label>
        <input id="hp_contact_ref" name="hp_contact_ref" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" disabled={sending} className="inline-flex w-full items-center justify-center gap-2 rounded-xl btn-primary px-6 py-4 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-70">
        {sending ? (<>Sending… <Loader2 size={16} aria-hidden="true" className="animate-spin" /></>) : (<>Send Message <Send size={16} aria-hidden="true" /></>)}
      </button>

      <div role="status" aria-live="polite" className="min-h-5 text-center text-sm">
        {status === "success" && (
          <p className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 size={16} aria-hidden="true" /> Thank you! Your message has been sent.
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600 dark:text-red-400">
            {error}{" "}
            <a href={`mailto:${profile.email}`} className="underline">Email me directly</a>
            {hint && <span className="mt-2 block rounded-lg bg-red-500/10 px-3 py-2 text-left text-xs">Developer hint: {hint}</span>}
          </p>
        )}
      </div>
    </form>
  );
}
