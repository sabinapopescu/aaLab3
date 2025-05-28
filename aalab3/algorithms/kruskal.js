// File: app/greedy-algorithms/services/kruskal.js

/**
 * computeKruskal
 * @param {{ nodes: {id, label}[], edges: {from, to, weight}[] }} graph
 * @returns { steps: Array<{ highlight: { kind:'edge', from, to } }> }
 */
export function computeKruskal({ nodes, edges }) {
    // sort edges ascending
    const sorted = [...edges].map(e => ({
      from: e.from, to: e.to, weight: +e.label
    })).sort((a,b)=>a.weight-b.weight);
  
    // Union-Find
    const parent = {};
    nodes.forEach(n => parent[n.id] = n.id);
    const find = u => parent[u] === u ? u : (parent[u] = find(parent[u]));
    const union = (u,v) => { parent[find(u)] = find(v); };
  
    const steps = [];
  
    for (const e of sorted) {
      const ru = find(e.from), rv = find(e.to);
      // highlight edge under consideration
      steps.push({ highlight: { kind: 'edge', from: e.from, to: e.to } });
      if (ru !== rv) {
        union(ru, rv);
        // this edge is accepted
        steps.push({ highlight: { kind: 'edge', from: e.from, to: e.to } });
      }
    }
  
    return steps;
  }
  