# Deploy the template

This project builds to a static Astro output. The important part is making the correct content root available during build.

## Deployment modes

### 1. Bundled starter content

Use this when you want a demo, preview, or starter deployment fast.

```bash
pnpm install
pnpm verify
pnpm build
```

No extra content checkout is required because the shell falls back to `examples/starter-content`.

### 2. External content repo

Use this when your real editorial content lives somewhere else.

Your CI build needs both repositories available at build time.

Example layout inside CI:

```text
workspace/
  astro-knowledge-site-template/
  your-content-repo/
```

Then build with:

```bash
SITE_CONTENT_DIR=../your-content-repo pnpm verify
SITE_CONTENT_DIR=../your-content-repo pnpm build
```

## Generic CI example

```yaml
steps:
  - checkout shell repo
  - checkout content repo
  - pnpm install
  - SITE_CONTENT_DIR=../your-content-repo pnpm verify
  - SITE_CONTENT_DIR=../your-content-repo pnpm build
  - publish apps/site/dist
```

## Hosting target

Any host that can publish a static directory works:

- Vercel
- Cloudflare Pages
- Netlify
- GitHub Pages
- S3 + CDN

Publish `apps/site/dist`.

## Production checklist

- `PUBLIC_SITE_URL` points to the final domain
- legal and support vars are set if you expose those pages publicly
- `SITE_CONTENT_DIR` resolves correctly in CI when using an external repo
- `pnpm verify` passes in the same environment used for deployment
