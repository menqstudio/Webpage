import { cookies } from "next/headers";
import { randomBytes, createHash } from "crypto";
import { getPrisma } from "@/lib/db/prisma";
import { SESSION_COOKIE } from "./cookies";
import {
  sessionExpiry,
  sessionMaxAgeS,
  SESSION_REFRESH_THRESHOLD_S,
} from "./sessionPolicy";

export { SESSION_COOKIE };

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/** Creates a DB-backed session and sets the httpOnly cookie. */
export async function createSession(
  userId: string,
  meta?: { ipAddress?: string; userAgent?: string },
): Promise<void> {
  const db = getPrisma();
  if (!db) throw new Error("DATABASE_URL not configured");

  const token = randomBytes(32).toString("hex");
  const now = Date.now();
  const expiresAt = sessionExpiry(now, new Date(now));

  await db.session.create({
    data: {
      userId,
      tokenHash: hashToken(token),
      expiresAt,
      ipAddress: meta?.ipAddress,
      userAgent: meta?.userAgent,
    },
  });

  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    // Cookie lives for the absolute cap; the server-side `expiresAt` enforces
    // the (shorter) idle timeout as the source of truth.
    maxAge: sessionMaxAgeS(),
  });
}

/**
 * Slides a valid session's idle deadline forward on activity. Skips the write
 * unless the deadline has drifted past the refresh threshold, so most requests
 * incur no extra DB write. Never throws.
 */
export async function refreshSessionActivity(session: {
  id: string;
  createdAt: Date;
  expiresAt: Date;
}): Promise<void> {
  const db = getPrisma();
  if (!db) return;
  const next = sessionExpiry(Date.now(), session.createdAt);
  if (
    next.getTime() - session.expiresAt.getTime() <
    SESSION_REFRESH_THRESHOLD_S * 1000
  ) {
    return; // already at/near the cap, or refreshed recently
  }
  try {
    await db.session.update({
      where: { id: session.id },
      data: { expiresAt: next },
    });
  } catch {
    /* activity refresh must never break the request */
  }
}

/** Deletes the current session row and clears the cookie. */
export async function destroySession(): Promise<void> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (token) {
    const db = getPrisma();
    if (db) {
      try {
        await db.session.deleteMany({ where: { tokenHash: hashToken(token) } });
      } catch {
        /* ignore */
      }
    }
  }
  store.delete(SESSION_COOKIE);
}

/** Invalidates all sessions for a user (logout-everywhere, on reset/suspend). */
export async function invalidateUserSessions(userId: string): Promise<void> {
  const db = getPrisma();
  if (!db) return;
  await db.session.deleteMany({ where: { userId } });
}
