import Link from "next/link";
import type { Metadata } from "next";
import { LAB_GROUPS, LAB_PROJECTS } from "@/lib/content";
import PyRunner from "@/components/PyRunner";

export const metadata: Metadata = {
  title: "The Lab — Jahanvi Chamria",
  description:
    "Small computational experiments — physics simulations and toy programs you can run live in the browser.",
};

export default function LabPage() {
  const runnable = LAB_PROJECTS.filter((p) => p.kind === "python");
  const linked = LAB_PROJECTS.filter((p) => p.kind === "link");
  const byGroup = (kind: "python" | "link", group: string) =>
    LAB_PROJECTS.filter((p) => p.kind === kind && p.group === group);

  return (
    <div className="container">
      <nav className="nav mono">
        <Link href="/">Jahanvi Chamria</Link>
        <div className="nav-links">
          <Link href="/#work">Work</Link>
          <Link href="/#skills">Skills</Link>
          <Link href="/#experience">Experience</Link>
          <Link href="/#about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </nav>

      <header className="lab-head">
        <Link className="back mono" href="/work/computational-physics">
          ← Computational Physics
        </Link>
        <h1 className="detail-title">
          The Lab<span className="dot">.</span>
        </h1>
        <p className="detail-summary">
          A shelf of small computational experiments — physics simulations,
          utilities, and games from years of tinkering. The Python ones run{" "}
          <span className="em">live, right here</span>: hit Run and the code
          executes in your browser through Pyodide (CPython compiled to
          WebAssembly). Everything else links to its source on GitHub.
        </p>
      </header>

      <section className="lab" id="runnable">
        <div className="section-head mono">
          <span>Runnable</span>
          <span>{runnable.length} live</span>
        </div>
        {LAB_GROUPS.python.map((group) => (
          <div className="lab-block" key={group}>
            <h2 className="lab-group mono">{group}</h2>
            <div className="lab-grid">
              {byGroup("python", group).map((p) => (
                <article className="lab-card" key={p.slug}>
                  <header className="lab-card-head">
                    <h3 className="lab-card-title">{p.title}</h3>
                    <a
                      className="lab-repo mono"
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer"
                    >
                      code ↗
                    </a>
                  </header>
                  <p className="lab-card-blurb">{p.blurb}</p>
                  <PyRunner code={p.code!} />
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="lab" id="source">
        <div className="section-head mono">
          <span>Source-only</span>
          <span>{linked.length} projects</span>
        </div>
        {LAB_GROUPS.link.map((group) => (
          <div className="lab-block" key={group}>
            <h2 className="lab-group mono">{group}</h2>
            <ul className="link-list">
              {byGroup("link", group).map((p) => (
                <li key={p.slug}>
                  <a
                    className="link-row"
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="link-body">
                      <span className="link-title">
                        {p.title}
                        {p.language && (
                          <em className="link-lang">{p.language}</em>
                        )}
                      </span>
                      <span className="link-blurb">{p.blurb}</span>
                      {p.note && <span className="link-note mono">{p.note}</span>}
                    </span>
                    <span className="go mono" aria-hidden>
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <footer className="footer mono">
        <span>© 2026 Jahanvi Chamria</span>
        <div className="footer-links">
          <a href="https://github.com/JahanviChamria" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/jahanvi-chamria/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
}
