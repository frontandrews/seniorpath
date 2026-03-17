# Feature Scope

## Product goal

Create a fast interview-prep flashcards app that works well on mobile from day one and can later be embedded into a portfolio site.

## Core v1 features

### Deck browsing

- list decks by category
- show estimated time
- show progress summary
- open a deck directly into study mode
- support categories such as React, JavaScript, Node, System Design, Leadership, and Coding Interview

### Study session

- show current card index like `1 of X`
- flip card to reveal answer
- mark as `learned`
- mark as `partial`
- mark as `not learned`
- move to next card

### Progress management

- persist progress locally
- see all cards marked `learned`
- see all cards marked `not learned`
- remove a `learned` mark later
- reset progress for one deck
- reset progress for all decks

### Completion feedback

- show success message when all cards in a deck have been seen
- show stronger success state when all cards are marked `learned`
- give next actions such as review partial cards or restart the deck

## Nice-to-have v1.5 features

- shuffle mode
- continue last session
- filter by `not learned`
- filter by difficulty
- quick stats by category

## Explicitly out of scope for v1

- AI answer scoring
- voice answers
- multiple choice mode
- user accounts
- backend persistence
- spaced repetition engine
