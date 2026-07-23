import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return <section className="simple-hero"><div className="shell simple-hero-inner"><span className="eyebrow">404</span><h1>That page didn&apos;t make the launch.</h1><p>The link may be old, or the page may have moved.</p><Link href="/" className="button button-ink"><ArrowLeft size={16} />Back home</Link></div></section>;
}
