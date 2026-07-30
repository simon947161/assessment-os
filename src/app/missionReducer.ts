import { hazards } from "../content/mission01";

export type HazardStatus = "unattempted" | "retry" | "mastered" | "review";

export type HazardProgress = {
  attempts: number;
  status: HazardStatus;
  points: 0 | 1 | 2;
  lastOptionId: string | null;
};

export type MissionState = {
  phase: "entry" | "scene" | "debrief";
  activeHazardId: string | null;
  progress: Record<string, HazardProgress>;
};

export type MissionAction =
  | { type: "start" }
  | { type: "open"; hazardId: string }
  | {
      type: "answer";
      hazardId: string;
      optionId: string;
      isBest: boolean;
    }
  | { type: "close" }
  | { type: "complete" }
  | { type: "restart" };

const emptyProgress = (): Record<string, HazardProgress> =>
  Object.fromEntries(
    hazards.map((hazard) => [
      hazard.id,
      {
        attempts: 0,
        status: "unattempted",
        points: 0,
        lastOptionId: null,
      },
    ]),
  );

export const createInitialState = (): MissionState => ({
  phase: "entry",
  activeHazardId: null,
  progress: emptyProgress(),
});

export const isResolved = (status: HazardStatus) =>
  status === "mastered" || status === "review";

export const resolvedCount = (state: MissionState) =>
  hazards.filter((hazard) => isResolved(state.progress[hazard.id].status)).length;

export const canComplete = (state: MissionState) =>
  resolvedCount(state) === hazards.length;

export const totalScore = (state: MissionState) =>
  hazards.reduce((score, hazard) => score + state.progress[hazard.id].points, 0);

export function missionReducer(
  state: MissionState,
  action: MissionAction,
): MissionState {
  switch (action.type) {
    case "start":
      return { ...state, phase: "scene" };
    case "open":
      return { ...state, activeHazardId: action.hazardId };
    case "close":
      return { ...state, activeHazardId: null };
    case "complete":
      return canComplete(state)
        ? { ...state, phase: "debrief", activeHazardId: null }
        : state;
    case "restart":
      return createInitialState();
    case "answer": {
      const current = state.progress[action.hazardId];

      if (!current || isResolved(current.status)) {
        return state;
      }

      const attempts = current.attempts + 1;
      const status: HazardStatus = action.isBest
        ? "mastered"
        : attempts >= 2
          ? "review"
          : "retry";
      const points: 0 | 1 | 2 = action.isBest
        ? attempts === 1
          ? 2
          : 1
        : 0;

      return {
        ...state,
        progress: {
          ...state.progress,
          [action.hazardId]: {
            attempts,
            status,
            points,
            lastOptionId: action.optionId,
          },
        },
      };
    }
  }
}
