export default function topoSort(nodes, edges) {
  const adj = {};
  const indegree = {};

  nodes.forEach((n) => (indegree[n.id] = 0));

  edges.forEach((e) => {
    if (!adj[e.from]) adj[e.from] = [];
    adj[e.from].push(e.to);
    indegree[e.to] = (indegree[e.to] || 0) + 1;
  });

  const queue = Object.keys(indegree).filter((n) => indegree[n] === 0);
  const order = [];

  while (queue.length) {
    const u = queue.shift();
    order.push(u);
    (adj[u] || []).forEach((v) => {
      indegree[v]--;
      if (indegree[v] === 0) queue.push(v);
    });
  }

  if (order.length !== nodes.length) {
    return ["Graph contains a cycle!"];
  }

  return order;
}
