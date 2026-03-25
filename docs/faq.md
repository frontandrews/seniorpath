# FAQ

## Do I need a second repository for content?

No. The template works with bundled starter content and can also work with content committed in the same repo.

Use a separate repo when you want cleaner editorial ownership or private planning files.

## What is the stable contract?

For this phase, treat these as the stable entrypoints:

- `collections.manifest.json`
- `pnpm init:template`
- `SITE_CONTENT_DIR`
- `.local/content-source.json`

## Do I need both locales?

No. But if you keep more than one locale enabled, you should publish enough content in each locale to avoid a lopsided experience.

## Does newsletter need configuration right away?

No. Newsletter is off by default. `PUBLIC_NEWSLETTER_URL` matters only when you enable the feature.

## Do comments need configuration right away?

No. Comments are off by default. Giscus env vars only matter when comments are enabled.

## Can I rename section routes?

Yes. Change `routes`, `labels`, and `descriptions` in `collections.manifest.json`.

## Can I disable sections?

Yes. Set `enabled: false` for the section in the manifest.

## Which host should I use?

Any static host is fine as long as the build can access the right content root.
