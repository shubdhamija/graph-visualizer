📘 Graph Visualizer

An elegant, fully interactive graph algorithm simulator built with React (Vite) and SVG.
It lets users create, edit, and visualize directed/undirected and weighted/unweighted graphs in real-time, with live algorithm animations and cycle detection.

🌐 Live Demo

🔗 https://graph-visualizer-yourname.vercel.app

(Replace with your actual deployed URL)

🛠️ Tech Stack
Layer	Technology
Frontend Framework	React (Vite)
Language	JavaScript (ES6)
Visualization	SVG
Styling	CSS (Glassmorphism + Animations)
State Management	React Hooks (useState, useEffect)
Data Storage	LocalStorage
Deployment	Vercel
✨ Features

🧱 Graph Editor

1. Add, drag, or delete nodes and edges

2. Toggle Directed / Undirected and Weighted / Unweighted edges

3. Nodes are automatically numbered in ascending order

⚙️ Algorithms Implemented

1. Breadth-First Search (BFS) — animated level-order traversal

2. Depth-First Search (DFS) — recursive visual traversal

3. Dijkstra’s Algorithm — computes shortest path weights

4. Topological Sort — verifies and orders DAGs

5. Cycle Detection — highlights cycles dynamically (red-glow nodes 🔴)

🎨 UI & Experience

1. Clean glassmorphism design with shadows & gradients

2. Live traversal logs displayed beside visualization

3. Smooth animations and glowing highlights

4. Graph data persists across refreshes via LocalStorage

🚀 Quick Start
```
# Clone repository
git clone https://github.com/<your-username>/graph-visualizer.git
cd graph-visualizer

# Install dependencies
npm install

# Run development server
npm run dev
```

Then open http://localhost:5173/
 in your browser.

```
📂 Project Structure
graph-visualizer/
├── public/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── styles.css
│   ├── components/
│   │   ├── GraphCanvas.jsx
│   │   ├── Controls.jsx
│   │   └── AlgorithmPanel.jsx
│   └── algorithms/
│       ├── bfs.js
│       ├── dfs.js
│       ├── dijkstra.js
│       └── topoSort.js
├── package.json
└── vite.config.js
```
🧩 How It Works

->GraphCanvas.jsx
   Handles interactive graph drawing using SVG.
   Supports dragging, adding, deleting, and edge creation.

->AlgorithmPanel.jsx
   Runs algorithms, animates traversals, and logs each visited node.
   Highlights nodes via React state updates (highlight).

->Controls.jsx
   Lets users choose modes — add node, add edge, delete, or select.

->styles.css
   Defines the entire glassmorphic UI and animations for traversal & cycles.

🧠 Algorithm Animations
Algorithm	Node Highlight Color
BFS / DFS	🟡 Yellow (pulsing)
Dijkstra	🟩 Green (distance logs)
Cycle Detection	🔴 Red (glowing nodes)
