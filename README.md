# Vasanth V — Portfolio

Personal portfolio for **Vasanth V, Software Engineer | Full-Stack Developer**.
Built with **Next.js (App Router) + TypeScript**, React, Tailwind CSS v4, and Lucide icons. Contact messages are sent by a Next.js API route using **Nodemailer**.

## 1. Install dependencies

Requires Node.js 20.9 or newer.

```bash
npm install
```

## 2. Configure email (Nodemailer)

The contact form posts to `src/app/api/contact/route.ts`, which sends the message to your inbox over SMTP.

1. Copy the template: `cp .env.example .env.local`
2. Fill in the values in `.env.local`:

| Variable | Meaning |
| --- | --- |
| `SMTP_HOST` | SMTP server (default `smtp.gmail.com`) |
| `SMTP_PORT` | `465` (SSL) or `587` (STARTTLS) |
| `SMTP_USER` | The mailbox that sends the message |
| `SMTP_PASS` | Password for that mailbox. **For Gmail use an App Password** |
| `CONTACT_TO` | Where messages are delivered (defaults to `SMTP_USER`) |
| `MAIL_FROM` | Optional custom From header |

**Gmail App Password:** turn on 2-Step Verification for your Google account, then create an App Password at https://myaccount.google.com/apppasswords and paste the 16 characters into `SMTP_PASS`. Your normal Gmail password will not work.

`.env.local` is ignored by Git, so your credentials are never committed. They are only read on the server and are never sent to the browser.

If the variables are missing, the form shows a friendly error with an "Email me directly" link, and nothing breaks.

What the API does: validates the fields, ignores bots through a hidden honeypot field, limits each IP to 5 messages per 10 minutes (best effort), strips line breaks from headers, escapes HTML, and sets **Reply-To** to the visitor, so you can reply straight from your inbox.

### Test your email settings

```bash
npm run test:mail
```

This reads `.env.local`, tests the login, and sends a real test email to `CONTACT_TO`. If something is wrong it prints the exact reason and how to fix it. While you run `npm run dev`, the contact form also shows a "Developer hint" under the error (hints are never shown in production).

### Getting a 503 ("service unavailable")?

The server can't see `SMTP_USER` / `SMTP_PASS`. While `npm run dev` is running, open **http://localhost:3000/api/contact** in your browser. It lists which settings are missing, which `.env*` files exist in the folder the server runs in, and tells you the fix (for example, a file saved as `.env.local.txt`). It never shows your password. On Vercel, add `CONTACT_DEBUG=true` temporarily to enable the same page and detailed errors, then remove it.

### Troubleshooting

| Symptom | Fix |
| --- | --- |
| "The email service is not configured yet" | `.env.local` is missing or `SMTP_USER` / `SMTP_PASS` are empty. Restart `npm run dev` after editing it. On Vercel, add the variables and **redeploy**. |
| `Login rejected (EAUTH)` | Use a 16-character Google **App Password** (needs 2-Step Verification), not your normal password. `SMTP_USER` must be the same Gmail address. |
| `Could not reach the SMTP server` | Check `SMTP_HOST` and `SMTP_PORT` (465 = SSL, 587 = STARTTLS) and your internet connection. |
| Form says "sent" but nothing arrives | Check the Spam folder and the `CONTACT_TO` address. On Vercel, open **Logs** for the `/api/contact` function to read the error. |
| Values ignored | Put each value directly after `=` with no `#` comments on the same line. The `.env` file must be named `.env.local` and sit next to `package.json`. |

## 3. Run locally

```bash
npm run dev          # development server at http://localhost:3000
npm run typecheck    # TypeScript check (run after the first dev/build)
npm run build        # production build
npm run start        # serve the production build
npm run lint         # ESLint
npm run test:mail    # check your email settings and send a test email
```

## 4. Add your resume and photo

- **Resume:** put your resume at `public/resume.pdf` (keep the file name). The "Download Resume" button links to it.
- **Photo (optional):** save a portrait as `public/images/profile.jpg` (`.jpeg`, `.png`, or `.webp` also work). It appears automatically in the About section. Without it, a "VV" monogram is shown.

## 5. Update the content

All content lives in one typed file: **`src/data/portfolio.ts`** (the interfaces at the top describe each section, so your editor flags mistakes).

- `profile`: name, title, intro, email, phone, LinkedIn, GitHub
- `about`, `skillGroups`: About text and skill categories
- `experience`: roles, dates, bullets, technologies
- `projects`: project cards. To show buttons, add real URLs, for example `links: { github: "https://github.com/...", live: "https://..." }`. Buttons only appear when a URL is set.
- `education`, `certifications`, `awards`

## 6. Push to GitHub

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/vasanth-portfolio.git
git push -u origin main
```

## 7. Deploy on Vercel

1. Sign in at https://vercel.com with your GitHub account.
2. Click **Add New → Project** and import the repository.
3. Open **Environment Variables** and add `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, and `CONTACT_TO` (same values as `.env.local`).
4. Click **Deploy**. If you add the variables after deploying, redeploy once so they take effect.

Optionally set `NEXT_PUBLIC_SITE_URL` to your custom domain for the sitemap and Open Graph URLs (the Vercel URL is detected automatically).

## Design notes

- Font: Geist, bundled from npm through the `geist` package, so no network request is needed at build time.
- The hero numbers (3+ years, 15+ REST APIs, 1,000+ users, 80%+ test coverage) come from your resume and live in `heroStats` in `src/data/portfolio.ts`.
- Reusable styles (`card`, `btn-primary`, gradient text) are defined once in `src/app/globals.css`.

## Light and dark themes

The site opens in dark mode. The sun/moon button in the navbar switches to light mode, and the choice is remembered in the browser. Colours are CSS variables in `src/app/globals.css` (`:root` for dark, `[data-theme="light"]` for light).

## Project structure

```text
src/
├── app/
│   ├── api/contact/route.ts   # Nodemailer API route
│   ├── layout.tsx, page.tsx, globals.css, robots.ts, sitemap.ts
├── components/                # Navbar, Hero, About, Work, Education, Skills, Contact, Footer, ...
├── data/portfolio.ts          # typed content
└── lib/utils.ts
```
