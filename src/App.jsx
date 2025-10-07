import React, { useEffect, useState } from "react";
import GraphCanvas from "./components/GraphCanvas";
import Controls from "./components/Controls";
import AlgorithmPanel from "./components/AlgorithmPanel";
import "./styles.css";

const STORAGE_KEY = "graph_visualizer_v3";

export default function App() {
  const [graph, setGraph] = useState({ nodes: [], edges: [] });
  const [mode, setMode] = useState("select");
  const [directed, setDirected] = useState(true);
  const [weighted, setWeighted] = useState(true);
  const [highlight, setHighlight] = useState(null); // for animation highlights

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setGraph(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(graph));
  }, [graph]);

  return (
    <div className="app">
      <header className="glass-header">
        <h1>Graph Visualizer</h1>
      </header>

      <div className="toolbar glass">
        <label>
          <input
            type="checkbox"
            checked={directed}
            onChange={(e) => setDirected(e.target.checked)}
          />
          Directed
        </label>
        <label>
          <input
            type="checkbox"
            checked={weighted}
            onChange={(e) => setWeighted(e.target.checked)}
          />
          Weighted
        </label>
      </div>

      <div className="main">
        <Controls mode={mode} setMode={setMode} setGraph={setGraph} />
        <GraphCanvas
          graph={graph}
          setGraph={setGraph}
          mode={mode}
          directed={directed}
          weighted={weighted}
          highlight={highlight}
        />
        <AlgorithmPanel
          graph={graph}
          directed={directed}
          setHighlight={setHighlight}
        />
      </div>
    </div>
  );
}
