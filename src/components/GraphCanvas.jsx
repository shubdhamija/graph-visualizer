import React, { useRef, useState } from "react";

export default function GraphCanvas({ graph, setGraph, mode, directed, weighted, highlight }) {
  const svgRef = useRef(null);
  const [draggingNode, setDraggingNode] = useState(null);
  const [edgeTemp, setEdgeTemp] = useState(null);

  const getSvgPoint = (e) => {
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
  };

  const addNode = (x, y) => {
    setGraph((prev) => {
      const nextId = (prev.nodes.length + 1).toString();
      return {
        ...prev,
        nodes: [...prev.nodes, { id: nextId, label: nextId, x, y }],
      };
    });
  };

  const handleSvgClick = (e) => {
    if (mode !== "add-node") return;
    const { x, y } = getSvgPoint(e);
    addNode(x, y);
  };

  const handleNodeClick = (e, node) => {
    e.stopPropagation();

    if (mode === "add-edge") {
      if (!edgeTemp) {
        setEdgeTemp({ from: node.id });
        return;
      }
      const from = edgeTemp.from;
      const to = node.id;
      if (from !== to) {
        let w = 1;
        if (weighted) {
          const input = prompt("Enter edge weight:", "1");
          w = Number(input) || 1;
        }
        setGraph((prev) => {
          const newEdges = [...prev.edges, { from, to, weight: w }];
          if (!directed) newEdges.push({ from: to, to: from, weight: w });
          return { ...prev, edges: newEdges };
        });
      }
      setEdgeTemp(null);
      return;
    }

    if (mode === "delete-node") {
      setGraph((prev) => ({
        nodes: prev.nodes.filter((n) => n.id !== node.id),
        edges: prev.edges.filter(
          (e) => e.from !== node.id && e.to !== node.id
        ),
      }));
      return;
    }

    if (mode === "select") setDraggingNode(node.id);
  };

  const handleEdgeClick = (edge) => {
    if (mode === "delete-edge") {
      setGraph((prev) => ({
        ...prev,
        edges: prev.edges.filter((e) => e !== edge),
      }));
    }
  };

  const handleMouseMove = (e) => {
    if (!draggingNode) return;
    const { x, y } = getSvgPoint(e);
    setGraph((prev) => ({
      ...prev,
      nodes: prev.nodes.map((n) =>
        n.id === draggingNode ? { ...n, x, y } : n
      ),
    }));
  };

  const handleMouseUp = () => setDraggingNode(null);

  return (
    <div className="canvas-box">
      <svg
        ref={svgRef}
        width="100%"
        height="600"
        style={{ background: "#fefefe", borderRadius: "12px" }}
        onClick={handleSvgClick}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <defs>
          <marker
            id="arrow"
            markerWidth="8"
            markerHeight="8"
            refX="10"
            refY="4"
            orient="auto"
          >
            <path d="M0,0 L10,4 L0,8 z" fill="#333" />
          </marker>
        </defs>

        {/* Draw Edges */}
        {graph.edges.map((e, i) => {
          const from = graph.nodes.find((n) => n.id === e.from);
          const to = graph.nodes.find((n) => n.id === e.to);
          if (!from || !to) return null;
          return (
            <g
              key={i}
              onClick={() => handleEdgeClick(e)}
              style={{ cursor: mode === "delete-edge" ? "pointer" : "default" }}
            >
              <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="#444"
                strokeWidth="2"
                markerEnd={directed ? "url(#arrow)" : ""}
              />
              {weighted && (
                <text
                  x={(from.x + to.x) / 2}
                  y={(from.y + to.y) / 2 - 5}
                  fontSize="12"
                  textAnchor="middle"
                  fill="#111"
                >
                  {e.weight}
                </text>
              )}
            </g>
          );
        })}

        {/* Draw Nodes */}
        {graph.nodes.map((n) => (
          <g
            key={n.id}
            transform={`translate(${n.x},${n.y})`}
            onMouseDown={(e) => handleNodeClick(e, n)}
            style={{ cursor: "pointer" }}
          >
            <circle
            r="18"
            className={
              Array.isArray(highlight) && highlight.includes(n.id)
                ? "cycle"
                : n.id === highlight
                ? "highlighted"
                : ""
            }
            fill="#007bff"
          />
            <text
              textAnchor="middle"
              dy="5"
              fill="white"
              fontWeight="bold"
              fontSize="13"
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
