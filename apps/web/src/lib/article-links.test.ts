import { resolveArticleHref } from '@/lib/article-links'

describe('article links', () => {
  it('falls back to the same-domain blog path when no site URL is configured', () => {
    expect(resolveArticleHref('react-derived-state-without-extra-bugs')).toBe(
      '/blog/react-derived-state-without-extra-bugs',
    )
  })

  it('builds article links from a separate site origin', () => {
    expect(
      resolveArticleHref('javascript-event-loop-without-hand-waving', 'http://localhost:4321'),
    ).toBe('http://localhost:4321/blog/javascript-event-loop-without-hand-waving')
  })

  it('avoids duplicating the blog segment when the configured URL already includes it', () => {
    expect(
      resolveArticleHref(
        'node-single-threaded-does-not-mean-what-people-think',
        'https://prepdeck.dev/blog/',
      ),
    ).toBe('https://prepdeck.dev/blog/node-single-threaded-does-not-mean-what-people-think')
  })
})
