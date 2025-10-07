import React, { useState } from "react";
import bfs from "../algorithms/bfs";
import dfs from "../algorithms/dfs";
import dijkstra from "../algorithms/dijkstra";
import topoSort from "../algorithms/topoSort";

export default function AlgorithmPanel({ graph, directed, setHighlight }) {
  const [log, setLog] = useState([]);
  const [running, setRunning] = useState(false);

  function resetHighlight() {
    setHighlight(null);
  }

  function animateTraversal(nodes) {
    setRunning(true);
    setLog([]);
    let i = 0;

    const interval = setInterval(() => {
      if (i < nodes.length) {
        const nodeId = nodes[i];
        setHighlight(nodeId);
        setLog((prev) => [...prev, `Visited: ${nodeId}`]);
        i++;
      } else {
        clearInterval(interval);
        setHighlight(null);
        setRunning(false);
      }
    }, 600);
  }

  function runAlgo(type) {
    resetHighlight();

    if (graph.nodes.length === 0) return alert("Graph is empty!");

    if (type === "BFS") animateTraversal(bfs(graph.nodes, graph.edges));
    else if (type === "DFS") animateTraversal(dfs(graph.nodes, graph.edges));
    else if (type === "Dijkstra") {
      const { dist } = dijkstra(graph.nodes, graph.edges);
      setLog(
        Object.entries(dist).map(([n, d]) => `Node ${n}: ${d === Infinity ? "∞" : d}`)
      );
    } else if (type === "Cycle") {
    const hasCycle = detectCycle(graph, directed, setHighlight);
    if (hasCycle) {
      setLog(["Cycle detected ✅ (red nodes indicate the cycle)"]);
    } else {
      setHighlight(null);
      setLog(["No cycle found ❌"]);
    }
  } else if (type === "Topo") {
      const order = topoSort(graph.nodes, graph.edges);
      setLog(["Topological order: " + order.join(" → ")]);
    }
  }

  function detectCycle(graph, directed, setHighlight) {
  const adj = {};
  graph.edges.forEach((e) => {
    if (!adj[e.from]) adj[e.from] = [];
    adj[e.from].push(e.to);
    if (!directed) {
      if (!adj[e.to]) adj[e.to] = [];
      adj[e.to].push(e.from);
    }
  });

  const visited = new Set();
  const recStack = new Set();
  const cycleNodes = new Set();

  function dfs(node, parent) {
    if (recStack.has(node)) {
      cycleNodes.add(node);
      return true;
    }
    if (visited.has(node)) return false;

    visited.add(node);
    recStack.add(node);

    for (let n of adj[node] || []) {
      if (!directed && n === parent) continue;
      if (dfs(n, node)) {
        cycleNodes.add(node);
        return true;
      }
    }

    recStack.delete(node);
    return false;
  }

  for (let node of graph.nodes.map((n) => n.id)) {
    if (dfs(node, null)) {
      // Highlight nodes in the cycle
      setHighlight([...cycleNodes]);
      return true;
    }
  }

  return false;
}


  return (
    <div className="algo-panel glass">
      <h3>Algorithms</h3>
      <div className="algo-buttons">
        <button onClick={() => runAlgo("BFS")} disabled={running}>BFS</button>
        <button onClick={() => runAlgo("DFS")} disabled={running}>DFS</button>
        <button onClick={() => runAlgo("Dijkstra")} disabled={running}>Dijkstra</button>
        <button onClick={() => runAlgo("Topo")} disabled={running}>Topological</button>
        <button onClick={() => runAlgo("Cycle")} disabled={running}>Cycle Detection</button>
      </div>

      <div className="log-area">
        {log.map((line, i) => (
          <div key={i} className="log-line">{line}</div>
        ))}
      </div>
    </div>
  );
}
