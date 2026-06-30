export const LEAD_STATUSES = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "PROPOSAL_SENT",
  "WON",
  "LOST",
  "REJECTED",
  "SPAM",
  "DUPLICATE",
  "ARCHIVED",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];
