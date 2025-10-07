export default function dijkstra(nodes, edges) {
  if (nodes.length === 0) return [];

  // Build adjacency list with weights
  const adj = {};
  edges.forEach((e) => {
    if (!adj[e.from]) adj[e.from] = [];
    adj[e.from].push({ to: e.to, weight: e.weight || 1 });
  });

  const dist = {};
  const prev = {};
  const Q = new Set(nodes.map((n) => n.id));

  nodes.forEach((n) => (dist[n.id] = Infinity));
  const start = nodes[0].id;
  dist[start] = 0;

  while (Q.size) {
    // Find node with smallest distance
    let u = null;
    let minDist = Infinity;
    Q.forEach((n) => {
      if (dist[n] < minDist) {
        minDist = dist[n];
        u = n;
      }
    });

    if (u === null) break;
    Q.delete(u);

    (adj[u] || []).forEach(({ to, weight }) => {
      const alt = dist[u] + weight;
      if (alt < dist[to]) {
        dist[to] = alt;
        prev[to] = u;
      }
    });
  }

  return { dist, prev };
}
