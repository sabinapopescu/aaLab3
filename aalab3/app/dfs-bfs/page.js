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

  const runTraversal = (type) => {
    const fn = type === 'DFS' ? dfs : bfs;
    const order = fn(graph, 0);
    setAlgorithmType(type);
    setTraversalOrder(order);
  };

  return (
    <>
      {/* Left Panel – Parameters */}
      <div className="bg-white rounded-xl shadow p-4 lg:col-span-3 flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Parameters</h2>
        <GraphGenerator onGenerate={setGraph} numNodes={numNodes} setNumNodes={setNumNodes} />
      </div>

      {/* Center Panel – Visualizer */}
      <div className="bg-white rounded-xl shadow p-4 lg:col-span-5 flex flex-col">
        <h2 className="text-lg font-semibold mb-2">Graph</h2>

        {graph?.nodes?.length && graph?.edges?.length ? (
        <GraphVisualizer graphData={graph} key={graph.resetKey || Date.now()} height="420px" interactive={true} />
      ) : (
        <div className="text-sm text-gray-500 italic">Generate a graph to begin visualization.</div>
      )}

        {graph && (
          <>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => runTraversal('DFS')}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Run DFS
              </button>
              <button
                onClick={() => runTraversal('BFS')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
              >
                Run BFS
              </button>
            </div>

            {traversalOrder.length > 0 && (
              <div className="mt-4 p-3 border rounded bg-gray-50">
                <h3 className="text-sm font-semibold text-gray-800 mb-1">
                  {algorithmType} Traversal Order:
                </h3>
                <p className="text-sm font-mono text-gray-700">{traversalOrder.join(' → ')}</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Right Panel – Graph Type Comparison */}
      <div className="bg-white rounded-xl shadow p-4 lg:col-span-4">
        <h2 className="text-lg font-semibold mb-2">Compare Graph Types</h2>
        <GraphComparisonPanel nodeCount={numNodes} />
      </div>
    </>
  );
}
