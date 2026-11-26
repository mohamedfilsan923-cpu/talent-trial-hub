import { describe, expect, it } from "vitest";
import { canSubmitDeliverables, isDualSigned, projects } from "@/lib/guild";
describe("Guild rules", () => {
  it("requires both local collaborator and beneficiary signatures", () => {
    expect(isDualSigned(true, false)).toBe(false);
    expect(isDualSigned(false, true)).toBe(false);
    expect(isDualSigned(true, true)).toBe(true);
  });
  it("requires all deliverables before submission", () => {
    expect(canSubmitDeliverables([true, false, true])).toBe(false);
    expect(canSubmitDeliverables([true, true, true])).toBe(true);
  });
  it("keeps the clinic sprint at two weeks and a $150 micro-stipend", () => {
    expect(projects.find(p => p.id === "clinic")?.duration).toBe("2 weeks");
    expect(projects.find(p => p.id === "clinic")?.reward).toBe("$150 Micro-Stipend");
  });
});