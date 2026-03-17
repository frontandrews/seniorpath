# MVP Architecture

## Recommendation

Build the first version as a mobile-first web app with local content files.

## Why this is the most efficient path

- no dependency on a database
- easy to iterate on deck content
- easy to validate structure with JSON schemas
- mobile-first UX from day one
- future native or embedded versions can reuse the same content model

## Recommended v1 stack

- Vite
- React
- TypeScript
- React Router
- Tailwind CSS
- `vite-plugin-pwa`
- Zod or JSON Schema validation
- Vitest

## Mobile-first requirements

- bottom-safe spacing for mobile devices
- tap-friendly card actions
- one-thumb primary actions
- fast session resume
- offline-friendly deck loading

## Main app surfaces

### Deck list

- filter by topic
- filter by difficulty
- estimated time
- progress summary per deck
- `X / Y learned` indicator

### Study session

- front of card shows question
- back of card shows short answer and key points
- card progress like `1 of 12`
- self-rating: `learned`, `partial`, `not learned`
- next-card navigation optimized for mobile
- success state when the session is completed

### Review view

- cards marked `not learned`
- cards marked `partial`
- cards already marked `learned`
- topic-level weak areas
- reset actions

## What not to build in v1

- multiple choice distractors
- database persistence
- auth
- AI scoring
- spaced repetition with heavy complexity

## V1 data flow

1. app loads `packages/content/src/data/decks/index.json`
2. user chooses a deck
3. app loads the deck file
4. session state lives in memory or local storage
5. progress state persists learned / partial / not-learned markers
6. review screen summarizes weak areas and completed cards
