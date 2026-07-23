"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";

type Status = { tone: "idle" | "sending" | "success" | "error"; message?: string };

export function ConsultationForm({ defaultService = "not_sure" }: { defaultService?: string }) {
  const startedAt = useRef(0);
  const [status, setStatus] = useState<Status>({ tone: "idle" });

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function submit(formData: FormData) {
    setStatus({ tone: "sending" });
    const payload = Object.fromEntries(formData.entries());
    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, consentToContact: payload.consentToContact === "on", startedAt: startedAt.current })
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || "Your request could not be sent.");
      setStatus({ tone: "success", message: "Your note is in. We’ll review the fit and reply within two business days." });
    } catch (error) {
      setStatus({ tone: "error", message: error instanceof Error ? error.message : "Your request could not be sent." });
    }
  }

  if (status.tone === "success") {
    return <div className="form-success" role="status"><CheckCircle2 size={34} /><h2>Thank you.</h2><p>{status.message}</p></div>;
  }

  return (
    <form className="consultation-form" action={submit}>
      <div className="form-row"><label>Your name<input name="name" required minLength={2} autoComplete="name" /></label><label>Business name<input name="businessName" required minLength={2} autoComplete="organization" /></label></div>
      <div className="form-row"><label>Email<input type="email" name="email" required autoComplete="email" /></label><label>Phone <small>optional</small><input type="tel" name="phone" autoComplete="tel" /></label></div>
      <label>Current website <small>optional</small><input type="url" name="website" placeholder="https://" autoComplete="url" /></label>
      <label>What are you considering?
        <select name="service" defaultValue={["launch", "growth", "care", "not_sure"].includes(defaultService) ? defaultService : "not_sure"}>
          <option value="not_sure">Not sure yet</option><option value="launch">Launch website — from $4,800</option><option value="growth">Growth website — from $7,500</option><option value="care">Ongoing care — from $349/month</option>
        </select>
      </label>
      <label>What needs to change?<textarea name="message" required minLength={10} rows={6} placeholder="Tell us about the business, the current website, and what a better result would look like." /></label>
      <label className="honeypot" aria-hidden="true">Fax<input name="fax" tabIndex={-1} autoComplete="off" /></label>
      <label className="consent"><input type="checkbox" name="consentToContact" required /><span>I agree that Agency Foundry may contact me about this request. See the <a href="/privacy">privacy policy</a>.</span></label>
      {status.tone === "error" && <p className="form-error" role="alert">{status.message}</p>}
      <button className="button button-lime button-large" disabled={status.tone === "sending"}>{status.tone === "sending" ? <><LoaderCircle className="spin" size={18} />Sending</> : <>Send request <ArrowRight size={18} /></>}</button>
      <p className="form-fineprint">No mailing list. No hard sell. A human reviews every request.</p>
    </form>
  );
}
