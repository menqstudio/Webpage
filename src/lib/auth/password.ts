import bcrypt from "bcryptjs";

const ROUNDS = 12;

export function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, ROUNDS);
}

export function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

/** Per AUTH_SYSTEM.md: at least 10 characters. */
export function isPasswordStrong(plain: string): boolean {
  return typeof plain === "string" && plain.length >= 10;
}
