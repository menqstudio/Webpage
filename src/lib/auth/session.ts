import { cookies } from "next/headers";
import { randomBytes, createHash } from "crypto";
import { getPrisma } from "@/lib/db/prisma";
import { SESSION_COOKIE } from "./cookies";

export { SESSION_COOKIE };

const SESSION_MAX_AGE_S = Number(process.env.SESSION_MAX_AGE ?? 60 * 60 * 24 * 7);

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
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE_S * 1000);

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
    maxAge: SESSION_MAX_AGE_S,
  });
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
