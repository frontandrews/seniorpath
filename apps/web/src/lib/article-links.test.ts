import { getDeckById } from '@seniorpath/content'

import { getDeckArticleLinks, getGuideIndexHref, resolveArticleHref } from '@/lib/article-links'

describe('article links', () => {
  it('falls back to the same-domain blog path when no site URL is configured', () => {
    expect(
      resolveArticleHref('learn/state-and-ui-thinking/state-ownership-without-confusion'),
    ).toBe(
      '/learn/state-and-ui-thinking/state-ownership-without-confusion',
    )
  })

  it('builds article links from a separate site origin', () => {
    expect(
      resolveArticleHref(
        'learn/runtime-and-execution/javascript-event-loop-without-hand-waving',
        'http://localhost:4321',
      ),
    ).toBe(
      'http://localhost:4321/learn/runtime-and-execution/javascript-event-loop-without-hand-waving',
    )
  })

  it('avoids duplicating the blog segment when the configured URL already includes it', () => {
    expect(
      resolveArticleHref(
        'learn/runtime-and-execution/node-single-threaded-does-not-mean-what-people-think',
        'https://seniorpath.pro/guides/',
      ),
    ).toBe(
      'https://seniorpath.pro/learn/runtime-and-execution/node-single-threaded-does-not-mean-what-people-think',
    )
  })

  it('builds the guide index href without duplicating locale segments', () => {
    expect(getGuideIndexHref('en', 'https://seniorpath.pro/learn/')).toBe(
      'https://seniorpath.pro/learn',
    )
    expect(getGuideIndexHref('pt-br', 'https://seniorpath.pro/pt-br/aprender')).toBe(
      'https://seniorpath.pro/pt-br/aprender',
    )
  })

  it('collects unique article links from a deck', () => {
    const deck = getDeckById('react-rendering-core')

    expect(deck).toBeDefined()
    expect(getDeckArticleLinks(deck!)).toEqual([
      {
        guideId: 'state-ownership-without-confusion',
        question: 'Why is derived state dangerous in React?',
        routePath: 'learn/state-and-ui-thinking/state-ownership-without-confusion',
      },
    ])
  })
})
