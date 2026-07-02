/**
 * Edge-safe auth cookie constants. This module has NO server-only imports
 * (no Prisma / next/headers), so it can be imported from the edge proxy.
 */
export const SESSION_COOKIE = "menq_session";
