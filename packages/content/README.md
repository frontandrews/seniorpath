# Content

This folder stores the flashcard content used by the future app.

## Principles

- keep content framework-agnostic
- keep app logic separate from learning material
- optimize for easy editing and future AI evaluation

## Structure

- `decks/index.json`: manifest of available decks
- `decks/<topic>/*.json`: one deck per file

## Why JSON

- easy to validate with schemas
- easy to load from web or mobile
- easy to transform later into a database if needed
