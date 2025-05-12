// File: app/dijkstra-floyd/page.js
"use client";
import { useState, useCallback } from "react";
import Controls from "./controls";
import StepPlayer from "./StepPlayer";
import BenchmarkChart from "./BenchmarkChart";

import dynamic from "next/dynamic";
const GraphVisualizer = dynamic(
 () => import("../../components/GraphVisualizer"),
{ ssr: false }          // ← prevent server‑side rendering
);
import { generateRandomGraph }   from "../../utils/graphGenerator";
import { dijkstraWithSteps }     from "../../algorithms/dijkstra";
import { floydWarshallWithSteps }from "../../algorithms/floydWarshall";
import { listToMatrix } from "../../utils/graphConvert";

export default function DijkstraFloydPage() {
  const [graph, setGraph] = useState({ nodes: [], edges: [] });
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  // Benchmark state (kept super simple)
  const [benchData, setBenchData] = useState([]);

  const handleRun = useCallback(({ nodes, density, algorithm }) => {
    // 1. Generate graph
    const { adjList, visData } = generateRandomGraph(nodes, density);
    visData.resetKey = Date.now();           // ensure uniqueness
    setGraph(visData);

    // 2. Run algorithm with step capture
    let stepArr = [];
    if (algorithm === "dijkstra") {
      stepArr = dijkstraWithSteps(adjList, 0).steps;
    } else {
      const matrix = listToMatrix(adjList, nodes);
      stepArr = floydWarshallWithSteps(matrix).steps;
    }
    setSteps(stepArr);
    setCurrentStep(0);
    setPlaying(true);

    // 3. Quick single‑run timing to feed chart (real benchmark script is better)
    const t0 = performance.now();
    if (algorithm === "dijkstra") {
      dijkstraWithSteps(adjList, 0);
    } else {
      const m = listToMatrix(adjList, nodes);
      floydWarshallWithSteps(m);
    }
    const runtime = performance.now() - t0;
    setBenchData((prev) => {
      const copy = prev.filter((d) => !(d.size === nodes));
      copy.push({ size: nodes, [algorithm]: runtime });
      return copy.sort((a, b) => a.size - b.size);
    });
  }, []);

  return (
    <>
      {/* Controls */}
      <Controls onRun={handleRun} />

      {/* Visualizer */}
      <div className="bg-white rounded-xl shadow lg:col-span-4 p-4 flex flex-col">
        <GraphVisualizer graphData={graph} height="420px" interactive={false} currentStep={steps[currentStep]} />
        <StepPlayer
          steps={steps}
          current={currentStep}
          onChange={(valOrFn) =>
            setCurrentStep((prev) =>
              typeof valOrFn === "function" ? valOrFn(prev) : valOrFn
            )
          }
          playing={playing}
        />
      </div>

      {/* Chart */}
      <BenchmarkChart data={benchData} title="Single‑run timings (ms)" />
    </>
  );
}
