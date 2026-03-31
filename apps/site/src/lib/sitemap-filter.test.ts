import { describe, expect, it } from 'vitest'

import { shouldIncludeInSitemap } from '../../scripts/sitemap-filter.mjs'

describe('shouldIncludeInSitemap', () => {
  it('keeps canonical content pages in the sitemap', () => {
    expect(shouldIncludeInSitemap('https://seniorpath.pro/articles/')).toBe(true)
    expect(
      shouldIncludeInSitemap(
        'https://seniorpath.pro/articles/backend-architecture-in-practice/handler-use-case-and-repository-where-each-decision-belongs/',
      ),
    ).toBe(true)
  })

  it('excludes paginated archive URLs that are marked noindex', () => {
    expect(shouldIncludeInSitemap('https://seniorpath.pro/topics/page/2/')).toBe(false)
    expect(shouldIncludeInSitemap('https://seniorpath.pro/pt-br/artigos/page/4/')).toBe(false)
    expect(
      shouldIncludeInSitemap(
        'https://seniorpath.pro/glossary/tag/coding-interview/page/3/',
      ),
    ).toBe(false)
  })
})
