# SeniorPath

SeniorPath is a local-first study app and guide site for people who want clearer technical practice without turning learning into a messy spreadsheet.

The repo combines:

- a flashcards-style web app for repetition and interview practice
- a static guide site for deeper explanations and follow-up reading
- a shared content layer that powers both surfaces

## Repo Structure

- `apps/web`: React + Vite app for study flows, progress, notes, and interview practice
- `apps/site`: Astro site for guides, glossary pages, topic hubs, and static learning paths
- `packages/content`: decks, guide metadata, roadmap taxonomy, and content helpers
- `packages/schemas`: shared types and Zod schemas
- `docs/path-to-senior/`: editorial roadmap and taxonomy notes
- `docs/flashcards-app/`: app behavior and implementation notes

## Stack

- React
- Vite
- TypeScript
- React Router
- Astro
- pnpm workspaces
- Zod
- Vitest
- Tailwind CSS
- vite-plugin-pwa
- localStorage for local-first persistence

## Product Principles

- Local-first before sync
- Mobile-friendly before feature-heavy
- Clear study loops before surface-area growth
- Small composable changes over giant rewrites
- Keep content and product structure aligned
- Remove parallel systems when they stop paying rent

## Run It

```bash
pnpm install
pnpm dev:all
pnpm dev
pnpm dev:site
```

If you want the app to open the Astro guide site during local development, copy
`apps/web/.env.example` to `apps/web/.env.local`.

If you want the guide site to open the app correctly during local development, copy
`apps/site/.env.example` to `apps/site/.env.local`.

## Verify Changes

```bash
pnpm verify
```

If you only need a narrower check:

```bash
pnpm test
pnpm lint
pnpm typecheck
pnpm typecheck:site
pnpm build
pnpm build:site
```

## Contributing

Contributions are welcome, especially if they improve clarity, usability, or content quality.

Before opening a change:

- keep edits scoped and easy to review
- preserve existing behavior unless the change intentionally improves it
- update docs or content when changing user-facing flows
- run `pnpm verify` before sending a PR

Good contribution areas:

- app UX polish
- study flow improvements
- guide/site navigation
- accessibility fixes
- content tooling and editorial workflow improvements
