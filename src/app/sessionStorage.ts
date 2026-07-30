import { hazards } from "../content/mission01";
import {
  createInitialState,
  type HazardProgress,
  type MissionState,
} from "./missionReducer";

const STORAGE_KEY = "whs-living-book-mission-01";
const phases = new Set<MissionState["phase"]>(["entry", "scene", "debrief"]);
const statuses = new Set<HazardProgress["status"]>([
  "unattempted",
  "retry",
  "mastered",
  "review",
]);

function isHazardProgress(value: unknown): value is HazardProgress {
  if (!value || typeof value !== "object") {
    return false;
  }

  const progress = value as Partial<HazardProgress>;
  return (
    typeof progress.attempts === "number" &&
    Number.isInteger(progress.attempts) &&
    progress.attempts >= 0 &&
    statuses.has(progress.status as HazardProgress["status"]) &&
    (progress.points === 0 || progress.points === 1 || progress.points === 2) &&
    (progress.lastOptionId === null ||
      typeof progress.lastOptionId === "string")
  );
}

function isMissionState(value: unknown): value is MissionState {
  if (!value || typeof value !== "object") {
    return false;
  }

  const state = value as Partial<MissionState>;
  if (
    !phases.has(state.phase as MissionState["phase"]) ||
    !state.progress ||
    typeof state.progress !== "object"
  ) {
    return false;
  }

  if (
    state.activeHazardId !== null &&
    (typeof state.activeHazardId !== "string" ||
      !hazards.some((hazard) => hazard.id === state.activeHazardId))
  ) {
    return false;
  }

  return hazards.every((hazard) =>
    isHazardProgress(state.progress?.[hazard.id]),
  );
}

export function loadMissionState(): MissionState {
  try {
    const saved = window.sessionStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return createInitialState();
    }

    const parsed: unknown = JSON.parse(saved);
    return isMissionState(parsed) ? parsed : createInitialState();
  } catch {
    return createInitialState();
  }
}

export function saveMissionState(state: MissionState) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // The mission remains playable when storage is unavailable.
  }
}
