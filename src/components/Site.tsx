"use client";

import { useCallback, useEffect, useState } from "react";
import type { LensKey } from "@/lib/content";
import StateVector from "./StateVector";
import LensDial from "./LensDial";
import ThreeBody from "./ThreeBody";
import Backdrop from "./Backdrop";
import Work from "./Work";
import Skills from "./Skills";
import Timeline from "./Timeline";
import Credentials from "./Credentials";
import { EDUCATION, EXPERIENCE, INVOLVEMENT } from "@/lib/content";

export default function Site() {
  const [lens, setLens] = useState<LensKey>("all");

  // read ?lens= once on mount so shared links arrive pre-collapsed
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("lens");
    if (param === "ee" || param === "ai" || param === "research") setLens(param);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.lens = lens;
  }, [lens]);

  // parallax: publish scrollY as a CSS variable, rAF-throttled
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--sy", `${window.scrollY}px`);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // reveal sections as they scroll into view
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const choose = useCallback((next: LensKey) => {
    setLens(next);
    const url =
      next === "all"
        ? window.location.pathname
        : `${window.location.pathname}?lens=${next}`;
    window.history.replaceState(null, "", url);
  }, []);

  return (
    <>
      <Backdrop />
      <div className="container">
      <nav className="nav mono">
        <a href="/">Jahanvi Chamria</a>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#skills">Skills</a>
          <a href="#experience">Experience</a>
          <a href="#about">About</a>
          <a href="/contact">Contact</a>
        </div>
      </nav>

      <header className="hero">
        <div>
          <h1 className="hero-title reveal">
            I build<span className="dot">.</span>
          </h1>
          <div className="reveal" style={{ animationDelay: "0.15s" }}>
            <StateVector lens={lens} />
          </div>
          <div className="reveal" style={{ animationDelay: "0.3s" }}>
            <LensDial lens={lens} onChoose={choose} />
          </div>
        </div>
        <ThreeBody lens={lens} />
      </header>

      <Work lens={lens} />

      <Skills lens={lens} />

      <Timeline id="experience" title="Experience" roles={EXPERIENCE} lens={lens} />

      <Timeline
        id="involvement"
        title="Leadership & service"
        roles={INVOLVEMENT}
        lens={lens}
      />

      <Credentials />

      <section className="about" id="about" data-reveal>
        <span className="about-label mono">About</span>
        <div>
          <p>
            Physics and computer science student at Colgate University, working
            across <span className="em">electronics</span>,{" "}
            <span className="em">machine learning</span>, and{" "}
            <span className="em">experimental physics</span>.
          </p>
          <p>
            Currently researching peptide nanowires, tutoring electricity &amp;
            magnetism, and building simulations on the side.
          </p>

          <dl className="edu mono">
            <div className="edu-row">
              <dt>Degree</dt>
              <dd>{EDUCATION.degree}</dd>
            </div>
            <div className="edu-row">
              <dt>School</dt>
              <dd>{EDUCATION.school}</dd>
            </div>
            <div className="edu-row">
              <dt>GPA</dt>
              <dd>{EDUCATION.gpa}</dd>
            </div>
            <div className="edu-row">
              <dt>Graduation</dt>
              <dd>{EDUCATION.graduation}</dd>
            </div>
            <div className="edu-row">
              <dt>Coursework</dt>
              <dd>{EDUCATION.coursework.join(" · ")}</dd>
            </div>
          </dl>
        </div>
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
    </>
  );
}
