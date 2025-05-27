// File: utils/graphGenerator.js

/**
 * Basic undirected random graph generator (sparse/dense)
 * - No duplicate edges, optional connectivity
 * Returns: { adjList, visData: { nodes, edges } }
 */
export function generateRandomGraph(n = 10, density = "sparse", ensureConnected = false) {
  const adjList = new Map(Array.from({ length: n }, (_, i) => [i, []]));
  const maxEdges = n * (n - 1) / 2;
  const targetEdges = density === "dense" ? maxEdges : Math.round(1.5 * n);

  const addEdge = (u, v) => {
    if (u === v) return;
    if (!adjList.get(u).some(e => e.to === v)) {
      const w = randInt(1, 9);
      adjList.get(u).push({ to: v, weight: w });
      adjList.get(v).push({ to: u, weight: w });
    }
  };

  // Ensure connectivity by building a spanning tree first
  if (ensureConnected) {
    for (let i = 1; i < n; i++) {
      const parent = randInt(0, i - 1);
      addEdge(parent, i);
    }
  }

  // Add random edges up to target
  let attempts = 0;
  while (countEdges(adjList) < targetEdges && attempts < targetEdges * 5) {
    const u = randInt(0, n - 1);
    const v = randInt(0, n - 1);
    addEdge(u, v);
    attempts++;
  }

  // Build vis-data
  const nodes = Array.from({ length: n }, (_, i) => ({ id: i, label: `${i}` }));
  const edges = [];
  adjList.forEach((neighbors, u) => {
    neighbors.forEach(({ to: v, weight }) => {
      if (u < v) {
        edges.push({ from: u, to: v, label: `${weight}`, id: `e-${u}-${v}` });
      }
    });
  });

  return { adjList, visData: { nodes, edges } };
}

/**
 * generateTree: Random spanning tree (connected, undirected, acyclic)
 */
export function generateTree(n = 10) {
  const nodes = Array.from({ length: n }, (_, i) => ({ id: i, label: `${i}` }));
  const edges = [];
  for (let i = 1; i < n; i++) {
    const parent = randInt(0, i - 1);
    edges.push({ from: parent, to: i, id: `e-${parent}-${i}` });
  }
  return { nodes, edges };
}

/**
 * generateComplete: Fully connected undirected graph (clique)
 */
export function generateComplete(n = 10) {
  const nodes = Array.from({ length: n }, (_, i) => ({ id: i, label: `${i}` }));
  const edges = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      edges.push({ from: i, to: j, label: '1', id: `e-${i}-${j}` });
    }
  }
  return { nodes, edges };
}

/**
 * generateBipartite: Split nodes into two partitions; only cross edges
 */
export function generateBipartite(n = 10) {
  const nodes = Array.from({ length: n }, (_, i) => ({ id: i, label: `${i}` }));
  const mid = Math.floor(n / 2);
  const left = Array.from({ length: mid }, (_, i) => i);
  const right = Array.from({ length: n - mid }, (_, i) => i + mid);
  const edges = [];

  // Guarantee at least one edge per node
  left.forEach(i => {
    const j = right[randInt(0, right.length - 1)];
    edges.push({ from: i, to: j, id: `e-${i}-${j}` });
  });
  right.forEach(j => {
    const i = left[randInt(0, left.length - 1)];
    if (!edges.some(e => e.from === i && e.to === j)) {
      edges.push({ from: i, to: j, id: `e-${i}-${j}` });
    }
  });

  // Add random extra cross edges
  left.forEach(i => {
    right.forEach(j => {
      if (!edges.some(e => e.from === i && e.to === j) && Math.random() < 0.3) {
        edges.push({ from: i, to: j, id: `e-${i}-${j}` });
      }
    });
  });

  return { nodes, edges };
}

/**
 * createGraphFromParams: Dispatcher for specialized/general graphs
 */
export function createGraphFromParams({ n, family = 'general', direction = 'any', connectivity = 'any', cyclicity = 'any', density = 'any' }) {
  if (family === 'tree')      return generateTree(n);
  if (family === 'complete')  return generateComplete(n);
  if (family === 'bipartite') return generateBipartite(n);

  const useDensity = density === 'any' ? 'sparse' : density;
  const ensureConn = connectivity === 'connected';
  const { adjList, visData } = generateRandomGraph(n, useDensity, ensureConn);
  let { nodes, edges } = visData;

  // Enforce acyclic if requested: keep spanning tree only
  if (cyclicity === 'acyclic') {
    const parent = new Map();
    nodes.forEach(node => parent.set(node.id, node.id));
    const find = u => parent.get(u) === u ? u : parent.set(u, find(parent.get(u)));
    const union = (u, v) => parent.set(find(u), find(v));
    const treeEdges = [];
    edges.forEach(e => {
      if (find(e.from) !== find(e.to)) {
        treeEdges.push(e);
        union(e.from, e.to);
      }
    });
    edges = treeEdges;
  }

  // Convert to directed/mixed if needed
  if (direction !== 'any') {
    edges = edges.flatMap(e => (
      direction === 'directed'
        ? [{ ...e, arrows: 'to' }]
        : (Math.random() < 0.5
            ? [{ ...e, arrows: 'to', id: `${e.id}-d` }]
            : [{ ...e }]
          )
    ));
  }

  return { nodes, edges };
}

// helpers
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const countEdges = adjList => Array.from(adjList.values()).reduce((s, arr) => s + arr.length, 0) / 2;