import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Jahanvi Chamria",
  description:
    "Open a channel — reach Jahanvi Chamria by email, LinkedIn, or GitHub.",
};

const EMAIL = "jchamria@colgate.edu";

const CHANNELS = [
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  {
    label: "LinkedIn",
    value: "in/jahanvi-chamria",
    href: "https://www.linkedin.com/in/jahanvi-chamria/",
  },
  {
    label: "GitHub",
    value: "JahanviChamria",
    href: "https://github.com/JahanviChamria",
  },
];

export default function ContactPage() {
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

      <article className="detail contact">
        <Link className="back mono" href="/">
          ← Home
        </Link>

        <header className="detail-head">
          <span className="detail-period mono">Get in touch</span>
          <h1 className="detail-title">
            Open a channel<span className="dot">.</span>
          </h1>
          <p className="detail-summary">
            Researching nanomaterials, building circuits, or training models — if
            any of it overlaps with what you&apos;re working on, I&apos;d love to
            hear from you.
          </p>
        </header>

        <ul className="contact-list mono">
          {CHANNELS.map((c) => (
            <li key={c.label}>
              <a
                className="contact-row"
                href={c.href}
                target={c.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer"
              >
                <span className="contact-label">{c.label}</span>
                <span className="contact-value">{c.value}</span>
                <span className="go" aria-hidden>
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
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
