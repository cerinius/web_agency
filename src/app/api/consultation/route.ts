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
      deliveryId: await createDeliveryId(input),
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
      const fields = [
        { name: "Delivery ID", value: payload.deliveryId, inline: false },
        { name: "Name", value: payload.name, inline: true },
        { name: "Business", value: payload.businessName, inline: true },
        { name: "Email", value: payload.email, inline: false },
        { name: "Service", value: payload.service, inline: true },
        { name: "Submitted at", value: payload.submittedAt, inline: false }
      ];
      if (payload.phone) fields.splice(4, 0, { name: "Phone", value: payload.phone, inline: true });
      if (payload.website) fields.splice(fields.length - 2, 0, { name: "Website", value: payload.website, inline: false });
      const response = await fetch(discordUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          allowed_mentions: { parse: [] },
          content: "**New Agency Foundry consultation request**",
          embeds: [{
            title: payload.businessName,
            description: payload.message,
            color: 0xf15a4a,
            fields,
            footer: { text: "agency-foundry-consultation:v1" },
            timestamp: payload.submittedAt
          }]
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

async function createDeliveryId(input: z.infer<typeof IntakeSchema>): Promise<string> {
  const source = JSON.stringify([
    input.email.toLowerCase(),
    input.businessName.toLowerCase(),
    input.message,
    input.startedAt
  ]);
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(source));
  const hex = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
  return `afc_${hex.slice(0, 32)}`;
}

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  if (!origin || !host) return process.env.NODE_ENV !== "production";
  try { return new URL(origin).host === host; } catch { return false; }
}
