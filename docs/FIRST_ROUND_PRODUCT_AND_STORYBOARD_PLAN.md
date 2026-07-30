# WHS Living Book v0.1 — First-Round Product, Storyboard and Delivery Plan

**Project:** AssessmentOS  
**Pilot:** Mission 01 — Spot the Hazards: Painting Workshop  
**Primary teacher:** Dan, Painting and Decorating  
**Delivery mode:** Three-day focused sprint  
**Status:** Founder review draft  

---

## 1. Purpose

Build a small, polished, deployable WHS learning website that Dan can open by URL and trial with vocational learners.

The site is not a formal TAFE assessment replacement. It is an interactive learning and assessment-preparation experience designed to make WHS content easier to understand, faster to navigate and more memorable.

The first release must prove one thing:

> A learner can enter a painting workshop scene, identify unsafe conditions, make decisions, receive immediate feedback and complete the mission in approximately 8–10 minutes.

---

## 2. Product Promise

### For learners

- See the whole workshop rather than read a long document.
- Discover hazards through interaction.
- Understand what may happen if a shortcut is taken.
- Learn the best immediate action.
- Finish a short mission with a clear result.

### For Dan

- Open one link.
- Explain the activity in under one minute.
- Let learners work individually or as a group.
- Restart quickly for the next learner.
- Observe which hazards learners misunderstand.

---

## 3. Scope Lock

### Included in v0.1

- One landing page.
- One painting workshop scene.
- Ten interactive hazards.
- Immediate feedback for every answer.
- Visible progress.
- Score and review summary.
- Retry and restart.
- Responsive desktop and mobile layout.
- Keyboard accessibility.
- GitHub Pages deployment.

### Not included

- Login or learner accounts.
- Student personal information.
- Teacher dashboard.
- Formal competency decisions.
- AI marking.
- Backend or database.
- Additional trade packs.
- Full CPCCWHS2001 coverage.

---

## 4. Experience Structure

The complete user journey should have five short stages.

### Stage 1 — Mission Entry

The learner sees:

- Title: **Mission 01 — Spot the Hazards**
- Subtitle: **Painting Workshop**
- Estimated time: **8–10 minutes**
- Mission instruction: **Find 10 hazards. Choose the safest action. Learn what happens when shortcuts win.**
- Primary action: **Start Mission**

Animation:

- Very light entrance motion.
- Workshop title appears first.
- A warning beacon or hazard counter gently activates.
- No long intro video.

### Stage 2 — Workshop Scan

The learner sees the full scene.

The scene should include:

- wall painting area;
- ladder;
- sanding station;
- paint and solvent storage;
- electrical tools;
- doorway and emergency exit;
- floor traffic route;
- work-zone boundary.

Ten hotspots should be discoverable but not labelled with the answers.

Suggested hotspot behaviour:

- subtle pulse on first load;
- pulse stops after a few seconds;
- hover, focus or tap reveals a clear outline;
- completed hazards change state without exposing remaining answers.

### Stage 3 — Decision Card

Selecting a hotspot opens a compact decision card.

Each card contains:

1. **What have you found?**
2. Short situation description.
3. Three or four action choices.
4. Immediate feedback after selection.
5. Consequence marker:
   - Bad day
   - Serious injury
   - Could kill
6. One-line takeaway.
7. Return-to-workshop action.

The interaction should feel like making a site decision, not filling in a quiz form.

### Stage 4 — Mission Progress

Progress remains visible throughout:

- `Hazards checked: 4 / 10`
- a compact row or ring of ten progress markers;
- mastered versus review-needed state;
- no unanswered solution names.

### Stage 5 — Debrief

After all ten hazards are attempted, show:

- score;
- number mastered;
- hazards requiring review;
- three core lessons;
- **Try Again**;
- **Restart for Next Learner**.

Suggested closing message:

> Safe work is not about slowing the job down. It is about stopping one bad shortcut from controlling the whole day.

---

## 5. Visual Direction

### Design character

The visual identity should feel:

- adult;
- practical;
- trade-oriented;
- clear;
- slightly cinematic;
- not childish;
- not corporate LMS-grey.

### Recommended visual language

- Workshop illustration built with original SVG, CSS and simple shapes.
- Strong spatial depth: foreground floor, middle work area, rear wall.
- Warm workshop lighting with clear contrast.
- Safety colours used selectively, not everywhere.
- Large readable type.
- Physical materials suggested through simple texture: timber, plasterboard, paint, metal.

### Motion principles

Use motion only to support understanding.

Allowed:

- gentle hotspot pulse;
- card slide or fade;
- progress marker completion;
- small warning shake for a poor decision;
- success tick movement;
- debrief reveal.

Avoid:

- constant bouncing;
- cartoon explosions;
- graphic injury simulation;
- long transitions;
- motion that blocks fast use.

### Performance requirement

The first meaningful screen should load quickly on an ordinary TAFE computer and mobile connection. Animation must be CSS/SVG-first and lightweight.

---

## 6. Scene Storyboard

The workshop is frozen at the moment before work continues. The learner is the person asked to complete the pre-start safety scan.

### Scene composition

#### Left zone — Access and floor

- trailing electrical cable across walkway;
- uncontrolled paint spill;
- missing warning sign or barricade.

#### Centre zone — Active painting work

- damaged or badly positioned ladder;
- blocked emergency exit in the background;
- poor ventilation during solvent-based work.

#### Right zone — Preparation and storage

- missing eye protection during sanding;
- damaged or missing power-tool guard;
- unlabelled chemical container;
- unsafe storage of paint and materials.

The composition should allow all ten hazards to be visible in one scene at desktop width. On mobile, the scene may use controlled horizontal movement, zoomed sections or an accessible hazard list paired with the image.

---

## 7. Hazard Script

### H01 — Trailing electrical cable

**Scene:** Cable crosses a normal walking route.  
**Consequence:** Serious injury.  
**Best action:** Stop access, remove or safely reroute the cable and report damaged equipment if present.  
**Memorable feedback:** Stepping over it solves the problem for one person and leaves it for everyone else.

### H02 — Unlabelled chemical container

**Scene:** Solvent or chemical has been transferred into an unlabelled container.  
**Consequence:** Could kill.  
**Best action:** Do not use it; isolate it and report it so the substance can be correctly identified and labelled.  
**Memorable feedback:** A mystery drink is bad. A mystery chemical is worse.

### H03 — Paint spill

**Scene:** Wet paint or solvent is spreading across the floor.  
**Consequence:** Serious injury.  
**Best action:** Keep people away, identify the material, follow the SDS and workplace spill procedure, and report it.  
**Memorable feedback:** Walking around a spill does not turn it into a control measure.

### H04 — Poor ventilation

**Scene:** Solvent-based coating is being used with closed windows and no extraction.  
**Consequence:** Could kill.  
**Best action:** Stop and establish suitable ventilation and controls before continuing.  
**Memorable feedback:** If the smell is doing all the talking, the ventilation is not doing enough.

### H05 — Unsafe ladder

**Scene:** Ladder is damaged, unstable, overreached or incorrectly positioned.  
**Consequence:** Could kill.  
**Best action:** Stop work, remove the ladder from use if damaged and use the correct access equipment.  
**Memorable feedback:** “It will only take a minute” is not a ladder rating.

### H06 — Missing eye protection during sanding

**Scene:** Worker is sanding without suitable eye protection.  
**Consequence:** Serious injury.  
**Best action:** Stop and use suitable, correctly fitted PPE and dust controls.  
**Memorable feedback:** Squinting is not certified eye protection.

### H07 — Blocked emergency exit

**Scene:** Materials or equipment block the exit route.  
**Consequence:** Could kill.  
**Best action:** Clear the exit immediately and keep the route unobstructed.  
**Memorable feedback:** An emergency exit is not bonus storage.

### H08 — Unsafe material storage

**Scene:** Paint tins and materials are stacked badly or flammables are stored incorrectly.  
**Consequence:** Serious injury.  
**Best action:** Store materials securely and in accordance with label, SDS and workplace requirements.  
**Memorable feedback:** A tower of paint tins is not a shelving system.

### H09 — Damaged or missing tool guard

**Scene:** Power tool guard is damaged, removed or bypassed.  
**Consequence:** Could kill.  
**Best action:** Do not use; isolate, tag and report the equipment.  
**Memorable feedback:** Two minutes is still enough time to lose control of a tool.

### H10 — Missing warning signage or barricade

**Scene:** Public or other workers can enter the active painting and sanding area.  
**Consequence:** Serious injury.  
**Best action:** Establish the correct signage and barricade without creating another hazard.  
**Memorable feedback:** People cannot follow a warning that was never put up.

---

## 8. Learning Logic

The mission should repeatedly reinforce one simple field routine:

> **Spot → Think → Control → Act → Report**

At the debrief, connect each hazard to this routine.

The learner should understand:

- hazard is the thing that can cause harm;
- risk combines likelihood and consequence;
- immediate action should protect people first;
- controls are better than warnings alone;
- unsafe equipment should not be used;
- hazards and incidents must be reported through workplace procedures;
- workers should act within their authority and training.

---

## 9. Feedback Design

### Correct answer feedback

Structure:

- direct confirmation;
- why it is correct;
- one practical takeaway.

Example:

> Correct. Stop access and reroute the cable before work continues. A hazard is not controlled merely because one person noticed it.

### Incorrect answer feedback

Structure:

- do not shame the learner;
- explain what remains unsafe;
- show the likely consequence;
- allow another attempt or mark for review.

Example:

> Not yet. Warning a mate helps one person, but the cable still crosses the walkway. Control the hazard at the source or isolate the area.

### Scoring recommendation

- First-choice best answer: 2 points.
- Correct after retry: 1 point.
- Completed with explanation shown: 0 points but counted as attempted.

Score is secondary. Mastery and review status are primary.

---

## 10. Accessibility and Classroom Use

The MVP must support:

- mouse;
- touch;
- keyboard-only completion;
- visible focus state;
- screen-reader labels for hotspots;
- reduced-motion preference;
- no colour-only meaning;
- readable text at 200% zoom;
- clear restart control.

For group teaching, Dan should be able to display the scene on a large screen and ask learners to vote before revealing feedback.

---

## 11. Technical Delivery Roles

### ChatGPT product and content role

Responsible for:

- product scope;
- learning structure;
- storyboard;
- hazard scripts;
- feedback tone;
- acceptance criteria;
- founder review package;
- content corrections after Dan feedback.

### Codex engineering and product-design role

Responsible for:

- technical plan;
- realistic duration estimate;
- React/TypeScript implementation;
- original scene construction;
- motion and responsive interaction;
- tests;
- accessibility implementation;
- GitHub Pages deployment;
- screenshots and build evidence;
- draft PR.

### Founder role

Responsible for:

- approve first-round direction;
- review the first playable build;
- decide whether it is suitable for Dan;
- collect Dan's pilot feedback.

---

## 12. Three-Day Focused Sprint

This is the target schedule. Codex must review it and return a risk-adjusted estimate before coding, but should not inflate the MVP.

### Day 1 — Working Game Shell

Target outcome: complete clickable end-to-end flow.

Tasks:

- inspect repository and planning files;
- confirm implementation plan and estimate;
- scaffold Vite + React + TypeScript;
- implement landing page;
- implement workshop scene framework;
- place all ten hotspots;
- implement decision-card state model;
- implement progress and completion logic;
- commit and push working shell.

Founder review gate:

- Can the mission start?
- Can every hotspot open?
- Can a learner answer and return?
- Can the mission complete?

### Day 2 — Content, Animation and Quality

Target outcome: pilot-quality experience.

Tasks:

- add final answer options and feedback;
- improve original workshop illustration;
- add restrained animation;
- implement scoring and review status;
- mobile layout;
- keyboard and focus handling;
- reduced-motion support;
- tests for scoring, completion and restart;
- content and copyright check.

Founder review gate:

- Is it understandable without explanation?
- Is it adult and trade-oriented?
- Is the animation useful rather than decorative?
- Are the safety messages accurate and memorable?

### Day 3 — Validation and Deployment

Target outcome: Dan-ready public pilot.

Tasks:

- production build;
- run tests;
- test at 375px and 1280px;
- keyboard-only test;
- fix defects;
- add GitHub Pages workflow;
- deploy;
- capture desktop and mobile screenshots;
- document limitations;
- open draft PR;
- prepare Dan trial instructions.

Founder release gate:

- Public URL works.
- All ten hazards work.
- Restart works.
- No student data is collected.
- No TAFE imagery or copied text is present.
- Known limitations are documented.

---

## 13. Codex Planning Request

Before implementation, Codex must provide a concise engineering response containing:

1. Proposed component and state structure.
2. Scene implementation approach: SVG, CSS, HTML or a combination.
3. Mobile interaction approach.
4. Accessibility approach.
5. Testing approach.
6. GitHub Pages deployment approach.
7. Estimated focused working time for:
   - Day 1 shell;
   - Day 2 quality pass;
   - Day 3 deployment;
8. Top five delivery risks.
9. Any recommendation that reduces time without reducing the pilot's learning value.

Codex should then proceed after founder approval, or immediately if instructed to execute the approved plan.

---

## 14. Quality Standard

The MVP is ready when:

- Dan can open it through a URL;
- a new learner can understand what to do within 30 seconds;
- the mission can be completed in 8–10 minutes;
- every hazard gives specific feedback;
- the workshop feels original and credible;
- the interface works on mobile and desktop;
- the project builds and tests successfully;
- the site is accessible enough for pilot use;
- the code and content are easy to extend;
- the project remains visibly small.

---

## 15. Founder Decisions Required

Before handing to Codex, approve or amend these five points:

1. **Visual mode:** original illustrated workshop rather than photographs.
2. **Mission format:** one scene with ten hotspots.
3. **Duration:** 8–10 minutes per learner.
4. **Scoring:** mastery-led scoring with retry, not pass/fail assessment.
5. **Delivery target:** three-day focused sprint ending in a public GitHub Pages pilot.

---

## 16. CRP Record

### Core knowledge points

- CPCCWHS2001 content can be translated into scene-based hazard decisions.
- The pilot must teach safe judgement, not merely recall.
- Immediate explanatory feedback is the central learning mechanism.

### Idea points

- One original workshop scene acts as the entire mission map.
- Consequence categories make risk memorable without graphic imagery.
- The same engine can later support other trades and WHS missions.

### Desire points

- Deliver something concrete to Dan quickly.
- Demonstrate a small but meaningful AssessmentOS success.
- Produce a public, reusable and extensible learning website.

### Reasoning points

- A limited single-scene MVP provides the best balance of speed, quality and testability.
- Three focused days are realistic only if scope remains locked.
- Animation must communicate state and consequence rather than become a separate production burden.

### Key decisions

- React/TypeScript static website.
- Original visual assets only.
- No formal assessment replacement.
- No personal information or backend.
- GitHub is the authoritative delivery record.

### Unresolved questions

- Whether Dan prefers individual use, group-screen use or both.
- Whether the first pilot should show score numerically or emphasise mastery only.
- Whether mobile horizontal scene navigation is acceptable for the pilot.

### Next actions

- Founder reviews this document.
- Amend the five founder decisions if needed.
- Send approved plan and Codex planning request to Codex.
- Receive Codex estimate and implementation proposal.
- Authorise the three-day build sprint.

### Project keywords

AssessmentOS, WHS Living Book, CPCCWHS2001, Painting and Decorating, Dan, Mission 01, Spot the Hazards, interactive learning, vocational education, GitHub Pages, React, TypeScript, accessible game, rapid delivery.
