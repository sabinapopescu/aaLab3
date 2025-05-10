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
      <Graph graph={graphData} options={options} events={events} />
    </div>
  );
}
