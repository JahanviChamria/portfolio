import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PROJECTS, PROJECT_BY_SLUG } from "@/lib/content";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECT_BY_SLUG[slug];
  if (!project) return {};
  return {
    title: `${project.name} — Jahanvi Chamria`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = PROJECT_BY_SLUG[slug];
  if (!project) notFound();

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

      <article className="detail">
        <Link className="back mono" href="/#work">
          ← Selected work
        </Link>

        <header className="detail-head">
          <span className="detail-period mono">{project.period}</span>
          <h1 className="detail-title">
            {project.name}
            {project.wip && <em className="wip">in preparation</em>}
          </h1>
          <p className="detail-summary">{project.summary}</p>
          {project.cta && (
            <Link className="detail-cta mono" href={project.cta.href}>
              {project.cta.label} →
            </Link>
          )}
        </header>

        <ul className="detail-highlights mono">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>

        {project.links && project.links.length > 0 && (
          <div className="detail-links mono">
            {project.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                {l.label} ↗
              </a>
            ))}
          </div>
        )}
      </article>

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
