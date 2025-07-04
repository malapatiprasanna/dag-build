// DAGBuilderApp.tsx
import React, { useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
  MarkerType,
  Connection,
  Edge,
  Node,
  NodeChange,
  EdgeChange
} from 'reactflow';
import 'reactflow/dist/style.css';
import dagre from 'dagre';
import { v4 as uuidv4 } from 'uuid';

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'TB') => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  const isHorizontal = direction === 'LR';

  dagreGraph.setGraph({ rankdir: direction });
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };
  });

  return { nodes, edges };
};

export default function DAGBuilderApp() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const addNode = () => {
    const label = prompt('Enter node label');
    if (label) {
      const id = uuidv4();
      const newNode: Node = {
        id,
        position: { x: Math.random() * 250, y: Math.random() * 250 },
        data: { label },
        type: 'default',
      };
      setNodes((nds) => [...nds, newNode]);
    }
  };

  const isValidConnection = (connection: Connection) => {
    if (!connection.source || !connection.target) return false;
    if (connection.source === connection.target) return false; // no self loop
    const existing = edges.find(
      (e) => e.source === connection.source && e.target === connection.target
    );
    return !existing;
  };

  const onConnect = useCallback((connection: Connection) => {
    if (isValidConnection(connection)) {
      setEdges((eds) => addEdge({ ...connection, markerEnd: { type: MarkerType.ArrowClosed } }, eds));
    } else {
      alert('Invalid connection');
    }
  }, [edges, setEdges]);

  const deleteSelected = () => {
    const selectedNodeIds = nodes.filter((n) => n.selected).map((n) => n.id);
    const selectedEdgeIds = edges.filter((e) => e.selected).map((e) => e.id);
    setNodes((nds) => nds.filter((n) => !selectedNodeIds.includes(n.id)));
    setEdges((eds) => eds.filter((e) => !selectedEdgeIds.includes(e.id)));
  };

  const autoLayout = () => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges);
    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
  };

  const validateDAG = () => {
    if (nodes.length < 2) return 'Invalid: Requires at least 2 nodes';
    if (edges.length < nodes.length - 1) return 'Invalid: Not all nodes are connected';

    const graph: Record<string, string[]> = {};
    nodes.forEach((n) => (graph[n.id] = []));
    edges.forEach((e) => graph[e.source].push(e.target));

    const visited: Set<string> = new Set();
    const recStack: Set<string> = new Set();

    const hasCycle = (nodeId: string): boolean => {
      if (!visited.has(nodeId)) {
        visited.add(nodeId);
        recStack.add(nodeId);
        for (const neighbor of graph[nodeId]) {
          if (!visited.has(neighbor) && hasCycle(neighbor)) return true;
          else if (recStack.has(neighbor)) return true;
        }
      }
      recStack.delete(nodeId);
      return false;
    };

    for (const node of nodes) {
      if (hasCycle(node.id)) return 'Invalid: Contains cycle';
    }
    return 'Valid DAG';
  };

  return (
    <div style={{ height: '100vh' }}>
      <div className="controls">
        <button onClick={addNode}>Add Node</button>
        <button onClick={deleteSelected}>Delete Selected</button>
        <button onClick={autoLayout}>Auto Layout</button>
        <span>Status: {validateDAG()}</span>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
      <div style={{ padding: 10, background: '#eee' }}>
        <h4>DAG JSON Preview</h4>
        <pre>{JSON.stringify({ nodes, edges }, null, 2)}</pre>
      </div>
    </div>
  );
}