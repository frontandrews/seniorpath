export function formatEditorialDate(
  value: Date,
  locale: string,
  options: Intl.DateTimeFormatOptions = {},
) {
  return value.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
    ...options,
  })
}
