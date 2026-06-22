"use client";

import Link from "next/link";
import type { LensKey } from "@/lib/content";
import { LENS_LABEL, PROJECTS } from "@/lib/content";

export default function Work({ lens }: { lens: LensKey }) {
  const rows = PROJECTS.filter((p) => p.order[lens] !== undefined).sort(
    (a, b) => a.order[lens]! - b.order[lens]!
  );

  return (
    <section className="work" id="work">
      <div className="section-head mono">
        <span>Selected work</span>
        <span>
          basis: <span className="basis">{LENS_LABEL[lens]}</span>
        </span>
      </div>
      <ol className="work-list" key={lens}>
        {rows.map((p, i) => (
          <li key={p.slug} style={{ animationDelay: `${i * 70}ms` }}>
            <Link className="work-row" href={`/work/${p.slug}`}>
              <span className="idx">{String(i + 1).padStart(2, "0")}</span>
              <span className="work-body">
                <span className="name">
                  {p.name}
                  {p.wip && <em className="wip">in preparation</em>}
                </span>
                <span className="sub">{p.lens[lens] ?? p.lens.all}</span>
                {p.metric && (
                  <span className="metric mono">
                    <span className="metric-value">{p.metric.value}</span>
                    {p.metric.label}
                  </span>
                )}
              </span>
              <span className="period mono">{p.period}</span>
              <span className="go mono" aria-hidden>
                ↗
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
