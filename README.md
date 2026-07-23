# Agency Foundry public website

Production Next.js website for the agency itself. It is separate from the private owner console and is ready for Vercel.

## Local development

From the repository root:

    pnpm install
    pnpm site:dev

Open `http://localhost:3100`.

The form deliberately returns an error when no private delivery destination is configured. For local form delivery, copy `.env.example` to `.env.local` in this directory and configure either:

- `AGENCY_INTAKE_WEBHOOK_URL` plus the matching `INBOUND_WEBHOOK_SECRET`; or
- the existing private `DISCORD_WEBHOOK_URL` as a server-only fallback.

Do not prefix the Discord webhook or webhook secret with `NEXT_PUBLIC_`.

## Vercel deployment

1. Import the repository in Vercel.
2. Set **Root Directory** to `apps/agency-site`.
3. Keep the detected framework as Next.js and the standard install/build commands.
4. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS domain.
5. Configure `AGENCY_INTAKE_WEBHOOK_URL` and `INBOUND_WEBHOOK_SECRET` if the worker has a public HTTPS endpoint. Otherwise configure `DISCORD_WEBHOOK_URL` for direct private notifications.
6. Deploy, add the custom domain, and submit one test consultation.

The production build is `pnpm site:build` from the repository root or `pnpm build` from this directory.

## Routes

- `/` — positioning, proof, process, packages, and FAQs
- `/work/dorchester-hair-fashions` — clearly labelled independent concept case study
- `/process` — delivery phases and decision boundaries
- `/pricing` — Launch, Growth, and Foundry Care packages
- `/contact` — consultation intake
- `/privacy` and `/terms` — launch-ready legal baseline

The public case-study media is copied from the worker-generated PDF and H.264 walkthrough. Replace or add case studies only when their client relationship and publication permission are accurately described.
