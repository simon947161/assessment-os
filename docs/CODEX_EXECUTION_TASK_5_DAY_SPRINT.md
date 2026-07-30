# Codex Execution Task — WHS Living Book v0.1 Five-Day Sprint

## Authority

Founder direction: proceed from planning into bounded implementation for **Mission 01 — Spot the Hazards: Painting Workshop**.

Primary development branch:

`feature/whs-living-book-mvp`

Primary user and content reviewer:

**Dean**, Painting and Decorating teacher.

## Name and tone correction

The teacher's name is **Dean**, not Dan.

The learner experience should reflect Dean's natural classroom style:

- practical;
- conversational;
- lightly humorous;
- recognisably Australian in tone without forced slang;
- respectful of adult vocational learners;
- serious about risk while allowing safe humour about poor shortcuts and bad decisions.

Humour may target unsafe thinking, rushed work, overconfidence, or familiar trade excuses. It must never target an injured person, a protected group, a learner's literacy, culture, disability, accent, or background.

Examples of the intended tone:

- “You wouldn’t really step over that all day, would you?”
- “It’ll only take a minute” is not a control measure.
- Squinting is not certified eye protection.
- Mystery chemicals are not a workshop lucky dip.

These are tone references, not mandatory final copy. Keep humour short and subordinate to the safety lesson.

## Delivery objective

Within five focused calendar days, produce and deploy a usable public pilot of:

**WHS Living Book v0.1 — Mission 01: Spot the Hazards: Painting Workshop**

The pilot must be accessible by URL, usable on desktop and mobile, and ready for founder review and a small trial with Dean.

Expected public URL pattern:

`https://simon947161.github.io/assessment-os/`

## Execution mode

Proceed autonomously through all tasks that are:

- within the approved MVP scope;
- reversible through Git;
- confined to the current repository and development branch;
- covered by the existing charter, implementation brief, storyboard, and this task;
- testable without founder judgement.

Do not stop after each minor step. Work in coherent batches, verify each batch, commit it, and continue.

Stop and request founder authorisation only when one of the following gates is reached:

1. A decision would materially expand scope.
2. A safety-content ambiguity cannot be responsibly resolved from approved source concepts.
3. GitHub repository settings or environment permissions require an owner action.
4. Deployment requires a setting that Codex cannot change.
5. A destructive or irreversible operation is proposed.
6. The branch has unexpected external changes or a merge conflict.
7. The public pilot is ready for final founder review before merge to `main`.

Do not claim to continue in the background. At the end of each active work session, report completed work, evidence, current blocker if any, and the exact next executable batch.

## Required preflight before implementation

Before writing code:

1. Confirm repository root.
2. Confirm branch is `feature/whs-living-book-mvp`.
3. Run `git fetch origin`.
4. Bring the local branch up to date using a safe fast-forward pull.
5. Confirm the following planning files are present locally:
   - `PROJECT_CHARTER.md`
   - `docs/CODEX_IMPLEMENTATION_BRIEF.md`
   - `docs/FIRST_ROUND_PRODUCT_AND_STORYBOARD_PLAN.md`
   - `docs/CODEX_EXECUTION_TASK_5_DAY_SPRINT.md`
6. Confirm the source workbook is not tracked by Git.
7. Add or verify an appropriate `.gitignore` rule so the private source workbook cannot be accidentally committed.
8. Report preflight result before implementation begins.

## Locked MVP scope

Build only:

- one landing screen;
- one original painting-workshop scene;
- ten hazard hotspots;
- one decision per hazard: the safest immediate action;
- specific feedback for every option;
- one retry opportunity;
- progress display;
- completion/debrief screen;
- restart for the next learner;
- anonymous session persistence;
- keyboard, touch, mobile, reduced-motion, and basic screen-reader support;
- automated tests for content integrity, scoring, completion, restart, and core flow;
- GitHub Actions build and GitHub Pages deployment;
- a short pilot guide for Dean.

Do not add:

- accounts;
- student names or personal data;
- database or backend;
- analytics;
- AI assessment or AI marking;
- teacher dashboard;
- certificates;
- additional missions;
- complex content-management abstractions;
- cinematic animation;
- copied TAFE branding, paragraphs, diagrams, or workbook imagery.

## Product and interaction direction

Use an original simplified workshop illustration built from SVG, HTML, and CSS.

Use native HTML buttons for hazard hotspots. The illustration may be decorative; the interaction must remain semantic and accessible.

Core loop:

`Spot → Think → Control → Act → Report`

Each hazard interaction should feel like a short exchange with a practical teacher:

1. Learner selects a suspicious location.
2. A concise situation appears.
3. Learner chooses the safest immediate action.
4. The system responds with clear feedback and, where suitable, one brief humorous line.
5. Learner returns to the workshop.

Humour budget:

- maximum one short humorous line per hazard interaction;
- no joke is required where it weakens clarity;
- the safest answer and explanation must always be unmistakable;
- humour must not depend on stereotypes or local slang that overseas learners may not understand.

## Five-day delivery plan

### Day 1 — Foundation and full mission skeleton

Deliver:

- Vite + React + TypeScript scaffold;
- project scripts and baseline CSS;
- mission data model;
- state reducer;
- landing screen;
- workshop scene shell;
- ten positioned interactive hotspots;
- decision panel shell;
- progress and completion gating;
- restart flow;
- first end-to-end playable path using provisional content.

Exit test:

A learner can start, open all ten hazards, answer them, reach the debrief, and restart.

Commit as one or more coherent commits.

### Day 2 — Content and Dean-style voice

Deliver:

- complete original content for all ten hazards;
- three or four answer options per hazard;
- one best answer;
- feedback for every option;
- one concise takeaway;
- consequence category;
- restrained humour aligned with this task;
- source-concept mapping kept out of learner UI;
- content validation tests.

Exit test:

All ten hazards are complete, internally consistent, and do not reproduce source-workbook wording.

Flag uncertain technical or regulatory claims in a review note rather than inventing certainty.

### Day 3 — Visual scene, responsive behaviour, and animation

Deliver:

- original coherent painting-workshop illustration;
- clear visual placement of all ten hazards;
- desktop full-scene layout;
- mobile horizontally navigable scene with zone controls;
- accessible hazard list fallback;
- minimum 44px touch targets;
- short CSS/SVG transitions;
- `prefers-reduced-motion` support;
- no essential information conveyed only by colour.

Exit test:

Usable at 375px and 1280px widths, with mouse, touch, and keyboard.

### Day 4 — Testing, accessibility, and classroom polish

Deliver:

- scoring and reducer tests;
- completion and restart tests;
- session persistence tests;
- full mission-flow component test;
- keyboard-only validation;
- focus return and feedback announcement behaviour;
- 200% zoom check;
- reduced-motion check;
- copyediting for plain English;
- classroom presentation mode check on a large screen;
- fix critical and high-severity defects.

Exit test:

`npm test` and `npm run build` pass, and the mission can be completed without a mouse.

### Day 5 — Deployment and founder evidence package

Deliver:

- GitHub Actions build workflow;
- GitHub Pages deployment workflow;
- Vite base path configured for `/assessment-os/`;
- deployment from the approved pilot branch where repository settings permit;
- deployed pilot URL;
- screenshots at desktop and mobile widths;
- `docs/DEAN_PILOT_GUIDE.md`;
- `docs/FOUNDER_REVIEW_CHECKLIST.md`;
- `docs/CRP_5_DAY_SPRINT.md` recording decisions, unresolved issues, and next actions;
- draft pull request to `main` with test and deployment evidence.

Exit test:

Founder can open the URL, complete the mission, restart it, and review the PR evidence.

Do not merge to `main` without explicit founder approval.

## Deployment preflight and owner-action gate

Codex must prepare all deployment files itself. It must also inspect what can be verified through the repository and GitHub CLI.

Where an owner-only setting is required, report one compact instruction block containing:

- exact GitHub page to open;
- exact setting name;
- exact option to select;
- why it is needed;
- how Codex will verify it afterward.

Likely settings to verify:

- Repository Settings → Pages → Source: GitHub Actions;
- Actions permissions allow required official actions;
- `github-pages` environment permits deployment from the pilot branch;
- Pages deployment permissions are available.

Do not ask the founder to perform terminal work that Codex can perform.

## Commit and traceability rules

- Work only on `feature/whs-living-book-mvp`.
- Pull before implementation because planning files were added remotely.
- Use small, coherent commits with descriptive messages.
- Reference Issue #1 and Issue #2 where appropriate.
- Never commit the source Word workbook.
- Keep the branch deployable at the end of each day.
- Open a draft PR once the first complete playable build exists; update it throughout the sprint.
- Include screenshots, test results, deployment evidence, known limitations, and content-review flags in the PR.

## Quality priority order

When time is constrained, preserve work in this order:

1. Safety-content clarity and correctness.
2. Complete learner flow.
3. Accessibility and touch usability.
4. Build, tests, and deployability.
5. Clear original illustration.
6. Humour and animation polish.

Never sacrifice the first four to add more visual detail.

## Required first response from Codex

After reading this file, Codex should:

1. Run the required preflight.
2. Report whether the five-day plan remains realistic.
3. Identify any immediate owner-only deployment setting.
4. Present the exact Day 1 execution batch.
5. Then begin Day 1 implementation without waiting for another approval, unless a defined stop gate is triggered.

## Completion definition

The sprint is complete only when:

- the public pilot URL works;
- all ten hazards function;
- all feedback is original;
- the mission works at mobile and desktop widths;
- keyboard-only completion works;
- tests and production build pass;
- the private source workbook is absent from Git history and deployment output;
- the draft PR contains evidence;
- the founder has a concise review checklist;
- merge remains pending founder approval.
