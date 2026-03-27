import { siteConfig } from '@/lib/site-config'

const ICON_BACKGROUND_START = 'rgb(11 17 32)'
const ICON_BACKGROUND_END = 'rgb(22 50 95)'
const ICON_PANEL = 'rgba(13, 25, 49, 0.78)'
const ICON_PANEL_STROKE = 'rgba(160, 189, 255, 0.24)'
const ICON_STROKE_START = 'rgb(245 247 255)'
const ICON_STROKE_END = 'rgb(168 184 255)'

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export function getSiteIconSvg(title = siteConfig.site.name) {
  const safeTitle = escapeXml(title)

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <title>${safeTitle}</title>
  <defs>
    <linearGradient id="icon-bg" x1="48" y1="40" x2="448" y2="472" gradientUnits="userSpaceOnUse">
      <stop stop-color="${ICON_BACKGROUND_START}" />
      <stop offset="1" stop-color="${ICON_BACKGROUND_END}" />
    </linearGradient>
    <linearGradient id="icon-stroke" x1="128" y1="104" x2="392" y2="392" gradientUnits="userSpaceOnUse">
      <stop stop-color="${ICON_STROKE_START}" />
      <stop offset="1" stop-color="${ICON_STROKE_END}" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="128" fill="url(#icon-bg)" />
  <rect x="56" y="56" width="400" height="400" rx="112" fill="${ICON_PANEL}" stroke="${ICON_PANEL_STROKE}" />
  <g transform="translate(64 64) scale(16)" fill="none" stroke="url(#icon-stroke)" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round">
    <path d="m10.586 5.414-5.172 5.172" />
    <path d="m18.586 13.414-5.172 5.172" />
    <path d="M6 12h12" />
    <circle cx="12" cy="20" r="2" />
    <circle cx="12" cy="4" r="2" />
    <circle cx="20" cy="12" r="2" />
    <circle cx="4" cy="12" r="2" />
  </g>
</svg>`
}
