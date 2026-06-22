"use client";

import type { LensKey } from "@/lib/content";
import { LENS_LABEL } from "@/lib/content";

const ORDER: LensKey[] = ["ee", "ai", "research", "all"];

export default function LensDial({
  lens,
  onChoose,
}: {
  lens: LensKey;
  onChoose: (lens: LensKey) => void;
}) {
  return (
    <>
      <p className="dial-caption mono" id="dial-caption">
        Choose a measurement basis
      </p>
      <div className="dial" role="group" aria-labelledby="dial-caption">
        {ORDER.map((key) => (
          <button
            key={key}
            type="button"
            aria-pressed={lens === key}
            onClick={() => onChoose(key)}
          >
            {LENS_LABEL[key]}
          </button>
        ))}
      </div>
    </>
  );
}
