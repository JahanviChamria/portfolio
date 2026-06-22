"use client";

import { useEffect, useRef, useState } from "react";
import type { LensKey } from "@/lib/content";

const KETS = ["physics", "EE", "AI", "quant"] as const;

/** Which ket each single-lens measurement collapses onto. */
const BASIS_INDEX: Partial<Record<LensKey, number>> = {
  research: 0,
  ee: 1,
  ai: 2,
};

const EQUAL = 0.5; // equal superposition amplitude, since 4 × 0.5² = 1

export default function StateVector({ lens }: { lens: LensKey }) {
  const amps = useRef<number[]>([0.53, 0.47, 0.52, 0.48]);
  const [display, setDisplay] = useState<number[]>([...amps.current]);
  const lensRef = useRef(lens);
  lensRef.current = lens;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();
    let sinceUpdate = 0;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const a = amps.current;
      const basis = BASIS_INDEX[lensRef.current];

      if (basis !== undefined) {
        // measurement: collapse onto the chosen basis vector
        const k = 1 - Math.exp(-5 * dt);
        for (let i = 0; i < 4; i++) a[i] += ((i === basis ? 1 : 0) - a[i]) * k;
        setDisplay([...a]);
      } else {
        // unmeasured: drift around the equal superposition, renormalized
        const pull = 1 - Math.exp(-1.1 * dt);
        for (let i = 0; i < 4; i++) {
          a[i] += (EQUAL - a[i]) * pull;
          if (!reduced) a[i] += (Math.random() - 0.5) * 0.32 * dt;
          a[i] = Math.max(0.05, a[i]);
        }
        const norm = Math.sqrt(a.reduce((s, x) => s + x * x, 0));
        for (let i = 0; i < 4; i++) a[i] /= norm;

        sinceUpdate += dt;
        if (sinceUpdate > 0.12) {
          sinceUpdate = 0;
          setDisplay([...a]);
        }
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const basis = BASIS_INDEX[lens];

  return (
    <p className="vector" aria-label="state vector: a superposition of physics, EE, AI, and quant">
      <span className="psi">|ψ⟩&nbsp;=</span>
      {KETS.map((ket, i) => {
        const chosen = basis === i;
        const dim = basis !== undefined && !chosen;
        return (
          <span key={ket} className={`term${dim ? " dim" : ""}${chosen ? " chosen" : ""}`}>
            {i > 0 && <span aria-hidden>+</span>}
            <span className="coef">{display[i].toFixed(2)}</span>
            <span className="ket">|{ket}⟩</span>
          </span>
        );
      })}
    </p>
  );
}
