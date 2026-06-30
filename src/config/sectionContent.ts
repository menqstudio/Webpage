/**
 * Schema for the editable landing sections. One generic admin form is rendered
 * from these defs; the public components merge published overrides over the
 * localized dictionary. Field keys match the dictionary shape so a shallow
 * merge "just works".
 */

export type SectionField =
  | { key: string; label: string; type: "text" }
  | { key: string; label: string; type: "textarea"; rows?: number }
  | { key: string; label: string; type: "stringList"; count: number }
  | {
      key: string;
      label: string;
      type: "cardList";
      count: number;
      sub: { key: string; label: string }[];
    };

export type SectionDef = {
  /** Matches the dictionary key + ContentItem.type. */
  type: string;
  fields: SectionField[];
};

const CARD = [
  { key: "title", label: "Title" },
  { key: "body", label: "Body" },
];

export const editableSections: SectionDef[] = [
  {
    type: "hero",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "titleAccent", label: "Title accent", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "textarea", rows: 3 },
      { key: "support", label: "Support text", type: "textarea", rows: 3 },
      { key: "trustLine", label: "Trust line", type: "textarea", rows: 2 },
    ],
  },
  {
    type: "pain",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea", rows: 3 },
      { key: "cards", label: "Cards", type: "cardList", count: 6, sub: CARD },
      { key: "closing", label: "Closing line", type: "textarea", rows: 2 },
    ],
  },
  {
    type: "solution",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea", rows: 3 },
      { key: "pillars", label: "Pillars", type: "cardList", count: 6, sub: CARD },
    ],
  },
  {
    type: "success",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "paragraphs", label: "Paragraphs", type: "stringList", count: 3 },
      { key: "points", label: "Points", type: "stringList", count: 6 },
      { key: "closing", label: "Closing line", type: "textarea", rows: 2 },
    ],
  },
  {
    type: "results",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea", rows: 2 },
      { key: "cards", label: "Cards", type: "cardList", count: 6, sub: CARD },
    ],
  },
  {
    type: "ai",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "paragraphs", label: "Paragraphs", type: "stringList", count: 2 },
      { key: "capabilities", label: "Capabilities", type: "stringList", count: 8 },
    ],
  },
  {
    type: "process",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea", rows: 2 },
      { key: "steps", label: "Steps", type: "cardList", count: 6, sub: CARD },
    ],
  },
  {
    type: "trust",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea", rows: 2 },
      { key: "cards", label: "Cards", type: "cardList", count: 6, sub: CARD },
    ],
  },
  {
    type: "cta",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "body", label: "Body", type: "textarea", rows: 3 },
    ],
  },
];

export const editableSectionTypes = editableSections.map((s) => s.type);

export function getSectionDef(type: string): SectionDef | undefined {
  return editableSections.find((s) => s.type === type);
}
