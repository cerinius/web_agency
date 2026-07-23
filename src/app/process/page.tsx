import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, Code2, Compass, Gauge, MessagesSquare, PenTool, Rocket, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Process",
  description: "A transparent website process from opportunity research and visual direction through launch and ongoing improvement.",
  alternates: { canonical: "/process" }
};

const phases = [
  {
    icon: Search,
    number: "01",
    title: "Fit and opportunity",
    timing: "Before engagement",
    copy: "We confirm that the business, problem, and economics are a genuine fit. Then we review the current website, local market, public proof, and conversion path.",
    outputs: ["Opportunity brief", "Current-site review", "Project recommendation"]
  },
  {
    icon: Compass,
    number: "02",
    title: "Direction before commitment",
    timing: "1–3 business days",
    copy: "Qualified businesses see a focused concept direction and plain-language plan. It is enough to judge our thinking without pretending the whole project can be designed for free.",
    outputs: ["Visual direction", "Homepage concept", "Fixed-scope proposal"]
  },
  {
    icon: MessagesSquare,
    number: "03",
    title: "Discovery and content",
    timing: "Week 1",
    copy: "A working session turns owner knowledge into a page plan, content priorities, proof inventory, integrations, and measurable launch goals.",
    outputs: ["Sitemap", "Content plan", "Conversion goals"]
  },
  {
    icon: PenTool,
    number: "04",
    title: "Design the full experience",
    timing: "Weeks 2–3",
    copy: "We design the key desktop and mobile journeys around real content. Feedback happens in focused rounds with clear decisions, not endless preference polls.",
    outputs: ["Responsive designs", "Reusable visual system", "Approved content"]
  },
  {
    icon: Code2,
    number: "05",
    title: "Build and integrate",
    timing: "Weeks 3–5",
    copy: "The approved experience becomes a fast, accessible Next.js website with quote, booking, analytics, CRM, and local-search foundations as required.",
    outputs: ["Production website", "Forms and integrations", "Analytics events"]
  },
  {
    icon: Gauge,
    number: "06",
    title: "Comparison and quality gate",
    timing: "Before launch",
    copy: "The proposed site is tested against the current experience. Critical functionality, accessibility, mobile presentation, SEO basics, and conversion clarity must pass.",
    outputs: ["Quality report", "Desktop and mobile captures", "Owner approval gate"]
  },
  {
    icon: Rocket,
    number: "07",
    title: "Launch and improve",
    timing: "Launch + 30 days",
    copy: "We coordinate domain changes, monitor the release, verify measurement, and leave a prioritized improvement plan based on real visitor behaviour.",
    outputs: ["Safe launch", "Measurement verification", "Growth backlog"]
  }
];

export default function ProcessPage() {
  return (
    <>
      <section className="inner-hero inner-hero-dark">
        <div className="shell inner-hero-grid">
          <div><span className="eyebrow eyebrow-light">How the work works</span><h1>A visible process.<br /><em>Fewer surprises.</em></h1></div>
          <p>Strategy, design, development, and quality assurance stay connected from the first opportunity review to the first month after launch.</p>
        </div>
      </section>

      <section className="section process-page-section">
        <div className="shell phase-list">
          {phases.map((phase) => {
            const Icon = phase.icon;
            return <article key={phase.number} className="phase-row">
              <div className="phase-number">{phase.number}</div>
              <div className="phase-icon"><Icon size={24} /></div>
              <div className="phase-main"><span>{phase.timing}</span><h2>{phase.title}</h2><p>{phase.copy}</p></div>
              <ul>{phase.outputs.map((output) => <li key={output}><Check size={15} />{output}</li>)}</ul>
            </article>;
          })}
        </div>
      </section>

      <section className="section decision-section">
        <div className="shell decision-grid">
          <div><span className="eyebrow">What keeps projects healthy</span><h2>Good boundaries make better work.</h2></div>
          <div className="decision-cards">
            <article><strong>One accountable decision-maker</strong><p>Feedback is consolidated before each review, so the project does not drift through conflicting opinions.</p></article>
            <article><strong>Real content, early</strong><p>Design follows the actual services, proof, and customer questions—not placeholder words that collapse later.</p></article>
            <article><strong>Evidence over preference</strong><p>Decisions connect back to audience needs, business goals, usability, and measured performance.</p></article>
          </div>
        </div>
      </section>

      <section className="page-cta"><div className="shell"><div><span className="eyebrow eyebrow-light">Have a project in mind?</span><h2>Start with the opportunity.</h2></div><Link href="/contact" className="button button-lime">Request a concept <ArrowUpRight size={17} /></Link></div></section>
    </>
  );
}
