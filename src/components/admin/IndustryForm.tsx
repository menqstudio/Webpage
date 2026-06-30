import type { Industry } from "@prisma/client";
import type { AdminDictionary } from "@/content/admin";
import { Field, TextArea, Select } from "./formFields";

const LOCALE_OPTIONS: [string, string][] = [
  ["hy", "Հայերեն (HY)"],
  ["en", "English (EN)"],
  ["ru", "Русский (RU)"],
];

export function IndustryForm({
  industry,
  action,
  t,
}: {
  industry?: Industry;
  action: (formData: FormData) => void;
  t: AdminDictionary["form"];
}) {
  return (
    <form action={action} className="flex flex-col gap-4">
      {industry ? <input type="hidden" name="id" value={industry.id} /> : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <Select label={t.language} name="language" defaultValue={industry?.language ?? "hy"} options={LOCALE_OPTIONS} />
        <Field label={t.order} name="order" type="number" defaultValue={industry?.order ?? 0} />
        <Field label={t.title} name="title" defaultValue={industry?.title} required />
        <Field label={t.slug} name="slug" defaultValue={industry?.slug} required hint={t.slugHint} />
        <Field label={t.group} name="group" defaultValue={industry?.group} hint={t.groupHint} />
        <Field label={t.iconKey} name="iconKey" defaultValue={industry?.iconKey} hint={t.iconHint} />
      </div>

      <TextArea label={t.examples} name="description" defaultValue={industry?.description} rows={3} />
      <TextArea label={t.recommendedSolutions} name="recommendedSolutions" defaultValue={industry?.recommendedSolutions} rows={3} />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t.seoTitle} name="seoTitle" defaultValue={industry?.seoTitle} />
        <Field label={t.seoDescription} name="seoDescription" defaultValue={industry?.seoDescription} />
      </div>

      <button
        type="submit"
        className="self-start rounded-pill bg-action-primary px-5 py-2.5 text-sm font-semibold text-content-inverse"
      >
        {t.save}
      </button>
    </form>
  );
}
