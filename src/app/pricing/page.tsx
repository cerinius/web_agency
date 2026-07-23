import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, CircleDollarSign } from "lucide-react";
import { PackageCard } from "@/components/PackageCard";
import { packages } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Straightforward starting prices for Agency Foundry website launches, growth sites, and ongoing care.",
  alternates: { canonical: "/pricing" }
};

export default function PricingPage() {
  return (
    <>
      <section className="inner-hero pricing-hero">
        <div className="shell inner-hero-grid">
          <div><span className="eyebrow">Website investment</span><h1>Clear enough to plan.<br /><em>Specific enough to trust.</em></h1></div>
          <p>Every project receives a fixed proposal after a short fit call. These starting prices help you decide whether the conversation makes sense.</p>
        </div>
      </section>

      <section className="section pricing-page-section">
        <div className="shell package-grid">{packages.map((item) => <PackageCard key={item.id} item={item} />)}</div>
      </section>

      <section className="section included-section">
        <div className="shell included-grid">
          <div><CircleDollarSign size={34} /><span className="eyebrow">Included in every launch</span><h2>The unglamorous details are part of the job.</h2></div>
          <div className="included-list">
            {["Responsive design for current devices", "Accessibility and usability review", "Technical and on-page SEO foundations", "Privacy-conscious analytics setup", "Form delivery and spam protection", "Launch coordination and post-launch checks", "Training and practical documentation", "Thirty days of launch support"].map((item) => <p key={item}><Check size={17} />{item}</p>)}
          </div>
        </div>
      </section>

      <section className="section pricing-detail-section">
        <div className="shell two-column-copy">
          <article id="care"><span className="eyebrow">Foundry Care</span><h2>Maintenance with a point of view.</h2><p>Care is not just software updates. Each month includes one useful content, SEO, or conversion improvement selected from a shared priority list.</p><p>It is month-to-month after the initial website launch, and your website remains portable.</p></article>
          <article><span className="eyebrow">Quoted separately</span><h2>When the scope needs more.</h2><p>Complex applications, ecommerce, custom photography, large migrations, multilingual content, advanced brand identity, paid-media management, and significant third-party fees receive their own line items.</p><p>You see those costs before work begins.</p></article>
        </div>
      </section>

      <section className="page-cta"><div className="shell"><div><span className="eyebrow eyebrow-light">The next step is small</span><h2>Tell us what needs to change.</h2></div><Link href="/contact" className="button button-lime">Start the fit check <ArrowUpRight size={17} /></Link></div></section>
    </>
  );
}
