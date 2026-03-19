export function formatEditorialDate(
  value: Date,
  locale: string,
  options: Intl.DateTimeFormatOptions = {},
) {
  const formatter = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
    ...options,
  })

  return formatter
    .formatToParts(value)
    .map((part) => (part.type === 'literal' ? part.value.replace(/,/g, '') : part.value))
    .join('')
    .replace(/\s+/g, ' ')
    .trim()
}
