/**
 * Session lifetime policy — pure, no Next/server imports so it's unit-testable.
 * Env is read at call time (like clientIp) so tests can vary it per case.
 *
 * Two independent bounds:
 *  - absolute cap  (SESSION_MAX_AGE)     — hard ceiling from session creation.
 *  - idle timeout  (SESSION_IDLE_TIMEOUT) — expires this long after last activity.
 * The effective deadline is the idle window from now, clamped to the cap.
 */

const DEFAULT_MAX_AGE_S = 60 * 60 * 24 * 7; // 7 days
const DEFAULT_IDLE_TIMEOUT_S = 60 * 60 * 24; // 24 hours

// Only rewrite a session's deadline once it has drifted at least this far, so
// activity refresh stays at ~one write per burst instead of one per request.
export const SESSION_REFRESH_THRESHOLD_S = 5 * 60;

export function sessionMaxAgeS(): number {
  return (
    Number(process.env.SESSION_MAX_AGE ?? DEFAULT_MAX_AGE_S) || DEFAULT_MAX_AGE_S
  );
}

export function sessionIdleTimeoutS(): number {
  return (
    Number(process.env.SESSION_IDLE_TIMEOUT ?? DEFAULT_IDLE_TIMEOUT_S) ||
    DEFAULT_IDLE_TIMEOUT_S
  );
}

/** Effective deadline: idle window from `nowMs`, capped by the absolute max. */
export function sessionExpiry(nowMs: number, createdAt: Date): Date {
  const idle = nowMs + sessionIdleTimeoutS() * 1000;
  const absolute = createdAt.getTime() + sessionMaxAgeS() * 1000;
  return new Date(Math.min(idle, absolute));
}
