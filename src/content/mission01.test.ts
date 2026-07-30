import { describe, expect, it } from "vitest";
import { hazards } from "./mission01";

describe("Mission 01 content integrity", () => {
  it("contains exactly ten hazards with unique stable IDs and positions", () => {
    expect(hazards).toHaveLength(10);
    expect(new Set(hazards.map((hazard) => hazard.id)).size).toBe(10);
    expect(new Set(hazards.map((hazard) => hazard.number)).size).toBe(10);

    for (const hazard of hazards) {
      expect(hazard.position.x).toBeGreaterThanOrEqual(0);
      expect(hazard.position.x).toBeLessThanOrEqual(100);
      expect(hazard.position.y).toBeGreaterThanOrEqual(0);
      expect(hazard.position.y).toBeLessThanOrEqual(100);
    }
  });

  it("provides three or four options and exactly one safest answer", () => {
    for (const hazard of hazards) {
      expect(hazard.options.length).toBeGreaterThanOrEqual(3);
      expect(hazard.options.length).toBeLessThanOrEqual(4);
      expect(hazard.options.filter((option) => option.isBest)).toHaveLength(1);
      expect(new Set(hazard.options.map((option) => option.id)).size).toBe(
        hazard.options.length,
      );
    }
  });

  it("provides specific feedback and internal source mapping for every hazard", () => {
    for (const hazard of hazards) {
      expect(hazard.shortTitle.trim().length).toBeGreaterThan(0);
      expect(hazard.situation.trim().length).toBeGreaterThan(0);
      expect(hazard.takeaway.trim().length).toBeGreaterThan(0);
      expect(hazard.sourceConcept.trim().length).toBeGreaterThan(0);

      for (const option of hazard.options) {
        expect(option.label.trim().length).toBeGreaterThan(0);
        expect(option.feedback.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("does not place source mapping in learner-facing option content", () => {
    const learnerText = hazards
      .flatMap((hazard) => [
        hazard.shortTitle,
        hazard.situation,
        hazard.takeaway,
        ...hazard.options.flatMap((option) => [
          option.label,
          option.feedback,
        ]),
      ])
      .join(" ");

    expect(learnerText).not.toMatch(/TAFE NSW/i);
    expect(learnerText).not.toMatch(/CPCCWHS2001/i);
    expect(learnerText).not.toMatch(/competent|not yet competent/i);
  });
});
