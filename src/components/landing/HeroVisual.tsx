import { Activity, Bot, CircleCheck } from "lucide-react";
import type { Dictionary } from "@/content/locales/types";
import { cn } from "@/lib/cn";

/**
 * Abstract business-control visual for the hero: metric cards, a sales pipeline,
 * an automation status chip, an AI insight panel, and a small node network.
 * Decorative — uses no real client data and is hidden from assistive tech.
 */
export function HeroVisual({ dict }: { dict: Dictionary }) {
  const v = dict.hero.visual;

  return (
    <div className="relative w-full" aria-hidden="true">
      {/* Ambient glow behind the panel */}
      <div className="pointer-events-none absolute -inset-6 rounded-3xl bg-hero-gradient blur-2xl" />

      <div className="glass relative rounded-3xl p-5 shadow-glow">
        {/* Header row */}
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-content-primary">
            {v.title}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-content-muted">
            <span className="h-2 w-2 rounded-pill bg-state-success" />
            {v.liveLabel}
          </span>
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-3 gap-3">
          {v.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-edge-subtle bg-surface-secondary p-3"
            >
              <div className="text-xl font-bold text-content-primary">
                {m.value}
              </div>
              <div className="mt-1 truncate text-2xs text-content-muted">
                {m.label}
              </div>
              <div className="mt-1 text-xs font-semibold text-accent">
                {m.delta}
              </div>
            </div>
          ))}
        </div>

        {/* Pipeline */}
        <div className="mt-4 rounded-xl border border-edge-subtle bg-surface-secondary p-3">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-content-muted">
            {v.pipelineLabel}
          </div>
          <div className="space-y-2">
            {v.pipeline.map((row, i) => (
              <div key={row.label} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="mb-1 flex items-center justify-between text-xs text-content-secondary">
                    <span>{row.label}</span>
                    <span className="font-semibold text-content-primary">
                      {row.status}
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-pill bg-surface-secondary">
                    <div
                      className="h-full rounded-pill bg-gradient-to-r from-action-primary to-accent"
                      style={{ width: `${92 - i * 22}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Automation + AI insight */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-edge-subtle bg-surface-secondary p-3">
            <Activity className="h-5 w-5 text-accent" />
            <div className="min-w-0">
              <div className="truncate text-xs text-content-muted">
                {v.automationLabel}
              </div>
              <div className="flex items-center gap-1 text-sm font-semibold text-content-primary">
                <CircleCheck className="h-3.5 w-3.5 text-state-success" />
                {v.automationStatus}
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-edge-strong bg-accent-soft p-3">
            <div className="flex items-center gap-1.5 text-xs text-content-secondary">
              <Bot className="h-4 w-4 text-accent" />
              {v.aiLabel}
            </div>
            <div className="mt-1 text-xs font-medium text-content-primary">
              {v.aiInsight}
            </div>
          </div>
        </div>

        {/* Node row */}
        <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2">
          {v.nodes.map((node, i) => (
            <span key={node} className="flex items-center gap-2">
              <span className="rounded-pill border border-edge-subtle bg-surface-secondary px-2.5 py-1 text-2xs font-medium text-content-secondary">
                {node}
              </span>
              {i < v.nodes.length - 1 ? (
                <span
                  className={cn(
                    "h-px w-3 bg-edge-strong",
                    i % 2 === 0 ? "opacity-100" : "opacity-50",
                  )}
                />
              ) : null}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
