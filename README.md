# 🚀 Pipeline Editor (DAG Builder) – Frontend Intern Assignment

A visual **Pipeline Editor** built with **React**, **TypeScript**, and **React Flow**, allowing users to construct and validate **Directed Acyclic Graphs (DAGs)** interactively.

---

## 📦 Features

- ➕ Add Nodes dynamically
- 🔗 Draw directional edges manually
- ❌ Prevent invalid connections (e.g., self-loops, cycles, outgoing→outgoing, etc.)
- ⌫ Delete selected nodes or edges
- ✅ DAG validity check (real-time)
- 📐 Auto-layout using `dagre`
- 🧠 JSON Preview of the DAG structure
- 🎨 Clean UI with React Flow styling

---

## 🛠 Setup Instructions

1. **Clone this Repository**
   ```bash
   git clone https://github.com/malapatiprasanna/dag-build.git
   cd dag-build
2. **Install Dependencies**
   ```bash
   npm install
   npm run dev

## 🧰 Tech Stack & Libraries
**Tool/Library**         ->      	    **Purpose**

React + TypeScript       ->     	Core frontend framework

React Flow	             ->       Graph rendering & interaction

Dagre                    ->     	Auto-layout logic for nodes

UUID	                   ->       Unique ID generation for nodes

Vite	                   ->       Fast dev server & build tool

## 🔎 Notes on Decisions
**React Flow** was chosen to simplify graph drawing, event handling, and zooming/panning.

**Dagre** auto-layout improves usability and readability in dense graphs.

Nodes and edges are validated in real-time to provide immediate feedback.

The project is modular, readable, and scalable for future features like node types or context menus.

## 🚧 Challenges Faced
**⚙️ Edge Validation Logic:** Handling invalid connections like self-loops and enforcing outgoing→incoming only required custom logic.

**🔄 Cycle Detection:** Implemented using depth-first search to validate DAG correctness.

**📐 Auto Layout:** Integrating dagre to reposition nodes dynamically was tricky with React Flow’s coordinate system.

**🧪 Type Safety:** Ensured TypeScript caught edge cases and enforced types across hooks.


![Screenshot (200)](https://github.com/user-attachments/assets/141080b0-8b1c-4dd6-bb25-39573fc02a04)

![Screenshot (201)](https://github.com/user-attachments/assets/ded42a6a-acc8-455c-9f5d-2d72bb776555)

![Screenshot (202)](https://github.com/user-attachments/assets/ec5c6f99-7ad1-4a4f-81ef-7f927a52a249)

![Screenshot (203)](https://github.com/user-attachments/assets/37cbb6d2-a13d-42d4-be4a-56f4731b30e7)

![Screenshot (204)](https://github.com/user-attachments/assets/e82a6182-cda0-4d00-9255-90e7892dfad5)




https://github.com/user-attachments/assets/136e535c-282d-4f01-8f89-ddebc0920617








