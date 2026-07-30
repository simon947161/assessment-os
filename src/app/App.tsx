import { useEffect, useReducer, useRef, type RefObject } from "react";
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

  const sceneViewportRef = useRef<HTMLDivElement>(null);
  const decisionHeadingRef = useRef<HTMLHeadingElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (state.activeHazardId) {
      decisionHeadingRef.current?.focus();
    }
  }, [state.activeHazardId]);

  const openHazard = (hazardId: string, trigger: HTMLButtonElement) => {
    lastTriggerRef.current = trigger;
    dispatch({ type: "open", hazardId });
  };

  const closeHazard = () => {
    dispatch({ type: "close" });
    window.requestAnimationFrame(() => lastTriggerRef.current?.focus());
  };

  const showZone = (position: number) => {
    const viewport = sceneViewportRef.current;
    if (!viewport) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const maximumScroll = viewport.scrollWidth - viewport.clientWidth;
    viewport.scrollTo({
      left: maximumScroll * position,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

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
          <nav className="zone-nav" aria-label="Workshop scene zones">
            <span>Move to:</span>
            <button onClick={() => showZone(0)}>Access &amp; floor</button>
            <button onClick={() => showZone(0.5)}>Active work</button>
            <button onClick={() => showZone(1)}>Prep &amp; storage</button>
          </nav>
          <div
            className="scene-viewport"
            id="workshop-scene-viewport"
            ref={sceneViewportRef}
            tabIndex={0}
            aria-label="Horizontally scrollable workshop scene"
          >
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
                <defs>
                  <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#ad9477" />
                    <stop offset="1" stopColor="#80694f" />
                  </linearGradient>
                  <pattern id="wall-lines" width="80" height="80" patternUnits="userSpaceOnUse">
                    <path d="M80 0H0V80" fill="none" stroke="#b7ae9d" strokeWidth="2" opacity=".35" />
                  </pattern>
                </defs>
                <rect width="1200" height="470" fill="#d7d0c1" />
                <rect width="1200" height="470" fill="url(#wall-lines)" />
                <rect y="470" width="1200" height="250" fill="#8d765e" />
                <path d="M0 470H1200L1080 720H90Z" fill="url(#floor)" />
                <path d="M380 470L340 720M790 470L850 720" stroke="#dccbb1" strokeWidth="4" opacity=".45" />
                <text x="70" y="70" fill="#596963" fontSize="22" fontWeight="800" letterSpacing="4">
                  ACCESS &amp; FLOOR
                </text>
                <text x="490" y="70" fill="#596963" fontSize="22" fontWeight="800" letterSpacing="4">
                  ACTIVE WORK
                </text>
                <text x="885" y="70" fill="#596963" fontSize="22" fontWeight="800" letterSpacing="4">
                  PREP &amp; STORAGE
                </text>
                <rect x="40" y="180" width="210" height="290" rx="4" fill="#e8e1d4" />
                <rect x="68" y="210" width="155" height="260" fill="#536568" />
                <text x="94" y="260" fill="#f7f3ea" fontSize="27" fontWeight="700">
                  ENTRY
                </text>
                <rect x="505" y="155" width="170" height="315" fill="#394a47" />
                <rect x="530" y="190" width="120" height="210" fill="#769488" />
                <text x="536" y="440" fill="#fff" fontSize="24" fontWeight="700">
                  EXIT
                </text>
                <rect x="535" y="385" width="62" height="52" fill="#7b5539" />
                <rect x="590" y="368" width="70" height="68" fill="#936b49" />
                <path d="M405 520L500 200M500 200L575 520" stroke="#d8aa42" strokeWidth="22" />
                <path d="M425 440H555M442 380H540M460 320H522" stroke="#584a39" strokeWidth="12" />
                <path d="M470 240L500 200L523 253" fill="none" stroke="#b33b32" strokeWidth="9" />
                <rect x="690" y="135" width="165" height="125" rx="4" fill="#789197" />
                <path d="M772 135V260M690 198H855" stroke="#536a70" strokeWidth="9" />
                <path d="M730 290C705 320 765 325 740 355M790 285C765 315 825 330 798 365" fill="none" stroke="#8a735e" strokeWidth="9" opacity=".7" />
                <rect x="720" y="390" width="250" height="35" fill="#6b5140" />
                <rect x="750" y="425" width="20" height="150" fill="#443a32" />
                <rect x="925" y="425" width="20" height="150" fill="#443a32" />
                <circle cx="820" cy="370" r="42" fill="#5c6870" />
                <circle cx="850" cy="290" r="28" fill="#8e6548" />
                <path d="M850 318V395M850 345L805 375M850 345L900 372" stroke="#344844" strokeWidth="28" strokeLinecap="round" />
                <path d="M807 348L782 340M813 361L782 365M812 375L786 390" stroke="#e8ded0" strokeWidth="5" opacity=".8" />
                <rect x="930" y="352" width="78" height="32" rx="12" fill="#4d5d5a" />
                <circle cx="996" cy="368" r="24" fill="#343f3d" />
                <path d="M995 345A24 24 0 0 1 1018 368" fill="none" stroke="#c84e3f" strokeWidth="8" />
                <rect x="1000" y="175" width="145" height="345" fill="#625548" />
                <path d="M1015 260H1130M1015 350H1130M1015 440H1130" stroke="#d0b68d" strokeWidth="16" />
                <path d="M120 580C250 520 315 655 430 600" fill="none" stroke="#202b2d" strokeWidth="15" />
                <ellipse cx="330" cy="625" rx="90" ry="36" fill="#c9dfde" opacity=".85" />
                <path d="M300 607C335 590 367 608 396 600" fill="none" stroke="#f3faf9" strokeWidth="5" opacity=".8" />
                <rect x="1030" y="465" width="72" height="70" rx="8" fill="#b44d3d" />
                <rect x="1060" y="425" width="72" height="60" rx="8" fill="#d7a840" />
                <rect x="1040" y="382" width="52" height="58" rx="7" fill="#d9d2c2" />
                <rect x="1049" y="398" width="34" height="4" fill="#d9d2c2" />
                <path d="M260 500V680M260 510L210 560M260 510L310 560" stroke="#e6b441" strokeWidth="14" />
                <path d="M215 560H305" stroke="#202b2d" strokeWidth="10" />
                <path d="M230 535L260 500L290 535Z" fill="#efe5d2" opacity=".28" />
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
                    onClick={(event) =>
                      openHazard(hazard.id, event.currentTarget)
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
          <details className="hazard-list">
            <summary>Use the accessible location list</summary>
            <ol>
              {hazards.map((hazard) => {
                const status = state.progress[hazard.id].status;
                return (
                  <li key={hazard.id}>
                    <button
                      onClick={(event) =>
                        openHazard(hazard.id, event.currentTarget)
                      }
                    >
                      <span>Location {hazard.number}</span>
                      <strong>
                        {isResolved(status)
                          ? status === "mastered"
                            ? "Checked — mastered"
                            : "Checked — review"
                          : status === "retry"
                            ? "Retry available"
                            : "Not checked"}
                      </strong>
                    </button>
                  </li>
                );
              })}
            </ol>
          </details>
        </div>

        <aside className="decision-card" aria-live="polite">
          {activeHazard ? (
            <DecisionPanel
              hazard={activeHazard}
              progress={state.progress[activeHazard.id]}
              headingRef={decisionHeadingRef}
              onAnswer={(optionId, isBest) =>
                dispatch({
                  type: "answer",
                  hazardId: activeHazard.id,
                  optionId,
                  isBest,
                })
              }
              onClose={closeHazard}
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
  headingRef: RefObject<HTMLHeadingElement | null>;
  onAnswer: (optionId: string, isBest: boolean) => void;
  onClose: () => void;
};

function DecisionPanel({
  hazard,
  progress,
  headingRef,
  onAnswer,
  onClose,
}: DecisionPanelProps) {
  const resolved = isResolved(progress.status);
  const selectedOption = hazard.options.find(
    (option) => option.id === progress.lastOptionId,
  );
  const bestOption = hazard.options.find((option) => option.isBest);

  return (
    <>
      <div className="decision-heading">
        <div>
          <p className="eyebrow">Location {hazard.number} · What have you found?</p>
          <h2 ref={headingRef} tabIndex={-1}>
            {hazard.shortTitle}
          </h2>
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
              {progress.status === "review" && bestOption && (
                <p className="best-action">
                  <strong>Safest action:</strong> {bestOption.label}
                </p>
              )}
              <p className="takeaway">{hazard.takeaway}</p>
            </>
          )}
        </div>
      )}
    </>
  );
}
