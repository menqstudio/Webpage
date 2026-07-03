import { describe, it, expect, afterEach } from "vitest";
import {
  sessionExpiry,
  sessionMaxAgeS,
  sessionIdleTimeoutS,
} from "@/lib/auth/sessionPolicy";

const NOW = 1_700_000_000_000; // fixed reference instant (ms)
const DAY = 86_400_000;
const DEFAULT_IDLE = DAY; // 24h
const DEFAULT_MAX = 7 * DAY; // 7d

describe("sessionPolicy", () => {
  const origIdle = process.env.SESSION_IDLE_TIMEOUT;
  const origMax = process.env.SESSION_MAX_AGE;
  afterEach(() => {
    if (origIdle === undefined) delete process.env.SESSION_IDLE_TIMEOUT;
    else process.env.SESSION_IDLE_TIMEOUT = origIdle;
    if (origMax === undefined) delete process.env.SESSION_MAX_AGE;
    else process.env.SESSION_MAX_AGE = origMax;
  });

  it("defaults to a 24h idle window on a fresh session", () => {
    delete process.env.SESSION_IDLE_TIMEOUT;
    delete process.env.SESSION_MAX_AGE;
    const expiry = sessionExpiry(NOW, new Date(NOW));
    expect(expiry.getTime()).toBe(NOW + DEFAULT_IDLE);
  });

  it("clamps to the absolute cap near end of life", () => {
    delete process.env.SESSION_IDLE_TIMEOUT;
    delete process.env.SESSION_MAX_AGE;
    // Created 6.9 days ago: the absolute cap (7d) leaves < the 24h idle window.
    const createdAt = new Date(NOW - 6.9 * DAY);
    const expiry = sessionExpiry(NOW, createdAt);
    expect(expiry.getTime()).toBe(createdAt.getTime() + DEFAULT_MAX);
    expect(expiry.getTime()).toBeLessThan(NOW + DEFAULT_IDLE);
  });

  it("honors SESSION_IDLE_TIMEOUT override", () => {
    process.env.SESSION_IDLE_TIMEOUT = "3600"; // 1h
    delete process.env.SESSION_MAX_AGE;
    const expiry = sessionExpiry(NOW, new Date(NOW));
    expect(expiry.getTime()).toBe(NOW + 3_600_000);
  });

  it("honors SESSION_MAX_AGE override as the ceiling", () => {
    delete process.env.SESSION_IDLE_TIMEOUT; // 24h idle
    process.env.SESSION_MAX_AGE = "3600"; // 1h absolute cap
    const expiry = sessionExpiry(NOW, new Date(NOW));
    expect(expiry.getTime()).toBe(NOW + 3_600_000); // cap beats the idle window
  });

  it("falls back to defaults on invalid env", () => {
    process.env.SESSION_IDLE_TIMEOUT = "not-a-number";
    process.env.SESSION_MAX_AGE = "";
    expect(sessionIdleTimeoutS()).toBe(DEFAULT_IDLE / 1000);
    expect(sessionMaxAgeS()).toBe(DEFAULT_MAX / 1000);
  });
});
