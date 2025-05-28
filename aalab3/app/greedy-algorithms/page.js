'use client';

import { useState, useCallback } from 'react';

import AlgorithmSelector from '../../components/AlgorithmSelector';
import GraphGenerator      from '../../components/GraphGenerator';
//import GraphVisualizer    from '../../components/GraphVisualizer';
import dynamic from 'next/dynamic';
const GraphVisualizer = dynamic(
  () => import('../../components/GraphVisualizer'),
  { ssr: false }
);

import StepPlayer         from '../../components/StepPlayer';
import BenchmarkChart     from '../../components/BenchmarkChart';

import { computePrim }    from '../../algorithms/prim';
import { computeKruskal } from '../../algorithms/kruskal';

// helper to turn {nodes, edges} into adjList
import { buildAdjList }  from '../../utils/graphConvert';

export default function PrimKruskalPage() {
  const [graph, setGraph]         = useState({ nodes: [], edges: [] });
  const [algorithm, setAlgorithm] = useState('prim');          // 'prim' or 'kruskal'
  const [steps, setSteps]         = useState([]);
  const [currentStep, setCurrent] = useState(0);
  const [playing, setPlaying]     = useState(false);
  const [benchData, setBenchData] = useState([]);

  const handleGenerate = useCallback(({ nodes, edges }) => {
    // reset graph + auto-remount
    setGraph({ nodes, edges, resetKey: Date.now() });

    // build adjacency list
    const adjList = buildAdjList(nodes, edges);

    // pick prim or kruskal
    let result;
    if (algorithm === 'prim') {
     // result = computePrim(adjList, /* start=0 */);
       result = computePrim({ nodes, edges }, /* start=0 */);
    } else {
      result = computeKruskal(adjList);
    }

    // result.steps: array of { highlight, ... } for StepPlayer
    setSteps(result.steps);
    setCurrent(0);
    setPlaying(true);

    // benchmark single-run
    const t0 = performance.now();
    if (algorithm === 'prim') computePrim(adjList);
    else               computeKruskal(adjList);
    const dt = performance.now() - t0;

    setBenchData((prev) => {
      const filtered = prev.filter(d => !(d.size === nodes.length));
      filtered.push({ size: nodes.length, [algorithm]: dt });
      return filtered.sort((a, b) => a.size - b.size);
    });
  }, [algorithm]);

  return (
    <>
      <div className="lg:col-span-3 space-y-4">
        <AlgorithmSelector value={algorithm} onChange={setAlgorithm} />

        <GraphGenerator onGenerate={handleGenerate} />

        <BenchmarkChart data={benchData} title="Single-run timings (ms)" />
      </div>

      <div className="lg:col-span-9 bg-white rounded-xl shadow p-4 flex flex-col">
        <GraphVisualizer graphData={graph} currentStep={steps[currentStep]} />

        <StepPlayer
          steps={steps}
          current={currentStep}
          onChange={setCurrent}
          playing={playing}
        />
      </div>
    </>
  );
}
