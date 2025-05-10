'use client';

import { useState } from 'react';

export default function GraphGenerator({ onGenerate }) {
    
  const [numNodes, setNumNodes] = useState(6);
  const [graphType, setGraphType] = useState('sparse');

  const generateGraph = (n, type) => {
    const nodes = Array.from({ length: n }, (_, i) => ({
      id: i,
      label: `${i}`,
    }));

    const edges = []; 
const edgeSet = new Set();
const edgeIdPrefix = Date.now(); // use timestamp to ensure uniqueness
let edgeId = 0;

const addEdge = (i, j, weight = 1) => {
    const key = `${i}-${j}`;
    const reverseKey = `${j}-${i}`;
    if (edgeSet.has(key) || edgeSet.has(reverseKey)) return;
  
    edgeSet.add(key);
    edgeSet.add(reverseKey); // if undirected
  
    edges.push({
      id: `${edgeIdPrefix}-${edgeId++}`, // ✅ Now truly unique
      from: i,
      to: j,
      label: `${weight}`,
      arrows: type === 'directed' ? 'to' : undefined,
    });
  };
  
  
    switch (type) {
      case 'sparse':
        for (let i = 0; i < n; i++) {
          for (let j = i + 1; j < n; j++) {
            if (Math.random() < 0.2) addEdge(i, j);
          }
        }
        break;

      case 'dense':
        for (let i = 0; i < n; i++) {
          for (let j = i + 1; j < n; j++) {
            if (Math.random() < 0.8) addEdge(i, j);
          }
        }
        break;

      case 'tree':
        for (let i = 1; i < n; i++) {
          const parent = Math.floor(Math.random() * i);
          addEdge(parent, i);
        }
        break;

      case 'cyclic':
        for (let i = 0; i < n; i++) {
          const j = (i + 1) % n;
          addEdge(i, j);
        }
        for (let k = 0; k < Math.floor(n / 2); k++) {
          addEdge(k, Math.floor(Math.random() * n));
        }
        break;

      case 'directed':
        for (let i = 0; i < n; i++) {
          for (let j = 0; j < n; j++) {
            if (i !== j && Math.random() < 0.3) {
              addEdge(i, j);
            }
          }
        }
        break;

      case 'weighted':
        for (let i = 0; i < n; i++) {
          for (let j = i + 1; j < n; j++) {
            if (Math.random() < 0.5) {
              const weight = Math.floor(Math.random() * 10) + 1;
              addEdge(i, j, weight);
            }
          }
        }
        break;

      default:
        break;
    }

    return { nodes, edges };
  };

  const handleGenerate = () => {
    const graph = generateGraph(numNodes, graphType);
    onGenerate(graph);
  };

  return (
    <div className="mb-6">
      <label className="block mb-1 text-sm font-medium">Number of Nodes</label>
      <input
        type="number"
        value={numNodes}
        onChange={(e) => setNumNodes(parseInt(e.target.value))}
        className="border p-1 w-24 mb-2"
        min="2"
        max="50"
      />

      <label className="block mb-1 text-sm font-medium">Graph Type</label>
      <select
        value={graphType}
        onChange={(e) => setGraphType(e.target.value)}
        className="border p-1 mb-2"
      >
        <option value="sparse">Sparse</option>
        <option value="dense">Dense</option>
        <option value="tree">Tree</option>
        <option value="cyclic">Cyclic</option>
        <option value="directed">Directed</option>
        <option value="weighted">Weighted</option>
      </select>

      <br />
      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
      >
        Generate Graph
      </button>
    </div>
  );
}
