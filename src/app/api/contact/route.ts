import { readdirSync } from "node:fs";
import { createTransporter, describeMailError, getMailConfig } from "@/lib/mailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  /** Honeypot: real visitors never fill this hidden field in. */
  hp_contact_ref?: unknown;
}

interface ApiResponse {
  ok?: true;
  error?: string;
  /** Extra detail, only included while developing (never in production). */
  hint?: string;
}

// Extra detail and the GET diagnostic are on while developing. In production, set CONTACT_DEBUG=true to turn them on temporarily.
const IS_DEV = process.env.NODE_ENV !== "production" || process.env.CONTACT_DEBUG === "true";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Best-effort rate limit per IP (in memory, so it resets when the server instance restarts).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_REQUESTS;
}

const oneLine = (value: unknown, max: number): string =>
  String(value ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, max);

const HTML_ESCAPES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const escapeHtml = (text: string): string => text.replace(/[&<>"']/g, (c) => HTML_ESCAPES[c] ?? c);

const json = (body: ApiResponse, status = 200): Response => Response.json(body, { status });

/**
 * Diagnostic: open http://localhost:3000/api/contact in your browser to see what the server can see.
 * Never reveals any secret value, only whether each setting is present.
 */
export async function GET(): Promise<Response> {
  if (!IS_DEV) return new Response("Not found", { status: 404 });

  const { config, missing } = getMailConfig();
  let envFiles: string[] = [];
  try {
    envFiles = readdirSync(process.cwd()).filter((f) => f.startsWith(".env"));
  } catch {
    // ignore: not available on every platform
  }
  const typos = envFiles.filter((f) => f !== ".env.local" && f !== ".env.example" && f !== ".env" && !f.startsWith(".env.production") && !f.startsWith(".env.development"));

  return Response.json({
    configured: Boolean(config),
    missing,
    host: process.env.SMTP_HOST ?? "(default: smtp.gmail.com)",
    port: process.env.SMTP_PORT ?? "(default: 465)",
    userSet: Boolean(process.env.SMTP_USER),
    passwordLength: config?.pass.length ?? 0,
    folderTheServerRunsIn: process.cwd(),
    envFilesFoundThere: envFiles,
    problem: !envFiles.includes(".env.local")
      ? `No ".env.local" file was found in the folder above.${typos.length ? ` You have ${typos.join(", ")} instead. Rename it to exactly .env.local (on Windows, turn on View > File name extensions to see a hidden .txt).` : " Create it there, next to package.json."}`
      : missing.length
        ? `".env.local" exists but ${missing.join(" and ")} ${missing.length > 1 ? "are" : "is"} empty or not read. Check the names (no spaces around =), save the file, and restart the server.`
        : null,
  });
}

export async function POST(request: Request): Promise<Response> {
  console.log("dddddddddddddddd", process.env)
  const { config, missing } = getMailConfig();
  if (!config) {
    const hint = `Missing environment variable(s): ${missing.join(", ")}. Add them to .env.local (local) or Vercel Environment Variables (production), then restart/redeploy.`;
    console.error(`Contact API: ${hint}`);
    return json({ error: "The email service is not configured yet.", ...(IS_DEV && { hint }) }, 503);
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return json({ error: "Too many messages. Please try again in a few minutes." }, 429);
  }

  let data: ContactPayload;
  try {
    data = (await request.json()) as ContactPayload;
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  // Honeypot: pretend success so bots move on.
  if (data.hp_contact_ref) {
    console.warn("Contact API: honeypot field was filled in; message ignored.");
    return json({ ok: true });
  }

  const name = oneLine(data.name, 100);
  const email = oneLine(data.email, 200);
  const subject = oneLine(data.subject, 150) || `Message from ${name}`;
  const message = String(data.message ?? "").trim().slice(0, 5000);

  if (!name || !EMAIL_RE.test(email) || message.length < 5) {
    return json({ error: "Please enter your name, a valid email, and a message." }, 400);
  }

  try {
    await createTransporter(config).sendMail({
      from: config.from,
      to: config.to,
      replyTo: `"${name.replace(/"/g, "")}" <${email}>`,
      subject: `${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    });
    return json({ ok: true });
  } catch (err) {
    const hint = describeMailError(err);
    console.error(`Contact API: sending failed. ${hint}`);
    return json({ error: "Sorry, the message could not be sent. Please email me directly.", ...(IS_DEV && { hint }) }, 502);
  }
}
