// File: algorithms/dijkstra.js

/**
 * Dijkstra single‑source shortest path (basic version)
 * ----------------------------------------------------
 * @param {Map<number, Array<{to:number, weight:number}>>} graph  adjacency list
 * @param {number} source  start node
 * @returns {{dist:number[], prev:(number|null)[]}}
 *
 * O(V² + E) using a naïve queue – good enough for medium graphs.
 */
export function dijkstra(graph, source = 0) {
    const V = graph.size;
    const dist = Array(V).fill(Infinity);
    const prev = Array(V).fill(null);
    const visited = Array(V).fill(false);
  
    dist[source] = 0;
    const Q = Array.from(graph.keys()); // naive queue
  
    const extractMin = () => {
      let minV = null;
      let minDist = Infinity;
      for (const v of Q) {
        if (!visited[v] && dist[v] < minDist) {
          minDist = dist[v];
          minV = v;
        }
      }
      if (minV !== null) Q.splice(Q.indexOf(minV), 1);
      return minV;
    };
  
    while (Q.length) {
      const u = extractMin();
      if (u === null) break; // unreachable vertices remain
      visited[u] = true;
  
      for (const { to: v, weight: w } of graph.get(u)) {
        if (visited[v]) continue;
        const alt = dist[u] + w;
        if (alt < dist[v]) {
          dist[v] = alt;
          prev[v] = u;
        }
      }
    }
  
    return { dist, prev };
  }
  
  /**
   * dijkstraWithSteps — same logic but records every relaxation / settle step so
   * the UI can animate the algorithm.
   * --------------------------------------------------------------------------
   * Returned step objects are free‑form; GraphVisualizer just needs to
   * distinguish them.
   *
   * @returns {{dist:number[], prev:(number|null)[], steps:Object[]}}
   */
  export function dijkstraWithSteps(graph, source = 0) {
    const V = graph.size;
    const dist = Array(V).fill(Infinity);
    const prev = Array(V).fill(null);
    const visited = Array(V).fill(false);
    const steps = [];
  
    dist[source] = 0;
    steps.push({ type: "init", dist: [...dist] });
  
    const Q = Array.from(graph.keys());
    const extractMin = () => {
      let minV = null;
      let minDist = Infinity;
      for (const v of Q) {
        if (!visited[v] && dist[v] < minDist) {
          minDist = dist[v];
          minV = v;
        }
      }
      if (minV !== null) Q.splice(Q.indexOf(minV), 1);
      return minV;
    };
  
    while (Q.length) {
      const u = extractMin();
      if (u === null) break;
  
      visited[u] = true;
      steps.push({
        type: "settle",
        node: u,
        dist: [...dist],
        highlight: { kind: "node", id: u }
      });
  
      for (const { to: v, weight: w } of graph.get(u)) {
        if (visited[v]) continue;
        const alt = dist[u] + w;
        if (alt < dist[v]) {
          const old = dist[v];
          dist[v] = alt;
          prev[v] = u;
          // Highlight “we’re relaxing edge u→v”
          steps.push({
            type: "relax",
            from: u,
            to: v,
            oldDist: old,
            newDist: alt,
            dist: [...dist],
            highlight: { kind: "edge", from: u, to: v }
          });
        }
      }
    }
  
    return { dist, prev, steps };
  }
  