import { getLocaleShortLabel, type SiteLocale } from '@/lib/locale-config'
import { siteConfig } from '@/lib/site-config'

export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630

const OG_IMAGE_CACHE_CONTROL = 'public, max-age=3600'

const OG_IMAGE_PAGE_TYPES = [
  'articles',
  'tracks',
  'concepts',
  'glossary',
  'challenges',
] as const

export type OgImagePageType = (typeof OG_IMAGE_PAGE_TYPES)[number]

type RenderOgImageInput = {
  description: string
  eyebrow: string
  locale: SiteLocale
  metaLine?: string | null
  title: string
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function normalizeText(value: string) {
  return value.replace(/\s+/g, ' ').trim()
}

function truncateText(value: string, maxChars: number) {
  if (value.length <= maxChars) {
    return value
  }

  return `${value.slice(0, Math.max(0, maxChars - 3)).trimEnd()}...`
}

function splitLongToken(token: string, maxChars: number) {
  if (token.length <= maxChars) {
    return [token]
  }

  const parts: string[] = []

  for (let index = 0; index < token.length; index += maxChars) {
    parts.push(token.slice(index, index + maxChars))
  }

  return parts
}

function wrapText(value: string, maxChars: number, maxLines: number) {
  const normalized = normalizeText(value)

  if (!normalized) {
    return []
  }

  const words = normalized
    .split(' ')
    .flatMap((word) => splitLongToken(word, maxChars))

  const lines: string[] = []
  let currentLine = ''

  for (const word of words) {
    const nextLine = currentLine ? `${currentLine} ${word}` : word

    if (nextLine.length <= maxChars) {
      currentLine = nextLine
      continue
    }

    if (currentLine) {
      lines.push(currentLine)
    }

    currentLine = word
  }

  if (currentLine) {
    lines.push(currentLine)
  }

  if (lines.length <= maxLines) {
    return lines
  }

  const visibleLines = lines.slice(0, maxLines)
  visibleLines[maxLines - 1] = truncateText(visibleLines[maxLines - 1], maxChars)

  if (!visibleLines[maxLines - 1].endsWith('...')) {
    visibleLines[maxLines - 1] = truncateText(`${visibleLines[maxLines - 1]}...`, maxChars)
  }

  return visibleLines
}

function renderTextLines(
  lines: string[],
  x: number,
  startY: number,
  lineHeight: number,
  attrs: string,
) {
  return lines
    .map(
      (line, index) =>
        `<text x="${x}" y="${startY + index * lineHeight}" ${attrs}>${escapeXml(line)}</text>`,
    )
    .join('\n')
}

function encodeOgImageSegment(value: string) {
  return encodeURIComponent(value.trim())
}

export function getEntityOgImagePath(
  pageType: OgImagePageType,
  locale: SiteLocale,
  id: string,
) {
  return `/og/${pageType}/${encodeOgImageSegment(locale)}/${encodeOgImageSegment(id)}.svg`
}

export function resolveEntityOgImageUrl(
  baseUrl: string | URL,
  pageType: OgImagePageType,
  locale: SiteLocale,
  id: string,
) {
  return new URL(getEntityOgImagePath(pageType, locale, id), baseUrl).toString()
}

export function renderOgImageSvg({
  description,
  eyebrow,
  locale,
  metaLine = null,
  title,
}: RenderOgImageInput) {
  const localeLabel = escapeXml(getLocaleShortLabel(locale))
  const safeEyebrow = escapeXml(truncateText(normalizeText(eyebrow).toUpperCase(), 42))
  const safeMetaLine = escapeXml(
    truncateText(normalizeText(metaLine ?? siteConfig.site.name), 68),
  )
  const safeSiteName = escapeXml(siteConfig.site.name)
  const titleLines = wrapText(title, 27, 3)
  const descriptionLines = wrapText(description, 58, 2)
  const titleFontSize = titleLines.length >= 3 ? 58 : 68
  const titleLineHeight = titleLines.length >= 3 ? 66 : 76
  const titleStartY = titleLines.length >= 3 ? 254 : 282
  const descriptionStartY = titleStartY + titleLines.length * titleLineHeight + 34
  const localeBadgeWidth = Math.max(82, 42 + localeLabel.length * 22)
  const localeBadgeX = OG_IMAGE_WIDTH - 72 - localeBadgeWidth

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${OG_IMAGE_WIDTH}" height="${OG_IMAGE_HEIGHT}" viewBox="0 0 ${OG_IMAGE_WIDTH} ${OG_IMAGE_HEIGHT}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="${OG_IMAGE_WIDTH}" y2="${OG_IMAGE_HEIGHT}" gradientUnits="userSpaceOnUse">
      <stop stop-color="rgb(11 18 34)" />
      <stop offset="1" stop-color="rgb(16 34 74)" />
    </linearGradient>
    <radialGradient id="glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1036 82) rotate(146.31) scale(585.499 910.265)">
      <stop stop-color="rgb(110 168 255)" stop-opacity="0.4" />
      <stop offset="1" stop-color="rgb(110 168 255)" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="panel" x1="64" y1="72" x2="1136" y2="558" gradientUnits="userSpaceOnUse">
      <stop stop-color="rgba(12, 24, 47, 0.88)" />
      <stop offset="1" stop-color="rgba(12, 24, 47, 0.72)" />
    </linearGradient>
  </defs>
  <rect width="${OG_IMAGE_WIDTH}" height="${OG_IMAGE_HEIGHT}" rx="32" fill="url(#bg)" />
  <rect width="${OG_IMAGE_WIDTH}" height="${OG_IMAGE_HEIGHT}" rx="32" fill="url(#glow)" />
  <rect x="64" y="72" width="1072" height="486" rx="28" fill="url(#panel)" stroke="rgba(160, 189, 255, 0.24)" />
  <text x="112" y="132" fill="rgb(159 184 255)" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700" letter-spacing="0.18em">${safeEyebrow}</text>
  <rect x="${localeBadgeX}" y="94" width="${localeBadgeWidth}" height="46" rx="23" fill="rgba(112, 167, 255, 0.14)" stroke="rgba(159, 184, 255, 0.36)" />
  <text x="${localeBadgeX + localeBadgeWidth / 2}" y="124" fill="rgb(243 247 255)" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700" text-anchor="middle">${localeLabel}</text>
  ${renderTextLines(
    titleLines,
    112,
    titleStartY,
    titleLineHeight,
    `fill="rgb(243 247 255)" font-family="Arial, Helvetica, sans-serif" font-size="${titleFontSize}" font-weight="700"`,
  )}
  ${renderTextLines(
    descriptionLines,
    112,
    descriptionStartY,
    42,
    'fill="rgb(203 216 255)" font-family="Arial, Helvetica, sans-serif" font-size="32"',
  )}
  <line x1="112" y1="492" x2="1088" y2="492" stroke="rgba(160, 189, 255, 0.18)" />
  <text x="112" y="534" fill="rgb(136 163 230)" font-family="Arial, Helvetica, sans-serif" font-size="27">${safeMetaLine}</text>
  <text x="1088" y="534" fill="rgb(159 184 255)" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700" text-anchor="end">${safeSiteName}</text>
</svg>`
}

export function createOgImageResponse(input: RenderOgImageInput) {
  return new Response(renderOgImageSvg(input), {
    headers: {
      'Cache-Control': OG_IMAGE_CACHE_CONTROL,
      'Content-Type': 'image/svg+xml; charset=utf-8',
    },
  })
}
