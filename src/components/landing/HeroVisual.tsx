import { Activity, Bot, CircleCheck, Sparkles } from "lucide-react";
import type { Dictionary } from "@/content/locales/types";

export function HeroVisual({ dict }: { dict: Dictionary }) {
  const v = dict.hero.visual;
  return (
    <div className="relative mx-auto w-full max-w-xl" aria-hidden="true">
      <div className="pointer-events-none absolute -inset-6 rounded-3xl bg-hero-gradient blur-2xl" />
      <div className="animate-float absolute -left-3 top-10 z-raised hidden rounded-pill border border-edge-strong bg-accent-soft px-3 py-2 text-xs font-semibold text-content-primary shadow-card sm:flex sm:items-center sm:gap-2"><Sparkles className="h-4 w-4 text-accent" />{v.aiLabel}</div>
      <div className="premium-panel relative rounded-3xl p-3 sm:p-4">
        <div className="mb-3 flex items-center justify-between rounded-2xl border border-edge-subtle bg-surface-secondary px-4 py-3">
          <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-pill bg-state-danger opacity-70" /><span className="h-2.5 w-2.5 rounded-pill bg-state-warning opacity-70" /><span className="h-2.5 w-2.5 rounded-pill bg-state-success opacity-70" /></div>
          <span className="text-xs font-semibold text-content-primary">{v.title}</span>
          <span className="flex items-center gap-1.5 text-2xs text-content-muted"><span className="animate-signal h-2 w-2 rounded-pill bg-state-success" />{v.liveLabel}</span>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {v.metrics.map((metric) => <div key={metric.label} className="premium-card rounded-2xl border border-edge-subtle bg-surface-primary p-3 sm:p-4"><div className="font-display text-xl font-bold text-content-primary sm:text-2xl">{metric.value}</div><div className="mt-1 truncate text-2xs text-content-muted">{metric.label}</div><div className="mt-2 text-xs font-semibold text-accent">{metric.delta}</div></div>)}
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div className="premium-card rounded-2xl border border-edge-subtle bg-surface-primary p-4 sm:col-span-2">
            <div className="mb-4 flex items-center justify-between"><div className="text-xs font-semibold uppercase tracking-wider text-content-muted">{v.pipelineLabel}</div><Activity className="h-4 w-4 text-accent" /></div>
            <div className="space-y-3">{v.pipeline.map((row, index) => <div key={row.label}><div className="mb-1.5 flex items-center justify-between gap-3 text-xs"><span className="truncate text-content-secondary">{row.label}</span><span className="font-semibold text-content-primary">{row.status}</span></div><div className="metric-track h-1.5"><div className="metric-fill" style={{ width: `${92 - index * 22}%` }} /></div></div>)}</div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="premium-card flex-1 rounded-2xl border border-edge-strong bg-accent-soft p-4"><div className="flex items-center gap-2 text-xs text-content-secondary"><Bot className="h-4 w-4 text-accent" />{v.aiLabel}</div><div className="mt-3 text-sm font-semibold leading-relaxed text-content-primary">{v.aiInsight}</div></div>
            <div className="premium-card rounded-2xl border border-edge-subtle bg-surface-primary p-4"><div className="text-2xs uppercase tracking-wider text-content-muted">{v.automationLabel}</div><div className="mt-2 flex items-center gap-2 text-sm font-semibold text-content-primary"><CircleCheck className="h-4 w-4 text-state-success" />{v.automationStatus}</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
