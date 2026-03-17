# Screens and Flows

## Main screens

### Home / Decks

Shows:

- categories
- deck cards
- progress summary
- start / continue button

### Deck Detail

Shows:

- deck description
- total cards
- learned count
- partial count
- not-learned count
- actions: start, continue, reset

### Study Session

Shows:

- current position: `3 of 12`
- question front
- answer back
- action bar: `learned`, `partial`, `not learned`, `next`

### Review / Progress

Shows:

- learned cards
- partial cards
- not-learned cards
- unmark action
- reset deck action

### Success State

Shows:

- message after finishing all cards in a session
- completion summary
- CTA to review weak cards
- CTA to restart or go back to decks

## Key user flows

### First study flow

1. open app
2. pick category or deck
3. read card
4. flip card
5. mark result
6. continue until session ends
7. see success summary

### Review weak cards

1. open deck detail or review screen
2. filter by `not learned` or `partial`
3. revisit those cards
4. update status

### Unmark a learned card

1. open progress view
2. open `learned` list
3. remove learned status
4. card returns to active review state

### Reset flow

1. open deck detail or settings area
2. choose reset deck or reset all
3. confirm action
4. progress state is cleared
