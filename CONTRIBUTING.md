# Contributing

Thanks for contributing to `astro-knowledge-site-template`.

## Local setup

```bash
pnpm install
pnpm init:template
pnpm dev
```

For a full validation pass:

```bash
pnpm verify
```

## Branch and PR flow

- Branch from `main`
- Keep PRs focused and small enough to review quickly
- Link the issue when the change is tied to one
- Prefer updating docs in the same PR when behavior changes

## Before opening a PR

- Run `pnpm verify`
- Confirm a clean clone still works with the bundled starter content
- Update `README.md`, `docs/`, or `.env.example` when user-facing setup changes
- Add or refresh screenshots when the public UI or onboarding flow changes visibly
- Keep `examples/starter-content` compatible with the current shell contract

## Contract changes

If you change the content contract or sync flow, update all of these in the same PR:

- `README.md`
- `docs/external-content.md`
- `examples/starter-content`
- `CHANGELOG.md`

## Community threads

- Public roadmap: <https://github.com/frontandrews/astro-knowledge-site-template/issues/1>
- Showcase / built with this template: <https://github.com/frontandrews/astro-knowledge-site-template/issues/2>
