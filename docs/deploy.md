# Deploy the template

This project builds to a static Astro output.

The deployment decision is less about the host and more about where the content root comes from during build.

Node `22` is the canonical runtime for this template.

## Start with the right build mode

### Starter content

Use this when the deployment should rely on `examples/starter-content`.

```bash
pnpm verify:starter
```

### External content repo

Use this when the shell must read a second repository during build.

```bash
SITE_CONTENT_DIR=../your-content-repo pnpm verify:external
```

## Generic multi-repo CI layout

```text
workspace/
  astro-knowledge-site-template/
  your-content-repo/
```

Publish `apps/site/dist`.

## Provider guides

- [Deploy on Vercel](./deploy-vercel.md)
- [Deploy on Cloudflare Pages](./deploy-cloudflare-pages.md)

## Production checklist

- `PUBLIC_SITE_URL` points to the final domain
- legal and support vars are set if you expose those pages publicly
- `SITE_CONTENT_DIR` resolves correctly in CI when using an external repo
- the same build environment uses Node `22`
- `pnpm verify:starter` or `pnpm verify:external` passes before publish
