export function generateGraphByType(n, type) {
    const nodes = Array.from({ length: n }, (_, i) => ({ id: i, label: `${i}` }));
    const edges = [];
    const edgeSet = new Set();
    const edgeIdPrefix = Date.now() + '-' + Math.random();
    let edgeId = 0;
  
    const addEdge = (i, j, weight = 1) => {
      const key = `${i}-${j}`;
      const reverseKey = `${j}-${i}`;
      if (edgeSet.has(key) || edgeSet.has(reverseKey)) return;
  
      edgeSet.add(key);
      edgeSet.add(reverseKey);
  
      edges.push({
        id: `${edgeIdPrefix}-${edgeId++}`,
        from: i,
        to: j,
        label: `${weight}`,
        arrows: type === 'directed' ? 'to' : undefined,
      });
    };
  
    switch (type) {
      case 'sparse':
        for (let i = 0; i < n; i++)
          for (let j = i + 1; j < n; j++)
            if (Math.random() < 0.2) addEdge(i, j);
        break;
      case 'dense':
        for (let i = 0; i < n; i++)
          for (let j = i + 1; j < n; j++)
            if (Math.random() < 0.8) addEdge(i, j);
        break;
      case 'tree':
        for (let i = 1; i < n; i++) {
          const parent = Math.floor(Math.random() * i);
          addEdge(parent, i);
        }
        break;
      case 'cyclic':
        for (let i = 0; i < n; i++) addEdge(i, (i + 1) % n);
        for (let i = 0; i < Math.floor(n / 2); i++) addEdge(i, Math.floor(Math.random() * n));
        break;
      case 'directed':
        for (let i = 0; i < n; i++)
          for (let j = 0; j < n; j++)
            if (i !== j && Math.random() < 0.3) addEdge(i, j);
        break;
      case 'weighted':
        for (let i = 0; i < n; i++)
          for (let j = i + 1; j < n; j++)
            if (Math.random() < 0.5) addEdge(i, j, Math.floor(Math.random() * 10 + 1));
        break;
    }
  
    return { nodes, edges };
  }
  