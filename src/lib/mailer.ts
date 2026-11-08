import nodemailer, { type Transporter } from "nodemailer";

export interface MailConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  to: string;
  from: string;
}

export interface MailConfigResult {
  config: MailConfig | null;
  /** Names of required environment variables that are missing or empty. */
  missing: string[];
}

/** Trim, drop surrounding quotes and any trailing "  # comment" that slipped into a value. */
const clean = (value: string | undefined): string =>
  (value ?? "").replace(/\s+#.*$/, "").trim().replace(/^["']|["']$/g, "").trim();

/** Reads and validates the SMTP settings from the environment. */
export function getMailConfig(env: NodeJS.ProcessEnv = process.env): MailConfigResult {
  const host = clean(env.SMTP_HOST) || "smtp.gmail.com";
  const port = parseInt(clean(env.SMTP_PORT), 10) || 465;
  const user = clean(env.SMTP_USER);
  // Google shows App Passwords as "abcd efgh ijkl mnop"; the spaces are not part of the password.
  const pass = clean(env.SMTP_PASS).replace(/\s+/g, "");

  const missing: string[] = [];
  if (!user) missing.push("SMTP_USER");
  if (!pass) missing.push("SMTP_PASS");
  if (missing.length > 0) return { config: null, missing };

  const to = clean(env.CONTACT_TO) || user;
  const from = clean(env.MAIL_FROM) || `"Portfolio Contact" <${user}>`;
  return { config: { host, port, secure: port === 465, user, pass, to, from }, missing };
}

export function createTransporter(config: MailConfig): Transporter {
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure, // true for 465 (SSL); 587 upgrades with STARTTLS
    requireTLS: !config.secure && config.port === 587,
    auth: { user: config.user, pass: config.pass },
    // Fail fast instead of hanging until the serverless function times out.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
}

/** Turns a Nodemailer error into a plain-English hint for the logs (and for you while developing). */
export function describeMailError(err: unknown): string {
  const e = err as { code?: string; responseCode?: number; message?: string } | undefined;
  const code = e?.code ?? "";
  const message = e?.message ?? "Unknown error";

  if (code === "EAUTH" || e?.responseCode === 535 || e?.responseCode === 534) {
    return "Login rejected (EAUTH). For Gmail, turn on 2-Step Verification and use a 16-character App Password in SMTP_PASS (not your normal password), and make sure SMTP_USER is the same Gmail address.";
  }
  if (["ECONNECTION", "ECONNREFUSED", "ETIMEDOUT", "ESOCKET", "ENOTFOUND", "EDNS"].includes(code)) {
    return `Could not reach the SMTP server (${code}). Check SMTP_HOST and SMTP_PORT (465 = SSL, 587 = STARTTLS) and your internet connection.`;
  }
  if (code === "EENVELOPE") {
    return "The sender or recipient address was rejected. Check CONTACT_TO and SMTP_USER.";
  }
  return `${code ? `${code}: ` : ""}${message}`;
}
