import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import type { packages } from "@/lib/site";

export function PackageCard({ item }: { item: (typeof packages)[number] }) {
  return (
    <article className={`package-card ${item.featured ? "package-featured" : ""}`}>
      {item.featured && <span className="package-ribbon">Most selected</span>}
      <p className="package-name">{item.name}</p>
      <p className="package-price"><span>from</span>{item.price}<small>/{item.cadence}</small></p>
      <p className="package-best">{item.bestFor}</p>
      <ul>{item.includes.map((feature) => <li key={feature}><Check size={16} />{feature}</li>)}</ul>
      <Link href={`/contact?service=${item.id}`} className={`button ${item.featured ? "button-lime" : "button-ghost"}`}>Discuss {item.name} <ArrowUpRight size={16} /></Link>
    </article>
  );
}
