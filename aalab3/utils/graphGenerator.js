// utils/graphGenerator.js
export function generateRandomGraph(n = 10, density = "sparse") {
    const adjList = new Map(Array.from({ length: n }, (_, i) => [i, []]));
  
    // How many edges do we want?
    const maxEdges = n * (n - 1) / 2;
    const targetEdges =
      density === "dense" ? maxEdges : Math.round(1.5 * n);
  
    while (countEdges(adjList) < targetEdges) {
      const u = randInt(0, n - 1);
      let v = randInt(0, n - 1);
      if (v === u) continue;
      const w = randInt(1, 9);                     // weight 1‑9
      if (!adjList.get(u).some(e => e.to === v)) { // avoid duplicates
        adjList.get(u).push({ to: v, weight: w });
        adjList.get(v).push({ to: u, weight: w }); // undirected
      }
    }
  
    // Prepare data for react‑graph‑vis
    const nodes = Array.from({ length: n }, (_, i) => ({ id: i, label: `${i}` }));
    const edges = [];
    for (const [u, list] of adjList) {
      list.forEach(({ to: v, weight }) => {
        if (u < v) edges.push({ from: u, to: v, label: `${weight}` });
      });
    }
  
    return { adjList, visData: { nodes, edges } };
  }
  
  // helpers -------------------------------------------------------------
  const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  
  const countEdges = (adjList) =>
    Array.from(adjList.values()).reduce((s, arr) => s + arr.length, 0) / 2;
  