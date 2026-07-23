import { NextResponse } from "next/server";
import { z } from "zod";

const IntakeSchema = z.object({
  name: z.string().trim().min(2).max(120),
  businessName: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(40).optional().transform((value) => value || undefined),
  website: z.union([z.literal(""), z.string().trim().url().max(500)]).optional().transform((value) => value || undefined),
  service: z.enum(["launch", "growth", "care", "not_sure"]),
  message: z.string().trim().min(10).max(3000),
  consentToContact: z.literal(true),
  fax: z.string().max(0).optional(),
  startedAt: z.number().int().positive()
});

export async function POST(request: Request) {
  try {
    if (!sameOrigin(request)) return NextResponse.json({ error: "This form request is not allowed." }, { status: 403 });
    const input = IntakeSchema.parse(await request.json());
    const elapsed = Date.now() - input.startedAt;
    if (elapsed < 1_500 || elapsed > 86_400_000) return NextResponse.json({ error: "Please reload the page and try again." }, { status: 400 });

    const payload = {
      name: input.name,
      businessName: input.businessName,
      email: input.email,
      phone: input.phone,
      website: input.website,
      service: input.service,
      message: input.message,
      source: "agency_website",
      consentToContact: true,
      submittedAt: new Date().toISOString()
    };

    const workerUrl = process.env.AGENCY_INTAKE_WEBHOOK_URL;
    const discordUrl = process.env.DISCORD_WEBHOOK_URL;
    let delivered = false;
    let workerError: string | undefined;

    if (workerUrl) {
      try {
        const response = await fetch(workerUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(process.env.INBOUND_WEBHOOK_SECRET ? { "x-jarvis-webhook-secret": process.env.INBOUND_WEBHOOK_SECRET } : {})
          },
          body: JSON.stringify(payload),
          signal: AbortSignal.timeout(8_000)
        });
        if (!response.ok) throw new Error(`Agency intake returned ${response.status}.`);
        delivered = true;
      } catch (error) {
        workerError = error instanceof Error ? error.message : "Agency intake failed.";
      }
    }

    if (!delivered && discordUrl) {
      const response = await fetch(discordUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          allowed_mentions: { parse: [] },
          content: [
            "**New Agency Foundry consultation request**",
            `Business: **${discordSafe(payload.businessName)}**`,
            `Contact: ${discordSafe(payload.name)} · ${discordSafe(payload.email)}${payload.phone ? ` · ${discordSafe(payload.phone)}` : ""}`,
            `Interested in: ${discordSafe(payload.service)}`,
            payload.website ? `Website: ${discordSafe(payload.website)}` : "Website: not provided",
            `Message: ${discordSafe(payload.message).slice(0, 900)}`
          ].join("\n")
        }),
        signal: AbortSignal.timeout(8_000)
      });
      if (!response.ok) throw new Error(`Discord notification returned ${response.status}.`);
      delivered = true;
    }

    if (!delivered) {
      console.error("Consultation was not delivered.", workerError || "No intake destination is configured.");
      return NextResponse.json({ error: "The form is temporarily unavailable. Please try again shortly." }, { status: 503 });
    }
    return NextResponse.json({ status: "received" }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Please check the form and complete every required field." }, { status: 400 });
    console.error("Consultation submission failed.", error);
    return NextResponse.json({ error: "The form is temporarily unavailable. Please try again shortly." }, { status: 502 });
  }
}

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  if (!origin || !host) return process.env.NODE_ENV !== "production";
  try { return new URL(origin).host === host; } catch { return false; }
}

function discordSafe(value: string): string {
  return value.replaceAll("@", "@\u200b").replaceAll("`", "'").trim();
}
