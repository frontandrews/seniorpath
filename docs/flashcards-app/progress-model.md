# Progress Model

## Why define progress early

The content is static, but user progress is dynamic. If progress shape is defined early, the UI, storage layer, and future analytics stay simpler.

## Recommended progress states

- `unseen`
- `learned`
- `partial`
- `not_learned`

## Recommended storage layers

### Session state

Use for:

- current deck
- current card index
- flip state
- temporary session stats

### Persistent local progress

Use for:

- card status per deck
- last studied time
- deck completion summary

## Suggested local shape

```json
{
  "version": 1,
  "decks": {
    "react-rendering-core": {
      "lastCardId": "react-context-performance",
      "lastStudiedAt": "2026-03-17T12:00:00.000Z",
      "cards": {
        "react-derived-state-danger": "learned",
        "react-context-performance": "partial"
      }
    }
  }
}
```

## Why this shape works

- deck-scoped
- simple to reset
- easy to evolve later
- portable to database persistence if needed
