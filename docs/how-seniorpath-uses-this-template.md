# How SeniorPath uses this template

`seniorpath.pro` is the advanced public example of this shell.

It is intentionally not the default branding of the repository.

## What stays generic in the template

The reusable shell owns:

- Astro routes and layouts
- localized section rendering
- search and indexing
- SEO, feeds, `llms.txt`, OG generation, and legal scaffolding
- shared UI primitives, progress, and directory behavior
- content sync logic
- starter mode and external-content mode

The editorial content lives in a separate repository and is connected at build time.

That split keeps the shell reusable while letting the product content evolve privately.

## What is opinionated in SeniorPath

SeniorPath adds the parts that should be easy to swap or delete in another project:

- brand voice, naming, and visual identity
- the default author profile, avatar, and legal fallback wording
- the starter editorial inventory and route examples
- the bilingual publishing posture used by the public site
- product-facing docs that talk about SeniorPath as the example implementation

If a rebrand or spinout needs a first pass, these are the surfaces to replace before touching the generic shell internals.

## Clean clone still works

The shell falls back to `examples/starter-content`.

That means:

- a clean clone can boot with no second repository
- docs can show a reliable starter flow
- the shell can still graduate to a dedicated content repo later

## The manifest is the generic contract

`collections.manifest.json` defines the sections the shell should expose.

SeniorPath uses that contract to publish more than articles:

- `tracks`
- `topics`
- `concepts`
- `glossary`
- `challenges`

The shell stays generic because the route labels, section order, and visibility come from the manifest instead of hard-coded product assumptions.

## Localized routes are shell behavior, not product branding

SeniorPath publishes both English and Portuguese routes from the same shell model.

The template handles:

- locale-aware section routes
- localized labels and descriptions
- shared section renderers across locales

That is one of the main reasons this repo is positioned as a knowledge-site template instead of a blog starter.

## What to change first in a fork

- `apps/site/src/brand/brand.config.ts` for name, author, legal owner, routes, and enabled features
- `examples/starter-content` if the starter editorial shape should stop looking like SeniorPath
- `docs/` copy that still treats SeniorPath as the showcase implementation
- legal env vars and production contacts before any public launch
