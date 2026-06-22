"use client";

import { useEffect, useRef } from "react";
import type { LensKey } from "@/lib/content";

/**
 * The Chenciner–Montgomery figure-eight choreography: three equal masses
 * chasing each other along a single figure-eight orbit. G = m = 1.
 */
const INIT_POS = [
  [-0.97000436, 0.24308753],
  [0.97000436, -0.24308753],
  [0, 0],
];
const INIT_VEL = [
  [0.466203685, 0.43236573],
  [0.466203685, 0.43236573],
  [-0.93240737, -0.86473146],
];

type State = { pos: number[][]; vel: number[][] };

function accelerations(pos: number[][]): number[][] {
  const acc = [
    [0, 0],
    [0, 0],
    [0, 0],
  ];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (i === j) continue;
      const dx = pos[j][0] - pos[i][0];
      const dy = pos[j][1] - pos[i][1];
      const r2 = dx * dx + dy * dy + 1e-9;
      const inv = 1 / (Math.sqrt(r2) * r2);
      acc[i][0] += dx * inv;
      acc[i][1] += dy * inv;
    }
  }
  return acc;
}

function rk4Step(s: State, dt: number): void {
  const { pos, vel } = s;
  const addScaled = (base: number[][], d: number[][], h: number) =>
    base.map((row, i) => [row[0] + d[i][0] * h, row[1] + d[i][1] * h]);

  const a1 = accelerations(pos);
  const p2 = addScaled(pos, vel, dt / 2);
  const v2 = addScaled(vel, a1, dt / 2);
  const a2 = accelerations(p2);
  const p3 = addScaled(pos, v2, dt / 2);
  const v3 = addScaled(vel, a2, dt / 2);
  const a3 = accelerations(p3);
  const p4 = addScaled(pos, v3, dt);
  const v4 = addScaled(vel, a3, dt);
  const a4 = accelerations(p4);

  for (let i = 0; i < 3; i++) {
    pos[i][0] += (dt / 6) * (vel[i][0] + 2 * v2[i][0] + 2 * v3[i][0] + v4[i][0]);
    pos[i][1] += (dt / 6) * (vel[i][1] + 2 * v2[i][1] + 2 * v3[i][1] + v4[i][1]);
    vel[i][0] += (dt / 6) * (a1[i][0] + 2 * a2[i][0] + 2 * a3[i][0] + a4[i][0]);
    vel[i][1] += (dt / 6) * (a1[i][1] + 2 * a2[i][1] + 2 * a3[i][1] + a4[i][1]);
  }
}

export default function ThreeBody({ lens }: { lens: LensKey }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const accentRef = useRef("#1b1713");

  // re-read the accent color whenever the basis changes
  useEffect(() => {
    accentRef.current = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();
  }, [lens]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const state: State = {
      pos: INIT_POS.map((p) => [...p]),
      vel: INIT_VEL.map((v) => [...v]),
    };
    let prev: number[][] | null = null;
    let raf = 0;

    const paper = "#f5f1e8";
    const ink = "rgba(27, 23, 19, 0.55)";

    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = paper;
      ctx.fillRect(0, 0, w, h);
      prev = null;
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(canvas);

    const toScreen = ([x, y]: number[]): [number, number] => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const scale = (w * 0.86) / 2.4; // orbit spans roughly x ∈ [-1.2, 1.2]
      return [w / 2 + x * scale, h / 2 - y * scale];
    };

    const tick = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      // slow fade toward paper — long, quiet trails
      ctx.fillStyle = "rgba(245, 241, 232, 0.045)";
      ctx.fillRect(0, 0, w, h);

      const before = state.pos.map((p) => [...p]);
      for (let s = 0; s < 3; s++) rk4Step(state, 0.0035);

      const from = prev ?? before;
      ctx.lineWidth = 1.1;
      ctx.lineCap = "round";
      for (let i = 0; i < 3; i++) {
        const [x0, y0] = toScreen(from[i]);
        const [x1, y1] = toScreen(state.pos[i]);
        ctx.strokeStyle = i === 2 ? accentRef.current : ink;
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();
      }
      prev = state.pos.map((p) => [...p]);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <figure className="fig fade" style={{ animationDelay: "0.25s" }}>
      <div className="fig-frame">
        <canvas ref={canvasRef} aria-label="Live simulation of the three-body problem figure-eight orbit" />
      </div>
      <figcaption className="fig-caption">
        <span>fig. 1 — three-body problem, figure-eight solution. RK4.</span>
        <a
          href="https://github.com/JahanviChamria/ThreeBodyProblem"
          target="_blank"
          rel="noreferrer"
        >
          source
        </a>
      </figcaption>
    </figure>
  );
}
