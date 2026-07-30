# Conversation Radar — WHS Living Book v0.1 Five-Day Sprint

**Branch:** `feature/whs-living-book-mvp`
**Authority:** `docs/CODEX_EXECUTION_TASK_5_DAY_SPRINT.md`
**Status:** Implementation complete; deployment and founder review pending

## Knowledge points

- A single workshop scene can carry all ten hazard decisions without a
  multi-page lesson.
- Native HTML hotspot buttons provide stronger keyboard and touch behaviour
  than embedding interaction semantics in the SVG illustration.
- Percentage scene anchors keep the content model independent of rendered
  pixels.
- A one-retry scoring model distinguishes first-choice mastery from corrected
  understanding without making a formal competency decision.
- Anonymous `sessionStorage` is sufficient for refresh resilience without
  collecting learner identity.

## Idea points

- The accessible location list can also support group teaching when a hotspot
  is difficult to point at on a large display.
- Dean can use the mission as a vote-and-discuss activity rather than only an
  individual quiz.
- Future trial evidence could inform other trade missions, but no additional
  mission is authorised in v0.1.

## Decisions

- Use React, TypeScript, Vite and plain CSS.
- Use one original inline SVG workshop with overlaid native buttons.
- Use three action options for each hazard.
- Award 2 points for a first-choice safest answer, 1 after retry, and 0 with
  review guidance after two unsafe choices.
- Keep mastery/review status more prominent than numeric score.
- Use controlled horizontal scene navigation on mobile.
- Deploy the static `dist/` artifact through official GitHub Pages actions.
- Use **Dean** as the corrected teacher name in new pilot material.

## Risks

- Safety wording still requires Dean's domain review before broader use.
- GitHub Pages settings or environment protection may block pilot-branch
  deployment until the repository owner enables it.
- The scene is deliberately simplified and may need bounded visual adjustment
  after classroom observation.
- Screen-reader and zoom behaviour has basic pilot coverage, not a formal
  accessibility audit.
- Public release must never include the private source workbook.

## Open questions

- Does Dean prefer individual, group-screen or mixed classroom use?
- Are all consequence categories proportionate for the intended cohort?
- Is controlled horizontal scene movement comfortable on the phones used in
  the pilot?
- Should the public pilot emphasise mastery counts even more than score after
  classroom feedback?

## Validation evidence

- Automated tests cover content integrity, scoring, retry, completion,
  restart, persistence recovery, keyboard activation, focus return and the
  complete mission flow.
- Production build is generated with the `/assessment-os/` base path.
- Manual responsive checks cover 375px and 1280px widths.
- Mobile controls remain 48×48px and horizontal movement stays inside the
  scene viewport.
- The private workbook is ignored, untracked and checked for absence from
  `dist/`.

## Next actions

1. Run CI and Pages deployment from the pilot branch.
2. Attach desktop and phone screenshots to the draft pull request.
3. Founder reviews the public URL and checklist.
4. Dean performs a small classroom trial after founder approval.
5. Record trial evidence before considering any scope expansion.

## Related project keywords

AssessmentOS, WHS Living Book, Mission 01, painting workshop, Dean, vocational
education, hazard recognition, control selection, accessible learning,
GitHub Pages, React, TypeScript, pilot governance.
