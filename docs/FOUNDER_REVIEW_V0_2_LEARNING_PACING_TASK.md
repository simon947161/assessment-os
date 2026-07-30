# Founder Review Task — WHS Living Book v0.2 Learning Pacing Upgrade

## Authority

Founder review after first public deployment of **WHS Living Book v0.1 — Mission 01: Spot the Hazards: Painting Workshop**.

Primary branch:

`feature/whs-living-book-mvp`

Primary reviewer:

**Dean**, Painting and Decorating teacher.

## Founder finding

The current pilot is technically functional, but the answer-feedback loop is too fast.

A learner can:

1. select an option;
2. receive immediate feedback;
3. click again quickly;
4. pass the hazard without reading or reflecting.

This creates a risk that the interaction rewards fast clicking rather than learning.

The next bounded revision must improve:

- reflection time;
- feedback visibility;
- retry discipline;
- mission goal clarity;
- scene progression;
- perceived sense of completing a structured safety inspection.

## Delivery objective

Produce a **v0.2 learning-pacing revision** that improves the educational effect of the existing mission without waiting for recorded voice assets and without expanding into a full multi-mission product.

The work should remain deployable through the existing GitHub Pages pilot URL.

## Explicit non-dependency on voice recording

Dean voice recording is not currently available and must not block this revision.

For v0.2:

- use visible text feedback;
- use restrained visual and optional non-verbal interface sound only if already practical and accessible;
- architect feedback so recorded Dean voice clips can be added later;
- do not synthesise or imitate Dean's voice;
- do not require microphone input or external text-to-speech services.

Create a future-ready audio hook only if it remains lightweight, for example an optional `audioCueId` or equivalent content field that does not change the learner experience when no audio file exists.

## Locked revision scope

Implement only the following changes.

### 1. Deliberate feedback sequence

Replace immediate answer resolution with a staged response sequence.

For an incorrect first answer:

1. Lock the answer buttons briefly after selection.
2. Show a clear incorrect visual state and short reaction line.
3. Reveal the explanation in a readable staged manner.
4. Require an explicit learner action such as **Read it — try again** before retry becomes available.
5. Re-enable choices only after the learner has acknowledged the feedback.

For a correct answer:

1. Lock answer choices.
2. Show a clear positive reaction line.
3. Reveal the explanation and takeaway.
4. Require an explicit **Got it — return to workshop** action.
5. Do not automatically close the panel or advance the mission.

The target is not an arbitrary long delay. The target is to prevent accidental double-click progression and require a visible acknowledgement.

### 2. No instant pass on guessing

A learner must not be able to click two answers rapidly and resolve a hazard without reading feedback.

Required protections:

- ignore repeated clicks while feedback is transitioning;
- disable unresolved answer buttons during the feedback stage;
- do not reveal or activate the retry state until acknowledgement;
- do not mark a hazard resolved until its final feedback has been acknowledged;
- preserve keyboard and screen-reader access throughout.

### 3. Dean-style reaction copy

Add short practical reaction lines before the fuller explanation.

Examples of tone:

- `Not quite. Have another look.`
- `You might want to rethink that one.`
- `Good call. That is the safer move.`
- `That shortcut could make for a very long afternoon.`
- `Right idea. Control the area before somebody walks through it.`

Rules:

- maximum one short reaction line per feedback stage;
- humour may target unsafe shortcuts, rushed thinking, or overconfidence;
- no insult, humiliation, stereotype, injury joke, or forced Australian slang;
- the safety explanation must remain clearer than the joke.

### 4. Feedback reading state

Add a clear feedback state model, for example:

- `choosing`
- `reaction`
- `explanation`
- `awaiting-acknowledgement`
- `retry-ready`
- `resolved`

The exact implementation may differ, but it must be testable and must prevent click-through behaviour.

Respect `prefers-reduced-motion`. The sequence may use immediate state changes for reduced-motion users, but acknowledgement must still be required.

### 5. Mission goal and scene structure

The current single 2D workshop feels visually crowded and does not provide enough sense of staged progress.

For v0.2, do not build several complete new scenes. Instead, reorganise the existing mission into **three explicit inspection zones** within the same original workshop:

1. **Zone 1 — Access & Floor**
2. **Zone 2 — Active Work Area**
3. **Zone 3 — Preparation & Storage**

Requirements:

- show all three zones before mission start;
- show how many hazards belong to each zone;
- indicate current zone and zone completion;
- show overall progress such as `3 of 10 checked`;
- make zone movement feel like scene progression rather than unstructured horizontal scrolling;
- keep the current ten hazards and existing content scope;
- desktop may still show the overall workshop, but zone focus must be obvious;
- mobile must retain usable zone navigation.

### 6. Mission map shell

Add a lightweight mission overview that communicates:

- Mission 01 is active;
- it contains three inspection zones;
- all three zones must be completed;
- future missions may exist later.

Do not implement additional playable missions.

A restrained locked placeholder may be used for future missions only if it does not distract from Mission 01. Avoid creating a false product catalogue.

### 7. Debrief improvement

The debrief must reinforce reflection rather than only showing a score.

Include:

- zones completed;
- hazards mastered;
- hazards for review;
- one plain-language summary of what the learner practised;
- the loop `Spot → Think → Control → Act → Report`;
- restart for the next learner.

Do not introduce pass/fail competency language.

## Accessibility requirements

- Feedback stages must be announced appropriately with `aria-live` without excessive repeated announcements.
- Focus must move predictably to reaction, explanation, acknowledgement, and retry controls.
- Answer locking must not trap keyboard focus.
- Do not rely on sound, colour, movement, or delay alone.
- All acknowledgement controls must be at least 44px high on touch devices.
- Reduced-motion mode must preserve the same learning gates.

## Testing requirements

Add or update automated tests proving:

1. rapid double-clicking cannot resolve a hazard;
2. an incorrect first answer requires feedback acknowledgement before retry;
3. a correct answer requires acknowledgement before returning to the workshop;
4. a hazard is not counted complete before final acknowledgement;
5. keyboard flow works through answer, feedback, acknowledgement, retry, and return;
6. zone progress is derived correctly;
7. the mission cannot finish until all three zones and ten hazards are resolved;
8. restart clears new feedback and zone state;
9. session restoration does not reopen an unsafe half-transition state;
10. existing content integrity and scoring tests continue to pass.

## Implementation sequence

### Batch 1 — State and interaction protection

- add explicit feedback-state handling;
- prevent rapid click-through;
- require acknowledgement;
- update scoring/completion timing;
- add core tests.

### Batch 2 — Reaction copy and feedback presentation

- add Dean-style reaction lines;
- improve hierarchy between reaction, explanation, takeaway, and action;
- verify plain English and respectful humour;
- preserve content mapping outside learner UI.

### Batch 3 — Three-zone mission progression

- reorganise the ten hazards into three zones;
- add mission/zone overview;
- improve zone navigation and progress indicators;
- retain desktop and mobile usability.

### Batch 4 — Debrief, accessibility, regression and deployment

- improve debrief;
- run keyboard, reduced-motion, mobile, and screen-reader-oriented checks;
- run full tests and build;
- update screenshots and pilot guide;
- deploy the revised branch to GitHub Pages;
- update Draft PR #3 with v0.2 evidence.

## Autonomous execution authority

Codex is authorised to implement, test, commit, push, and redeploy this bounded revision on:

`feature/whs-living-book-mvp`

Do not stop for minor UI, copy, testing, or reversible implementation decisions.

Stop only if:

1. a change would add new playable missions;
2. a WHS safety judgement is genuinely ambiguous;
3. a repository-owner setting is required;
4. an irreversible operation is proposed;
5. branch conflict or unexpected external changes occur;
6. the revised public pilot is ready for founder review.

Do not merge PR #3.

## Acceptance gate

The revision is ready for founder review when:

- a learner cannot pass by rapid clicking;
- every answer requires meaningful feedback acknowledgement;
- retry is deliberate rather than immediate;
- the three-zone mission structure is visible and understandable;
- overall and zone progress are clear;
- all automated tests pass;
- production build passes;
- the public pilot URL serves the revised version;
- PR #3 remains draft and unmerged;
- a short change summary and updated screenshots are available.

## Deferred work

Record but do not implement now:

- recorded Dean voice clips;
- synthetic voice or digital presenter;
- multiple indoor and outdoor playable scenes;
- additional missions;
- teacher dashboard;
- learner accounts or assessment records;
- richer environmental animation;
- formal classroom analytics.
