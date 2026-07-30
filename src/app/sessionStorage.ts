import { createInitialState, type MissionState } from "./missionReducer";

const STORAGE_KEY = "whs-living-book-mission-01";

export function loadMissionState(): MissionState {
  try {
    const saved = window.sessionStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as MissionState) : createInitialState();
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
