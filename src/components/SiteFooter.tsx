import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { BrandMark } from "./BrandMark";
import { navigation, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-lead">
        <div>
          <span className="eyebrow eyebrow-light">Ready when you are</span>
          <h2>Give your best work<br />a better front door.</h2>
        </div>
        <Link className="button button-lime" href="/contact">Start a conversation <ArrowUpRight size={18} /></Link>
      </div>
      <div className="shell footer-grid">
        <div>
          <BrandMark light />
          <p className="footer-blurb">Focused websites and steady improvements for local service businesses that have outgrown “good enough.”</p>
          <p className="footer-location"><MapPin size={15} />{site.location}</p>
        </div>
        <div>
          <p className="footer-label">Explore</p>
          {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </div>
        <div>
          <p className="footer-label">What we build</p>
          <span>Lead-generation websites</span>
          <span>Service & location pages</span>
          <span>Quote and booking flows</span>
          <span>Care and optimization</span>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Agency Foundry</span>
        <div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
      </div>
    </footer>
  );
}
