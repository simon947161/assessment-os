import { useEffect, useReducer } from "react";
import { hazards, hazardById, type Consequence } from "../content/mission01";
import {
  canComplete,
  isResolved,
  missionReducer,
  resolvedCount,
  totalScore,
} from "./missionReducer";
import { loadMissionState, saveMissionState } from "./sessionStorage";

const consequenceLabels: Record<Consequence, string> = {
  "bad-day": "Bad day",
  "serious-injury": "Serious injury",
  "could-kill": "Could kill",
};

export function App() {
  const [state, dispatch] = useReducer(
    missionReducer,
    undefined,
    loadMissionState,
  );

  useEffect(() => {
    saveMissionState(state);
  }, [state]);

  if (state.phase === "entry") {
    return (
      <main className="entry-shell">
        <section className="entry-card" aria-labelledby="mission-title">
          <p className="eyebrow">WHS Living Book · Mission 01</p>
          <h1 id="mission-title">Spot the Hazards</h1>
          <p className="entry-subtitle">Painting Workshop</p>
          <p className="mission-brief">
            Find 10 hazards. Choose the safest immediate action. Learn what
            happens when shortcuts win.
          </p>
          <div className="mission-meta" aria-label="Mission details">
            <span>10 hazards</span>
            <span>8–10 minutes</span>
            <span>No login</span>
          </div>
          <button className="primary-action" onClick={() => dispatch({ type: "start" })}>
            Start mission
          </button>
          <p className="boundary-note">
            Practice activity only — not a formal competency assessment.
          </p>
        </section>
      </main>
    );
  }

  if (state.phase === "debrief") {
    const reviewHazards = hazards.filter(
      (hazard) => state.progress[hazard.id].status === "review",
    );
    const mastered = hazards.length - reviewHazards.length;

    return (
      <main className="debrief-shell">
        <section className="debrief-card" aria-labelledby="debrief-title">
          <p className="eyebrow">Mission complete</p>
          <h1 id="debrief-title">Workshop scan finished</h1>
          <p className="score">
            {totalScore(state)} <span>/ 20 points</span>
          </p>
          <div className="result-grid">
            <div>
              <strong>{mastered}</strong>
              <span>Mastered</span>
            </div>
            <div>
              <strong>{reviewHazards.length}</strong>
              <span>Review</span>
            </div>
          </div>
          {reviewHazards.length > 0 && (
            <div className="review-list">
              <h2>Worth another look</h2>
              <ul>
                {reviewHazards.map((hazard) => (
                  <li key={hazard.id}>{hazard.shortTitle}</li>
                ))}
              </ul>
            </div>
          )}
          <blockquote>
            Safe work is not about slowing the job down. It is about stopping
            one bad shortcut from controlling the whole day.
          </blockquote>
          <button
            className="primary-action"
            onClick={() => dispatch({ type: "restart" })}
          >
            Restart for next learner
          </button>
        </section>
      </main>
    );
  }

  const activeHazard = state.activeHazardId
    ? hazardById.get(state.activeHazardId)
    : undefined;
  const checked = resolvedCount(state);

  return (
    <main className="mission-shell">
      <header className="mission-header">
        <div>
          <p className="eyebrow">Mission 01</p>
          <h1>Painting Workshop</h1>
        </div>
        <div className="progress-copy" aria-live="polite">
          <strong>{checked} / 10</strong>
          <span>hazards checked</span>
        </div>
      </header>

      <div className="progress-track" aria-hidden="true">
        {hazards.map((hazard) => {
          const status = state.progress[hazard.id].status;
          return <span key={hazard.id} className={`progress-dot ${status}`} />;
        })}
      </div>

      <section className="workspace" aria-label="Painting workshop hazard scan">
        <div className="scene-card">
          <div className="scene-viewport">
            <div className="workshop-scene">
              <svg
                viewBox="0 0 1200 720"
                role="img"
                aria-labelledby="scene-title scene-description"
              >
                <title id="scene-title">Painting workshop</title>
                <desc id="scene-description">
                  A simplified workshop with work areas, equipment, materials,
                  an exit and a floor traffic route.
                </desc>
                <rect width="1200" height="470" fill="#d7d0c1" />
                <rect y="470" width="1200" height="250" fill="#8d765e" />
                <path d="M0 470H1200L1080 720H90Z" fill="#a38a6d" />
                <rect x="40" y="180" width="210" height="290" rx="4" fill="#e8e1d4" />
                <rect x="68" y="210" width="155" height="260" fill="#536568" />
                <text x="105" y="260" fill="#f7f3ea" fontSize="30" fontWeight="700">
                  WORK AREA
                </text>
                <rect x="505" y="155" width="170" height="315" fill="#394a47" />
                <rect x="530" y="190" width="120" height="210" fill="#769488" />
                <text x="536" y="440" fill="#fff" fontSize="24" fontWeight="700">
                  EXIT
                </text>
                <path d="M405 520L500 200M500 200L575 520" stroke="#d8aa42" strokeWidth="22" />
                <path d="M425 440H555M442 380H540M460 320H522" stroke="#584a39" strokeWidth="12" />
                <rect x="720" y="390" width="250" height="35" fill="#6b5140" />
                <rect x="750" y="425" width="20" height="150" fill="#443a32" />
                <rect x="925" y="425" width="20" height="150" fill="#443a32" />
                <circle cx="820" cy="370" r="42" fill="#5c6870" />
                <rect x="1000" y="175" width="145" height="345" fill="#625548" />
                <path d="M1015 260H1130M1015 350H1130M1015 440H1130" stroke="#d0b68d" strokeWidth="16" />
                <path d="M120 580C250 520 315 655 430 600" fill="none" stroke="#202b2d" strokeWidth="15" />
                <ellipse cx="330" cy="625" rx="90" ry="36" fill="#c9dfde" opacity=".85" />
                <rect x="1030" y="465" width="72" height="70" rx="8" fill="#b44d3d" />
                <rect x="1060" y="425" width="72" height="60" rx="8" fill="#d7a840" />
                <path d="M260 500V680M260 510L210 560M260 510L310 560" stroke="#e6b441" strokeWidth="14" />
                <path d="M215 560H305" stroke="#202b2d" strokeWidth="10" />
              </svg>

              {hazards.map((hazard) => {
                const progress = state.progress[hazard.id];
                return (
                  <button
                    key={hazard.id}
                    className={`hotspot ${progress.status}`}
                    style={{
                      left: `${hazard.position.x}%`,
                      top: `${hazard.position.y}%`,
                    }}
                    aria-label={`Hazard location ${hazard.number} of 10, ${
                      isResolved(progress.status) ? "checked" : "unchecked"
                    }`}
                    onClick={() =>
                      dispatch({ type: "open", hazardId: hazard.id })
                    }
                  >
                    {isResolved(progress.status) ? "✓" : hazard.number}
                  </button>
                );
              })}
            </div>
          </div>
          <p className="scene-hint">
            Select each numbered location and choose the safest immediate
            action.
          </p>
        </div>

        <aside className="decision-card" aria-live="polite">
          {activeHazard ? (
            <DecisionPanel
              hazard={activeHazard}
              progress={state.progress[activeHazard.id]}
              onAnswer={(optionId, isBest) =>
                dispatch({
                  type: "answer",
                  hazardId: activeHazard.id,
                  optionId,
                  isBest,
                })
              }
              onClose={() => dispatch({ type: "close" })}
            />
          ) : (
            <div className="decision-placeholder">
              <span aria-hidden="true">01—10</span>
              <h2>Complete the pre-start scan</h2>
              <p>
                Choose a numbered location in the workshop. The answer stays
                hidden until you inspect it.
              </p>
            </div>
          )}
        </aside>
      </section>

      {canComplete(state) && (
        <section className="completion-callout">
          <div>
            <strong>All ten locations checked.</strong>
            <span>Your workshop debrief is ready.</span>
          </div>
          <button
            className="primary-action"
            onClick={() => dispatch({ type: "complete" })}
          >
            View mission result
          </button>
        </section>
      )}
    </main>
  );
}

type DecisionPanelProps = {
  hazard: (typeof hazards)[number];
  progress: ReturnType<typeof loadMissionState>["progress"][string];
  onAnswer: (optionId: string, isBest: boolean) => void;
  onClose: () => void;
};

function DecisionPanel({
  hazard,
  progress,
  onAnswer,
  onClose,
}: DecisionPanelProps) {
  const resolved = isResolved(progress.status);
  const selectedOption = hazard.options.find(
    (option) => option.id === progress.lastOptionId,
  );

  return (
    <>
      <div className="decision-heading">
        <div>
          <p className="eyebrow">Location {hazard.number} · What have you found?</p>
          <h2>{hazard.shortTitle}</h2>
        </div>
        <button className="text-button" onClick={onClose}>
          Close
        </button>
      </div>
      <p className="situation">{hazard.situation}</p>
      <p className="decision-question">What is the safest immediate action?</p>
      <div className="answer-list">
        {hazard.options.map((option) => (
          <button
            key={option.id}
            disabled={resolved}
            className={
              progress.lastOptionId === option.id ? "answer selected" : "answer"
            }
            onClick={() => onAnswer(option.id, option.isBest)}
          >
            {option.label}
          </button>
        ))}
      </div>
      {selectedOption && (
        <div
          className={`feedback ${
            selectedOption.isBest ? "feedback-correct" : "feedback-review"
          }`}
          role="status"
        >
          <strong>
            {selectedOption.isBest
              ? "Good call."
              : progress.status === "retry"
                ? "Have another go."
                : "Mark this one for review."}
          </strong>
          <p>{selectedOption.feedback}</p>
          {resolved && (
            <>
              <span className={`consequence ${hazard.consequence}`}>
                Consequence: {consequenceLabels[hazard.consequence]}
              </span>
              <p className="takeaway">{hazard.takeaway}</p>
            </>
          )}
        </div>
      )}
    </>
  );
}
