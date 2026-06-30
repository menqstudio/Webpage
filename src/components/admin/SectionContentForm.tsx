import type { SectionDef } from "@/config/sectionContent";

const inputCls =
  "w-full rounded-lg border border-edge-strong bg-surface-primary px-3 py-2 text-sm text-content-primary placeholder:text-content-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus";

const asStr = (v: unknown): string => (typeof v === "string" ? v : "");
const asList = (v: unknown): unknown[] => (Array.isArray(v) ? v : []);

export function SectionContentForm({
  def,
  language,
  defaults,
  action,
  saveLabel,
}: {
  def: SectionDef;
  language: string;
  defaults: Record<string, unknown>;
  action: (formData: FormData) => void;
  saveLabel: string;
}) {
  return (
    <form action={action} className="flex flex-col gap-5">
      <input type="hidden" name="type" value={def.type} />
      <input type="hidden" name="language" value={language} />

      {def.fields.map((f) => {
        if (f.type === "text") {
          return (
            <label key={f.key} className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-content-primary">{f.label}</span>
              <input name={f.key} defaultValue={asStr(defaults[f.key])} className={inputCls} />
            </label>
          );
        }
        if (f.type === "textarea") {
          return (
            <label key={f.key} className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-content-primary">{f.label}</span>
              <textarea
                name={f.key}
                rows={f.rows ?? 3}
                defaultValue={asStr(defaults[f.key])}
                className={`${inputCls} resize-y`}
              />
            </label>
          );
        }
        if (f.type === "stringList") {
          const vals = asList(defaults[f.key]);
          return (
            <fieldset key={f.key} className="flex flex-col gap-2 rounded-lg border border-edge-subtle p-3">
              <legend className="px-1 text-sm font-medium text-content-primary">{f.label}</legend>
              {Array.from({ length: f.count }).map((_, i) => (
                <input
                  key={i}
                  name={`${f.key}.${i}`}
                  defaultValue={asStr(vals[i])}
                  placeholder={`${f.label} ${i + 1}`}
                  className={inputCls}
                />
              ))}
            </fieldset>
          );
        }
        // cardList
        const cards = asList(defaults[f.key]);
        return (
          <fieldset key={f.key} className="flex flex-col gap-3 rounded-lg border border-edge-subtle p-3">
            <legend className="px-1 text-sm font-medium text-content-primary">{f.label}</legend>
            {Array.from({ length: f.count }).map((_, i) => {
              const card = (cards[i] ?? {}) as Record<string, unknown>;
              return (
                <div key={i} className="grid gap-2 rounded-md bg-surface-secondary p-2 sm:grid-cols-[1fr_2fr]">
                  {f.sub.map((s) => (
                    <input
                      key={s.key}
                      name={`${f.key}.${i}.${s.key}`}
                      defaultValue={asStr(card[s.key])}
                      placeholder={`${i + 1} · ${s.label}`}
                      className={inputCls}
                    />
                  ))}
                </div>
              );
            })}
          </fieldset>
        );
      })}

      <button
        type="submit"
        className="self-start rounded-pill bg-action-primary px-5 py-2.5 text-sm font-semibold text-content-inverse"
      >
        {saveLabel}
      </button>
    </form>
  );
}
