export default function bfs(nodes, edges) {
  if (nodes.length === 0) return [];
  const adj = {};
  edges.forEach((e) => {
    if (!adj[e.from]) adj[e.from] = [];
    adj[e.from].push(e.to);
  });

  const visited = new Set();
  const queue = [nodes[0].id];
  const result = [];

  while (queue.length) {
    const node = queue.shift();
    if (visited.has(node)) continue;
    visited.add(node);
    result.push(node);
    (adj[node] || []).forEach((n) => queue.push(n));
  }

  return result;
}
