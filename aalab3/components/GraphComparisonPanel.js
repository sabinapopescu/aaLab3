'use client';

import { useEffect, useState } from 'react';
import GraphVisualizer from './GraphVisualizer';
import { bfs, dfs } from '../algorithms/dfsBfs';
import { generateGraphByType } from '../utils/graphTypes';

const graphTypes = ['sparse', 'dense', 'tree', 'cyclic', 'directed', 'weighted'];

export default function GraphComparisonPanel({ nodeCount }) {
  const [graphs, setGraphs] = useState([]);

  useEffect(() => {
    const allGraphs = graphTypes.map((type) => {
      const graph = generateGraphByType(nodeCount, type);
      return {
        type,
        graph,
        dfs: dfs(graph, 0),
        bfs: bfs(graph, 0),
      };
    });
    setGraphs(allGraphs);
  }, [nodeCount]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {graphs.map(({ type, graph, dfs, bfs }) => (
        <div key={type} className="border p-4 rounded shadow bg-white">
          <h2 className="text-lg font-bold capitalize mb-2">{type} Graph</h2>
          <GraphVisualizer graphData={graph} />
          <p className="mt-3 text-sm"><strong>DFS:</strong> {dfs.join(' → ')}</p>
          <p className="text-sm"><strong>BFS:</strong> {bfs.join(' → ')}</p>
        </div>
      ))}
    </div>
  );
}
