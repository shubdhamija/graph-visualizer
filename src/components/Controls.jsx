import React from "react";

export default function Controls({ mode, setMode, setGraph }) {
  const clearGraph = () => {
    if (window.confirm("Clear entire graph?")) {
      setGraph({ nodes: [], edges: [] });
    }
  };

  return (
    <div className="controls">
      <h3>Modes</h3>
      <div className="buttons">
        <button
          className={mode === "select" ? "active" : ""}
          onClick={() => setMode("select")}
        >
          Select / Drag
        </button>
        <button
          className={mode === "add-node" ? "active" : ""}
          onClick={() => setMode("add-node")}
        >
          Add Node
        </button>
        <button
          className={mode === "add-edge" ? "active" : ""}
          onClick={() => setMode("add-edge")}
        >
          Add Edge
        </button>
        <button
          className={mode === "delete-node" ? "active" : ""}
          onClick={() => setMode("delete-node")}
        >
          Delete Node
        </button>
        <button
          className={mode === "delete-edge" ? "active" : ""}
          onClick={() => setMode("delete-edge")}
        >
          Delete Edge
        </button>
      </div>

      <button className="clear-btn" onClick={clearGraph}>
        🗑 Clear Graph
      </button>
    </div>
  );
}
