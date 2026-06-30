import type { Service } from "@prisma/client";
import type { AdminDictionary } from "@/content/admin";
import { Field, TextArea, Select } from "./formFields";

const LOCALE_OPTIONS: [string, string][] = [
  ["hy", "Հայերեն (HY)"],
  ["en", "English (EN)"],
  ["ru", "Русский (RU)"],
];

export function ServiceForm({
  service,
  action,
  t,
}: {
  service?: Service;
  action: (formData: FormData) => void;
  t: AdminDictionary["form"];
}) {
  const featuresText = Array.isArray(service?.features)
    ? (service.features as string[]).join("\n")
    : "";

  return (
    <form action={action} className="flex flex-col gap-4">
      {service ? <input type="hidden" name="id" value={service.id} /> : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <Select label={t.language} name="language" defaultValue={service?.language ?? "hy"} options={LOCALE_OPTIONS} />
        <Field label={t.order} name="order" type="number" defaultValue={service?.order ?? 0} />
        <Field label={t.title} name="title" defaultValue={service?.title} required />
        <Field label={t.slug} name="slug" defaultValue={service?.slug} required hint={t.slugHint} />
        <Field label={t.category} name="category" defaultValue={service?.category} hint={t.categoryHint} />
        <Field label={t.iconKey} name="iconKey" defaultValue={service?.iconKey} hint={t.iconHint} />
      </div>

      <TextArea label={t.goal} name="shortDescription" defaultValue={service?.shortDescription} rows={2} />
      <TextArea label={t.included} name="features" defaultValue={featuresText} rows={6} hint={t.includedHint} />
      <TextArea label={t.businessValue} name="businessValue" defaultValue={service?.businessValue} rows={2} />
      <TextArea label={t.fullDescription} name="fullDescription" defaultValue={service?.fullDescription} rows={3} />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t.seoTitle} name="seoTitle" defaultValue={service?.seoTitle} />
        <Field label={t.seoDescription} name="seoDescription" defaultValue={service?.seoDescription} />
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
