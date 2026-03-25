# Rebrand the template

Use this guide when the shell structure is right but the default identity still looks too generic.

## 1. Update the site identity

Edit `apps/site/src/brand/brand.config.ts` to change:

- feature defaults
- default locale and supported locales
- landing copy
- default legal route slugs
- fallback site name, description, and canonical URL

The brand config is the shell-level default. Public env vars can still override parts of it later.

## 2. Set production-facing values

Update `apps/site/.env` or your hosting env vars:

- `PUBLIC_SITE_NAME`
- `PUBLIC_SITE_DESCRIPTION`
- `PUBLIC_SITE_URL`
- `PUBLIC_STORAGE_NAMESPACE`

Set the legal and support vars only when you have real values for them.

## 3. Rename or disable sections

Edit `collections.manifest.json` in your content root when you want to:

- rename route segments
- rename visible labels
- change descriptions
- disable sections you do not want to publish yet

That keeps the shell generic while letting the editorial surface match your project.

## 4. Replace the starter content

You have two options:

1. keep content in the same repo and replace `examples/starter-content`
2. point the shell to a separate editorial repo with `pnpm init:content-repo`, `SITE_CONTENT_DIR`, or `.local/content-source.json`

If you want the cleanest long-term split, use the second option.

## 5. Validate the first rebrand

Your first successful customization is done when all of these are true:

- the site name is yours
- the canonical URL is yours
- the manifest labels and route segments match your product
- the site runs with your own content root
- `pnpm verify:starter` still passes for starter mode
- `SITE_CONTENT_DIR=../your-content-repo pnpm verify:external` passes for external mode
