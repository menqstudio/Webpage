export const BOOKING_STATUSES = [
  "NEW",
  "CONFIRMED",
  "RESCHEDULED",
  "COMPLETED",
  "CANCELLED",
  "NO_SHOW",
  "ARCHIVED",
] as const;

export type BookingStatus = (typeof BOOKING_STATUSES)[number];
