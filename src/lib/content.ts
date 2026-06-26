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
  /** Internal call-to-action rendered as a prominent button (e.g. the live Lab). */
  cta?: ProjectLink;
}

export const PROJECTS: Project[] = [
  {
    slug: "hydroponic-automation",
    name: "Hydroponic Automation",
    period: "2025",
    metric: { value: "1.5 yr", label: "growth cycle, down from 3–4" },
    lens: {
      ee: "Arduino sensors and IoT controls that run the grow cycle on their own",
      ai: "Plant health tracked in real time from live sensor data",
      research: "Cut vanilla growing time from 3–4 years to 1.5, and won a $10k grant",
      all: "Automated hydroponic vanilla farming, run by sensors instead of people",
    },
    order: { ee: 1, ai: 3, research: 3, all: 1 },
    summary:
      "An automated system for growing vanilla without anyone tending it by hand. Arduino sensors track humidity, CO₂, and nutrient levels, and the system adjusts light, water, and feeding on its own so the plants stay healthy on their own schedule. The goal was to take a growth cycle that normally runs several years and make it practical. It started as a balcony prototype and is scaling toward a 400 sq m facility holding about 1,000 plants.",
    highlights: [
      "Brought vanilla growing time down from 3–4 years to about 1.5",
      "Won a $10,000 TIA Summer Accelerator grant, plus $700 at the Entrepreneur Showcase",
      "Sensors track humidity, CO₂, and nutrients so plant health is watched in real time",
    ],
  },
  {
    slug: "exoplanet-detection",
    name: "Exoplanet Detection",
    period: "2023–24",
    href: "https://github.com/JahanviChamria/ExoplanetResearchProject",
    metric: { value: "97%", label: "detection accuracy" },
    lens: {
      ee: "Sorting real planets from noise across 10,000 Kepler readings",
      ai: "Four models, up to 97% accuracy on NASA Kepler data",
      research: "Built with a mentor at IIT Bombay, with eight habitability checks",
      all: "Machine learning on NASA's Kepler data to find planets and judge if they could be livable",
    },
    order: { ee: 4, ai: 1, research: 2, all: 2 },
    summary:
      "Machine learning on NASA's Kepler data to find exoplanets and judge whether they could support life. I worked through about 10,000 entries using 10 atmospheric and stellar features, trained four models (Logistic Regression, Random Forest, K-Nearest Neighbors, and Decision Tree), and got the best results from Random Forest at around 97% accuracy. I also built a habitability check using eight criteria like radiative flux and equilibrium temperature, plus a small tool where you enter a planet's details and get a prediction back. Done with mentorship from a PhD researcher at IIT Bombay.",
    highlights: [
      "Up to 97% accuracy detecting planets, with Random Forest as the best model",
      "Worked through ~10,000 Kepler entries and flagged ~4,000 confirmed planets",
      "Built a habitability check (eight criteria) and a tool to score any planet you enter",
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
    period: "2024 –",
    metric: { value: "135°", label: "water contact angle" },
    lens: {
      ee: "Growing functional nanomaterials, confirmed under an electron microscope",
      ai: "Python analysis across 500+ experimental datapoints",
      research: "135° water contact angle for oil-water separation, Colgate Physics & Astronomy",
      all: "Growing nanowires to pull oil out of water, in the Physics & Astronomy lab",
    },
    order: { ee: 3, ai: 4, research: 1, all: 3 },
    summary:
      "Research in the Colgate Physics & Astronomy department on growing peptide nanowires on cellulose sponges, as a cheaper and more sustainable way to separate oil from water. I confirmed the nanowires grew densely using a scanning electron microscope (SEM), reached a 135° water contact angle (close to fully water-repellent), and showed it kept working across the full pH range and in salt water up to 5 g/L. I checked that it held up over 10 absorption cycles and 2+ hours of continuous use, and analyzed all 500+ datapoints in Python. Presented at the Colgate Physics & Astronomy Seminar.",
    highlights: [
      "Reached a 135° water contact angle, close to fully water-repellent",
      "Held up across pH 0–14, salt water to 5 g/L, and 10 reuse cycles",
      "Confirmed dense growth by SEM and analyzed 500+ datapoints in Python",
    ],
  },
  {
    slug: "electronics-lab",
    name: "Electronics Lab Portfolio",
    period: "2024–26",
    wip: true,
    lens: {
      ee: "Analog and digital circuits, with schematics, scope traces, and write-ups",
      all: "Circuits I've built in the electronics lab",
    },
    order: { ee: 2, all: 5 },
    summary:
      "A growing set of analog and digital circuits I've built in the electronics lab, with the schematics, oscilloscope captures, and lab write-ups for each one. I add to it build by build.",
    highlights: [
      "Analog and digital circuit builds",
      "Schematics, scope captures, and lab write-ups for each",
    ],
  },
  {
    slug: "computational-physics",
    name: "Computational Physics & Simulations",
    period: "2023 –",
    metric: { value: "40+", label: "projects built" },
    lens: {
      ee: "Low-level builds, including an ARM assembly simulator in C",
      ai: "Small apps in Java and C: Wordle, an AI Pong clone, a Shakespeare text generator",
      research: "40+ Python projects that simulate and visualize physics",
      all: "40+ projects: physics simulations and small apps I built to learn by making things",
    },
    order: { ee: 5, ai: 5, research: 4, all: 6 },
    summary:
      "A long-running pile of 40+ projects I built to teach myself by making things. Most are Python simulations that model and visualize physical phenomena, checked against the analytical answers. The rest are small interactive apps in Java and C: Wordle, an AI Pong clone, a Sudoku solver, an ARM assembly simulator, and a Shakespeare-style text generator. A couple of favorites: modeling the urban heat island effect in R across 1,300+ satellite files and 25 years of data, and a pixel-by-pixel recreation of Monet's The Bench in p5.js.",
    highlights: [
      "40+ Python simulations of physical phenomena, checked against the math",
      "Interactive builds in Java and C: Wordle, an AI Pong clone, Sudoku, an ARM assembly simulator",
      "An urban-heat-island model in R (1,300+ files, 25 years) and a generative Monet painting in p5.js",
    ],
    cta: { label: "Open the Lab and run the code live", href: "/lab" },
  },
  {
    slug: "physiome-blog",
    name: "Physiome Science Blog",
    period: "2023",
    lens: {
      ai: "Designed and built the whole site in HTML, CSS, and JavaScript",
      research: "Turning peer-reviewed biophysics into something readable",
      all: "A biophysics blog that makes research papers readable",
    },
    order: { ai: 6, research: 5, all: 7 },
    summary:
      "A biophysics blog I started to turn dense, peer-reviewed papers into articles a normal person can actually read. I researched and wrote the pieces, then designed and built the whole site myself in HTML, CSS, and JavaScript. Breaking the ideas down for other people ended up teaching them to me too.",
    highlights: [
      "Rewrote peer-reviewed biophysics into plain, readable articles",
      "Designed and built the site myself in HTML, CSS, and JavaScript",
    ],
  },
  {
    slug: "alunite",
    name: "Alunite",
    period: "2025–26",
    metric: { value: "TIA", label: "Thought Into Action immersion" },
    lens: {
      ai: "A matching algorithm that pairs alumni and students",
      all: "An alumni-student networking platform, built in the TIA immersion",
    },
    order: { ai: 2, all: 4 },
    summary:
      "An AI networking platform I built in the Thought Into Action immersion to connect students with alumni for mentorship and recruiting. At its core is a matching algorithm (scikit-learn and PyTorch) that reads people's profiles and career paths and suggests strong connections. Access is locked to verified .edu emails, and each school is kept as its own private network, so it stays trustworthy and people can't scrape data or impersonate others.",
    highlights: [
      "Matching algorithm (scikit-learn, PyTorch) that pairs alumni and students",
      "Locked to verified .edu emails, with each university kept as its own private network",
      "Built in the Thought Into Action immersion",
    ],
  },
];

export const PROJECT_BY_SLUG: Record<string, Project> = Object.fromEntries(
  PROJECTS.map((p) => [p.slug, p])
);

/** A dated role — research, work, leadership, or service. */
export interface Role {
  role: string;
  org: string;
  period: string;
  note: string;
  /** Bases this role lights up under; empty = never collapses to accent. */
  lenses: Exclude<LensKey, "all">[];
}

/** Research and work experience, most recent first. */
export const EXPERIENCE: Role[] = [
  {
    role: "AI Development & Automation",
    org: "FlowMatrix AI, Hamilton NY",
    period: "Nov 2025 – Present",
    note: "Built an AI system that turned 300+ pages of construction documentation into a searchable knowledge base. Stored the data in AWS S3 and a vector database so people can look up local building rules by postal code instead of digging through PDFs by hand.",
    lenses: ["ai"],
  },
  {
    role: "Undergraduate Research Assistant",
    org: "Department of Physics & Astronomy, Colgate",
    period: "Sep 2024 – Present",
    note: "Growing peptide nanowires as a sustainable way to separate oil from water. Confirmed the growth under an electron microscope, reached a 135° water contact angle, and analyzed 500+ datapoints in Python. Presented at the Colgate Physics & Astronomy Seminar.",
    lenses: ["research"],
  },
  {
    role: "Physics Tutor",
    org: "Department of Physics & Astronomy, Colgate",
    period: "Jan – Apr 2026",
    note: "Walked PHYS 112 students through electricity and magnetism each week, with extra sessions before quizzes and midterms.",
    lenses: ["ee"],
  },
  {
    role: "Service Desk Consultant",
    org: "Information Technology Services, Colgate",
    period: "Sep 2025 – May 2026",
    note: "First point of contact for software, network, and hardware problems for faculty, staff, and students. Logged 50+ tickets, flagged phishing and security risks, and wrote up recurring fixes for the team.",
    lenses: [],
  },
  {
    role: "Moodle Design Corps Reviewer",
    org: "Information Technology Services, Colgate",
    period: "Sep – Dec 2025",
    note: "Reviewed course sites for accessibility and ease of use through walkthroughs and student interviews, then handed practical fixes back to faculty.",
    lenses: [],
  },
  {
    role: "Resident Advisor",
    org: "Office of Residential Life, Colgate",
    period: "Aug 2025 – May 2026",
    note: "Live-in leader for 30+ residents. Ran programming, mediated conflicts, and supported students academically and personally.",
    lenses: [],
  },
  {
    role: "Technology Developer",
    org: "Shneer Agritech · TIA Immersion, Colgate",
    period: "Jun – Jul 2025",
    note: "Led the tech for an automated hydroponic vanilla farm. Wired up Arduino sensors and IoT controls to track humidity, CO₂, and nutrients on their own. Raised $700 at the Showcase and won a $10k TIA Accelerator grant.",
    lenses: ["ee"],
  },
  {
    role: "Computer Science Teaching Assistant",
    org: "Department of Computer Science, Colgate",
    period: "Jan – Dec 2025",
    note: "Helped 30+ students a week across COSC 101, 102, 202, and 208, from Java object-oriented programming to operating systems in C. Worked through debugging, data structures, memory, threading, and deadlocks, and gave feedback on how they designed their code.",
    lenses: ["ai"],
  },
  {
    role: "Digitization Assistant",
    org: "Special Collections & University Archives, Colgate",
    period: "Sep 2024 – Apr 2025",
    note: "Digitized manuscripts, photographs, and rare books to archival standards in ArchivesSpace and Photoshop, kept the metadata clean, and did basic book repair and casing in the Conservation Lab.",
    lenses: [],
  },
  {
    role: "Peer Note Taker",
    org: "Office of Student Disability Services, Colgate",
    period: "Sep – Dec 2024",
    note: "Took clear, accessible WRIT 103 notes for students with accommodations.",
    lenses: [],
  },
  {
    role: "Research Bootcamp Participant",
    org: "Incognito Blueprints Bootcamp",
    period: "May – Jul 2023",
    note: "Built a browser extension (JavaScript, Selenium, Python) that checks whether a small business is minority-owned, so people can choose to support them. Recognized among 100+ participants.",
    lenses: ["ai"],
  },
];

/** Club leadership and community service, most recent first. */
export const INVOLVEMENT: Role[] = [
  {
    role: "Secretary",
    org: "CU Society of Physics Students",
    period: "Jan 2025 – Present",
    note: "Run weekly meetings and records for 20+ members and organize talks, workshops, and outreach. Active turnout is up by about a third.",
    lenses: ["research"],
  },
  {
    role: "Treasurer",
    org: "Colgate Coders",
    period: "Jan 2025 – Present",
    note: "Handle the budget and resources for the club's external hackathons.",
    lenses: ["ai"],
  },
  {
    role: "President",
    org: "Robotics & Engineering Club, Colgate",
    period: "Jan – Dec 2025",
    note: "Ran the club and its biweekly workshops, and got physics, CS, and engineering students building things together.",
    lenses: ["ee"],
  },
  {
    role: "Computer Science Volunteer",
    org: "Dakshini Prayash NGO",
    period: "Apr – Dec 2023",
    note: "Taught weekly computer and digital-literacy classes (Word, Excel, PowerPoint, Paint, Logo) to 100+ kids in grades 3–6, and helped women artisans move their inventory and sales records onto a computer.",
    lenses: ["ai"],
  },
  {
    role: "Design Contributor & Workshop Planner",
    org: "Aquaterra NGO",
    period: "Apr 2022 – Dec 2023",
    note: "Designed campaign visuals and social posts in Canva, and helped plan community workshops on sustainability and the environment.",
    lenses: [],
  },
];

export interface Honor {
  title: string;
  detail: string;
}

export const HONORS: Honor[] = [
  {
    title: "Dean's Award for Academic Excellence with Distinction",
    detail: "Colgate University, awarded every semester",
  },
  {
    title: "Phi Eta Sigma National Honor Society",
    detail: "Colgate University, 2025",
  },
];

export const CERTIFICATIONS: string[] = [
  "Computational Physics: Scientific Programming with Python",
  "AI with Python (Harvard CS50AI)",
  "100 Days of Code: Python Pro Bootcamp",
  "Crash Course on Python (Google)",
  "Corporate Valuation & Financial Modeling (Training the Street)",
  "SQL",
];

export const EDUCATION = {
  school: "Colgate University, Hamilton NY",
  degree: "B.A. Computer Science & Physics",
  gpa: "3.89 / 4.00",
  graduation: "Expected May 2028",
  coursework: [
    "Operating Systems",
    "Computer Networks",
    "Data Structures & Algorithms",
    "Object-Oriented Programming",
    "Electronics",
    "Electricity & Magnetism",
    "Environmental Data Science",
    "Multivariable Calculus",
    "Differential Equations",
    "Linear Algebra",
  ],
};

/** A single capability. `lenses` controls which measurement bases it lights up under. */
export interface Skill {
  name: string;
  /** Bases this skill belongs to; under a matching lens it collapses to the accent. */
  lenses: Exclude<LensKey, "all">[];
}

export interface SkillGroup {
  /** Operator name, in keeping with the measurement metaphor. */
  title: string;
  items: Skill[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Languages & frameworks",
    items: [
      { name: "Python", lenses: ["ai", "research"] },
      { name: "Java", lenses: ["ai"] },
      { name: "C / C++", lenses: ["ee", "ai"] },
      { name: "JavaScript", lenses: ["ai"] },
      { name: "HTML / CSS", lenses: ["ai"] },
      { name: "React.js", lenses: ["ai"] },
      { name: "Flask", lenses: ["ai"] },
      { name: "p5.js", lenses: ["ai"] },
      { name: "Bootstrap", lenses: ["ai"] },
      { name: "SQL", lenses: ["ai"] },
      { name: "R", lenses: ["research"] },
    ],
  },
  {
    title: "Tools & platforms",
    items: [
      { name: "Git", lenses: ["ai", "ee", "research"] },
      { name: "Linux / Docker", lenses: ["ai"] },
      { name: "AWS", lenses: ["ai"] },
      { name: "Google Cloud", lenses: ["ai"] },
      { name: "MongoDB", lenses: ["ai"] },
      { name: "Arduino", lenses: ["ee"] },
      { name: "Wix", lenses: ["ai"] },
      { name: "Canva", lenses: [] },
      { name: "Microsoft Office", lenses: [] },
    ],
  },
  {
    title: "Data & ML",
    items: [
      { name: "PyTorch", lenses: ["ai"] },
      { name: "scikit-learn", lenses: ["ai", "research"] },
      { name: "pandas", lenses: ["ai", "research"] },
      { name: "NumPy", lenses: ["ai", "research"] },
      { name: "SciPy", lenses: ["research"] },
      { name: "Matplotlib", lenses: ["research", "ai"] },
      { name: "tidyverse", lenses: ["research"] },
      { name: "dplyr", lenses: ["research"] },
      { name: "ggplot", lenses: ["research"] },
    ],
  },
  {
    title: "Interests",
    items: [
      { name: "Computational physics", lenses: ["research", "ee"] },
      { name: "Nanomaterials", lenses: ["research"] },
      { name: "Astrophysics", lenses: ["research"] },
      { name: "Machine learning", lenses: ["ai"] },
      { name: "IoT & embedded systems", lenses: ["ee"] },
      { name: "Biophysics", lenses: ["research"] },
    ],
  },
];

/* ————————————————————————————————————————————————
   The Lab — small computational experiments, runnable in-browser.
   `python` cards execute live via Pyodide; `link` cards point to source.
   ———————————————————————————————————————————————— */

export type LabKind = "python" | "link";

export interface LabProject {
  slug: string;
  title: string;
  /** One-line description shown on the card. */
  blurb: string;
  /** GitHub repository URL. */
  repo: string;
  kind: LabKind;
  /** Sub-section heading the card sorts under. */
  group: string;
  /** Self-contained, Pyodide-runnable source (kind === "python"). */
  code?: string;
  /** For link cards: why it isn't runnable here, plus its language. */
  note?: string;
  language?: string;
}

/** Order sub-sections appear in, within Runnable then Source-only. */
export const LAB_GROUPS = {
  python: ["Physics & math", "Utilities", "Games"],
  link: ["Games", "Web", "Tools & automation"],
};

export const LAB_PROJECTS: LabProject[] = [
  {
    slug: "calculating-pi",
    group: "Physics & math",
    title: "Calculating π — Monte Carlo",
    blurb:
      "Estimate π by throwing random darts at a quarter circle and counting hits.",
    repo: "https://github.com/JahanviChamria/CalculatingPi",
    kind: "python",
    code: `import numpy as np
import matplotlib.pyplot as plt

n = 6000
pts = np.random.rand(n, 2)
inside = (pts[:, 0] ** 2 + pts[:, 1] ** 2) <= 1.0
pi = 4 * inside.mean()
print(f"Monte Carlo estimate of pi from {n} points: {pi:.5f}")
print(f"NumPy's pi:                              {np.pi:.5f}")

fig, ax = plt.subplots(figsize=(5, 5))
ax.scatter(pts[inside, 0], pts[inside, 1], s=3, c="#2742c4")
ax.scatter(pts[~inside, 0], pts[~inside, 1], s=3, c="#a3520e")
t = np.linspace(0, np.pi / 2, 200)
ax.plot(np.cos(t), np.sin(t), color="#1b1713", lw=1)
ax.set_aspect("equal")
ax.set_title(f"pi ~ {pi:.4f}")
plt.show()`,
  },
  {
    slug: "fourier-transform",
    group: "Physics & math",
    title: "Fourier Transform",
    blurb:
      "Decompose a composite signal into its frequency components with the FFT.",
    repo: "https://github.com/JahanviChamria/FourierTransform",
    kind: "python",
    code: `import numpy as np
import matplotlib.pyplot as plt

fs = 500
t = np.linspace(0, 1, fs, endpoint=False)
signal = (np.sin(2 * np.pi * 5 * t)
          + 0.5 * np.sin(2 * np.pi * 40 * t)
          + 0.3 * np.sin(2 * np.pi * 80 * t))

spectrum = np.fft.rfft(signal)
freq = np.fft.rfftfreq(len(signal), 1 / fs)
mag = np.abs(spectrum) / len(signal) * 2

peaks = sorted(int(round(f)) for f in freq[np.argsort(mag)[-3:]])
print("Dominant frequencies (Hz):", peaks)

fig, (a1, a2) = plt.subplots(2, 1, figsize=(6, 5))
a1.plot(t, signal, color="#1b1713", lw=0.8)
a1.set_title("signal (time domain)")
a2.plot(freq, mag, color="#2742c4", lw=1)
a2.set_xlim(0, 100)
a2.set_title("spectrum (frequency domain)")
plt.tight_layout()
plt.show()`,
  },
  {
    slug: "three-body-problem",
    group: "Physics & math",
    title: "Three-Body Problem",
    blurb:
      "Numerically integrate three gravitating bodies into a stable figure-eight orbit.",
    repo: "https://github.com/JahanviChamria/ThreeBodyProblem",
    kind: "python",
    code: `import numpy as np
import matplotlib.pyplot as plt

G = 1.0
m = np.array([1.0, 1.0, 1.0])
# classic figure-eight initial conditions
p = np.array([[-0.97000436, 0.24308753],
              [0.97000436, -0.24308753],
              [0.0, 0.0]])
v = np.array([[0.4662036850, 0.4323657300],
              [0.4662036850, 0.4323657300],
              [-0.9324073700, -0.8647314600]])

def accel(p):
    a = np.zeros_like(p)
    for i in range(3):
        for j in range(3):
            if i != j:
                d = p[j] - p[i]
                r = np.linalg.norm(d)
                a[i] += G * m[j] * d / r ** 3
    return a

dt, steps = 0.001, 8000
traj = np.zeros((steps, 3, 2))
for s in range(steps):
    v += accel(p) * dt
    p = p + v * dt
    traj[s] = p

print(f"Integrated 3 bodies over {steps} steps")
fig, ax = plt.subplots(figsize=(5, 5))
for i, c in enumerate(["#2742c4", "#a3520e", "#2a6a4b"]):
    ax.plot(traj[:, i, 0], traj[:, i, 1], color=c, lw=0.8)
ax.set_aspect("equal")
ax.set_title("three-body — figure-eight orbit")
plt.show()`,
  },
  {
    slug: "rotation",
    group: "Physics & math",
    title: "Rotation & Moment of Inertia",
    blurb:
      "Compute a rigid body's moment of inertia and rotate it about its center of mass.",
    repo: "https://github.com/JahanviChamria/Rotation",
    kind: "python",
    code: `import numpy as np
import matplotlib.pyplot as plt

pts = np.array([[1, 0], [0, 1], [-1, 0], [0, -1], [0.5, 0.5]], dtype=float)
masses = np.array([1, 1, 1, 1, 2.0])

com = (masses[:, None] * pts).sum(0) / masses.sum()
I = (masses * ((pts - com) ** 2).sum(1)).sum()
print(f"Center of mass: ({com[0]:.3f}, {com[1]:.3f})")
print(f"Moment of inertia about COM: {I:.3f}")

fig, ax = plt.subplots(figsize=(5, 5))
for ang in np.linspace(0, np.pi / 2, 5):
    R = np.array([[np.cos(ang), -np.sin(ang)],
                  [np.sin(ang), np.cos(ang)]])
    r = (pts - com) @ R.T + com
    ax.scatter(r[:, 0], r[:, 1], s=masses * 40, alpha=0.5)
ax.scatter(*com, marker="x", color="#1b1713")
ax.set_aspect("equal")
ax.set_title("rigid-body rotation about COM")
plt.show()`,
  },
  {
    slug: "interpolation",
    group: "Physics & math",
    title: "Interpolation",
    blurb:
      "Reconstruct a smooth curve from noisy samples with linear and polynomial fits.",
    repo: "https://github.com/JahanviChamria/Interpolation",
    kind: "python",
    code: `import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(0)
x = np.linspace(0, 10, 8)
y = np.sin(x) + 0.3 * rng.standard_normal(8)
xi = np.linspace(0, 10, 200)

linear = np.interp(xi, x, y)
poly = np.polyval(np.polyfit(x, y, 5), xi)
print(f"Interpolated {len(x)} samples to {len(xi)} points")

fig, ax = plt.subplots(figsize=(6, 4))
ax.plot(x, y, "o", color="#1b1713", label="samples")
ax.plot(xi, linear, color="#2742c4", lw=1, label="linear")
ax.plot(xi, poly, color="#a3520e", lw=1, label="poly deg-5")
ax.legend()
ax.set_title("interpolation")
plt.show()`,
  },
  {
    slug: "sierpinski-triangle",
    group: "Physics & math",
    title: "Sierpinski Triangle",
    blurb:
      "Grow a fractal from pure randomness with the chaos game (originally a tkinter app).",
    repo: "https://github.com/JahanviChamria/SierpinskiTriangleGenerator",
    kind: "python",
    code: `import numpy as np
import matplotlib.pyplot as plt

verts = np.array([[0, 0], [1, 0], [0.5, np.sqrt(3) / 2]])
n = 20000
p = np.array([0.5, 0.3])
xs = np.zeros((n, 2))
for i in range(n):
    p = (p + verts[np.random.randint(3)]) / 2
    xs[i] = p

print(f"Chaos game: plotted {n} points toward the attractor")
fig, ax = plt.subplots(figsize=(5, 5))
ax.scatter(xs[:, 0], xs[:, 1], s=0.5, c="#2a6a4b")
ax.set_aspect("equal")
ax.axis("off")
ax.set_title("Sierpinski triangle — chaos game")
plt.show()`,
  },
  {
    slug: "harmonic-oscillator",
    group: "Physics & math",
    title: "Harmonic Oscillator — Euler's Method",
    blurb:
      "Integrate a pendulum's motion step-by-step with Euler's method (originally a tkinter app).",
    repo: "https://github.com/JahanviChamria/Eulers-Method-for-Differential-Equations-Harmonic-Oscillator",
    kind: "python",
    code: `import numpy as np
import matplotlib.pyplot as plt

g, L = 9.81, 1.0
theta, omega = np.radians(60), 0.0
dt, T = 0.01, 10.0

ts = np.arange(0, T, dt)
angles = []
for _ in ts:
    angles.append(theta)
    alpha = -(g / L) * np.sin(theta)   # pendulum equation of motion
    omega += alpha * dt                # Euler step
    theta += omega * dt

print(f"Simulated {len(ts)} Euler steps over {T:.0f}s")
fig, ax = plt.subplots(figsize=(6, 4))
ax.plot(ts, np.degrees(angles), color="#a3520e", lw=1)
ax.set_xlabel("t (s)")
ax.set_ylabel("angle (deg)")
ax.set_title("pendulum — Euler integration")
plt.show()`,
  },
  {
    slug: "ph-calculator",
    title: "pH Calculator",
    group: "Physics & math",
    blurb:
      "Compute the pH of common substances from hydrogen-ion concentration.",
    repo: "https://github.com/JahanviChamria/pHCalculator",
    kind: "python",
    code: `import math
import matplotlib.pyplot as plt

def pH(conc_H):
    return -math.log10(conc_H)

samples = {
    "lemon juice": 3.2e-3,
    "black coffee": 1e-5,
    "pure water": 1e-7,
    "baking soda": 3.1e-9,
    "bleach": 2.5e-13,
}
for name, h in samples.items():
    p = pH(h)
    kind = "acidic" if p < 7 else "basic" if p > 7 else "neutral"
    print(f"{name:13} [H+]={h:.1e}  pH={p:5.2f}  ({kind})")

names = list(samples)
vals = [pH(samples[n]) for n in names]
colors = ["#a3520e" if v < 7 else "#2742c4" if v > 7 else "#2a6a4b" for v in vals]
fig, ax = plt.subplots(figsize=(6, 3.6))
ax.bar(names, vals, color=colors)
ax.axhline(7, color="#1b1713", lw=0.8, ls="--")
ax.set_ylabel("pH")
ax.set_title("pH of common substances")
plt.xticks(rotation=30, ha="right")
plt.tight_layout()
plt.show()`,
  },
  {
    slug: "projectile-motion",
    title: "Projectile Motion",
    group: "Physics & math",
    blurb:
      "Trace the arc of a projectile launched at different angles under gravity.",
    repo: "https://github.com/JahanviChamria/ProjectileMotionSimulation",
    kind: "python",
    code: `import numpy as np
import matplotlib.pyplot as plt

g, v0 = 9.81, 25.0
fig, ax = plt.subplots(figsize=(6, 4))
for angle in [15, 30, 45, 60, 75]:
    a = np.radians(angle)
    T = 2 * v0 * np.sin(a) / g
    t = np.linspace(0, T, 200)
    x = v0 * np.cos(a) * t
    y = v0 * np.sin(a) * t - 0.5 * g * t ** 2
    ax.plot(x, y, label=f"{angle}deg")
    if angle == 45:
        print(f"45deg launch: range = {x[-1]:.1f} m, flight time = {T:.2f} s")

ax.legend()
ax.set_xlabel("x (m)")
ax.set_ylabel("y (m)")
ax.set_title("projectile motion at 25 m/s")
plt.show()`,
  },
  {
    slug: "mendelian-cross",
    title: "Mendelian Cross Calculator",
    group: "Physics & math",
    blurb:
      "Build a Punnett square and read off the genotype and phenotype ratios.",
    repo: "https://github.com/JahanviChamria/MendelianCrossCalculator",
    kind: "python",
    code: `def cross(p1, p2):
    counts = {}
    for a in p1:
        for b in p2:
            geno = "".join(sorted([a, b], key=lambda c: (c.lower(), c.islower())))
            counts[geno] = counts.get(geno, 0) + 1
    return counts

p1, p2 = "Aa", "Aa"
counts = cross(p1, p2)
total = sum(counts.values())
print(f"Cross {p1} x {p2}")
for g, c in counts.items():
    pheno = "dominant" if "A" in g else "recessive"
    print(f"  {g}: {c}/{total}  ({pheno})")

dom = sum(c for g, c in counts.items() if "A" in g)
print(f"Phenotype ratio  dominant : recessive = {dom} : {total - dom}")`,
  },
  {
    slug: "temperature-converter",
    title: "Temperature Converter",
    group: "Utilities",
    blurb: "Convert between Celsius, Fahrenheit, and Kelvin.",
    repo: "https://github.com/JahanviChamria/TemperatureConverter",
    kind: "python",
    code: `def c_to_f(c):
    return c * 9 / 5 + 32

def c_to_k(c):
    return c + 273.15

print(f"{'Celsius':>8} {'Fahrenheit':>12} {'Kelvin':>10}")
for c in [-40, 0, 37, 100]:
    print(f"{c:8.1f} {c_to_f(c):12.1f} {c_to_k(c):10.2f}")`,
  },
  {
    slug: "text-to-morse",
    title: "Text to Morse",
    group: "Utilities",
    blurb: "Encode any message into Morse code.",
    repo: "https://github.com/JahanviChamria/TextToMorse",
    kind: "python",
    code: `MORSE = {
    "A": ".-", "B": "-...", "C": "-.-.", "D": "-..", "E": ".", "F": "..-.",
    "G": "--.", "H": "....", "I": "..", "J": ".---", "K": "-.-", "L": ".-..",
    "M": "--", "N": "-.", "O": "---", "P": ".--.", "Q": "--.-", "R": ".-.",
    "S": "...", "T": "-", "U": "..-", "V": "...-", "W": ".--", "X": "-..-",
    "Y": "-.--", "Z": "--..", " ": "/",
}
msg = "HELLO WORLD"
code = " ".join(MORSE.get(ch, "") for ch in msg.upper())
print(msg)
print(code)`,
  },
  {
    slug: "password-generator",
    title: "Password Generator",
    group: "Utilities",
    blurb: "Generate strong random passwords of any length.",
    repo: "https://github.com/JahanviChamria/PasswordGenerator",
    kind: "python",
    code: `import random
import string

def generate(n=16):
    pool = string.ascii_letters + string.digits + "!@#$%^&*"
    return "".join(random.choice(pool) for _ in range(n))

for n in (8, 12, 16, 24):
    print(f"{n:2}-char: {generate(n)}")`,
  },
  {
    slug: "encode-decode",
    title: "Encode / Decode",
    group: "Utilities",
    blurb: "Encrypt and decrypt text with a Caesar-cipher shift.",
    repo: "https://github.com/JahanviChamria/EncodeDecode",
    kind: "python",
    code: `def shift(text, k):
    out = []
    for ch in text:
        if ch.isalpha():
            base = 65 if ch.isupper() else 97
            out.append(chr((ord(ch) - base + k) % 26 + base))
        else:
            out.append(ch)
    return "".join(out)

msg = "Meet me at noon"
enc = shift(msg, 3)
dec = shift(enc, -3)
print("plain  :", msg)
print("encoded:", enc)
print("decoded:", dec)`,
  },
  {
    slug: "tip-calculator",
    title: "Tip Calculator",
    group: "Utilities",
    blurb: "Split a bill with tip across any number of people.",
    repo: "https://github.com/JahanviChamria/TipCalculator",
    kind: "python",
    code: `bill = 84.50
print(f"Bill: \${bill:.2f}")
for people in (2, 3, 4):
    for pct in (15, 18, 20):
        total = bill * (1 + pct / 100)
        each = total / people
        print(f"  {pct}% tip, split {people}: \${each:.2f} each (total \${total:.2f})")`,
  },
  {
    slug: "calculator",
    title: "Calculator",
    group: "Utilities",
    blurb: "A simple four-function calculator.",
    repo: "https://github.com/JahanviChamria/Calculator",
    kind: "python",
    code: `ops = {
    "+": lambda a, b: a + b,
    "-": lambda a, b: a - b,
    "*": lambda a, b: a * b,
    "/": lambda a, b: a / b,
}
for a, op, b in [(12, "+", 8), (50, "-", 17), (6, "*", 7), (22, "/", 4)]:
    print(f"{a} {op} {b} = {ops[op](a, b)}")`,
  },
  {
    slug: "blackjack",
    title: "Blackjack",
    group: "Games",
    blurb: "A self-playing hand of Blackjack against the dealer.",
    repo: "https://github.com/JahanviChamria/BlackJack",
    kind: "python",
    code: `import random
random.seed(7)
CARDS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11]

def total(h):
    t = sum(h)
    while t > 21 and 11 in h:
        h[h.index(11)] = 1
        t = sum(h)
    return t

player = [random.choice(CARDS), random.choice(CARDS)]
dealer = [random.choice(CARDS), random.choice(CARDS)]
print("Player:", player, "=", total(player))
print("Dealer shows:", dealer[0])

while total(player) < 17:
    player.append(random.choice(CARDS))
    print("Player hits ->", player, "=", total(player))
while total(dealer) < 17:
    dealer.append(random.choice(CARDS))

p, d = total(player), total(dealer)
print("Dealer:", dealer, "=", d)
if p > 21:
    print("Player busts — dealer wins")
elif d > 21 or p > d:
    print("Player wins!")
elif p < d:
    print("Dealer wins")
else:
    print("Push")`,
  },
  {
    slug: "blind-auction",
    title: "Blind Auction",
    group: "Games",
    blurb: "Collect sealed bids and reveal the highest bidder.",
    repo: "https://github.com/JahanviChamria/BlindAuction",
    kind: "python",
    code: `import random
random.seed(3)
bidders = {name: random.randint(100, 900)
           for name in ["Alice", "Bob", "Carol", "Dan"]}
for name, bid in bidders.items():
    print(f"{name} bids $\{bid}")
winner = max(bidders, key=bidders.get)
print(f"\\nWinner: {winner} at $\{bidders[winner]}")`,
  },
  {
    slug: "hangman",
    title: "Hangman",
    group: "Games",
    blurb: "Watch a frequency-based solver play a round of Hangman.",
    repo: "https://github.com/JahanviChamria/Hangman",
    kind: "python",
    code: `import random
random.seed(1)
word = random.choice(["python", "gravity", "photon", "quantum"])
display = ["_"] * len(word)
lives = 6
for letter in "etaoinshrdlcumwfgypbvkjxqz":
    if "_" not in display or lives == 0:
        break
    if letter in word:
        for i, c in enumerate(word):
            if c == letter:
                display[i] = letter
        print(f"Guess '{letter}': hit  -> {' '.join(display)}")
    else:
        lives -= 1
        print(f"Guess '{letter}': miss ({lives} lives left)")
print("\\nSolved:" if "_" not in display else "\\nFailed:", word)`,
  },
  {
    slug: "rock-paper-scissors",
    title: "Rock Paper Scissors",
    group: "Games",
    blurb: "Simulate a best-of-five match between player and computer.",
    repo: "https://github.com/JahanviChamria/RockPaperScissors",
    kind: "python",
    code: `import random
random.seed(5)
moves = ["rock", "paper", "scissors"]
beats = {"rock": "scissors", "paper": "rock", "scissors": "paper"}
me = ai = 0
for r in range(5):
    a, b = random.choice(moves), random.choice(moves)
    if a == b:
        res = "tie"
    elif beats[a] == b:
        res = "player"; me += 1
    else:
        res = "ai"; ai += 1
    print(f"Round {r + 1}: player={a:8} ai={b:8} -> {res}")
print(f"\\nFinal — player {me} : {ai} ai")`,
  },
  {
    slug: "quiz",
    title: "Quiz",
    group: "Games",
    blurb: "Run through a short trivia quiz with the answer key.",
    repo: "https://github.com/JahanviChamria/QuizPython",
    kind: "python",
    code: `quiz = [
    ("Capital of France?", "Paris"),
    ("Chemical symbol for gold?", "Au"),
    ("Speed of light (m/s, 3 s.f.)?", "3.00e8"),
    ("Closest planet to the Sun?", "Mercury"),
]
for i, (q, a) in enumerate(quiz, 1):
    print(f"Q{i}: {q}")
    print(f"    answer: {a}")
print(f"\\n{len(quiz)} questions")`,
  },
  {
    slug: "coffee-machine",
    title: "Coffee Machine (OOP)",
    group: "Games",
    blurb: "Run a few orders through a resource-tracking coffee machine.",
    repo: "https://github.com/JahanviChamria/CoffeeMachineOOP",
    kind: "python",
    code: `MENU = {
    "espresso": {"water": 50, "coffee": 18, "cost": 1.5},
    "latte": {"water": 200, "milk": 150, "coffee": 24, "cost": 2.5},
    "cappuccino": {"water": 250, "milk": 100, "coffee": 24, "cost": 3.0},
}
resources = {"water": 500, "milk": 300, "coffee": 100}

def make(drink):
    recipe = MENU[drink]
    for item, amt in recipe.items():
        if item != "cost" and resources.get(item, 0) < amt:
            print(f"Sorry, not enough {item} for a {drink}.")
            return
    for item, amt in recipe.items():
        if item != "cost":
            resources[item] -= amt
    print(f"Made a {drink} (\${recipe['cost']:.2f})")

for order in ["latte", "cappuccino", "espresso", "latte"]:
    make(order)
print("Remaining:", resources)`,
  },
  {
    slug: "etch-a-sketch",
    title: "Etch A Sketch",
    group: "Games",
    blurb: "A digital Etch A Sketch built with Python's turtle graphics.",
    repo: "https://github.com/JahanviChamria/EtchASketch",
    kind: "link",
    language: "Python",
    note: "Uses Python's turtle/tkinter — runs on a desktop, not in-browser.",
  },
  {
    slug: "hirst-painting",
    title: "Hirst Spot Painting",
    group: "Games",
    blurb: "Generates a Damien Hirst–style spot painting with turtle graphics.",
    repo: "https://github.com/JahanviChamria/HirstPainting",
    kind: "link",
    language: "Python",
    note: "Uses Python's turtle/tkinter — runs on a desktop, not in-browser.",
  },
  {
    slug: "pong",
    title: "Pong",
    group: "Games",
    blurb: "The arcade classic, rebuilt in Python.",
    repo: "https://github.com/JahanviChamria/Pong",
    kind: "link",
    language: "Python",
    note: "Uses Python's turtle/tkinter — runs on a desktop, not in-browser.",
  },
  {
    slug: "turtle-crossing",
    title: "Turtle Crossing",
    group: "Games",
    blurb: "A Frogger-style crossing game built with turtle graphics.",
    repo: "https://github.com/JahanviChamria/TurtleCrossing",
    kind: "link",
    language: "Python",
    note: "Uses Python's turtle/tkinter — runs on a desktop, not in-browser.",
  },
  {
    slug: "turtle-race",
    title: "Turtle Race",
    group: "Games",
    blurb: "Bet on a turtle and watch the race play out.",
    repo: "https://github.com/JahanviChamria/TurtleRace",
    kind: "link",
    language: "Python",
    note: "Uses Python's turtle/tkinter — runs on a desktop, not in-browser.",
  },
  {
    slug: "turtle-graphics",
    title: "Turtle Graphics",
    group: "Games",
    blurb: "Experiments and sketches with Python's turtle module.",
    repo: "https://github.com/JahanviChamria/TurtlePython",
    kind: "link",
    language: "Python",
    note: "Uses Python's turtle/tkinter — runs on a desktop, not in-browser.",
  },
  {
    slug: "us-states-game",
    title: "US States Game",
    group: "Games",
    blurb: "Name all 50 states on an interactive map.",
    repo: "https://github.com/JahanviChamria/USStatesGame",
    kind: "link",
    language: "Python",
    note: "Uses Python's turtle/tkinter — runs on a desktop, not in-browser.",
  },
  {
    slug: "logic-gate-visualizer",
    title: "Logic Gate Visualizer",
    group: "Web",
    blurb:
      "An interactive digital-logic playground built in vanilla JavaScript.",
    repo: "https://github.com/JahanviChamria/logic-gate-visualizer",
    kind: "link",
    language: "JavaScript",
    note: "Runs in the browser natively — open the repo to launch it.",
  },
  {
    slug: "flask-blog",
    title: "Flask Blog Template",
    group: "Web",
    blurb: "A reusable blog website scaffold built with Flask.",
    repo: "https://github.com/JahanviChamria/FlaskBlogTemplate",
    kind: "link",
    language: "Flask",
    note: "A server-rendered Flask app — runs locally.",
  },
  {
    slug: "flask-higher-lower",
    title: "Higher–Lower (Flask)",
    group: "Web",
    blurb: "The higher-lower number-guessing game as a Flask web app.",
    repo: "https://github.com/JahanviChamria/FlaskHigherLower",
    kind: "link",
    language: "Flask",
    note: "A server-rendered Flask app — runs locally.",
  },
  {
    slug: "probiz",
    title: "Probiz",
    group: "Web",
    blurb: "A responsive business landing-page website.",
    repo: "https://github.com/JahanviChamria/Probiz",
    kind: "link",
    language: "CSS",
    note: "A static site — open the repo to view the source.",
  },
  {
    slug: "amazon-price-tracker",
    title: "Amazon Price Tracker",
    group: "Tools & automation",
    blurb:
      "Scrapes a product page and emails you when the price drops below a target.",
    repo: "https://github.com/JahanviChamria/AmazonPrice_Tracker",
    kind: "link",
    language: "Python",
    note: "Web scraping + email — blocked by browser sandboxing, runs locally.",
  },
  {
    slug: "automated-spotify",
    title: "Automated Spotify Playlist",
    group: "Tools & automation",
    blurb: "Builds a Spotify playlist of a chosen date's Billboard Hot 100.",
    repo: "https://github.com/JahanviChamria/AutomatedSpotifyPlaylist",
    kind: "link",
    language: "Python",
    note: "Uses the Spotify API and web scraping — runs locally.",
  },
  {
    slug: "pixela-habit-tracker",
    title: "Pixela Habit Tracker",
    group: "Tools & automation",
    blurb: "Logs daily habits to a Pixela pixel-art tracker via its API.",
    repo: "https://github.com/JahanviChamria/PixelaHabitTracker",
    kind: "link",
    language: "Python",
    note: "Needs API tokens — runs locally.",
  },
  {
    slug: "workout-tracker",
    title: "Workout Tracker",
    group: "Tools & automation",
    blurb: "Logs natural-language workouts to a Google Sheet.",
    repo: "https://github.com/JahanviChamria/WorkoutTrackerSheet",
    kind: "link",
    language: "Python",
    note: "Uses external APIs — runs locally.",
  },
  {
    slug: "password-manager",
    title: "Password Manager",
    group: "Tools & automation",
    blurb: "A desktop password manager with search and generation.",
    repo: "https://github.com/JahanviChamria/PasswordManager",
    kind: "link",
    language: "Python",
    note: "A tkinter desktop GUI — runs on a desktop.",
  },
  {
    slug: "pomodoro-timer",
    title: "Pomodoro Timer",
    group: "Tools & automation",
    blurb: "A study/break timer following the Pomodoro technique.",
    repo: "https://github.com/JahanviChamria/PomodoroTimerGUI",
    kind: "link",
    language: "Python",
    note: "A tkinter desktop GUI — runs on a desktop.",
  },
  {
    slug: "quiz-app",
    title: "Quiz App",
    group: "Tools & automation",
    blurb: "A multiple-choice quiz application with a graphical interface.",
    repo: "https://github.com/JahanviChamria/QuizApp",
    kind: "link",
    language: "Python",
    note: "A tkinter desktop GUI — runs on a desktop.",
  },
  {
    slug: "coffee-machine-basic",
    title: "Coffee Machine",
    group: "Tools & automation",
    blurb:
      "The original procedural coffee-machine simulation (the OOP rebuild runs live above).",
    repo: "https://github.com/JahanviChamria/CoffeeMachine",
    kind: "link",
    language: "Python",
    note: "A console app — see the runnable OOP version under Games.",
  },
  {
    slug: "stock-alert-system",
    title: "Stock Alert System",
    group: "Tools & automation",
    blurb:
      "Watches bull put spreads and alerts when a position crosses a threshold.",
    repo: "https://github.com/JahanviChamria/stock-alert-system",
    kind: "link",
    language: "Python",
    note: "Needs live market data and notification credentials — runs locally.",
  },
  {
    slug: "paper-summarizer",
    title: "Paper Summarizer",
    group: "Tools & automation",
    blurb: "Condenses research papers into short, readable summaries.",
    repo: "https://github.com/JahanviChamria/paper-summarizer",
    kind: "link",
    language: "Python",
    note: "Depends on external model APIs and keys — runs locally.",
  },
  {
    slug: "gatehacks-2025",
    title: "GateHacks 2025",
    group: "Tools & automation",
    blurb: "A hackathon project from GateHacks 2025.",
    repo: "https://github.com/JahanviChamria/GateHacks2025",
    kind: "link",
    language: "Python",
    note: "Project source on GitHub.",
  },
  {
    slug: "geog331",
    title: "Environmental Data Science (GEOG331)",
    group: "Tools & automation",
    blurb:
      "Coursework in environmental data analysis and visualization, written in R.",
    repo: "https://github.com/JahanviChamria/GEOG331",
    kind: "link",
    language: "R",
    note: "R scripts and analyses — source on GitHub.",
  },
];
