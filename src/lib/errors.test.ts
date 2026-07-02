import { describe, it, expect } from "vitest";
import { isMissingRecord, errSummary, ignoreMissingRecord } from "@/lib/errors";

describe("isMissingRecord", () => {
  it("is true for P2025 and P2003", () => {
    expect(isMissingRecord({ code: "P2025" })).toBe(true);
    expect(isMissingRecord({ code: "P2003" })).toBe(true);
  });

  it("is false for other codes and non-errors", () => {
    expect(isMissingRecord({ code: "P2002" })).toBe(false);
    expect(isMissingRecord(null)).toBe(false);
    expect(isMissingRecord(new Error("x"))).toBe(false);
  });
});

describe("errSummary", () => {
  it("returns the code when present", () => {
    expect(errSummary({ code: "EAUTH" })).toBe("EAUTH");
  });

  it("never leaks the message (which may contain secrets)", () => {
    expect(errSummary(new Error("postgres://user:pass@host/db"))).toBe("Error");
  });
});

describe("ignoreMissingRecord", () => {
  it("returns the value on success", async () => {
    expect(await ignoreMissingRecord(Promise.resolve(42))).toBe(42);
  });

  it("returns null on a missing record", async () => {
    expect(await ignoreMissingRecord(Promise.reject({ code: "P2025" }))).toBeNull();
  });

  it("rethrows other errors", async () => {
    await expect(
      ignoreMissingRecord(Promise.reject(new Error("boom"))),
    ).rejects.toThrow("boom");
  });
});
