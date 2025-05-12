// File: app/dijkstra-floyd/controls.js
"use client";

import { useState } from "react";

/**
 * Control panel collects user parameters and calls onRun when the user clicks
 * the “Generate & Run” button.
 */
export default function Controls({ onRun }) {
  const [nodes, setNodes] = useState(10);
  const [density, setDensity] = useState("sparse");
  const [algorithm, setAlgorithm] = useState("dijkstra");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRun({ nodes: Number(nodes), density, algorithm });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white rounded-xl shadow lg:col-span-3"
    >
      <h2 className="font-semibold text-lg">Parameters</h2>

      <label className="block">
        <span className="text-sm">Number of nodes</span>
        <input
          type="number"
          min={2}
          max={400}
          value={nodes}
          onChange={(e) => setNodes(e.target.value)}
          className="mt-1 w-full rounded border p-1"
        />
      </label>

      <label className="block">
        <span className="text-sm">Density</span>
        <select
          value={density}
          onChange={(e) => setDensity(e.target.value)}
          className="mt-1 w-full rounded border p-1"
        >
          <option value="sparse">Sparse</option>
          <option value="dense">Dense</option>
        </select>
      </label>

      <label className="block">
        <span className="text-sm">Algorithm</span>
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          className="mt-1 w-full rounded border p-1"
        >
          <option value="dijkstra">Dijkstra</option>
          <option value="floyd">Floyd–Warshall</option>
        </select>
      </label>

      <button
        type="submit"
        className="w-full py-2 px-4 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
      >
        Generate & Run
      </button>
    </form>
  );
}