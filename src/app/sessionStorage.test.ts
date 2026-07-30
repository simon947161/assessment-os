// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from "vitest";
import { hazards } from "../content/mission01";
import {
  createInitialState,
  missionReducer,
  resolvedCount,
} from "./missionReducer";
import { loadMissionState, saveMissionState } from "./sessionStorage";

describe("anonymous mission session persistence", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    vi.restoreAllMocks();
  });

  it("saves and restores valid progress", () => {
    const hazard = hazards[0];
    const answered = missionReducer(createInitialState(), {
      type: "answer",
      hazardId: hazard.id,
      optionId: "best",
      isBest: true,
    });

    saveMissionState(answered);

    expect(loadMissionState()).toEqual(answered);
    expect(resolvedCount(loadMissionState())).toBe(1);
  });

  it("falls back safely when stored JSON is corrupt", () => {
    window.sessionStorage.setItem(
      "whs-living-book-mission-01",
      "{not-valid-json",
    );

    const restored = loadMissionState();

    expect(restored.phase).toBe("entry");
    expect(resolvedCount(restored)).toBe(0);
  });

  it("rejects incomplete or stale state shapes", () => {
    window.sessionStorage.setItem(
      "whs-living-book-mission-01",
      JSON.stringify({
        phase: "scene",
        activeHazardId: null,
        progress: {},
      }),
    );

    expect(loadMissionState()).toEqual(createInitialState());
  });

  it("remains playable when session storage writes are unavailable", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("Storage disabled");
    });

    expect(() => saveMissionState(createInitialState())).not.toThrow();
  });
});
