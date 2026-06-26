"use client";

import type { LensKey } from "@/lib/content";
import { LENS_LABEL, SKILL_GROUPS } from "@/lib/content";

export default function Skills({ lens }: { lens: LensKey }) {
  const measuring = lens !== "all";

  return (
    <section className="skills" id="skills" data-reveal>
      <div className="section-head mono">
        <span>Capabilities</span>
        <span>
          basis: <span className="basis">{LENS_LABEL[lens]}</span>
        </span>
      </div>

      <div className="skill-grid">
        {SKILL_GROUPS.map((group) => (
          <div className="skill-group" key={group.title}>
            <h3 className="skill-title mono">{group.title}</h3>
            <ul className="skill-set">
              {group.items.map((s) => {
                const chosen =
                  measuring && s.lenses.includes(lens as Exclude<LensKey, "all">);
                const dim = measuring && !chosen;
                return (
                  <li
                    key={s.name}
                    className={`chip${chosen ? " chosen" : ""}${dim ? " dim" : ""}`}
                  >
                    {s.name}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
