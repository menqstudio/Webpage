import { describe, it, expect } from "vitest";
import { validateLead, isHoneypotTripped } from "@/lib/forms/lead";

const messages = {
  name: "name",
  contact: "contact",
  email: "email",
  solution: "solution",
  message: "message",
};

describe("validateLead", () => {
  it("passes a valid lead", () => {
    const errors = validateLead(
      { name: "Ann", email: "a@b.com", interestedSolution: "crm", message: "We need a CRM system." },
      messages,
    );
    expect(Object.keys(errors)).toHaveLength(0);
  });

  it("requires a name of at least 2 chars", () => {
    const errors = validateLead(
      { name: "A", email: "a@b.com", interestedSolution: "crm", message: "Long enough message." },
      messages,
    );
    expect(errors.name).toBe("name");
  });

  it("requires phone or email", () => {
    const errors = validateLead(
      { name: "Ann", interestedSolution: "crm", message: "Long enough message." },
      messages,
    );
    expect(errors.phone).toBe("contact");
  });

  it("rejects a malformed email", () => {
    const errors = validateLead(
      { name: "Ann", email: "nope", interestedSolution: "crm", message: "Long enough message." },
      messages,
    );
    expect(errors.email).toBe("email");
  });

  it("requires a solution and a 10+ char message", () => {
    const errors = validateLead(
      { name: "Ann", phone: "+37400", interestedSolution: "", message: "short" },
      messages,
    );
    expect(errors.interestedSolution).toBe("solution");
    expect(errors.message).toBe("message");
  });
});

describe("isHoneypotTripped", () => {
  it("trips when the website field is filled", () => {
    expect(isHoneypotTripped({ website: "http://spam" })).toBe(true);
  });

  it("passes when the website field is empty or absent", () => {
    expect(isHoneypotTripped({ website: "" })).toBe(false);
    expect(isHoneypotTripped({})).toBe(false);
  });
});
