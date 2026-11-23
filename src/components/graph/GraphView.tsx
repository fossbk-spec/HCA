"use client";

import "@xyflow/react/dist/style.css";
import { Controls, ReactFlow, type Edge, type Node } from "@xyflow/react";
import { useRouter } from "next/navigation";
import type { EntityType } from "@prisma/client";
import type { GraphNodeData } from "@/services/graph";

const colors: Record<EntityType, string> = {
  CIVILIZATION: "#0f766e",
  PERSON: "#1d4ed8",
  EVENT: "#b45309",
  IDEA: "#7e22ce",
  BOOK: "#be123c",
};

const labels: Record<EntityType, string> = {
  CIVILIZATION: "Civilization",
  PERSON: "Person",
  EVENT: "Event",
  IDEA: "Idea",
  BOOK: "Book",
};

export function GraphView({ nodes, edges }: { nodes: Node<GraphNodeData>[]; edges: Edge[] }) {
  const router = useRouter();
  const styledNodes = nodes.map((node) => ({
    ...node,
    style: {
      ...node.style,
      background: colors[node.data.type],
      border: node.data.type === "CIVILIZATION" ? "2px solid #99f6e4" : "2px solid rgba(255,255,255,.75)",
      borderRadius: 12,
      color: "#fff",
      fontWeight: 600,
      padding: 10,
      width: 170,
    },
  }));

  return <div className="space-y-4">
    <div className="h-[520px] overflow-hidden rounded-2xl border border-stone-200 bg-white" role="group" aria-label="Interactive knowledge graph">
      <ReactFlow
        nodes={styledNodes}
        edges={edges}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable
        onNodeClick={(_, node) => router.push(`/graph?type=${node.data.type}&slug=${encodeURIComponent(node.data.slug)}`)}
      >
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
    <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600" aria-label="Graph legend">
      {(Object.keys(labels) as EntityType[]).map((type) => <span key={type} className="inline-flex items-center gap-2">
        <span className="size-3 rounded-full" style={{ backgroundColor: colors[type] }} aria-hidden="true" />
        {labels[type]}
      </span>)}
    </div>
  </div>;
}
