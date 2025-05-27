'use client';

import React, { useState } from 'react';
import { createGraphFromParams } from '../utils/graphGenerator';

export default function GraphGenerator({ onGenerate }) {
  const [numNodes, setNumNodes] = useState(6);
  const [family, setFamily] = useState('general');

  // General graph attributes
  const [direction, setDirection] = useState('any');
  const [connectivity, setConnectivity] = useState('any');
  const [cyclicity, setCyclicity] = useState('any');
  const [density, setDensity] = useState('any');

  const handleGenerate = () => {
    const params = family === 'general'
      ? { n: numNodes, direction, connectivity, cyclicity, density }
      : { n: numNodes, family };

    const { nodes, edges } = createGraphFromParams(params);
    onGenerate({ nodes, edges });
  };

  return (
    <div className="mb-6 max-w-md">
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Number of Nodes</label>
        <input
          type="number"
          value={numNodes}
          onChange={e => setNumNodes(Math.max(2, Math.min(50, +e.target.value)))}
          className="border p-1 w-24"
          min="2"
          max="50"
        />
      </div>

      <div className="mb-4">
        <span className="text-sm font-medium">Graph Family</span>
        <div className="mt-2 space-x-4">
          {['general', 'tree', 'complete', 'bipartite'].map(opt => (
            <label key={opt} className="inline-flex items-center">
              <input
                type="radio"
                name="family"
                value={opt}
                checked={family === opt}
                onChange={() => setFamily(opt)}
                className="form-radio"
              />
              <span className="ml-1 capitalize">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      {family === 'general' && (
        <>
          <div className="mb-4">
            <span className="text-sm font-medium">Direction</span>
            <div className="mt-1 space-x-4">
              {['any', 'undirected', 'directed', 'mixed'].map(opt => (
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

          <div className="mb-4">
            <span className="text-sm font-medium">Connectivity</span>
            <div className="mt-1 space-x-4">
              {['any', 'connected', 'disconnected'].map(opt => (
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

          <div className="mb-4">
            <span className="text-sm font-medium">Cyclicity</span>
            <div className="mt-1 space-x-4">
              {['any', 'cyclic', 'acyclic'].map(opt => (
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

          <div className="mb-4">
            <span className="text-sm font-medium">Density</span>
            <div className="mt-1 space-x-4">
              {['any', 'sparse', 'dense'].map(opt => (
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
        </>
      )}

      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Generate Graph
      </button>
    </div>
  );
}
