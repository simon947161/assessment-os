# Codex Implementation Brief — WHS Living Book MVP v0.1

## Objective

Build a deployable static web application for **Mission 01 — Spot the Hazards: Painting Workshop**.

The application must be ready for a teacher to open by URL and use with learners. Optimise for clarity, speed, reliability and easy content editing.

## Required stack

- Vite
- React
- TypeScript
- Plain CSS or CSS modules
- Local JSON/TypeScript content
- Vitest for core logic tests
- GitHub Actions for build and GitHub Pages deployment

Do not add a backend, authentication, database, analytics SDK, external AI API or heavy UI framework.

## User journey

1. Landing page explains the mission and estimated time.
2. Learner starts the mission.
3. Learner sees a responsive painting workshop scene.
4. Ten numbered or visually anchored hazard hotspots are available.
5. Selecting a hotspot opens a short decision card.
6. Learner answers:
   - What is the hazard?
   - What may happen?
   - What is the best immediate action/control?
7. The application gives immediate explanatory feedback.
8. Progress is visible without revealing unanswered solutions.
9. When all hazards are attempted, a completion screen shows:
   - score;
   - hazards mastered;
   - hazards to review;
   - retry option.
10. A teacher can restart the mission easily for the next learner.

## Content requirements

Implement these ten hazards:

1. Trailing electrical cable across a walkway
2. Unlabelled chemical container
3. Paint spill left uncontrolled
4. Poor ventilation during solvent-based work
5. Damaged or incorrectly positioned ladder
6. Missing eye protection during sanding
7. Blocked emergency exit
8. Unsafe storage of paint and materials
9. Damaged or missing power-tool guard
10. Missing warning signage or barricade around the work area

Each hazard record must contain:

- stable ID
- short title
- scene location coordinates or anchor
- concise situation description
- consequence category: `bad-day`, `serious-injury`, or `could-kill`
- three or four answer options
- one best answer
- feedback for every option
- one short takeaway
- source concept mapping note kept out of the learner UI

## Tone

- Adult and trade-oriented, not childish
- Short sentences
- Plain English
- Respectful humour may target unsafe shortcuts, never injured people
- No graphic injury imagery
- Consequences must be memorable but responsible

## Interaction requirements

- Mouse, touch and keyboard usable
- Visible focus indicators
- Buttons at least 44px high on touch devices
- No essential information conveyed only by colour
- Modal/dialog must be accessible or use an inline panel
- Learner must be able to close a card and return to the scene
- Progress must persist during the current browser session using local state; localStorage is optional

## Visual direction

Create an original simplified workshop illustration using HTML/CSS/SVG shapes or original repository assets. Do not copy TAFE NSW workbook images or branding.

The first frame should communicate:

- painting workshop
- active work zone
- several discoverable hazards
- clear Start Mission action

Avoid spending excessive time on artistic polish before the full interaction works.

## Suggested structure

```text
src/
  app/
  components/
  content/
    mission01.ts
  logic/
    scoring.ts
  styles/
  test/
public/
docs/
.github/workflows/
```

## Acceptance tests

- `npm install` completes
- `npm run build` completes without warnings treated as errors
- `npm test` passes
- All ten hazards can be opened and answered
- Each option produces specific feedback
- Completion is impossible before all ten hazards are attempted
- Restart clears progress
- Layout is usable at 375px and 1280px widths
- Keyboard-only user can complete the mission
- GitHub Pages workflow is included
- No TAFE copyrighted images or copied paragraphs are present

## Delivery workflow

1. Create branch `feature/whs-living-book-mvp`.
2. Scaffold and commit the working shell.
3. Add mission content and interaction.
4. Add tests and accessibility pass.
5. Add deployment workflow.
6. Open a draft PR to `main` with screenshots and test evidence.
7. Do not merge until the prototype URL or build evidence has been reviewed.

## Stop conditions

Do not expand to additional missions, teacher dashboards, user accounts or AI features during this delivery. Record useful ideas in `docs/BACKLOG.md` without implementing them.
