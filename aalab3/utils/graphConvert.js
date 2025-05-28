// File: utils/graphConvert.js

/**
 * Convert an adjacency‑list Map into an adjacency‑matrix (2‑D array) that
 * Floyd–Warshall expects.
 *
 * @param {Map<number, Array<{to:number, weight:number}>>} adjList
 * @param {number} size        number of vertices
 * @param {number} INF         value to use for 'no edge' (default Infinity)
 * @returns {number[][]}
 */
export function listToMatrix(adjList, size, INF = Infinity) {
    const mat = Array.from({ length: size }, () => Array(size).fill(INF));
    for (let i = 0; i < size; i++) mat[i][i] = 0;
  
    for (const [u, edges] of adjList) {
      edges.forEach(({ to: v, weight: w }) => {
        mat[u][v] = w;
        mat[v][u] = w; // if your graphs are directed, remove this line
      });
    }
    return mat;
  }
  
  /**
   * Utility: convert a matrix back to list – handy for other tasks.
   */
  export function matrixToList(matrix, INF = Infinity) {
    const n = matrix.length;
    const list = new Map(Array.from({ length: n }, (_, i) => [i, []]));
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (i !== j && matrix[i][j] !== INF) {
          list.get(i).push({ to: j, weight: matrix[i][j] });
        }
      }
    }
    return list;
  }
  /**
 * buildAdjList: convert vis-data nodes & edges into adjacency-list for algorithms.
 *
 * @param {{id:number}[]} nodes
 * @param {{from:number,to:number,label?:string}[]} edges
 * @returns {Map<number, Array<{to:number, weight:number}>>}
 */
export function buildAdjList(nodes, edges) {
  const adjList = new Map(nodes.map((n) => [n.id, []]));
  edges.forEach(({ from, to, label }) => {
    const w = label !== undefined ? Number(label) : 1;
    adjList.get(from).push({ to, weight: w });
    adjList.get(to).push({ to: from, weight: w });
  });
  return adjList;
}
