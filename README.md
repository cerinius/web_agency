# Agency Foundry public website

Production Next.js marketing website for the agency. This repository intentionally contains only the public website; the owner dashboard, worker, database, and Docker services remain private and run locally.

## Local development

From the repository root:

    npm install
    npm run dev

Open `http://localhost:3100`.

The form deliberately returns an error when no private delivery destination is configured. For local form delivery, copy `.env.example` to `.env.local` and configure either:

- `AGENCY_INTAKE_WEBHOOK_URL` plus the matching `INBOUND_WEBHOOK_SECRET`; or
- the existing private `DISCORD_WEBHOOK_URL` as a server-only fallback.

Do not prefix the Discord webhook or webhook secret with `NEXT_PUBLIC_`.

## Vercel deployment

1. Import this repository in Vercel.
2. Leave **Root Directory** empty; the Next.js app is at the repository root.
3. Keep the detected framework and standard install/build commands.
4. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS domain.
5. Set `DISCORD_WEBHOOK_URL` as a server-only environment variable so consultation submissions reach the private Discord channel while the worker stays local.
6. Deploy, add the custom domain, and submit one test consultation.

Do not add the dashboard password, admin token, local database values, or the local Docker `.env` to Vercel. If the private worker later gets a secured public HTTPS endpoint, `AGENCY_INTAKE_WEBHOOK_URL` and `INBOUND_WEBHOOK_SECRET` can replace the direct Discord delivery.

The production build is `npm run build`.

## Routes

- `/` — positioning, proof, process, packages, and FAQs
- `/work/dorchester-hair-fashions` — clearly labelled independent concept case study
- `/process` — delivery phases and decision boundaries
- `/pricing` — Launch, Growth, and Foundry Care packages
- `/contact` — consultation intake
- `/privacy` and `/terms` — launch-ready legal baseline

The public case-study media is copied from the worker-generated PDF and H.264 walkthrough. Replace or add case studies only when their client relationship and publication permission are accurately described.
