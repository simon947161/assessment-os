import { describe, expect, it } from "vitest";
import {
  canComplete,
  createInitialState,
  missionReducer,
  resolvedCount,
  totalScore,
} from "./missionReducer";
import { hazards } from "../content/mission01";

describe("mission reducer", () => {
  it("awards two points for a correct first answer", () => {
    const state = createInitialState();
    const hazard = hazards[0];
    const next = missionReducer(state, {
      type: "answer",
      hazardId: hazard.id,
      optionId: "best",
      isBest: true,
    });

    expect(next.progress[hazard.id]).toMatchObject({
      attempts: 1,
      status: "mastered",
      points: 2,
    });
  });

  it("offers one retry, then resolves an incorrect hazard for review", () => {
    const hazard = hazards[0];
    const first = missionReducer(createInitialState(), {
      type: "answer",
      hazardId: hazard.id,
      optionId: "unsafe",
      isBest: false,
    });
    const second = missionReducer(first, {
      type: "answer",
      hazardId: hazard.id,
      optionId: "unsafe-again",
      isBest: false,
    });

    expect(first.progress[hazard.id].status).toBe("retry");
    expect(second.progress[hazard.id].status).toBe("review");
    expect(second.progress[hazard.id].points).toBe(0);
  });

  it("awards one point for the safest answer after a retry", () => {
    const hazard = hazards[0];
    const first = missionReducer(createInitialState(), {
      type: "answer",
      hazardId: hazard.id,
      optionId: "unsafe",
      isBest: false,
    });
    const corrected = missionReducer(first, {
      type: "answer",
      hazardId: hazard.id,
      optionId: "best",
      isBest: true,
    });

    expect(corrected.progress[hazard.id]).toMatchObject({
      attempts: 2,
      status: "mastered",
      points: 1,
    });
  });

  it("does not allow a resolved hazard to change score", () => {
    const hazard = hazards[0];
    const mastered = missionReducer(createInitialState(), {
      type: "answer",
      hazardId: hazard.id,
      optionId: "best",
      isBest: true,
    });
    const repeated = missionReducer(mastered, {
      type: "answer",
      hazardId: hazard.id,
      optionId: "unsafe",
      isBest: false,
    });

    expect(repeated).toBe(mastered);
    expect(totalScore(repeated)).toBe(2);
  });

  it("does not complete an unfinished mission", () => {
    const state = missionReducer(createInitialState(), { type: "complete" });

    expect(state.phase).toBe("entry");
    expect(canComplete(state)).toBe(false);
  });

  it("gates completion until every hazard is resolved", () => {
    const resolved = hazards.reduce(
      (state, hazard) =>
        missionReducer(state, {
          type: "answer",
          hazardId: hazard.id,
          optionId: "best",
          isBest: true,
        }),
      createInitialState(),
    );

    expect(resolvedCount(resolved)).toBe(10);
    expect(canComplete(resolved)).toBe(true);
    expect(totalScore(resolved)).toBe(20);
    expect(missionReducer(resolved, { type: "complete" }).phase).toBe(
      "debrief",
    );
  });

  it("clears progress on restart", () => {
    const hazard = hazards[0];
    const answered = missionReducer(createInitialState(), {
      type: "answer",
      hazardId: hazard.id,
      optionId: "best",
      isBest: true,
    });
    const restarted = missionReducer(answered, { type: "restart" });

    expect(restarted.phase).toBe("entry");
    expect(resolvedCount(restarted)).toBe(0);
    expect(totalScore(restarted)).toBe(0);
  });
});
