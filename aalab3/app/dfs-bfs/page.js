'use client';

import { useState } from 'react';
import GraphGenerator from '../../components/GraphGenerator';
import GraphVisualizer from '../../components/GraphVisualizer';
import { bfs, dfs } from '../../algorithms/dfsBfs';
import GraphComparisonPanel from '../../components/GraphComparisonPanel';

export default function DFSBFSPage() {
  
  const [graph, setGraph] = useState(null);
  const [traversalOrder, setTraversalOrder] = useState([]);
  const [algorithmType, setAlgorithmType] = useState('');
  const [numNodes, setNumNodes] = useState(6);


  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lab 3 – DFS & BFS Empirical Analysis</h1>

      <GraphGenerator onGenerate={setGraph} numNodes={numNodes} setNumNodes={setNumNodes} />


      {graph && (
  <>
    <GraphVisualizer key={Date.now()} graphData={graph} />

    <div className="flex gap-4 mt-4">
          <button
        onClick={() => {
          const start = 0;
          const order = dfs(graph, start);
          setAlgorithmType('DFS');
          setTraversalOrder(order);
        }}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Run DFS
      </button>

      <button
        onClick={() => {
          const start = 0;
          const order = bfs(graph, start);
          setAlgorithmType('BFS');
          setTraversalOrder(order);
        }}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Run BFS
      </button>
      {traversalOrder.length > 0 && (
  <div className="mt-4 p-3 border rounded bg-gray-50">
    <h2 className="text-lg font-semibold text-gray-800 mb-2">
      {algorithmType} Traversal Order:
    </h2>
    <p className="text-gray-700">{traversalOrder.join(' → ')}</p>
  </div>
)}
<div className="mt-10">
  <h2 className="text-xl font-bold mb-2">Compare All Graph Types</h2>
  <GraphComparisonPanel nodeCount={numNodes} />
</div>

    </div>
  </>
)}

    </main>
  );
}
