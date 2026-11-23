"use client";

import "@xyflow/react/dist/style.css";
import { useMemo, useState } from "react";
import { Controls, ReactFlow, type Edge, type Node, useReactFlow, ReactFlowProvider } from "@xyflow/react";
import { useRouter } from "next/navigation";
import type { EntityType } from "@prisma/client";
import type { GraphNodeData, EgoGraphEdge } from "@/services/graph";
import { useLanguage } from "@/context/LanguageContext";
import { entityHref } from "@/lib/routes";
import { ExternalLink, Filter, RotateCcw, Sparkles } from "lucide-react";

const colors: Record<EntityType, { bg: string; border: string; badge: string }> = {
  CIVILIZATION: { bg: "#0f766e", border: "#2dd4bf", badge: "bg-teal-900/80 text-teal-200" },
  PERSON: { bg: "#1e40af", border: "#60a5fa", badge: "bg-blue-900/80 text-blue-200" },
  EVENT: { bg: "#b45309", border: "#fde047", badge: "bg-amber-900/80 text-amber-200" },
  IDEA: { bg: "#7e22ce", border: "#c084fc", badge: "bg-purple-900/80 text-purple-200" },
  BOOK: { bg: "#be123c", border: "#fda4af", badge: "bg-rose-900/80 text-rose-200" },
};

const labelsEn: Record<EntityType, string> = {
  CIVILIZATION: "Civilization",
  PERSON: "Person",
  EVENT: "Event",
  IDEA: "Idea",
  BOOK: "Book",
};

const labelsVi: Record<EntityType, string> = {
  CIVILIZATION: "Nền văn minh",
  PERSON: "Nhân vật",
  EVENT: "Sự kiện",
  IDEA: "Tư tưởng",
  BOOK: "Tác phẩm",
};

function InnerGraphFlow({
  nodes,
  edges,
}: {
  nodes: Node<GraphNodeData>[];
  edges: EgoGraphEdge[];
}) {
  const router = useRouter();
  const { language, t } = useLanguage();
  const isVi = language === "vi";
  const [selectedType, setSelectedType] = useState<EntityType | "ALL">("ALL");
  const { fitView } = useReactFlow();

  // Count available nodes per type
  const countsByType = useMemo(() => {
    const counts: Record<string, number> = { ALL: 0 };
    for (const n of nodes) {
      if (!n.data.isCenter) {
        counts[n.data.type] = (counts[n.data.type] ?? 0) + 1;
        counts.ALL += 1;
      }
    }
    return counts;
  }, [nodes]);

  // Filter nodes & edges
  const filteredNodes = useMemo(() => {
    return nodes
      .filter((node) => node.data.isCenter || selectedType === "ALL" || node.data.type === selectedType)
      .map((node) => {
        const isCenter = node.data.isCenter;
        const color = colors[node.data.type];
        const displayTitle = isVi && node.data.labelVi ? node.data.labelVi : node.data.label;
        const originalTitle =
          isVi && node.data.labelVi && node.data.labelVi !== node.data.label ? node.data.label : null;

        return {
          ...node,
          data: {
            ...node.data,
            label: (
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-80 mb-0.5">
                  {isCenter ? (isVi ? "★ Trọng tâm" : "★ Center") : isVi ? labelsVi[node.data.type] : labelsEn[node.data.type]}
                </span>
                <span className="text-sm font-semibold leading-snug line-clamp-2">
                  {displayTitle}
                </span>
                {originalTitle && (
                  <span className="text-[11px] font-normal text-white/70 truncate mt-0.5">
                    {originalTitle}
                  </span>
                )}
              </div>
            ),
          },
          style: {
            ...node.style,
            background: isCenter
              ? "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"
              : color.bg,
            border: isCenter
              ? "3px solid #f59e0b"
              : `2px solid ${color.border}`,
            borderRadius: 14,
            color: "#fff",
            padding: "10px 14px",
            width: isCenter ? 210 : 180,
            boxShadow: isCenter
              ? "0 0 25px rgba(245, 158, 11, 0.45), 0 10px 15px -3px rgba(0, 0, 0, 0.3)"
              : "0 4px 6px -1px rgba(0, 0, 0, 0.15), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
            cursor: "grab",
          },
        };
      });
  }, [nodes, selectedType, isVi]);

  const visibleNodeIds = useMemo(() => new Set(filteredNodes.map((n) => n.id)), [filteredNodes]);

  const filteredEdges = useMemo(() => {
    return edges
      .filter((edge) => visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target))
      .map((edge) => ({
        ...edge,
        label: isVi && edge.labelVi ? edge.labelVi : edge.label,
        style: { stroke: "#94a3b8", strokeWidth: 1.5 },
        labelStyle: { fill: "#334155", fontWeight: 600, fontSize: 11 },
        labelBgStyle: { fill: "#ffffff", fillOpacity: 0.9, rx: 6, ry: 6 },
        labelBgPadding: [6, 4] as [number, number],
      }));
  }, [edges, visibleNodeIds, isVi]);

  const centerNode = nodes.find((n) => n.data.isCenter);

  return (
    <div className="space-y-4">
      {/* Controls & Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-stone-200 bg-white p-3 shadow-xs">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
          <Filter size={15} className="text-amber-600" />
          <span>{t("Filter by entity type:", "Lọc theo loại thực thể:")}</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedType("ALL")}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
              selectedType === "ALL"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {t("All", "Tất cả")} ({countsByType.ALL})
          </button>
          {(Object.keys(labelsEn) as EntityType[]).map((type) => {
            const count = countsByType[type] ?? 0;
            if (count === 0) return null;
            return (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedType(type)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition flex items-center gap-1.5 ${
                  selectedType === type
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <span className="size-2 rounded-full" style={{ backgroundColor: colors[type].border }} />
                {isVi ? labelsVi[type] : labelsEn[type]} ({count})
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          {centerNode && (
            <a
              href={entityHref(centerNode.data.type, centerNode.data.slug)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800 hover:text-amber-900 hover:underline"
            >
              {t("Full detail page", "Trang chi tiết")} <ExternalLink size={12} />
            </a>
          )}
          <button
            type="button"
            onClick={() => fitView({ padding: 0.25, duration: 400 })}
            className="inline-flex items-center gap-1 rounded-lg border border-stone-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-stone-50"
            title={t("Reset zoom and centering", "Đặt lại khung nhìn")}
          >
            <RotateCcw size={12} /> {t("Reset view", "Đặt lại")}
          </button>
        </div>
      </div>

      {/* Main Graph Canvas */}
      <div
        className="relative h-[560px] overflow-hidden rounded-2xl border border-stone-200 bg-gradient-to-br from-slate-900 via-slate-950 to-stone-900 shadow-inner"
        role="group"
        aria-label={t("Interactive knowledge graph", "Đồ thị tri thức tương tác")}
      >
        <div className="absolute top-3 left-4 z-10 flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-medium text-slate-300 backdrop-blur border border-white/10 pointer-events-none">
          <Sparkles size={13} className="text-amber-400" />
          <span>
            {t(
              "Drag nodes to rearrange · Click any node to refocus",
              "Kéo thả các nút để sắp xếp · Nhấn vào nút bất kỳ để đổi trọng tâm"
            )}
          </span>
        </div>

        <ReactFlow
          nodes={filteredNodes}
          edges={filteredEdges}
          fitView
          fitViewOptions={{ padding: 0.25 }}
          nodesDraggable={true}
          nodesConnectable={false}
          elementsSelectable={true}
          onNodeClick={(_, node) => {
            router.push(`/graph?type=${node.data.type}&slug=${encodeURIComponent(node.data.slug)}`);
          }}
        >
          <Controls showInteractive={false} className="bg-white/90 shadow-md border border-stone-200 rounded-lg" />
        </ReactFlow>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
        <div className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Graph legend">
          {(Object.keys(labelsEn) as EntityType[]).map((type) => (
            <span key={type} className="inline-flex items-center gap-2">
              <span className="size-3 rounded-full shadow-xs" style={{ backgroundColor: colors[type].bg }} aria-hidden="true" />
              <span className="font-medium text-slate-700">{isVi ? labelsVi[type] : labelsEn[type]}</span>
            </span>
          ))}
        </div>
        <p className="text-slate-500 italic">
          {t("Showing 1-hop connections", "Đang hiển thị liên kết trực tiếp (1-hop)")}
        </p>
      </div>
    </div>
  );
}

export function GraphView({ nodes, edges }: { nodes: Node<GraphNodeData>[]; edges: EgoGraphEdge[] }) {
  return (
    <ReactFlowProvider>
      <InnerGraphFlow nodes={nodes} edges={edges} />
    </ReactFlowProvider>
  );
}
