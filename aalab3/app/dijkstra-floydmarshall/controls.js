import React, { useState } from 'react';

/**
 * Controls.jsx
 * ------------
 * Collects parameters: nodes, algorithm, and either a special family or general attributes
 */
export default function Controls({ onRun }) {
  const [nodes, setNodes] = useState(10);
  const [algorithm, setAlgorithm] = useState('dijkstra');

  // Top‐level family selector
  const [family, setFamily] = useState('general');

  // General graph attributes (only used when family === 'general')
  const [direction, setDirection] = useState('any');
  const [connectivity, setConnectivity] = useState('any');
  const [cyclicity, setCyclicity] = useState('any');
  const [density, setDensity] = useState('any');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (family === 'general') {
      onRun({ nodes: Number(nodes), algorithm, family, direction, connectivity, cyclicity, density });
    } else {
      onRun({ nodes: Number(nodes), algorithm, family });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4 bg-white rounded-xl shadow lg:col-span-3">
      <h2 className="font-semibold text-lg">Parameters</h2>

      <div className="grid grid-cols-2 gap-4">
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
      </div>

      {/* Family selector */}
      <div>
        <span className="text-sm font-medium">Graph Family</span>
        <div className="mt-2 space-y-2">
          {['general', 'tree', 'complete', 'bipartite'].map((opt) => (
            <label key={opt} className="inline-flex items-center mr-4">
              <input
                type="radio"
                name="family"
                value={opt}
                checked={family === opt}
                onChange={() => setFamily(opt)}
                className="form-radio"
              />
              <span className="ml-2 capitalize">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      {family === 'general' && (
        <div className="space-y-4">
          {/* Direction */}
          <div>
            <span className="text-sm font-medium">Direction</span>
            <div className="mt-1 space-x-4">
              {['any', 'undirected', 'directed', 'mixed'].map((opt) => (
                <label key={opt} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="direction"
                    value={opt}
                    checked={direction === opt}
                    onChange={() => setDirection(opt)}
                    className="form-radio"
                  />
                  <span className="ml-1 capitalize">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Connectivity */}
          <div>
            <span className="text-sm font-medium">Connectivity</span>
            <div className="mt-1 space-x-4">
              {['any', 'connected', 'disconnected'].map((opt) => (
                <label key={opt} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="connectivity"
                    value={opt}
                    checked={connectivity === opt}
                    onChange={() => setConnectivity(opt)}
                    className="form-radio"
                  />
                  <span className="ml-1 capitalize">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Cyclicity */}
          <div>
            <span className="text-sm font-medium">Cyclicity</span>
            <div className="mt-1 space-x-4">
              {['any', 'cyclic', 'acyclic'].map((opt) => (
                <label key={opt} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="cyclicity"
                    value={opt}
                    checked={cyclicity === opt}
                    onChange={() => setCyclicity(opt)}
                    className="form-radio"
                  />
                  <span className="ml-1 capitalize">{opt === 'acyclic' ? 'DAG' : opt}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Density */}
          <div>
            <span className="text-sm font-medium">Density</span>
            <div className="mt-1 space-x-4">
              {['any', 'sparse', 'dense'].map((opt) => (
                <label key={opt} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="density"
                    value={opt}
                    checked={density === opt}
                    onChange={() => setDensity(opt)}
                    className="form-radio"
                  />
                  <span className="ml-1 capitalize">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      <button type="submit" className="w-full py-2 px-4 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-medium">
        Generate & Run
      </button>
    </form>
  );
}
