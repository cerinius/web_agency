import type { Metadata } from "next";
import { Suspense } from "react";
import { Clock3, MapPin, ShieldCheck } from "lucide-react";
import { ConsultationForm } from "@/components/ConsultationForm";

export const metadata: Metadata = {
  title: "Request a concept",
  description: "Tell Agency Foundry what needs to change. Qualified local service businesses receive a focused opportunity review and concept direction.",
  alternates: { canonical: "/contact" }
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const params = await searchParams;
  return (
    <section className="contact-page">
      <div className="shell contact-grid">
        <div className="contact-copy">
          <span className="eyebrow eyebrow-light">Start with a useful conversation</span>
          <h1>What should your website be doing better?</h1>
          <p>Share the current situation. If the project is a fit, we will reply with the most valuable next step—not a generic sales deck.</p>
          <div className="contact-expectations">
            <div><Clock3 size={20} /><span><strong>Two business days</strong>Typical response time</span></div>
            <div><MapPin size={20} /><span><strong>Niagara + Southern Ontario</strong>Initial service area</span></div>
            <div><ShieldCheck size={20} /><span><strong>Human reviewed</strong>No automatic sales sequence</span></div>
          </div>
        </div>
        <div className="form-card">
          <Suspense fallback={<p>Loading form…</p>}><ConsultationForm defaultService={params.service} /></Suspense>
        </div>
      </div>
    </section>
  );
}
