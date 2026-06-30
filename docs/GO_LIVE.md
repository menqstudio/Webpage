# MenQ — Go Live

Step-by-step from the current state to a fully working app (locally and in production).

## A. Run the full stack locally (with database + admin)

The public site already runs with no setup. To enable persistence + the admin panel:

```bash
# 1) Start a local Postgres (Docker) — maps host 5433 → container 5432
docker compose up -d

# 2) .env.local already has:
#    DATABASE_URL=postgresql://menq:menq@localhost:5433/menq

# 3) Create tables + seed roles/permissions/super-admin
npm run db:migrate      # name it e.g. "init"
npm run db:seed

# 4) Run the app
npm run dev
```

- Sign in at **http://localhost:3000/admin/login**
  - email: `admin@menq.local`  ·  password: `ChangeMe123!`  (from `.env.local`)
- Submit the landing lead form → it persists and shows in **/admin/leads**.
- Inspect data with `npm run db:studio`.

> Without `DATABASE_URL` the app stays in graceful mode: the lead form validates and
> dev-logs, the admin redirects to login. Set the URL to unlock everything.

## B. Lead notifications (Email + Telegram)

Fill these in `.env.local` (then restart):

- **Email (SMTP):** `EMAIL_FROM`, `EMAIL_TO_LEADS`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`.
  (Gmail: use an App Password. Or use a provider like Resend with their SMTP creds.)
- **Telegram:** create a bot via **@BotFather** → `TELEGRAM_BOT_TOKEN`; get the chat id
  (e.g. message the bot, then read `https://api.telegram.org/bot<token>/getUpdates`) → `TELEGRAM_LEADS_CHAT_ID`.

Leads always save first; notifications are best-effort and their status shows on the lead.

## C. Analytics + booking (optional)

- `NEXT_PUBLIC_GA4_ID` / `NEXT_PUBLIC_GTM_ID` → analytics turns on automatically.
- `NEXT_PUBLIC_CALENDLY_URL` → a "Book a call" button appears in the CTA.

## D. Production deploy (Vercel + managed Postgres)

1. Create a Postgres DB (Neon / Supabase / Vercel Postgres) → copy its `DATABASE_URL`.
2. Push the repo to GitHub, import into **Vercel**.
3. Set **all** env vars from `.env.example` in Vercel (use a fresh `AUTH_SECRET`,
   `NEXT_PUBLIC_APP_URL=https://yourdomain`, real SMTP/Telegram, etc.).
4. First deploy runs `postinstall` → `prisma generate`. Then run once against prod DB:
   ```bash
   npm run db:deploy   # apply migrations
   npm run db:seed     # seed roles + super admin (set ADMIN_PASSWORD first!)
   ```
5. Point your domain at Vercel, enable HTTPS (automatic).
6. Smoke test: submit a lead, confirm Email + Telegram, sign into `/admin`.

## E. Before launch — replace placeholders

- `src/config/contact.ts` — real phone, email, Telegram, WhatsApp, socials.
- `src/config/site.ts` — brand name / legal name if not "MenQ".
- Certificates: keep general wording until real certs are ready (`Trust` section).
- Final EN/RU legal copy if needed (`src/content/locales/*` → `legal`).
- Change the seeded super-admin password.

See `docs/buildpack/OPEN_ITEMS_LOG.md` for the full placeholder list and
`docs/BUILD_LOG.md` for the build history.
