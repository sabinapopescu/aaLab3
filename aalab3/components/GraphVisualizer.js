// components/GraphVisualizer.js
'use client';

import { useEffect, useRef } from 'react';
import Graph from 'react-graph-vis';

export default function GraphVisualizer({ graphData }) {
  const containerRef = useRef();

  const options = {
    layout: {
      hierarchical: false, // true for trees
    },
    edges: {
      arrows: {
        to: { enabled: true, scaleFactor: 1 },
      },
      color: "#ccc",
      font: { align: "middle" },
    },
    nodes: {
      shape: "dot",
      size: 20,
      font: { size: 14 },
    },
    height: "500px",
    interaction: {
      navigationButtons: true,
      zoomView: true,
    },
    physics: {
      enabled: true,
    },
  };

  const events = {
    select: function (event) {
      const { nodes, edges } = event;
      console.log("Selected nodes:", nodes);
      console.log("Selected edges:", edges);
    },
  };

  return (
    <div ref={containerRef}>
       <Graph
        {...(graphData && graphData.resetKey ? { key: graphData.resetKey } : {})}
        graph={graphData}
        options={options}
        events={events}
      />


    </div>
  );
}
// components/GraphVisualizer.js
// 'use client';

// import { useEffect, useRef } from 'react';
// import dynamic from 'next/dynamic';

// // dynamic import avoids SSR‑hydration issues
// const Graph = dynamic(() => import('react-graph-vis'), { ssr: false });

// /**
//  * Props
//  * -----
//  * graphData   { nodes:[{id,label}], edges:[{id,from,to,label}] }
//  * currentStep object   – one item from the steps[] array produced by the
//  *                       *WithSteps algorithms.  May be undefined on first render.
//  * algorithm    'dijkstra' | 'floyd'  – decides the colour palette.
//  */
// export default function GraphVisualizer({ graphData, currentStep, algorithm }) {
//   const containerRef = useRef();
//   const networkRef = useRef(null); // access vis.Network instance

//   /* ------------------------------------------------------------
//    * colour palettes per algorithm
//    * ---------------------------------------------------------- */
//   // colour palettes – user wants green for Dijkstra & purple for Floyd
//   const theme = algorithm === 'floyd'
//     ? { base: '#a855f7',       // purple
//         active: '#7e22ce',    // darker purple while exploring
//         settled: '#581c87' }  // even darker when finalised
//     : { base: '#22c55e',       // green
//         active: '#16a34a',    // darker green
//         settled: '#065f46' }; // blue for Dijkstra

//   /* ------------------------------------------------------------
//    * Build vis‑network options only once (memo not strictly needed)
//    * ---------------------------------------------------------- */
//   const options = {
//     layout: { hierarchical: false },
//     nodes: {
//       shape: 'dot', size: 18,
//       color: { background: theme.base, border: theme.base },
//       font: { size: 14, color: '#111' },
//     },
//     edges: {
//       arrows: { to: { enabled: true, scaleFactor: 0.9 } },
//       color: theme.base,
//       font: { align: 'middle', color: '#555' },
//     },
//     height: '420px',
//     physics: { enabled: true },
//     interaction: { navigationButtons: true, zoomView: true },
//   };

//   /* ------------------------------------------------------------
//    * When the network mounts, keep a ref to mutate colours quickly
//    * ---------------------------------------------------------- */
//   const events = {
//     select: ({ nodes, edges }) => console.log('select', nodes, edges),
//     afterDrawing: (ctx) => {
//       // store network instance once – first call only
//       if (!networkRef.current) {
//         // `this` is the network in react-graph-vis events
//         networkRef.current = ctx.canvas.frame.canvas ? ctx : null;
//       }
//     },
//   };

//   /* ------------------------------------------------------------
//    * Highlight logic: whenever currentStep changes, recolour nodes/edges
//    * ---------------------------------------------------------- */
//   useEffect(() => {
//     if (!currentStep || !networkRef.current) return;

//     const network = networkRef.current;
//     const nodes = network.body.data.nodes;
//     const edges = network.body.data.edges;

//     // reset all to base colour first
//     nodes.forEach((n) => nodes.update({ id: n.id, color: { background: theme.base, border: theme.base } }));
//     edges.forEach((e) => edges.update({ id: e.id, color: { color: theme.base } }));

//     if (currentStep.type === 'settle') {
//       nodes.update({ id: currentStep.node, color: { background: theme.settled, border: theme.settled } });
//     }

//     if (currentStep.type === 'relax') {
//       nodes.update({ id: currentStep.from, color: { background: theme.active, border: theme.active } });
//       nodes.update({ id: currentStep.to, color: { background: theme.active, border: theme.active } });
//       const eid = `${currentStep.from}-${currentStep.to}`;
//       edges.update({ id: eid, color: { color: theme.active } });
//     }

//     if (currentStep.type === 'update') {
//       // floyd step: highlight (i,j) cell via corresponding edge if it exists
//       const eid = `${currentStep.i}-${currentStep.j}`;
//       edges.update({ id: eid, color: { color: theme.active } });
//     }
//   }, [currentStep, theme]);

//   return (
//     <div ref={containerRef} className="w-full h-full">
//       {/* key forces remount when resetKey changes */}
//       <Graph
//         key={graphData?.resetKey}
//         graph={graphData}
//         options={options}
//         events={events}
//       />
//     </div>
//   );
// }
