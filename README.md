# Prepdeck

Prepdeck is a small open-source project I’m building to make technical interview prep less messy.

The goal is simple: pick a topic, study on a phone-sized screen, mark what you actually know, and come back later without losing your place.

## Why This Repo Exists

- Build a focused portfolio project around a real product
- Keep interview content and app code in one place
- Make study sessions simple enough to use every day
- Keep the repo clean, readable, and easy to run

## Stack

- Vite
- React
- TypeScript
- React Router
- pnpm
- Tailwind CSS
- Zod
- Vitest
- vite-plugin-pwa
- localStorage for v1 persistence

## What It Does

- `apps/web`: flashcards PWA
- `packages/content`: deck manifest, deck JSON, and loaders
- `packages/schemas`: shared Zod schemas and types
- `docs/coding-interview-foundations/`: notes for coding challenge prep
- `docs/system-design-interview/`: notes for system design and tricky interview topics
- `docs/flashcards-app/`: product and implementation notes for the app

## MVP Scope

1. Browse decks by category
2. Study cards with `learned`, `partial`, and `not_learned`
3. Resume from the first unseen card
4. Review cards by status
5. Reset deck or global progress

## What I Want To Add Next

1. Interview mode with timer and deeper prompts
2. Better review loops for weak cards
3. Portfolio embed once the standalone app is stable

## Run It

```bash
pnpm install
pnpm dev
```
