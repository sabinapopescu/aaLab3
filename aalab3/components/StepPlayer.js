
// File: app/dijkstra-floyd/StepPlayer.js
"use client";
import { useEffect, useRef } from "react";

export default function StepPlayer({ steps, current, onChange, playing }) {
  const intervalRef = useRef(null);

  useEffect(() => {
    if (playing && steps.length > 0) {
      intervalRef.current = setInterval(() => {
        onChange((prev) => (prev + 1) % steps.length);
      }, 500);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [playing, steps.length, onChange]);

  if (!steps.length) return null;

  return (
    <div className="mt-4 flex items-center gap-4">
      <button
        onClick={() => onChange((prev) => (prev === 0 ? steps.length - 1 : prev - 1))}
        className="px-3 py-1 rounded bg-gray-200"
      >
        ◀
      </button>

      <input
        type="range"
        min={0}
        max={steps.length - 1}
        value={current}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1"
      />

      <button
        onClick={() => onChange((prev) => (prev + 1) % steps.length)}
        className="px-3 py-1 rounded bg-gray-200"
      >
        ▶
      </button>
    </div>
  );
}