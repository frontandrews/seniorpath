# Implementation Backlog

## Phase 0: Foundation

- choose `Vite + React + TypeScript + React Router + Tailwind + PWA`
- set up package manager and tooling
- configure formatting and linting
- define app folder structure

## Phase 1: Content system

- finalize card and deck schemas
- validate all deck files
- create deck loader utilities
- create category and deck manifest helpers
- add coding interview decks alongside technical interview decks

## Phase 2: App shell

- create routes
- create responsive app layout
- create mobile-safe bottom action area
- define theme tokens and spacing system

## Phase 3: Deck browsing

- deck list screen
- category grouping
- progress summary
- deck detail screen
- start / continue actions

## Phase 4: Study session

- card display
- card flip interaction
- `1 of X` progress display
- next-card navigation
- mark `learned`
- mark `partial`
- mark `not learned`

## Phase 5: Persistent progress

- local storage persistence
- restore last deck state
- learned / partial / not-learned counts
- deck completion calculation
- unmark a learned card

## Phase 6: Review and reset flows

- learned list
- partial list
- not-learned list
- reset one deck
- reset all decks
- confirmation dialogs

## Phase 7: Completion and polish

- success message after viewing all cards
- stronger success state when all cards are learned
- empty states
- loading and error states
- touch-friendly UX polish

## Phase 8: PWA and device behavior

- installable manifest
- offline deck availability
- icons and splash basics
- resume session after reopen

## Phase 9: Future AI layer

- free-text answer mode
- AI evaluation endpoint
- coverage scoring
- stronger answer generation
- follow-up question mode

## Suggested implementation order inside v1

1. foundation
2. deck browsing
3. study session without persistence
4. local progress persistence
5. review and reset flows
6. success states
7. PWA polish
