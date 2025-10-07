export default function dfs(nodes, edges) {
  if (nodes.length === 0) return [];
  const adj = {};
  edges.forEach((e) => {
    if (!adj[e.from]) adj[e.from] = [];
    adj[e.from].push(e.to);
  });

  const visited = new Set();
  const result = [];

  function traverse(node) {
    if (visited.has(node)) return;
    visited.add(node);
    result.push(node);
    (adj[node] || []).forEach((n) => traverse(n));
  }

  traverse(nodes[0].id);
  return result;
}
