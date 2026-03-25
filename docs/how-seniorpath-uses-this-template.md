# How SeniorPath uses this template

`seniorpath.pro` is the advanced public example of this shell.

It is intentionally not the default branding of the repository.

## Shell and content are separate

The public template owns:

- Astro routes and layouts
- localized section rendering
- search and indexing
- shared UI and brand defaults
- content sync logic

The editorial content lives in a separate repository and is connected at build time.

That split keeps the shell reusable while letting the product content evolve privately.

## Clean clone still works

The shell falls back to `examples/starter-content`.

That means:

- a clean clone can boot with no second repository
- docs can show a reliable starter flow
- the shell can still graduate to a dedicated content repo later

## The manifest is the contract

`collections.manifest.json` defines the sections the shell should expose.

SeniorPath uses that contract to publish more than articles:

- `tracks`
- `topics`
- `concepts`
- `glossary`
- `challenges`

The shell stays generic because the route labels, section order, and visibility come from the manifest instead of hard-coded product assumptions.

## Localized routes are part of the shell

SeniorPath publishes both English and Portuguese routes from the same shell model.

The template handles:

- locale-aware section routes
- localized labels and descriptions
- shared section renderers across locales

That is one of the main reasons this repo is positioned as a knowledge-site template instead of a blog starter.
