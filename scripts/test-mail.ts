/**
 * Checks your email settings from the terminal:  npm run test:mail
 * Reads .env.local exactly like Next.js does, tests the login, then sends a real test email.
 */
import { loadEnvConfig } from "@next/env";
import { createTransporter, describeMailError, getMailConfig } from "../src/lib/mailer";

loadEnvConfig(process.cwd());

async function main(): Promise<void> {
  const { config, missing } = getMailConfig();
  if (!config) {
    console.error(`\n✗ Missing in .env.local: ${missing.join(", ")}\n  Copy .env.example to .env.local and fill them in.\n`);
    process.exit(1);
  }

  console.log("\nUsing these settings:");
  console.log(`  host: ${config.host}   port: ${config.port} (${config.secure ? "SSL" : "STARTTLS"})`);
  console.log(`  user: ${config.user}   to: ${config.to}`);
  console.log(`  password: ${config.pass.length} characters (a Gmail App Password has 16)\n`);

  const transporter = createTransporter(config);

  try {
    await transporter.verify();
    console.log("✓ Connected and logged in to the SMTP server.");
  } catch (err) {
    console.error(`✗ Login/connection failed.\n  ${describeMailError(err)}\n`);
    process.exit(1);
  }

  try {
    await transporter.sendMail({
      from: config.from,
      to: config.to,
      subject: "[Portfolio] Test email",
      text: "If you can read this, your portfolio contact form email settings work.",
    });
    console.log(`✓ Test email sent to ${config.to}. Check your inbox (and spam folder).\n`);
  } catch (err) {
    console.error(`✗ Sending failed.\n  ${describeMailError(err)}\n`);
    process.exit(1);
  }
}

void main();
