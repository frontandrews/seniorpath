import { getAllDecks, getDeckById, getDeckManifest, getDecksByTopic } from '@prepdeck/content'

describe('content registry', () => {
  it('loads every manifest entry into a real deck', () => {
    const manifest = getDeckManifest()

    expect(manifest.version).toBe(1)
    expect(manifest.decks.length).toBeGreaterThan(0)

    for (const summary of manifest.decks) {
      const deck = getDeckById(summary.id)

      expect(deck).toBeDefined()
      expect(deck?.id).toBe(summary.id)
      expect(deck?.topic).toBe(summary.topic)
      expect(deck?.estimatedMinutes).toBe(summary.estimatedMinutes)
      expect(deck?.cards.length).toBeGreaterThan(0)
    }
  })

  it('groups decks by topic without losing any entry', () => {
    const grouped = getDecksByTopic()
    const totalGroupedDecks = Object.values(grouped).flat().length

    expect(Object.keys(grouped)).toEqual(
      expect.arrayContaining([
        'coding-interview',
        'javascript',
        'leadership',
        'node',
        'react',
        'system-design',
      ]),
    )
    expect(totalGroupedDecks).toBe(getAllDecks().length)
    expect(grouped.react?.some((deck) => deck.id === 'react-rendering-core')).toBe(true)
  })
})
