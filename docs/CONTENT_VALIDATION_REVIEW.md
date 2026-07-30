# Mission 01 Content Validation Review

**Status:** Internal implementation review complete; Dean domain review pending
**Scope:** Learner-facing Mission 01 hazard decisions
**Related work:** GitHub Issue #2

## Boundary checks

- Learner-facing scenarios and feedback are original text created for this pilot.
- No TAFE NSW paragraphs, branding, diagrams, screenshots or workbook images are included.
- The private source workbook is excluded by the repository `.gitignore`.
- The mission does not collect learner names or other personal information.
- Results use mastery and review language, not competent/not-yet-competent decisions.
- The activity states that it is practice and not a formal competency assessment.

## Content-logic checks

Each of the ten hazards has:

- one stable ID and scene position;
- one concise workshop situation;
- one consequence category;
- three action choices;
- exactly one safest immediate action;
- specific feedback for every choice;
- one short takeaway;
- an internal source-concept note that is not rendered in the learner interface.

The safest actions consistently prioritise one or more of:

- stopping or isolating unsafe work;
- protecting people before production;
- removing or controlling the hazard;
- following workplace procedures, labels or safety information;
- reporting defective equipment or unresolved hazards.

## Tone checks

- Language is concise, practical and intended for adult vocational learners.
- Humour targets shortcuts or unsafe thinking, never an injured person or learner.
- Humour is subordinate to the safety explanation.
- Consequences are serious without using graphic injury descriptions.
- Australian tone is conversational without depending on slang.

## Claims and review flags

No learner-facing statement cites a specific law, regulation, standard number,
exposure limit or mandatory technical specification. Those claims would require
current-source verification before publication.

Dean should confirm before the public pilot that:

1. each safest action reflects normal painting-workshop practice;
2. the consequence categories are proportionate;
3. chemical, spill, ladder, PPE and tool-isolation language is suitable for the
   intended learner cohort;
4. the tone sounds natural in his classroom.

## Copyright and deployment check

Before deployment, verify that:

- the private workbook is not returned by `git ls-files`;
- the workbook is not present in `dist/`;
- all visual elements are repository-created SVG, HTML or CSS;
- the public build contains no source-document filename or copied source text.
