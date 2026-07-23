import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, BarChart3, Check, CircleCheck, Gauge,
  HeartHandshake, Layers3, MapPin, Search, ShieldCheck, Sparkles
} from "lucide-react";
import { SectionIntro } from "@/components/SectionIntro";
import { PackageCard } from "@/components/PackageCard";
import { packages } from "@/lib/site";

const deliverables = [
  { icon: Search, number: "01", title: "A sharper strategy", copy: "We map your services, customers, competitors, and highest-value conversion path before design begins." },
  { icon: Layers3, number: "02", title: "A site built around decisions", copy: "Every page helps a visitor understand the value, trust the business, and take the next sensible step." },
  { icon: Gauge, number: "03", title: "Proof before launch", copy: "Mobile, accessibility, speed, SEO, and conversion checks must pass before the work reaches you." },
  { icon: BarChart3, number: "04", title: "Improvement after launch", copy: "Analytics and a clear care plan turn the website into an asset that gets better instead of going stale." }
];

const process = [
  ["Discover", "We learn what you sell, who buys it, and where the current experience loses confidence."],
  ["Direction", "You see a tailored visual direction and commercial plan before committing to a full engagement."],
  ["Build", "We write, design, develop, integrate, and quality-check the complete experience."],
  ["Grow", "We launch with measurement in place, then improve the pages that matter most."]
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="availability"><span />Now booking two Niagara launches</p>
            <h1>A website should<br /><em>earn its keep.</em></h1>
            <p className="hero-lede">We design conversion-focused websites for established local service businesses—and show you a tailored direction before you commit.</p>
            <div className="hero-actions">
              <Link className="button button-lime button-large" href="/contact">Request a concept <ArrowUpRight size={18} /></Link>
              <Link className="text-link" href="/work/dorchester-hair-fashions">See a real concept <ArrowRight size={17} /></Link>
            </div>
            <div className="hero-proof">
              <div><ShieldCheck size={19} /><span><strong>Human approved</strong> before outreach or launch</span></div>
              <div><MapPin size={19} /><span><strong>Built in Niagara</strong> for service businesses</span></div>
            </div>
          </div>

          <div className="hero-stage" aria-label="Example website quality review">
            <div className="stage-note stage-note-top"><Sparkles size={15} />Tailored direction</div>
            <div className="browser-card">
              <div className="browser-bar"><span /><span /><span /><i>dorchesterhair.ca / concept</i></div>
              <Image src="/case-studies/dorchester-poster.png" alt="Dorchester Hair Fashions website concept shown on desktop and mobile" width={1600} height={900} priority />
              <div className="score-card">
                <div className="score-ring"><strong>90.8</strong><span>/100</span></div>
                <div><b>Quality gate passed</b><span>Mobile · accessibility · conversion</span></div>
                <CircleCheck size={23} />
              </div>
            </div>
            <div className="stage-note stage-note-bottom"><Check size={15} />See it before you sign</div>
          </div>
        </div>
        <div className="shell hero-marquee" aria-label="Services">
          <span>Strategy</span><i /> <span>Conversion design</span><i /> <span>Local SEO</span><i /> <span>Next.js development</span><i /> <span>Ongoing care</span>
        </div>
      </section>

      <section className="section problem-section">
        <div className="shell problem-grid">
          <SectionIntro eyebrow="The real problem" title="Your reputation is strong. The website hasn't caught up." copy="A dated or generic website creates hesitation at the exact moment a potential customer is deciding whom to trust. We close that gap." />
          <div className="problem-list">
            {[
              ["Your best services are hard to understand", "Visitors should know what you do, where you work, and why you are the right fit within seconds."],
              ["Proof is present, but not persuasive", "Reviews, experience, guarantees, and real work need structure—not a crowded wall of claims."],
              ["The next step asks for too much", "Calls, quote requests, and bookings should feel obvious and low-friction on every device."]
            ].map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="section foundry-section">
        <div className="shell">
          <SectionIntro eyebrow="What changes" title="A complete front door for the business." copy="Not decoration. A clear, credible experience that turns good local reputation into more confident inquiries." light />
          <div className="deliverable-grid">
            {deliverables.map((item) => {
              const Icon = item.icon;
              return <article key={item.title} className="deliverable-card"><span className="deliverable-number">{item.number}</span><Icon size={26} /><h3>{item.title}</h3><p>{item.copy}</p></article>;
            })}
          </div>
        </div>
      </section>

      <section className="section work-section">
        <div className="shell">
          <SectionIntro eyebrow="Proof, not promises" title="See how the thinking becomes a website." copy="A speculative redesign for a long-standing Niagara business, built and tested through the same quality system we use for client work." />
          <article className="case-feature">
            <div className="case-media">
              <video controls playsInline preload="metadata" poster="/case-studies/dorchester-poster.png" aria-label="Walkthrough of Dorchester Hair Fashions website concept">
                <source src="/case-studies/dorchester-walkthrough.mp4" type="video/mp4" />
              </video>
              <span className="concept-label">Independent concept · not commissioned</span>
            </div>
            <div className="case-copy">
              <span className="eyebrow">Dorchester Hair Fashions</span>
              <h3>Making 50 years of local trust feel visible online.</h3>
              <p>The concept reorganizes services, heritage, location details, and booking actions into a calmer, mobile-first experience.</p>
              <dl>
                <div><dt>90.8</dt><dd>internal quality score</dd></div>
                <div><dt>4.0/5</dt><dd>human visual review</dd></div>
                <div><dt>0</dt><dd>critical QA regressions</dd></div>
              </dl>
              <Link href="/work/dorchester-hair-fashions" className="text-link">Read the case study <ArrowRight size={17} /></Link>
            </div>
          </article>
        </div>
      </section>

      <section className="section process-preview">
        <div className="shell process-layout">
          <div className="process-sticky">
            <SectionIntro eyebrow="A visible process" title="No black box. No big reveal." copy="You always know what has been learned, what is being decided, and what must pass before launch." />
            <Link href="/process" className="button button-ink">See the full process <ArrowUpRight size={16} /></Link>
          </div>
          <div className="process-steps">
            {process.map(([title, copy], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="section packages-section">
        <div className="shell">
          <SectionIntro eyebrow="Clear engagements" title="A defined scope, with room to grow." copy="Prices are starting points in Canadian dollars. After a short fit call, you receive a fixed proposal before work begins." />
          <div className="package-grid">{packages.map((item) => <PackageCard key={item.id} item={item} />)}</div>
          <p className="pricing-note">No long-term lock-in. Third-party software, domain, ad spend, and extensive photography are quoted separately when needed.</p>
        </div>
      </section>

      <section className="section care-section">
        <div className="shell care-grid">
          <div className="care-icon"><HeartHandshake size={42} /></div>
          <div><span className="eyebrow eyebrow-light">After launch</span><h2>The finish line is really a starting line.</h2></div>
          <div><p>Foundry Care keeps the site secure, current, measured, and improving—one useful change at a time.</p><Link href="/pricing#care" className="text-link text-link-light">Explore ongoing care <ArrowRight size={17} /></Link></div>
        </div>
      </section>

      <section className="section faq-section">
        <div className="shell faq-grid">
          <SectionIntro eyebrow="Good questions" title="What clients usually want to know." />
          <div className="faq-list">
            {[
              ["Do you really create a concept before I sign?", "For qualified projects, yes. We prepare a focused visual direction and opportunity brief—not a complete free website—so you can judge the thinking before committing."],
              ["How long does a website take?", "Most Launch projects take four to six weeks after content and access are available. Growth projects usually take six to ten weeks."],
              ["Will you guarantee leads or Google rankings?", "No responsible agency can. We build the technical, content, and conversion foundations, measure what happens, and improve from evidence."],
              ["Can you use my existing brand and domain?", "Absolutely. We can work within an established identity, refine an incomplete one, and coordinate domain or hosting changes with a safe launch plan."]
            ].map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}
          </div>
        </div>
      </section>
    </>
  );
}
