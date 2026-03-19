export const siteStorageKeys = {
  completedGuides: 'seniorpath.site.completed-guides.v1',
  localePreference: 'seniorpath.site.locale-preference.v1',
} as const

export type SiteStorageKey = (typeof siteStorageKeys)[keyof typeof siteStorageKeys]
