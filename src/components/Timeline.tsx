"use client";

import type { LensKey, Role } from "@/lib/content";
import { LENS_LABEL } from "@/lib/content";

interface Props {
  id: string;
  title: string;
  roles: Role[];
  lens: LensKey;
}

export default function Timeline({ id, title, roles, lens }: Props) {
  const measuring = lens !== "all";

  return (
    <section className="timeline" id={id} data-reveal>
      <div className="section-head mono">
        <span>{title}</span>
        <span>
          basis: <span className="basis">{LENS_LABEL[lens]}</span>
        </span>
      </div>

      <ol className="role-list">
        {roles.map((r) => {
          const chosen =
            measuring && r.lenses.includes(lens as Exclude<LensKey, "all">);
          const dim = measuring && !chosen;
          return (
            <li
              key={`${r.role}-${r.org}`}
              className={`role${chosen ? " chosen" : ""}${dim ? " dim" : ""}`}
            >
              <span className="role-period mono">{r.period}</span>
              <span className="role-body">
                <span className="role-title">{r.role}</span>
                <span className="role-org mono">{r.org}</span>
                <span className="role-note">{r.note}</span>
              </span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
