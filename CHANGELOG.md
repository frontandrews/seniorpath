# Changelog

All notable changes to this repository are documented here.

## 0.3.0 - 2026-03-25

### Added

- Public content repo scaffold in `templates/content-repo`
- `pnpm init:content-repo`, `pnpm verify:starter`, `pnpm verify:external`, and smoke-test scripts
- Provider-specific deploy guides for Vercel and Cloudflare Pages
- Technical note explaining how `seniorpath.pro` uses the template
- Node 22 runtime marker via `.nvmrc`

### Changed

- `pnpm init:template` now accepts `--content-root <path>`
- Public docs now treat starter and external editorial flows as first-class onboarding paths
- CI now runs separate starter, external, and docs smoke checks

### What changed for adopters

- You can now scaffold a separate editorial repo directly from the shell without inventing your own structure first.
- The official validation path is explicit: use `pnpm verify:starter` for the bundled starter or `SITE_CONTENT_DIR=... pnpm verify:external` for an external repo.
- Deploy docs now show both generic multi-repo publishing and concrete provider examples.

## 0.2.0 - 2026-03-24

### Added

- Public template packaging for `astro-knowledge-site-template`
- MIT license, contribution guide, issue templates, PR template, and CI verification workflow
- Setup docs for rebrand, external content repos, deployment, and FAQ
- README screenshots, architecture diagram, advanced example links, and a public stability policy

### Changed

- Repository messaging now treats the project as a public knowledge-site template
- Onboarding now centers on three paths: clone and run, external content, and rebrand
- Versioning moved to `0.2.0` to mark the first documented public template release line
