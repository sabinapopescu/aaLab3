// // File: app/greedy-algorithms/services/prim.js

// /**
//  * computePrim
//  * @param {{ nodes: {id, label}[], edges: {from, to, weight}[] }} graph
//  * @returns { steps: Array<{ highlight: { kind:'node'|'edge', ... } }> }
//  */
// export function computePrim({ nodes, edges }) {
//     const n = nodes.length;
//     // build adjacency list
//     const adj = new Map(nodes.map(n => [n.id, []]));
//     edges.forEach(e => {
//       adj.get(e.from).push({ to: e.to, weight: +e.label });
//       adj.get(e.to).push({ to: e.from, weight: +e.label });
//     });
  
//     const inMST = new Set();
//     const edgeQueue = [];
//     const steps = [];
  
//     // start from node 0 (or random)
//     const start = nodes[0].id;
//     inMST.add(start);
//     steps.push({ highlight: { kind: 'node', id: start } });
  
//     // push its edges
//     adj.get(start).forEach(e => edgeQueue.push({ ...e, from: start }));
//     // min-heapify by weight
//     edgeQueue.sort((a,b)=>a.weight-b.weight);
  
//     while (edgeQueue.length) {
//       const { from, to, weight } = edgeQueue.shift();
//       if (inMST.has(to)) continue;
//       // highlight the chosen edge
//       steps.push({ highlight: { kind: 'edge', from, to } });
  
//       inMST.add(to);
//       steps.push({ highlight: { kind: 'node', id: to } });
  
//       // add new edges from 'to'
//       adj.get(to).forEach(e => {
//         if (!inMST.has(e.to)) {
//           edgeQueue.push({ from: to, to: e.to, weight: e.weight });
//         }
//       });
//       edgeQueue.sort((a,b)=>a.weight-b.weight);
//     }
  
//     return steps;
//   }
// File: algorithms/prim.js

import { buildAdjList } from "../utils/graphConvert";

/**
 * computePrim — minimum spanning tree via Prim’s algorithm
 * @param {Map<number,Array<{to:number,weight:number}>>|{nodes,edges}} graphInput
 * @param {number} start  node to begin from (default = 0)
 * @returns {{mstEdges:Array<[u,v,weight]>,steps:Object[]}}
 */
export function computePrim(graphInput, start = 0) {
  // Normalize input
  const adjList = graphInput instanceof Map
    ? graphInput
    : buildAdjList(graphInput.nodes, graphInput.edges);

  const n = adjList.size;
  const visited = new Set([start]);
  const steps = [];
  const mstEdges = [];
  let candidates = [...(adjList.get(start) || [])].map(e => ({
    from: start, to: e.to, weight: e.weight
  }));

  while (visited.size < n && candidates.length) {
    // Pick smallest edge
    candidates.sort((a,b) => a.weight - b.weight);
    const edge = candidates.shift();
    if (visited.has(edge.to)) continue;

    visited.add(edge.to);
    mstEdges.push([edge.from, edge.to, edge.weight]);
    steps.push({ highlight: { kind: "edge", from: edge.from, to: edge.to } });

    // Add new edges from the newly visited node
    for (const e of adjList.get(edge.to) || []) {
      if (!visited.has(e.to)) {
        candidates.push({ from: edge.to, to: e.to, weight: e.weight });
      }
    }
  }

  return { mstEdges, steps };
}
