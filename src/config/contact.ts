/**
 * Contact + social placeholders. Replace before launch.
 * Tracked in docs/buildpack/OPEN_ITEMS_LOG.md.
 */
export const contact = {
  phone: { label: "+374 00 000 000", href: "tel:+37400000000" },
  email: { label: "hello@menq.example", href: "mailto:hello@menq.example" },
  telegram: { label: "Telegram", href: "https://t.me/menq" },
  whatsapp: { label: "WhatsApp", href: "https://wa.me/37400000000" },
  socials: [
    { id: "telegram", label: "Telegram", href: "https://t.me/menq" },
    { id: "whatsapp", label: "WhatsApp", href: "https://wa.me/37400000000" },
    { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com/company/menq" },
    { id: "instagram", label: "Instagram", href: "https://instagram.com/menq" },
  ],
} as const;

export type ContactConfig = typeof contact;
