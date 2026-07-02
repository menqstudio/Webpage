import bcrypt from "bcryptjs";

const ROUNDS = 12;

export function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, ROUNDS);
}

export function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

// Precomputed once at module load. Used to equalize response time on the
// unknown-user login path so an attacker can't distinguish "no such user"
// (fast, no hash) from "wrong password" (slow, real hash) via timing.
const DUMMY_HASH = bcrypt.hashSync("timing-equalizer-not-a-real-secret", ROUNDS);

/** Runs a throwaway bcrypt compare to match the cost of a real verify. */
export function verifyDummyPassword(plain: string): Promise<boolean> {
  return bcrypt.compare(plain, DUMMY_HASH);
}

/** Per AUTH_SYSTEM.md: at least 10 characters. */
export function isPasswordStrong(plain: string): boolean {
  return typeof plain === "string" && plain.length >= 10;
}
