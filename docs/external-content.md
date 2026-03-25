# Use an external content repo

The shell and the editorial content do not need to live in the same repository.

That split is the default long-term model for this template.

If you want the fastest separate-repo setup, generate one from the shell:

```bash
pnpm init:content-repo ../your-content-repo
pnpm init:template --content-root ../your-content-repo
```

## What stays in the shell repo

- Astro app
- layouts and routes
- reusable UI
- section renderers
- sync logic
- brand defaults

## What moves to the content repo

- `collections.manifest.json`
- article markdown
- concepts
- glossary entries
- challenges
- roadmap modules

## Minimum content contract

The canonical interface is `collections.manifest.json`.

Example shape:

```text
collections.manifest.json
collections/
  articles/
  roadmaps/
  concepts/
  glossary/
  challenges/
```

The folder names above are conventional. The contract itself is the manifest.

## Connect the shell to another repo

### Option A: local file

Create `.local/content-source.json`:

```json
{
  "contentRoot": "../your-content-repo"
}
```

### Option B: environment variable

```bash
SITE_CONTENT_DIR=/absolute/path/to/your-content-repo pnpm dev
```

Resolution order stays:

1. `SITE_CONTENT_DIR`
2. `.local/content-source.json`
3. `examples/starter-content`

## Real-world structure example

A private editorial repo such as `seniorpath-content` can keep this split clean:

```text
collections.manifest.json
collections/
  articles/
  challenges/
  concepts/
  glossary/
  roadmaps/
workspace/
agents/
scripts/
```

The shell only depends on the manifest and published collections. Planning files can stay private.

## Validate the integration

From the shell repo:

```bash
SITE_CONTENT_DIR=../your-content-repo pnpm verify:external
```

If you want the individual steps instead:

```bash
SITE_CONTENT_DIR=../your-content-repo pnpm content:sync
SITE_CONTENT_DIR=../your-content-repo pnpm typecheck
SITE_CONTENT_DIR=../your-content-repo pnpm build
```

If those pass, the shell can already consume the external repo correctly.
