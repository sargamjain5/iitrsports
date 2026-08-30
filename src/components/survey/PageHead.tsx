import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import Reveal from "./Reveal";

/* ============================================================
   PAGE HEAD
   Breadcrumb + eyebrow + title + lead, shared by most pages.
   ============================================================ */

export type Crumb = { label: string; href?: string };

export default function PageHead({
  crumbs,
  eyebrow,
  title,
  lead,
  children,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="wrap">
      <div className="page-head">
        <Reveal className="crumb">
          {crumbs.map((c, i) => (
            <Fragment key={`${c.label}-${i}`}>
              {i > 0 && " / "}
              {c.href ? (
                <Link href={c.href}>{c.label}</Link>
              ) : (
                <span style={{ color: "var(--ink)" }}>{c.label}</span>
              )}
            </Fragment>
          ))}
        </Reveal>

        {eyebrow && (
          <Reveal className="eyebrow" style={{ margin: "14px 0 12px" }}>
            {eyebrow}
          </Reveal>
        )}

        <Reveal as="h1" className="title">
          {title}
        </Reveal>

        {lead && <Reveal as="p" className="lead">{lead}</Reveal>}

        {children}
      </div>
    </div>
  );
}
