// algorithms/dfsBfs.js

export function bfs(graph, startNode) {
    const visited = new Set();
    const queue = [startNode];
    const order = [];
  
    while (queue.length) {
      const node = queue.shift();
      if (!visited.has(node)) {
        visited.add(node);
        order.push(node);
  
        const neighbors = graph.edges
          .filter(e => e.from === node)
          .map(e => e.to);
  
        queue.push(...neighbors.filter(n => !visited.has(n)));
      }
    }
  
    return order;
  }
  
  export function dfs(graph, startNode) {
    const visited = new Set();
    const stack = [startNode];
    const order = [];
  
    while (stack.length) {
      const node = stack.pop();
      if (!visited.has(node)) {
        visited.add(node);
        order.push(node);
  
        const neighbors = graph.edges
          .filter(e => e.from === node)
          .map(e => e.to);
  
        stack.push(...neighbors.filter(n => !visited.has(n)));
      }
    }
  
    return order;
  }
  