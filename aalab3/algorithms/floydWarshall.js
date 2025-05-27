// File: algorithms/floydWarshall.js

/**
 * Floyd–Warshall all-pairs shortest paths (DP classic)
 * ----------------------------------------------------
 * @param {number[][]} matrix V×V adjacency matrix; Infinity = no edge
 * @returns {number[][]} distance matrix
 */
export function floydWarshall(matrix) {
  const V = matrix.length;
  const dist = matrix.map((row) => row.slice()); // deep copy

  for (let k = 0; k < V; k++) {
    for (let i = 0; i < V; i++) {
      for (let j = 0; j < V; j++) {
        const throughK = dist[i][k] + dist[k][j];
        if (throughK < dist[i][j]) dist[i][j] = throughK;
      }
    }
  }
  return dist;
}

/**
 * floydWarshallWithSteps – records each improvement so the UI can animate.
 * -----------------------------------------------------------------------
 * Each step has: { type:'update', i, j, k, oldDist, newDist }
 * plus an initial snapshot and a final snapshot.
 * @returns {{dist:number[][], steps:Object[]}}
 */
export function floydWarshallWithSteps(matrix) {
  const V = matrix.length;
  const dist = matrix.map((r) => r.slice());
  const steps = [{ type: "init", dist: dist.map((r) => r.slice()), highlight: null }];

  for (let k = 0; k < V; k++) {
    for (let i = 0; i < V; i++) {
      for (let j = 0; j < V; j++) {
        const throughK = dist[i][k] + dist[k][j];
        if (throughK < dist[i][j]) {
          const old = dist[i][j];
          dist[i][j] = throughK;
          steps.push({
            type: "update",
            i, j, k,
            oldDist: old,
            newDist: throughK,
            highlight: { kind: "matrix", i, j, k },
            dist: dist.map((r) => r.slice())
          });
        }
      }
    }
  }

  steps.push({ type: "done", dist: dist.map((r) => r.slice()), highlight: null });
  return { dist, steps };
}
