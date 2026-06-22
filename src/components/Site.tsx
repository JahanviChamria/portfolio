"use client";

import { useCallback, useEffect, useState } from "react";
import type { LensKey } from "@/lib/content";
import StateVector from "./StateVector";
import LensDial from "./LensDial";
import ThreeBody from "./ThreeBody";
import Backdrop from "./Backdrop";
import Work from "./Work";

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
          <a href="#about">About</a>
          <a href="https://github.com/JahanviChamria" target="_blank" rel="noreferrer">
            GitHub
          </a>
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

      <section className="about" id="about" data-reveal>
        <span className="about-label mono">About</span>
        <div>
          <p>
            I&apos;m a physics &amp; computer science double major at Colgate
            University, working across <span className="em">electronics</span>,{" "}
            <span className="em">machine learning</span>, and{" "}
            <span className="em">experimental research</span>. The same instinct
            runs through all of it: take a system apart, model it, build it back
            better.
          </p>
          <p>
            Currently: growing peptide nanowires, building circuits, and
            teaching machines to read starlight.
          </p>
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
