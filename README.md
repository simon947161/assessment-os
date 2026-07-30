# AssessmentOS

AssessmentOS is a lightweight, open project for making vocational education learning and assessment easier to navigate, more engaging, and more closely connected to real work.

## First pilot

**WHS Living Book — Painting and Decorating**

The first deliverable is a short interactive learning experience based on CPCCWHS2001 concepts. Learners will practise hazard recognition, risk judgement, control selection and reporting through realistic workshop missions.

## Immediate delivery goal

Build and publish a small working prototype that Dean can test with learners as soon as possible.

## MVP v0.1

- One painting workshop hazard mission
- Ten interactive hazards
- Immediate explanatory feedback
- Score, retry and completion view
- Mobile and desktop support
- Static deployment through GitHub Pages
- No login, database or formal competency decision

## Core learning loop

`SPOT → THINK → CONTROL → ACT → REPORT`

## Run locally

```powershell
npm install
npm run dev
```

Validation:

```powershell
npm test
npm run build
npm run preview
```

## Public pilot

Expected URL: <https://simon947161.github.io/assessment-os/>

The site is deployed as a static Vite application. It stores anonymous mission
progress in the current browser session only.

## Project records

- [`PROJECT_CHARTER.md`](PROJECT_CHARTER.md)
- [`docs/CODEX_IMPLEMENTATION_BRIEF.md`](docs/CODEX_IMPLEMENTATION_BRIEF.md)
- [`docs/CONTENT_VALIDATION_REVIEW.md`](docs/CONTENT_VALIDATION_REVIEW.md)
- [`docs/DEAN_PILOT_GUIDE.md`](docs/DEAN_PILOT_GUIDE.md)

## Status

`WHS LIVING BOOK v0.1 — FOUNDER REVIEW PENDING`
