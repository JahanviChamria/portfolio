export type LensKey = "research" | "ee" | "ai" | "all";

export const LENS_LABEL: Record<LensKey, string> = {
  ee: "EE",
  ai: "AI",
  research: "Research",
  all: "Everything",
};

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  name: string;
  period: string;
  /** External link shown on the detail page (repo, paper, demo). */
  href?: string;
  wip?: boolean;
  /** Headline stat surfaced as a chip on the work row. */
  metric?: { value: string; label: string };
  /** Lens-dependent subtitle; falls back to `all` when a lens has no entry. */
  lens: Partial<Record<LensKey, string>> & { all: string };
  /** Sort priority per lens; a project is hidden under lenses with no entry. */
  order: Partial<Record<LensKey, number>>;
  /** Longer prose for the project detail page. */
  summary: string;
  /** Outcome bullets for the detail page. */
  highlights: string[];
  /** External resources for the detail page. Fill in real URLs as they exist. */
  links?: ProjectLink[];
}

export const PROJECTS: Project[] = [
  {
    slug: "hydroponic-automation",
    name: "Hydroponic Automation",
    period: "2025",
    metric: { value: "1.5 yr", label: "cultivation cycle, from 3–4" },
    lens: {
      ee: "Arduino sensor network & IoT feedback control for automated cultivation",
      ai: "Closed-loop plant-health monitoring over live sensor data",
      research: "Cut vanilla cultivation from 3–4 years to 1.5 — $10k accelerator grant",
      all: "Automated hydroponic vanilla cultivation — sensors, feedback loops, a living system",
    },
    order: { ee: 1, ai: 3, research: 3, all: 1 },
    summary:
      "An automated hydroponic system for vanilla cultivation. An Arduino sensor network drives IoT feedback control over a living system — monitoring plant health on live sensor data and closing the loop on light, water, and nutrients to compress a multi-year growth cycle.",
    highlights: [
      "Cut vanilla cultivation from 3–4 years to roughly 1.5",
      "Won a $10k accelerator grant",
      "Closed-loop plant-health monitoring over live sensor data",
    ],
  },
  {
    slug: "exoplanet-detection",
    name: "Exoplanet Detection",
    period: "2023–24",
    href: "https://github.com/JahanviChamria/ExoplanetResearchProject",
    metric: { value: "96–97%", label: "detection accuracy" },
    lens: {
      ee: "Signal classification across 10,000 Kepler light-curve entries",
      ai: "Four models, 96–97% detection accuracy on NASA Kepler data",
      research: "Collaboration with IIT Bombay — eight habitability criteria",
      all: "Machine learning on NASA's Kepler archive — detection & habitability",
    },
    order: { ee: 4, ai: 1, research: 2, all: 2 },
    summary:
      "Machine learning on NASA's Kepler archive to detect exoplanets and assess habitability. Four models classify signals across 10,000 light-curve entries, reaching 96–97% detection accuracy — built in collaboration with IIT Bombay across eight habitability criteria.",
    highlights: [
      "Four models at 96–97% detection accuracy",
      "Signal classification across 10,000 Kepler light-curve entries",
      "Collaboration with IIT Bombay — eight habitability criteria",
    ],
    links: [
      {
        label: "Source on GitHub",
        href: "https://github.com/JahanviChamria/ExoplanetResearchProject",
      },
    ],
  },
  {
    slug: "peptide-nanowires",
    name: "Peptide Nanowire Research",
    period: "2024 —",
    metric: { value: "135°", label: "water contact angle" },
    lens: {
      ee: "Functional nanomaterials — SEM-verified growth on cellulose substrates",
      ai: "Python analysis pipeline across 500+ experimental datapoints",
      research: "135° water contact angle for oil–water separation — Colgate Physics & Astronomy",
      all: "Sustainable oil–water separation, Department of Physics & Astronomy",
    },
    order: { ee: 3, ai: 4, research: 1, all: 3 },
    summary:
      "Growing peptide nanowires for sustainable oil–water separation in the Colgate Department of Physics & Astronomy. SEM-verified growth on cellulose substrates, analyzed through a Python pipeline across 500+ experimental datapoints — reaching a 135° water contact angle.",
    highlights: [
      "135° water contact angle for oil–water separation",
      "SEM-verified nanowire growth on cellulose substrates",
      "Python analysis pipeline across 500+ datapoints",
    ],
  },
  {
    slug: "electronics-lab",
    name: "Electronics Lab Portfolio",
    period: "2024–26",
    wip: true,
    lens: {
      ee: "Analog & digital circuit builds — schematics, scope captures, lab reports",
      all: "Analog & digital circuit builds from the electronics lab",
    },
    order: { ee: 2, all: 5 },
    summary:
      "A growing portfolio of analog and digital circuit builds from the electronics lab — schematics, oscilloscope captures, and lab reports, documented build by build.",
    highlights: [
      "Analog and digital circuit builds",
      "Schematics, scope captures, and lab reports",
    ],
  },
  {
    slug: "alunite",
    name: "Alunite",
    period: "2025–26",
    metric: { value: "TIA", label: "Thought Into Action immersion" },
    lens: {
      ai: "Matching algorithm for alumni–student mentorship & recruiting",
      all: "An AI-driven networking platform — Thought Into Action immersion",
    },
    order: { ai: 2, all: 4 },
    summary:
      "An AI-driven networking platform built in the Thought Into Action immersion — a matching algorithm that pairs alumni and students for mentorship and recruiting.",
    highlights: [
      "Matching algorithm for alumni–student mentorship and recruiting",
      "Built in the Thought Into Action immersion",
    ],
  },
];

export const PROJECT_BY_SLUG: Record<string, Project> = Object.fromEntries(
  PROJECTS.map((p) => [p.slug, p])
);
