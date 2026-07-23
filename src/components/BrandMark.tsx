import Link from "next/link";

export function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className={`brand-mark ${light ? "brand-mark-light" : ""}`} aria-label="Agency Foundry home">
      <span className="brand-glyph" aria-hidden="true"><i /><i /><i /></span>
      <span className="brand-words"><strong>Agency</strong><strong>Foundry</strong></span>
    </Link>
  );
}
