import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, FileDown, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Dorchester Hair Fashions concept",
  description: "A speculative website concept showing how 50 years of local trust can become a clearer, mobile-first customer experience.",
  alternates: { canonical: "/work/dorchester-hair-fashions" }
};

export default function DorchesterCaseStudy() {
  return (
    <>
      <section className="case-hero">
        <div className="shell case-hero-grid">
          <div className="case-hero-copy">
            <span className="eyebrow eyebrow-light">Concept case study · Niagara Falls</span>
            <h1>Fifty years of trust,<br /><em>brought into focus.</em></h1>
            <p>A speculative website direction for Dorchester Hair Fashions, designed to make its heritage, services, location, and next steps easier to understand.</p>
            <div className="case-disclaimer"><Info size={17} /><span>This independent concept was not commissioned by or affiliated with the business. Public facts were used only to demonstrate our process.</span></div>
          </div>
          <div className="case-hero-stats"><div><strong>90.8</strong><span>proposed quality score</span></div><div><strong>4.0/5</strong><span>human visual review</span></div><div><strong>PASS</strong><span>comparison verdict</span></div></div>
        </div>
      </section>

      <section className="case-showcase">
        <div className="shell">
          <div className="case-browser"><div className="browser-bar"><span /><span /><span /><i>Website concept walkthrough</i></div><video controls playsInline preload="metadata" poster="/case-studies/dorchester-poster.png"><source src="/case-studies/dorchester-walkthrough.mp4" type="video/mp4" /></video></div>
        </div>
      </section>

      <section className="section case-story">
        <div className="shell case-story-grid">
          <aside><span className="eyebrow">The opportunity</span><h2>A strong local reputation deserves a clearer digital first impression.</h2></aside>
          <div>
            <p className="lead-paragraph">The core design problem was not a lack of credibility. It was making existing credibility immediately legible to someone finding the business on a phone.</p>
            <p>The concept establishes a calm hierarchy: what the salon offers, why its longevity matters, where it is located, and how to call or plan a visit. The visual system balances warmth and polish without inventing claims, testimonials, or services.</p>
            <div className="principle-grid">
              <article><span>01</span><h3>Lead with heritage</h3><p>Use the longevity signal as context for trust, not as a decorative footnote.</p></article>
              <article><span>02</span><h3>Reduce uncertainty</h3><p>Bring services, contact information, location, and hours into a scannable path.</p></article>
              <article><span>03</span><h3>Design for the phone</h3><p>Prioritize tap targets, compact proof, and a persistent next step on small screens.</p></article>
            </div>
          </div>
        </div>
      </section>

      <section className="section visual-section">
        <div className="shell visual-grid">
          <div><Image src="/case-studies/dorchester-poster.png" alt="Desktop and mobile views of the Dorchester Hair Fashions website concept" width={1600} height={900} /></div>
          <div><span className="eyebrow eyebrow-light">The visual direction</span><h2>Editorial warmth with practical clarity.</h2><p>A restrained palette, generous type, salon imagery, and structured service content make the concept feel established rather than trendy.</p><ul><li><Check size={16} />High-contrast, readable type</li><li><Check size={16} />Clear service grouping</li><li><Check size={16} />Mobile-first contact actions</li><li><Check size={16} />No invented customer claims</li></ul></div>
        </div>
      </section>

      <section className="section results-section">
        <div className="shell results-grid">
          <div><span className="eyebrow">The quality gate</span><h2>Measured against more than taste.</h2><p>The proposal passed automated and human checks before it was marked ready for review.</p><a className="text-link" href="/case-studies/dorchester-proposal.pdf" target="_blank" rel="noreferrer">Open the proposal PDF <FileDown size={17} /></a></div>
          <div className="results-table">
            {[['Overall quality', '90.8 / 100', 'Passed'], ['Human visual review', '4.0 / 5', 'Passed'], ['Critical regressions', '0', 'Passed'], ['Mobile presentation', 'Reviewed', 'Passed'], ['Accessibility gate', 'No critical failures', 'Passed']].map(([label, value, status]) => <div key={label}><span>{label}</span><strong>{value}</strong><i>{status}</i></div>)}
          </div>
        </div>
      </section>

      <section className="page-cta"><div className="shell"><div><span className="eyebrow eyebrow-light">Your business, not a template</span><h2>See what your website could become.</h2></div><Link href="/contact" className="button button-lime">Request a concept <ArrowUpRight size={17} /></Link></div></section>
    </>
  );
}
